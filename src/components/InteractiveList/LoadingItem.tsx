import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 6px;
  background: transparent;
  border: 1.5px solid ${({ theme }) => theme.text}22;
  box-sizing: border-box;
`;

const LoadingText = styled.div`
  flex: 1;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.border} 25%,
    ${({ theme }) => theme.textSecondary} 50%,
    ${({ theme }) => theme.border} 75%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  margin-right: 12px;
`;

const LoadingActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

const LoadingIcon = styled.div`
  width: 20px;
  height: 20px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.border} 25%,
    ${({ theme }) => theme.textSecondary} 50%,
    ${({ theme }) => theme.border} 75%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 50%;
`;

const LoadingItem: React.FC = () => {
  return (
    <LoadingContainer>
      <LoadingText />
      <LoadingActions>
        <LoadingIcon />
        <LoadingIcon />
      </LoadingActions>
    </LoadingContainer>
  );
};

export default LoadingItem; 