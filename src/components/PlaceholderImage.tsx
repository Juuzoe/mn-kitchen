import React from 'react';
import styled from 'styled-components';

interface PlaceholderImageProps {
  title: string;
  category: 'breakfast' | 'lunch' | 'dinner';
}

const ImageContainer = styled.div<{ category: string }>`
  width: 100%;
  height: 200px;
  background-color: ${({ category, theme }) => {
    switch (category) {
      case 'breakfast':
        return theme.colors.primary;
      case 'lunch':
        return theme.colors.secondary;
      case 'dinner':
        return '#FF6B6B';
      default:
        return '#CCCCCC';
    }
  }};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  padding: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ title, category }) => {
  return (
    <ImageContainer category={category}>
      {title}
    </ImageContainer>
  );
};

export default PlaceholderImage; 