# 📚 ÍNDICE MAESTRO DE DOCUMENTACIÓN — PINTUMASTER

**Versionado al:** 3 de mayo de 2026

---

## 📖 DOCUMENTOS OBLIGATORIOS BASE

### 1. **CONTINUIDAD.md** ⭐ CRÍTICO

- **Ubicación**: `docs/CONTINUIDAD.md`
- **Propósito**: Fuente de verdad del estado del proyecto. Permite reanudación sin fricción.
- **Contiene**: Fase activa, último paso, próximo paso, historial de sesiones, decisiones clave.
- **Actualización**: Al final de cada respuesta/sesión.

### 2. **Alcance del Proyecto**

- **Ubicación**: `docs/alcance-del-proyecto.md`
- **Propósito**: Define explícitamente qué SÍ construimos (v1) y qué NO (futuro).
- **Contiene**: Módulos, funcionalidades incluidas, fuera del alcance.

### 3. **Sistema de Diseño** ⭐ CRÍTICO

- **Ubicación**: `docs/sistema-de-diseno.md`
- **Propósito**: Especificación visual única. Paleta, tipografía, espaciados, componentes base.
- **Contiene**: Tokens CSS, ejemplos visuales, reglas de uso.
- **Referencia**: Extraído de imagen oficial de PintuMaster.

### 4. **Tech Stack**

- **Ubicación**: `docs/tech-stack.md`
- **Propósito**: Stack tecnológico y justificación de cada herramienta.
- **Contiene**: Frontend, backend, DB, servicios, versiones.

### 5. **Arquitectura del Proyecto**

- **Ubicación**: `docs/arquitectura-del-proyecto.md`
- **Propósito**: Estructura de carpetas, módulos, patrones de código.
- **Contiene**: Árbol de directorios, responsabilidades por carpeta, convenciones.

### 6. **Fases del Proyecto**

- **Ubicación**: `docs/fases-del-proyecto.md`
- **Propósito**: Desglose de fases 1-3, subfases, criterios de éxito.
- **Contiene**: Hitos, entregables, dependencias.

---

## 📊 DOCUMENTOS RECOMENDADOS (Adicionales)

### 7. **Modelo de Datos**

- **Ubicación**: `docs/modelo-de-datos.md`
- **Propósito**: Especificación de Firestore collections, schemas, relaciones.
- **Contiene**: Collections, documentos, subcollections, índices.

### 8. **Flujos de Usuario**

- **Ubicación**: `docs/flujos-de-usuario.md`
- **Propósito**: User journeys por módulo (trabajos, finanzas, etc.).
- **Contiene**: Diagramas, pasos, decisiones, puntos de fricción.

### 9. **Reglas de Firestore** ⭐ CRÍTICO

- **Ubicación**: `docs/reglas-firestore.md`
- **Propósito**: Security rules específicas por collection (basadas en PDF).
- **Contiene**: Reglas de lectura, escritura, validación.
- **Crítica**: Basada en `docs/referencias/reglas-seguridad-firebase.md`.

### 10. **Componentes UI**

- **Ubicación**: `docs/componentes-ui.md`
- **Propósito**: Especificación de cada componente React (props, comportamiento).
- **Contiene**: Button, Card, Badge, NavBar, Sidebar, FormInput, etc.

### 11. **Integraciones Externas**

- **Ubicación**: `docs/integraciones.md`
- **Propósito**: WhatsApp Business API, Bancolombia, Nequi.
- **Contiene**: Endpoints, autenticación, payloads.

---

## 🔒 REFERENCIAS & GUÍAS

### 12. **Reglas de Seguridad Firebase (PDF Extraído)** ⭐ CRÍTICO

- **Ubicación**: `docs/referencias/reglas-seguridad-firebase.md`
- **Propósito**: Síntesis del PDF de seguridad (guía 2026).
- **Contiene**: Problemas reales (Tea App, Lovable, Moltbook), reglas seguras, checklist.
- **Uso**: Referencia obligatoria en Fase 3.

---

## 🗺️ ESTRUCTURA DE CARPETAS

```
PintuMaster/
├── docs/                          # Documentación (TODO vive aquí)
│   ├── CONTINUIDAD.md             ⭐ Actualizar al final de cada sesión
│   ├── INDICE.md                  📚 Este archivo
│   ├── alcance-del-proyecto.md
│   ├── sistema-de-diseno.md       ⭐ Base del diseño visual
│   ├── tech-stack.md
│   ├── arquitectura-del-proyecto.md
│   ├── fases-del-proyecto.md
│   ├── modelo-de-datos.md
│   ├── flujos-de-usuario.md
│   ├── reglas-firestore.md        ⭐ Seguridad crítica
│   ├── componentes-ui.md
│   ├── integraciones.md
│   └── referencias/
│       └── reglas-seguridad-firebase.md ⭐ Del PDF
├── src/                           # Código React
├── public/                        # Assets estáticos
└── README.md                      # Descripción general
```

---

## 📌 CÓMO USAR ESTE ÍNDICE

1. **Primera vez que trabajas**: Lee CONTINUIDAD.md → Explora documentos según tu tarea.
2. **Retomas el proyecto**: Abre CONTINUIDAD.md → Identifica fase/próximo paso → Abre documentos relacionados.
3. **Necesitas información sobre X**:
   - ¿Qué construimos? → `alcance-del-proyecto.md`
   - ¿Cómo se ve? → `sistema-de-diseno.md`
   - ¿Qué tecnología? → `tech-stack.md`
   - ¿Cómo organizar código? → `arquitectura-del-proyecto.md`
   - ¿Cómo fluyen los usuarios? → `flujos-de-usuario.md`
   - ¿Cómo proteger datos? → `reglas-firestore.md` + `referencias/reglas-seguridad-firebase.md`
   - ¿Qué componentes crear? → `componentes-ui.md`
   - ¿Cómo estructurar datos? → `modelo-de-datos.md`

---

## ✅ CHECKLIST DE APROBACIÓN (3-may-2026)

- [x] Índice aprobado por el dueño
- [x] Stack confirmado (React + TypeScript + Tailwind + Firebase)
- [x] Respuestas a 19 preguntas documentadas
- [x] Decisiones clave registradas en CONTINUIDAD.md

**Próximo estado**: Esperar confirmación para iniciar Fase 1.1.
