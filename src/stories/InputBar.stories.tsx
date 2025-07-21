import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../theme';
import InputBar from '../components/InteractiveList/InputBar';

const meta: Meta<typeof InputBar> = {
  title: 'Components/InputBar',
  component: InputBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input bar component for adding new items to the list with validation and async support.',
      },
    },
  },
  argTypes: {
    onAddItem: { action: 'item added' },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input bar',
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
type Story = StoryObj<typeof InputBar>;

// Default state
export const Default: Story = {
  args: {
    onAddItem: (value: string) => console.log('Adding item:', value),
    placeholder: 'Add new item...',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default input bar with add functionality. Type text and press Enter or click the + button to add items.',
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    onAddItem: (value: string) => console.log('Adding item:', value),
    placeholder: 'Add new item...',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled input bar. Cannot add items when disabled.',
      },
    },
  },
};

// Custom placeholder
export const CustomPlaceholder: Story = {
  args: {
    onAddItem: (value: string) => console.log('Adding item:', value),
    placeholder: 'Enter your task here...',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input bar with custom placeholder text.',
      },
    },
  },
};

// Empty input validation
export const EmptyInputValidation: Story = {
  args: {
    onAddItem: (value: string) => console.log('Adding item:', value),
    placeholder: 'Add new item...',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Try to add an empty item. The button will be disabled and no action will be triggered.',
      },
    },
  },
}; 