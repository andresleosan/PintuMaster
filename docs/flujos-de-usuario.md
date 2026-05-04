# 🌊 FLUJOS DE USUARIO — USER JOURNEYS

**Versión:** 1.0  
**Fecha:** 3 de mayo de 2026

---

## 🎬 FLUJO 1: LOGIN & SETUP INICIAL

```
┌─ Usuario llega a app ─┐
│                       │
│ 1. Página login       │
│    Email + Password   │
│                       │
├─ Clic "Ingresar" ────┤
│                       │
│ 2. Validar Firebase   │
│    Auth              │
│                       │
├─ ÉXITO ──────────────┤
│                       │
│ 3. Redirect a        │
│    Dashboard         │
│                       │
├─ ERROR ──────────────┤
│                       │
│ 3. Mostrar error     │
│    "Email/pass inv." │
│                       │
└───────────────────────┘
```

**Tiempo**: < 2s (si conexión)  
**Éxito**: Llega a Dashboard  
**Fracaso**: Reintentar o "Olvidé contraseña"

---

## 🎬 FLUJO 2: CREAR UN NUEVO TRABAJO

```
┌─ Dueño en Dashboard ──────────────┐
│                                   │
│ 1. Click en "+ Nuevo trabajo"     │
│    (botón rojo CTA)               │
│                                   │
├─ Modal/Página: Crear trabajo ────┤
│                                   │
│ 2. Llenar formulario:             │
│    - Cliente (nombre + tel)       │
│    - Vehículo (placa, modelo)     │
│    - Tipo(s) de trabajo           │
│    - Descripción del daño         │
│    - Precio acordado              │
│    - Empleados asignados          │
│    - Subir FOTO ANTES             │
│                                   │
├─ Click "Crear trabajo" ──────────┤
│                                   │
│ 3. Validar en cliente (React)     │
│    - Todos campos requeridos      │
│    - Precio > 0                   │
│    - Al menos 1 foto              │
│                                   │
├─ ERROR ──────────────────────────┤
│ Toast: "Por favor llenar campos"  │
│ Cursor en campo vacío             │
│                                   │
├─ ÉXITO ───────────────────────────┤
│                                   │
│ 4. Enviar a Firestore             │
│    (validación en rules)          │
│                                   │
│ 5. Crear documento en /trabajos/  │
│    - ID: AUTO-{contador}          │
│    - Estado: "Pendiente"          │
│    - Auditar: "dueño creó trabajo"│
│                                   │
│ 6. Toast: "✅ Trabajo creado"     │
│                                   │
│ 7. Redirect a lista de trabajos   │
│    o detalle del trabajo          │
│                                   │
└───────────────────────────────────┘
```

**Tiempo**: 2-5 minutos (depende usuarios)  
**Pasos**: 7  
**Puntos de fricción**: Upload de foto lento

---

## 🎬 FLUJO 3: REGISTRAR PAGO & ENVIAR NOTIFICACIÓN AL CLIENTE

```
┌─ Dueño visualiza trabajo ─────┐
│                               │
│ 1. Detalle trabajo (AUTO-001) │
│    Estado: "Terminado"        │
│    Pagado: false              │
│                               │
├─ Click "Registrar pago" ─────┤
│                               │
│ 2. Modal: Registrar pago      │
│    - Monto (pre-lleado)       │
│    - Método: Efectivo /       │
│      Transferencia / Tarjeta  │
│    - Referencia (opcional)    │
│                               │
├─ Click "Guardar" ────────────┤
│                               │
│ 3. Crear doc en /finanzas/    │
│    ingresos/                  │
│    - Monto, método, trabajo   │
│    - Auditar: quién registró  │
│                               │
├─ Click "Enviar a cliente" ───┤
│                               │
│ 4. Cloud Function dispara     │
│    WhatsApp Business API:     │
│                               │
│    "Hola Juan,               │
│     Tu vehículo ABC-123       │
│     ya está listo 🚗✅        │
│     Gracias por confiar en    │
│     PintuMaster"              │
│                               │
│ 5. Toast: "✅ Notificación    │
│    enviada"                   │
│                               │
│ 6. Trabajo → Estado "Pagado"  │
│    Cerrar modal               │
│                               │
└───────────────────────────────┘
```

**Tiempo**: 30 segundos  
**Notificación**: Automática a cliente vía WhatsApp  
**Auditoría**: Registrada en /auditoria/

---

## 🎬 FLUJO 4: REGISTRAR GASTO & DESCONTAR INVENTARIO

```
┌─ Dueño en Finanzas ─────┐
│                         │
│ 1. Click "Registrar     │
│    gasto"               │
│                         │
├─ Modal: Nuevo gasto ───┤
│                         │
│ 2. Formulario:          │
│    - Concepto           │
│    - Monto              │
│    - Categoría          │
│    - Descripción        │
│    - Producto           │
│      (si es compra)     │
│                         │
├─ Click "Guardar" ──────┤
│                         │
│ 3. Crear en /finanzas/  │
│    gastos/              │
│                         │
├─ SI PRODUCTO SELECCIONADO ─┤
│                            │
│ 4. Actualizar             │
│    /inventario/{prodId}   │
│    - Incrementar "compra" │
│    - fecha: ahora         │
│                            │
│ 5. Validar stock mínimo   │
│    - Si cantidad >=       │
│      stockMinimo:         │
│      Sin alerta          │
│    - Si cantidad <        │
│      stockMinimo:         │
│      Mostrar ⚠️ alerta   │
│                            │
│ 6. Toast: "✅ Gasto      │
│    registrado"            │
│                            │
└────────────────────────────┘
```

**Tiempo**: 1-2 minutos  
**Impacto**: Finanzas + Inventario actualizados

---

## 🎬 FLUJO 5: CIERRE DE CAJA SEMANAL (SÁBADOS)

```
┌─ Sábado 17:00 ────────────────┐
│                               │
│ 1. Usuario entra a app        │
│                               │
│ 2. Dashboard muestra:         │
│    "🔔 Cierre semanal         │
│     disponible hoy"           │
│    Botón rojo "Cerrar caja"   │
│                               │
├─ Click "Cerrar caja" ────────┤
│                               │
│ 3. Modal: Resumen semanal     │
│    - Ingresos totales         │
│    - Gastos totales           │
│    - Ganancia neta            │
│    - Trabajos realizados      │
│    - Top empleado             │
│    - Transacciones listadas   │
│                               │
├─ Click "Confirmar cierre" ───┤
│                               │
│ 4. Crear documento en         │
│    /cierres/{fecha}           │
│    Snapshot de finanzas       │
│    Auditar: quién cerró       │
│                               │
│ 5. Generar reporte de         │
│    comisiones de empleados    │
│    - Actualizar              │
│      comisionAcumulada       │
│                               │
│ 6. Toast: "✅ Cierre         │
│    completado"               │
│                               │
│ 7. Abre vista de PDF para    │
│    imprimir o compartir      │
│    (NO en v1, solo visual)   │
│                               │
└───────────────────────────────┘
```

**Tiempo**: 2-3 minutos  
**Frecuencia**: Semanal (sábado)  
**Datos**: Congelados para auditoría

---

## 🎬 FLUJO 6: EMPLEADO VE TRABAJO ASIGNADO

```
┌─ Empleado (Pedro García) ───────┐
│ recibe WhatsApp del dueño       │
│ con link de acceso a trabajo    │
│                                 │
│ 1. Abre link en navegador       │
│                                 │
├─ Sin autenticación ────────────┤
│                                 │
│ 2. Página pública muestra:      │
│    - Trabajo AUTO-001          │
│    - Cliente: Juan Pérez       │
│    - Vehículo: ABC-123         │
│    - Descripción del daño      │
│    - Fotos ANTES               │
│    - Estado actual             │
│    - Notas/comentarios         │
│                                 │
│ 3. Empleado puede:             │
│    - Ver fotos                 │
│    - Subir fotos DESPUÉS       │
│    - Dejar comentario          │
│    - Marcar "Yo termino esta   │
│      parte"                    │
│                                 │
├─ Click "Finalizar mi parte" ──┤
│                                 │
│ 4. Actualizar /trabajos/       │
│    empleadosAsignados[index]   │
│    .estado = "Terminado"       │
│                                 │
│ 5. Notificar dueño             │
│    Toast en la app del dueño   │
│                                 │
│ 6. Si todos empleados          │
│    terminaron:                 │
│    Trabajo → "Listo para      │
│    entrega"                    │
│                                 │
└─────────────────────────────────┘
```

**Tiempo**: 10-30 minutos (en el día)  
**Acceso**: Token único por trabajo (no login)  
**Notificación**: Dueño recibe update

---

## 🎬 FLUJO 7: VER PRODUCTIVIDAD DE EMPLEADO

```
┌─ Dueño en módulo Empleados ───┐
│                               │
│ 1. Ve lista de empleados:     │
│    - Pedro García (Latonero) │
│    - Luis López (Pintor)      │
│    - Carlos Rodríguez        │
│      (Pintor)                 │
│                               │
├─ Click en Pedro García ───────┤
│                               │
│ 2. Detalle empleado:          │
│    Estadísticas del período   │
│    - Trabajos esta semana: 3  │
│    - Trabajos este mes: 12    │
│    - Comisión acumulada mes:  │
│      $285,000                 │
│    - % productividad del taller│
│                               │
│ 3. Histórico de trabajos:     │
│    - AUTO-001 (Completado)   │
│    - AUTO-002 (Completado)   │
│    - AUTO-003 (En proceso)   │
│                               │
├─ Click en AUTO-001 ──────────┤
│                               │
│ 4. Ir a detalle de trabajo    │
│    Ver contribución de Pedro  │
│                               │
└───────────────────────────────┘
```

**Tiempo**: 1-2 minutos  
**Datos**: En tiempo real desde Firestore

---

## 🎬 FLUJO 8: GENERAR REPORTE DE GANANCIAS

```
┌─ Dueño en Reportes ───────────┐
│                               │
│ 1. Click "Reporte de         │
│    Ganancias"                 │
│                               │
├─ Selector de período ────────┤
│ Opciones: Hoy / Semana       │
│           Mes / Personalizado │
│                               │
│ 2. Selecciona: "Este mes"    │
│                               │
├─ Carga datos ────────────────┤
│                               │
│ 3. Muestra:                   │
│    - Gráfico línea:          │
│      Ganancias por día       │
│    - Total mes: $45,230,000  │
│    - Promedio diario:        │
│      $1,507,666              │
│    - Pico: día 15            │
│      $3,450,000              │
│                               │
│ 4. Tabla comparativa:        │
│    Ingresos vs Gastos        │
│    Mes anterior (- 12%)      │
│                               │
├─ Click "Compartir" ──────────┤
│                               │
│ 5. Opciones:                 │
│    - Copiar link PDF         │
│    - Enviar por email        │
│    - Guardar imagen          │
│                               │
└───────────────────────────────┘
```

**Tiempo**: 30 segundos  
**Frecuencia**: Acceso diario  
**Exportar**: No en v1 (solo visual)

---

## 🎬 FLUJO 9: ALERTA DE STOCK BAJO

```
┌─ Sistema detecta ──────────────┐
│ stock bajo en /inventario/     │
│                                │
│ Cada vez que cantidad <        │
│ stockMinimo:                   │
│                                │
├─ En Dashboard ────────────────┤
│                                │
│ 1. Tarjeta destaca:           │
│    "⚠️ Stock bajo"            │
│    - Pintura Roja: 1/2       │
│    - Thinner: 0.5/1.0        │
│                                │
├─ En módulo Inventario ────────┤
│                                │
│ 2. Insumo muestra badge rojo  │
│    "Reabastecer"             │
│                                │
├─ Click en insumo ─────────────┤
│                                │
│ 3. Modal: Comprar             │
│    - Cantidad: (input)        │
│    - Monto: auto-calcula     │
│    - Proveedor: sugerencia   │
│                                │
├─ Click "Comprar" ─────────────┤
│                                │
│ 4. Crear gasto automático:    │
│    /finanzas/gastos/          │
│    categoria: "Insumos"       │
│    monto: cantidad × unitario │
│                                │
│ 5. Actualizar inventario      │
│    cantidad += comprada       │
│    alertaActiva = false       │
│                                │
│ 6. Toast: "✅ Compra         │
│    registrada"                │
│                                │
└────────────────────────────────┘
```

**Trigger**: Automático  
**Acción**: Manual (dueño puede comprar o ignorar)

---

## 🎯 PUNTOS DE FRICCIÓN IDENTIFICADOS

| Flujo             | Fricción          | Solución                           |
| ----------------- | ----------------- | ---------------------------------- |
| 2 (Crear trabajo) | Upload foto lento | Compresión cliente antes de enviar |
| 3 (Pago)          | Error WhatsApp    | Reintentar button + fallback SMS   |
| 5 (Cierre)        | Muchos datos      | Resumen simplificado primero       |
| 6 (Empleado)      | Token expira      | QR dinámico + re-escanear          |
| 8 (Reportes)      | Carga lenta       | Cachear queries + lazy load        |

---

## ✅ MÉTRICAS DE ÉXITO POR FLUJO

| Flujo             | Métrica             | Target |
| ----------------- | ------------------- | ------ |
| 1 (Login)         | Tiempo              | < 2s   |
| 2 (Crear trabajo) | Pasos               | ≤ 7    |
| 3 (Pago)          | Tasa error          | < 5%   |
| 5 (Cierre)        | Precisión           | 100%   |
| 6 (Empleado)      | Disponibilidad link | 99.9%  |
| 8 (Reportes)      | Latencia carga      | < 1s   |
