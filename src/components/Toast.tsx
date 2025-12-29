import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

const ToastContainer = styled(motion.div)`
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 10000;
  max-width: 400px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 10px;
    left: 10px;
    max-width: none;
  }
`;

const ToastContent = styled(motion.div)<{ $type: 'success' | 'error' }>`
  background: white;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 18px 20px;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  overflow: hidden;
  border: 1px solid
    ${({ $type }) => ($type === 'success' ? 'rgba(255, 127, 182, 0.45)' : 'rgba(31, 31, 31, 0.35)')};
  backdrop-filter: blur(6px);
`;

const CatContainer = styled(motion.div)`
  width: 54px;
  height: 54px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
`;

const CatEmoji = styled(motion.span)<{ $variant: 'light' | 'dark' }>`
  font-size: 48px;
  line-height: 1;
  display: block;
  filter: ${({ $variant }) =>
    $variant === 'dark'
      ? 'grayscale(0.15) brightness(0.7) contrast(1.05) drop-shadow(0 6px 12px rgba(0,0,0,0.25))'
      : 'drop-shadow(0 6px 12px rgba(0,0,0,0.15))'};
`;

const Message = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
`;

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <>
      {isVisible && (
        <ToastContainer
          initial={{ opacity: 0, x: 400, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 400, scale: 0.8 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <ToastContent $type={type}>
            <CatContainer>
              <CatEmoji
                $variant={type === 'error' ? 'dark' : 'light'}
                animate={{
                  y: [0, -6, 0],
                  rotate: [0, -3, 3, 0],
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              >
                {type === 'error' ? '🐶' : '🐱'}
              </CatEmoji>
            </CatContainer>
            <Message>{message}</Message>
          </ToastContent>
        </ToastContainer>
      )}
    </>
  );
};

export default Toast;
