import React from 'react';
import StyledSvg from './StyledSvg';

interface IconWrapperProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  viewBox?: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ 
  children, 
  size = 'medium', 
  color, 
  viewBox = "0 0 24 24" 
}) => (
  <StyledSvg viewBox={viewBox} size={size} color={color}>
    {children}
  </StyledSvg>
);

export default IconWrapper; 