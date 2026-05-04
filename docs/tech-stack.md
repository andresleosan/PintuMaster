# 🔧 TECH STACK — PINTUMASTER

**Versión:** 1.0  
**Fecha:** 3 de mayo de 2026  
**Objetivo SLA:** 99.9% uptime

---

## 📋 STACK DEFINIDO

### **FRONTEND**

| Herramienta         | Versión | Propósito        | Justificación                                             |
| ------------------- | ------- | ---------------- | --------------------------------------------------------- |
| **React**           | 18.x    | Framework UI     | Componentes reutilizables, DOM virtual, ecosistema maduro |
| **TypeScript**      | 5.x     | Tipado estático  | Prevenir errores en compilación, mejor DX                 |
| **Vite**            | 5.x     | Bundler          | Build rápido, HMR instantáneo, mejor que Webpack          |
| **Tailwind CSS**    | 3.x     | Styling          | Utility-first, mobile-first, consistencia de diseño       |
| **React Router**    | 6.x     | Navegación       | SPA con rutas sin recargar página                         |
| **React Query**     | 5.x     | Data fetching    | Caché inteligente, sincronización de datos                |
| **Zustand**         | 4.x     | State management | Ligero, simple, alternativa a Redux                       |
| **React Hook Form** | 7.x     | Manejo de forms  | Validación, performance, DX                               |
| **React Toastify**  | 10.x    | Notificaciones   | Alerts visuales de acciones                               |

### **BACKEND & BASE DE DATOS**

| Herramienta          | Versión | Propósito               | Justificación                                   |
| -------------------- | ------- | ----------------------- | ----------------------------------------------- |
| **Firebase**         | SDK v9+ | Backend completo        | Serverless, auth, Firestore, Storage, Functions |
| **Firestore**        | v9+     | Base de datos           | NoSQL, tiempo real, escalable, transacciones    |
| **Firebase Auth**    | v9+     | Autenticación           | Seguridad OAuth, email/password, 2FA            |
| **Firebase Storage** | v9+     | Almacenamiento archivos | Fotos antes/después de trabajos                 |
| **Cloud Functions**  | 2.x     | Backend lógica          | Validaciones servidor, integraciones externas   |

### **INTEGRACIONES EXTERNAS**

| Servicio                  | Propósito              | Plan     | Justificación                           |
| ------------------------- | ---------------------- | -------- | --------------------------------------- |
| **WhatsApp Business API** | Notificaciones cliente | Standard | Automatizar mensajes de estado          |
| **Bancolombia Connect**   | Webhook transacciones  | API      | Detectar transferencias automáticamente |
| **Nequi API**             | Webhook transacciones  | API      | Detectar transferencias automáticamente |

### **HERRAMIENTAS DE DESARROLLO**

| Herramienta           | Propósito                         |
| --------------------- | --------------------------------- |
| **ESLint**            | Linting de código JavaScript      |
| **Prettier**          | Formateo automático de código     |
| **Jest**              | Testing unitario                  |
| **Vitest**            | Testing rápido (alternativa Jest) |
| **Cypress**           | Testing E2E                       |
| **Firebase Emulator** | Testing local de Firebase         |

---

## 🏗️ ARQUITECTURA GENERAL

```
┌─────────────────────────────────────────────────┐
│ React (UI Components) ← React Router ← Zustand  │  ← FRONTEND
├─────────────────────────────────────────────────┤
│ Firebase SDK (Auth + Firestore + Storage)       │  ← SDK CLIENT
├─────────────────────────────────────────────────┤
│ Firebase Backend (Cloud Functions)              │  ← BACKEND
├─────────────────────────────────────────────────┤
│ Firestore (Database) + Storage (Fotos)          │  ← DATA
├─────────────────────────────────────────────────┤
│ Integraciones: WhatsApp, Bancolombia, Nequi     │  ← EXTERNOS
└─────────────────────────────────────────────────┘
```

---

## 🚀 DIAGRAMA DE FLUJO DE DATOS

```
Usuario (Mobile/Desktop)
    │
    ├─→ [React App]
    │   ├─→ Zustand (Estado local)
    │   ├─→ React Query (Cache datos)
    │   └─→ React Hook Form (Formularios)
    │
    ├─→ [Firebase SDK]
    │   ├─→ Auth (Login)
    │   ├─→ Firestore (Read/Write)
    │   └─→ Storage (Upload fotos)
    │
    ├─→ [Firebase Backend]
    │   ├─→ Cloud Functions (Lógica)
    │   ├─→ WhatsApp API → Notificación cliente
    │   └─→ Bancolombia/Nequi webhooks → Ingresos auto
    │
    └─→ [Firestore + Storage]
        ├─→ Collections (trabajos, empleados, etc.)
        └─→ Archivos (fotos)
```

---

## 📦 DEPENDENCIAS PRINCIPALES (package.json)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.x",
    "react-query": "^3.x",
    "zustand": "^4.x",
    "react-hook-form": "^7.x",
    "react-toastify": "^10.x",
    "firebase": "^9.x",
    "axios": "^1.x",
    "date-fns": "^2.x",
    "recharts": "^2.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x",
    "eslint": "^8.x",
    "prettier": "^3.x",
    "jest": "^29.x",
    "vitest": "^1.x",
    "cypress": "^13.x"
  }
}
```

---

## 🔐 SEGURIDAD — REGLAS FIREBASE

### Firestore Security Rules (CRÍTICO)

**Principio: Deny by default**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Dueño solo (admin)
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Trabajos (dueño + empleados asignados)
    match /trabajos/{trabajoId} {
      allow read: if request.auth.uid == resource.data.ownerUid
                  || request.auth.uid in resource.data.empleadosIds;
      allow write: if request.auth.uid == resource.data.ownerUid;
    }

    // Empleados (solo dueño)
    match /empleados/{empleadoId} {
      allow read, write: if request.auth.uid == request.auth.token.ownerUid;
    }

    // Finanzas (solo dueño)
    match /finanzas/{documentId} {
      allow read, write: if request.auth.uid == request.auth.token.ownerUid;
    }

    // Inventario (solo dueño)
    match /inventario/{productoId} {
      allow read, write: if request.auth.uid == request.auth.token.ownerUid;
    }

    // Auditoría (solo lectura para dueño)
    match /auditoria/{logId} {
      allow read: if request.auth.uid == request.auth.token.ownerUid;
      allow write: if false;
    }

    // Bloquear todo lo demás
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**Referencias**: Ver `docs/referencias/reglas-seguridad-firebase.md` para detalles completos.

### Firebase Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Fotos de trabajos: solo dueño sube
    match /trabajos/{trabajoId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == request.auth.token.ownerUid
                   && request.resource.contentType.matches('image/.*')
                   && request.resource.size < 10 * 1024 * 1024;
    }

    // Bloquear todo lo demás
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 🌐 HOSTING & DEPLOYMENT

| Aspecto           | Solución                  | Plan                 |
| ----------------- | ------------------------- | -------------------- |
| **Frontend**      | Vercel / Firebase Hosting | Pro (para CI/CD)     |
| **Backend**       | Firebase Cloud Functions  | Blaze (pago por uso) |
| **Database**      | Firestore                 | Blaze                |
| **Storage**       | Firebase Storage          | Blaze                |
| **Custom Domain** | Namecheap / CloudFlare    | Estándar             |
| **CI/CD**         | GitHub Actions            | Gratuito             |
| **Monitoring**    | Firebase Console + Sentry | Freemium             |

---

## 📊 PERFORMANCE & ESCALABILIDAD

### Targets

| Métrica                    | Target | Cómo lograrlo                |
| -------------------------- | ------ | ---------------------------- |
| **First Contentful Paint** | < 1.5s | Code splitting, lazy loading |
| **Time to Interactive**    | < 3s   | Minimal JS, prefetch routes  |
| **Lighthouse Score**       | > 90   | Optimization continua        |
| **Mobile Friendly**        | 100%   | Mobile-first design          |
| **SLA Uptime**             | 99.9%  | Firebase Blaze SLA           |

### Caching Strategy

```
┌──────────────────────────────────────┐
│ Navegador (IndexedDB + LocalStorage) │
├──────────────────────────────────────┤
│ React Query (Memory + Persistent)    │
├──────────────────────────────────────┤
│ Firebase (Realtime Sync)             │
└──────────────────────────────────────┘
```

---

## 🧪 TESTING STRATEGY

| Nivel           | Herramienta              | Cobertura              |
| --------------- | ------------------------ | ---------------------- |
| **Unitario**    | Vitest                   | Funciones puras        |
| **Componentes** | Vitest + Testing Library | Componentes React      |
| **E2E**         | Cypress                  | User journeys críticos |
| **Firebase**    | Firebase Emulator        | Reglas, datos          |

---

## 🔧 CONFIGURACIÓN VITE

```javascript
// vite.config.ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:5001", // Emulator Functions
    },
  },
  build: {
    target: "esnext",
    sourcemap: false,
    minify: "terser",
  },
});
```

---

## 📱 RESPONSIVE & BROWSER SUPPORT

### Breakpoints Tailwind

```css
sm: 640px   /* mobile large */
md: 768px   /* tablet */
lg: 1024px  /* desktop */
xl: 1280px  /* desktop wide */
2xl: 1536px /* desktop ultra */
```

### Navegadores soportados

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Chrome/Safari (últimas 2 versiones)

---

## 🚦 CHECKLIST PRE-LANZAMIENTO

- [ ] Todas las reglas Firebase implementadas
- [ ] Firestore + Storage rules auditadas
- [ ] HTTPS habilitado
- [ ] Headers de seguridad (CSP, X-Frame-Options, etc.)
- [ ] API keys en .env (nunca hardcodeadas)
- [ ] Firebase App Check habilitado
- [ ] Testing E2E críticos pasando
- [ ] Lighthouse score > 90
- [ ] Auditoría Cybersecurity completada
- [ ] Checklist del PDF de seguridad ✅ 100%
