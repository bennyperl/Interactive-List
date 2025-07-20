import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Theme } from '../theme';

export const useTheme = () => {
  const theme = useContext(ThemeContext) as Theme;
  
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return theme;
}; 