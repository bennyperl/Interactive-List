import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../theme';
import InteractiveList from '../components/InteractiveList/InteractiveList';

const meta: Meta<typeof InteractiveList> = {
  title: 'Documentation/InteractiveList',
  component: InteractiveList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Interactive List Component

A high-performance, feature-rich interactive list component built with React, TypeScript, and styled-components.

## Features

- **Virtualization**: Handles large datasets efficiently using react-window
- **CRUD Operations**: Add, edit, and delete items with inline editing
- **Multiple States**: Loading, empty, error, and read-only states
- **Responsive Design**: Works on different screen sizes
- **Dark Theme**: Beautiful dark theme with consistent styling
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized rendering with proper memoization

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| error | boolean | false | Enable error state with red border |

## Usage

\`\`\`tsx
import InteractiveList from './components/InteractiveList/InteractiveList';

function App() {
  return <InteractiveList error={false} />;
}
\`\`\`

## States

### Default State
- Full functionality with add, edit, delete operations
- Hover effects on list items
- Read-only toggle button

### Loading State
- Shimmer loading animation
- Progressive data loading
- Smooth transitions

### Empty State
- Context-aware messaging
- Different messages for editable vs read-only modes
- Encourages user interaction

### Error State
- Red border around list area
- Error indicator banner
- Disabled functionality

### Read-Only State
- Hidden action buttons
- Disabled input bar
- Clear visual indication

## Interactions

### Adding Items
1. Type in the input field
2. Press Enter or click the + button
3. Item appears in the list immediately

### Editing Items
1. Hover over a list item
2. Click the edit icon
3. Type new value and press Enter to save
4. Press Escape to cancel

### Deleting Items
1. Hover over a list item
2. Click the delete icon
3. Confirm deletion in the dialog

### Read-Only Toggle
1. Click the "Editable" button to toggle read-only mode
2. All editing functionality is disabled
3. Clear visual feedback

## Performance

- **Virtualization**: Only renders visible items + buffer
- **Efficient Updates**: Minimal re-renders with proper memoization
- **Smooth Scrolling**: 60fps performance even with 10,000+ items
- **Memory Optimized**: No memory leaks or excessive DOM elements

## Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Readers**: Proper ARIA labels and descriptions
- **Focus Management**: Logical tab order and focus indicators
- **Color Contrast**: WCAG AA compliant color scheme

## Styling

- **Theme System**: Centralized theme with semantic colors
- **Responsive**: Adapts to different screen sizes
- **Consistent**: Unified design language throughout
- **Customizable**: Easy to modify colors and spacing
        `,
      },
    },
  },
  argTypes: {
    error: {
      control: 'boolean',
      description: 'Enable error state',
    },
  },
  decorators: [
    (Story: any) => (
      <ThemeProvider theme={darkTheme}>
        <div style={{ 
          background: '#181A20', 
          padding: '20px', 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InteractiveList>;

// Documentation story
export const Overview: Story = {
  args: {
    error: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
## Interactive Demo

This is the main Interactive List component with all features enabled. Try the following:

1. **Add Items**: Type in the input field and press Enter
2. **Edit Items**: Hover over items and click the edit icon
3. **Delete Items**: Hover over items and click the delete icon
4. **Toggle Read-Only**: Click the "Editable" button to switch modes
5. **Scroll**: Scroll through the list to see virtualization in action

The component demonstrates:
- Real-time item management
- Smooth animations and transitions
- Responsive design
- Professional dark theme
- Intuitive user interactions
        `,
      },
    },
  },
}; 