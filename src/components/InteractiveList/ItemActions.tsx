import React from 'react';
import IconButton from './IconButton';
import { EditIcon, DeleteIcon } from '../../icons';
import { useTheme } from '../../hooks/useTheme';

interface ItemActionsProps {
  onEdit: () => void;
}

const ItemActions: React.FC<ItemActionsProps> = ({ onEdit }) => {
  const theme = useTheme();

  const handleDelete = () => {
    // No-op function - does nothing when clicked
  };

  return (
    <>
      <IconButton title="Edit" onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <IconButton title="Remove" onClick={handleDelete} color={theme.delete}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default ItemActions; 