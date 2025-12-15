# FileUpload Component - Enhanced Documentation

A robust, feature-rich file uploader component with extensive validation, drag & drop, previews, and upload handling capabilities.

## 🚀 Quick Start

```tsx
import FileUpload from './components/fileUpload/FileUpload';

function App() {
  return (
    <FileUpload
      label="Upload Files"
      multiple={true}
      maxFiles={5}
      maxFileSize={10}
      showPreview={true}
      variant="bordered"
      onChange={(files) => console.log(files)}
    />
  );
}
```

## 📦 New Features Added

### 1. **Core Props** (Enhanced)
- `minFileSize` - Minimum file size validation (in MB)
- `maxFiles` - Limit the number of files that can be uploaded
- `name` - Input field name for form submission
- `value` / `defaultValue` - Controlled/uncontrolled component support

### 2. **Drag & Drop** (Advanced)
- `dragActiveClassName` - Custom styling when dragging files over
- `dragRejectClassName` - Custom styling for invalid file types
- `dragAcceptClassName` - Custom styling for valid file types
- `onDragEnter`, `onDragLeave`, `onDragOver`, `onDrop` - Event handlers

### 3. **Validation** (Comprehensive)
- `allowDuplicates` - Prevent duplicate files (default: true)
- `allowedExtensions` - Whitelist file extensions (e.g., ['jpg', 'png', 'pdf'])
- `disallowedExtensions` - Blacklist file extensions
- `customValidator` - Custom validation function `(file: File) => string | null`
- `maxTotalSize` - Maximum total size for all files (in MB)

### 4. **Preview Options**
- `previewType` - "image" | "icon" | "thumbnail"
- `previewClassName` - Custom styling for preview elements
- `renderPreview` - Custom preview renderer `(file: File, index: number) => ReactNode`

### 5. **Upload Handling** (Async Support)
- `autoUpload` - Automatically upload files on selection
- `uploadUrl` - Server endpoint for file upload
- `method` - HTTP method: "POST" | "PUT" | "PATCH"
- `headers` - Custom HTTP headers
- `withCredentials` - Include credentials in request
- `fieldName` - Form field name (default: "file")
- `timeout` - Request timeout in milliseconds

### 6. **File Manipulation**
- `allowReorder` - Enable drag-to-reorder functionality
- `allowDelete` - Control whether files can be removed (default: true)
- `allowReplace` - Allow replacing existing files
- `onReorder` - Callback when files are reordered
- `compressImage` - Image compression handler

### 7. **Styling Options**
- `variant` - "default" | "bordered" | "dashed" | "dragDrop" | "minimal" | "compact"
- `color` - "primary" | "secondary" | "success" | "error" | "warning"
- `size` - "small" | "medium" | "large"
- `dropzoneClassName` - Custom class for dropzone area
- `buttonClassName` - Custom class for buttons
- `iconClassName` - Custom class for icon wrapper

### 8. **Event Callbacks** (Complete)
- `onSelect` - Fired when files are selected
- `onChange` - Fired when file list changes
- `onRemove` - Fired when a file is removed
- `onError` - Fired when validation errors occur
- `onMaxReached` - Fired when max files limit is reached
- `onBeforeUpload` - Control upload approval `(file: File) => boolean | Promise<boolean>`
- `onUploadStart` - Fired when upload starts
- `onUploadProgress` - Track upload progress
- `onUploadSuccess` - Fired on successful upload
- `onUploadError` - Fired on upload failure

### 9. **Accessibility** (A11y)
- `ariaLabel` - Accessible label for screen readers
- `ariaDescription` - Detailed description for screen readers
- `ariaInvalid` - Mark component as invalid
- `inputProps` - Pass additional props to input element

### 10. **Advanced Features**
- `metadata` - Attach custom metadata to uploads
- Controlled/Uncontrolled modes
- File status tracking (pending, uploading, success, error)
- Multiple error display
- Total file size display

## 📋 Usage Examples

### Basic Usage
```tsx
<FileUpload
  label="Upload Document"
  variant="bordered"
  onChange={(files) => console.log(files)}
/>
```

### Images Only with Preview
```tsx
<FileUpload
  label="Upload Photos"
  accept={['image/png', 'image/jpeg', 'image/jpg']}
  multiple={true}
  maxFiles={5}
  showPreview={true}
  variant="dashed"
/>
```

### File Size Restrictions
```tsx
<FileUpload
  label="Upload Resume"
  allowedExtensions={['pdf', 'doc', 'docx']}
  minFileSize={0.1}
  maxFileSize={5}
  variant="bordered"
/>
```

### With Validation
```tsx
<FileUpload
  label="Upload Files"
  multiple={true}
  maxFiles={3}
  maxTotalSize={20}
  allowDuplicates={false}
  onMaxReached={() => alert('Maximum files reached!')}
  onError={(errors) => console.error(errors)}
/>
```

### Custom Validator
```tsx
<FileUpload
  label="Upload"
  customValidator={(file) => {
    if (file.name.length > 100) {
      return 'Filename is too long';
    }
    return null;
  }}
/>
```

### Reorderable Files
```tsx
<FileUpload
  label="Upload & Reorder"
  multiple={true}
  allowReorder={true}
  showFileList={true}
  onReorder={(files) => console.log('New order:', files)}
/>
```

### Controlled Component
```tsx
const [files, setFiles] = useState<File[]>([]);

<FileUpload
  label="Controlled Upload"
  value={files}
  onChange={setFiles}
  multiple={true}
  showFileList={true}
/>
```

### Auto Upload
```tsx
<FileUpload
  label="Auto Upload"
  autoUpload={true}
  uploadUrl="/api/upload"
  method="POST"
  headers={{ 'Authorization': 'Bearer token' }}
  onUploadStart={(file) => console.log('Uploading:', file.name)}
  onUploadSuccess={(file, response) => console.log('Success:', response)}
  onUploadError={(file, error) => console.error('Error:', error)}
/>
```

### Different Variants
```tsx
// Default
<FileUpload variant="default" />

// Bordered
<FileUpload variant="bordered" />

// Dashed
<FileUpload variant="dashed" />

// Drag & Drop Style
<FileUpload variant="dragDrop" />

// Minimal
<FileUpload variant="minimal" />

// Compact
<FileUpload variant="compact" />
```

### Color Variations
```tsx
<FileUpload color="primary" variant="bordered" />
<FileUpload color="success" variant="bordered" />
<FileUpload color="error" variant="bordered" />
<FileUpload color="warning" variant="bordered" />
```

### Size Variations
```tsx
<FileUpload size="small" />
<FileUpload size="medium" />
<FileUpload size="large" />
```

### Accessibility
```tsx
<FileUpload
  label="Upload Documents"
  ariaLabel="Upload important documents"
  ariaDescription="You can upload PDF, DOC, or DOCX files up to 10MB"
  accept={['application/pdf', 'application/msword']}
/>
```

### Real-World: Profile Picture Upload
```tsx
<FileUpload
  label="Profile Picture"
  accept={['image/png', 'image/jpeg']}
  maxFileSize={2}
  multiple={false}
  showPreview={true}
  variant="bordered"
  color="primary"
  customValidator={(file) => {
    if (file.size < 10000) {
      return 'Image resolution is too low';
    }
    return null;
  }}
/>
```

## 🎨 Preview Component

Check out `FileUploadPreview.tsx` in the `docs/src/preview` folder for 21+ comprehensive examples showcasing:

1. Basic Variants (6 variants)
2. Color Variants (5 colors)
3. Size Variants (3 sizes)
4. File Type Restrictions
5. Extension-Based Restrictions
6. File Size Restrictions
7. Multiple Files & Limits
8. Preview Variations
9. File Manipulation
10. Drag & Drop Customization
11. Controlled Component
12. Upload Progress
13. Event Callbacks
14. Custom Validation
15. Disabled State
16. Custom Placeholder & Icons
17. Accessibility Features
18. Auto Upload
19. Real-World Examples
20. With Metadata
21. All Features Combined

## 🔧 Props Reference

| Category | Props | Type | Description |
|----------|-------|------|-------------|
| **Core** | `label` | `string` | Label text |
| | `multiple` | `boolean` | Allow multiple files |
| | `accept` | `string[]` | MIME types |
| | `maxFileSize` | `number` | Max file size (MB) |
| | `minFileSize` | `number` | Min file size (MB) |
| | `maxFiles` | `number` | Max number of files |
| | `disabled` | `boolean` | Disable component |
| **Validation** | `allowDuplicates` | `boolean` | Allow duplicate files |
| | `allowedExtensions` | `string[]` | Whitelist extensions |
| | `disallowedExtensions` | `string[]` | Blacklist extensions |
| | `customValidator` | `function` | Custom validation |
| | `maxTotalSize` | `number` | Max total size (MB) |
| **Preview** | `showPreview` | `boolean` | Show image preview |
| | `showFileList` | `boolean` | Show file list |
| | `previewType` | `string` | Preview style |
| | `renderPreview` | `function` | Custom preview |
| **Upload** | `autoUpload` | `boolean` | Auto upload on select |
| | `uploadUrl` | `string` | Upload endpoint |
| | `method` | `string` | HTTP method |
| | `headers` | `object` | HTTP headers |
| **Styling** | `variant` | `string` | Visual variant |
| | `color` | `string` | Color theme |
| | `size` | `string` | Component size |
| | `className` | `string` | Custom class |
| **Events** | `onChange` | `function` | File change handler |
| | `onSelect` | `function` | File select handler |
| | `onRemove` | `function` | File remove handler |
| | `onError` | `function` | Error handler |

## 🚨 Error Handling

The component handles multiple types of errors:
- Invalid file type
- File size too large/small
- Too many files
- Duplicate files (when disabled)
- Total size exceeded
- Custom validation failures

All errors are displayed with clear messages and can be captured via the `onError` callback.

## ♿ Accessibility

The component includes:
- ARIA labels and descriptions
- Keyboard navigation support (Enter/Space to open file picker)
- Screen reader friendly
- Focus management
- Semantic HTML

## 🎯 Best Practices

1. **Use controlled mode** for complex forms
2. **Set maxFiles** to prevent excessive uploads
3. **Validate file types** using both `accept` and `allowedExtensions`
4. **Provide clear placeholders** describing accepted files
5. **Handle errors gracefully** with `onError` callback
6. **Show upload progress** for better UX
7. **Use appropriate variants** based on context
8. **Enable accessibility** props for inclusive design

## 📝 License

MIT
