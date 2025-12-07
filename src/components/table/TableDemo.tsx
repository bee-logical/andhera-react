'use client';

import React, { useState } from 'react';
import Table from './Table';
import { useMemo } from 'react';
import Pagination from '../pagination/Pagination';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

const TableDemo: React.FC = () => {
  // Sample Users Data
  const users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
      joinDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'active',
      joinDate: '2024-02-20',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Moderator',
      status: 'inactive',
      joinDate: '2024-03-10',
    },
    {
      id: 4,
      name: 'Alice Williams',
      email: 'alice@example.com',
      role: 'User',
      status: 'active',
      joinDate: '2024-04-05',
    },
    {
      id: 5,
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      role: 'User',
      status: 'active',
      joinDate: '2024-05-12',
    },
  ];

  // Sample Products Data
  const products: Product[] = [
    {
      id: 1,
      name: 'Laptop Pro',
      category: 'Electronics',
      price: 1299.99,
      stock: 45,
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      category: 'Accessories',
      price: 29.99,
      stock: 120,
      rating: 4.2,
    },
    {
      id: 3,
      name: 'USB-C Cable',
      category: 'Accessories',
      price: 12.99,
      stock: 200,
      rating: 4.8,
    },
    {
      id: 4,
      name: 'Monitor 27"',
      category: 'Electronics',
      price: 399.99,
      stock: 30,
      rating: 4.6,
    },
    {
      id: 5,
      name: 'Keyboard RGB',
      category: 'Accessories',
      price: 89.99,
      stock: 75,
      rating: 4.4,
    },
    {
      id: 6,
      name: 'Webcam HD',
      category: 'Electronics',
      price: 69.99,
      stock: 50,
      rating: 4.3,
    },
  ];

  // Large dataset for pagination demo
  const largeDataset = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'User', 'Moderator'][i % 3],
    status: (i % 3 === 0 ? 'active' : 'inactive') as 'active' | 'inactive',
    joinDate: `2024-${String(Math.floor(i / 4) + 1).padStart(2, '0')}-${String(
      (i % 28) + 1
    ).padStart(2, '0')}`,
  }));

  // User columns
  const userColumns = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      width: '80px',
      align: 'center' as const,
    },
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (value: unknown) => {
        const v = value as string;
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              v === 'Admin'
                ? 'bg-purple-100 text-purple-800'
                : v === 'Moderator'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {v}
          </span>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      align: 'center' as const,
      render: (value: unknown) => {
        const v = value as 'active' | 'inactive' | string;
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              v === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {v}
          </span>
        );
      },
    },
  ];

  // Product columns
  const productColumns = [
    {
      key: 'id',
      header: 'ID',
      width: '60px',
      align: 'center' as const,
    },
    {
      key: 'name',
      header: 'Product Name',
      sortable: true,
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
    },
    {
      key: 'price',
      header: 'Price',
      sortable: true,
      align: 'right' as const,
      render: (value: unknown) => {
        const v = value as number;
        return (
          <span className="font-semibold text-green-700">
            ${v.toFixed(2)}
          </span>
        );
      },
    },
    {
      key: 'stock',
      header: 'Stock',
      sortable: true,
      align: 'center' as const,
      render: (value: unknown) => {
        const v = value as number;
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              v > 100
                ? 'bg-green-100 text-green-800'
                : v > 50
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {v}
          </span>
        );
      },
    },
    {
      key: 'rating',
      header: 'Rating',
      sortable: true,
      align: 'center' as const,
      render: (value: unknown) => {
        const v = value as number;
        return (
          <span className="flex items-center justify-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold">{v.toFixed(1)}</span>
          </span>
        );
      },
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  // 🧮 2️⃣ Derived data for current page
  const totalItems = largeDataset.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return largeDataset.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  // ⚙️ 3️⃣ Pagination Handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newSize: number) => {
    setItemsPerPage(newSize);
    setCurrentPage(1); // reset to first page when size changes
  };

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Table Component Demo
        </h1>
        <p className="text-gray-600 mb-8">
          A fully custom, dynamic, and reusable Table component using Tailwind
          CSS
        </p>

        <div className="space-y-8">
          {/* 1. Basic Table */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              1️⃣ Basic Table
            </h2>
            <Table data={users as unknown as Record<string, unknown>[]} columns={userColumns} />
          </section>

          {/* 2. Table with Caption */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              2️⃣ Table with Caption
            </h2>
            <Table
              data={users as unknown as Record<string, unknown>[]}
              columns={userColumns}
              caption="User Management Dashboard"
            />
          </section>

          {/* 15. Table with Fixed Column Widths */}
<section className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-semibold text-gray-700 mb-4">
    1️⃣5️⃣ Table with Fixed Column Widths
  </h2>

  <Table
    data={[
      {
        id: 1,
        name: 'John Doe',
        age: 28,
        address:
          '123 Maple Street, Springfield, Illinois, 62704, United States',
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 34,
        address:
          '456 Oak Avenue, Apartment 12B, New York City, NY 10001, United States',
      },
      {
        id: 3,
        name: 'Alice Brown',
        age: 29,
        address:
          '789 Pine Road, Near Central Park, Los Angeles, California, 90001',
      },
    ]}
    columns={[
      {
        key: 'id',
        header: 'ID',
        width: '10%', // small column
        align: 'center' as const,
      },
      {
        key: 'name',
        header: 'Name',
        width: '20%', // medium column
      },
      {
        key: 'age',
        header: 'Age',
        width: '10%', // small column
        align: 'center' as const,
      },
      {
        key: 'address',
        header: 'Address',
        width: '60%', // wide column for long text
        render: (value: unknown) => (
          <span className="block text-gray-700 truncate max-w-full">
            {value as string}
          </span>
        ),
      },
    ]}
    caption="User Addresses (Fixed Column Widths)"
    bordered
    striped
  />
</section>


{/* 15. Table with Action Column */}
<section className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-semibold text-gray-700 mb-4">
    1️⃣5️⃣ Table with Action Column (Buttons & Dropdown)
  </h2>

  <Table
    data={users as unknown as Record<string, unknown>[]}
    columns={[
      {
        key: 'id',
        header: 'ID',
        width: '8%',
        align: 'center' as const,
      },
      {
        key: 'name',
        header: 'Name',
        width: '20%',
        sortable: true,
      },
      {
        key: 'email',
        header: 'Email',
        width: '25%',
        sortable: true,
      },
      {
        key: 'status',
        header: 'Status',
        width: '12%',
        render: (value: unknown) => {
          const v = value as 'active' | 'inactive';
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                v === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {v}
            </span>
          );
        },
      },
      {
        key: 'actions',
        header: 'Actions',
        width: '20%',
        align: 'center' as const,
        render: (_: unknown, row: Record<string, unknown>) => {
          return (
            <div className="flex items-center justify-center gap-2">
              {/* Edit button */}
              <button
                onClick={() => alert(`Editing ${row.name}`)}
                className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>

              {/* Delete button */}
              <button
                onClick={() => alert(`Deleting ${row.name}`)}
                className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
              >
                Delete
              </button>

              {/* Dropdown menu */}
              <div className="relative group">
                <button className="px-2 py-1 border rounded text-xs bg-gray-100 hover:bg-gray-200">
                  ⋮
                </button>
                <div className="absolute right-0 hidden group-hover:block bg-white border rounded shadow-lg w-32 mt-1 z-10">
                  <button
                    onClick={() => alert(`Viewing ${row.name}`)}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => alert(`Suspending ${row.name}`)}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-red-600"
                  >
                    Suspend
                  </button>
                </div>
              </div>
            </div>
          );
        },
      },
    ]}
    caption="User Actions Example"
    bordered
    striped
    hoverable
    shadow
  />
</section>


          {/* 3. Table with Search */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              3️⃣ Table with Search
            </h2>
            <Table data={users as unknown as Record<string, unknown>[]} columns={userColumns} search />
          </section>

          {/* 4. Compact Table */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              4️⃣ Compact Table
            </h2>
            <Table data={products as unknown as Record<string, unknown>[]} columns={productColumns} compact />
          </section>

          {/* 5. Table without Stripes */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              5️⃣ Table without Stripes
            </h2>
            <Table data={products as unknown as Record<string, unknown>[]} columns={productColumns} striped={false} />
          </section>

          {/* 6. Table without Borders */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              6️⃣ Table without Borders
            </h2>
            <Table data={products as unknown as Record<string, unknown>[]} columns={productColumns} bordered={false} />
          </section>

          {/* 7. Clickable Rows with Highlight */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              7️⃣ Clickable Rows with Highlight
            </h2>
            <Table
              data={users as unknown as Record<string, unknown>[]}
              columns={userColumns}
              highlightOnClick
              onRowClick={(row) => setSelectedUser(row as unknown as User)}
            />
            {selectedUser && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-blue-900">
                  Selected User:
                </p>
                <p className="text-sm text-blue-700">
                  {selectedUser.name} - {selectedUser.email}
                </p>
              </div>
            )}
          </section>

          {/* 8. Table with Pagination */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              8️⃣ Table with Pagination
            </h2>
            <Table
              data={largeDataset as unknown as Record<string, unknown>[]}
              columns={userColumns}
              pagination
              pageSize={7}
            />
          </section>

          {/* 9. Table with Pagination and Search */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              9️⃣ Table with Pagination and Search
            </h2>
            <Table
              data={largeDataset as unknown as Record<string, unknown>[]}
              columns={userColumns}
              caption="All Users"
              pagination
              pageSize={8}
              search
            />
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        8️⃣ Table with Custom Pagination Component
      </h2>

      {/* 🧾 Table with only the current page’s data */}
      <Table
        data={paginatedData as unknown as Record<string, unknown>[]}
        columns={userColumns}
        bordered
        striped
        hoverable
      />

      {/* 📄 Custom Pagination Component */}
      <div className="mt-4">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          showPageInfo
          showPageSizeSelector
          showFirstLastButtons
          showJumpToPage
          variant="outlined"
          
          color="red"
          shape="rounded"
          align="center"
        />
      </div>
      </section>

          {/* 10. Products Table with Custom Rendering */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              🔟 Products Table with Custom Rendering
            </h2>
            <Table
              data={products as unknown as Record<string, unknown>[]}
              columns={productColumns}
              caption="Product Inventory"
              search
            />
          </section>

          {/* 11. Empty State */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              1️⃣1️⃣ Empty State
            </h2>
            <Table
              data={[] as Record<string, unknown>[]}
              columns={userColumns}
              noDataText="No users found in the system"
            />
          </section>

          {/* 12. No Header Table */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              1️⃣2️⃣ Table without Header
            </h2>
            <Table
              data={users.slice(0, 3) as unknown as Record<string, unknown>[]}
              columns={userColumns}
              showHeader={false}
            />
          </section>

          {/* 13. All Features Combined */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              1️⃣3️⃣ All Features Combined
            </h2>
            <Table
              data={largeDataset as unknown as Record<string, unknown>[]}
              columns={userColumns}
              caption="Complete User Directory"
              striped
              bordered
              hoverable
              highlightOnClick
              pagination
              pageSize={12}
              search
              rounded
              shadow
              onRowClick={(row) => {
                const user = row as unknown as User;
                alert(`Clicked: ${user.name} (${user.email})`);
              }}
            />
          </section>

          {/* 14. Custom Styled Table */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              1️⃣4️⃣ Custom Styled Table (with className)
            </h2>
            <Table
              data={products as unknown as Record<string, unknown>[]}
              columns={productColumns}
              className="border-2 border-blue-500"
              rounded={false}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TableDemo;
