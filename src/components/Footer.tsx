import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FooterContainer = styled.footer`
  margin-top: 80px;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.dark};
  color: ${({ theme }) => theme.colors.text.secondary};
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h4 {
    margin: 0;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
  }

  span {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
  }
`;

const Links = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const IconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: all 0.2s ease;
  min-height: 44px;
  min-width: 44px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text.secondary};
    transform: translateY(-2px);
  }
`;

const TextLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  min-width: 44px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: rgba(255, 255, 255, 0.07);
    transform: translateY(-1px);
  }
`;

const Footer: React.FC = () => {
  const FaGithubIcon = FaGithub as React.ComponentType<{ size?: number }>;
  const FaLinkedinIcon = FaLinkedin as React.ComponentType<{ size?: number }>;
  const FaInfoIcon = FaInfoCircle as React.ComponentType<{ size?: number }>;
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <FooterInner>
        <Brand>
          <h4>MN Kitchen</h4>
          <span>Enjoy the menu, reach me anytime.</span>
        </Brand>

        <Links>
          <IconLink
            href="https://github.com/Juuzoe"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithubIcon size={20} />
          </IconLink>
          <IconLink
            href="https://www.linkedin.com/in/maksym-gavrylenko/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIcon size={20} />
          </IconLink>
          <TextLink onClick={() => navigate('/about')}>
            <FaInfoIcon size={18} />
            About
          </TextLink>
        </Links>
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;

