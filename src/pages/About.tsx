import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Page = styled.main`
  max-width: 1080px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const Glow = styled(motion.div)`
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.45;
  pointer-events: none;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin: ${({ theme }) => `${theme.spacing.lg} 0 ${theme.spacing.md}`};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.2rem;
    margin-top: ${({ theme }) => theme.spacing.xl};
  }
`;

const Lead = styled(motion.div)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Section = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.background.light};
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 1.4rem;
`;

const List = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  line-height: 1.7;
`;

const BackButton = styled(motion.button)<{ $isMobile?: boolean }>`
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

const About: React.FC = () => {
  const FaArrowLeftIcon = FaArrowLeft as React.ComponentType<{ size?: number }>;
  const navigate = useNavigate();

  return (
    <Page>
      <Glow
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 0.8 }}
        style={{
          top: -60,
          right: -140,
          background: 'radial-gradient(circle at 30% 30%, rgba(255,126,182,0.5), rgba(255,95,162,0.08))',
        }}
      />
      <Glow
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        style={{
          bottom: -100,
          left: -160,
          background: 'radial-gradient(circle at 40% 40%, rgba(255,188,143,0.4), rgba(255,150,150,0.08))',
        }}
      />

      <BackButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/')}
      >
        <FaArrowLeftIcon size={24} />
      </BackButton>

      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About This Site
      </Title>

      <Lead
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p>
          This project began as a small idea between me and my fiancée. We just wanted a simple way
          to decide what to cook each day. Instead of sending messages back and forth or flipping
          through random recipes, we thought it would be nice to have a shared menu we could look
          through and quickly choose from.
        </p>
        <p>
          As I worked on it, the idea slowly grew. I didn’t want it to feel like a plain list of
          meals. I added small details to make it more enjoyable to use. You can tap on a dish to
          see its nutrition, choose custom options like extra sauce or no onions, and add it to a
          basket that remembers exactly what you picked. When you're done, the site puts the whole
          order together and gets it ready to send to Telegram.
        </p>
        <p>
          The layout works well on both desktop and mobile. I added spacing for phones, adjusted
          buttons for touch, and even added a little loading animation for iPhones. Everything is
          made to feel smooth and easy to interact with.
        </p>
        <p>
          I used React and TypeScript to build it, along with styled-components for the design and
          Framer Motion for the transitions. The site has three main pages: the home page with the
          menu, the basket page where you can review your selections, and this About page that
          explains the idea behind it.
        </p>
        <p>
          It’s something personal, but it also gave me a chance to learn, build, and enjoy the
          process. It brings together things I care about like clean design, a bit of animation,
          and tools that actually make everyday things easier.
        </p>
      </Lead>

      <Section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <SectionTitle>Nice touches you might notice</SectionTitle>
        <List>
          <li>Tap to expand nutrition and options; Add to Basket stays snappy.</li>
          <li>Basket remembers your options and preps a Telegram-ready order payload.</li>
          <li>Cat/Dog toasts for feedback; soft gradients and subtle motion throughout.</li>
          <li>Mobile spacing, safe-area padding, and touch-sized buttons.</li>
          <li>iPhone-only koi loader for a quick, playful intro.</li>
        </List>
      </Section>
    </Page>
  );
};

export default About;

