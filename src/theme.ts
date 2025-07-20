import 'styled-components';

export const darkTheme = {
  background: '#181A20',
  container: '#22242B',
  text: '#E6E6E6',
  accent: '#4F8CFF',
  shadow: '0 4px 24px rgba(16, 17, 20, 0.7)',
};

export type Theme = typeof darkTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
} 