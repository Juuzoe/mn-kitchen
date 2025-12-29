import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDeviceDetection } from '../hooks/useDeviceDetection';

const HeroContainer = styled.section<{ $isMobile: boolean }>`
  height: 100vh;
  ${({ $isMobile }) => $isMobile && 'height: -webkit-fill-available;'}
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.gradient};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.xl};
  ${({ $isMobile, theme }) => $isMobile && `
    padding-top: calc(${theme.spacing.xl} + env(safe-area-inset-top));
    padding-bottom: calc(${theme.spacing.xl} + env(safe-area-inset-bottom));
  `}
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $isMobile, theme }) => $isMobile && `
      padding: ${theme.spacing.md};
      padding-top: calc(${theme.spacing.md} + env(safe-area-inset-top));
      padding-bottom: calc(${theme.spacing.md} + env(safe-area-inset-bottom));
    `}
  }
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  max-width: 600px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
`;

const ScrollIcon = styled(motion.div)`
  width: 30px;
  height: 50px;
  border: 2px solid ${({ theme }) => theme.colors.text.secondary};
  border-radius: 15px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 8px;
    background: ${({ theme }) => theme.colors.text.secondary};
    border-radius: 2px;
    animation: scroll 2s infinite;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-50%) translateY(20px);
      opacity: 0;
    }
  }
`;

const Hero: React.FC = () => {
  const { isMobile, isIPhone } = useDeviceDetection();

  return (
    <HeroContainer
      $isMobile={isMobile || isIPhone}
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        MN Kitchen
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        A kitchen for 2 partners
      </Subtitle>
      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <ScrollText>Scroll to explore</ScrollText>
        <ScrollIcon />
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default Hero; 