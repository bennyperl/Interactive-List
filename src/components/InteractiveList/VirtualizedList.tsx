import React, { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import styled from 'styled-components';
import ListItem from './ListItem';
import LoadingItem from './LoadingItem';

const VirtualizedContainer = styled.div`
  width: 100%;
  height: 320px;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border}30;
  overflow: hidden;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
  
  /* Dark theme scrollbar styling */
  .react-window__list {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.border} ${({ theme }) => theme.background};
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

interface ListItemData {
  id: string;
  value: string;
}

interface VirtualizedListProps {
  items: ListItemData[];
  hoveredItemId: string | null;
  onEdit: (itemId: string, newValue: string) => void;
  onDelete: (itemId: string) => void;
  onMouseEnter: (itemId: string) => void;
  onMouseLeave: () => void;
  isLoading?: boolean;
  totalItems?: number;
  readOnly?: boolean;
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
  readOnly = false
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
          />
        </div>
      );
    }

    // Fallback empty div
    return <div style={style} />;
  }, [items, hoveredItemId, onEdit, onDelete, onMouseEnter, onMouseLeave, isLoading, readOnly]);

  // Calculate total count for virtualization
  const itemCount = isLoading ? Math.max(items.length + 10, totalItems) : items.length;

  return (
    <VirtualizedContainer>
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