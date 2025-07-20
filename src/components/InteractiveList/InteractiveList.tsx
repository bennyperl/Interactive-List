import React, { FunctionComponent, useState, useEffect } from 'react';
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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ListTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.text};
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, ${({ theme }) => theme.text} 0%, ${({ theme }) => theme.textSecondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ReadOnlyToggle = styled.button<{ isReadOnly: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${({ isReadOnly, theme }) => isReadOnly ? theme.warning : theme.success};
  border-radius: 8px;
  background: ${({ isReadOnly, theme }) => isReadOnly ? theme.warning : theme.success};
  color: white;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: ${({ isReadOnly, theme }) => isReadOnly ? theme.warning : theme.success};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ReadOnlyIndicator = styled.div<{ isReadOnly: boolean }>`
  display: ${({ isReadOnly }) => isReadOnly ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background: ${({ theme }) => theme.warning}20;
  border: 1px solid ${({ theme }) => theme.warning}40;
  border-radius: 8px;
  color: ${({ theme }) => theme.warning};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
`;

const InteractiveList: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialItems, setInitialItems] = useState<typeof mockItems>([]);
  const [isReadOnly, setIsReadOnly] = useState(false);

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

  const toggleReadOnly = () => {
    setIsReadOnly(!isReadOnly);
  };

  return (
    <ListContainer>
      <HeaderContainer>
        <ListTitle>Interactive List</ListTitle>
        <ReadOnlyToggle 
          isReadOnly={isReadOnly}
          onClick={toggleReadOnly}
        >
          {isReadOnly ? 'Read Only' : 'Editable'}
        </ReadOnlyToggle>
      </HeaderContainer>
      
      <ReadOnlyIndicator isReadOnly={isReadOnly}>
        Read Only Mode - Items cannot be added, edited, or deleted
      </ReadOnlyIndicator>
      
      <InputBar onAddItem={addItem} disabled={isReadOnly} />
      <VirtualizedList
        items={items}
        hoveredItemId={hoveredItemId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        isLoading={isLoading}
        totalItems={items.length}
        readOnly={isReadOnly}
      />
    </ListContainer>
  );
};

export default InteractiveList; 