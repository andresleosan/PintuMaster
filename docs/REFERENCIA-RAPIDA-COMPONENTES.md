# 🚀 REFERENCIA RÁPIDA COMPONENTES — PINTUMASTER

**Para:** Desarrolladores React implementando Phase 2  
**Fecha:** 3 de mayo de 2026

---

## 📍 LOCALIZACIÓN DE DOCUMENTACIÓN

| Documento                         | Propósito                        | Ubicación                        |
| --------------------------------- | -------------------------------- | -------------------------------- |
| 📐 **Sistema de Diseño**          | Colores, tipografía, espaciado   | `docs/sistema-de-diseno.md`      |
| 🧩 **Especificación Componentes** | Interfaces TypeScript completas  | `docs/componentes-ui.md`         |
| 🎨 **Maquetas HTML**              | Referencia visual de cada página | `maquetas/01-12.html`            |
| ✅ **Checklist Implementación**   | Orden de trabajo priorizado      | `docs/componentes-ui.md` (final) |

---

## 🔥 TOP 3 COMPONENTES CRÍTICOS

### 1️⃣ Button (65 usos)

```typescript
// src/components/primitives/Button.tsx
interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}
```

**Variantes:**

- `primary` (#CC0000) - CTAs principales
- `secondary` (borde rojo) - Acciones secundarias
- `danger` (rojo oscuro) - Deleteos
- `ghost` (sin fondo) - Links

**Tamaños:**

- `sm`: 32px
- `md`: 40px (default)
- `lg`: 48px (mobile táctil)

**Uso en maquetas:** 02 (5), 03 (10), 04 (3), 05-12 (2-12)

---

### 2️⃣ Layout (Header + Sidebar + NavBar)

```typescript
// src/components/molecules/Layout.tsx
interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean; // Desktop only
  showNavbar?: boolean; // Mobile only
}
```

**Estructura:**

```
Desktop (1024px+):
┌──────────────────────┐
│      Header (60px)   │
├───────┬──────────────┤
│       │              │
│ Side  │   children   │
│ bar   │              │
│(220px)│              │
└───────┴──────────────┘

Mobile (<768px):
┌──────────────────────┐
│   Header (56px)      │
├──────────────────────┤
│    children          │
├──────────────────────┤
│   NavBar (64px)      │
└──────────────────────┘
```

**Maquetas usando Layout:** 02, 03, 05-10 (80% del proyecto)

---

### 3️⃣ Card (46 usos)

```typescript
// src/components/molecules/Card.tsx
interface CardProps {
  children: ReactNode;
  hoverable?: boolean;
  shadow?: "sm" | "md" | "lg";
  onClick?: () => void;
}
```

**Estilos:**

- Background: #F5F5F5
- Border-radius: 8px
- Padding: 16px
- Shadow base: 0 2px 8px rgba(0,0,0,0.1)
- Hover: shadow 0 4px 12px si `hoverable`

**Maquetas usando Card:** Dashboard (3), Trabajos (4), Finanzas (13), etc.

---

## 📊 PRIORIDADES DE IMPLEMENTACIÓN

### Semana 1: MVP Login

1. ✅ Button (primary, secondary)
2. ✅ Input (text, email, password)
3. ✅ Link
4. ✅ LoginPage
   - Resultado: 1 de 12 maquetas funcional

### Semana 2: Dashboard Base

5. ✅ Header (con logo)
6. ✅ Sidebar (desktop)
7. ✅ NavBar (mobile)
8. ✅ Layout (combina arriba)
9. ✅ Card
10. ✅ DashboardPage
    - Resultado: 2 de 12 maquetas funcionales

### Semana 3: Data Views

11. ✅ DataTable (sorting, pagination)
12. ✅ Badge (6 variantes)
13. ✅ Tabs
14. ✅ Select (custom dropdown)
15. ✅ WorkListPage, FinancesPage, InventoryPage
    - Resultado: 5 de 12 maquetas funcionales

### Semana 4: Detalles & Forms

16. ✅ Form, FormGroup, FormSection
17. ✅ Modal, Toast
18. ✅ DatePicker
19. ✅ PhotoUpload
20. ✅ Timeline
    - Resultado: 12 de 12 maquetas funcionales

---

## 🛠️ COMMANDS SETUP

```bash
# Crear proyecto Vite + React + TS
npm create vite@latest pintumaster -- --template react-ts

# Install dependencies
npm install
npm install -D tailwindcss postcss autoprefixer
npm install zustand react-query react-router-dom
npm install react-hook-form zod

# Tailwind setup
npx tailwindcss init -p

# Start dev server
npm run dev

# Build para production
npm run build
```

---

## 📁 ESTRUCTURA FINAL (Phase 2)

```
src/
├── components/
│   ├── primitives/        # Button, Badge, Input, Icon, Spacer...
│   ├── molecules/         # Form, Card, Header, Sidebar, NavBar...
│   ├── organisms/         # Layout, Modal, DataTable...
│   └── pages/             # LoginPage, DashboardPage, WorkListPage...
├── hooks/
│   ├── useForm.ts
│   ├── useData.ts
│   └── useAuth.ts
├── store/                 # Zustand
│   ├── useAuthStore.ts
│   ├── useWorkStore.ts
│   ├── useFinanceStore.ts
│   └── useInventoryStore.ts
├── services/              # API calls
│   ├── auth.service.ts
│   ├── work.service.ts
│   └── finance.service.ts
├── types/
│   ├── models.ts
│   └── api.ts
├── styles/
│   ├── globals.css
│   └── tailwind.css
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🎨 TAILWIND CUSTOM CONFIG

```typescript
// tailwind.config.ts
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#CC0000",
        dark: "#1A1A1A",
        "status-pending": "#FF9800",
        "status-process": "#2196F3",
        "status-painting": "#9C27B0",
        "status-done": "#4CAF50",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
    },
  },
};
```

---

## 🚀 MILESTONES FASE 2

| Semana | Hito             | Maquetas             | Estado |
| ------ | ---------------- | -------------------- | ------ |
| 1      | Login + Setup    | 01/12                | ⏳     |
| 2      | Dashboard base   | 02/12                | ⏳     |
| 3      | Data views       | 03,05,06,08/12       | ⏳     |
| 4      | Detalle + Formas | 04,07,09,10,11,12/12 | ⏳     |

**Total Phase 2:** 4 semanas

---

## 📞 SOPORTE RÁPIDO

**¿Cómo implemento el Button?**

1. Lee `docs/componentes-ui.md` sección "Button"
2. Ver `maquetas/*.html` (usa clase `.btn-primary`, `.btn-secondary`)
3. Copia colores de `docs/sistema-de-diseno.md`
4. Implementa con Tailwind: `className="px-4 py-2 bg-red-600 text-white rounded"`

**¿Cuál es el orden correcto?**

1. Semana 1: Primitivos (Button, Input, Link)
2. Semana 2: Layout (Header, Sidebar, NavBar)
3. Semana 3: Moleculares (Card, Badge, Tabs, Table)
4. Semana 4: Organismos (Modal, Form, Charts)

**¿Dónde ver si hice bien?**
Compare contra `maquetas/XX.html` - deben verse idénticos

---

## ✅ CHECKLISTS QUICK

### Antes de implementar componente:

- [ ] Leí `docs/componentes-ui.md`
- [ ] Vi el componente en `maquetas/X.html`
- [ ] Anoté el TypeScript interface
- [ ] Preparé colores de `sistema-de-diseno.md`
- [ ] Separé props en "required" vs "optional"

### Después de implementar:

- [ ] Compila sin errores TypeScript
- [ ] Se ve igual a la maqueta HTML
- [ ] Funciona en mobile (320px) y desktop (1920px)
- [ ] Puedo reutilizarlo en múltiples lugares
- [ ] Agregué JSDoc comments
- [ ] Agregué test básico

---

**Éxito con Phase 2! 🚀**
