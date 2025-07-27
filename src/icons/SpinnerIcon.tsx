import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div<{ size?: 'small' | 'medium' | 'large'; color?: string }>`
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
  border: 2px solid transparent;
  border-top: 2px solid ${({ color }) => color || 'white'};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  display: inline-block;
`;

interface SpinnerIconProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const SpinnerIcon: React.FC<SpinnerIconProps> = ({ size, color }) => (
  <SpinnerContainer size={size} color={color} />
);

export default SpinnerIcon; 