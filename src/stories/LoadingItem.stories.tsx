import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../theme';
import LoadingItem from '../components/InteractiveList/LoadingItem';

const meta: Meta<typeof LoadingItem> = {
  title: 'Components/LoadingItem',
  component: LoadingItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loading skeleton component displayed while list items are being loaded.',
      },
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
type Story = StoryObj<typeof LoadingItem>;

// Single loading item
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Single loading item with shimmer animation effect.',
      },
    },
  },
};

// Multiple loading items
export const Multiple: Story = {
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <LoadingItem />
        <LoadingItem />
        <LoadingItem />
        <LoadingItem />
        <LoadingItem />
      </div>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple loading items to demonstrate the loading state of the list.',
      },
    },
  },
}; 