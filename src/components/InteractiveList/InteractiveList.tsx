import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  min-width: 360px;
  min-height: 240px;
  background: ${({ theme }) => theme.container};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InteractiveList: FunctionComponent = () => {
  return (
    <ListContainer>
      <h3>Interactive List</h3>
      {/* Future: InputBar, ListItems, EmptyState, etc. */}
    </ListContainer>
  );
};

export default InteractiveList; 