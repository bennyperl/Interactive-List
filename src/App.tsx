import React from 'react';
import styled from 'styled-components';
import InteractiveList from './components/InteractiveList/InteractiveList';

const CenteredContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
`;

const App: React.FC = () => {
  return (
    <CenteredContainer>
      <InteractiveList error={true} />
    </CenteredContainer>
  );
};

export default App; 