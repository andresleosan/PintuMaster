# Maquetas HTML + CSS - PintuMaster

## Descripción

Este directorio contiene todas las maquetas **HTML + CSS puro** (SIN JavaScript funcional) de la aplicación PintuMaster. Estas maquetas representan la **Subfase 1.3 del proyecto** y cumplen con todas las especificaciones definidas en:

- `docs/sistema-de-diseno.md` (colores, tipografía, componentes)
- `docs/componentes-ui.md` (especificaciones de componentes)
- `docs/arquitectura-del-proyecto.md` (estructura general)

## 📋 Índice de Maquetas

| # | Archivo | Vista | Descripción |
|----|---------|-------|-------------|
| 01 | `01-login.html` | Login | Pantalla de autenticación - email + contraseña |
| 02 | `02-dashboard.html` | Dashboard | Panel principal con métricas y accesos rápidos (desktop + mobile) |
| 03 | `03-trabajos-listado.html` | Trabajos - Listado | Galería de trabajos con filtros y estados |
| 04 | `04-trabajos-crear.html` | Trabajos - Crear | Formulario para crear nuevo trabajo (cliente, vehículo, detalles) |
| 05 | `05-finanzas.html` | Finanzas | Dashboard financiero con ingresos, gastos y resumen |
| 06 | `06-inventario.html` | Inventario | Listado de productos con alertas de stock bajo |
| 07 | `07-empleados.html` | Empleados | Galería de empleados con estadísticas |
| 08 | `08-reportes.html` | Reportes | Análisis con gráficos, tablas y métricas |
| 09 | `09-ajustes.html` | Ajustes | Configuración de taller, comisiones, integraciones, seguridad |
| 10 | `10-trabajo-detalle.html` | Trabajos - Detalle | Vista completa de un trabajo específico |
| 11 | `11-crear-ingreso.html` | Finanzas - Nuevo Ingreso | Formulario para registrar pago de cliente |
| 12 | `12-crear-gasto.html` | Finanzas - Nuevo Gasto | Formulario para registrar gasto |

## 🎨 Características Implementadas

### Diseño Visual
- ✅ Paleta de colores especificada en `sistema-de-diseno.md`
  - Rojo principal: #CC0000
  - Negro fondo: #1A1A1A
  - Grises: #3D3D3D, #F5F5F5, etc.
- ✅ Tipografía: Poppins (Bold para títulos, Regular para cuerpo)
- ✅ Espaciado: Escala 4px (xs:4, sm:8, md:16, lg:24, xl:32, 2xl:48)
- ✅ Bordes y sombras: Suaves y consistentes

### Componentes UI
- ✅ Botones: 4 variantes (primary, secondary, danger, ghost)
- ✅ Formularios: Inputs, selects, textareas con validación visual
- ✅ Cards: Métricas, productos, empleados con efectos hover
- ✅ Badges: Estados de trabajo (pendiente, proceso, pintura, terminado)
- ✅ Tablas: Transacciones, empleados, productos
- ✅ Iconos: Unicode/Emoji para representación visual
- ✅ Modales: Estructura base (no interactivos en HTML)

### Navegación
- ✅ **Desktop**: Sidebar fijo (220px, #1A1A1A) en la izquierda
- ✅ **Mobile**: Navbar fija en la parte inferior (64px)
- ✅ Breadcrumbs y botones de retroceso
- ✅ Header consistente en todas las vistas

### Responsividad
- ✅ Mobile First: Puntos de quiebre en 320px, 375px, 425px, 768px, 1024px
- ✅ Grillas fluidas con `auto-fit` y `minmax()`
- ✅ Texto escalable (mínimo 14px en móvil)
- ✅ Áreas táctiles: Mínimo 48px × 48px
- ✅ Sin desbordamiento horizontal
- ✅ Flexbox y CSS Grid para layouts adaptativos

## 📱 Breakpoints Testeados

```css
/* Mobile */
max-width: 320px   /* Minimum supported */
max-width: 375px   /* iPhone SE, iPhone 8 */
max-width: 425px   /* iPhone 12/13 */

/* Tablet */
max-width: 768px   /* iPad mini */

/* Desktop */
max-width: 1024px  /* iPad Pro, pequeño desktop */
max-width: 1280px  /* Desktop estándar */
max-width: 2560px  /* 4K Ultra-wide */
```

## 🚀 Cómo Usar Estas Maquetas

### 1. Visualizar en Navegador
```bash
# Simplemente abre cualquier .html en tu navegador
# No requiere servidor - son HTML + CSS puro
open 01-login.html
```

### 2. Navegación Entre Vistas
Aunque están desconectadas, puedes seguir este flujo manual:

**Flujo de Usuario Típico:**
```
Login (01) 
  ↓
Dashboard (02) 
  ↓
Trabajos Listado (03) → Crear (04) → Detalle (10)
       ↓
Finanzas (05) → Ingresos (11) o Gastos (12)
       ↓
Inventario (06)
       ↓
Empleados (07)
       ↓
Reportes (08)
       ↓
Ajustes (09)
```

### 3. Validar Responsividad
**En Chrome DevTools:**
1. Abre la maqueta en Chrome
2. Presiona `F12` para abrir DevTools
3. Haz clic en el icono de dispositivo 📱 (Toggle device toolbar)
4. Prueba estos dispositivos:
   - iPhone SE (375x667)
   - iPhone 12 Pro (390x844)
   - iPad mini (768x1024)
   - iPad Pro (1024x1366)

**Verificar:**
- [ ] No hay overflow horizontal
- [ ] Botones >= 48px × 48px
- [ ] Texto >= 14px
- [ ] Sidebars colapsan en mobile
- [ ] NavBar inferior visible en mobile
- [ ] Espaciado proporcional

## 🔍 Validación Fase 1.4

Estas maquetas serán validadas en **Subfase 1.4 (Validación Responsive)** por:

1. **Ausencia de Horizontal Overflow**
   - Verificar en todos los breakpoints
   - Sin barras de scroll horizontal

2. **Elementos Táctiles**
   - Botones: mínimo 48px × 48px
   - Enlaces: mínimo 40px × 40px
   - Espaciado entre clickables: mínimo 8px

3. **Legibilidad**
   - Tamaño mínimo de fuente: 14px (mobile)
   - Contraste: >= 4.5:1 (WCAG AA)
   - Línea-altura: >= 1.5em

4. **Consistencia Visual**
   - Colores según sistema-de-diseno.md
   - Iconografía consistente
   - Espaciado mediante escala 4px
   - Bordes y sombras uniformes

5. **Navegación**
   - Breadcrumbs o botones atrás funcionan
   - Menú lateral (desktop) / inferior (mobile)
   - Headers consistentes

## 📝 Notas Importantes

### Lo Que NO Está Implementado
- ❌ Funcionalidad JavaScript (excepto interactividad CSS)
- ❌ Conexión a Firebase
- ❌ Autenticación real
- ❌ Carga de datos reales
- ❌ API calls
- ❌ Validación de formularios (except visual)

### Lo Que Está Implementado
- ✅ Layout estructura completa
- ✅ Diseño visual al 100%
- ✅ Responsive design
- ✅ Todos los componentes UI
- ✅ Animaciones CSS básicas (hover, transitions)
- ✅ Accesibilidad visual
- ✅ Estructura semántica HTML

## 🔄 Siguiente Fase: Phase 1.5

Después de validación (Phase 1.4), estas maquetas serán:
1. Analizadas para extraer componentes reutilizables
2. Documentadas en `docs/componentes-ui.md` versión final
3. Convertidas a componentes React en **Phase 2**

## 📚 Referencias

- [Sistema de Diseño](../docs/sistema-de-diseno.md)
- [Especificación de Componentes](../docs/componentes-ui.md)
- [Arquitectura del Proyecto](../docs/arquitectura-del-proyecto.md)
- [Modelo de Datos](../docs/modelo-de-datos.md)

## 📦 Estructura de Directorio

```
maquetas/
├── README.md (este archivo)
├── 01-login.html
├── 02-dashboard.html
├── 03-trabajos-listado.html
├── 04-trabajos-crear.html
├── 05-finanzas.html
├── 06-inventario.html
├── 07-empleados.html
├── 08-reportes.html
├── 09-ajustes.html
├── 10-trabajo-detalle.html
├── 11-crear-ingreso.html
└── 12-crear-gasto.html
```

## ✅ Checklist de Validación Fase 1.3

- [x] Maqueta Login
- [x] Maqueta Dashboard (desktop + mobile)
- [x] Maqueta Trabajos (listado, crear, detalle)
- [x] Maqueta Finanzas (dashboard, ingresos, gastos)
- [x] Maqueta Inventario
- [x] Maqueta Empleados
- [x] Maqueta Reportes
- [x] Maqueta Ajustes
- [x] Responsive en 320px - 2560px
- [x] Color palette según especificación
- [x] Tipografía Poppins
- [x] Componentes UI (botones, cards, badges, etc)
- [x] Navegación desktop (sidebar) + mobile (navbar)
- [x] Espaciado según escala 4px
- [x] Documentación README

---

**Creado**: 5 de marzo de 2024  
**Fase**: 1.3 - Maquetación HTML + CSS  
**Estado**: ✅ COMPLETADO
