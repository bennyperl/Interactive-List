import React from 'react';
import styled from 'styled-components';
import ItemActions from './ItemActions';

const ItemContainer = styled.div<{ isHovered?: boolean }>`
  width: 100%;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-radius: 6px;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 1.5px solid ${({ theme }) => theme.text}22;
  transition: background 0.2s, border-color 0.2s;
  position: relative;
  &:hover {
    background: ${({ theme }) => theme.container};
    border-color: ${({ theme }) => theme.accent};
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const ValueText = styled.span`
  flex: 1;
  font-size: 1rem;
  word-break: break-all;
  text-align: left;
`;

const IconsWrapper = styled.div<{ isHovered?: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 12px;
  opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
  transition: opacity 0.2s;
  gap: 0;
`;

interface ListItemProps {
  value: string;
  onEdit: () => void;
  isHovered?: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ 
  value, 
  onEdit, 
  isHovered,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <ItemContainer 
      isHovered={isHovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ValueText>{value}</ValueText>
      <IconsWrapper isHovered={isHovered}>
        <ItemActions onEdit={onEdit} />
      </IconsWrapper>
    </ItemContainer>
  );
};

export default ListItem;