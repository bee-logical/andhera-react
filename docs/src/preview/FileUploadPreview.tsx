import { useState } from 'react';
import FileUpload from '../../../src/components/fileUpload/FileUpload';
import { Snackbar, SnackbarType } from '../../../src/components/snackbar';
import { Button } from '../../../src/components/button/buttons';

interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const propDefinitions: PropDefinition[] = [
  // Core Props
  { name: "label", type: "string", defaultValue: "-", description: "Label text displayed above the upload area." },
  { name: "multiple", type: "boolean", defaultValue: "false", description: "Allow multiple files to be selected." },
  { name: "accept", type: "string[]", defaultValue: "[]", description: "Array of accepted MIME types (e.g., ['image/png', 'image/jpeg'])." },
  { name: "maxFileSize", type: "number", defaultValue: "5", description: "Maximum file size in MB." },
  { name: "minFileSize", type: "number", defaultValue: "0", description: "Minimum file size in MB." },
  { name: "maxFiles", type: "number", defaultValue: "-", description: "Maximum number of files allowed." },
  { name: "maxTotalSize", type: "number", defaultValue: "-", description: "Maximum total size of all files in MB." },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "Disable the file upload input." },
  { name: "name", type: "string", defaultValue: "-", description: "Name attribute for the input element." },
  { name: "value", type: "File[]", defaultValue: "-", description: "Controlled value - array of File objects." },
  { name: "defaultValue", type: "File[]", defaultValue: "-", description: "Default uncontrolled value - array of File objects." },
  
  // Styling Props
  { name: "variant", type: "'default' | 'bordered' | 'dashed' | 'dragDrop' | 'minimal' | 'compact'", defaultValue: "'bordered'", description: "Visual style variant." },
  { name: "color", type: "'primary' | 'secondary' | 'success' | 'error' | 'warning'", defaultValue: "'primary'", description: "Color theme." },
  { name: "size", type: "'small' | 'medium' | 'large'", defaultValue: "'medium'", description: "Size variant." },
  { name: "className", type: "string", defaultValue: "''", description: "Custom class name for root element." },
  { name: "dropzoneClassName", type: "string", defaultValue: "-", description: "Custom class name for dropzone element." },
  { name: "buttonClassName", type: "string", defaultValue: "-", description: "Custom class name for buttons." },
  { name: "iconClassName", type: "string", defaultValue: "-", description: "Custom class name for icons." },
  { name: "previewClassName", type: "string", defaultValue: "-", description: "Custom class name for preview container." },
  
  // UI Props
  { name: "placeholder", type: "string", defaultValue: "'Click or drag files to upload'", description: "Placeholder text displayed in the upload area." },
  { name: "icon", type: "React.ReactNode", defaultValue: "-", description: "Custom icon element." },
  { name: "uploadButtonLabel", type: "string", defaultValue: "'Upload'", description: "Label text for upload button." },
  { name: "removeButtonLabel", type: "string", defaultValue: "'Remove'", description: "Label text for remove button." },
  
  // Drag & Drop Props
  { name: "dragDrop", type: "boolean", defaultValue: "true", description: "Enable drag and drop functionality." },
  { name: "dragActiveClassName", type: "string", defaultValue: "-", description: "Custom class applied when dragging over drop zone." },
  { name: "dragRejectClassName", type: "string", defaultValue: "-", description: "Custom class applied when dragging invalid files." },
  { name: "dragAcceptClassName", type: "string", defaultValue: "-", description: "Custom class applied when dragging valid files." },
  { name: "onDragEnter", type: "(event: React.DragEvent) => void", defaultValue: "-", description: "Callback fired when drag enters the drop zone." },
  { name: "onDragLeave", type: "(event: React.DragEvent) => void", defaultValue: "-", description: "Callback fired when drag leaves the drop zone." },
  { name: "onDragOver", type: "(event: React.DragEvent) => void", defaultValue: "-", description: "Callback fired when dragging over the drop zone." },
  { name: "onDrop", type: "(files: File[], event: React.DragEvent) => void", defaultValue: "-", description: "Callback fired when files are dropped." },
  
  // Validation Props
  { name: "allowDuplicates", type: "boolean", defaultValue: "true", description: "Allow duplicate files to be uploaded." },
  { name: "allowedExtensions", type: "string[]", defaultValue: "[]", description: "Array of allowed file extensions (e.g., ['png', 'jpg'])." },
  { name: "disallowedExtensions", type: "string[]", defaultValue: "[]", description: "Array of disallowed file extensions." },
  { name: "customValidator", type: "(file: File) => string | null", defaultValue: "-", description: "Custom validation function - return error message or null." },
  
  // Preview Props
  { name: "showPreview", type: "boolean", defaultValue: "true", description: "Show file preview thumbnails." },
  { name: "showFileList", type: "boolean", defaultValue: "true", description: "Show list of selected files." },
  { name: "previewType", type: "'image' | 'icon' | 'thumbnail'", defaultValue: "'image'", description: "Type of preview to display." },
  { name: "renderPreview", type: "(file: File, index: number) => React.ReactNode", defaultValue: "-", description: "Custom render function for file preview." },
  
  // File Manipulation Props
  { name: "allowReorder", type: "boolean", defaultValue: "false", description: "Allow files to be reordered via drag." },
  { name: "allowDelete", type: "boolean", defaultValue: "true", description: "Allow files to be deleted." },
  { name: "allowReplace", type: "boolean", defaultValue: "false", description: "Allow files to be replaced." },
  { name: "onReorder", type: "(files: File[]) => void", defaultValue: "-", description: "Callback fired when files are reordered." },
  { name: "compressImage", type: "(file: File) => Promise<File>", defaultValue: "-", description: "Custom image compression function." },
  
  // Upload Handling Props
  { name: "autoUpload", type: "boolean", defaultValue: "false", description: "Automatically upload files after selection." },
  { name: "uploadUrl", type: "string", defaultValue: "-", description: "URL endpoint for file upload." },
  { name: "method", type: "'POST' | 'PUT' | 'PATCH'", defaultValue: "'POST'", description: "HTTP method for upload request." },
  { name: "headers", type: "Record<string, string>", defaultValue: "{}", description: "Custom headers for upload request." },
  { name: "withCredentials", type: "boolean", defaultValue: "false", description: "Include credentials in upload request." },
  { name: "fieldName", type: "string", defaultValue: "'file'", description: "Form field name for file upload." },
  { name: "timeout", type: "number", defaultValue: "30000", description: "Upload request timeout in milliseconds." },
  { name: "metadata", type: "Record<string, any>", defaultValue: "-", description: "Custom metadata to send with upload." },
  
  // Event Callbacks
  { name: "onChange", type: "(files: File[]) => void", defaultValue: "-", description: "Callback fired when file selection changes." },
  { name: "onSelect", type: "(files: File[]) => void", defaultValue: "-", description: "Callback fired when files are selected." },
  { name: "onRemove", type: "(fileName: string) => void", defaultValue: "-", description: "Callback fired when a file is removed." },
  { name: "onError", type: "(errors: string[]) => void", defaultValue: "-", description: "Callback fired when validation errors occur." },
  { name: "onMaxReached", type: "() => void", defaultValue: "-", description: "Callback fired when max file limit is reached." },
  { name: "onBeforeUpload", type: "(file: File) => boolean | Promise<boolean>", defaultValue: "-", description: "Callback fired before upload - return false to cancel." },
  { name: "onUploadStart", type: "(file: File) => void", defaultValue: "-", description: "Callback fired when file upload starts." },
  { name: "onUploadProgress", type: "(file: File, percent: number) => void", defaultValue: "-", description: "Callback fired during upload progress." },
  { name: "onUploadSuccess", type: "(file: File, response: any) => void", defaultValue: "-", description: "Callback fired when upload succeeds." },
  { name: "onUploadError", type: "(file: File, error: Error) => void", defaultValue: "-", description: "Callback fired when upload fails." },
  
  // Accessibility Props
  { name: "ariaLabel", type: "string", defaultValue: "-", description: "ARIA label for the file input." },
  { name: "ariaDescription", type: "string", defaultValue: "-", description: "ARIA description for the file input." },
  { name: "ariaInvalid", type: "boolean", defaultValue: "-", description: "ARIA invalid state." },
  { name: "inputProps", type: "React.InputHTMLAttributes<HTMLInputElement>", defaultValue: "-", description: "Additional props passed to the input element." },
  
  // Advanced Props
  { name: "progress", type: "number", defaultValue: "-", description: "Upload progress percentage (0-100)." },
];

/**
 * FileUploadPreview Component
 * Displays all FileUpload variants in separate cards matching the design pattern
 */
export function FileUploadPreview() {
  const [files1, setFiles1] = useState<File[]>([]);
  const [files2, setFiles2] = useState<File[]>([]);
  const [files3, setFiles3] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; type: SnackbarType }>({ 
    open: false, 
    message: '', 
    type: 'info' 
  });

  const showNotification = (message: string, type: SnackbarType = 'info') => {
    setSnackbar({ open: true, message, type });
  };

  // Custom upload icon component
  const CustomUploadIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-[#FFCB00]">
      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="17,8 12,3 7,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Custom file preview renderer
  const renderCustomPreview = (file: File, index: number) => (
    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFCB00] to-yellow-600 text-white font-bold text-xs">
      {file.name.split('.').pop()?.toUpperCase() || 'FILE'}
    </div>
  );

  // Simulated image compression function
  const compressImageHandler = async (file: File): Promise<File> => {
    // In real usage, you'd use a library like browser-image-compression
    // This is a simulation that returns the same file after a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        showNotification(`Compressed: ${file.name}`, 'success');
        resolve(file);
      }, 500);
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full md:gap-11">
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        duration={3000}
        position="bottom-right"
        portal={true}
      />

      {/* 1. Basic Variants */}
      <PreviewCard
        title="Basic Variants"
        description="FileUpload supports multiple visual styles to fit different design contexts. Choose from default, bordered, dashed, dragDrop, minimal, or compact variants.

Variant: 'default' | 'bordered' | 'dashed' | 'dragDrop' | 'minimal' | 'compact'"
        code={`<FileUpload variant="default" label="Default" />
<FileUpload variant="bordered" label="Bordered" />
<FileUpload variant="dashed" label="Dashed" />
<FileUpload variant="dragDrop" label="Drag & Drop" />
<FileUpload variant="minimal" label="Minimal" />
<FileUpload variant="compact" label="Compact" />`}
      >
        <div className="flex flex-col gap-4 w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUpload variant="default" label="Default" />
            <FileUpload variant="bordered" label="Bordered" />
            <FileUpload variant="dashed" label="Dashed" />
            <FileUpload variant="dragDrop" label="Drag & Drop" dragDrop={true} />
            <FileUpload variant="minimal" label="Minimal" />
            <FileUpload variant="compact" label="Compact" />
          </div>
        </div>
      </PreviewCard>

      {/* 2. Color Variants */}
      <PreviewCard
        title="Color Variants"
        description="Apply different color themes to match your brand or indicate different upload contexts. Available colors include primary, secondary, success, error, and warning.

Color: 'primary' | 'secondary' | 'success' | 'error' | 'warning'"
        code={`<FileUpload color="primary" variant="bordered" label="Primary" />
<FileUpload color="secondary" variant="bordered" label="Secondary" />
<FileUpload color="success" variant="bordered" label="Success" />
<FileUpload color="error" variant="bordered" label="Error" />
<FileUpload color="warning" variant="bordered" label="Warning" />`}
      >
        <div className="flex flex-wrap gap-4 justify-center w-full">
          <FileUpload color="primary" variant="bordered" label="Primary" />
          <FileUpload color="secondary" variant="bordered" label="Secondary" />
          <FileUpload color="success" variant="bordered" label="Success" />
          <FileUpload color="error" variant="bordered" label="Error" />
          <FileUpload color="warning" variant="bordered" label="Warning" />
        </div>
      </PreviewCard>

      {/* 3. Size Variants */}
      <PreviewCard
        title="Size Variants"
        description="Control the size of the upload area with small, medium, or large options. Choose the size that best fits your layout and emphasizes the importance of the upload action.

Size: 'small' | 'medium' | 'large'"
        code={`<FileUpload size="small" variant="bordered" label="Small" />
<FileUpload size="medium" variant="bordered" label="Medium (Default)" />
<FileUpload size="large" variant="bordered" label="Large" />`}
      >
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <FileUpload size="small" variant="bordered" label="Small" />
          <FileUpload size="medium" variant="bordered" label="Medium (Default)" />
          <FileUpload size="large" variant="bordered" label="Large" />
        </div>
      </PreviewCard>

      {/* 4. File Type Restrictions */}
      <PreviewCard
        title="File Type Restrictions"
        description="Restrict uploads to specific file types using MIME types or file extensions. This ensures users only upload acceptable formats for your application.

accept?: string[] (MIME types)
allowedExtensions?: string[]
disallowedExtensions?: string[]"
        code={`<FileUpload 
  accept={['image/png', 'image/jpeg']} 
  label="Images Only" 
  showPreview={true} 
/>
<FileUpload 
  accept={['application/pdf']} 
  label="PDFs Only" 
/>
<FileUpload 
  allowedExtensions={['jpg', 'png', 'pdf']} 
  label="Allowed Extensions" 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUpload
              label="Images Only"
              accept={['image/png', 'image/jpeg', 'image/jpg']}
              showPreview={true}
              variant="dashed"
            />
            <FileUpload
              label="PDFs Only"
              accept={['application/pdf']}
              variant="dashed"
            />
          </div>
        </div>
      </PreviewCard>

      {/* 5. File Size & Count Restrictions */}
      <PreviewCard
        title="File Size & Count Restrictions"
        description="Set minimum and maximum file sizes, limit the number of files, or restrict total upload size. These validations help manage bandwidth and storage requirements.

maxFileSize?: number (MB)
minFileSize?: number (MB)
maxFiles?: number
maxTotalSize?: number (MB)"
        code={`<FileUpload 
  maxFileSize={2} 
  label="Max 2MB per file" 
/>
<FileUpload 
  minFileSize={0.5} 
  maxFileSize={10} 
  label="Min 0.5MB, Max 10MB" 
/>
<FileUpload 
  multiple={true} 
  maxFiles={3} 
  showFileList={true} 
  label="Max 3 Files" 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUpload
              label="Max 2MB per file"
              maxFileSize={2}
              variant="bordered"
            />
            <FileUpload
              label="Multiple Files (Max 3)"
              multiple={true}
              maxFiles={3}
              showFileList={true}
              variant="bordered"
              onMaxReached={() => alert('Maximum files reached!')}
            />
          </div>
        </div>
      </PreviewCard>

      {/* 6. Preview Variations */}
      <PreviewCard
        title="Preview Variations"
        description="Show image previews, thumbnails, or use custom renderers. Previews give users visual feedback about their uploaded files before submission.

showPreview?: boolean
previewType?: 'image' | 'icon' | 'thumbnail'
renderPreview?: (file: File, index: number) => ReactNode"
        code={`<FileUpload 
  accept={['image/*']} 
  showPreview={true} 
  previewType="image" 
  multiple={true} 
  showFileList={true} 
  label="Image Preview" 
/>
<FileUpload 
  showPreview={true} 
  previewType="thumbnail" 
  multiple={true} 
  showFileList={true} 
  label="Thumbnail Preview" 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-5xl">
          <FileUpload
            label="Image Preview with File List"
            accept={['image/*']}
            showPreview={true}
            previewType="image"
            multiple={true}
            variant="bordered"
            showFileList={true}
          />
        </div>
      </PreviewCard>

      {/* 7. File Manipulation & Drag-Drop */}
      <PreviewCard
        title="File Manipulation & Drag-Drop"
        description="Enable file reordering, control delete permissions, and customize drag-drop interactions. These features enhance the user experience for managing multiple files.

allowReorder?: boolean
allowDelete?: boolean
dragDrop?: boolean
dragActiveClassName?: string
dragRejectClassName?: string"
        code={`<FileUpload 
  multiple={true} 
  allowReorder={true} 
  showFileList={true} 
  label="Reorderable Files" 
  onReorder={(files) => console.log('Reordered:', files)} 
/>
<FileUpload 
  variant="dashed" 
  dragDrop={true} 
  dragActiveClassName="border-green-500 bg-green-50" 
  dragRejectClassName="border-red-500 bg-red-50" 
  label="Custom Drag Styling" 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-5xl">
          <FileUpload
            label="Reorderable Files (Drag to Reorder)"
            multiple={true}
            allowReorder={true}
            showFileList={true}
            variant="bordered"
            onReorder={(files) => console.log('Reordered:', files)}
          />
        </div>
      </PreviewCard>

      {/* 8. Controlled Component */}
      <PreviewCard
        title="Controlled Component"
        description="Control the file list state externally for form integration or complex state management. Controlled components give you full programmatic control over uploads.

value?: File[]
onChange?: (files: File[]) => void"
        code={`const [files, setFiles] = useState<File[]>([]);

<FileUpload 
  value={files} 
  onChange={setFiles} 
  multiple={true} 
  showFileList={true} 
  label="Controlled Upload" 
/>
<Button variant="destructive" onClick={() => setFiles([])}>Clear All</Button>
<Button variant="primary" onClick={() => console.log(files.length)}>Show Count</Button>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <FileUpload
            label="Controlled Upload"
            value={files1}
            onChange={setFiles1}
            multiple={true}
            showFileList={true}
            variant="bordered"
          />
          <div className="flex gap-2 flex-wrap">
            <Button variant="destructive" onClick={() => setFiles1([])}>Clear All</Button>
            <Button variant="primary" onClick={() => showNotification(`${files1.length} files selected`, 'info')}>
              Show Count ({files1.length})
            </Button>
          </div>
        </div>
      </PreviewCard>

      {/* 9. Custom Validation */}
      <PreviewCard
        title="Custom Validation"
        description="Implement custom validation logic beyond standard file type and size checks. This allows you to enforce business rules specific to your application.

customValidator?: (file: File) => string | null"
        code={`<FileUpload 
  customValidator={(file) => {
    if (file.name.length > 100) {
      return 'Filename is too long';
    }
    if (file.name.includes('draft')) {
      return 'Draft files not allowed';
    }
    return null;
  }} 
  label="Custom Validation" 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <FileUpload
            label="Custom Validator (No 'draft' in filename)"
            variant="bordered"
            showFileList={true}
            customValidator={(file) => {
              if (file.name.toLowerCase().includes('draft')) {
                return 'Please upload final version, not drafts';
              }
              if (file.name.length > 100) {
                return 'Filename is too long (max 100 characters)';
              }
              return null;
            }}
          />
        </div>
      </PreviewCard>

      {/* 10. Real-World Examples */}
      <PreviewCard
        title="Real-World Examples"
        description="Common use cases demonstrating complete configurations for profile pictures, documents, photo galleries, and resume uploads."
        code={`// Profile Picture
<FileUpload 
  accept={['image/png', 'image/jpeg']} 
  maxFileSize={2} 
  showPreview={true} 
  label="Profile Picture" 
/>

// Document Upload
<FileUpload 
  accept={['application/pdf']} 
  multiple={true} 
  maxFiles={5} 
  showFileList={true} 
  label="Documents" 
/>

// Photo Gallery
<FileUpload 
  accept={['image/*']} 
  multiple={true} 
  maxFiles={10} 
  allowReorder={true} 
  showPreview={true} 
  showFileList={true} 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUpload
              label="Profile Picture"
              accept={['image/png', 'image/jpeg', 'image/jpg']}
              maxFileSize={2}
              multiple={false}
              showPreview={true}
              variant="bordered"
              color="primary"
            />
            <FileUpload
              label="Resume Upload"
              allowedExtensions={['pdf', 'doc', 'docx']}
              maxFileSize={5}
              multiple={false}
              variant="bordered"
              color="secondary"
            />
          </div>
        </div>
      </PreviewCard>

      {/* 11. Complete Feature Demo */}
      <PreviewCard
        title="All Features Combined"
        description="A comprehensive example showcasing multiple features: file limits, size restrictions, reordering, previews, validation, and controlled state management."
        code={`<FileUpload 
  variant="dashed" 
  color="primary" 
  size="large" 
  multiple={true} 
  maxFiles={10} 
  maxFileSize={20} 
  maxTotalSize={100} 
  accept={['image/*', 'application/pdf']} 
  allowDuplicates={false} 
  allowReorder={true} 
  showPreview={true} 
  showFileList={true} 
  value={files} 
  onChange={setFiles} 
  onError={(errors) => console.error(errors)} 
  ariaLabel="Upload important files" 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <FileUpload
            label="Ultimate File Upload"
            variant="dashed"
            color="primary"
            size="large"
            multiple={true}
            maxFiles={10}
            maxFileSize={20}
            maxTotalSize={100}
            accept={['image/*', 'application/pdf']}
            allowDuplicates={false}
            allowReorder={true}
            showPreview={true}
            showFileList={true}
            dragDrop={true}
            value={files2}
            onChange={setFiles2}
            onError={(errors) => console.error('Errors:', errors)}
            ariaLabel="Upload important files"
          />
          <div className="flex gap-2 flex-wrap">
            <Button variant="destructive" onClick={() => setFiles2([])}>Clear All</Button>
            <Button variant="primary" onClick={() => showNotification(`${files2.length} files selected`, 'info')}>
              Show Count ({files2.length})
            </Button>
          </div>
        </div>
      </PreviewCard>

      {/* 12. Disabled State */}
      <PreviewCard
        title="Disabled State"
        description="Disable the file upload component to prevent user interaction. Useful for form validation states or when uploads are temporarily unavailable.

disabled?: boolean"
        code={`<FileUpload 
  disabled={true} 
  label="Disabled Upload" 
  variant="bordered" 
/>
<FileUpload 
  disabled={true} 
  label="Disabled with Files" 
  variant="dashed" 
  defaultValue={existingFiles} 
  showFileList={true} 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUpload
              label="Disabled Upload"
              disabled={true}
              variant="bordered"
            />
            <FileUpload
              label="Disabled (Different Variant)"
              disabled={true}
              variant="dashed"
              color="secondary"
            />
          </div>
        </div>
      </PreviewCard>

      {/* 13. Custom Icon & Placeholder */}
      <PreviewCard
        title="Custom Icon & Placeholder"
        description="Customize the upload icon and placeholder text to match your brand or provide clearer instructions to users.

icon?: React.ReactNode
placeholder?: string
uploadButtonLabel?: string
removeButtonLabel?: string"
        code={`// Custom Icon
<FileUpload 
  icon={<CustomUploadIcon />} 
  label="Custom Icon" 
  variant="bordered" 
/>

// Custom Placeholder
<FileUpload 
  placeholder="Drop your files here or click to browse" 
  label="Custom Placeholder" 
  variant="dashed" 
/>

// Custom Button Labels
<FileUpload 
  uploadButtonLabel="Choose Files" 
  removeButtonLabel="Delete" 
  label="Custom Labels" 
  showFileList={true} 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUpload
              label="Custom Icon"
              icon={<CustomUploadIcon />}
              variant="bordered"
              placeholder="Upload your brand assets here"
            />
            <FileUpload
              label="Custom Placeholder"
              placeholder="📁 Drop your amazing files here!"
              variant="dashed"
              color="primary"
            />
          </div>
        </div>
      </PreviewCard>

      {/* 14. Custom Preview Renderer */}
      <PreviewCard
        title="Custom Preview Renderer"
        description="Provide a custom function to render file previews. This gives you complete control over how uploaded files are displayed.

renderPreview?: (file: File, index: number) => React.ReactNode
previewClassName?: string"
        code={`const renderCustomPreview = (file: File, index: number) => (
  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFCB00] to-yellow-600 text-white font-bold text-xs">
    {file.name.split('.').pop()?.toUpperCase() || 'FILE'}
  </div>
);

<FileUpload 
  renderPreview={renderCustomPreview} 
  multiple={true} 
  showFileList={true} 
  label="Custom Preview" 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <FileUpload
            label="Custom File Preview"
            renderPreview={renderCustomPreview}
            multiple={true}
            showFileList={true}
            variant="bordered"
            color="primary"
          />
        </div>
      </PreviewCard>

      {/* 15. Disallowed Extensions */}
      <PreviewCard
        title="Disallowed Extensions"
        description="Block specific file extensions from being uploaded. Useful for security or policy compliance when you need to prevent certain file types.

disallowedExtensions?: string[]"
        code={`<FileUpload 
  disallowedExtensions={['exe', 'bat', 'sh', 'cmd']} 
  label="No Executables" 
  variant="bordered" 
  showFileList={true} 
  onError={(errors) => console.error(errors)} 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <FileUpload
            label="No Executables Allowed"
            disallowedExtensions={['exe', 'bat', 'sh', 'cmd', 'msi', 'dll']}
            variant="bordered"
            showFileList={true}
            onError={(errors) => showNotification(errors[0], 'error')}
          />
        </div>
      </PreviewCard>

      {/* 16. Drag & Drop Events */}
      <PreviewCard
        title="Drag & Drop Events"
        description="Hook into drag and drop lifecycle events for custom behavior, animations, or analytics tracking.

onDragEnter?: (event: React.DragEvent) => void
onDragLeave?: (event: React.DragEvent) => void
onDragOver?: (event: React.DragEvent) => void
onDrop?: (files: File[], event: React.DragEvent) => void
dragActiveClassName?: string
dragRejectClassName?: string
dragAcceptClassName?: string"
        code={`<FileUpload 
  dragDrop={true} 
  dragActiveClassName="border-green-500 bg-green-50 scale-105" 
  dragRejectClassName="border-red-500 bg-red-50 shake" 
  onDragEnter={() => console.log('Drag entered')} 
  onDragLeave={() => console.log('Drag left')} 
  onDrop={(files) => console.log('Dropped:', files)} 
  label="Custom Drag Events" 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <FileUpload
            label="Custom Drag Styling & Events"
            dragDrop={true}
            variant="dashed"
            dragActiveClassName="border-green-500 bg-green-100 border-4 scale-[1.02] transition-all"
            dragRejectClassName="border-red-500 bg-red-100 border-4"
            onDragEnter={() => showNotification('Drag started - drop your files!', 'info')}
            onDragLeave={() => showNotification('Drag cancelled', 'warning')}
            onDrop={(files) => showNotification(`Dropped ${files.length} file(s)`, 'success')}
            accept={['image/*', 'application/pdf']}
          />
        </div>
      </PreviewCard>

      {/* 17. Image Compression */}
      <PreviewCard
        title="Image Compression"
        description="Compress images before upload to reduce file sizes and improve upload speeds. Provide a custom compression function.

compressImage?: (file: File) => Promise<File>"
        code={`const compressImage = async (file: File): Promise<File> => {
  // Use browser-image-compression or similar library
  const options = { maxSizeMB: 1, maxWidthOrHeight: 1920 };
  return await imageCompression(file, options);
};

<FileUpload 
  compressImage={compressImage} 
  accept={['image/*']} 
  label="Auto-Compress Images" 
  showPreview={true} 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <FileUpload
            label="Auto-Compress Images (Simulated)"
            compressImage={compressImageHandler}
            accept={['image/*']}
            showPreview={true}
            showFileList={true}
            variant="bordered"
            color="success"
          />
        </div>
      </PreviewCard>

      {/* 18. Server Upload Configuration */}
      <PreviewCard
        title="Server Upload Configuration"
        description="Configure automatic file uploads to a server endpoint with custom headers, credentials, and timeout settings.

autoUpload?: boolean
uploadUrl?: string
method?: 'POST' | 'PUT' | 'PATCH'
headers?: Record<string, string>
withCredentials?: boolean
fieldName?: string
timeout?: number
metadata?: Record<string, any>"
        code={`<FileUpload 
  autoUpload={true} 
  uploadUrl="/api/upload" 
  method="POST" 
  headers={{ 'Authorization': 'Bearer token' }} 
  withCredentials={true} 
  fieldName="document" 
  timeout={60000} 
  metadata={{ userId: '123', category: 'documents' }} 
  onUploadStart={(file) => console.log('Starting:', file.name)} 
  onUploadProgress={(file, percent) => console.log(percent + '%')} 
  onUploadSuccess={(file, response) => console.log('Success:', response)} 
  onUploadError={(file, error) => console.error('Error:', error)} 
  label="Auto Upload to Server" 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <FileUpload
            label="Server Upload (Demo - No actual upload)"
            variant="bordered"
            color="primary"
            showFileList={true}
            multiple={true}
            onSelect={(files) => showNotification(`Selected: ${files.map(f => f.name).join(', ')}`, 'info')}
            onBeforeUpload={(file) => {
              showNotification(`Preparing to upload: ${file.name}`, 'info');
              return true;
            }}
          />
          <p className="text-xs text-gray-400">
            Note: autoUpload requires a valid uploadUrl endpoint. This demo shows the event callbacks.
          </p>
        </div>
      </PreviewCard>

      {/* 19. Upload Event Callbacks */}
      <PreviewCard
        title="Upload Event Callbacks"
        description="Handle upload lifecycle events for progress tracking, success notifications, and error handling.

onBeforeUpload?: (file: File) => boolean | Promise<boolean>
onUploadStart?: (file: File) => void
onUploadProgress?: (file: File, percent: number) => void
onUploadSuccess?: (file: File, response: any) => void
onUploadError?: (file: File, error: Error) => void
onSelect?: (files: File[]) => void
onRemove?: (fileName: string) => void
onMaxReached?: () => void"
        code={`<FileUpload 
  onSelect={(files) => {
    console.log('Selected:', files);
    showNotification(\`Selected \${files.length} file(s)\`);
  }} 
  onRemove={(fileName) => {
    console.log('Removed:', fileName);
    showNotification(\`Removed: \${fileName}\`);
  }} 
  onMaxReached={() => {
    showNotification('Maximum files reached!', 'warning');
  }} 
  onError={(errors) => {
    showNotification(errors[0], 'error');
  }} 
  multiple={true} 
  maxFiles={3} 
  showFileList={true} 
  label="Event Callbacks Demo" 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <FileUpload
            label="Event Callbacks Demo"
            variant="bordered"
            color="primary"
            multiple={true}
            maxFiles={3}
            showFileList={true}
            onSelect={(files) => showNotification(`Selected: ${files.map(f => f.name).join(', ')}`, 'success')}
            onRemove={(fileName) => showNotification(`Removed: ${fileName}`, 'warning')}
            onMaxReached={() => showNotification('Maximum 3 files allowed!', 'error')}
            onError={(errors) => showNotification(errors[0], 'error')}
          />
        </div>
      </PreviewCard>

      {/* 20. Custom Styling Classes */}
      <PreviewCard
        title="Custom Styling Classes"
        description="Apply custom Tailwind CSS classes to different parts of the component for complete visual customization.

className?: string
dropzoneClassName?: string
buttonClassName?: string
iconClassName?: string
previewClassName?: string"
        code={`<FileUpload 
  className="max-w-md mx-auto" 
  dropzoneClassName="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300 hover:border-purple-500" 
  buttonClassName="text-purple-600 hover:text-purple-800" 
  iconClassName="text-purple-500" 
  previewClassName="border-2 border-purple-300 rounded-lg" 
  label="Fully Styled" 
  showFileList={true} 
  showPreview={true} 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <FileUpload
            label="Custom Styled Upload"
            className="max-w-md mx-auto"
            dropzoneClassName="bg-gradient-to-br from-yellow-50 to-orange-50 border-[#FFCB00] hover:border-yellow-500 hover:shadow-lg transition-all"
            iconClassName="text-[#FFCB00]"
            previewClassName="border-2 border-[#FFCB00] rounded-lg shadow-sm"
            showFileList={true}
            showPreview={true}
            accept={['image/*']}
            multiple={true}
          />
        </div>
      </PreviewCard>

      {/* 21. Accessibility Props */}
      <PreviewCard
        title="Accessibility Props"
        description="Enhance accessibility with ARIA attributes for screen readers and assistive technologies.

ariaLabel?: string
ariaDescription?: string
ariaInvalid?: boolean
inputProps?: React.InputHTMLAttributes<HTMLInputElement>
name?: string"
        code={`<FileUpload 
  ariaLabel="Upload your profile photo" 
  ariaDescription="Accepted formats: JPG, PNG. Maximum size: 5MB." 
  ariaInvalid={hasError} 
  name="profilePhoto" 
  inputProps={{ 
    'data-testid': 'profile-upload',
    required: true 
  }} 
  label="Accessible Upload" 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <FileUpload
            label="Accessible File Upload"
            ariaLabel="Upload your documents"
            ariaDescription="Upload PDF or image files. Maximum 5MB per file. Up to 5 files allowed."
            name="accessibleUpload"
            inputProps={{
              required: true
            } as React.InputHTMLAttributes<HTMLInputElement>}
            variant="bordered"
            color="primary"
            accept={['application/pdf', 'image/*']}
            maxFileSize={5}
            maxFiles={5}
            showFileList={true}
          />
        </div>
      </PreviewCard>

      {/* 22. Progress Indicator */}
      <PreviewCard
        title="External Progress Indicator"
        description="Display upload progress from an external source. Useful when managing uploads outside the component.

progress?: number (0-100)"
        code={`const [progress, setProgress] = useState(0);

// Simulate upload progress
const simulateUpload = () => {
  let p = 0;
  const interval = setInterval(() => {
    p += 10;
    setProgress(p);
    if (p >= 100) clearInterval(interval);
  }, 300);
};

<FileUpload 
  progress={progress} 
  label="With Progress" 
  onSelect={simulateUpload} 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <FileUpload
            label="External Progress Control"
            progress={uploadProgress}
            variant="bordered"
            color="primary"
            onSelect={(files) => {
              if (files.length > 0) {
                let p = 0;
                const interval = setInterval(() => {
                  p += 10;
                  setUploadProgress(p);
                  if (p >= 100) {
                    clearInterval(interval);
                    showNotification('Upload complete!', 'success');
                    setTimeout(() => setUploadProgress(0), 1500);
                  }
                }, 300);
              }
            }}
          />
        </div>
      </PreviewCard>

      {/* 23. Allow Replace Mode */}
      <PreviewCard
        title="Replace Mode & Duplicate Control"
        description="Control whether users can replace existing files and whether duplicate files are allowed.

allowReplace?: boolean
allowDuplicates?: boolean
allowDelete?: boolean"
        code={`// No duplicates allowed
<FileUpload 
  allowDuplicates={false} 
  multiple={true} 
  showFileList={true} 
  label="No Duplicates" 
/>

// Delete disabled
<FileUpload 
  allowDelete={false} 
  multiple={true} 
  showFileList={true} 
  label="Cannot Delete" 
/>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUpload
              label="No Duplicates Allowed"
              allowDuplicates={false}
              multiple={true}
              showFileList={true}
              variant="bordered"
              onError={(errors) => showNotification(errors[0], 'warning')}
            />
            <FileUpload
              label="Delete Disabled"
              allowDelete={false}
              multiple={true}
              showFileList={true}
              variant="bordered"
              value={files3}
              onChange={setFiles3}
            />
          </div>
        </div>
      </PreviewCard>

      {/* 24. Default Value (Uncontrolled) */}
      <PreviewCard
        title="Default Value (Uncontrolled)"
        description="Initialize the component with default files for uncontrolled usage. Files persist until manually removed.

defaultValue?: File[]"
        code={`// Pre-populated files (uncontrolled)
<FileUpload 
  defaultValue={existingFiles} 
  showFileList={true} 
  allowDelete={true} 
  label="Pre-populated Files" 
/>

// Note: defaultValue only works in uncontrolled mode
// Do not use with 'value' prop`}
      >
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <FileUpload
            label="Uncontrolled with Default"
            showFileList={true}
            allowDelete={true}
            variant="bordered"
            multiple={true}
            onRemove={(fileName) => showNotification(`Removed: ${fileName}`, 'info')}
          />
          <p className="text-xs text-gray-400">
            Note: defaultValue accepts File objects. In this demo, add files to see the behavior.
          </p>
        </div>
      </PreviewCard>

      {/* Props Reference Table */}
      <PropsReference />
    </div>
  );
}

/**
 * PropsReference Component
 * Displays all FileUpload props in a styled table format
 */
function PropsReference() {
  return (
    <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-manrope text-xl font-semibold m-0 text-white">
          FileUpload Props
        </h3>
        <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
          FileUpload is a feature-rich file uploader component with drag-and-drop support, validation, previews, and upload handling.
          It accepts all the specialized props below for complete customization.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px] font-manrope text-sm text-[#E3E6F2]">
          <thead>
            <tr>
              {[
                { label: "Prop", width: "18%" },
                { label: "Type", width: "28%" },
                { label: "Default", width: "12%" },
                { label: "Description", width: "42%" },
              ].map((header) => (
                <th
                  key={header.label}
                  className="text-left p-3 text-xs tracking-wider uppercase text-[#99A1AF] border-b border-[#364153]"
                  style={{ width: header.width }}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {propDefinitions.map((prop) => (
              <tr key={prop.name}>
                <td className="p-3 border-b border-[#2B3546] font-medium text-white">
                  {prop.name}
                </td>
                <td className="p-3 border-b border-[#2B3546]">
                  <code className="text-xs bg-gray-800/50 px-2 py-1 rounded">{prop.type}</code>
                </td>
                <td className="p-3 border-b border-[#2B3546] text-[#C7CBD7]">
                  {prop.defaultValue}
                </td>
                <td className="p-3 border-b border-[#2B3546] text-[#C7CBD7] leading-relaxed">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * PreviewCard Component
 * Reusable card component for displaying code examples with preview/code toggle
 */
interface PreviewCardProps {
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
}

function PreviewCard({ title, description, code, children }: PreviewCardProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h3 className="font-sans text-xl font-semibold leading-tight text-white m-0
          max-[768px]:text-base
          min-[769px]:max-[1024px]:text-lg">
          {title}
        </h3>
        <p className="font-sans text-sm font-normal leading-relaxed text-gray-300 m-0 whitespace-pre-wrap
          max-[768px]:text-[13px]">
          {description}
        </p>
      </div>

      {/* Preview Container */}
      <div className="bg-white/10 border border-[#364153] rounded-2xl p-3 min-h-[266px] flex items-center justify-center relative overflow-hidden
        max-[768px]:rounded-xl max-[768px]:p-2.5 max-[768px]:min-h-[200px] max-[768px]:flex-col
        min-[769px]:max-[1024px]:min-h-[240px]">
        {/* Toggle Controls - Top Right */}
        <div className="absolute top-3 right-3 flex gap-2 items-center z-10
          max-[768px]:relative max-[768px]:top-0 max-[768px]:right-0 max-[768px]:w-full max-[768px]:justify-end max-[768px]:mb-3">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="bg-transparent border border-[#364153] rounded-lg p-2.5 cursor-pointer flex items-center justify-center transition-all hover:bg-white/5
              max-[768px]:p-2"
            title={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15 4.5L6.75 12.75L3 9" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="6" y="6" width="9" height="9" rx="1.5" stroke="white" strokeWidth="1.5"/>
                <path d="M3.75 11.25V4.5C3.75 3.67157 4.42157 3 5.25 3H12" stroke="white" strokeWidth="1.5"/>
              </svg>
            )}
          </button>

          {/* Preview/Code Toggle */}
          <div className="border border-[#364153] rounded-lg flex overflow-hidden">
            <button
              onClick={() => setActiveTab("preview")}
              className={`bg-transparent border-none rounded-lg px-5 py-2.5 font-sans text-sm font-medium cursor-pointer transition-all
                max-[768px]:px-3 max-[768px]:py-2 max-[768px]:text-xs
                ${activeTab === "preview" ? "bg-[#242424] border border-[#364153] text-white" : "text-gray-400"}`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`bg-transparent border-none rounded-lg px-5 py-2.5 font-sans text-sm font-medium cursor-pointer transition-all
                max-[768px]:px-3 max-[768px]:py-2 max-[768px]:text-xs
                ${activeTab === "code" ? "bg-[#242424] border border-[#364153] text-white" : "text-gray-400"}`}
            >
              Code
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "preview" ? (
          <div className="z-[1] w-full flex justify-center pt-[50px]
            max-[768px]:pt-0">
            {children}
          </div>
        ) : (
          <div className="w-full pt-[60px] px-3 pb-3 overflow-hidden absolute top-0 left-0 bottom-0 right-0
            max-[768px]:p-3 max-[768px]:relative">
            <pre className="m-0 p-4 bg-[#1a1a1a] rounded-lg h-full overflow-auto font-mono text-[13px] leading-normal text-gray-200 scrollbar-none
              max-[768px]:text-[11px] max-[768px]:p-3">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUploadPreview;
