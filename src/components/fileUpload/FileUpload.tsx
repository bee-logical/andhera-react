"use client";
/**
 * FileUpload Props
 *
 * label?: string                    // Label text displayed above upload area
 * multiple?: boolean                // Allow multiple file selection
 * accept?: string[]                 // Restrict file types (e.g., ['image/png', 'image/jpeg', 'application/pdf'])
 * maxFileSize?: number              // Maximum allowed file size (in MB)
 * showPreview?: boolean             // Show image previews if files are images
 * showFileList?: boolean            // Show file list after upload
 * placeholder?: string              // Optional custom placeholder text
 * icon?: React.ReactNode            // Optional icon element (e.g., UploadIcon)
 * progress?: number                 // Display progress percentage if uploading (0-100)
 * onChange?: (files: File[]) => void // Callback fired when files are selected
 * onRemove?: (fileName: string) => void // Callback fired when a single file is removed
 * variant?: "default" | "bordered" | "dashed" | "dragDrop" // Optional styling variants
 * dragDrop?: boolean                // Allow drag-and-drop file upload
 * disabled?: boolean                // Disable upload field
 * className?: string                // Add custom className
 */
import React, { useRef, useState, useEffect } from 'react';

export interface FileUploadProps {
  label?: string;
  multiple?: boolean;
  accept?: string[];
  maxFileSize?: number;
  showPreview?: boolean;
  showFileList?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  progress?: number;
  onChange?: (files: File[]) => void;
  onRemove?: (fileName: string) => void;
  variant?: "default" | "bordered" | "dashed" | "dragDrop";
  dragDrop?: boolean;
  disabled?: boolean;
  className?: string;
}

interface FileWithPreview {
  file: File;
  preview?: string;
}

const UploadIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-400"
  >
    <path
      d="M7 10L12 5L17 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 5V15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FileIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-500"
  >
    <path
      d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 2V9H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  multiple = false,
  accept = [],
  maxFileSize = 5,
  showPreview = true,
  showFileList = true,
  placeholder = "Click or drag files to upload",
  icon,
  progress,
  onChange,
  onRemove,
  variant = "bordered",
  dragDrop = true,
  disabled = false,
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach(({ preview }) => {
        if (preview) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [files]);

  const validateFile = (file: File): string | null => {
    // Validate file type
    if (accept.length > 0 && !accept.includes(file.type)) {
      return `File type ${file.type} is not allowed. Accepted types: ${accept.join(', ')}`;
    }

    // Validate file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxFileSize) {
      return `File size ${fileSizeInMB.toFixed(2)}MB exceeds maximum allowed size of ${maxFileSize}MB`;
    }

    return null;
  };

  const processFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const newFiles: FileWithPreview[] = [];
    let hasError = false;

    Array.from(fileList).forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        hasError = true;
        return;
      }

      const fileWithPreview: FileWithPreview = { file };

      // Generate preview for images
      if (showPreview && file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file);
      }

      newFiles.push(fileWithPreview);
    });

    if (!hasError) {
      setError('');
      const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
      setFiles(updatedFiles);

      if (onChange) {
        onChange(updatedFiles.map(f => f.file));
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const handleRemoveFile = (fileName: string) => {
    const fileToRemove = files.find(f => f.file.name === fileName);
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    const updatedFiles = files.filter(f => f.file.name !== fileName);
    setFiles(updatedFiles);

    if (onRemove) {
      onRemove(fileName);
    }

    if (onChange) {
      onChange(updatedFiles.map(f => f.file));
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && dragDrop) {
      setIsDragging(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!disabled && dragDrop) {
      processFiles(e.dataTransfer.files);
    }
  };

  // Variant-based styling
  const getVariantClasses = () => {
    const baseClasses = "flex flex-col items-center justify-center rounded-lg p-6 transition-all duration-200";
    
    if (disabled) {
      return `${baseClasses} opacity-50 cursor-not-allowed bg-gray-100 border-2 border-gray-200`;
    }

    const dragClasses = isDragging ? "border-blue-500 bg-blue-50" : "";

    switch (variant) {
      case "default":
        return `${baseClasses} cursor-pointer border border-gray-300 hover:border-gray-400 hover:bg-gray-50 ${dragClasses}`;
      case "bordered":
        return `${baseClasses} cursor-pointer border-2 border-gray-300 hover:border-blue-500 hover:bg-gray-50 ${dragClasses}`;
      case "dashed":
        return `${baseClasses} cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-50 ${dragClasses}`;
      case "dragDrop":
        return `${baseClasses} cursor-pointer border-2 border-dashed border-gray-400 hover:border-blue-500 hover:bg-blue-50 ${dragClasses}`;
      default:
        return `${baseClasses} cursor-pointer border-2 border-gray-300 hover:border-blue-500 hover:bg-gray-50 ${dragClasses}`;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && (
        <label htmlFor="file-upload" className="font-medium text-gray-700 text-sm">
          {label}
        </label>
      )}

      <div
        className={getVariantClasses()}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          multiple={multiple}
          accept={accept.join(',')}
          onChange={handleFileInputChange}
          disabled={disabled}
          className="hidden"
          aria-label="File upload input"
        />

        {icon || <UploadIcon />}

        <p className="mt-2 text-sm text-gray-600 text-center">
          {placeholder}
        </p>

        {dragDrop && (
          <p className="mt-1 text-xs text-gray-500">
            Drag and drop or click to browse
          </p>
        )}

        {accept.length > 0 && (
          <p className="mt-1 text-xs text-gray-400">
            Accepted: {accept.map(type => type.split('/')[1]).join(', ')}
          </p>
        )}

        <p className="mt-1 text-xs text-gray-400">
          Max size: {maxFileSize}MB
        </p>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
          {error}
        </div>
      )}

      {progress !== undefined && progress >= 0 && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {showFileList && files.length > 0 && (
        <div className="mt-3 space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Selected Files ({files.length})
          </p>
          {files.map(({ file, preview }) => (
            <div
              key={file.name}
              className="flex items-center justify-between bg-gray-100 rounded-md px-3 py-2 text-sm"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {preview ? (
                  <img
                    src={preview}
                    alt={file.name}
                    className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                  />
                ) : (
                  <div className="flex-shrink-0">
                    <FileIcon />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(file.name);
                }}
                className="ml-3 text-red-500 hover:text-red-700 transition flex-shrink-0"
                aria-label={`Remove ${file.name}`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
