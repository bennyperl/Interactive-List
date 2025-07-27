import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ItemActions from './ItemActions';
import SpinnerIcon from '../../icons/SpinnerIcon';

const ItemContainer = styled.div<{ isHovered?: boolean; readOnly?: boolean; hasError?: boolean }>`
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
  border: 1.5px solid ${({ isHovered, readOnly, hasError, theme }) => {
    if (hasError) {
      return theme.delete;
    }
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

const EditInput = styled.input<{ hasError?: boolean }>`
  flex: 1;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1.5px solid ${({ hasError, theme }) => hasError ? theme.delete : theme.accent};
  background: ${({ theme }) => theme.container};
  color: ${({ theme }) => theme.text};
  outline: none;
  margin-right: 12px;
`;

const IconsWrapper = styled.div<{ isHovered?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${({ isHovered }) => isHovered ? 1 : 0};
  transition: opacity 0.2s ease;
`;

const ValidationSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-left: 8px;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  margin-right: 12px;
`;

interface ListItemProps {
  value: string;
  onEdit: (newValue: string) => Promise<{ success: boolean; errorMessage?: string }>;
  onDelete: () => void;
  isHovered?: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  readOnly?: boolean;
  errorMessage?: string;
  clearErrors?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ 
  value, 
  onEdit, 
  onDelete,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  readOnly = false,
  errorMessage = '',
  clearErrors = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear local validation errors when clearErrors prop changes
  useEffect(() => {
    if (clearErrors) {
      setValidationError(false);
      setIsValidating(false);
    }
  }, [clearErrors]);

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
    setValidationError(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSave = async () => {
    if (readOnly) {
      setIsEditing(false);
      return;
    }
    
    if (editValue.trim() !== '' && editValue !== value) {
      setIsValidating(true);
      setValidationError(false);
      
      const result = await onEdit(editValue.trim());
      
      if (!result.success) {
        // Validation failed, keep edit mode open and show red border
        setValidationError(true);
        setIsValidating(false);
      } else {
        // Validation passed, close edit mode
        setIsEditing(false);
        setIsValidating(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (readOnly) {
      setIsEditing(false);
      return;
    }
    setEditValue(value);
    setValidationError(false);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly || isValidating) return;
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
      hasError={validationError}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isEditing && !readOnly ? (
        <>
          <EditContainer>
            <EditInput
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              disabled={readOnly || isValidating}
              hasError={validationError}
            />
          </EditContainer>
          {isValidating && (
            <ValidationSpinner>
              <SpinnerIcon size="small" color="currentColor" />
            </ValidationSpinner>
          )}
        </>
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