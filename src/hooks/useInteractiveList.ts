import { useState, useCallback, useEffect } from 'react';
import Chance from 'chance';

interface ListItemData {
  id: string;
  value: string;
}

interface UseInteractiveListProps {
  initialItems?: ListItemData[];
}

// Initialize chance instance
const chance = new Chance();

export const useInteractiveList = ({ initialItems = [] }: UseInteractiveListProps = {}) => {
  const [items, setItems] = useState<ListItemData[]>(initialItems);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // Update items when initialItems change
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleEdit = useCallback((itemId: string, newValue: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, value: newValue } : item
    ));
  }, []);

  const handleDelete = useCallback((itemId: string) => {
    const item = items.find(item => item.id === itemId);
    if (!item) return;

    const confirmed = window.confirm(`Are you sure you want to delete "${item.value}"?`);
    if (confirmed) {
      setItems(prev => prev.filter(item => item.id !== itemId));
    }
  }, [items]);

  const handleMouseEnter = useCallback((itemId: string) => {
    setHoveredItemId(itemId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredItemId(null);
  }, []);

  const addItem = useCallback((value: string) => {
    const newItem: ListItemData = {
      id: chance.guid(),
      value: value.trim()
    };
    setItems(prev => [...prev, newItem]);
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  return {
    items,
    hoveredItemId,
    handleEdit,
    handleDelete,
    handleMouseEnter,
    handleMouseLeave,
    addItem,
    clearItems
  };
}; 