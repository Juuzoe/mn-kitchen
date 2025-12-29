import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(6px);
  display: grid;
  place-items: center;
  z-index: 9999;
`;

const Ring = styled(motion.div)`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  animation: ${spin} 2.8s linear infinite;
`;

const Fish = styled(motion.div)<{ $color: string; $flip?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 38px;
  height: 18px;
  background: ${({ $color }) => $color};
  border-radius: 999px 999px 999px 30px;
  transform: ${({ $flip }) =>
    $flip
      ? 'translate(-50%, -50%) rotate(180deg)'
      : 'translate(-50%, -50%) rotate(0deg)'};
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.2);

  &::before {
    content: '';
    position: absolute;
    right: -14px;
    top: 2px;
    width: 14px;
    height: 14px;
    background: ${({ $color }) => $color};
    border-radius: 2px 10px 10px 2px;
    transform: rotate(25deg);
  }

  &::after {
    content: '';
    position: absolute;
    left: 8px;
    top: 6px;
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 50%;
    box-shadow: 8px 0 0 rgba(0, 0, 0, 0.35);
  }
`;

interface KoiLoaderProps {
  visible: boolean;
}

const KoiLoader: React.FC<KoiLoaderProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <Overlay>
      <Ring
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Fish
          $color="#ff7eb6"
          animate={{ y: [-6, 6, -6], x: [0, 2, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
        <Fish
          $color="#5bd0ff"
          $flip
          animate={{ y: [6, -6, 6], x: [0, -2, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.2 }}
        />
      </Ring>
    </Overlay>
  );
};

export default KoiLoader;

