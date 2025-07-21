import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../theme';
import EmptyState from '../components/InteractiveList/EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Empty state component displayed when there are no items in the list.',
      },
    },
  },
  argTypes: {
    isReadOnly: {
      control: 'boolean',
      description: 'Show read-only empty state',
    },
  },
  decorators: [
    (Story: any) => (
      <ThemeProvider theme={darkTheme}>
        <div style={{ 
          background: '#22242B', 
          padding: '20px', 
          borderRadius: '8px',
          width: '400px',
          height: '320px',
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
type Story = StoryObj<typeof EmptyState>;

// Default empty state (editable mode)
export const Default: Story = {
  args: {
    isReadOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default empty state for editable mode. Encourages users to add their first item.',
      },
    },
  },
};

// Read-only empty state
export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state for read-only mode. Informs users that no items are available to display.',
      },
    },
  },
}; 