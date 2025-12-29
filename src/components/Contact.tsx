import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const ContactContainer = styled.section`
  min-height: 50vh;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.dark};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ContactTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const SocialLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 2rem;
  transition: color ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Contact: React.FC = () => {
  return (
    <ContactContainer>
      <ContactTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Me
      </ContactTitle>
      <SocialLinks>
        <SocialLink
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          {FaGithub({ size: "1em" })}
        </SocialLink>
        <SocialLink
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          {FaLinkedin({ size: "1em" })}
        </SocialLink>
        <SocialLink
          href="mailto:your.email@example.com"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          {FaEnvelope({ size: "1em" })}
        </SocialLink>
      </SocialLinks>
    </ContactContainer>
  );
};

export default Contact; 