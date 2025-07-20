import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { useInteractiveList } from '../../hooks/useInteractiveList';

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

const mockItems = [
  { id: '1', value: 'First item' },
  { id: '2', value: 'Second item' },
  { id: '3', value: 'Third item' },
];

const InteractiveList: FunctionComponent = () => {
  const {
    items,
    hoveredItemId,
    handleEdit,
    handleDelete,
    handleMouseEnter,
    handleMouseLeave
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
      <h3>Interactive List</h3>
      {items.map(renderListItem)}
    </ListContainer>
  );
};

export default InteractiveList; 