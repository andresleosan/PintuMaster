# PintuMaster - Frontend React + TypeScript

**Aplicación de gestión para latonería y pintura automotriz**

## 📋 Descripción

Implementación de React 18 + TypeScript + Tailwind CSS basada en las maquetas HTML del proyecto PintuMaster.

**Estado:** 🟡 Phase 2 - Semana 1 (Login Page implementada)

## 🚀 Quick Start

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura

```
src/
├── components/
│   ├── primitives/        # Button, Badge, Input, Card...
│   ├── molecules/         # Form, Header, Sidebar, NavBar...
│   ├── organisms/         # Layout, Modal, DataTable...
│   └── pages/             # LoginPage, DashboardPage...
├── hooks/                 # Custom React hooks
├── store/                 # Zustand stores (auth, work, finance...)
├── services/              # API services
├── types/                 # TypeScript interfaces
├── styles/                # CSS global y Tailwind
├── App.tsx
└── main.tsx
```

## 🎯 Roadmap

### Semana 1 ✅ (Primitivos + Login)

- ✅ Button (primary, secondary, danger, ghost)
- ✅ Input (text, email, password)
- ✅ Card
- ✅ Badge
- ✅ LoginPage
- ⏳ Instalación de dependencias (npm install)

### Semana 2 🟡 (Dashboard Base)

- [ ] Header
- [ ] Sidebar (desktop)
- [ ] NavBar (mobile)
- [ ] Layout component
- [ ] DashboardPage

### Semana 3 (Data Views)

- [ ] DataTable
- [ ] Tabs
- [ ] Select
- [ ] WorkListPage, FinancesPage

### Semana 4 (Detalles)

- [ ] Modal, Toast
- [ ] DatePicker
- [ ] PhotoUpload
- [ ] Timeline

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript 5** - Type safety
- **Vite 5** - Build tool
- **Tailwind CSS 3** - Styling
- **React Router 6** - Navigation
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **React Query** - Data fetching (mock para Phase 2)
- **Zustand** - State management

## 📖 Referencias

- Maquetas HTML: `../../maquetas/`
- Especificación de componentes: `../../docs/componentes-ui.md`
- Sistema de diseño: `../../docs/sistema-de-diseno.md`
- Referencia rápida: `../../docs/REFERENCIA-RAPIDA-COMPONENTES.md`

## 🔍 Checklist Semana 1

- [x] Vite + React + TypeScript setup
- [x] Tailwind CSS configurado
- [x] Button component implementado
- [x] Input component implementado
- [x] Card component implementado
- [x] Badge component implementado
- [x] LoginPage funcional
- [ ] npm install y testing en local
- [ ] Commit a GitHub

## 📝 Notas de Desarrollo

### Colores personalizados (Tailwind)

```
primary: #CC0000 (rojo)
dark: #1A1A1A (negro)
status-pending: #FF9800 (naranja)
status-process: #2196F3 (azul)
status-painting: #9C27B0 (morado)
status-done: #4CAF50 (verde)
```

### Tipografía

- Font: Poppins (importada de Google Fonts)
- Sizes: xs(12px), sm(14px), base(16px), lg(18px)...
- Line-height: 1.5em en todo el proyecto

### Touch Targets

- Mínimo 48px × 48px en mobile
- Configurado en tailwind.config.ts

### Responsive Design

- Mobile-first approach
- Breakpoint desktop: md (768px)
- Sidebar y NavBar se muestran según viewport

## 🐛 Troubleshooting

### Tailwind no aplica estilos

```bash
# Limpiar cache
rm -rf node_modules
npm install
npm run dev
```

### TypeScript errors

```bash
# Verificar errores
npm run build
```

### Componentes no se ven

- Verificar que `src/styles/index.css` esté importado en `main.tsx`
- Revisar console de browser para errores

## 📞 Soporte

Ver `docs/REFERENCIA-RAPIDA-COMPONENTES.md` para guía de implementación y checklist.

---

**Última actualización:** 3 de mayo de 2026
**Próxima revisión:** Después de semana 1 (npm install testing)
