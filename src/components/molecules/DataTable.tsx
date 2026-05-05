import React, { useState, useMemo } from 'react'

export interface ColumnDef<T> {
  key: keyof T
  label: string
  sortable?: boolean
  width?: string
  mobileHidden?: boolean
  render?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  isLoading?: boolean
  emptyMessage?: string
  itemsPerPage?: number
  showPagination?: boolean
}

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps<any>>(
  function DataTable(
    {
      columns,
      data,
      onRowClick,
      isLoading = false,
      emptyMessage = 'No hay datos disponibles',
      itemsPerPage = 10,
      showPagination = true,
    },
    ref
  ) {
    const [sortKey, setSortKey] = useState<string | null>(null)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [currentPage, setCurrentPage] = useState(1)

    const sortedData = useMemo(() => {
      if (!sortKey) return data
      return [...data].sort((a, b) => {
        const aVal = a[sortKey as keyof typeof a]
        const bVal = b[sortKey as keyof typeof b]
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }, [data, sortKey, sortOrder])

    const paginatedData = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage
      return sortedData.slice(start, start + itemsPerPage)
    }, [sortedData, currentPage, itemsPerPage])

    const totalPages = Math.ceil(sortedData.length / itemsPerPage)

    const handleSort = (colKey: string) => {
      if (sortKey === colKey) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
      } else {
        setSortKey(colKey)
        setSortOrder('asc')
      }
      setCurrentPage(1)
    }

    const checkboxCol = columns.find((c) => c.label === '' && c.mobileHidden)
    const actionCols = columns.filter((c) => c.mobileHidden && c.label !== '')
    const visibleMobileCols = columns.filter((c) => !c.mobileHidden)

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
      )
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )
    }

    const pagination = showPagination && totalPages > 1 && (
      <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between gap-2">
          <p className="text-gray-600 text-xs whitespace-nowrap">
            {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedData.length)} de {sortedData.length}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50 text-xs"
            >
              Ant.
            </button>
            <span className="sm:hidden px-2 py-1 rounded border border-gray-300 text-xs text-gray-600">
              {currentPage}/{totalPages}
            </span>
            <div className="hidden sm:flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded text-xs ${
                    page === currentPage
                      ? 'bg-primary text-white'
                      : 'border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50 text-xs"
            >
              Sig.
            </button>
          </div>
        </div>
      </div>
    )

    return (
      <div ref={ref} className="rounded-lg border border-gray-200 bg-white">

        {/* MOBILE: Cards */}
        <div className="sm:hidden divide-y divide-gray-200">
          {paginatedData.map((row, idx) => (
            <div key={idx} className="p-4 flex gap-3 items-start">
              {checkboxCol && (
                <div className="pt-1 shrink-0">
                  {checkboxCol.render!(row[checkboxCol.key], row)}
                </div>
              )}
              <div
                className={`flex-1 min-w-0 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick?.(row)}
              >
                {visibleMobileCols.map((col) => (
                  <div key={String(col.key)} className="flex justify-between items-center py-1 gap-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide shrink-0">
                      {col.label}
                    </span>
                    <span className="text-sm text-gray-900 text-right">
                      {col.render
                        ? col.render(row[col.key as keyof typeof row], row)
                        : String(row[col.key as keyof typeof row] || '-')}
                    </span>
                  </div>
                ))}
              </div>
              {actionCols.length > 0 && (
                <div className="shrink-0 flex flex-col gap-1 pt-1">
                  {actionCols.map((col, i) => (
                    <div key={i}>
                      {col.render!(row[col.key as keyof typeof row], row)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* DESKTOP: Tabla */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={`${String(col.key)}-${i}`}
                    style={{ width: col.width }}
                    className={`px-6 py-3 text-left font-semibold text-gray-700 ${
                      col.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                    }`}
                    onClick={() => col.sortable && handleSort(String(col.key))}
                  >
                    <div className="flex items-center gap-2">
                      <span>{col.label}</span>
                      {col.sortable && sortKey === String(col.key) && (
                        <svg
                          className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 5a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, idx) => (
                <tr
                  key={idx}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-gray-200 transition-colors ${
                    onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
                  }`}
                >
                  {columns.map((col, i) => (
                    <td key={`${String(col.key)}-${i}`} className="px-6 py-4 text-gray-900">
                      {col.render
                        ? col.render(row[col.key as keyof typeof row], row)
                        : String(row[col.key as keyof typeof row] || '-')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination}
      </div>
    )
  }
)

DataTable.displayName = 'DataTable'
export default DataTable