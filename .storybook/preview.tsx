import React from 'react';
import type { Preview } from '@storybook/react-webpack5';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../src/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story: any) => (
      <ThemeProvider theme={darkTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview; 