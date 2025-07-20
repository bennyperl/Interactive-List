import styled from 'styled-components';

interface StyledSvgProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const StyledSvg = styled.svg<StyledSvgProps>`
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
  fill: ${({ color, theme }) => color || 'currentColor'};
`;

export default StyledSvg; 