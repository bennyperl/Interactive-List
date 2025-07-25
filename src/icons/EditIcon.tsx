import React from 'react';
import IconWrapper from './IconWrapper';

interface EditIconProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const EditIcon: React.FC<EditIconProps> = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </IconWrapper>
);

export default EditIcon; 