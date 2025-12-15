"use client";
/**
 * Enhanced FileUpload Component - A robust, feature-rich file uploader
 * 
 * CORE PROPS:
 * - label, multiple, accept, maxFileSize, minFileSize, maxFiles, disabled, name, value, defaultValue
 * 
 * DRAG & DROP:
 * - dragDrop, dragActiveClassName, dragRejectClassName, dragAcceptClassName
 * - onDragEnter, onDragLeave, onDragOver, onDrop
 * 
 * VALIDATION:
 * - allowDuplicates, allowedExtensions, disallowedExtensions, customValidator, maxTotalSize
 * 
 * PREVIEW:
 * - showPreview, showFileList, previewType, previewClassName, renderPreview
 * 
 * UPLOAD HANDLING:
 * - autoUpload, uploadUrl, method, headers, withCredentials, fieldName, timeout
 * - onUploadStart, onUploadProgress, onUploadSuccess, onUploadError
 * 
 * FILE MANIPULATION:
 * - allowReorder, allowDelete, allowReplace, onReorder, compressImage
 * 
 * STYLING:
 * - variant, color, size, className, dropzoneClassName, buttonClassName, iconClassName
 * 
 * EVENTS:
 * - onChange, onSelect, onRemove, onError, onMaxReached, onBeforeUpload
 * 
 * ACCESSIBILITY:
 * - ariaLabel, ariaDescription, ariaInvalid, inputProps
 */
import React, { useRef, useState, useEffect } from 'react';

export interface FileUploadProps {
  // Core Props
  label?: string;
  multiple?: boolean;
  accept?: string[];
  maxFileSize?: number; // in MB
  minFileSize?: number; // in MB
  maxFiles?: number;
  disabled?: boolean;
  name?: string;
  value?: File[];
  defaultValue?: File[];
  
  // Drag & Drop Props
  dragDrop?: boolean;
  dragActiveClassName?: string;
  dragRejectClassName?: string;
  dragAcceptClassName?: string;
  onDragEnter?: (event: React.DragEvent) => void;
  onDragLeave?: (event: React.DragEvent) => void;
  onDragOver?: (event: React.DragEvent) => void;
  onDrop?: (files: File[], event: React.DragEvent) => void;
  
  // Validation Props
  allowDuplicates?: boolean;
  allowedExtensions?: string[];
  disallowedExtensions?: string[];
  customValidator?: (file: File) => string | null;
  maxTotalSize?: number; // in MB
  
  // Preview Props
  showPreview?: boolean;
  showFileList?: boolean;
  previewType?: "image" | "icon" | "thumbnail";
  previewClassName?: string;
  renderPreview?: (file: File, index: number) => React.ReactNode;
  
  // Upload Handling Props
  autoUpload?: boolean;
  uploadUrl?: string;
  method?: "POST" | "PUT" | "PATCH";
  headers?: Record<string, string>;
  withCredentials?: boolean;
  fieldName?: string;
  timeout?: number;
  
  // File Manipulation Props
  allowReorder?: boolean;
  allowDelete?: boolean;
  allowReplace?: boolean;
  onReorder?: (files: File[]) => void;
  compressImage?: (file: File) => Promise<File>;
  
  // Styling Props
  variant?: "default" | "bordered" | "dashed" | "dragDrop" | "minimal" | "compact";
  color?: "primary" | "secondary" | "success" | "error" | "warning";
  size?: "small" | "medium" | "large";
  className?: string;
  dropzoneClassName?: string;
  buttonClassName?: string;
  iconClassName?: string;
  
  // UI Props
  placeholder?: string;
  icon?: React.ReactNode;
  uploadButtonLabel?: string;
  removeButtonLabel?: string;
  
  // Event Callbacks
  onChange?: (files: File[]) => void;
  onSelect?: (files: File[]) => void;
  onRemove?: (fileName: string) => void;
  onError?: (errors: string[]) => void;
  onMaxReached?: () => void;
  onBeforeUpload?: (file: File) => boolean | Promise<boolean>;
  onUploadStart?: (file: File) => void;
  onUploadProgress?: (file: File, percent: number) => void;
  onUploadSuccess?: (file: File, response: any) => void;
  onUploadError?: (file: File, error: Error) => void;
  
  // Accessibility Props
  ariaLabel?: string;
  ariaDescription?: string;
  ariaInvalid?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  
  // Advanced Props
  progress?: number;
  metadata?: Record<string, any>;
}

interface FileWithPreview {
  file: File;
  preview?: string;
  uploadProgress?: number;
  uploadStatus?: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
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
  // Core Props
  label,
  multiple = false,
  accept = [],
  maxFileSize = 5,
  minFileSize = 0,
  maxFiles,
  disabled = false,
  name,
  value,
  defaultValue,
  
  // Drag & Drop Props
  dragDrop = true,
  dragActiveClassName,
  dragRejectClassName,
  dragAcceptClassName,
  onDragEnter: onDragEnterProp,
  onDragLeave: onDragLeaveProp,
  onDragOver: onDragOverProp,
  onDrop: onDropProp,
  
  // Validation Props
  allowDuplicates = true,
  allowedExtensions = [],
  disallowedExtensions = [],
  customValidator,
  maxTotalSize,
  
  // Preview Props
  showPreview = true,
  showFileList = true,
  previewType = "image",
  previewClassName,
  renderPreview,
  
  // Upload Handling Props
  autoUpload = false,
  uploadUrl,
  method = "POST",
  headers = {},
  withCredentials = false,
  fieldName = "file",
  timeout = 30000,
  
  // File Manipulation Props
  allowReorder = false,
  allowDelete = true,
  allowReplace = false,
  onReorder,
  compressImage,
  
  // Styling Props
  variant = "bordered",
  color = "primary",
  size = "medium",
  className = '',
  dropzoneClassName,
  buttonClassName,
  iconClassName,
  
  // UI Props
  placeholder = "Click or drag files to upload",
  icon,
  uploadButtonLabel = "Upload",
  removeButtonLabel = "Remove",
  
  // Event Callbacks
  onChange,
  onSelect,
  onRemove,
  onError,
  onMaxReached,
  onBeforeUpload,
  onUploadStart,
  onUploadProgress,
  onUploadSuccess,
  onUploadError,
  
  // Accessibility Props
  ariaLabel,
  ariaDescription,
  ariaInvalid,
  inputProps,
  
  // Advanced Props
  progress,
  metadata,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [internalFiles, setInternalFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragReject, setIsDragReject] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  
  // Controlled vs Uncontrolled
  const isControlled = value !== undefined;
  const files = isControlled ? value.map(file => ({ file, uploadStatus: 'pending' as const })) : internalFiles;

  // Initialize with defaultValue
  useEffect(() => {
    if (defaultValue && !isControlled && internalFiles.length === 0) {
      const initialFiles = defaultValue.map(file => ({ 
        file, 
        uploadStatus: 'pending' as const 
      }));
      setInternalFiles(initialFiles);
    }
  }, [defaultValue, isControlled]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      internalFiles.forEach(({ preview }) => {
        if (preview) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [internalFiles]);

  const validateFile = (file: File): string | null => {
    // Custom validator takes precedence
    if (customValidator) {
      return customValidator(file);
    }

    // Check file type by accept array
    if (accept.length > 0 && !accept.includes(file.type)) {
      return `File type ${file.type} is not allowed. Accepted types: ${accept.join(', ')}`;
    }

    // Check allowed extensions
    if (allowedExtensions.length > 0) {
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (!fileExt || !allowedExtensions.includes(fileExt)) {
        return `File extension .${fileExt} is not allowed. Allowed: ${allowedExtensions.join(', ')}`;
      }
    }

    // Check disallowed extensions
    if (disallowedExtensions.length > 0) {
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (fileExt && disallowedExtensions.includes(fileExt)) {
        return `File extension .${fileExt} is not allowed`;
      }
    }

    // Validate file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxFileSize) {
      return `File size ${fileSizeInMB.toFixed(2)}MB exceeds maximum allowed size of ${maxFileSize}MB`;
    }

    if (minFileSize > 0 && fileSizeInMB < minFileSize) {
      return `File size ${fileSizeInMB.toFixed(2)}MB is below minimum required size of ${minFileSize}MB`;
    }

    // Check for duplicates
    if (!allowDuplicates) {
      const currentFiles = isControlled ? value || [] : internalFiles.map(f => f.file);
      if (currentFiles.some(f => f.name === file.name && f.size === file.size)) {
        return `Duplicate file: ${file.name} already exists`;
      }
    }

    return null;
  };

  const uploadFile = async (fileWithPreview: FileWithPreview) => {
    if (!uploadUrl) return;

    const { file } = fileWithPreview;

    // Check if upload should proceed
    if (onBeforeUpload) {
      const shouldUpload = await onBeforeUpload(file);
      if (!shouldUpload) return;
    }

    if (onUploadStart) {
      onUploadStart(file);
    }

    const formData = new FormData();
    formData.append(fieldName, file);

    // Add metadata if provided
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(uploadUrl, {
        method,
        headers,
        body: formData,
        credentials: withCredentials ? 'include' : 'same-origin',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (onUploadSuccess) {
        onUploadSuccess(file, data);
      }

      // Update file status
      updateFileStatus(file.name, 'success');
    } catch (error) {
      if (onUploadError) {
        onUploadError(file, error as Error);
      }
      updateFileStatus(file.name, 'error', (error as Error).message);
    }
  };

  const updateFileStatus = (fileName: string, status: FileWithPreview['uploadStatus'], error?: string) => {
    if (isControlled) return;
    
    setInternalFiles(prev => prev.map(f => 
      f.file.name === fileName 
        ? { ...f, uploadStatus: status, error }
        : f
    ));
  };

  const processFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const currentFiles = isControlled ? value || [] : internalFiles.map(f => f.file);
    const newErrors: string[] = [];
    const newFiles: FileWithPreview[] = [];

    // Check max files limit
    if (maxFiles && currentFiles.length + fileList.length > maxFiles) {
      const error = `Cannot add ${fileList.length} files. Maximum ${maxFiles} files allowed.`;
      newErrors.push(error);
      if (onMaxReached) {
        onMaxReached();
      }
      setErrors(newErrors);
      if (onError) {
        onError(newErrors);
      }
      return;
    }

    // Check max total size
    if (maxTotalSize) {
      const currentTotalSize = currentFiles.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024);
      const newTotalSize = Array.from(fileList).reduce((sum, f) => sum + f.size, 0) / (1024 * 1024);
      
      if (currentTotalSize + newTotalSize > maxTotalSize) {
        const error = `Total file size would exceed ${maxTotalSize}MB limit`;
        newErrors.push(error);
        setErrors(newErrors);
        if (onError) {
          onError(newErrors);
        }
        return;
      }
    }

    for (const file of Array.from(fileList)) {
      const validationError = validateFile(file);
      if (validationError) {
        newErrors.push(validationError);
        continue;
      }

      const fileWithPreview: FileWithPreview = { 
        file, 
        uploadStatus: 'pending' 
      };

      // Compress image if handler provided
      if (compressImage && file.type.startsWith('image/')) {
        try {
          fileWithPreview.file = await compressImage(file);
        } catch (error) {
          newErrors.push(`Failed to compress ${file.name}`);
          continue;
        }
      }

      // Generate preview for images
      if (showPreview && file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(fileWithPreview.file);
      }

      newFiles.push(fileWithPreview);
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      if (onError) {
        onError(newErrors);
      }
    } else {
      setErrors([]);
    }

    if (newFiles.length > 0) {
      const updatedFiles = multiple ? [...currentFiles, ...newFiles.map(f => f.file)] : newFiles.map(f => f.file);
      
      if (isControlled) {
        if (onChange) {
          onChange(updatedFiles);
        }
      } else {
        const updatedFilesWithPreview = multiple ? [...internalFiles, ...newFiles] : newFiles;
        setInternalFiles(updatedFilesWithPreview);
        
        if (onChange) {
          onChange(updatedFiles);
        }
      }

      if (onSelect) {
        onSelect(newFiles.map(f => f.file));
      }

      // Auto upload if enabled
      if (autoUpload && uploadUrl) {
        newFiles.forEach(fileWithPreview => {
          uploadFile(fileWithPreview);
        });
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const handleRemoveFile = (fileName: string) => {
    if (!allowDelete) return;

    if (isControlled) {
      const currentFiles = value || [];
      const updatedFiles = currentFiles.filter(f => f.name !== fileName);
      
      if (onChange) {
        onChange(updatedFiles);
      }
    } else {
      const fileToRemove = internalFiles.find(f => f.file.name === fileName);
      
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      const updatedInternalFiles = internalFiles.filter(f => f.file.name !== fileName);
      setInternalFiles(updatedInternalFiles);
      
      if (onChange) {
        onChange(updatedInternalFiles.map(f => f.file));
      }
    }

    if (onRemove) {
      onRemove(fileName);
    }
  };

  const handleReorderFiles = (startIndex: number, endIndex: number) => {
    if (!allowReorder) return;

    const currentFiles = isControlled ? value || [] : internalFiles.map(f => f.file);
    const reorderedFiles = Array.from(currentFiles);
    const [removed] = reorderedFiles.splice(startIndex, 1);
    reorderedFiles.splice(endIndex, 0, removed);

    if (isControlled) {
      if (onReorder) {
        onReorder(reorderedFiles);
      }
      if (onChange) {
        onChange(reorderedFiles);
      }
    } else {
      const reorderedWithPreview = reorderedFiles.map(file => {
        const existing = internalFiles.find(f => f.file.name === file.name);
        return existing || { file, uploadStatus: 'pending' as const };
      });
      setInternalFiles(reorderedWithPreview);
      
      if (onReorder) {
        onReorder(reorderedFiles);
      }
      if (onChange) {
        onChange(reorderedFiles);
      }
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
      
      // Check if dragged files are valid
      const items = e.dataTransfer.items;
      if (items && items.length > 0) {
        const hasInvalidType = Array.from(items).some(item => {
          if (accept.length > 0 && !accept.includes(item.type)) {
            return true;
          }
          return false;
        });
        setIsDragReject(hasInvalidType);
      }
      
      if (onDragEnterProp) {
        onDragEnterProp(e);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDragOverProp) {
      onDragOverProp(e);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setIsDragReject(false);
    if (onDragLeaveProp) {
      onDragLeaveProp(e);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setIsDragReject(false);

    if (!disabled && dragDrop) {
      processFiles(e.dataTransfer.files);
      
      if (onDropProp) {
        onDropProp(Array.from(e.dataTransfer.files), e);
      }
    }
  };

  // Get color classes
  const getColorClasses = () => {
    const colors = {
      primary: {
        border: 'border-[#FFCB00]',
        bg: 'bg-[]#FFCB00]',
        hover: 'hover:border-[#E6B800]',
        text: 'text-white',
      },
      secondary: {
        border: 'border-gray-500',
        bg: 'bg-gray-50',
        hover: 'hover:border-gray-600',
        text: 'text-gray-600',
      },
      success: {
        border: 'border-green-500',
        bg: 'bg-green-50',
        hover: 'hover:border-green-600',
        text: 'text-green-600',
      },
      error: {
        border: 'border-red-500',
        bg: 'bg-red-50',
        hover: 'hover:border-red-600',
        text: 'text-red-600',
      },
      warning: {
        border: 'border-yellow-500',
        bg: 'bg-yellow-50',
        hover: 'hover:border-yellow-600',
        text: 'text-yellow-600',
      },
    };
    return colors[color];
  };

  // Get size classes
  const getSizeClasses = () => {
    const sizes = {
      small: 'p-3 text-sm',
      medium: 'p-6 text-base',
      large: 'p-8 text-lg',
    };
    return sizes[size];
  };

  // Variant-based styling
  const getVariantClasses = () => {
    const baseClasses = "flex flex-col items-center justify-center rounded-lg transition-all duration-200";
    const sizeClasses = getSizeClasses();
    const colorClasses = getColorClasses();
    
    if (disabled) {
      return `${baseClasses} ${sizeClasses} opacity-50 cursor-not-allowed bg-gray-100 border-2 border-gray-200`;
    }

    let dragClasses = '';
    if (isDragging && !isDragReject) {
      dragClasses = dragActiveClassName || `${colorClasses.border} ${colorClasses.bg}`;
    } else if (isDragReject) {
      dragClasses = dragRejectClassName || "border-red-500 bg-red-50";
    }

    switch (variant) {
      case "default":
        return `${baseClasses} ${sizeClasses} cursor-pointer border border-gray-300 hover:border-gray-400 hover:bg-gray-50 ${dragClasses}`;
      case "bordered":
        return `${baseClasses} ${sizeClasses} cursor-pointer border-2 border-gray-300 ${colorClasses.hover} hover:bg-gray-50 ${dragClasses}`;
      case "dashed":
        return `${baseClasses} ${sizeClasses} cursor-pointer border-2 border-dashed border-gray-300 ${colorClasses.hover} hover:bg-gray-50 ${dragClasses}`;
      case "dragDrop":
        return `${baseClasses} ${sizeClasses} cursor-pointer border-2 border-dashed border-gray-400 ${colorClasses.hover} ${colorClasses.bg} ${dragClasses}`;
      case "minimal":
        return `${baseClasses} ${sizeClasses} cursor-pointer border border-gray-200 hover:bg-gray-50 ${dragClasses}`;
      case "compact":
        return `${baseClasses} p-4 text-sm cursor-pointer border border-gray-300 hover:border-gray-400 ${dragClasses}`;
      default:
        return `${baseClasses} ${sizeClasses} cursor-pointer border-2 border-gray-300 ${colorClasses.hover} hover:bg-gray-50 ${dragClasses}`;
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
        className={`${getVariantClasses()} ${dropzoneClassName || ''}`}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-label={ariaLabel || "File upload area"}
        aria-describedby={ariaDescription ? "file-upload-description" : undefined}
        aria-invalid={ariaInvalid || errors.length > 0}
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
          name={name}
          type="file"
          multiple={multiple}
          accept={accept.join(',')}
          onChange={handleFileInputChange}
          disabled={disabled}
          className="hidden"
          aria-label="File upload input"
          {...inputProps}
        />

        <div className={iconClassName}>
          {icon || <UploadIcon />}
        </div>

        <p className="mt-2 text-sm text-gray-600 text-center">
          {placeholder}
        </p>

        {ariaDescription && (
          <p id="file-upload-description" className="sr-only">
            {ariaDescription}
          </p>
        )}

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

        {allowedExtensions.length > 0 && (
          <p className="mt-1 text-xs text-gray-400">
            Allowed: {allowedExtensions.join(', ')}
          </p>
        )}

        <p className="mt-1 text-xs text-gray-400">
          Max size: {maxFileSize}MB {minFileSize > 0 && `| Min size: ${minFileSize}MB`}
        </p>

        {maxFiles && (
          <p className="mt-1 text-xs text-gray-400">
            Max files: {maxFiles} {files.length > 0 && `(${files.length} selected)`}
          </p>
        )}
      </div>

      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <div key={index} className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
              {error}
            </div>
          ))}
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
              className="h-2 bg-yellow-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {showFileList && files.length > 0 && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              Selected Files ({files.length})
            </p>
            {maxTotalSize && (
              <p className="text-xs text-gray-500">
                Total: {formatFileSize(files.reduce((sum, f) => sum + (f.file || f as any).size, 0))} / {maxTotalSize}MB
              </p>
            )}
          </div>
          {files.map((item, index) => {
            const isFileWithPreview = 'file' in item;
            const currentFile = isFileWithPreview ? item.file : item;
            const preview = isFileWithPreview && 'preview' in item ? item.preview : undefined;
            const uploadStatus = isFileWithPreview ? item.uploadStatus : undefined;
            const fileError = isFileWithPreview && 'error' in item ? item.error : undefined;
            const fileName = currentFile.name;
            const fileSize = currentFile.size;

            return (
              <div
                key={fileName}
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${
                  uploadStatus === 'error' ? 'bg-red-50 border border-red-200' :
                  uploadStatus === 'success' ? 'bg-green-50 border border-green-200' :
                  uploadStatus === 'uploading' ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-gray-100'
                }`}
                draggable={allowReorder}
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData('text/plain', index.toString());
                }}
                onDragOver={(e) => {
                  if (allowReorder) {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                  }
                }}
                onDrop={(e) => {
                  if (allowReorder) {
                    e.preventDefault();
                    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                    handleReorderFiles(fromIndex, index);
                  }
                }}
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {renderPreview ? (
                    renderPreview(currentFile, index)
                  ) : preview && previewType === "image" ? (
                    <img
                      src={preview}
                      alt={fileName}
                      className={`w-12 h-12 object-cover rounded-md flex-shrink-0 ${previewClassName || ''}`}
                    />
                  ) : previewType === "thumbnail" && preview ? (
                    <img
                      src={preview}
                      alt={fileName}
                      className={`w-8 h-8 object-cover rounded flex-shrink-0 ${previewClassName || ''}`}
                    />
                  ) : (
                    <div className="flex-shrink-0">
                      <FileIcon />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{fileName}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">{formatFileSize(fileSize)}</p>
                      {uploadStatus === 'success' && (
                        <span className="text-xs text-green-600 font-medium">✓ Uploaded</span>
                      )}
                      {uploadStatus === 'uploading' && (
                        <span className="text-xs text-yellow-600 font-medium">⏳ Uploading...</span>
                      )}
                      {uploadStatus === 'error' && (
                        <span className="text-xs text-red-600 font-medium">✗ Failed</span>
                      )}
                    </div>
                    {fileError && (
                      <p className="text-xs text-red-600 mt-1">{fileError}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  {allowReorder && (
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600 cursor-move flex-shrink-0"
                      aria-label="Drag to reorder"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5H15M9 12H15M9 19H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  )}
                  {allowDelete && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(fileName);
                      }}
                      className={`text-red-500 hover:text-red-700 transition flex-shrink-0 ${buttonClassName || ''}`}
                      aria-label={`${removeButtonLabel} ${fileName}`}
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
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
