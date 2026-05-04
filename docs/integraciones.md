# 🔌 INTEGRACIONES EXTERNAS — PINTUMASTER

**Versión:** 1.0  
**Fecha:** 3 de mayo de 2026

---

## 📲 WHATSAPP BUSINESS API

### Configuración

**Endpoint Base**: `https://graph.instagram.com/v18.0/`

**Autenticación**: Bearer token (almacenado en Firebase Secret Manager, NUNCA en .env público)

### Caso de Uso 1: Notificar Trabajo Listo

**Trigger**: Dueño marca trabajo como "Terminado" y hace clic en "Enviar notificación"

**Payload**:

```json
{
  "messaging_product": "whatsapp",
  "to": "+573001234567",
  "type": "template",
  "template": {
    "name": "trabajo_listo",
    "language": {
      "code": "es"
    },
    "parameters": {
      "body": {
        "parameters": [
          {
            "type": "text",
            "text": "Juan Pérez"
          },
          {
            "type": "text",
            "text": "ABC-123"
          },
          {
            "type": "text",
            "text": "PintuMaster"
          }
        ]
      }
    }
  }
}
```

**Template en WhatsApp**:

```
Hola {{1}},
Tu vehículo {{2}} ya está listo en {{3}}.
¡Gracias por confiar en nosotros! 🚗✅
```

### Cloud Function

```typescript
// functions/src/whatsapp.ts
import * as functions from "firebase-functions/v2/https";
import axios from "axios";

export const sendWorkNotification = functions.https.onCall(
  async (data: {
    clientNumber: string;
    clientName: string;
    plate: string;
    shopName: string;
  }) => {
    const token = process.env.WHATSAPP_API_TOKEN; // De Secret Manager
    const phoneNumberId = process.env.WHATSAPP_PHONE_ID;

    try {
      const response = await axios.post(
        `https://graph.instagram.com/v18.0/${phoneNumberId}/messages`,
        {
          messaging_product: "whatsapp",
          to: data.clientNumber,
          type: "template",
          template: {
            name: "trabajo_listo",
            language: { code: "es" },
            parameters: {
              body: {
                parameters: [
                  { type: "text", text: data.clientName },
                  { type: "text", text: data.plate },
                  { type: "text", text: data.shopName },
                ],
              },
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return { success: true, messageId: response.data.messages[0].id };
    } catch (error) {
      console.error("WhatsApp API error:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to send message",
      );
    }
  },
);
```

---

## 🏦 BANCOLOMBIA WEBHOOKS

### Configuración

**URL del webhook**: `https://pintumaster-app.com/webhooks/bancolombia`

**Bancolombia enviará**: POST cada vez que haya una transferencia a la cuenta del taller

### Payload Recibido

```json
{
  "evento": "transferencia_recibida",
  "timestamp": "2026-05-03T14:30:00Z",
  "transaccion": {
    "id": "TRNX-123456789",
    "monto": 450000,
    "cuenta_destino": "12345678901234567890",
    "cuenta_origen": "98765432109876543210",
    "referencia": "AUTO-001",
    "nombre_pagador": "Juan Pérez"
  }
}
```

### Cloud Function (Webhook Handler)

```typescript
// functions/src/bancolombia.ts
import * as functions from "firebase-functions/v2/https";
import { db } from "./firebase";

export const handleBancolombiaWebhook = functions.https.onRequest(
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    try {
      const { transaccion, timestamp } = req.body;

      // 1. Validar firma (Bancolombia envía HMAC para verificar autenticidad)
      const isValid = verifyBancolombiaSignature(req);
      if (!isValid) {
        res.status(401).send("Invalid signature");
        return;
      }

      // 2. Buscar trabajo por referencia
      const trabajoSnapshot = await db
        .collection("trabajos")
        .where("trabajoId", "==", transaccion.referencia)
        .get();

      if (trabajoSnapshot.empty) {
        // 3. Si no hay referencia, crear ingreso "manual"
        await db.collection("finanzas/ingresos").add({
          concepto: `Transferencia Bancolombia - ${transaccion.nombre_pagador}`,
          monto: transaccion.monto,
          metodoPago: "Transferencia Bancolombia",
          referencia: transaccion.id,
          fuente: "Bancolombia",
          fechaIngreso: new Date(timestamp),
          ownerUid: process.env.OWNER_UID, // Configurar en env
          createdAt: new Date().toISOString(),
        });
      } else {
        // 4. Si hay trabajo, crear ingreso y marcar como pagado
        const trabajo = trabajoSnapshot.docs[0];
        await db.collection("finanzas/ingresos").add({
          trabajoId: trabajo.id,
          concepto: `Pago trabajo ${transaccion.referencia}`,
          monto: transaccion.monto,
          metodoPago: "Transferencia Bancolombia",
          referencia: transaccion.id,
          fuente: "Bancolombia",
          fechaIngreso: new Date(timestamp),
          ownerUid: trabajo.data().ownerUid,
          createdAt: new Date().toISOString(),
        });

        // Marcar trabajo como pagado
        await trabajo.ref.update({
          pagado: true,
          fechaPago: new Date(timestamp),
          metodoPago: "Transferencia Bancolombia",
        });

        // Auditar
        await db.collection("auditoria").add({
          entidad: "trabajo",
          entidadId: trabajo.id,
          accion: "update",
          cambios: { pagado: { antes: false, despues: true } },
          descripcion: "Pago registrado automáticamente por Bancolombia",
          ownerUid: trabajo.data().ownerUid,
          timestamp: new Date().toISOString(),
        });
      }

      res.status(200).json({ success: true, transaccionId: transaccion.id });
    } catch (error) {
      console.error("Bancolombia webhook error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

function verifyBancolombiaSignature(req: any): boolean {
  // Implementar validación HMAC según docs Bancolombia
  // Comparar req.headers['x-bancolombia-signature'] con HMAC calculado
  return true; // placeholder
}
```

---

## 💳 NEQUI WEBHOOKS

### Configuración

**URL del webhook**: `https://pintumaster-app.com/webhooks/nequi`

**Nequi enviará**: POST cada vez que haya movimiento en la cuenta

### Payload Recibido

```json
{
  "eventType": "PAYMENT_RECEIVED",
  "timestamp": "2026-05-03T14:30:00Z",
  "transaction": {
    "id": "NEQ-987654321",
    "amount": 450000,
    "currency": "COP",
    "description": "Pago trabajo AUTO-001",
    "accountId": "31234567890",
    "from": {
      "name": "Juan Pérez",
      "id": "31005432109"
    }
  }
}
```

### Cloud Function (Webhook Handler)

```typescript
// functions/src/nequi.ts
export const handleNequiWebhook = functions.https.onRequest(
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    try {
      const { transaction, eventType, timestamp } = req.body;

      if (eventType !== "PAYMENT_RECEIVED") {
        res.status(200).send("Event not relevant");
        return;
      }

      // Similar a Bancolombia: crear ingreso automático
      const monto = transaction.amount;
      const referencia = transaction.description || transaction.id;

      // Buscar trabajo por descripción
      // ...

      res.status(200).json({ success: true, transactionId: transaction.id });
    } catch (error) {
      console.error("Nequi webhook error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);
```

---

## 🔐 SEGURIDAD DE INTEGRACIONES

### Tokens y Secrets

**NUNCA** hardcodear en el código:

```javascript
❌ const token = 'sk_live_abc123...';
```

**SIEMPRE** usar Firebase Secret Manager:

```javascript
✅ const token = process.env.WHATSAPP_API_TOKEN; // Desde Secret Manager
```

### Verificación de Webhooks

Para Bancolombia y Nequi, cada webhook incluye una firma HMAC. **SIEMPRE verificar** antes de procesar:

```typescript
function verifyWebhookSignature(req: any, secret: string): boolean {
  const signature = req.headers["x-signature"];
  const body = JSON.stringify(req.body);
  const hash = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return signature === hash;
}
```

### Rate Limiting

Implementar rate limiting en Cloud Functions:

```typescript
import * as rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests máximo
});

app.use("/webhooks/", limiter);
```

---

## 🧪 TESTING DE INTEGRACIONES

### Bancolombia (Sandbox)

1. Registrarse en Bancolombia Developer
2. Usar cuenta de prueba en sandbox
3. Simular transferencias con API de Bancolombia

### Nequi (Sandbox)

1. Usar ambiente de testing de Nequi
2. Webhook URL puede ser `localhost` con ngrok

### WhatsApp (Business)

1. Usar teléfono de prueba de Meta
2. Enviar a números verificados
3. No disponible en localización donde no está autorizado

---

## 📋 ENDPOINTS & MÉTODOS

| Integración | Endpoint  | Método | Trigger                    |
| ----------- | --------- | ------ | -------------------------- |
| WhatsApp    | Graph API | POST   | Manual (dueño)             |
| Bancolombia | Webhook   | POST   | Automático (transferencia) |
| Nequi       | Webhook   | POST   | Automático (pago)          |

---

## ⚠️ ERRORES COMUNES

### WhatsApp

❌ Token expirado → ✅ Renovar en Firebase Secret Manager cada 24h

❌ Número no verificado → ✅ Verificar en Business Manager

### Bancolombia/Nequi

❌ Webhook no responde → ✅ Bancolombia/Nequi lo reintenta (exponential backoff)

❌ Transacción duplicada → ✅ Validar `transactionId` en BD antes de crear

---

## 🚀 ROLLOUT

### Fase 3.8 (WhatsApp)

- Configurar Business Account
- Verificar número de taller
- Crear templates en Meta
- Testing en sandbox
- Deploy a producción

### Fase 3.9 (Bancolombia/Nequi)

- Registrarse en APIs de bancos
- Configurar webhooks
- Testing en sandbox
- Verificación de Bancolombia/Nequi
- Deploy a producción

---

## 📞 SOPORTE

- **WhatsApp**: https://developers.facebook.com/docs/whatsapp/cloud-api
- **Bancolombia**: https://www.bancolombia.com/developers
- **Nequi**: https://nequi.com.co/developers
