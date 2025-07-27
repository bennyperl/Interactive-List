import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import AddIcon from '../../icons/AddIcon';
import SpinnerIcon from '../../icons/SpinnerIcon';
import ErrorIcon from '../../icons/ErrorIcon';
import { messages } from '../../messages';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 16px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const Input = styled.input<{ disabled?: boolean; hasError?: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid ${({ disabled, hasError, theme }) => 
    hasError ? theme.delete : 
    disabled ? theme.disabled : theme.border};
  border-radius: 6px;
  background: ${({ disabled, theme }) => disabled ? theme.disabled + '20' : theme.input};
  color: ${({ disabled, theme }) => disabled ? theme.textSecondary : theme.text};
  font-size: 14px;
  transition: border-color 0.2s ease;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'text'};

  &:focus {
    outline: none;
    border-color: ${({ disabled, hasError, theme }) => 
      hasError ? theme.delete : 
      disabled ? theme.disabled : theme.primary};
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

const ErrorMessage = styled.div<{ show: boolean }>`
  color: ${({ theme }) => theme.delete};
  font-size: 12px;
  font-weight: 500;
  margin-left: 4px;
  opacity: ${({ show }) => show ? 1 : 0};
  transition: opacity 0.2s ease;
  min-height: 16px;
`;

interface InputBarProps {
  onAddItem: (value: string) => Promise<boolean>;
  placeholder?: string;
  disabled?: boolean;
  validationError?: boolean;
  isLoading?: boolean;
  validationType?: 'custom' | 'regex' | 'none';
  errorMessage?: string;
}

const handleInputChange = (setInputValue: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value);
};

const InputBar: React.FC<InputBarProps> = ({ 
  onAddItem, 
  placeholder = messages.inputPlaceholder,
  disabled = false,
  validationError = false,
  isLoading = false,
  validationType = 'none',
  errorMessage = ''
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue || disabled || isSubmitting || isLoading) return;

    setIsSubmitting(true);
    
    try {
      const success = await onAddItem(trimmedValue);
      if (success) {
        setInputValue('');
        inputRef.current?.focus();
      }
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

  const isButtonDisabled = !inputValue.trim() || disabled || isSubmitting || isLoading;

  const renderButtonIcon = () => {
    if (isLoading) {
      return <SpinnerIcon size="medium" color="white" />;
    }
    if (validationError) {
      return <ErrorIcon size="medium" color="white" />;
    }
    return <AddIcon size="medium" color="white" />;
  };

  const getErrorMessage = () => {
    if (validationError && errorMessage) {
      return errorMessage;
    }
    return '';
  };

  return (
    <InputContainer>
      <InputRow>
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange(setInputValue)}
          onKeyDown={handleKeyPress}
          placeholder={disabled ? messages.readOnlyPlaceholder : placeholder}
          disabled={disabled}
          hasError={validationError}
        />
        <AddButton 
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          title={messages.addButtonTitle}
        >
          {renderButtonIcon()}
        </AddButton>
      </InputRow>
      <ErrorMessage show={validationError}>
        {getErrorMessage()}
      </ErrorMessage>
    </InputContainer>
  );
};

export default InputBar; 