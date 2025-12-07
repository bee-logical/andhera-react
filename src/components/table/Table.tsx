import React, { useState, useMemo } from 'react';

interface Column<T> {
  key: keyof T | string; // data field key
  header: string; // column header text
  sortable?: boolean; // enable sorting for column
  render?: (value: unknown, row: T) => React.ReactNode; // custom render function
  align?: 'left' | 'center' | 'right'; // cell alignment
  width?: string; // optional column width (e.g. "150px" or "20%")
}

interface TableProps<T> {
  data: T[]; // array of objects (table rows)
  columns: Column<T>[]; // column configuration
  caption?: string; // optional table caption text
  striped?: boolean; // alternate row background color
  bordered?: boolean; // show borders around cells
  hoverable?: boolean; // row hover effect
  highlightOnClick?: boolean; // highlight row when clicked
  showHeader?: boolean; // show/hide header row
  pagination?: boolean; // enable simple pagination
  pageSize?: number; // number of rows per page
  search?: boolean; // enable search filter
  noDataText?: string; // message when no data is found
  rounded?: boolean; // rounded corners for table
  shadow?: boolean; // apply shadow effect
  compact?: boolean; // smaller padding version
  onRowClick?: (row: T) => void; // callback when a row is clicked
  className?: string; // optional className for wrapper
}

function Table<T extends Record<string, unknown>>({
  data,
  columns,
  caption,
  striped = true,
  bordered = true,
  hoverable = true,
  highlightOnClick = false,
  showHeader = true,
  pagination = false,
  pageSize = 10,
  search = false,
  noDataText = 'No data available',
  rounded = true,
  shadow = true,
  compact = false,
  onRowClick,
  className = '',
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  // Sorting logic
  const sortedData = useMemo(() => {
    const sortableData = [...data];

    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof T];
        const bValue = b[sortConfig.key as keyof T];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableData;
  }, [data, sortConfig]);

  // Search filter logic
  const filteredData = useMemo(() => {
    if (!search || !searchTerm) return sortedData;

    return sortedData.filter((row) => {
      return Object.values(row).some((value) => {
        if (typeof value === 'string' || typeof value === 'number') {
          return value
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
        return false;
      });
    });
  }, [sortedData, searchTerm, search]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize, pagination]);

  // Handle sorting
  const handleSort = (key: keyof T | string) => {
    let direction: 'asc' | 'desc' = 'asc';

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

  // Handle row click
  const handleRowClick = (row: T, index: number) => {
    if (highlightOnClick) {
      setSelectedRowIndex(index);
    }
    if (onRowClick) {
      onRowClick(row);
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Get cell value
  const getCellValue = (row: T, column: Column<T>) => {
    const value = row[column.key as keyof T];
    if (column.render) {
      return column.render(value, row);
    }
    return value?.toString() || '';
  };

  // Alignment classes
  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  // Cell padding classes
  const cellPadding = compact ? 'px-2 py-1.5' : 'px-4 py-3';

  // Container classes
  const containerClasses = [
    'w-full',
    rounded ? 'rounded-lg' : '',
    shadow ? 'shadow-md' : '',
    'overflow-hidden',
    'bg-gray-800',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Table classes
  const tableClasses = [
    'min-w-full',
    'text-sm',
    'text-left',
    bordered ? 'border-collapse' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const displayData = pagination ? paginatedData : filteredData;

  return (
    <div className={containerClasses}>
      {/* Caption */}
      {caption && (
        <div className="px-4 py-3 bg-gray-700 border-b border-gray-600">
          <h3 className="text-lg font-semibold text-white">{caption}</h3>
        </div>
      )}

      {/* Search Input */}
      {search && (
        <div className="px-4 py-3 bg-gray-700 border-b border-gray-600">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFCB00] focus:border-transparent transition-all"
          />
        </div>
      )}

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className={tableClasses} role="table">
          {/* Header */}
          {showHeader && (
            <thead className="bg-gray-700 text-white">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`${cellPadding} font-semibold ${getAlignClass(
                      column.align
                    )} ${bordered ? 'border border-gray-600' : ''} ${
                      column.sortable ? 'cursor-pointer select-none' : ''
                    } transition-colors hover:bg-gray-600`}
                    style={{ width: column.width }}
                    onClick={() =>
                      column.sortable && handleSort(column.key as keyof T)
                    }
                  >
                    <div className="flex items-center gap-2">
                      <span>{column.header}</span>
                      {column.sortable && (
                        <span className="text-xs">
                          {sortConfig?.key === column.key ? (
                            sortConfig.direction === 'asc' ? (
                              <span className="text-[#FFCB00]">▲</span>
                            ) : (
                              <span className="text-[#FFCB00]">▼</span>
                            )
                          ) : (
                            <span className="text-gray-300">▲</span>
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          )}

          {/* Body */}
          <tbody>
            {displayData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className={`${cellPadding} text-center text-gray-300 ${
                    bordered ? 'border border-gray-600' : ''
                  }`}
                >
                  {noDataText}
                </td>
              </tr>
            ) : (
              displayData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`
                    ${striped && rowIndex % 2 === 1 ? 'bg-gray-700' : 'bg-gray-800'}
                    ${hoverable ? 'hover:bg-gray-600' : ''}
                    ${
                      selectedRowIndex === rowIndex
                        ? 'bg-gray-600 border-l-4 border-l-[#FFCB00]'
                        : ''
                    }
                    ${onRowClick || highlightOnClick ? 'cursor-pointer' : ''}
                    transition-all duration-200 ease-in-out
                  `}
                  onClick={() => handleRowClick(row, rowIndex)}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`${cellPadding} ${getAlignClass(
                        column.align
                      )} ${
                        bordered ? 'border border-gray-600' : ''
                      } text-white`}
                      style={{ width: column.width }}
                    >
                      {getCellValue(row, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && filteredData.length > 0 && (
        <div className="px-4 py-3 bg-gray-700 border-t border-gray-600 flex items-center justify-between">
          <div className="text-sm text-gray-300">
            Showing{' '}
            <span className="font-semibold">
              {(currentPage - 1) * pageSize + 1}
            </span>{' '}
            to{' '}
            <span className="font-semibold">
              {Math.min(currentPage * pageSize, filteredData.length)}
            </span>{' '}
            of <span className="font-semibold">{filteredData.length}</span>{' '}
            results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                currentPage === 1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-700 border border-gray-600 text-white hover:bg-gray-600'
              }`}
            >
              Previous
            </button>

            <span className="text-sm text-gray-300">
              Page{' '}
              <span className="font-semibold">
                {currentPage} of {totalPages}
              </span>
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                currentPage === totalPages
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-700 border border-gray-600 text-white hover:bg-gray-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;

/* ✅ USAGE EXAMPLES:

// 1. Simple Table
<Table 
  data={users} 
  columns={[
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' }
  ]}
/>

// 2. Table with Custom Render
<Table 
  data={products} 
  columns={[
    { key: 'name', header: 'Product', sortable: true },
    { 
      key: 'price', 
      header: 'Price', 
      sortable: true,
      render: (value) => `$${value.toFixed(2)}`,
      align: 'right'
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ]}
/>

// 3. Table with Pagination and Search
<Table 
  data={largeDataset} 
  columns={columns}
  caption="User Management"
  pagination
  pageSize={15}
  search
  striped
  hoverable
/>

// 4. Compact Table with Borders
<Table 
  data={items} 
  columns={columns}
  compact
  bordered
  rounded
  shadow
/>

// 5. Clickable Rows with Highlight
<Table 
  data={orders} 
  columns={columns}
  highlightOnClick
  onRowClick={(row) => console.log('Selected:', row)}
/>

// 6. Custom Width and Alignment
<Table 
  data={data} 
  columns={[
    { key: 'id', header: 'ID', width: '80px', align: 'center' },
    { key: 'name', header: 'Name', width: '40%', sortable: true },
    { key: 'value', header: 'Value', align: 'right', sortable: true }
  ]}
/>

*/
