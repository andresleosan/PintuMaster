# 🎨 SISTEMA DE DISEÑO — PINTUMASTER

**Versión:** 1.0  
**Extraído de:** Imagen oficial de PintuMaster (mayo 2026)  
**Mobile-first:** Sí

---

## 🎭 PALETA DE COLORES

### Colores Principales

| Uso                     | Color | Hex       | RGB                | Descripción                                   |
| ----------------------- | ----- | --------- | ------------------ | --------------------------------------------- |
| **Rojo Primario (CTA)** | 🔴    | `#CC0000` | rgb(204, 0, 0)     | Botones principales, activos, badges críticos |
| **Negro**               | ⚫    | `#1A1A1A` | rgb(26, 26, 26)    | Headers, sidebar desktop, fondos oscuros      |
| **Gris Oscuro**         | 🟤    | `#3D3D3D` | rgb(61, 61, 61)    | Textos secundarios, íconos inactivos          |
| **Gris Claro**          | ⬜    | `#F5F5F5` | rgb(245, 245, 245) | Fondos de tarjetas, superficies               |
| **Blanco**              | ⬜    | `#FFFFFF` | rgb(255, 255, 255) | Fondo principal, contenido                    |

### Colores de Estados de Trabajo

| Estado         | Color      | Hex       | Uso                       |
| -------------- | ---------- | --------- | ------------------------- |
| **Pendiente**  | 🟠 Naranja | `#FF9800` | Badge estado "Pendiente"  |
| **En proceso** | 🔵 Azul    | `#2196F3` | Badge estado "En proceso" |
| **Pintura**    | 🟣 Morado  | `#9C27B0` | Badge estado "Pintura"    |
| **Terminado**  | 🟢 Verde   | `#4CAF50` | Badge estado "Terminado"  |

### Colores de Alerta

| Tipo            | Color   | Hex       | Uso                    |
| --------------- | ------- | --------- | ---------------------- |
| **Éxito**       | Verde   | `#4CAF50` | Confirmaciones         |
| **Advertencia** | Naranja | `#FF9800` | Stock bajo             |
| **Peligro**     | Rojo    | `#F44336` | Errores, eliminaciones |
| **Info**        | Azul    | `#2196F3` | Información general    |

---

## 🔤 TIPOGRAFÍA

### Fuentes

| Uso                  | Fuente  | Peso          | Tamaño Recomendado             |
| -------------------- | ------- | ------------- | ------------------------------ |
| **Títulos & Labels** | Poppins | Bold (700)    | 24px (desktop) / 20px (mobile) |
| **Textos & Datos**   | Poppins | Regular (400) | 16px (desktop) / 14px (mobile) |
| **Subtítulos**       | Poppins | Medium (500)  | 18px (desktop) / 16px (mobile) |
| **Pequeño**          | Poppins | Regular (400) | 12px (todo dispositivo)        |

### Jerarquía

```
H1 (Títulos grandes) — Poppins Bold, 24px/20px, color #1A1A1A
H2 (Subtítulos)     — Poppins Bold, 20px/18px, color #1A1A1A
H3 (Labels)         — Poppins Bold, 16px/14px, color #3D3D3D
Body (Normal)       — Poppins Regular, 16px/14px, color #3D3D3D
Caption (Pequeño)   — Poppins Regular, 12px, color #999999
```

---

## 📐 ESPACIADOS & GRID

### Sistema de Espacios (Escala 4px)

```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

### Grid

- **Desktop**: 12 columnas, gap 16px
- **Tablet**: 8 columnas, gap 12px
- **Mobile**: 4 columnas, gap 8px

### Márgenes y Paddings

- **Contenedor principal**: 16px mobile / 24px desktop
- **Tarjetas**: 16px padding interno
- **Botones**: 12px (vertical) × 24px (horizontal)
- **Inputs**: 12px padding interno

---

## 🔘 COMPONENTES BASE

### 1. Button

```css
/* Primary (CTA — Rojo) */
background: #cc0000;
color: #ffffff;
padding: 12px 24px;
border-radius: 6px;
font-family: Poppins;
font-weight: 500;
font-size: 16px;
border: none;
cursor: pointer;
min-height: 48px; /* Táctil en mobile */
transition: background 0.2s;

/* Hover */
background: #aa0000;

/* Secondary (Blanco + Borde) */
background: #ffffff;
border: 1px solid #cc0000;
color: #cc0000;

/* Disabled */
opacity: 0.5;
cursor: not-allowed;
```

### 2. Badge (Estado de Trabajo)

```css
display: inline-block;
padding: 4px 12px;
border-radius: 12px;
font-family: Poppins;
font-weight: 600;
font-size: 12px;
text-transform: uppercase;

/* Estados */
.badge-pending {
  background: #ff9800;
  color: white;
}
.badge-process {
  background: #2196f3;
  color: white;
}
.badge-painting {
  background: #9c27b0;
  color: white;
}
.badge-done {
  background: #4caf50;
  color: white;
}
```

### 3. Card

```css
background: #f5f5f5;
border-radius: 8px;
padding: 16px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
transition: box-shadow 0.2s;

/* Hover */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
```

### 4. Input

```css
width: 100%;
padding: 12px;
border: 1px solid #ddd;
border-radius: 6px;
font-family: Poppins;
font-size: 16px;
background: #ffffff;

/* Focus */
border-color: #cc0000;
outline: none;
box-shadow: 0 0 0 3px rgba(204, 0, 0, 0.1);
```

### 5. Select

```css
/* Idéntico a Input */
appearance: none;
background-image: url("data:image/svg+xml;...");
padding-right: 32px;
```

### 6. Badge (Stock Bajo)

```css
.stock-alert {
  background: #ff9800;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}
```

---

## 📱 COMPONENTES DE NAVEGACIÓN

### Desktop: Sidebar Izquierdo

```
┌─────────────────────────┐
│  [PintuMaster Logo]     │  ← 60px alto, centrado
├─────────────────────────┤
│  🏠 Inicio              │  ← Activo en rojo
├─────────────────────────┤
│  📋 Trabajos            │
├─────────────────────────┤
│  💰 Finanzas            │
├─────────────────────────┤
│  📦 Inventario          │
├─────────────────────────┤
│  👥 Empleados           │
├─────────────────────────┤
│  📊 Reportes            │
├─────────────────────────┤
│  ⚙️  Ajustes            │
└─────────────────────────┘

Ancho: 220px
Background: #1A1A1A
Item activo: Background #CC0000, text white
Item inactivo: Texto #999, hover background #2a2a2a
```

### Mobile: NavBar Inferior

```
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│    🏠    │    📋    │    💰    │    📦    │    ⋯     │
│  Inicio  │ Trabajos │ Gastos   │ Inventario│  Más    │
└──────────┴──────────┴──────────┴──────────┴──────────┘

Altura: 64px
Background: #FFFFFF
Border-top: 1px solid #DDD
Tab activo: Icono rojo, texto rojo
Tab inactivo: Icono gris, texto gris
```

---

## 📋 VISTAS PRINCIPALES & LAYOUT

### Dashboard (Ambos dispositivos)

**Mobile**:

```
┌─────────────────────────┐
│ ≡ (hamburguesa)   ⚙️    │  ← Header
├─────────────────────────┤
│ Hola, Jhon              │
│ Bienvenido a PintuMaster│
├─────────────────────────┤
│ [Ingresos hoy]          │  ← Tarjeta
│ $850.000  ↑12%          │
├─────────────────────────┤
│ [Trabajos activos]      │  ← Tarjeta
│ 5                       │
├─────────────────────────┤
│ [Terminados]            │  ← Tarjeta
│ 3                       │
├─────────────────────────┤
│ [Gráfico Donut]         │
├─────────────────────────┤
│ [Trabajos recientes]    │
│ ABC123 - Corolla...     │  ← Item
│ XYZ789 - Civic...       │  ← Item
├─────────────────────────┤
│ [+ Nuevo] [Registrar]   │  ← Grid 1x2
└─────────────────────────┘
[NavBar inferior]
```

**Desktop**:

```
┌──────────────────────────────────────────────┐
│ [Sidebar] │ Dashboard                   ⚙️   │
├──────────┼──────────────────────────────────┤
│ 🏠 Inicio│ Hola, Jhon                        │
│ 📋       │ [Ingresos] [Activos] [Terminados]│
│ 💰       │ [Gráfico]                        │
│ 📦       │ [Trabajos recientes]             │
│ 👥       │                                  │
│ 📊       │                                  │
│ ⚙️       │                                  │
└──────────┴──────────────────────────────────┘
```

---

## 🎬 ANIMACIONES & TRANSICIONES

```css
/* Botones */
button {
  transition: all 0.2s ease;
}

/* Cards */
.card:hover {
  transition: box-shadow 0.2s ease;
}

/* Badges */
.badge {
  transition: background 0.2s ease;
}

/* Inputs */
input:focus {
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

/* NavBar activo */
.nav-item.active {
  transition: color 0.2s ease;
}
```

---

## ♿ ACCESIBILIDAD

- **Contrast ratio**: Mínimo WCAG AA (4.5:1 para texto normal)
- **Touch targets**: Mínimo 48px × 48px en mobile
- **Hover states**: Claramente visible
- **Focus states**: Outline visible (mínimo 2px)
- **Iconos**: Siempre con texto asociado

---

## 📦 TAILWIND CSS — CONFIGURACIÓN

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      "pm-red": "#CC0000",
      "pm-black": "#1A1A1A",
      "pm-dark-gray": "#3D3D3D",
      "pm-light-gray": "#F5F5F5",
      "pm-white": "#FFFFFF",
      "pm-orange": "#FF9800",
      "pm-blue": "#2196F3",
      "pm-purple": "#9C27B0",
      "pm-green": "#4CAF50",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["20px", "28px"],
      xl: ["24px", "32px"],
    },
  },
};
```

---

## ✅ CHECKLIST DE APLICACIÓN

Usar este sistema de diseño en:

- [x] Maquetas HTML/CSS (Fase 1.3)
- [x] Componentes React (Fase 2.1)
- [x] Todas las vistas desktop y mobile
- [x] Sin excepciones ni custom colors
