"use client";
import React, { useState } from 'react';
import FileUpload from './FileUpload';

const FileUploadDemo: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | undefined>(undefined);

  const handleFileChange = (files: File[]) => {
    console.log('Files selected:', files);
    setUploadedFiles(files);
  };

  const handleFileRemove = (fileName: string) => {
    console.log('File removed:', fileName);
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === undefined || prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(undefined), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const CustomUploadIcon = () => (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-blue-500"
    >
      <path
        d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 19V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 8L12 3L7 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            File Upload Component
          </h1>
          <p className="text-gray-600">
            Fully custom, dynamic, and reusable file upload with drag & drop support
          </p>
        </div>

        {/* Demo Sections */}
        <div className="space-y-12">
          {/* Basic Upload */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Basic Upload
            </h2>
            <p className="text-gray-600 mb-4">
              Simple file upload with default settings
            </p>
            <FileUpload
              label="Upload Document"
              dragDrop={false}
              onChange={handleFileChange}
              onRemove={handleFileRemove}
            />
          </section>

          {/* Multiple Files with Image Preview */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Multiple Images with Preview
            </h2>
            <p className="text-gray-600 mb-4">
              Upload multiple images and see instant previews
            </p>
            <FileUpload
              label="Upload Images"
              multiple={true}
              accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']}
              maxFileSize={10}
              showPreview={true}
              onChange={handleFileChange}
              onRemove={handleFileRemove}
            />
          </section>

          {/* PDF/Document Upload */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Document Upload (PDF Only)
            </h2>
            <p className="text-gray-600 mb-4">
              Restricted to PDF files with size limit
            </p>
            <FileUpload
              label="Upload PDF"
              accept={['application/pdf']}
              maxFileSize={5}
              placeholder="Click to upload PDF document"
              variant="dashed"
              onChange={handleFileChange}
              onRemove={handleFileRemove}
            />
          </section>

          {/* Drag & Drop Emphasis */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Drag & Drop Zone
            </h2>
            <p className="text-gray-600 mb-4">
              Enhanced drag and drop experience with visual feedback
            </p>
            <FileUpload
              label="Drop Files Here"
              multiple={true}
              variant="dragDrop"
              dragDrop={true}
              placeholder="Drag and drop your files here"
              onChange={handleFileChange}
              onRemove={handleFileRemove}
            />
          </section>

          {/* Custom Icon */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Custom Icon
            </h2>
            <p className="text-gray-600 mb-4">
              Use custom icon for upload area
            </p>
            <FileUpload
              label="Upload with Custom Icon"
              icon={<CustomUploadIcon />}
              variant="bordered"
              onChange={handleFileChange}
              onRemove={handleFileRemove}
            />
          </section>

          {/* Progress Bar */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Upload with Progress
            </h2>
            <p className="text-gray-600 mb-4">
              Simulate file upload with progress indicator
            </p>
            <FileUpload
              label="Upload File"
              progress={uploadProgress}
              onChange={(files) => {
                handleFileChange(files);
                simulateUpload();
              }}
              onRemove={handleFileRemove}
            />
          </section>

          {/* Disabled State */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Disabled State
            </h2>
            <p className="text-gray-600 mb-4">
              Upload field in disabled state
            </p>
            <FileUpload
              label="Disabled Upload"
              disabled={true}
              placeholder="Upload is currently disabled"
            />
          </section>

          {/* All Variants Side by Side */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              All Variants
            </h2>
            <p className="text-gray-600 mb-4">
              Compare different visual styles
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-gray-700 mb-2">Default</p>
                <FileUpload
                  variant="default"
                  placeholder="Default variant"
                  showFileList={false}
                />
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-2">Bordered</p>
                <FileUpload
                  variant="bordered"
                  placeholder="Bordered variant"
                  showFileList={false}
                />
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-2">Dashed</p>
                <FileUpload
                  variant="dashed"
                  placeholder="Dashed variant"
                  showFileList={false}
                />
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-2">Drag & Drop</p>
                <FileUpload
                  variant="dragDrop"
                  placeholder="Drag & drop variant"
                  showFileList={false}
                />
              </div>
            </div>
          </section>

          {/* Advanced: Multiple with Mixed Types */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Advanced: Mixed File Types
            </h2>
            <p className="text-gray-600 mb-4">
              Upload multiple files with different types (images, PDFs, documents)
            </p>
            <FileUpload
              label="Upload Multiple Files"
              multiple={true}
              accept={[
                'image/png',
                'image/jpeg',
                'image/jpg',
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              ]}
              maxFileSize={20}
              showPreview={true}
              variant="dragDrop"
              placeholder="Drop images, PDFs, or Word documents"
              onChange={handleFileChange}
              onRemove={handleFileRemove}
            />
          </section>

          {/* Summary */}
          {uploadedFiles.length > 0 && (
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Upload Summary
              </h3>
              <p className="text-blue-700 mb-2">
                Total files selected: <strong>{uploadedFiles.length}</strong>
              </p>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                {uploadedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Props Documentation */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Props Documentation
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prop
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Default
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">label</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Label text displayed above upload area</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">multiple</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">false</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Allow multiple file selection</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">accept</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string[]</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">[]</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Restrict file types (MIME types)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">maxFileSize</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Maximum allowed file size (in MB)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">showPreview</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">true</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Show image previews if files are images</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">showFileList</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">true</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Show file list after upload</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">placeholder</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                  <td className="px-6 py-4 text-sm text-gray-500">&quot;Click or drag...&quot;</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Custom placeholder text</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">icon</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ReactNode</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Optional icon element</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">progress</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Display progress percentage (0-100)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">onChange</td>
                  <td className="px-6 py-4 text-sm text-gray-500">(files: File[]) =&gt; void</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Callback when files are selected</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">onRemove</td>
                  <td className="px-6 py-4 text-sm text-gray-500">(fileName: string) =&gt; void</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Callback when a file is removed</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">variant</td>
                  <td className="px-6 py-4 text-sm text-gray-500">&quot;default&quot; | &quot;bordered&quot; | &quot;dashed&quot; | &quot;dragDrop&quot;</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">&quot;bordered&quot;</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Visual style variant</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">dragDrop</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">true</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Allow drag-and-drop file upload</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">disabled</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">false</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Disable upload field</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">className</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">&quot;&quot;</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Add custom className</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FileUploadDemo;
