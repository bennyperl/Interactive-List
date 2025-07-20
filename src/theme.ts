import 'styled-components';

export const darkTheme = {
  background: '#181A20',
  container: '#22242B',
  text: '#E6E6E6',
  accent: '#4F8CFF',
  shadow: '0 4px 24px rgba(16, 17, 20, 0.7)',
  // Semantic colors for actions
  edit: '#4F8CFF',    // Blue for edit actions
  delete: '#FF0000',  // Red for delete actions
  success: '#4CAF50', // Green for success actions
  warning: '#FF9800', // Orange for warning actions
};

export type Theme = typeof darkTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
} 