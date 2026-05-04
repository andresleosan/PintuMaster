# 📊 MODELO DE DATOS — FIRESTORE COLLECTIONS

**Versión:** 1.0  
**Fecha:** 3 de mayo de 2026  
**Banco de datos:** Firestore (NoSQL)

---

## 🏛️ ESTRUCTURA GENERAL

```
Firestore
├── users/                    # Datos del dueño
│   └── {userId}
├── trabajos/                 # Órdenes de trabajo
│   └── {trabajoId}
├── empleados/                # Equipo del taller
│   └── {empleadoId}
├── finanzas/                 # Ingresos y gastos
│   ├── ingresos/
│   │   └── {ingresoId}
│   └── gastos/
│       └── {gastoId}
├── inventario/               # Stock e insumos
│   └── {productoId}
├── categorias-inventario/    # Categorías configurables
│   └── {categoriaId}
├── auditoria/                # Log de cambios
│   └── {logId}
└── configuracion/            # Ajustes globales
    └── {tiendaId}
```

---

## 📄 COLECCIONES DETALLADAS

### 1️⃣ **users** — Datos del Dueño

**Ruta**: `/users/{userId}`  
**Documentos**: 1 solo (el dueño)

```javascript
{
  userId: "auth-uid-xxxx",           // UID de Firebase Auth
  nombre: "Jhon Cardona",
  email: "jhon@pintumaster.com",
  telefono: "+573504220461",
  rol: "owner",                       // Siempre "owner" en v1
  avatar: "https://storage.../avatar.jpg",
  createdAt: "2026-05-03T10:00:00Z",
  updatedAt: "2026-05-03T10:00:00Z",
  activo: true,
}
```

**Índices**: Ninguno necesario

---

### 2️⃣ **trabajos** — Órdenes de Trabajo

**Ruta**: `/trabajos/{trabajoId}`  
**Documentos**: Múltiples (uno por trabajo)

```javascript
{
  trabajoId: "AUTO-001",              // ID custom: AUTO-xxxxx
  ownerUid: "auth-uid-xxxx",          // Dueño del taller (FK users)

  // Información del cliente
  cliente: {
    nombre: "Juan Pérez",
    telefono: "+573001234567",
  },

  // Información del vehículo
  vehiculo: {
    placa: "ABC-123",
    modelo: "Toyota Corolla 2020",
    color: "Blanco",
  },

  // Detalles del trabajo
  tipoTrabajo: [                      // Array: puede ser múltiple
    "Latonería sobre pintura",
    "Difuminado"
  ],
  descripcion: "Golpe en puerta izquierda, rayón en costado",
  precioAcordado: 450000,             // COP
  precioFinal: 450000,                // Puede cambiar
  estado: "En proceso",               // Pendiente|En proceso|Pintura|Terminado

  // Empleados asignados
  empleadosAsignados: [
    {
      empleadoId: "EMP-001",
      nombre: "Pedro García",
      rol: "Latonero",
      estado: "En proceso"            // Por empleado
    },
    {
      empleadoId: "EMP-002",
      nombre: "Luis López",
      rol: "Pintor",
      estado: "Pendiente"
    }
  ],

  // Fotos
  fotos: {
    antes: [
      {
        url: "https://storage.../trabajo-001-antes-1.jpg",
        timestamp: "2026-05-03T10:00:00Z",
        uploadedBy: "auth-uid-xxxx"
      }
    ],
    despues: [
      {
        url: "https://storage.../trabajo-001-despues-1.jpg",
        timestamp: "2026-05-03T11:00:00Z",
        uploadedBy: "auth-uid-xxxx"
      }
    ]
  },

  // Notas/Comentarios
  comentarios: [
    {
      id: "COM-001",
      empleadoId: "EMP-001",
      texto: "Falta barniz en el retoque",
      timestamp: "2026-05-03T10:30:00Z",
      autor: "Pedro García"
    }
  ],

  // Pago
  pagado: false,
  fechaPago: null,
  metodoPago: null,                   // Efectivo|Transferencia|Tarjeta

  // Timestamps
  fechaCreacion: "2026-05-03T10:00:00Z",
  fechaEstimadaEntrega: null,         // NO incluye fecha estimada en v1
  fechaTerminacion: null,
  updatedAt: "2026-05-03T11:00:00Z",
}
```

**Índices compuestos**:

- `ownerUid` + `estado`
- `ownerUid` + `fechaCreacion`

---

### 3️⃣ **empleados** — Equipo del Taller

**Ruta**: `/empleados/{empleadoId}`  
**Documentos**: Múltiples (uno por empleado)

```javascript
{
  empleadoId: "EMP-001",
  ownerUid: "auth-uid-xxxx",          // FK users (dueño)

  // Datos personales
  nombre: "Pedro García",
  telefono: "+573009876543",
  rol: [                              // Array: puede tener múltiples roles
    "Latonero",
    "Pintor"
  ],

  // Comisión
  comision: {
    porcentaje: 15,                   // Por defecto 15% por trabajo
    activa: true
  },

  // Estadísticas
  trabajosRealizados: 45,             // Contador
  trabajosPorPeriodo: {
    mes: 5,                           // Este mes
    semana: 1                         // Esta semana
  },
  comisionAcumulada: {
    total: 3250000,                   // Histórico
    mesActual: 180000,                // Este mes
    semanaActual: 45000               // Esta semana
  },

  // Estado
  activo: true,
  fechaUnion: "2024-01-15T08:00:00Z",
  fechaUltimaTrabajo: "2026-05-02T15:30:00Z",
  createdAt: "2024-01-15T08:00:00Z",
  updatedAt: "2026-05-03T11:00:00Z",
}
```

**Índices**:

- `ownerUid` + `activo`

---

### 4️⃣ **finanzas/ingresos** — Registro de Ingresos

**Ruta**: `/finanzas/ingresos/{ingresoId}`  
**Documentos**: Múltiples

```javascript
{
  ingresoId: "ING-2026-001",
  ownerUid: "auth-uid-xxxx",

  // Relación con trabajo
  trabajoId: "AUTO-001",              // FK trabajos (opcional, puede ser ingreso sin trabajo)

  // Datos del ingreso
  concepto: "Pago trabajo AUTO-001",
  monto: 450000,                      // COP
  metodoPago: "Transferencia Bancolombia",
  referencia: "TRX-123456789",        // Para rastrear

  // Origen de datos
  fuente: "Manual",                   // Manual|Bancolombia|Nequi|Automática

  // Timestamps
  fechaIngreso: "2026-05-03T14:30:00Z", // Cuando se recibió
  fechaRegistro: "2026-05-03T14:31:00Z", // Cuando se registró en app
  createdAt: "2026-05-03T14:31:00Z",
  updatedAt: "2026-05-03T14:31:00Z",
}
```

**Índices**:

- `ownerUid` + `fechaIngreso`
- `trabajoId`

---

### 5️⃣ **finanzas/gastos** — Registro de Gastos

**Ruta**: `/finanzas/gastos/{gastoId}`  
**Documentos**: Múltiples

```javascript
{
  gastoId: "GAST-2026-001",
  ownerUid: "auth-uid-xxxx",

  // Relación con inventario
  productoId: null,                   // FK inventario (opcional)

  // Datos del gasto
  concepto: "Pintura roja esmalte",
  monto: 85000,                       // COP
  categoria: "Insumos",               // Insumos|Servicios|Otros|Mantenimiento

  // Detalles
  descripcion: "2 baldes de pintura roja para trabajos",

  // Timestamps
  fechaGasto: "2026-05-03T09:00:00Z", // Cuando ocurrió
  fechaRegistro: "2026-05-03T09:02:00Z", // Cuando se registró
  createdAt: "2026-05-03T09:02:00Z",
  updatedAt: "2026-05-03T09:02:00Z",
}
```

**Índices**:

- `ownerUid` + `fechaGasto`
- `ownerUid` + `categoria`

---

### 6️⃣ **inventario** — Stock e Insumos

**Ruta**: `/inventario/{productoId}`  
**Documentos**: Múltiples

```javascript
{
  productoId: "PROD-001",
  ownerUid: "auth-uid-xxxx",

  // Datos del producto
  nombre: "Pintura Roja Esmalte Brillante",
  descripcion: "Para trabajos de pintura automotriz",
  categoria: "Pintura",              // FK categorias-inventario

  // Stock
  cantidad: 5,                        // Unidad actual
  unidad: "Balde",                    // Balde|Litro|Kg|Unidad
  stockMinimo: 2,

  // Precio
  precioUnitario: 42500,              // COP
  proveedorNombre: "Pinturas Medellín",

  // Alertas
  alertaActiva: false,                // Stock bajo?

  // Auditoría
  ultimoUso: "2026-05-02T15:30:00Z",
  ultimaCompra: "2026-04-28T08:00:00Z",

  createdAt: "2026-03-15T10:00:00Z",
  updatedAt: "2026-05-02T15:30:00Z",
}
```

**Índices**:

- `ownerUid` + `categoria`
- `ownerUid` + `alertaActiva`

---

### 7️⃣ **categorias-inventario** — Categorías Configurables

**Ruta**: `/categorias-inventario/{categoriaId}`  
**Documentos**: Múltiples (configurables por dueño)

```javascript
{
  categoriaId: "CAT-001",
  ownerUid: "auth-uid-xxxx",

  nombre: "Pintura",
  descripcion: "Productos de pintura automotriz",
  icon: "🎨",                         // Unicode emoji

  createdAt: "2026-03-15T10:00:00Z",
  updatedAt: "2026-03-15T10:00:00Z",
}
```

**Default categories** (preinstaladas):

- Pintura
- Lijas
- Thinner
- Masillas

---

### 8️⃣ **auditoria** — Log de Cambios

**Ruta**: `/auditoria/{logId}`  
**Documentos**: Múltiples (append-only)

```javascript
{
  logId: "AUD-2026-001",
  ownerUid: "auth-uid-xxxx",          // Quién ejecutó

  // Qué se cambió
  entidad: "trabajo",                 // trabajo|empleado|finanza|inventario
  entidadId: "AUTO-001",              // ID de lo que se cambió

  // Tipo de cambio
  accion: "update",                   // create|update|delete|estado

  // Antes y después
  cambios: {
    estado: {
      antes: "Pendiente",
      despues: "En proceso"
    },
    empleadosAsignados: {
      antes: [],
      despues: ["EMP-001"]
    }
  },

  // Descripción legible
  descripcion: "Cambió estado a 'En proceso' y asignó a Pedro García",

  // Metadata
  direccionIP: "192.168.1.10",
  userAgent: "Mozilla/5.0 (iPhone...",

  timestamp: "2026-05-03T10:15:00Z",
}
```

**Índices**:

- `entidadId` (buscar historial de una entidad)
- `timestamp` (orden cronológico)

---

### 9️⃣ **configuracion** — Ajustes Globales

**Ruta**: `/configuracion/{tiendaId}`  
**Documentos**: 1 solo

```javascript
{
  tiendaId: "SHOP-001",
  ownerUid: "auth-uid-xxxx",

  // Datos del taller
  nombreTaller: "PintuMaster",
  logo: "https://storage.../logo.png",
  telefono: "+573504220461",
  email: "jhon@pintumaster.com",
  direccion: "Medellín, Antioquia",

  // Horarios
  horarioApertura: "08:00",
  horarioCierre: "17:00",
  diasTrabajo: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],

  // Cierre de caja
  diaCierreSemanal: "Sábado",         // Día de cierre
  horaCierre: "17:00",

  // Comisiones default
  comisionDefaultPorcentaje: 15,      // Para nuevos empleados

  // Categorías de inventario (referencia)
  categoriasInventario: [
    "Pintura",
    "Lijas",
    "Thinner",
    "Masillas"
  ],

  // Tipos de trabajo
  tiposTrabajo: [
    "Latonería sobre pintura",
    "Difuminado",
    "Retoque",
    "SPA automotriz"
  ],

  // Integraciones
  integraciones: {
    whatsapp: {
      habilitado: true,
      numeroOrgano: "1234567890",
      tokenAPI: "encrypted-token"     // NUNCA en texto plano en Firestore
    },
    bancolombia: {
      habilitado: true,
      webhookURL: "https://app.com/webhooks/bancolombia"
    },
    nequi: {
      habilitado: true,
      webhookURL: "https://app.com/webhooks/nequi"
    }
  },

  createdAt: "2026-03-15T10:00:00Z",
  updatedAt: "2026-05-03T11:00:00Z",
}
```

---

## 🔗 RELACIONES

```
users (1) ──→ (muchos) trabajos
users (1) ──→ (muchos) empleados
users (1) ──→ (muchos) finanzas (ingresos)
users (1) ──→ (muchos) finanzas (gastos)
users (1) ──→ (muchos) inventario
users (1) ──→ (muchos) auditoria

trabajos (1) ──→ (muchos) empleados (en empleadosAsignados)
empleados (muchos) ──→ (muchos) trabajos (en trabajoId)

inventario (1) ──→ (muchos) gastos (opcional)
trabajos (1) ──→ (muchos) comentarios (embebidos)
```

---

## 📈 VOLUMEN ESPERADO DE DATOS

| Colección         | Documentos/mes | Documentos/año  | Tamaño aprox.   |
| ----------------- | -------------- | --------------- | --------------- |
| users             | 1              | 1               | < 1 KB          |
| trabajos          | 50-80          | 600-960         | 500 KB          |
| empleados         | 3              | 3               | < 1 KB          |
| finanzas/ingresos | 80-100         | 960-1200        | 200 KB          |
| finanzas/gastos   | 20-30          | 240-360         | 100 KB          |
| inventario        | 10-20          | 10-20           | < 100 KB        |
| auditoria         | 500-1000       | 6000-12000      | 5 MB            |
| **TOTAL**         | **~700-1200**  | **~7500-14500** | **~6-7 MB/año** |

✅ **Resultado**: Firestore es más que suficiente. Plan Spark (gratuito) aguanta sin problemas.

---

## 🔐 SEGURIDAD EN DATOS

- ❌ NUNCA guardar contraseñas (Firebase Auth las maneja)
- ❌ NUNCA guardar tokens API en Firestore plain text (usar Cloud Secret Manager)
- ✅ Encriptar datos sensibles (comisiones, precios) si se requiere
- ✅ Aplicar reglas Firestore (ver `docs/reglas-firestore.md`)

---

## ✅ CHECKLIST

- [x] Modelo documentado
- [ ] Firestore creado con colecciones
- [ ] Índices configurados
- [ ] Reglas de seguridad aplicadas
- [ ] Testing de queries
