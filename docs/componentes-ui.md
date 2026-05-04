# 🧩 ESPECIFICACIÓN DE COMPONENTES UI — PINTUMASTER

**Versión:** 1.0  
**Fecha:** 3 de mayo de 2026  
**Base:** Sistema de Diseño (`docs/sistema-de-diseno.md`)

---

## 📐 COMPONENTES BASE

### **Button**

```typescript
interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  className?: string;
}
```

**Variantes**:

- `primary`: Rojo (#CC0000), texto blanco, CTA
- `secondary`: Borde rojo, texto rojo, acciones secundarias
- `danger`: Rojo oscuro, para delete/peligro
- `ghost`: Sin borde ni fondo, texto rojo

**Tamaños**:

- `sm`: 32px altura, 12px padding
- `md`: 40px altura, 16px padding (default)
- `lg`: 48px altura, 20px padding (táctil mobile)

**Estados**:

- `default`: Color base
- `hover`: Más oscuro
- `active`: Presionado
- `disabled`: Opacidad 0.5
- `loading`: Spinner animado

---

### **Badge**

```typescript
interface BadgeProps {
  label: string;
  variant?: "pending" | "process" | "painting" | "done" | "alert" | "success";
  size?: "sm" | "md";
  icon?: ReactNode;
}
```

**Variantes (Estados de Trabajo)**:

- `pending`: Naranja (#FF9800) — "Pendiente"
- `process`: Azul (#2196F3) — "En proceso"
- `painting`: Morado (#9C27B0) — "Pintura"
- `done`: Verde (#4CAF50) — "Terminado"
- `alert`: Naranja oscuro — Stock bajo
- `success`: Verde — Confirmación

---

### **Card**

```typescript
interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
  shadow?: "none" | "sm" | "md" | "lg";
  className?: string;
}
```

**Propiedades**:

- Fondo gris claro (#F5F5F5)
- Border-radius: 8px
- Padding: 16px
- Shadow base: 2px 8px rgba(0,0,0,0.1)
- Hover shadow: 4px 12px rgba(0,0,0,0.15) si `hoverable`

---

### **Input**

```typescript
interface InputProps {
  type?: "text" | "email" | "password" | "number" | "date" | "tel";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  maxLength?: number;
  className?: string;
}
```

**Estilos**:

- Border: 1px solid #DDD
- Border-radius: 6px
- Padding: 12px
- Font: Poppins Regular, 16px
- Focus: Border #CC0000 + shadow rojo 0.1 opacity
- Error: Border #F44336 (rojo)

---

### **Select**

```typescript
interface SelectProps {
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}
```

**Idéntico a Input** pero con dropdown personalizado.

---

### **Modal**

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footerActions?: ReactNode;
  size?: "sm" | "md" | "lg";
  closeButton?: boolean;
}
```

**Tamaños**:

- `sm`: 300px max-width (mobile)
- `md`: 500px max-width (default)
- `lg`: 800px max-width (desktop)

**Backdrop**: Oscuro 0.5 opacity, click cierra si `closeButton`

---

### **Toast / Alert**

```typescript
interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number; // ms, default 3000
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

**Posición**: Bottom-right (mobile: full-width bottom)

---

### **Skeleton (Loading)**

```typescript
interface SkeletonProps {
  width?: string; // '100%', '200px'
  height?: string; // '16px', '40px'
  borderRadius?: string;
  count?: number; // repeticiones
}
```

**Animación**: Shimmer de izquierda a derecha, infinita.

---

## 🎨 COMPONENTES DE LAYOUT

### **Header**

```typescript
interface HeaderProps {
  title?: string;
  subtitle?: string;
  rightActions?: ReactNode;
  onMenuToggle?: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}
```

**Desktop**:

- Altura: 60px
- Background: Blanco
- Border-bottom: 1px solid #DDD
- Logo + título a la izquierda

**Mobile**:

- Altura: 56px
- Hamburguesa + título + acciones

---

### **Sidebar (Desktop)**

```typescript
interface SidebarProps {
  items: Array<{
    id: string;
    icon: ReactNode;
    label: string;
    href: string;
    badge?: number;
  }>;
  activeItem?: string;
  onItemClick?: (id: string) => void;
}
```

**Propiedades**:

- Ancho fijo: 220px
- Background: Negro (#1A1A1A)
- Altura: viewport completo
- Item activo: Background rojo, texto blanco
- Item inactivo: Texto gris, hover background #2a2a2a

---

### **NavBar (Mobile)**

```typescript
interface NavBarProps {
  items: Array<{
    id: string;
    icon: ReactNode;
    label: string;
    href: string;
    badge?: number;
  }>;
  activeItem?: string;
  onItemClick?: (id: string) => void;
}
```

**Propiedades**:

- Altura: 64px
- Border-top: 1px solid #DDD
- Background: Blanco
- Posición: Fixed bottom
- Tab activo: Ícono rojo, texto rojo
- Tab inactivo: Ícono gris, texto gris

---

### **Layout Principal**

```typescript
interface LayoutProps {
  children: ReactNode;
  sidebar?: boolean;
  navbar?: boolean;
  header?: boolean;
}
```

**Estructura**:

```
┌─────────────────────┐
│      Header         │ (si header=true)
├─────────┬───────────┤
│         │           │
│ Sidebar │ children  │ (Sidebar si desktop)
│         │           │
├─────────┴───────────┤
│      NavBar         │ (si mobile)
└─────────────────────┘
```

---

## 📊 COMPONENTES ESPECÍFICOS POR MÓDULO

### **Dashboard**

#### **MetricsCards**

```typescript
interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: number; // porcentaje
    direction: "up" | "down";
  };
  icon?: ReactNode;
  onClick?: () => void;
}
```

#### **FinanceChart (Donut)**

```typescript
interface FinanceChartProps {
  ingresos: number;
  gastos: number;
  ganancia: number;
}
```

Usa `recharts` o similar. 3 colores: Verde (ganancia), Rojo (gastos), Azul (ingresos).

#### **WorkCard**

```typescript
interface WorkCardProps {
  id: string;
  placa: string;
  modelo: string;
  cliente: string;
  estado: "Pendiente" | "En proceso" | "Pintura" | "Terminado";
  precio: number;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}
```

---

### **Trabajos**

#### **WorkForm**

```typescript
interface WorkFormProps {
  initialData?: Work;
  onSubmit: (data: WorkFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}
```

**Campos**:

- Cliente (input text + tel)
- Vehículo (placa, modelo, color)
- Tipo trabajo (multi-select)
- Descripción (textarea)
- Empleados asignados (multi-select)
- Precio acordado (input number)
- Fotos (upload)

#### **PhotoUpload**

```typescript
interface PhotoUploadProps {
  label: string;
  maxFiles?: number;
  maxSize?: number; // bytes
  onUpload: (files: File[]) => void;
  existingPhotos?: Array<{ url: string; id: string }>;
  onDelete?: (id: string) => void;
}
```

---

### **Finanzas**

#### **TransactionForm**

```typescript
interface IncomeFormProps {
  onSubmit: (data: IncomeData) => void;
  trabajoId?: string;
  trabajosSuggestions?: Work[];
}

interface ExpenseFormProps {
  onSubmit: (data: ExpenseData) => void;
  categories?: string[];
}
```

---

### **Inventario**

#### **StockAlert**

```typescript
interface StockAlertProps {
  productId: string;
  nombre: string;
  cantidad: number;
  stockMinimo: number;
  onReplenish?: () => void;
}
```

**Muestra**: "⚠️ {nombre}: {cantidad}/{stockMinimo} — Reabastecer"

---

### **Empleados**

#### **EmployeeProductivity**

```typescript
interface ProductivityProps {
  empleadoId: string;
  nombre: string;
  trabajosEsta Semana: number;
  trabajosEsteMes: number;
  comisionAcumulada: number;
}
```

---

## 🎬 ANIMACIONES & TRANSICIONES

```css
/* Botones */
transition: all 0.2s ease;
transform: scale(0.98) on active;

/* Cards hover */
transition: box-shadow 0.2s ease;
transform: translateY(-2px) on hover;

/* Inputs focus */
transition:
  border-color 0.2s ease,
  box-shadow 0.2s ease;

/* Loading spinner */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
animation: spin 1s linear infinite;

/* Shimmer (skeleton) */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
animation: shimmer 2s infinite;
```

---

## ♿ ACCESIBILIDAD

- [x] `aria-label` en botones sin texto
- [x] `role="status"` en toasts
- [x] Keyboard navigation (Tab, Enter)
- [x] Focus visible (outline 2px)
- [x] Contrast ratio WCAG AA (4.5:1)
- [x] Touch targets >= 48px × 48px

---

## 📊 ANÁLISIS DE COMPONENTES EN MAQUETAS

### Proporción de Uso Global

**Total de elementos UI analizados:** 672 elementos en 12 maquetas

| Componente        | Uso           | Promedio     | Maquetas     |
| ----------------- | ------------- | ------------ | ------------ |
| 🔘 **Buttons**    | 65 elementos  | 5.4/maqueta  | 12/12 (100%) |
| 📱 **Navigation** | 116 elementos | 14.5/maqueta | 8/12 (67%)   |
| 🎴 **Cards**      | 46 elementos  | 7.7/maqueta  | 6/12 (50%)   |
| 📝 **Inputs**     | 34 elementos  | 3.4/maqueta  | 10/12 (83%)  |
| 📋 **Forms**      | 4 conjuntos   | 1/formulario | 4/12 (33%)   |
| 🏷️ **Headers**    | 20 elementos  | 1.8/maqueta  | 11/12 (92%)  |
| 🔖 **Badges**     | 5 elementos   | 5/maqueta    | 1/12 (8%)    |
| 📊 **Tables**     | 5 tablas      | 1.7/maqueta  | 3/12 (25%)   |
| 🔲 **Grids**      | 6 patrones    | 6/maqueta    | 1/12 (8%)    |

---

## 🔧 COMPOSICIÓN POR MAQUETA

### **01-login.html**

- ✅ Layout simple centrado
- ✅ 1 Form con 2 Inputs
- ✅ 1 Button primario
- ✅ Link "forgot password"

**Componentes críticos**: Form, Input, Button, Link

---

### **02-dashboard.html**

- ✅ Header + Sidebar (desktop) + NavBar (mobile)
- ✅ 4 MetricCards con valores + trend
- ✅ 1 FinanceChart placeholder
- ✅ Lista de trabajos recientes
- ✅ Grid de acceso rápido (4 botones)

**Componentes críticos**: Header, Sidebar, NavBar, MetricCard, Button, Card

**Patrón**: `Layout > Header + Sidebar > [MetricCard, FinanceChart, List]`

---

### **03-trabajos-listado.html**

- ✅ Header + Sidebar + NavBar
- ✅ Toolbar (búsqueda + filtros con tabs)
- ✅ Grid de WorkCards (gallery)
- ✅ Cada card: placa, estado (badge), cliente, precio, acciones

**Componentes críticos**: Header, Sidebar, NavBar, Input (search), Tabs, Card, Badge, Button

**Patrón**: `Layout > Header + Toolbar > Grid[WorkCard with Badge + Actions]`

---

### **04-trabajos-crear.html**

- ✅ Form multi-sección
- ✅ Secciones: Cliente, Vehículo, Trabajo, Fotos, Notas
- ✅ Multi-select para tipos de trabajo
- ✅ PhotoUpload area (drag-drop)
- ✅ Fixed action bar (Cancel/Create buttons)

**Componentes críticos**: Form, Input, Select, Textarea, PhotoUpload, Button

**Patrón**: `Form > [FormSection > FormGroup > Input] > PhotoUpload > ActionBar[Button]`

---

### **05-finanzas.html**

- ✅ Header + NavBar
- ✅ Summary cards (Ingresos, Gastos, Ganancia)
- ✅ Tabs (Ingresos, Gastos, Resumen)
- ✅ Tables con transacciones
- ✅ Toolbar para buscar/filtrar

**Componentes críticos**: Header, NavBar, SummaryCard, Tabs, Table, Input, Button

**Patrón**: `Layout > Header > SummaryCards + Tabs > Table`

---

### **06-inventario.html**

- ✅ Header + Sidebar + NavBar
- ✅ StockAlert section (resaltado)
- ✅ Table de productos
- ✅ Cada fila: nombre, categoría, stock (badge), precio, acciones

**Componentes críticos**: Header, Sidebar, NavBar, Alert, Table, Badge, Button

**Patrón**: `Layout > Header + Alert > Table[Badge + Actions]`

---

### **07-empleados.html**

- ✅ Header + Sidebar + NavBar
- ✅ Toolbar (search + new button)
- ✅ Grid de EmployeeCards
- ✅ Cada card: avatar, nombre, rol, stats, botones

**Componentes críticos**: Header, Sidebar, NavBar, Input, Grid, Card, Button

**Patrón**: `Layout > Header + Toolbar > Grid[EmployeeCard + Actions]`

---

### **08-reportes.html**

- ✅ Header + Sidebar + NavBar
- ✅ Date range selector + filter buttons
- ✅ Summary stats (4 cards)
- ✅ Charts placeholders (2)
- ✅ Tables de top employees + top services

**Componentes críticos**: Header, Sidebar, NavBar, DatePicker, Button, Card, Chart, Table

**Patrón**: `Layout > Header + Toolbar > Stats + Charts > Tables`

---

### **09-ajustes.html**

- ✅ Header + Sidebar menu (horizontal en mobile)
- ✅ Menu items con icons
- ✅ Form sections (Taller, Comisiones, Integraciones, Seguridad, Respaldo)
- ✅ Nested forms con inputs, selects, toggles

**Componentes críticos**: Header, SidebarMenu, Form, Input, Select, Toggle, Button

**Patrón**: `Layout > Header + SidebarMenu > [FormSection > Inputs]`

---

### **10-trabajo-detalle.html**

- ✅ Header con estado badge
- ✅ Cards: Cliente, Vehículo, Trabajo, Fotos, Team assignment
- ✅ Timeline de cambios
- ✅ Action buttons (Edit, Delete, Print)

**Componentes críticos**: Header, Card, Badge, PhotoGallery, Timeline, Button

**Patrón**: `Layout > Header[Badge] > Grid[Card] > PhotoGallery + Timeline`

---

### **11-crear-ingreso.html**

- ✅ Form simple (1 sección)
- ✅ Campos: tipo ingreso (radio), monto, fecha, método pago
- ✅ Campos condicionales según selección
- ✅ Fixed action bar

**Componentes críticos**: Form, Input, Select, Radio, Textarea, Button

**Patrón**: `Form > FormGroup > [Input + ConditionalFields] > ActionBar[Button]`

---

### **12-crear-gasto.html**

- ✅ Form simple (similar a ingreso)
- ✅ Campos: concepto, monto, fecha, categoría
- ✅ Opción recurrencia + número comprobante
- ✅ Fixed action bar

**Componentes críticos**: Form, Input, Select, Checkbox, Button

**Patrón**: `Form > FormGroup > [Input + Checkbox] > ActionBar[Button]`

---

## 🎯 JERARQUÍA DE COMPONENTES

**Nivel 0 (Primitivos):**

- Text, Icon, Spacer

**Nivel 1 (Atómicos):**

- Button, Badge, Input, Select, Checkbox, Radio, Textarea

**Nivel 2 (Moleculares):**

- Form, FormGroup, FormSection, Card, Header, NavBar, Sidebar

**Nivel 3 (Organismos):**

- Layout, Modal, Toast, DataTable, Dashboard, Form (completo)

**Nivel 4 (Templates/Páginas):**

- LoginPage, DashboardPage, WorkListPage, etc. (las 12 maquetas)

---

## 🚀 GUÍA DE IMPLEMENTACIÓN RÁPIDA

### 1. Setup inicial React + Tailwind

```bash
npm create vite@latest pintumaster -- --template react-ts
cd pintumaster
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Crear estructura de componentes

```
src/
├── components/
│   ├── primitives/        # Button, Badge, Input...
│   ├── molecules/         # Form, Card, Header...
│   ├── organisms/         # Layout, Modal, DataTable...
│   └── pages/             # Página completas
├── hooks/                 # useForm, useData...
├── store/                 # Zustand stores
├── styles/                # Tailwind config
└── types/                 # TypeScript interfaces
```

### 3. Prioridad de componentes a implementar

1. **Semana 1**: Button, Badge, Input, Card, Form → **Login page**
2. **Semana 2**: Header, Sidebar, NavBar, Layout → **Dashboard page**
3. **Semana 3**: DataTable, Modal, Toast, DatePicker → **Data pages**
4. **Semana 4**: Charts, PhotoUpload, Timeline → **Detail pages**

---

## ✅ CHECKLIST IMPLEMENTACIÓN COMPONENTES

### Primitivos

- [ ] Button (4 variantes × 3 tamaños)
- [ ] Badge (6 variantes)
- [ ] Card (hover, shadow, clickable)
- [ ] Input (text, email, password, number)
- [ ] Select (custom dropdown)
- [ ] Checkbox, Radio, Toggle
- [ ] Textarea (resizable)
- [ ] Link, Icon, Spacer

### Moleculares

- [ ] Form, FormGroup, FormSection
- [ ] Header (responsive)
- [ ] Sidebar (desktop collapsible)
- [ ] NavBar (mobile bottom)
- [ ] Toolbar (search + filters)
- [ ] Tabs (horizontal)
- [ ] Pagination
- [ ] Breadcrumb

### Organismos

- [ ] Layout (combina Header + Sidebar + NavBar)
- [ ] Modal (sm, md, lg)
- [ ] Toast / Alert (tipos: success, error, warning)
- [ ] DataTable (sorting, pagination)
- [ ] FinanceChart (recharts integration)
- [ ] PhotoGallery, PhotoUpload
- [ ] Timeline
- [ ] DateRangePicker

### Páginas (Templates)

- [ ] LoginPage
- [ ] DashboardPage
- [ ] WorkListPage, WorkDetailPage, WorkCreatePage
- [ ] FinancePage
- [ ] InventoryPage
- [ ] EmployeesPage
- [ ] ReportsPage
- [ ] SettingsPage

---

## 📚 REFERENCIAS EXTERNAS

- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Hook Form**: https://react-hook-form.com/
- **React Query**: https://tanstack.com/query/latest
- **Recharts**: https://recharts.org/
- **Radix UI** (headless components): https://www.radix-ui.com/

---

## ✅ ESTADO DE DOCUMENTACIÓN

- ✅ Componentes base especificados
- ✅ Componentes por módulo documentados
- ✅ Análisis de maquetas completado
- ✅ Jerarquía de componentes definida
- ✅ Guía de implementación creada
- ✅ Checklist de implementación generado

**Próximo paso**: Implementación en Phase 2 (React + TypeScript)

- [ ] Modal (sm/md/lg, close)
- [ ] Toast (4 tipos, auto-close)
- [ ] Skeleton (shimmer)
- [ ] Header (mobile/desktop)
- [ ] Sidebar (active, hover)
- [ ] NavBar (mobile, active)
- [ ] Layout (wrapper)
- [ ] MetricCard (trend)
- [ ] FinanceChart (donut)
- [ ] WorkCard (acciones)
- [ ] WorkForm (validación)
- [ ] PhotoUpload (drag-drop)
- [ ] StockAlert (visual)
- [ ] ProductivityWidget (stats)
