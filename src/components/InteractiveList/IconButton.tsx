import React from 'react';
import styled from 'styled-components';

interface IconButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  title?: string;
  disabled?: boolean;
  visible?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Button = styled.button<{ visible?: boolean; size?: string; color?: string }>`
  background: none;
  border: none;
  color: ${({ color, theme }) => color || theme.accent};
  cursor: pointer;
  margin-left: 2px;
  opacity: ${({ visible }) => (visible !== false ? 1 : 0)};
  transition: opacity 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  
  &:hover {
    color: ${({ color, theme }) => color || theme.accent};
    background: ${({ theme }) => theme.container};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: ${({ size }) => {
      switch (size) {
        case 'small': return '14px';
        case 'large': return '20px';
        default: return '16px';
      }
    }};
    height: ${({ size }) => {
      switch (size) {
        case 'small': return '14px';
        case 'large': return '20px';
        default: return '16px';
      }
    }};
  }
`;

const IconButton: React.FC<IconButtonProps> = ({ 
  children,
  onClick, 
  title, 
  disabled = false, 
  visible = true, 
  size = 'medium',
  color 
}) => {
  return (
    <Button
      onClick={onClick}
      title={title}
      disabled={disabled}
      visible={visible}
      size={size}
      color={color}
    >
      {children}
    </Button>
  );
};

export default IconButton; 