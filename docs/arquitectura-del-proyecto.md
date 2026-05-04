# 🏗️ ARQUITECTURA DEL PROYECTO — PINTUMASTER

**Versión:** 1.0  
**Fecha:** 3 de mayo de 2026

---

## 📁 ESTRUCTURA DE CARPETAS

```
PintuMaster/
│
├── docs/                               # 📚 DOCUMENTACIÓN (TODO en DDD)
│   ├── CONTINUIDAD.md                  ⭐ Fuente de verdad
│   ├── INDICE.md                       📖 Índice maestro
│   ├── alcance-del-proyecto.md         ✅ Qué sí/no en v1
│   ├── sistema-de-diseno.md            🎨 Colores, tipografía, componentes
│   ├── tech-stack.md                   🔧 Stack + justificación
│   ├── arquitectura-del-proyecto.md    📋 Este archivo
│   ├── fases-del-proyecto.md           🎯 Fases y subfases
│   ├── modelo-de-datos.md              🗄️ Firestore collections
│   ├── flujos-de-usuario.md            🌊 User journeys
│   ├── reglas-firestore.md             🔐 Security rules (CRÍTICO)
│   ├── componentes-ui.md               🧩 Especificación React
│   ├── integraciones.md                🔌 APIs externas
│   └── referencias/
│       └── reglas-seguridad-firebase.md 📖 Extracción del PDF
│
├── src/                                # 💻 CÓDIGO FUENTE
│   ├── index.tsx                       Entrada app
│   ├── main.tsx                        Vite entry
│   │
│   ├── config/
│   │   ├── firebase.ts                 Inicialización Firebase
│   │   ├── constants.ts                Constantes globales
│   │   └── env.ts                      Variables entorno (validadas)
│   │
│   ├── types/
│   │   ├── index.ts                    Tipos globales
│   │   ├── user.ts                     User, Employee, etc.
│   │   ├── work.ts                     Work, WorkStatus, etc.
│   │   ├── finance.ts                  Income, Expense, etc.
│   │   └── inventory.ts                Product, Stock, etc.
│   │
│   ├── store/
│   │   ├── useAuthStore.ts             Estado autenticación
│   │   ├── useWorkStore.ts             Estado trabajos
│   │   ├── useFinanceStore.ts          Estado finanzas
│   │   ├── useInventoryStore.ts        Estado inventario
│   │   ├── useEmployeeStore.ts         Estado empleados
│   │   └── useUIStore.ts               Estado UI global
│   │
│   ├── services/
│   │   ├── firestore/
│   │   │   ├── workService.ts          CRUD trabajos
│   │   │   ├── financeService.ts       CRUD finanzas
│   │   │   ├── inventoryService.ts     CRUD inventario
│   │   │   ├── employeeService.ts      CRUD empleados
│   │   │   └── userService.ts          CRUD usuarios
│   │   ├── storage/
│   │   │   └── photoService.ts         Upload/download fotos
│   │   ├── auth/
│   │   │   └── authService.ts          Login, logout, sesión
│   │   ├── external/
│   │   │   ├── whatsappService.ts      Integración WhatsApp API
│   │   │   ├── bancolombiaBancolombia.ts Webhook Bancolombia
│   │   │   └── nequiService.ts         Webhook Nequi
│   │   └── query/
│   │       └── queryService.ts         React Query setup
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                  Hook autenticación
│   │   ├── useWorks.ts                 Hook trabajos
│   │   ├── useFinance.ts               Hook finanzas
│   │   ├── useInventory.ts             Hook inventario
│   │   ├── useEmployees.ts             Hook empleados
│   │   └── useMediaQuery.ts            Hook responsive
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx              Button component
│   │   │   ├── Badge.tsx               Badge component
│   │   │   ├── Card.tsx                Card component
│   │   │   ├── Input.tsx               Input component
│   │   │   ├── Select.tsx              Select component
│   │   │   ├── Modal.tsx               Modal component
│   │   │   ├── Toast.tsx               Toast component
│   │   │   └── Skeleton.tsx            Loading skeleton
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx              Header
│   │   │   ├── Sidebar.tsx             Sidebar (desktop)
│   │   │   ├── NavBar.tsx              Bottom nav (mobile)
│   │   │   ├── Layout.tsx              Layout principal
│   │   │   └── ProtectedRoute.tsx      Route protection
│   │   │
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx           Página dashboard
│   │   │   ├── MetricsCards.tsx        Tarjetas métricas
│   │   │   ├── FinanceChart.tsx        Gráfico donut
│   │   │   ├── RecentWorks.tsx         Trabajos recientes
│   │   │   └── QuickAccess.tsx         Accesos rápidos
│   │   │
│   │   ├── works/
│   │   │   ├── WorksList.tsx           Listado trabajos
│   │   │   ├── WorkDetail.tsx          Detalle trabajo
│   │   │   ├── WorkForm.tsx            Crear/editar trabajo
│   │   │   ├── WorkCard.tsx            Card de trabajo
│   │   │   ├── PhotoUpload.tsx         Upload fotos
│   │   │   └── WorkComments.tsx        Notas trabajo
│   │   │
│   │   ├── finance/
│   │   │   ├── FinanceDashboard.tsx    Dashboard finanzas
│   │   │   ├── IncomeForm.tsx          Registrar ingreso
│   │   │   ├── ExpenseForm.tsx         Registrar gasto
│   │   │   ├── TransactionList.tsx     Listado transacciones
│   │   │   ├── ClosingModal.tsx        Cierre semanal
│   │   │   └── FinanceChart.tsx        Gráficos
│   │   │
│   │   ├── inventory/
│   │   │   ├── InventoryList.tsx       Listado inventario
│   │   │   ├── ProductForm.tsx         Crear insumo
│   │   │   ├── ProductCard.tsx         Card insumo
│   │   │   ├── StockAlert.tsx          Alerta stock bajo
│   │   │   └── PurchaseForm.tsx        Registrar compra
│   │   │
│   │   ├── employees/
│   │   │   ├── EmployeeList.tsx        Listado empleados
│   │   │   ├── EmployeeCard.tsx        Card empleado
│   │   │   ├── EmployeeForm.tsx        Crear empleado
│   │   │   ├── ProductivityWidget.tsx  Productividad
│   │   │   └── CommissionView.tsx      Ver comisiones
│   │   │
│   │   ├── reports/
│   │   │   ├── ReportsDashboard.tsx    Dashboard reportes
│   │   │   ├── WorksReport.tsx         Reporte trabajos
│   │   │   ├── FinanceReport.tsx       Reporte finanzas
│   │   │   ├── EmployeeReport.tsx      Reporte empleados
│   │   │   ├── InventoryReport.tsx     Reporte inventario
│   │   │   └── ReportFilters.tsx       Filtros
│   │   │
│   │   ├── settings/
│   │   │   ├── SettingsDashboard.tsx   Dashboard ajustes
│   │   │   ├── ShopSettings.tsx        Datos del taller
│   │   │   ├── CategoriesSettings.tsx  Categorías inventario
│   │   │   ├── CommissionSettings.tsx  Comisiones empleados
│   │   │   └── ProfileSettings.tsx     Perfil dueño
│   │   │
│   │   ├── auth/
│   │   │   ├── Login.tsx               Página login
│   │   │   ├── LoginForm.tsx           Form login
│   │   │   └── LogoutButton.tsx        Botón logout
│   │   │
│   │   └── common/
│   │       ├── Loading.tsx             Spinner
│   │       ├── ErrorBoundary.tsx       Error handler
│   │       ├── NotFound.tsx            404
│   │       └── EmptyState.tsx          Estado vacío
│   │
│   ├── pages/
│   │   ├── DashboardPage.tsx           Page dashboard
│   │   ├── WorksPage.tsx               Page trabajos
│   │   ├── FinancePage.tsx             Page finanzas
│   │   ├── InventoryPage.tsx           Page inventario
│   │   ├── EmployeesPage.tsx           Page empleados
│   │   ├── ReportsPage.tsx             Page reportes
│   │   ├── SettingsPage.tsx            Page ajustes
│   │   ├── LoginPage.tsx               Page login
│   │   └── NotFoundPage.tsx            Page 404
│   │
│   ├── utils/
│   │   ├── formatters.ts               Formateo datos
│   │   ├── validators.ts               Validación entrada
│   │   ├── firebase.ts                 Utilidades Firebase
│   │   ├── date.ts                     Utilidades fechas
│   │   ├── currency.ts                 Formateo moneda COP
│   │   ├── phone.ts                    Formateo teléfono
│   │   └── errors.ts                   Manejo errores
│   │
│   ├── styles/
│   │   ├── index.css                   Estilos globales
│   │   ├── tailwind.css                Config Tailwind
│   │   └── animations.css              Animaciones
│   │
│   ├── App.tsx                         App principal
│   └── App.css                         App styles
│
├── public/                             # 🖼️ ASSETS ESTÁTICOS
│   ├── logo.png                        Logo PintuMaster
│   ├── logo-dark.png                   Logo darkmode
│   ├── favicon.ico
│   ├── icons/
│   │   ├── home.svg
│   │   ├── work.svg
│   │   ├── finance.svg
│   │   ├── inventory.svg
│   │   ├── employee.svg
│   │   ├── reports.svg
│   │   └── settings.svg
│   └── images/
│       ├── empty-state-works.svg
│       ├── empty-state-finance.svg
│       └── error-404.svg
│
├── .env.example                        Ejemplo variables entorno
├── .env.local                          Variables entorno (NO versionar)
├── .gitignore                          Archivos ignorados
├── .eslintrc.json                      Configuración ESLint
├── .prettierrc.json                    Configuración Prettier
├── vite.config.ts                      Configuración Vite
├── tsconfig.json                       Configuración TypeScript
├── tailwind.config.ts                  Configuración Tailwind
├── package.json                        Dependencias
├── package-lock.json                   Lock dependencias
├── README.md                           Descripción general
└── CHANGELOG.md                        Historial versiones
```

---

## 🏗️ PATRONES & CONVENCIONES

### 1. **Estructura de Componentes**

```typescript
// src/components/Button.tsx
import React from 'react';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'font-poppins font-medium rounded-md transition-all';

  const variantClasses = {
    primary: 'bg-pm-red text-white hover:bg-red-700',
    secondary: 'bg-white border border-pm-red text-pm-red hover:bg-pm-light-gray',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};
```

### 2. **Zustand Store**

```typescript
// src/store/useWorkStore.ts
import { create } from "zustand";
import type { Work } from "@/types/work";

interface WorkStore {
  works: Work[];
  loading: boolean;
  error: string | null;
  setWorks: (works: Work[]) => void;
  addWork: (work: Work) => void;
  updateWork: (id: string, work: Partial<Work>) => void;
  deleteWork: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWorkStore = create<WorkStore>((set) => ({
  works: [],
  loading: false,
  error: null,
  setWorks: (works) => set({ works }),
  addWork: (work) => set((state) => ({ works: [...state.works, work] })),
  updateWork: (id, update) =>
    set((state) => ({
      works: state.works.map((w) => (w.id === id ? { ...w, ...update } : w)),
    })),
  deleteWork: (id) =>
    set((state) => ({
      works: state.works.filter((w) => w.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
```

### 3. **Custom Hook**

```typescript
// src/hooks/useWorks.ts
import { useCallback } from "react";
import { useQuery, useMutation } from "react-query";
import { useWorkStore } from "@/store/useWorkStore";
import { workService } from "@/services/firestore/workService";

export const useWorks = () => {
  const store = useWorkStore();

  const { data, isLoading, error } = useQuery(
    ["works"],
    workService.getAllWorks,
    {
      onSuccess: (data) => store.setWorks(data),
      staleTime: 1000 * 60 * 5, // 5 minutos
    },
  );

  const createWorkMutation = useMutation(workService.createWork, {
    onSuccess: (newWork) => store.addWork(newWork),
  });

  const updateWorkMutation = useMutation(
    ({ id, data }: { id: string; data: Partial<Work> }) =>
      workService.updateWork(id, data),
    {
      onSuccess: (updated) => store.updateWork(updated.id, updated),
    },
  );

  return {
    works: data ?? [],
    isLoading,
    error,
    createWork: createWorkMutation.mutate,
    updateWork: updateWorkMutation.mutate,
    isCreating: createWorkMutation.isLoading,
    isUpdating: updateWorkMutation.isLoading,
  };
};
```

### 4. **Firestore Service**

```typescript
// src/services/firestore/workService.ts
import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import type { Work } from "@/types/work";

export const workService = {
  async getAllWorks(): Promise<Work[]> {
    const q = query(collection(db, "trabajos"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Work);
  },

  async getWorksByOwner(ownerUid: string): Promise<Work[]> {
    const q = query(
      collection(db, "trabajos"),
      where("ownerUid", "==", ownerUid),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Work);
  },

  async createWork(work: Omit<Work, "id" | "createdAt">): Promise<Work> {
    const docRef = await addDoc(collection(db, "trabajos"), {
      ...work,
      createdAt: new Date().toISOString(),
    });
    return {
      id: docRef.id,
      ...work,
      createdAt: new Date().toISOString(),
    } as Work;
  },

  async updateWork(id: string, update: Partial<Work>): Promise<void> {
    const docRef = doc(db, "trabajos", id);
    await updateDoc(docRef, { ...update, updatedAt: new Date().toISOString() });
  },

  async deleteWork(id: string): Promise<void> {
    const docRef = doc(db, "trabajos", id);
    await deleteDoc(docRef);
  },
};
```

---

## 🧠 RESPONSABILIDADES POR CARPETA

| Carpeta       | Responsabilidad                             |
| ------------- | ------------------------------------------- |
| `config/`     | Inicialización de servicios (Firebase, env) |
| `types/`      | Definiciones TypeScript (Interfaces, tipos) |
| `store/`      | Estado global con Zustand                   |
| `services/`   | Lógica de acceso a datos (Firebase, APIs)   |
| `hooks/`      | Lógica reutilizable con React Hooks         |
| `components/` | Componentes React reutilizables             |
| `pages/`      | Páginas/vistas (1 componente = 1 ruta)      |
| `utils/`      | Funciones utilidad sin estado               |
| `styles/`     | Estilos globales y configuración CSS        |
| `public/`     | Assets estáticos (nunca cambiar en código)  |

---

## 🔄 FLUJO DE DATOS

```
1. User interactúa con componente (Page/Component)
2. Component dispara mutation (useMutation hook)
3. Hook llama a Service (firestore/auth/storage)
4. Service hace request a Firebase
5. Store se actualiza (Zustand)
6. Component re-render con nuevo estado
7. UI actualizada
```

---

## 🧪 TESTING STRATEGY

```
tests/
├── unit/
│   ├── utils.test.ts
│   ├── validators.test.ts
│   └── formatters.test.ts
├── components/
│   ├── Button.test.tsx
│   ├── Badge.test.tsx
│   └── Card.test.tsx
├── hooks/
│   ├── useWorks.test.ts
│   ├── useFinance.test.ts
│   └── useAuth.test.ts
└── integration/
    ├── workFlow.test.ts
    ├── financeFlow.test.ts
    └── authFlow.test.ts
```

---

## ✅ CHECKLIST DE ARQUITECTURA

- [ ] Carpetas creadas según estructura
- [ ] Tipos TypeScript definidos
- [ ] Stores Zustand configurados
- [ ] Services Firebase implementados
- [ ] Hooks personalizados creados
- [ ] Componentes base construidos
- [ ] Páginas principales mapeadas
- [ ] Testing setup completo
- [ ] ESLint + Prettier configurado
- [ ] .env.example completado
