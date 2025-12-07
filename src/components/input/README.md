# Input Component

A fully-featured, accessible input component based on the BL Design System from Figma. Supports multiple states, icons, prefixes, suffixes, and password visibility toggle.

## Features

- ✅ **Multiple States**: Placeholder, Focus, Filled, Error, and Disabled
- ✅ **Icon Support**: Start and end icons
- ✅ **Prefix/Suffix**: Text or component prefix/suffix (e.g., currency symbols, URLs)
- ✅ **Password Toggle**: Built-in show/hide password functionality
- ✅ **Error Handling**: Error state with custom error messages
- ✅ **Responsive**: Full-width support
- ✅ **Accessible**: Proper ARIA labels and keyboard navigation
- ✅ **Exact Design Match**: Matches Figma design with Tailwind CSS styling

## Installation

```tsx
import { Input } from '@/components/ui/input';
```

## Usage

### Basic Input

```tsx
<Input
  label="Plain text field"
  placeholder="Placeholder text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  supportingText="Supporting text"
/>
```

### Email Input with Icon

```tsx
<Input
  label="Email address"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  startIcon={<EmailIcon />}
  supportingText="We'll never share your email"
/>
```

### Phone Number with Country Code

```tsx
<Input
  label="Phone Number"
  type="tel"
  placeholder="Phone number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  prefix={
    <div className="flex items-center gap-1">
      <span>IN</span>
      <ChevronDownIcon />
    </div>
  }
  supportingText="Enter your phone number"
/>
```

### Amount with Currency

```tsx
<Input
  label="Amount"
  type="number"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  prefix={<span>₹</span>}
  suffix={
    <div className="flex items-center gap-1">
      <span>INR</span>
      <ChevronDownIcon />
    </div>
  }
  supportingText="Enter amount"
/>
```

### Website URL with Prefix

```tsx
<Input
  label="Website"
  placeholder="example.com"
  value={url}
  onChange={(e) => setUrl(e.target.value)}
  prefix={<span>https://</span>}
  fullWidth
  supportingText="Enter your website URL"
/>
```

### Password with Toggle

```tsx
<Input
  label="Password"
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  showPasswordToggle
  supportingText="Must be at least 8 characters"
/>
```

### Search Input

```tsx
<Input
  label="Search"
  placeholder="Search..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  startIcon={<SearchIcon />}
  supportingText="Search for anything"
/>
```

### Error State

```tsx
<Input
  label="Email address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error
  errorMessage="Please enter a valid email"
  startIcon={<EmailIcon />}
/>
```

### Disabled State

```tsx
<Input
  label="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  disabled
  supportingText="This field cannot be edited"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text displayed above the input |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Controlled input value |
| `type` | `string` | `'text'` | HTML input type |
| `disabled` | `boolean` | `false` | Disables the input |
| `error` | `boolean` | `false` | Shows error state |
| `errorMessage` | `string` | - | Error message to display (overrides supportingText) |
| `supportingText` | `string` | - | Helper text displayed below the input |
| `fullWidth` | `boolean` | `false` | Makes input take full width |
| `startIcon` | `ReactNode` | - | Icon displayed at the start of input |
| `endIcon` | `ReactNode` | - | Icon displayed at the end of input |
| `prefix` | `ReactNode` | - | Content before input (e.g., currency symbol) |
| `suffix` | `ReactNode` | - | Content after input (e.g., unit selector) |
| `showPasswordToggle` | `boolean` | `false` | Shows password visibility toggle |
| `inputClassName` | `string` | - | Additional classes for input element |
| `containerClassName` | `string` | - | Additional classes for container |
| `onChange` | `function` | - | Change handler |
| `onFocus` | `function` | - | Focus handler |
| `onBlur` | `function` | - | Blur handler |

## States

The component automatically handles the following states:

1. **Placeholder**: Empty input showing placeholder text
2. **Focus**: Blue border (3px) when input is focused
3. **Filled**: Black border when input has value
4. **Error**: Red border and error icon/message
5. **Disabled**: Gray text and border, cursor not-allowed

## Design Tokens

The component uses the following colors from the BL Design System:

- **BL/Label(not filled)**: `#49454F`
- **BL/Label(filled)**: `#1D1B20`
- **BL/Label(Disabled)**: `#A9A8AA`
- **BL/Error red**: `#B3261E`
- **BL/Symbol 1**: `#1D1B20`
- **BL/Textbox(Disabled)**: `#A9A8AA`
- **Focus border**: `#5687ef`
- **Default border**: `#79747e`

## Typography

- **Body Large**: Roboto Regular 16px, line-height 24px, tracking 0.5px (Input text)
- **Body Small**: Roboto Regular 12px, line-height 16px, tracking 0.4px (Supporting text)
- **Label**: Roboto Medium 12px (Label text)

## Examples

See `InputDemo.tsx` for comprehensive examples of all variations including:
- Plain text fields
- Email addresses
- Phone numbers with country codes
- Amount fields with currency
- Search fields
- Website URLs
- Passwords with toggle
- Language selectors
- All states (placeholder, focus, filled, error, disabled)

## Accessibility

- Proper ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- Error announcement
- Password visibility toggle with descriptive labels

## Browser Support

Works in all modern browsers that support:
- CSS Grid and Flexbox
- React 18+
- Tailwind CSS 3+

