import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ItemActions from './ItemActions';

const ItemContainer = styled.div<{ isHovered?: boolean; readOnly?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 10px;
  background: ${({ isHovered, readOnly, theme }) => {
    if (readOnly) {
      return isHovered 
        ? `linear-gradient(135deg, ${theme.disabled}20 0%, ${theme.background} 100%)`
        : 'transparent';
    }
    return isHovered 
      ? `linear-gradient(135deg, ${theme.container} 0%, ${theme.background} 100%)`
      : 'transparent';
  }};
  color: ${({ readOnly, theme }) => readOnly ? theme.textSecondary : theme.text};
  border: 1.5px solid ${({ isHovered, readOnly, theme }) => {
    if (readOnly) {
      return isHovered ? theme.disabled : `${theme.text}10`;
    }
    return isHovered ? theme.accent : `${theme.text}15`;
  }};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-sizing: border-box;
  opacity: ${({ readOnly }) => readOnly ? 0.8 : 1};
  
  &:hover {
    transform: ${({ readOnly }) => readOnly ? 'none' : 'translateY(-1px)'};
    box-shadow: ${({ readOnly }) => readOnly ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.15)'};
  }
  
  /* Add 4px top margin to the first item */
  &:first-child {
    margin-top: 4px;
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
  error?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ 
  value, 
  onEdit, 
  onDelete,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  readOnly = false,
  error = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Exit editing mode if read-only is enabled
  useEffect(() => {
    if (readOnly && isEditing) {
      setIsEditing(false);
      setEditValue(value);
    }
  }, [readOnly, isEditing, value]);

  const handleEditClick = () => {
    if (readOnly) return;
    setIsEditing(true);
    setEditValue(value);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSave = () => {
    if (readOnly) {
      setIsEditing(false);
      return;
    }
    if (editValue.trim() !== '' && editValue !== value) {
      onEdit(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (readOnly) {
      setIsEditing(false);
      return;
    }
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
      readOnly={readOnly}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isEditing && !readOnly ? (
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