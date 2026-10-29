// @vitest-environment jsdom
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, test } from 'vitest'
import { DataTable } from '../src/components/molecules/DataTable'

test('keeps hook order when loading resolves and rows become empty', async () => {
  const container = document.createElement('div')
  document.body.append(container)
  const root = createRoot(container)
  const columns = [{ key: 'name' as const, label: 'Nombre' }]
  try {
    await act(async () => root.render(<DataTable columns={columns} data={[]} isLoading />))
    await act(async () => root.render(<DataTable columns={columns} data={[{ name: 'Trabajo A' }]} />))
    expect(container.textContent).toContain('Trabajo A')
    await act(async () => root.render(<DataTable columns={columns} data={[]} />))
    expect(container.textContent).toContain('No hay datos disponibles')
  } finally {
    await act(async () => root.unmount())
    container.remove()
  }
})
