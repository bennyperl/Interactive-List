import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ItemActions from './ItemActions';

const ItemContainer = styled.div<{ isHovered?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 6px;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 1.5px solid ${({ theme }) => theme.text}22;
  transition: background 0.2s, border-color 0.2s;
  position: relative;
  box-sizing: border-box;
  
  &:hover {
    background: ${({ theme }) => theme.container};
    border-color: ${({ theme }) => theme.accent};
  }
`;

const ValueText = styled.span`
  flex: 1;
  font-size: 14px;
  word-break: break-word;
  text-align: left;
  margin-right: 12px;
`;

const EditInput = styled.input`
  flex: 1;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1.5px solid ${({ theme }) => theme.accent};
  background: ${({ theme }) => theme.container};
  color: ${({ theme }) => theme.text};
  outline: none;
  margin-right: 12px;
`;

const IconsWrapper = styled.div<{ isHovered?: boolean }>`
  display: flex;
  align-items: center;
  opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
  transition: opacity 0.2s;
  gap: 4px;
  flex-shrink: 0;
`;

interface ListItemProps {
  value: string;
  onEdit: (newValue: string) => void;
  onDelete: () => void;
  isHovered?: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  readOnly?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ 
  value, 
  onEdit, 
  onDelete,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  readOnly = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    if (readOnly) return;
    setIsEditing(true);
    setEditValue(value);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSave = () => {
    if (readOnly) return;
    if (editValue.trim() !== '' && editValue !== value) {
      onEdit(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (readOnly) return;
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly) return;
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <ItemContainer 
      isHovered={isHovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isEditing ? (
        <EditInput
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          disabled={readOnly}
        />
      ) : (
        <ValueText>{value}</ValueText>
      )}
      {!isEditing && !readOnly && (
        <IconsWrapper isHovered={isHovered}>
          <ItemActions onEdit={handleEditClick} onDelete={onDelete} />
        </IconsWrapper>
      )}
    </ItemContainer>
  );
};

export default ListItem;