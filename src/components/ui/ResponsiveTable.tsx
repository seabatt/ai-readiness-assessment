import React from 'react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
  mobileStackBreakpoint?: 'sm' | 'md' | 'lg';
}

export default function ResponsiveTable({ 
  columns, 
  data,
  mobileStackBreakpoint = 'md'
}: ResponsiveTableProps) {
  return (
    <>
      {/* Desktop Table */}
      <div className={`hidden ${mobileStackBreakpoint}:block overflow-x-auto`}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-bg-card-alt/20">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left py-4 px-4 text-sm font-semibold text-text-primary ${column.className || ''}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-bg-card-alt/10 hover:bg-bg-card-alt/5 transition-colors duration-200"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`py-4 px-4 text-sm text-text-secondary ${column.className || ''}`}
                  >
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards */}
      <div className={`${mobileStackBreakpoint}:hidden space-y-4`}>
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="bg-bg-card-alt/5 border border-bg-card-alt/10 rounded-lg p-4"
          >
            {columns.map((column) => (
              <div key={column.key} className="mb-3 last:mb-0">
                <div className="text-xs font-semibold text-text-tertiary mb-1">
                  {column.label}
                </div>
                <div className="text-sm text-text-secondary">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
