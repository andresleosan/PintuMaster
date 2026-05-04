# 📖 REFERENCIA DE SEGURIDAD FIREBASE — SÍNTESIS DEL PDF

**Fecha:** 3 de mayo de 2026  
**Fuente:** Guía Firebase Security Rules y Crisis de Seguridad del Vibe Coding (Abril 2026)  
**Criticidad:** 🔴 CRÍTICA

---

## ⚠️ RESUMEN EJECUTIVO

**La realidad**: 45% del código generado por IA tiene vulnerabilidades. Entre enero 2025 y febrero 2026, casi todos los incidentes se remontan a 4 causas prevenibles:

1. ❌ Reglas Firebase mal configuradas (`if true`)
2. ❌ RLS de Supabase deshabilitado
3. ❌ API keys hardcodeadas en cliente
4. ❌ Backends expuestos sin autenticación

---

## 💀 HACKEOS REALES (2025-2026)

### Tea App (Julio 2025)

- **Filtrado**: 72,000 imágenes + 13,000 fotos de IDs gubernamentales
- **Causa**: Firebase Storage completamente abierto, cero autenticación
- **Lección**: Storage rules son TAN críticas como Firestore

### Lovable — CVE-2025-48757 (Mayo 2025)

- **Filtrado**: 170+ apps en producción (nombres, emails, registros financieros, direcciones, API keys)
- **Causa**: RLS de Supabase deshabilitado. Cualquiera con URL + clave anon = acceso total
- **Lección**: La clave anon es SEGURA solo si RLS está habilitado

### Moltbook (Enero 2026)

- **Filtrado**: 1.5 millones de tokens API, 35,000 emails, mensajes privados
- **Causa**: Supabase mal configurado, RLS deshabilitado
- **Lección**: Mismo patrón una y otra vez

### Orchids Platform (Dic 2025 – Feb 2026)

- **Usuarios**: ~1 millón
- **Filtrado**: Vulnerabilidad zero-click descubierta por investigador
- **Lección**: La escala amplifica el daño

---

## 🔐 CONCEPTOS CLAVE

### SDK vs. Clave vs. CORS

#### SDK (Software Development Kit)

- Es la librería que instalas (ej: `firebase/firestore`)
- Se ejecuta EN EL NAVEGADOR
- Todo lo que sabe (URLs, claves) es **VISIBLE**

#### Clave Anon (en Supabase)

- Diseñada para ser pública
- Es segura solo si **RLS está habilitado**
- Sin RLS = es un backdoor de acceso total

#### CORS (Cross-Origin Resource Sharing)

- **NUNCA usar `Access-Control-Allow-Origin: *`**
- Permite que cualquier sitio malicioso haga requests desde navegador del usuario
- Configurar solo dominios específicos: `Access-Control-Allow-Origin: https://mi-app.com`

---

## 🛑 LAS REGLAS MÁS PELIGROSAS

### ❌ La Regla Mortal — "Test Mode"

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // ← MORTAL
    }
  }
}
```

**Impacto**: Cualquiera en el planeta puede leer, escribir, modificar y eliminar TODO tu datos. Solo necesitan tu project ID (visible en frontend).

**Prevalencia**: ~30% de apps Firebase en producción tienen reglas excesivamente permisivas.

---

## ✅ REGLAS SEGURAS: DEL BÁSICO AL ROBUSTO

### Nivel 1: Solo Usuarios Autenticados

```javascript
match /{document=**} {
  allow read, write: if request.auth != null;
}
```

**Limitación**: Cualquier usuario autenticado (incluso cuentas desechables) accede a TODO.

### Nivel 2: Propiedad de Documento (Content-Owner)

```javascript
match /users/{userId} {
  allow read, update, delete: if request.auth.uid == userId;
  allow create: if request.resource.data.userId == request.auth.uid;
}
```

**Mejora**: Cada usuario solo ve sus propios datos.

### Nivel 3: Reglas Granulares por Colección

```javascript
// Perfil: solo el dueño
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}

// Posts públicos: cualquiera lee, solo autor escribe
match /posts/{postId} {
  allow read: if true;
  allow create: if request.auth != null
                && request.resource.data.authorId == request.auth.uid;
  allow update, delete: if resource.data.authorId == request.auth.uid;
}

// Órdenes: dueño + admins
match /orders/{orderId} {
  allow read, update: if request.auth != null && (
    resource.data.userId == request.auth.uid ||
    request.auth.token.admin == true
  );
}

// Datos sensibles: NADIE desde cliente
match /internal/{docId} {
  allow read, write: if false;
}
```

### Nivel 4: Validación de Datos

```javascript
match /posts/{postId} {
  allow create: if request.auth != null
                && request.resource.data.authorId == request.auth.uid
                && request.resource.data.title is string
                && request.resource.data.title.size() > 0
                && request.resource.data.title.size() <= 200
                && request.resource.data.content is string
                && request.resource.data.content.size() <= 10000
                && request.resource.data.createdAt == request.time;
}
```

**Impacto**: Datos inválidos se rechazan en la regla, no en el cliente (que puede estar comprometido).

---

## 🛡️ STORAGE RULES

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Fotos de perfil: dueño sube, cualquiera ve
    match /users/{userId}/profile/{fileName} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && request.resource.contentType.matches('image/.*')
                   && request.resource.size < 5 * 1024 * 1024;
    }

    // Docs privados: solo dueño
    match /users/{userId}/documents/{fileName} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }

    // Bloquear todo lo demás
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 🚨 LA TRAMPA DE LA IA

### El Ciclo Vicioso

1. IA genera schema de base de datos
2. IA **NO configura** reglas de seguridad
3. Algo falla con un error `Permission Denied`
4. IA "arregla" el error con `allow read, write: if true`
5. El error desaparece, la app funciona
6. El desarrollador asume que todo está bien
7. **Atacante accede a TODO**

### Por Qué Ocurre

- Los LLMs están optimizados para **hacer que el error desaparezca**, no para implementar la solución correcta
- La seguridad es **compleja**: requiere pensar en quién accede a qué
- Investigación de Columbia University confirma que la seguridad es **uno de los patrones de fallo más críticos** de los agentes de código

---

## 📋 OTROS ERRORES COMUNES DE IA AGENTS

| Problema                                | Frecuencia | Riesgo                                |
| --------------------------------------- | ---------- | ------------------------------------- |
| API keys hardcodeadas en frontend JS    | 60%+       | Robo de credenciales                  |
| Autorización por UI (esconder botones)  | ~50%       | Bypass trivial de permisos            |
| `dangerouslySetInnerHTML` sin sanitizar | Frecuente  | XSS — ejecución scripts maliciosos    |
| Archivos `.env` expuestos públicamente  | ~15%       | Todas las secrets comprometidas       |
| `CORS: Allow-Origin: *`                 | Frecuente  | Requests cross-origin sin restricción |

---

## ✅ CHECKLIST PRE-LANZAMIENTO (12 PUNTOS CRÍTICOS)

### Base de Datos

- [ ] Reglas de Firestore configuradas por colección (NO `if true` global)
- [ ] Cada tabla Supabase tiene RLS habilitado con políticas específicas
- [ ] Usas `request.auth.uid` para validar propiedad de documentos
- [ ] Datos sensibles bloqueados del cliente (`if false`) y solo accesibles vía Cloud Functions

### Storage

- [ ] Firebase Storage valida autenticación, tipo de archivo y tamaño
- [ ] Los buckets NO son públicos por defecto

### API Keys y Secrets

- [ ] Todas las API keys de terceros están en variables de entorno del servidor
- [ ] Ninguna secret key está en código del frontend
- [ ] El `service_role` key de Supabase NUNCA está en el cliente
- [ ] Corriste `gitleaks detect --source .` para buscar secrets en repo

### Autenticación

- [ ] Firebase App Check está habilitado
- [ ] Contraseñas requieren más de 6 caracteres
- [ ] Auth anónima deshabilitada o usuarios anónimos se vinculan a cuentas reales

### Headers y HTTPS

- [ ] App servida sobre HTTPS
- [ ] Headers de seguridad: CSP, X-Frame-Options, Strict-Transport-Security
- [ ] CORS configurado solo para tus dominios

### Validación

- [ ] Inputs del usuario validados en el **servidor** (no solo frontend)
- [ ] Uploads validan MIME type, tamaño y contenido
- [ ] Errores NO exponen stack traces, rutas o detalles de DB

---

## 🔥 LA LECCIÓN FINAL

**Cita directa del PDF:**

> "Nadie los hackeó. Simplemente no configuraron la seguridad."

La diferencia entre una app funcional y una **lista para producción** son **30 minutos** de configurar reglas de seguridad.

30 minutos que pueden ahorrarte el **costo promedio de un data breach: $4.88 millones de dólares** según IBM (2024).

---

## 🎯 REGLA DE ORO PARA VIBE CODERS

### Cada vez que tu agente IA "arregla" un error de permisos:

1. **REVISA exactamente qué hizo**
2. Si la solución incluye:
   - ❌ `if true`
   - ❌ `USING (true)`
   - ❌ `allow public access`
   - ❌ `Access-Control-Allow-Origin: *`
3. **REVIÉRTELA INMEDIATAMENTE**
4. **Configura la regla correcta** (lee este doc)

---

## 📚 REFERENCIAS

- **Firebase Docs**: https://firebase.google.com/docs/firestore/security/get-started
- **Documentación Supabase RLS**: https://supabase.com/docs/guides/auth/row-level-security
- **OWASP Top 10**: https://owasp.org/Top10/
- **Este proyecto**: Ver `docs/reglas-firestore.md` y `docs/modelo-de-datos.md`
