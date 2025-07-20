import React from 'react';
import styled from 'styled-components';

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  padding: 40px 20px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.border} 0%, ${({ theme }) => theme.textSecondary} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
`;

const EmptyTitle = styled.h3`
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  font-weight: 600;
`;

const EmptyDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
  line-height: 1.5;
  max-width: 280px;
`;

interface EmptyStateProps {
  isReadOnly?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isReadOnly = false }) => {
  return (
    <EmptyContainer>
      <EmptyIcon>📝</EmptyIcon>
      <EmptyTitle>
        {isReadOnly ? 'No Items Available' : 'No Items Yet'}
      </EmptyTitle>
      <EmptyDescription>
        {isReadOnly 
          ? 'There are no items to display in read-only mode.'
          : 'Start by adding your first item using the input field above.'
        }
      </EmptyDescription>
    </EmptyContainer>
  );
};

export default EmptyState; 