import React from 'react';
import IconWrapper from './IconWrapper';

interface AddIconProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const AddIcon: React.FC<AddIconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </IconWrapper>
);

export default AddIcon; 