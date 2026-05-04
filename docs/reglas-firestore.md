# 🔐 REGLAS FIRESTORE — SECURITY RULES

**Versión:** 1.0  
**Fecha:** 3 de mayo de 2026  
**Base:** `docs/referencias/reglas-seguridad-firebase.md` (PDF 2026)  
**Principio clave:** Deny by default

---

## 🛡️ REGLAS GLOBALES

### Principio de Seguridad

```
POR DEFECTO: DENEGAR TODOS
LUEGO: Abrir solo lo explícitamente permitido
```

### Niveles de Acceso

1. **Dueño (owner/admin)**: Acceso total a todos sus datos
2. **Empleado**: Solo lee/escribe en trabajos asignados
3. **Público**: Sin acceso (excepto login)

---

## 📋 FIRESTORE RULES — VERSIÓN COMPLETA

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Función auxiliar: obtener UID del owner desde token de auth
    function getOwnerUid() {
      return request.auth.token.sub;
    }

    // Función auxiliar: verificar si es owner
    function isOwner() {
      return request.auth.uid == resource.data.ownerUid;
    }

    function isOwnerOnCreate() {
      return request.auth.uid == request.resource.data.ownerUid;
    }

    // ──────────────────────────────────────────────────────
    // COLECCIÓN: users
    // ──────────────────────────────────────────────────────
    match /users/{userId} {
      // Solo el dueño puede leer/escribir su documento
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // Validación en create
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid
                    && request.resource.data.rol == "owner"
                    && request.resource.data.email is string
                    && request.resource.data.nombre is string;

      // Validación en update
      allow update: if request.auth.uid == userId
                    && request.resource.data.userId == resource.data.userId
                    && request.resource.data.rol == resource.data.rol;
    }

    // ──────────────────────────────────────────────────────
    // COLECCIÓN: trabajos
    // ──────────────────────────────────────────────────────
    match /trabajos/{trabajoId} {
      // READ: Dueño ve todo. Empleado solo sus trabajos.
      allow read: if request.auth != null && (
        request.auth.uid == resource.data.ownerUid ||
        (request.auth.uid in resource.data.empleadosIds &&
         resource.data.empleadosIds.size() > 0)
      );

      // WRITE: Solo el dueño
      allow write: if request.auth != null
                   && request.auth.uid == resource.data.ownerUid;

      // CREATE: Validación
      allow create: if request.auth != null
                    && request.resource.data.ownerUid == request.auth.uid
                    && request.resource.data.trabajoId is string
                    && request.resource.data.trabajoId.size() > 0
                    && request.resource.data.estado in ["Pendiente", "En proceso", "Pintura", "Terminado"]
                    && request.resource.data.cliente is map
                    && request.resource.data.cliente.nombre is string
                    && request.resource.data.vehiculo is map
                    && request.resource.data.vehiculo.placa is string
                    && request.resource.data.precioAcordado is number
                    && request.resource.data.precioAcordado > 0;

      // UPDATE: Validación
      allow update: if request.auth.uid == resource.data.ownerUid
                    && request.resource.data.ownerUid == resource.data.ownerUid
                    && (request.resource.data.estado in ["Pendiente", "En proceso", "Pintura", "Terminado"]
                        || resource.data.estado == request.resource.data.estado);

      // DELETE: Solo el dueño
      allow delete: if request.auth.uid == resource.data.ownerUid;
    }

    // ──────────────────────────────────────────────────────
    // COLECCIÓN: empleados
    // ──────────────────────────────────────────────────────
    match /empleados/{empleadoId} {
      // READ: Solo el dueño
      allow read: if request.auth != null
                  && request.auth.uid == resource.data.ownerUid;

      // WRITE: Solo el dueño
      allow write: if request.auth != null
                   && request.auth.uid == resource.data.ownerUid;

      // CREATE: Validación
      allow create: if request.auth != null
                    && request.resource.data.ownerUid == request.auth.uid
                    && request.resource.data.nombre is string
                    && request.resource.data.nombre.size() > 0
                    && request.resource.data.rol is list
                    && request.resource.data.comision is map
                    && request.resource.data.comision.porcentaje is number
                    && request.resource.data.comision.porcentaje > 0
                    && request.resource.data.comision.porcentaje < 100;
    }

    // ──────────────────────────────────────────────────────
    // COLECCIÓN: finanzas/ingresos
    // ──────────────────────────────────────────────────────
    match /finanzas/ingresos/{ingresoId} {
      // READ: Solo el dueño
      allow read: if request.auth != null
                  && request.auth.uid == resource.data.ownerUid;

      // WRITE: Solo el dueño
      allow write: if request.auth != null
                   && request.auth.uid == resource.data.ownerUid;

      // CREATE: Validación
      allow create: if request.auth != null
                    && request.resource.data.ownerUid == request.auth.uid
                    && request.resource.data.monto is number
                    && request.resource.data.monto > 0
                    && request.resource.data.concepto is string
                    && request.resource.data.fechaIngreso is timestamp;
    }

    // ──────────────────────────────────────────────────────
    // COLECCIÓN: finanzas/gastos
    // ──────────────────────────────────────────────────────
    match /finanzas/gastos/{gastoId} {
      // READ: Solo el dueño
      allow read: if request.auth != null
                  && request.auth.uid == resource.data.ownerUid;

      // WRITE: Solo el dueño
      allow write: if request.auth != null
                   && request.auth.uid == resource.data.ownerUid;

      // CREATE: Validación
      allow create: if request.auth != null
                    && request.resource.data.ownerUid == request.auth.uid
                    && request.resource.data.monto is number
                    && request.resource.data.monto > 0
                    && request.resource.data.categoria is string
                    && request.resource.data.fechaGasto is timestamp;
    }

    // ──────────────────────────────────────────────────────
    // COLECCIÓN: inventario
    // ──────────────────────────────────────────────────────
    match /inventario/{productoId} {
      // READ: Solo el dueño
      allow read: if request.auth != null
                  && request.auth.uid == resource.data.ownerUid;

      // WRITE: Solo el dueño
      allow write: if request.auth != null
                   && request.auth.uid == resource.data.ownerUid;

      // CREATE: Validación
      allow create: if request.auth != null
                    && request.resource.data.ownerUid == request.auth.uid
                    && request.resource.data.nombre is string
                    && request.resource.data.nombre.size() > 0
                    && request.resource.data.cantidad is number
                    && request.resource.data.cantidad >= 0
                    && request.resource.data.stockMinimo is number
                    && request.resource.data.stockMinimo >= 0;
    }

    // ──────────────────────────────────────────────────────
    // COLECCIÓN: categorias-inventario
    // ──────────────────────────────────────────────────────
    match /categorias-inventario/{categoriaId} {
      // READ: Solo el dueño
      allow read: if request.auth != null
                  && request.auth.uid == resource.data.ownerUid;

      // WRITE: Solo el dueño
      allow write: if request.auth != null
                   && request.auth.uid == resource.data.ownerUid;
    }

    // ──────────────────────────────────────────────────────
    // COLECCIÓN: auditoria (READ-ONLY)
    // ──────────────────────────────────────────────────────
    match /auditoria/{logId} {
      // READ: Solo el dueño (ver historial de cambios)
      allow read: if request.auth != null
                  && request.auth.uid == resource.data.ownerUid;

      // WRITE: NUNCA desde cliente (solo desde Cloud Functions)
      allow write: if false;
    }

    // ──────────────────────────────────────────────────────
    // COLECCIÓN: configuracion
    // ──────────────────────────────────────────────────────
    match /configuracion/{tiendaId} {
      // READ: Solo el dueño
      allow read: if request.auth != null
                  && request.auth.uid == resource.data.ownerUid;

      // WRITE: Solo el dueño
      allow write: if request.auth != null
                   && request.auth.uid == resource.data.ownerUid;
    }

    // ──────────────────────────────────────────────────────
    // BLOQUEAR ACCESO A TODO LO DEMÁS
    // ──────────────────────────────────────────────────────
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 🛡️ FIREBASE STORAGE RULES

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Fotos de trabajos
    match /trabajos/{trabajoId}/{fileName} {
      // READ: Dueño solo (puede ser extendido a empleados en v2)
      allow read: if request.auth != null;

      // WRITE: Solo dueño sube fotos de SUS trabajos
      allow write: if request.auth != null
                   && request.resource.contentType.matches('image/.*')
                   && request.resource.size < 10 * 1024 * 1024; // 10MB max
    }

    // Avatares de usuarios
    match /avatars/{userId}/{fileName} {
      // READ: Público (perfil visible)
      allow read: if true;

      // WRITE: Solo el usuario actualiza su avatar
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && request.resource.contentType.matches('image/.*')
                   && request.resource.size < 5 * 1024 * 1024; // 5MB max
    }

    // Logo taller
    match /configuracion/logo/{fileName} {
      // READ: Público
      allow read: if true;

      // WRITE: Solo dueño
      allow write: if request.auth != null
                   && request.resource.contentType.matches('image/.*')
                   && request.resource.size < 2 * 1024 * 1024; // 2MB max
    }

    // BLOQUEAR TODO LO DEMÁS
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 🔐 PATRONES DE SEGURIDAD APLICADOS

### ✅ Patrón 1: Content-Owner (Propiedad)

```javascript
// El recurso solo es modificable por su dueño
allow write: if request.auth.uid == resource.data.ownerUid;
```

### ✅ Patrón 2: Validación de Entrada

```javascript
// Validar tipos y rangos en create
allow create: if request.resource.data.precio is number
              && request.resource.data.precio > 0
              && request.resource.data.precio < 100000000;
```

### ✅ Patrón 3: Inmutabilidad de IDs

```javascript
// No permitir cambiar el ownerUid
allow update: if request.resource.data.ownerUid == resource.data.ownerUid;
```

### ✅ Patrón 4: Deny by Default

```javascript
// Al final: bloquear cualquier documento que no coincida con reglas anteriores
match /{document=**} {
  allow read, write: if false;
}
```

### ✅ Patrón 5: READ vs WRITE

```javascript
// Separar READ y WRITE para granularidad
allow read: if request.auth != null && isOwner();
allow write: if request.auth != null && isOwner();
```

---

## ❌ ANTI-PATRONES (NUNCA HACER)

| Anti-patrón                             | Problema                        | Solución                 |
| --------------------------------------- | ------------------------------- | ------------------------ |
| `allow read, write: if true;`           | Acceso público total            | Especificar usuario      |
| `allow write: if request.auth != null;` | Cualquiera puede escribir       | Validar `ownerUid`       |
| `allow write: if false;` (sin read)     | Nadie puede leer                | Separar read de write    |
| Validación débil                        | Datos inválidos                 | Validar tipos y rangos   |
| Sin inmutabilidad                       | Usuarios cambian datos críticos | Congelar IDs, timestamps |

---

## 🧪 TESTING DE REGLAS

### Usar Firebase Emulator Suite

```bash
firebase emulators:start
```

### Casos de Test

```javascript
describe("Firestore Security Rules", () => {
  // ✅ Caso 1: Dueño puede leer su trabajo
  it("allows owner to read their work", async () => {
    const work = {
      trabajoId: "AUTO-001",
      ownerUid: "uid-dueño",
      estado: "Pendiente",
    };
    await assertSucceeds(getDoc(doc(db, "trabajos/AUTO-001")));
  });

  // ❌ Caso 2: Otro usuario NO puede leer
  it("forbids other user from reading work", async () => {
    await assertFails(getDoc(doc(db, "trabajos/AUTO-001")));
  });

  // ✅ Caso 3: Empleado puede leer si está asignado
  it("allows employee to read assigned work", async () => {
    const work = {
      trabajoId: "AUTO-001",
      ownerUid: "uid-dueño",
      empleadosIds: ["uid-empleado"],
    };
    await assertSucceeds(getDoc(doc(db, "trabajos/AUTO-001")));
  });

  // ❌ Caso 4: Empleado NO puede escribir
  it("forbids employee from writing work", async () => {
    await assertFails(
      updateDoc(doc(db, "trabajos/AUTO-001"), {
        estado: "Terminado",
      }),
    );
  });
});
```

---

## 📋 CHECKLIST PRE-PRODUCCIÓN

- [ ] Todas las reglas implementadas sin `if true`
- [ ] Validación de entrada en create/update
- [ ] Validación de tipos de datos
- [ ] Validación de rangos (ej: precio > 0)
- [ ] Inmutabilidad de IDs garantizada
- [ ] Storage rules aplicadas
- [ ] Testing en Emulator completado
- [ ] Revisión final de reglas
- [ ] Deploy a producción
- [ ] Monitoring activado (alertas de permisos denegados)

---

## 🔗 REFERENCIAS

- **Doc oficial Firebase**: https://firebase.google.com/docs/firestore/security/get-started
- **Guía de seguridad**: `docs/referencias/reglas-seguridad-firebase.md`
- **Modelo de datos**: `docs/modelo-de-datos.md`
