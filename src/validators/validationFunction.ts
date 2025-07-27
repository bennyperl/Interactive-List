// Validation object structure
export interface ValidationRule {
  validate: (value: string) => Promise<boolean>;
  errorMessage: string;
}

// Custom validation - only allows items with length > 3
export const validationFunction: ValidationRule = {
  validate: async (value: string): Promise<boolean> => {
    return value.length > 3;
  },
  errorMessage: 'Item must be longer than 3 characters. Please enter a longer text.'
}; 