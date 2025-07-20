import 'styled-components';

export const darkTheme = {
  background: '#181A20',
  container: '#22242B',
  text: '#E6E6E6',
  textSecondary: '#9CA3AF',
  accent: '#4F8CFF',
  primary: '#4F8CFF',
  primaryHover: '#3B7AE6',
  border: '#374151',
  input: '#1F2937',
  disabled: '#6B7280',
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