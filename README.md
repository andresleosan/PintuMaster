# 📖 README — PINTUMASTER

**Versión:** 1.0  
**Estado:** 🟡 EN PROGRESO — Fase 1.2 (Aprobación sistema diseño)  
**Última actualización:** 3 de mayo de 2026

**Enlace de producción:** https://dash.cloudflare.com/05fb22c155667de064b55c4e287b21d8/workers/services/view/pintumaster/production/builds/a75f1ef5-655e-402a-93e3-cd2409670ed6

---

## 🎯 DESCRIPCIÓN DEL PROYECTO

**PintuMaster** es una aplicación web y mobile-first para la **gestión integral del taller de latonería y pintura automotriz** "PintuMaster" de Jhon Cardona, ubicado en Medellín.

### Misión

Permitir que el dueño controle **trabajos, finanzas, empleados e inventario** desde su celular de forma rápida, sin complicaciones y en tiempo real.

### Eslogan

**"Tu taller en orden, tu dinero bajo control."**

---

## 🚀 STACK TECNOLÓGICO

| Capa              | Tecnología                                           |
| ----------------- | ---------------------------------------------------- |
| **Frontend**      | React 18 + TypeScript + Tailwind CSS + Vite          |
| **Backend**       | Firebase (Firestore, Auth, Storage, Cloud Functions) |
| **Database**      | Firestore (NoSQL)                                    |
| **Hosting**       | Vercel (Frontend) + Firebase (Backend)               |
| **Integraciones** | WhatsApp Business API, Bancolombia, Nequi            |

**Objetivo SLA**: 99.9% uptime

---

## 📋 MÓDULOS (v1)

- ✅ **Dashboard** — Métricas, gráfico, trabajos recientes
- ✅ **Gestión de Trabajos** — CRUD completo con fotos y auditoría
- ✅ **Finanzas** — Ingresos, gastos, utilidad automática + cierre semanal
- ✅ **Inventario** — Stock, alertas, compras (genera gastos automáticos)
- ✅ **Empleados** — Equipo, productividad, comisiones por trabajo
- ✅ **Reportes** — Trabajos, finanzas, empleados, inventario
- ✅ **Autenticación** — Email + contraseña (Firebase Auth)
- ✅ **Ajustes** — Configuración del taller, comisiones, categorías

---

## 📁 ESTRUCTURA DEL PROYECTO

```
docs/                                    # 📚 DOCUMENTACIÓN (TODO aquí)
├── CONTINUIDAD.md                      ⭐ Fuente de verdad del proyecto
├── INDICE.md                           📖 Índice maestro
├── alcance-del-proyecto.md             ✅ Qué sí/no en v1
├── sistema-de-diseno.md                🎨 Colores, tipografía, componentes
├── tech-stack.md                       🔧 Stack + justificación
├── arquitectura-del-proyecto.md        📋 Estructura de carpetas + patrones
├── fases-del-proyecto.md               🎯 Fases 1-3 con subfases
├── modelo-de-datos.md                  🗄️ Firestore collections
├── flujos-de-usuario.md                🌊 User journeys
├── reglas-firestore.md                 🔐 Security rules (CRÍTICO)
├── componentes-ui.md                   🧩 Especificación componentes React
└── referencias/
    └── reglas-seguridad-firebase.md   📖 Síntesis del PDF de seguridad

src/                                     # 💻 CÓDIGO FUENTE (aún vacío)
├── config/
├── types/
├── store/
├── services/
├── hooks/
├── components/
├── pages/
├── utils/
├── styles/
└── App.tsx

public/                                  # 🖼️ ASSETS ESTÁTICOS
README.md                               # Este archivo
```

---

## 🎯 DECISIONES CLAVE TOMADAS

### 1. **Seguridad — Reglas Firebase Strictas**

- NO usar `if true` (causa raíz de 90% de breaches)
- Reglas específicas por colección
- Auditoría de cambios obligatoria
- **Referencia**: `docs/referencias/reglas-seguridad-firebase.md`

### 2. **Roles y Acceso**

- **Dueño**: Acceso total
- **Empleados**: Solo ven trabajos asignados (sin login directo en v1)
- **Público**: Sin acceso

### 3. **Integraciones**

- WhatsApp Business API (automatizar mensajes)
- Bancolombia + Nequi (webhooks de transacciones)

### 4. **Cierre de Caja**

- Semanal (sábados), no diario

### 5. **Comisiones de Empleados**

- Calculadas por trabajo individual, configurable

### 6. **Auditoría**

- Registrar: quién hizo qué, cuándo, en qué

---

## ⏳ FASES DE DESARROLLO

### **FASE 1: Documentación & Maquetación** (2-3 semanas)

🟡 **EN PROGRESO** — Subfase 1.1 completada (3-may-2026)

- [x] Definir sistema de diseño
- [ ] Obtener aprobación
- [ ] Maquetar todas las vistas en HTML/CSS
- [ ] Validar responsive mobile
- [ ] Documentar componentes

**Próximo paso**: Crear maquetas HTML + CSS (Subfase 1.3)

---

### **FASE 2: React + TypeScript** (3-4 semanas)

🔴 **NO INICIADA**

- Setup Vite + React + TypeScript
- Crear componentes UI base
- Implementar navegación
- Estado global (Zustand)
- Mocks de datos

---

### **FASE 3: Firebase Integration** (4-5 semanas)

🔴 **NO INICIADA**

- Configurar Firebase
- Implementar Firestore rules
- Conectar app a datos reales
- Integrar WhatsApp + Bancolombia/Nequi
- Auditoría final de seguridad

---

## 📊 CRONOGRAMA

```
Mayo 2026:     Fase 1 (Sistema diseño + maquetas)
Junio 2026:    Fase 2 (React + componentes)
Julio-Agosto:  Fase 3 (Firebase + integraciones)
Septiembre:    Testing + deployment
```

---

## 🔐 SEGURIDAD — CHECKLIST

**CRÍTICO**: Revisar antes de cualquier feature en Firestore.

- [ ] Reglas de Firestore especificadas (no `if true`)
- [ ] Storage rules aplicadas
- [ ] API keys en variables de entorno (nunca hardcodeadas)
- [ ] Firebase App Check habilitado
- [ ] Headers de seguridad configurados
- [ ] CORS restringido a dominios propios
- [ ] Auditoría de cambios funcionando
- [ ] Contraseñas >= 6 caracteres (Firebase default)
- [ ] HTTPS obligatorio
- [ ] Checklist PDF 12 puntos: 100% ✅

**Referencias**:

- [Reglas Firestore](./docs/reglas-firestore.md)
- [Guía Seguridad Firebase](./docs/referencias/reglas-seguridad-firebase.md)

---

## 🚀 CÓMO COMENZAR

### 1. Lee la Documentación

```bash
# Inicio rápido
cat docs/CONTINUIDAD.md          # ← Comienza aquí

# Exploración según rol
cat docs/alcance-del-proyecto.md       # Qué construimos
cat docs/sistema-de-diseno.md          # Cómo se ve
cat docs/tech-stack.md                 # Qué herramientas
cat docs/modelo-de-datos.md            # Cómo estructurar datos
cat docs/reglas-firestore.md           # Cómo asegurar datos
```

### 2. Configurar Ambiente

```bash
# Próximamente (Fase 2)
npm install
npm run dev
```

### 3. Crear Maquetas (Fase 1.3)

```bash
# Próximamente
# Crear archivos HTML/CSS en carpeta maquetas/
```

---

## 📞 CONTACTO

**Dueño**: Jhon Cardona  
**WhatsApp**: +57 350 422 0461  
**Email**: jhon@pintumaster.com

---

## 📝 NOTAS IMPORTANTES

- 📌 **Retomando sesión**: Lee siempre `docs/CONTINUIDAD.md` primero
- 🔒 **Seguridad es prioridad**: Nunca copiar reglas de otro proyecto sin revisar
- 📱 **Mobile-first**: Toda feature se valida primero en celular
- 🧪 **Testing obligatorio**: Especialmente reglas Firestore
- 🔄 **Actualizar CONTINUIDAD.md**: Al final de cada sesión

---

## ✅ ESTADO DEL PROYECTO

| Aspecto           | Estado         | Última actualización |
| ----------------- | -------------- | -------------------- |
| Documentación     | 🟢 Completa v1 | 3-may-2026           |
| Diseño            | 🟢 Aprobado    | 3-may-2026           |
| Maquetas HTML     | 🔴 Pendiente   | —                    |
| Componentes React | 🔴 Pendiente   | —                    |
| Firebase Setup    | 🔴 Pendiente   | —                    |
| Deploy Producción | 🔴 Pendiente   | —                    |

---

## 📜 LICENCIA

Este proyecto es propietario de Jhon Cardona / PintuMaster.

---

**Última revisión**: 3 de mayo de 2026  
**Próxima revisión**: 7 de mayo de 2026 (Fin Subfase 1.2)
