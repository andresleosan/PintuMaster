# 🎯 FASES DEL PROYECTO — PINTUMASTER

**Versión:** 1.1  
**Fecha:** 4 de mayo de 2026  
**Duración estimada:** 12-16 semanas

---

## 📊 RESUMEN EJECUTIVO

| Fase  | Nombre                      | Duración    | Deliverable                                |
| ----- | --------------------------- | ----------- | ------------------------------------------ |
| **1** | Documentación & Maquetación | 2-3 semanas | Maquetas HTML/CSS + Documentación completa |
| **2** | Integración React           | 3-4 semanas | Componentes React funcionales sin Firebase |
| **3** | Integración Firebase        | 4-5 semanas | App completa y lista para producción       |

---

## ⏳ FASE 1: DOCUMENTACIÓN & MAQUETACIÓN

**Duración:** 2-3 semanas  
**Estado:** ✅ COMPLETADA

### Objetivos

- [ ] Documentación completa de funcionalidades y requisitos
- [ ] Sistema de diseño definido y especificado
- [ ] Maquetas HTML + CSS (responsive, sin React)
- [ ] Validación visual mobile y desktop
- [ ] Componentes UI base identificados

### Subfases

#### **1.1 Definición del Sistema de Diseño Completo** ✅ COMPLETADA

**Estado:** Iniciado 3-may-2026 — Completado 4-may-2026  
**Entrega realizada:** `docs/sistema-de-diseno.md`

**Tareas realizadas**:

- [x] Extraer paleta de colores de imagen oficial
- [x] Documentar tipografía (Poppins Bold/Regular)
- [x] Crear sistema de espaciados (escala 4px)
- [x] Especificar componentes base (Button, Badge, Card, Input, etc.)
- [x] Documentar estados de trabajo y alertas
- [x] Crear archivo `sistema-de-diseno.md`

**Criterio de éxito**:

- Documento `sistema-de-diseno.md` con:
  - Paleta completa con hex + RGB
  - Tipografía con ejemplos
  - Componentes especificados con CSS
  - Tokens Tailwind configurados
  - Ejemplos visuales en vivo

---

#### **1.2 Aprobación del Sistema de Diseño** ✅ COMPLETADA

**Estado:** Aprobado por el dueño 4-may-2026  
**Duración:** 1 día

**Tareas**:

- [x] Presentar `sistema-de-diseno.md` al dueño
- [x] Obtener feedback y ajustes
- [x] Revisión final
- [x] Aprobación para proceder

**Criterio de éxito**:

- Dueño dice: "Aprobado, procede con maquetas"

---

#### **1.3 Maquetación HTML + CSS Puro** ✅ COMPLETADA

**Estado:** Completada  
**Duración real:** 8-10 días

**Vistas maquetadas**:

- [x] Login (1 página)
- [x] Dashboard (mobile + desktop)
- [x] Trabajos — Listado
- [x] Trabajos — Crear
- [x] Trabajos — Detalle
- [x] Trabajos — Editar
- [x] Finanzas — Dashboard
- [x] Finanzas — Registrar ingreso
- [x] Finanzas — Registrar gasto
- [x] Inventario — Listado
- [x] Inventario — Agregar producto
- [x] Empleados — Listado
- [x] Empleados — Crear
- [x] Reportes — Dashboard
- [x] Ajustes — Dashboard
- [x] Ajustes — Configurar taller
- [x] Ajustes — Comisiones

**Tareas por vista**:

- [x] Crear archivo HTML (en `maquetas/`)
- [x] Aplicar CSS (Tailwind utility classes)
- [x] Validar responsive 📱 (mobile first)
- [x] Validar responsive 💻 (desktop)
- [x] Agregar interactividad básica (hover, focus)

**Estructura archivos (existente)**:

```
maquetas/
├── 01-login.html
├── 02-dashboard.html
├── 03-trabajos-listado.html
├── 04-trabajos-crear.html
├── 10-trabajo-detalle.html
├── 05-finanzas.html
├── 11-crear-ingreso.html
├── 12-crear-gasto.html
├── 06-inventario.html
├── 07-empleados.html
├── 08-reportes.html
├── 09-ajustes.html
├── README.md
└── css/
  ├── tailwind.css
  ├── custom.css
  └── animations.css
```

**Criterio de éxito**:

- Todas las vistas maquetadas
- Responsive valido en 320px - 2560px
- Interactividad básica funcional
- Sin ningún bug visual
- Componentes reutilizables identificados

---

#### **1.4 Validación Responsive Mobile** ✅ COMPLETADA

**Estado:** Validación realizada  
**Duración:** 3 días

**Tareas**:

- [x] Abrir cada maqueta en Chrome DevTools (responsive mode)
- [x] Probar en breakpoints: 320px, 375px, 425px, 768px, 1024px+
- [x] Validar que no haya overflow horizontal
- [x] Validar que botones sean >= 48px × 48px (táctiles)
- [x] Validar que texto sea legible (mínimo 14px en mobile)
- [x] Agregar @media queries donde sea necesario
- [x] Documentar problemas encontrados y soluciones

**Criterio de éxito**:

- Checklist de validación 100% completo
- Todas las vistas funcionan perfectamente en mobile

---

#### **1.5 Documentación de Estructura de Componentes** ✅ COMPLETADA

**Estado:** Documentación creada  
**Duración:** 2 días

**Tareas**:

- [x] Analizar todas las maquetas
- [x] Identificar componentes reutilizables
- [x] Crear archivo `componentes-ui.md`
- [x] Documentar props, estados y comportamientos
- [x] Especificar cómo se composicionan para formar páginas

**Ejemplo**:

```markdown
## Button

Props:

- variant: 'primary' | 'secondary'
- size: 'sm' | 'md' | 'lg'
- onClick: () => void
- disabled: boolean

Estados:

- default
- hover
- active
- disabled
- loading
```

---

**Última sincronización:** 4 de mayo de 2026 — estados actualizados desde `docs/CONTINUIDAD.md`

Ejemplos de uso:

- CTA en formularios (primary, lg)
- Acciones secundarias (secondary, md)
- Cancelar (secondary, sm)

```

**Criterio de éxito**:

- `componentes-ui.md` completo
- Cada componente documentado con props, estados, ejemplos

---

### 🎯 Criterios de Éxito — FASE 1

- [x] Documentación DDD completa (`docs/` lleno)
- [ ] Sistema de diseño aprobado por dueño
- [ ] Todas las vistas maquetadas en HTML/CSS
- [ ] Responsive valido en todo rango de dispositivos
- [ ] Componentes identificados y documentados
- [ ] **Estado**: 🟡 EN PROGRESO (1.1 completado, 1.2 en inicio)

---

## ⏳ FASE 2: INTEGRACIÓN CON REACT + TYPESCRIPT

**Duración:** 3-4 semanas
**Estado:** 🔴 NO INICIADA

### Objetivos

- [ ] Convertir maquetas HTML a componentes React tipados
- [ ] Implementar navegación entre vistas (React Router)
- [ ] Estado local funcional (Zustand)
- [ ] Conectar lógica sin Firebase (mocks de datos)
- [ ] Tests unitarios de componentes

### Subfases

#### **2.1 Setup Proyecto Vite + React + TypeScript** ⏳ PRÓXIMO

- [ ] Crear proyecto con `npm create vite@latest`
- [ ] Instalar dependencias (React, React Router, Zustand, Tailwind, etc.)
- [ ] Configurar TypeScript
- [ ] Configurar Tailwind CSS
- [ ] Setup ESLint + Prettier
- [ ] Estructura de carpetas creada (según `arquitectura-del-proyecto.md`)

#### **2.2 Crear Componentes UI Base** ⏳ PRÓXIMO

- [ ] Button, Badge, Card, Input, Select, Modal, Toast
- [ ] Documentar en Storybook
- [ ] Tests unitarios para cada componente

#### **2.3 Crear Componentes de Layout** ⏳ PRÓXIMO

- [ ] Header
- [ ] Sidebar (desktop)
- [ ] NavBar (mobile)
- [ ] Layout principal (envoltura)
- [ ] ProtectedRoute

#### **2.4 Convertir Páginas** ⏳ PRÓXIMO

- [ ] Dashboard
- [ ] Works (CRUD)
- [ ] Finance (dashboard + forms)
- [ ] Inventory (listado + forms)
- [ ] Employees (listado + forms)
- [ ] Reports
- [ ] Settings
- [ ] Login

#### **2.5 Implementar Navegación (React Router)** ⏳ PRÓXIMO

- [ ] Rutas públicas (login)
- [ ] Rutas protegidas (todo lo demás)
- [ ] Links funcionales en navbar/sidebar
- [ ] Redirecciones según rol (solo dueño en v1)

#### **2.6 Estado Global (Zustand Stores)** ⏳ PRÓXIMO

- [ ] useAuthStore
- [ ] useWorkStore
- [ ] useFinanceStore
- [ ] useInventoryStore
- [ ] useEmployeeStore
- [ ] useUIStore

#### **2.7 Mocks de Datos** ⏳ PRÓXIMO

- [ ] Datos falsos para testing
- [ ] API local simulada
- [ ] Integración con componentes

#### **2.8 Tests Unitarios** ⏳ PRÓXIMO

- [ ] Setup Jest/Vitest
- [ ] Tests para componentes UI
- [ ] Tests para hooks
- [ ] Cobertura mínima: 70%

### 🎯 Criterios de Éxito — FASE 2

- [ ] App funcional sin Firebase
- [ ] Navegación completa
- [ ] Todos los formularios funcionan con mocks
- [ ] Responsive en mobile y desktop
- [ ] 70%+ test coverage
- [ ] Pronto para integración Firebase

---

## ⏳ FASE 3: INTEGRACIÓN CON FIREBASE

**Duración:** 4-5 semanas
**Estado:** 🔴 NO INICIADA

### Objetivos

- [ ] Configurar Firebase (Auth, Firestore, Storage)
- [ ] Implementar reglas de seguridad estrictas
- [ ] Conectar app con datos reales
- [ ] Implementar auditoría de cambios
- [ ] Integrar WhatsApp Business API
- [ ] Integraciones Bancolombia/Nequi
- [ ] Auditoría final de seguridad

### Subfases

#### **3.1 Revisar Reglas de Seguridad (PDF)** ⏳ PRÓXIMO

- [ ] Leer completo `docs/referencias/reglas-seguridad-firebase.md`
- [ ] Documentar en `docs/reglas-firestore.md`
- [ ] Identificar violaciones potenciales
- [ ] NO proceder a 3.2 sin revisión

#### **3.2 Configurar Firebase** ⏳ PRÓXIMO

- [ ] Crear proyecto en Firebase Console
- [ ] Configurar autenticación (email/password)
- [ ] Crear colecciones Firestore
- [ ] Crear Storage buckets
- [ ] Verificar reglas por defecto (DENEGAR TODO)

#### **3.3 Implementar Firestore Rules** ⏳ PRÓXIMO

- [ ] Implementar reglas por colección
- [ ] Testing con Firebase Simulator
- [ ] Validar que solo dueño accede a datos
- [ ] Validar que empleados ven solo sus trabajos
- [ ] Documentar en `docs/reglas-firestore.md`

#### **3.4 Implementar Storage Rules** ⏳ PRÓXIMO

- [ ] Validar autenticación
- [ ] Validar MIME type (solo imágenes)
- [ ] Validar tamaño (< 10MB)
- [ ] Bloquear acceso a directorios sensibles

#### **3.5 Crear Services Firebase** ⏳ PRÓXIMO

- [ ] firestore/workService.ts
- [ ] firestore/financeService.ts
- [ ] firestore/inventoryService.ts
- [ ] firestore/employeeService.ts
- [ ] firestore/userService.ts
- [ ] storage/photoService.ts
- [ ] auth/authService.ts

#### **3.6 Conectar Componentes a Firebase** ⏳ PRÓXIMO

- [ ] Reemplazar mocks por llamadas reales
- [ ] Implementar React Query para caching
- [ ] Manejo de errores
- [ ] Loading states

#### **3.7 Implementar Auditoría** ⏳ PRÓXIMO

- [ ] Collection 'auditoria' en Firestore
- [ ] Registrar: quién, qué, cuándo, en qué
- [ ] Vista en dashboard (solo dueño)
- [ ] Proteger auditoría (read-only)

#### **3.8 Integración WhatsApp Business API** ⏳ PRÓXIMO

- [ ] Setup WhatsApp Business
- [ ] Crear Cloud Function para enviar mensajes
- [ ] Implementar botón "Enviar a cliente"
- [ ] Testing en sandbox

#### **3.9 Integración Bancolombia/Nequi** ⏳ PRÓXIMO

- [ ] Setup webhooks
- [ ] Crear Cloud Function para recibir notificaciones
- [ ] Mapeo automático de ingresos
- [ ] Testing de transacciones

#### **3.10 Tests de Integración** ⏳ PRÓXIMO

- [ ] E2E tests con Cypress
- [ ] Testing de workflows críticos
- [ ] Testing de seguridad (intentos de bypass)
- [ ] Testing offline

#### **3.11 Auditoría Final de Seguridad** ⏳ PRÓXIMO

- [ ] Checklist del PDF (12 puntos)
- [ ] Verificar NO hay `if true`, `USING (true)`, etc.
- [ ] Verificar NO hay secrets hardcodeadas
- [ ] Verificar CORS configurado
- [ ] Verificar headers de seguridad
- [ ] Penetration testing básico

#### **3.12 Performance & Deployment** ⏳ PRÓXIMO

- [ ] Optimización Lighthouse
- [ ] Setup CI/CD (GitHub Actions)
- [ ] Deployment a Vercel / Firebase Hosting
- [ ] Monitoring setup
- [ ] Rollback plan

### 🎯 Criterios de Éxito — FASE 3

- [ ] App 100% funcional con datos reales
- [ ] Reglas Firebase restrictivas implementadas
- [ ] Auditoría de cambios funcionando
- [ ] WhatsApp y Bancolombia/Nequi integrados
- [ ] Checklist de seguridad 100% ✅
- [ ] 99.9% uptime objetivo
- [ ] Listo para producción

---

## 📈 CRONOGRAMA GLOBAL

```

Mayo 2026:
├─ 03-07: Fase 1.1 (Sistema diseño)
├─ 08-09: Fase 1.2 (Aprobación)
├─ 10-20: Fase 1.3-1.5 (Maquetas + validación)
└─ 21-31: Buffer / Fase 2 inicio

Junio 2026:
├─ 01-30: Fase 2 (React setup + componentes)

Julio 2026:
├─ 01-15: Fase 2 (Finalización)
└─ 16-31: Fase 3 inicio (Firebase setup)

Agosto 2026:
├─ 01-31: Fase 3 (Integración completa)

Septiembre 2026:
├─ 01-15: Testing + auditoría
└─ 16-30: Deploy + buffer

```

---

## 🔄 CÓMO LEER ESTE DOCUMENTO

1. **Retomando proyecto**: Lee "Estado" de cada fase
2. **Próximo paso**: Lee subfase con estado "PRÓXIMO"
3. **Trabajando**: Marca tareas como completadas
4. **Finalizado**: Cambiar estado a 🟢 COMPLETADA

---

## ✅ CHECKLIST GENERAL

- [x] Fase 1.1 iniciada (3-may-2026)
- [ ] Fase 1.1 completada (estimado 7-may-2026)
- [ ] Fase 1.2-1.5 iniciadas
- [ ] Fase 2 iniciada
- [ ] Fase 2 completada
- [ ] Fase 3 iniciada
- [ ] Fase 3 completada
- [ ] Deploy a producción
- [ ] 📊 Monitoreo en vivo
```
