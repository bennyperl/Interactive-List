import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import InputBar from './InputBar';
import VirtualizedList from './VirtualizedList';
import { useInteractiveList } from '../../hooks/useInteractiveList';
import { mockItems } from '../../data/mockData';

const ListContainer = styled.div`
  width: 480px;
  max-width: 95vw;
  background: linear-gradient(135deg, ${({ theme }) => theme.container} 0%, ${({ theme }) => theme.background} 100%);
  color: ${({ theme }) => theme.text};
  border-radius: 16px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 8px 16px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  padding: 32px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.border}40;
  backdrop-filter: blur(10px);
`;

const ListTitle = styled.h2`
  margin: 0 0 24px 0;
  color: ${({ theme }) => theme.text};
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, ${({ theme }) => theme.text} 0%, ${({ theme }) => theme.textSecondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const InteractiveList: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialItems, setInitialItems] = useState<typeof mockItems>([]);

  const {
    items,
    hoveredItemId,
    handleEdit,
    handleDelete,
    handleMouseEnter,
    handleMouseLeave,
    addItem
  } = useInteractiveList({ initialItems });

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update initial items to trigger hook re-initialization
      setInitialItems(mockItems);
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <ListContainer>
      <ListTitle>Interactive List</ListTitle>
      
      <InputBar onAddItem={addItem} />
      <VirtualizedList
        items={items}
        hoveredItemId={hoveredItemId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        isLoading={isLoading}
        totalItems={items.length}
      />
    </ListContainer>
  );
};

export default InteractiveList; 