import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../theme';
import InteractiveList from '../components/InteractiveList/InteractiveList';

const meta: Meta<typeof InteractiveList> = {
  title: 'Components/InteractiveList',
  component: InteractiveList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A high-performance interactive list component with virtualization, CRUD operations, and multiple states.',
      },
    },
  },
  argTypes: {
    error: {
      control: 'boolean',
      description: 'Enable error state with red border around the list',
    },
    initialReadOnly: {
      control: 'boolean',
      description: 'Start the list in read-only mode',
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

// Default state
export const Default: Story = {
  args: {
    error: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default interactive list with full functionality including add, edit, delete, and read-only toggle.',
      },
    },
  },
};

// Error state
export const ErrorState: Story = {
  args: {
    error: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state with red border around the list area and disabled functionality.',
      },
    },
  },
};

// Read-only state (user interaction)
export const ReadOnly: Story = {
  args: {
    error: false,
    initialReadOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive list starting in read-only mode. Click the "Read Only" button to toggle to editable mode. In read-only mode, items cannot be added, edited, or deleted.',
      },
    },
  },
};

// Loading state (simulated)
export const Loading: Story = {
  args: {
    error: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'The component shows loading state with shimmer items when data is being fetched.',
      },
    },
  },
};

// Empty state (simulated)
export const Empty: Story = {
  args: {
    error: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state is shown when there are no items in the list.',
      },
    },
  },
};

// Large dataset
export const LargeDataset: Story = {
  args: {
    error: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'The component handles large datasets efficiently using virtualization. Scroll to see performance.',
      },
    },
  },
}; 