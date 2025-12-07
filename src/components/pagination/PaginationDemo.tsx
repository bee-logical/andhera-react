"use client";

import React, { useState } from "react";
import Pagination from "./Pagination";

const PaginationDemo: React.FC = () => {
  // State for different demo scenarios
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [currentPage4, setCurrentPage4] = useState(1);
  const [currentPage5, setCurrentPage5] = useState(1);
  const [currentPage6, setCurrentPage6] = useState(1);
  const [currentPage7, setCurrentPage7] = useState(1);
  const [itemsPerPage1, setItemsPerPage1] = useState(10);

  return (
    <div className="p-8 space-y-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          Pagination Component Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          A fully dynamic, customizable, and accessible pagination component with
          multiple variants, shapes, sizes, and features.
        </p>

        {/* Demo 1: Basic Pagination */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              1. Basic Pagination
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Simple pagination with default settings
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <Pagination
              totalItems={250}
              itemsPerPage={10}
              currentPage={currentPage1}
              onPageChange={setCurrentPage1}
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Current Page: <strong>{currentPage1}</strong>
          </div>
        </section>

        {/* Demo 2: With First/Last Buttons */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              2. With First/Last Buttons
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pagination with first and last page navigation
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <Pagination
              totalItems={500}
              itemsPerPage={10}
              currentPage={currentPage2}
              onPageChange={setCurrentPage2}
              showFirstLastButtons
              variant="primary"
              color="blue"
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Current Page: <strong>{currentPage2}</strong>
          </div>
        </section>

        {/* Demo 3: With Page Size Selector */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              3. With Page Size Selector
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Allows users to change items per page dynamically
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <Pagination
              totalItems={350}
              itemsPerPage={itemsPerPage1}
              currentPage={currentPage3}
              onPageChange={setCurrentPage3}
              showPageSizeSelector
              onPageSizeChange={(newSize) => {
                setItemsPerPage1(newSize);
                setCurrentPage3(1);
              }}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              variant="outlined"
              color="green"
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Current Page: <strong>{currentPage3}</strong>, Items Per Page:{" "}
            <strong>{itemsPerPage1}</strong>
          </div>
        </section>

        {/* Demo 4: With Jump to Page */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              4. With Jump to Page
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Allows users to directly jump to a specific page
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <Pagination
              totalItems={1000}
              itemsPerPage={20}
              currentPage={currentPage4}
              onPageChange={setCurrentPage4}
              showFirstLastButtons
              showJumpToPage
              showPageInfo
              variant="secondary"
              color="purple"
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Current Page: <strong>{currentPage4}</strong>
          </div>
        </section>

        {/* Demo 5: Different Variants */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              5. Different Variants
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showcase of all available style variants
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Default Variant
              </h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <Pagination
                  totalItems={100}
                  itemsPerPage={10}
                  currentPage={currentPage5}
                  onPageChange={setCurrentPage5}
                  variant="default"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Primary Variant (Blue)
              </h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <Pagination
                  totalItems={100}
                  itemsPerPage={10}
                  currentPage={currentPage5}
                  onPageChange={setCurrentPage5}
                  variant="primary"
                  color="blue"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Primary Variant (Red)
              </h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <Pagination
                  totalItems={100}
                  itemsPerPage={10}
                  currentPage={currentPage5}
                  onPageChange={setCurrentPage5}
                  variant="primary"
                  color="red"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Outlined Variant
              </h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <Pagination
                  totalItems={100}
                  itemsPerPage={10}
                  currentPage={currentPage5}
                  onPageChange={setCurrentPage5}
                  variant="outlined"
                  color="orange"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Ghost Variant
              </h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <Pagination
                  totalItems={100}
                  itemsPerPage={10}
                  currentPage={currentPage5}
                  onPageChange={setCurrentPage5}
                  variant="ghost"
                  color="purple"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Demo 6: Different Shapes & Sizes */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              6. Different Shapes & Sizes
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showcase of different shapes and sizes
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Small Size - Square Shape
              </h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <Pagination
                  totalItems={100}
                  itemsPerPage={10}
                  currentPage={currentPage6}
                  onPageChange={setCurrentPage6}
                  variant="primary"
                  size="sm"
                  shape="square"
                  color="blue"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Medium Size - Rounded Shape
              </h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <Pagination
                  totalItems={100}
                  itemsPerPage={10}
                  currentPage={currentPage6}
                  onPageChange={setCurrentPage6}
                  variant="primary"
                  size="md"
                  shape="rounded"
                  color="green"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Large Size - Pill Shape
              </h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <Pagination
                  totalItems={100}
                  itemsPerPage={10}
                  currentPage={currentPage6}
                  onPageChange={setCurrentPage6}
                  variant="primary"
                  size="lg"
                  shape="pill"
                  color="purple"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Demo 7: Full Featured */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              7. Full Featured Pagination
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All features enabled: First/Last buttons, Page Size Selector, Jump to
              Page, and Page Info
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <Pagination
              totalItems={500}
              itemsPerPage={25}
              currentPage={currentPage7}
              onPageChange={setCurrentPage7}
              showFirstLastButtons
              showPageSizeSelector
              showJumpToPage
              showPageInfo
              maxVisiblePages={5}
              variant="primary"
              shape="pill"
              size="md"
              color="blue"
              align="center"
              onPageSizeChange={(newSize) => {
                console.log("Page size changed to:", newSize);
              }}
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Current Page: <strong>{currentPage7}</strong>
          </div>
        </section>

        {/* Demo 8: Compact Mode (Mobile) */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              8. Compact Mode (Mobile)
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Icons only, perfect for mobile devices
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <Pagination
              totalItems={200}
              itemsPerPage={10}
              currentPage={currentPage7}
              onPageChange={setCurrentPage7}
              showFirstLastButtons
              compact
              variant="primary"
              color="blue"
            />
          </div>
        </section>

        {/* Demo 9: Disabled State */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              9. Disabled State
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All interactions disabled
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <Pagination
              totalItems={200}
              itemsPerPage={10}
              currentPage={5}
              onPageChange={() => {}}
              showFirstLastButtons
              disabled
              variant="primary"
              color="gray"
            />
          </div>
        </section>

        {/* Demo 10: Different Alignments */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              10. Different Alignments
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Left, center, and right alignment options
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Left Aligned
              </h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <Pagination
                  totalItems={100}
                  itemsPerPage={10}
                  currentPage={3}
                  onPageChange={() => {}}
                  variant="primary"
                  align="left"
                  color="blue"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Center Aligned
              </h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <Pagination
                  totalItems={100}
                  itemsPerPage={10}
                  currentPage={3}
                  onPageChange={() => {}}
                  variant="primary"
                  align="center"
                  color="green"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Right Aligned
              </h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <Pagination
                  totalItems={100}
                  itemsPerPage={10}
                  currentPage={3}
                  onPageChange={() => {}}
                  variant="primary"
                  align="right"
                  color="purple"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaginationDemo;
