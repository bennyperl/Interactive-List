import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../theme';
import ListItem from '../components/InteractiveList/ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'Components/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Individual list item component with inline editing, hover effects, and action buttons.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The text content of the list item',
    },
    onEdit: { action: 'item edited' },
    onDelete: { action: 'item deleted' },
    isHovered: {
      control: 'boolean',
      description: 'Show hover state',
    },
    onMouseEnter: { action: 'mouse enter' },
    onMouseLeave: { action: 'mouse leave' },
    readOnly: {
      control: 'boolean',
      description: 'Disable editing and delete actions',
    },
  },
  decorators: [
    (Story: any) => (
      <ThemeProvider theme={darkTheme}>
        <div style={{ 
          background: '#22242B', 
          padding: '20px', 
          borderRadius: '8px',
          width: '400px'
        }}>

          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ListItem>;

// Interactive List Item
export const Interactive: Story = {
  args: {
    value: 'Sample list item',
    onEdit: async (newValue: string) => {
      console.log('Editing item:', newValue);
      return { success: true }; // Simulate successful edit
    },
    onDelete: () => console.log('Deleting item'),
    isHovered: false,
    onMouseEnter: () => console.log('Mouse enter'),
    onMouseLeave: () => console.log('Mouse leave'),
    readOnly: false,
    clearErrors: false,
  },
  render: ({ value, onEdit, onDelete, isHovered, onMouseEnter, onMouseLeave, readOnly, clearErrors }) => {
    const [isItemHovered, setIsItemHovered] = React.useState(false);
    
    const handleMouseEnter = () => {
      setIsItemHovered(true);
      onMouseEnter();
    };
    
    const handleMouseLeave = () => {
      setIsItemHovered(false);
      onMouseLeave();
    };

    return (
      <ListItem
        value={value}
        onEdit={onEdit}
        onDelete={onDelete}
        isHovered={isItemHovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        readOnly={readOnly}
        clearErrors={clearErrors}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive list item with hover functionality. Hover over the item to see action buttons appear.',
      },
    },
  },
};

export const WithValidationError: Story = {
  args: {
    value: 'Item with Error',
    onEdit: async (newValue: string) => {
      console.log('Edit with validation error:', newValue);
      return { success: false, errorMessage: 'This is a validation error message' };
    },
    onDelete: () => console.log('Deleting item'),
    isHovered: false,
    onMouseEnter: () => console.log('Mouse enter'),
    onMouseLeave: () => console.log('Mouse leave'),
    readOnly: false,
    clearErrors: false,
  },
  render: ({ value, onEdit, onDelete, isHovered, onMouseEnter, onMouseLeave, readOnly, clearErrors }) => {
    const [isItemHovered, setIsItemHovered] = React.useState(false);
    
    const handleMouseEnter = () => {
      setIsItemHovered(true);
      onMouseEnter();
    };
    
    const handleMouseLeave = () => {
      setIsItemHovered(false);
      onMouseLeave();
    };

    return (
      <ListItem
        value={value}
        onEdit={onEdit}
        onDelete={onDelete}
        isHovered={isItemHovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        readOnly={readOnly}
        clearErrors={clearErrors}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'List item with validation error state. Shows how the component looks when validation fails during editing.',
      },
    },
  },
}; 