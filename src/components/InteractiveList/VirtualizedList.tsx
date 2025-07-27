import React, { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import styled from 'styled-components';
import ListItem from './ListItem';
import LoadingItem from './LoadingItem';
import EmptyState from './EmptyState';

const VirtualizedContainer = styled.div<{ hasError?: boolean }>`
  width: 100%;
  height: 320px;
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ hasError, theme }) => hasError ? theme.delete : `${theme.border}30`};
  border-radius: ${({ hasError }) => hasError ? '0' : '0'};
  overflow: hidden;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
  
  /* Dark theme scrollbar styling */
  .react-window__list {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.border} ${({ theme }) => theme.background};
    overflow-x: hidden;
  }
  
  .react-window__list::-webkit-scrollbar {
    width: 6px;
  }
  
  .react-window__list::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .react-window__list::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.border}60;
    border-radius: 3px;
    transition: background 0.2s ease;
  }
  
  .react-window__list::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.textSecondary};
  }
  
  .react-window__list::-webkit-scrollbar-corner {
    background: transparent;
  }
`;

const EmptyStateContainer = styled.div<{ hasError?: boolean }>`
  width: 100%;
  height: 320px;
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ hasError, theme }) => hasError ? theme.delete : `${theme.border}30`};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s ease;
`;

interface ListItemData {
  id: string;
  value: string;
}

interface VirtualizedListProps {
  items: ListItemData[];
  hoveredItemId: string | null;
  onEdit: (itemId: string, newValue: string) => Promise<{ success: boolean; errorMessage?: string }>;
  onDelete: (itemId: string) => void;
  onMouseEnter: (itemId: string) => void;
  onMouseLeave: () => void;
  isLoading?: boolean;
  totalItems?: number;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  clearErrors?: boolean;
}

const ITEM_HEIGHT = 52; // Reduced height for less spacing between items

const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  hoveredItemId,
  onEdit,
  onDelete,
  onMouseEnter,
  onMouseLeave,
  isLoading = false,
  totalItems = 0,
  readOnly = false,
  error = false,
  errorMessage = '',
  clearErrors = false
}) => {
  const renderRow = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    // Show loading item if data is still loading and this index is beyond loaded items
    if (isLoading && index >= items.length) {
      return (
        <div style={style}>
          <LoadingItem />
        </div>
      );
    }

    // Show actual item if data is loaded
    if (index < items.length) {
      const item = items[index];
      return (
        <div style={style}>
          <ListItem
            value={item.value}
            onEdit={(newValue) => onEdit(item.id, newValue)}
            onDelete={() => onDelete(item.id)}
            isHovered={hoveredItemId === item.id}
            onMouseEnter={() => onMouseEnter(item.id)}
            onMouseLeave={onMouseLeave}
            readOnly={readOnly}
            errorMessage={errorMessage}
            clearErrors={clearErrors}
          />
        </div>
      ); 
    }

    // Fallback empty div
    return <div style={style} />;
  }, [items, hoveredItemId, onEdit, onDelete, onMouseEnter, onMouseLeave, isLoading, readOnly, errorMessage, clearErrors]);

  // Calculate total count for virtualization
  const itemCount = isLoading ? Math.max(items.length + 10, totalItems) : items.length;

  // Show empty state when no items and not loading
  if (!isLoading && items.length === 0) {
    return (
      <EmptyStateContainer hasError={error}>
        <EmptyState isReadOnly={readOnly} />
      </EmptyStateContainer>
    );
  }

  return (
    <VirtualizedContainer hasError={error}>
      <List
        height={320}
        itemCount={itemCount}
        itemSize={ITEM_HEIGHT}
        width="100%"
        className="react-window__list"
      >
        {renderRow}
      </List>
    </VirtualizedContainer>
  );
};

export default VirtualizedList; 