import { ValidationRule } from './validationFunction';

// Regex validation - only allows email format
export const regex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

// Email validation object with 2-second delay
export const emailValidation: ValidationRule = {
  validate: async (value: string): Promise<boolean> => {
    const emailRegex = new RegExp(regex);
    return emailRegex.test(value);
  },
  errorMessage: 'Please enter a valid email address (e.g., user@example.com).'
}; 