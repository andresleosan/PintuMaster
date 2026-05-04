# 📋 ALCANCE DEL PROYECTO — PINTUMASTER v1

**Versión:** 1.0  
**Fecha:** 3 de mayo de 2026  
**Responsable:** Jhon Cardona (Dueño PintuMaster)

---

## ✅ QUÉ SÍ CONSTRUIMOS EN v1

### Módulo 1: DASHBOARD ⭐

- Saludo personalizado ("Hola, Jhon. Bienvenido a PintuMaster")
- **Tarjetas de métricas**:
  - Ingresos del día (con % comparativo vs día anterior)
  - Trabajos activos
  - Trabajos terminados
- **Gráfico donut**: Ingresos / Gastos / Ganancia
- **Lista de trabajos recientes** (últimos 5 trabajos activos)
- **Accesos rápidos** (grid mobile 2x2 / botones desktop):
  - - Nuevo trabajo
  - Registrar gasto
  - Ver inventario
  - Ver reportes

### Módulo 2: GESTIÓN DE TRABAJOS ⭐

- **CRUD completo**: Crear, leer, actualizar, eliminar órdenes de trabajo
- **Campos por trabajo**:
  - Cliente: nombre + teléfono
  - Vehículo: placa + modelo
  - Tipo de trabajo: Latonería sobre pintura / Difuminado / Retoque / SPA / Combinado / Personalizado
  - Descripción del daño
  - Fotos antes (obligatorias al crear) y después (al finalizar)
  - Precio acordado (editable)
  - Empleado(s) asignado(s) (múltiples)
  - Estado: Pendiente / En proceso / Pintura / Terminado
  - Notas/comentarios (por empleados)
- **Acciones por trabajo**:
  - Editar
  - Subir fotos durante proceso
  - Marcar empleado(s) como "terminado" en su parte
  - Registrar pago
  - Enviar notificación WhatsApp (API Business)
  - Ver historial de cambios (auditoría)

### Módulo 3: FINANZAS ⭐ CRÍTICO

- **Registro de ingresos**: Por pago de cliente a trabajo
- **Registro de gastos**: Insumos, servicios, otros (con categoría)
- **Cálculo automático**: Ganancia = Ingresos - Gastos
- **Vistas de tiempo**: Hoy / Semana / Mes
- **Visualización**:
  - Tarjetas de resumen (Ingresos / Gastos / Ganancia)
  - Gráfico donut simple
  - Listado de transacciones (filtrable por tipo)
- **Cierre semanal**: Disponible los sábados
- **Integración de ingresos**: Detección automática de transferencias de Bancolombia y Nequi (manual en v1)

### Módulo 4: INVENTARIO

- **Categorías**: Pintura, lijas, thinner, masillas (configurable en Ajustes)
- **Campos por insumo**: Nombre, cantidad, unidad, stock mínimo
- **Acciones**:
  - Agregar insumo nuevo
  - Descontar uso (vinculable a un trabajo)
  - Registrar compra (genera gasto automático en Finanzas)
  - Ver stock actual
- **Alertas visuales**:
  - Stock bajo (por debajo de mínimo) — badge rojo
  - Alertar (no solo cuando está en rojo, sino ANTES)

### Módulo 5: EMPLEADOS

- **Datos por empleado**:
  - Nombre
  - Rol: Pintor / Latonero / Ambos
  - Porcentaje de comisión (configurable)
- **Vistas**:
  - Lista de empleados activos
  - Trabajos realizados (histórico)
  - Productividad (trabajos completados en período)
  - Comisión acumulada en período
- **Comisiones**:
  - Calculadas por trabajo individual (no % fijo)
  - Configurable por empleado

### Módulo 6: REPORTES

- **Reportes básicos** (visualización en pantalla, sin PDF):
  - Trabajos realizados por período (filtrable: día / semana / mes)
  - Ganancia acumulada por período
  - Empleado más productivo del período
  - Insumos más consumidos
  - Comparativa de ingresos (semana actual vs semana pasada)

### Módulo 7: AUTENTICACIÓN

- **Login simple**: Email + contraseña (Firebase Authentication)
- **Un solo rol en v1**: Dueño/Administrador
- **Acceso para empleados**: Solo ven trabajos asignados (sin login, con token único de sesión)

### Módulo 8: AJUSTES

- **Configuración del taller**:
  - Nombre, logo, datos de contacto
  - Categorías de inventario (crear, editar, eliminar)
  - Porcentajes de comisión por empleado
  - Horario de cierre semanal (default: sábado)
- **Datos del dueño**: Nombre, email

### Transversales: SEGURIDAD & UX

- **Auditoría de cambios**: Quién hizo qué, cuándo, en qué trabajo/finanza/inventario
- **Fotos**: Almacenadas en Firebase Storage (antes/después de trabajos)
- **Notificaciones WhatsApp**: API Business — enviar estado de trabajos a clientes
- **Integración Bancolombia/Nequi**: Registro manual de transferencias como ingresos
- **Buttons táctiles**: Grandes, accesibles con pulgar en mobile
- **Flujos cortos**: Máximo 3 pasos para acciones frecuentes
- **Badges de estado**: Consistentes en toda la app (colores del sistema de diseño)
- **Alertas visuales**: Trabajos atrasados, stock bajo

---

## ❌ QUÉ NO CONSTRUIMOS EN v1 (Futuro)

- ~~Firma digital del cliente~~
- ~~Roles múltiples (empleados con acceso propio a la app)~~
- ~~Notificaciones push~~
- ~~Integración con contabilidad externa~~
- ~~App nativa (iOS / Android)~~
- ~~Multi-taller~~
- ~~Generación de PDF de reportes~~
- ~~Integración de pagos en línea (Stripe, PayU)~~
- ~~Backup automático de fotos~~
- ~~Video de antes/después~~
- ~~QR para tracking de trabajos~~

---

## 📱 DISPOSITIVOS & FORMATOS

### Mobile-First

- Diseño debe verse perfecto en **celular primero** (360px mínimo)
- Desktop es mejora, no prioridad

### Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

---

## 🎯 CRITERIOS DE ÉXITO v1

- [x] Todas las vistas mockadas en HTML + CSS (Fase 1)
- [x] Componentes React tipados (Fase 2)
- [x] Firebase configurado y seguro (Fase 3)
- [x] 99.9% uptime objetivo
- [x] Auditoría completa de seguridad (checklist del PDF)
- [x] Funcionalidad 100% en mobile
- [x] Cero datos sensibles expuestos

---

## 📝 NOTAS IMPORTANTES

1. **Cambios de precio**: El precio acordado en un trabajo SÍ puede cambiar después de creado.
2. **Múltiples empleados**: Un trabajo SÍ puede tener latonero + pintor.
3. **Auditoría**: CRÍTICO registrar cambios (quién, qué, cuándo).
4. **Comisiones**: Se calculan por trabajo, no por porcentaje fijo.
5. **Cierre semanal**: Los sábados (no diario).
6. **WhatsApp**: API Business (no solo link directo).
7. **Datos de clientes**: Sin restricción de lectura, pero NO compartir en web pública.
