import React from 'react';
import IconButton from './IconButton';
import { EditIcon, DeleteIcon } from '../../icons';
import { useTheme } from '../../hooks/useTheme';

interface ItemActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ItemActions: React.FC<ItemActionsProps> = ({ onEdit, onDelete }) => {
  const theme = useTheme();

  return (
    <>
      <IconButton title="Edit" onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <IconButton title="Remove" onClick={onDelete} color={theme.delete}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default ItemActions; 