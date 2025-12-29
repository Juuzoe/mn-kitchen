import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useBasket } from '../context/BasketContext';

const BasketContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background.light};
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const BasketItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BasketItem = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ItemTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ItemDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ItemCalories = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const RemoveButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.secondary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Summary = styled.div`
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const SummaryTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SummaryText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ClearButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.secondary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const EmptyBasket = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const EmptyText = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Basket: React.FC = () => {
  const { items, removeItem, clearBasket, totalItems, totalCalories } = useBasket();

  return (
    <BasketContainer>
      <Title>Your Basket</Title>
      {items.length > 0 ? (
        <>
          <BasketItems>
            {items.map((item) => (
              <BasketItem
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ItemImage 
                  src={process.env.PUBLIC_URL + item.image} 
                  alt={item.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = process.env.PUBLIC_URL + '/images/placeholder.png';
                  }}
                />
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
                <ItemCalories>{item.calories} kcal</ItemCalories>
                <RemoveButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </RemoveButton>
              </BasketItem>
            ))}
          </BasketItems>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryText>Total Items: {totalItems}</SummaryText>
            <SummaryText>Total Calories: {totalCalories} kcal</SummaryText>
            <ClearButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearBasket}
            >
              Clear Basket
            </ClearButton>
          </Summary>
        </>
      ) : (
        <EmptyBasket>
          <EmptyText>Your basket is empty</EmptyText>
        </EmptyBasket>
      )}
    </BasketContainer>
  );
};

export default Basket; 