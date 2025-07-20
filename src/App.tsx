import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import InteractiveList from './components/InteractiveList/InteractiveList';
import { darkTheme } from './theme';

const CenteredContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CenteredContainer>
        <InteractiveList />
      </CenteredContainer>
    </ThemeProvider>
  );
};

export default App; 