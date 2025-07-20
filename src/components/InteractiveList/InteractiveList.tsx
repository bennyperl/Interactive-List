import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import InputBar from './InputBar';
import { useInteractiveList } from '../../hooks/useInteractiveList';
import { mockItems } from '../../data/mockData';

const ListContainer = styled.div`
  width: 400px;
  max-width: 90vw;
  background: ${({ theme }) => theme.container};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const ListTitle = styled.h3`
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const ItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InteractiveList: FunctionComponent = () => {
  const {
    items,
    hoveredItemId,
    handleEdit,
    handleDelete,
    handleMouseEnter,
    handleMouseLeave,
    addItem
  } = useInteractiveList({ initialItems: mockItems });

  const renderListItem = useCallback((item: typeof items[0]) => (
    <ListItem
      key={item.id}
      value={item.value}
      onEdit={(newValue) => handleEdit(item.id, newValue)}
      onDelete={() => handleDelete(item.id)}
      isHovered={hoveredItemId === item.id}
      onMouseEnter={() => handleMouseEnter(item.id)}
      onMouseLeave={handleMouseLeave}
    />
  ), [hoveredItemId, handleEdit, handleDelete, handleMouseEnter, handleMouseLeave]);

  return (
    <ListContainer>
      <ListTitle>Interactive List</ListTitle>
      <InputBar onAddItem={addItem} />
      <ItemsContainer>
        {items.map(renderListItem)}
      </ItemsContainer>
    </ListContainer>
  );
};

export default InteractiveList; 