import React from 'react';
import IconWrapper from './IconWrapper';

interface DeleteIconProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const DeleteIcon: React.FC<DeleteIconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </IconWrapper>
);

export default DeleteIcon; 