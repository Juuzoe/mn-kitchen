import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useDeviceDetection } from '../hooks/useDeviceDetection';
import { useBasket } from '../context/BasketContext';
import { useToast } from '../context/ToastContext';
import { menuItems } from '../data/menuItems';
import { buildOrderPayload } from '../utils/orderGateway';

// Type assertions to fix react-icons TypeScript issue
const FaArrowLeftIcon = FaArrowLeft as React.ComponentType<{ size?: number }>;
const FaTrashIcon = FaTrash as React.ComponentType<{ size?: number }>;

const BasketContainer = styled(motion.div)<{ $isMobile: boolean }>`
  min-height: 100vh;
  ${({ $isMobile }) => $isMobile && 'min-height: -webkit-fill-available;'}
  padding: ${({ theme }) => theme.spacing.xl};
  ${({ $isMobile, theme }) => $isMobile && `
    padding-top: calc(${theme.spacing.xl} + env(safe-area-inset-top));
    padding-bottom: calc(${theme.spacing.xl} + env(safe-area-inset-bottom));
  `}
  background-color: ${({ theme }) => theme.colors.background.light};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $isMobile, theme }) => $isMobile && `
      padding: ${theme.spacing.md};
      padding-top: calc(${theme.spacing.md} + env(safe-area-inset-top));
      padding-bottom: calc(${theme.spacing.md} + env(safe-area-inset-bottom));
    `}
  }
`;

const BackButton = styled(motion.button)<{ $isMobile: boolean }>`
  position: fixed;
  top: 20px;
  ${({ $isMobile }) => $isMobile && 'top: calc(20px + env(safe-area-inset-top));'}
  left: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.secondary};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 1000;

  ${({ $isMobile }) => $isMobile && `
    min-width: 44px;
    min-height: 44px;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  `}

  &:hover {
    transform: scale(1.1);
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  
  ${({ $isMobile }) => $isMobile && `
    &:active {
      transform: scale(0.95);
    }
  `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $isMobile }) => $isMobile && `
      width: 56px;
      height: 56px;
      top: calc(16px + env(safe-area-inset-top));
      left: 16px;
    `}
  }
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const BasketItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const BasketItem = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ItemName = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const RemoveButton = styled(motion.button)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.secondary};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: scale(1.1);
  }
`;

const OrderButton = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  bottom: calc(20px + env(safe-area-inset-bottom));
  right: 20px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.secondary};
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 44px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px 24px;
    font-size: 1.1rem;
    bottom: calc(16px + env(safe-area-inset-bottom));
    right: 16px;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 16px;
`;

const ModalCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 20px;
  max-width: 480px;
  width: 100%;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

const SecondaryButton = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  color: #333;
  cursor: pointer;
  min-height: 44px;
`;

const PrimaryButton = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  min-height: 44px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
`;

const Basket: React.FC = () => {
  const { isMobile, isIPhone } = useDeviceDetection();
  const { items, removeItem, clearBasket } = useBasket();
  const { showToast } = useToast();
  const [showOrderModal, setShowOrderModal] = React.useState(false);
  const [orderComment, setOrderComment] = React.useState('');

  const handleBackClick = () => {
    window.history.back();
  };

  const handleRemoveItem = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      removeItem(itemId);
      showToast(`${item.title} removed from basket`, 'error');
    }
  };

  const handleOrderClick = () => {
    if (!items.length) {
      showToast('Your basket is empty!', 'error');
      return;
    }
    setShowOrderModal(true);
  };

  const handleSubmitOrder = () => {
    const payload = buildOrderPayload(items, orderComment);
    console.log('Order payload for Telegram gateway:', payload);
    showToast('Your order has been placed.', 'success');
    setShowOrderModal(false);
    clearBasket();
  };

  // Get unique items
  const uniqueItems = Array.from(
    new Map(
      items.map((item) => [
        `${item.id}-${JSON.stringify(item.selectedOptions || [])}`,
        item,
      ])
    ).values()
  );

  return (
    <BasketContainer
      $isMobile={isMobile || isIPhone}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BackButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleBackClick}
        $isMobile={isMobile || isIPhone}
      >
        <FaArrowLeftIcon size={24} />
      </BackButton>

      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Your Basket
      </Title>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', padding: '4rem', color: '#666' }}
        >
          <h2>Your basket is empty</h2>
          <p>Start adding items to your basket!</p>
        </motion.div>
      ) : (
        <BasketItems>
          {uniqueItems.map((item) => {
            const menuItem = menuItems.find(mi => mi.id === item.id);
            const image = menuItem?.image || item.image || '/images/breakfast/fried-eggs.png';
            const name = menuItem?.title || item.title;
            const quantity = items.filter(i => i.id === item.id && JSON.stringify(i.selectedOptions) === JSON.stringify(item.selectedOptions)).length;
            
            return (
              <BasketItem
                key={item.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <RemoveButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <FaTrashIcon size={16} />
                </RemoveButton>
                <ItemImage src={image} alt={name} />
                <ItemName>{name}</ItemName>
                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '4px' }}>
                    Quantity: {quantity}
                  </p>
                  {item.selectedOptions && (
                    <p style={{ color: '#555', fontSize: '0.9rem' }} title={`Options: ${item.selectedOptions.join(', ')}`}>
                      Options: {item.selectedOptions.join(', ')}
                    </p>
                  )}
                </div>
              </BasketItem>
            );
          })}
        </BasketItems>
      )}

      <OrderButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOrderClick}
      >
        Place Order ({items.length})
      </OrderButton>

      {showOrderModal && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowOrderModal(false)}
        >
          <ModalCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: 0 }}>Add a comment</h3>
            <p style={{ color: '#666', marginTop: 4, marginBottom: 12 }}>
              (Optional) Anything we should know before preparing your order?
            </p>
            <textarea
              value={orderComment}
              onChange={(e) => setOrderComment(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                borderRadius: '10px',
                border: '1px solid #ddd',
                padding: '10px',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
              placeholder="No onions, extra sauce, etc."
            />
            <ModalActions>
              <SecondaryButton onClick={() => setShowOrderModal(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={handleSubmitOrder}>
                Confirm Order
              </PrimaryButton>
            </ModalActions>
          </ModalCard>
        </ModalOverlay>
      )}
    </BasketContainer>
  );
};

export default Basket; 