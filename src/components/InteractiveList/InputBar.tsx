import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import AddIcon from '../../icons/AddIcon';
import { messages } from '../../messages';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 16px;
`;

const Input = styled.input<{ disabled?: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid ${({ disabled, theme }) => disabled ? theme.disabled : theme.border};
  border-radius: 6px;
  background: ${({ disabled, theme }) => disabled ? theme.disabled + '20' : theme.input};
  color: ${({ disabled, theme }) => disabled ? theme.textSecondary : theme.text};
  font-size: 14px;
  transition: border-color 0.2s ease;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'text'};

  &:focus {
    outline: none;
    border-color: ${({ disabled, theme }) => disabled ? theme.disabled : theme.primary};
  }

  &::placeholder {
    color: ${({ disabled, theme }) => disabled ? theme.disabled : theme.textSecondary};
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 6px;
  background: ${({ theme }) => theme.primary};
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.disabled};
    cursor: not-allowed;
  }
`;

interface InputBarProps {
  onAddItem: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const handleInputChange = (setInputValue: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value);
};

const InputBar: React.FC<InputBarProps> = ({ 
  onAddItem, 
  placeholder = messages.inputPlaceholder,
  disabled = false 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue || disabled || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      onAddItem(trimmedValue);
      setInputValue('');
      inputRef.current?.focus();
    } catch (error) {
      console.error(messages.errors.addItemFailed, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const isButtonDisabled = !inputValue.trim() || disabled || isSubmitting;

  return (
    <InputContainer>
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange(setInputValue)}
        onKeyDown={handleKeyPress}
        placeholder={disabled ? messages.readOnlyPlaceholder : placeholder}
        disabled={disabled}
      />
      <AddButton 
        onClick={handleSubmit}
        disabled={isButtonDisabled}
        title={messages.addButtonTitle}
      >
        <AddIcon size="medium" color="white" />
      </AddButton>
    </InputContainer>
  );
};

export default InputBar; 