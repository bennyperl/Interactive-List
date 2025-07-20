import React, { FunctionComponent, useState, useCallback } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';

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

interface ListItemData {
  id: string;
  value: string;
}

const mockItems: ListItemData[] = [
  { id: '1', value: 'First item' },
  { id: '2', value: 'Second item' },
  { id: '3', value: 'Third item' },
];

const InteractiveList: FunctionComponent = () => {
  const [items, setItems] = useState<ListItemData[]>(mockItems);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const handleEdit = useCallback((itemId: string) => {
    console.log('Edit item:', itemId);
    // TODO: Implement edit functionality
  }, []);

  const handleMouseEnter = useCallback((itemId: string) => {
    setHoveredItemId(itemId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredItemId(null);
  }, []);

  const renderListItem = useCallback((item: ListItemData) => (
    <ListItem
      key={item.id}
      value={item.value}
      onEdit={() => handleEdit(item.id)}
      isHovered={hoveredItemId === item.id}
      onMouseEnter={() => handleMouseEnter(item.id)}
      onMouseLeave={handleMouseLeave}
    />
  ), [hoveredItemId, handleEdit, handleMouseEnter, handleMouseLeave]);

  return (
    <ListContainer>
      <h3>Interactive List</h3>
      {items.map(renderListItem)}
    </ListContainer>
  );
};

export default InteractiveList; 