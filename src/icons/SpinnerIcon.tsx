import React from 'react';
import styled, { keyframes } from 'styled-components';
import IconWrapper from './IconWrapper';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const AnimatedIconWrapper = styled(IconWrapper)`
  animation: ${spin} 1s linear infinite;
`;

interface SpinnerIconProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const SpinnerIcon: React.FC<SpinnerIconProps> = ({ size, color }) => (
  <AnimatedIconWrapper size={size} color={color}>
    <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"/>
  </AnimatedIconWrapper>
);

export default SpinnerIcon; 