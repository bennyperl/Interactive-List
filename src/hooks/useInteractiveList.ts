import { useState, useCallback, useEffect } from 'react';
import Chance from 'chance';
import { messages } from '../messages';
import { ValidationRule } from '../validators/validationFunction';

interface ListItemData {
  id: string;
  value: string;
}

interface UseInteractiveListProps {
  initialItems?: ListItemData[];
  customValidation?: ValidationRule;
  regexValidation?: string;
}

// Initialize chance instance
const chance = new Chance();

export const useInteractiveList = ({ 
  initialItems = [], 
  customValidation,
  regexValidation 
}: UseInteractiveListProps = {}) => {
  const [items, setItems] = useState<ListItemData[]>(initialItems);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<boolean>(false);
  const [isValidationLoading, setIsValidationLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Update items when initialItems change
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const validateValue = useCallback(async (value: string): Promise<boolean> => {
    if (!customValidation && !regexValidation) {
      return true; // No validation required
    }

    setIsValidationLoading(true);
    setValidationError(false);
    setErrorMessage('');

    try {
      // Simulate server delay of 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      let isValid = true;

      if (customValidation) {
        // Custom validation object - get error message directly from it
        const result = await customValidation.validate(value);
        isValid = result;
        if (!isValid) {
          setErrorMessage(customValidation.errorMessage);
        }
      } else if (regexValidation) {
        // Regex validation (legacy support)
        const regex = new RegExp(regexValidation);
        isValid = regex.test(value);
        if (!isValid) {
          setErrorMessage('Value does not match the required pattern');
        }
      }

      setValidationError(!isValid);
      return isValid;
    } catch (error) {
      console.error('Validation error:', error);
      setValidationError(true);
      setErrorMessage('Validation error occurred');
      return false;
    } finally {
      setIsValidationLoading(false);
    }
  }, [customValidation, regexValidation]);

  // Separate validation function for editing that doesn't set global error state
  const validateValueForEdit = useCallback(async (value: string): Promise<{ isValid: boolean; errorMessage: string }> => {
    if (!customValidation && !regexValidation) {
      return { isValid: true, errorMessage: '' };
    }

    try {
      // Simulate server delay of 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      let isValid = true;
      let errorMsg = '';

      if (customValidation) {
        // Custom validation object - get error message directly from it
        const result = await customValidation.validate(value);
        isValid = result;
        if (!isValid) {
          errorMsg = customValidation.errorMessage;
        }
      } else if (regexValidation) {
        // Regex validation (legacy support)
        const regex = new RegExp(regexValidation);
        isValid = regex.test(value);
        if (!isValid) {
          errorMsg = 'Value does not match the required pattern';
        }
      }

      return { isValid, errorMessage: errorMsg };
    } catch (error) {
      console.error('Validation error:', error);
      return { isValid: false, errorMessage: 'Validation error occurred' };
    }
  }, [customValidation, regexValidation]);

  const handleEdit = useCallback(async (itemId: string, newValue: string): Promise<{ success: boolean; errorMessage?: string }> => {
    // Apply validation to edited value using the edit-specific validation
    const { isValid, errorMessage: editErrorMessage } = await validateValueForEdit(newValue);
    
    if (!isValid) {
      // Set global error state for edit validation so error message appears at top
      setValidationError(true);
      setErrorMessage(editErrorMessage);
      return { success: false, errorMessage: editErrorMessage };
    }

    // Clear any previous error state when validation passes
    setValidationError(false);
    setErrorMessage('');

    // Only update item if validation passes
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, value: newValue } : item
    ));
    return { success: true };
  }, [validateValueForEdit]);

  const handleDelete = useCallback((itemId: string) => {
    const item = items.find(item => item.id === itemId);
    if (!item) return;

    const confirmed = window.confirm(messages.listItem.deleteConfirmation(item.value));
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

  const addItem = useCallback(async (value: string): Promise<boolean> => {
    const isValid = await validateValue(value);
    
    if (!isValid) {
      return false; // Don't add item if validation fails
    }

    const newItem: ListItemData = {
      id: chance.guid(),
      value: value.trim()
    };
    setItems(prev => [...prev, newItem]);
    return true; // Item was successfully added
  }, [validateValue]);

  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  const clearValidationErrors = useCallback(() => {
    setValidationError(false);
    setIsValidationLoading(false);
    setErrorMessage('');
  }, []);

  return {
    items,
    hoveredItemId,
    handleEdit,
    handleDelete,
    handleMouseEnter,
    handleMouseLeave,
    addItem,
    clearItems,
    clearValidationErrors,
    validationError,
    isValidationLoading,
    errorMessage
  };
}; 