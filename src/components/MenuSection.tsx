import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaShoppingBasket } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDeviceDetection } from '../hooks/useDeviceDetection';
import { useBasket } from '../context/BasketContext';
import { useToast } from '../context/ToastContext';
import { menuItems as allMenuItems, MenuItem as MenuItemType } from '../data/menuItems';

// Type assertion to fix react-icons TypeScript issue
const FaShoppingBasketIcon = FaShoppingBasket as React.ComponentType<{ size?: number }>;

interface MenuItemData {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  options?: string[];
}

interface MenuSectionProps {
  mealType: 'breakfast' | 'lunch' | 'dinner';
  position: 'left' | 'right';
}

// Desktop version (original)
const SectionContainer = styled.section<{ position: 'left' | 'right'; $isMobile: boolean }>`
  min-height: 100vh;
  ${({ $isMobile }) => $isMobile && 'min-height: -webkit-fill-available;'}
  padding: ${({ theme }) => theme.spacing.md};
  ${({ $isMobile, theme }) => $isMobile && `padding-bottom: calc(${theme.spacing.md} + env(safe-area-inset-bottom));`}
  display: flex;
  flex-direction: column;
  align-items: ${({ position }) => (position === 'left' ? 'flex-start' : 'flex-end')};
  background-color: ${({ theme }) => theme.colors.background.light};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $isMobile, theme }) => $isMobile && `
      padding: ${theme.spacing.sm};
      padding-bottom: calc(${theme.spacing.sm} + env(safe-area-inset-bottom));
    `}
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

// Desktop version - keep original scrollbar styling
const MenuContainer = styled.div<{ $isMobile: boolean; $isIPhone: boolean }>`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: ${({ theme }) => theme.spacing.md} 0;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;
  cursor: grab;
  scroll-behavior: smooth;
  
  /* Desktop scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.primary} transparent;
  
  &::-webkit-scrollbar {
    height: ${({ $isMobile }) => $isMobile ? '0' : '8px'};
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  /* Mobile-specific styles */
  ${({ $isMobile }) => $isMobile && `
    -webkit-overflow-scrolling: touch;
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
  }
  `}

  ${({ $isMobile }) => $isMobile && `
    cursor: default;
    touch-action: pan-x;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scroll-snap-stop: always;

    & > * {
      scroll-snap-align: start;
    }
  `}

  ${({ $isIPhone }) => $isIPhone && `
    scroll-snap-type: none;
    scroll-snap-stop: normal;
    touch-action: pan-x pan-y;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    cursor: default;
    scroll-behavior: auto;
    overflow-x: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `}

  &:active {
    cursor: grabbing;
    scroll-behavior: auto;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $isMobile, theme }) => $isMobile && `
      padding: ${theme.spacing.sm} 0 ${theme.spacing.md};
      gap: ${theme.spacing.xs};
    `}
  }

  ${({ $isIPhone }) => $isIPhone && `
    scroll-snap-type: none;
    scroll-snap-stop: normal;
    touch-action: pan-x;
    -webkit-overflow-scrolling: touch;
  `}
`;

const MenuItem = styled(motion.div)<{ $isMobile: boolean; $expanded: boolean }>`
  min-width: 300px;
  min-height: ${({ $expanded }) => ($expanded ? '440px' : '320px')};
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-right: ${({ theme }) => theme.spacing.md};
  transition: all 0.3s ease;

  ${({ $expanded, $isMobile }) => !$expanded && !$isMobile && `
    &:hover {
      transform: scale(1.01);
      z-index: 1;
    }
  `}
  
  /* Mobile-specific styles */
  ${({ $isMobile }) => $isMobile && `
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    touch-action: pan-y;
  `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $isMobile, $expanded, theme }) => $isMobile && `
      min-width: 250px;
      min-height: ${$expanded ? '360px' : '260px'};
      padding: ${theme.spacing.sm} ${theme.spacing.sm};
      margin-right: ${theme.spacing.xs};
      
      &:active {
        transform: scale(0.98);
      }
    `}
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  transition: all 0.3s ease;
  background-color: ${({ theme }) => theme.colors.background.light};
`;

const ItemTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition: all 0.3s ease;
`;

const ItemDescription = styled.p<{ $expanded: boolean }>`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  max-height: ${({ $expanded }) => ($expanded ? '120px' : '0')};
  overflow: hidden;
  transition: all 0.25s ease;
  margin-bottom: ${({ $expanded, theme }) => ($expanded ? theme.spacing.md : 0)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.95rem;
  }
`;

const AddToBasketButton = styled.button<{ $isMobile: boolean }>`
  padding: 10px 16px;
  background: linear-gradient(135deg, #ff7eb6 0%, #ff5fa2 100%);
  color: ${({ theme }) => theme.colors.text.secondary};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: auto;
  font-size: 1rem;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);

  ${({ $isMobile }) => $isMobile && `
    min-height: 44px;
    min-width: 44px;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  `}

  &:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
  }
  
  ${({ $isMobile }) => $isMobile && `
    &:active {
      transform: translateY(1px) scale(0.99);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
    }
  `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $isMobile }) => $isMobile && `
      padding: 14px 24px;
      font-size: 1.1rem;
    `}
  }
`;

const BasketButton = styled(motion.button)<{ $isMobile: boolean }>`
  position: fixed;
  bottom: 20px;
  ${({ $isMobile }) => $isMobile && 'bottom: calc(20px + env(safe-area-inset-bottom));'}
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
  
  ${({ $isMobile, theme }) => $isMobile && `
    &:active {
      transform: scale(0.95);
    }
  `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $isMobile }) => $isMobile && `
      width: 56px;
      height: 56px;
      bottom: calc(16px + env(safe-area-inset-bottom));
      left: 16px;
    `}
  }
`;

const OptionsOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
  display: grid;
  place-items: center;
  z-index: 2000;
`;

const OptionsCard = styled(motion.div)`
  width: 320px;
  max-width: calc(100% - 32px);
  background: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 16px;
  padding: 18px 20px;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.18);
`;

const OptionsList = styled.div`
  display: grid;
  gap: 10px;
  margin: 12px 0 18px;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
  }
`;

const OptionsActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    padding: 8px 14px;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.08);
    cursor: pointer;
    background: ${({ theme }) => theme.colors.background.dark};
    color: ${({ theme }) => theme.colors.text.secondary};
    transition: all 0.2s ease;
  }

  button:last-child {
    background: linear-gradient(135deg, #ff7eb6 0%, #ff5fa2 100%);
    color: ${({ theme }) => theme.colors.text.secondary};
    border: none;
  }

  button:hover {
    transform: translateY(-1px);
  }
`;

const MenuSection: React.FC<MenuSectionProps> = ({ mealType, position }) => {
  const { isMobile, isIPhone } = useDeviceDetection();
  const { addItem } = useBasket();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const [isUserInteracting, setIsUserInteracting] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState<number | null>(null);
  const [optionsItem, setOptionsItem] = React.useState<MenuItemType | null>(null);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [showOptions, setShowOptions] = React.useState(false);
  const resolveSrc = (src: string) =>
    src?.startsWith('http') ? src : `${process.env.PUBLIC_URL || ''}${src}`;
  const autoScrollRef = React.useRef<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isIPhone) return;
    setIsDragging(true);
    setIsUserInteracting(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isIPhone || !isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.1; // Slightly gentler drag
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (isIPhone) return;
    setIsDragging(false);
    // Resume auto-scroll after a delay
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 3000);
  };

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isIPhone) return; // native scroll, no custom drag
    setIsUserInteracting(true);
    if (containerRef.current) {
      setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isIPhone || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.1;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    if (isIPhone) return;
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 3000);
  };

  // Improved auto-scroll with smooth animation
  useEffect(() => {
    if (!containerRef.current || isHovering || isUserInteracting) {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
        autoScrollRef.current = null;
      }
      return;
    }

    const smoothScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (maxScroll <= 0) return;

        // Smooth, slow auto-scroll (0.5px per frame ≈ 30px/second at 60fps)
        container.scrollLeft += 0.5;
        
        if (container.scrollLeft >= maxScroll) {
          // Smoothly return to start
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          autoScrollRef.current = requestAnimationFrame(smoothScroll);
        }
      }
    };

    autoScrollRef.current = requestAnimationFrame(smoothScroll);

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, [isHovering, isUserInteracting]);

  // Pause auto-scroll on wheel/scroll events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = () => {
      setIsUserInteracting(true);
      setTimeout(() => {
        setIsUserInteracting(false);
      }, 3000);
    };

    container.addEventListener('wheel', handleWheel);
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const handleBasketClick = () => {
    navigate('/basket');
  };

  const handleAddToBasket = (item: MenuItemData) => {
    const foundItem = allMenuItems.find(mi => mi.id === item.id);
    const needsOptions = foundItem?.options && foundItem.options.length > 0;

    if (needsOptions && foundItem) {
      setOptionsItem(foundItem);
      setSelectedOptions([]);
      setShowOptions(true);
      return;
    }

    if (foundItem) {
      addItem(foundItem);
      showToast(`${item.name} added to basket!`, 'success');
    } else {
      const fallbackItem: MenuItemType = {
        id: item.id,
        title: item.name,
        description: item.description,
        calories: 250,
        image: item.image,
        recipeUrl: '#',
        category: mealType,
      };
      addItem(fallbackItem);
      showToast(`${item.name} added to basket!`, 'success');
    }
  };

  const confirmOptions = () => {
    if (!optionsItem) return;
    const chosen = selectedOptions.length ? selectedOptions : ['None'];
    addItem({ ...optionsItem, selectedOptions: chosen });
    showToast(`${optionsItem.title} added to basket!`, 'success');
    setOptionsItem(null);
    setSelectedOptions([]);
    setShowOptions(false);
  };

  const closeOptions = () => {
    setOptionsItem(null);
    setSelectedOptions([]);
    setShowOptions(false);
  };

  const menuItems: MenuItemData[] = React.useMemo(() => {
    switch (mealType) {
      case 'breakfast':
        return [
          { id: 1, name: 'Fried Eggs', description: 'Sunny-side-up eggs with a runny yolk, fresh herbs', price: 8.99, image: '/images/breakfast/01_classic_fried_eggs_from_upload.webp' },
          { id: 2, name: 'Omelette', description: 'Soft omelette with your choice of cheese and veggies', price: 10.99, image: '/images/breakfast/02_fluffy_omelette_plain_bg.webp' },
          { id: 3, name: 'Croutons', description: 'Crunchy toasted bread cubes, great on salads or to snack on', price: 4.99, image: '/images/breakfast/03_golden_croutons_rect_bg.webp' },
          { id: 4, name: 'Bacon', description: 'Thick-cut bacon, crisp edges and still juicy', price: 9.99, image: '/images/breakfast/04_crispy_bacon_bg.webp' },
          { id: 5, name: 'Pancakes', description: 'Stack of pancakes with maple syrup and berries', price: 7.99, image: '/images/breakfast/05_fluffy_pancakes_bg.webp' },
          { id: 6, name: 'Syrniki', description: 'Cottage cheese pancakes, served with sour cream and jam', price: 8.99, image: '/images/breakfast/06_syrniki_bg.webp' },
          { id: 7, name: 'Oatmeal', description: 'Warm oats with cinnamon and a touch of brown sugar', price: 6.99, image: '/images/breakfast/07_creamy_oatmeal_bg.webp' },
        ];
      case 'lunch':
        return [
          { id: 8, name: 'Caesar Salad', description: 'Romaine, croutons, parmesan, and creamy Caesar dressing', price: 12.99, image: '/images/lunch/08_classic_caesar_salad_bg.webp' },
          { id: 9, name: 'Olivier Salad', description: 'Potatoes, carrots, peas, pickles, and mayo (classic CIS style)', price: 11.99, image: '/images/lunch/09_olivier_salad_from_upload.webp' },
          { id: 10, name: 'Salad Tomato & Onion', description: 'Fresh tomatoes and red onion with a light vinaigrette', price: 8.99, image: '/images/lunch/10_tomato_onion_salad_uzbek_bg.webp' },
          { id: 11, name: 'Salad Tomato & Cucumber', description: 'Tomatoes and cucumbers with herbs and olive oil', price: 8.99, image: '/images/lunch/11_tomato_cucumber_salad_bg.webp' },
          { id: 12, name: 'Plain Rice', description: 'Simple long-grain rice, fluffy and light', price: 5.99, image: '/images/lunch/12_steamed_rice_bg.webp' },
          { id: 13, name: 'Pasta with Butter', description: 'Al dente pasta tossed with butter and herbs', price: 9.99, image: '/images/lunch/13_buttered_pasta_from_upload.webp' },
          { id: 14, name: 'Fried Potatoes', description: 'Fried potato slices: crispy outside, soft inside', price: 7.99, image: '/images/lunch/14_crispy_fried_potatoes_slices_from_upload.webp' },
          { id: 15, name: 'Mashed Potatoes', description: 'Smooth mash with butter and cream', price: 6.99, image: '/images/lunch/15_creamy_mashed_potatoes_bg.webp' },
          { id: 16, name: 'Various Pita Bread', description: 'Warm pita with a mix of fillings/spreads (varies)', price: 4.99, image: '/images/lunch/16_assorted_pita_bread_bg.webp' },
          { id: 29, name: 'Lagman (Ugro-Osh)', description: 'Hand-pulled noodles in a rich beef-and-veg broth', price: 13.99, image: '/images/lunch/ugra_osh.webp' },
          { id: 30, name: 'Borsht', description: 'Beet soup with cabbage, potatoes, and beef', price: 11.99, image: '/images/lunch/borsht.webp' },
          { id: 31, name: 'Chicken Stock', description: 'Clear chicken broth with herbs and veg', price: 8.99, image: '/images/lunch/chicken-stock.webp' },
          { id: 32, name: 'Plov', description: 'Uzbek rice pilaf with lamb, carrots, onions, and spices', price: 14.99, image: '/images/lunch/plov.webp' },
          { id: 33, name: 'Garlic Bread', description: 'Toasted bread with garlic butter and herbs', price: 5.99, image: '/images/lunch/garlic_bread.webp' },
          { id: 34, name: 'Chicken Skewers', description: 'Marinated chicken skewers with peppers and onions', price: 12.99, image: '/images/lunch/chicken_skewers.webp' },
        ];
      case 'dinner':
        return [
          { id: 17, name: 'Carbonara', description: 'Creamy carbonara-style pasta with egg, cheese, and pancetta', price: 15.99, image: '/images/dinner/17_spaghetti_carbonara_bg.webp' },
          { id: 18, name: 'Ravioli', description: 'Stuffed ravioli with your choice of filling', price: 16.99, image: '/images/dinner/18_homemade_ravioli_bg.webp' },
          { id: 19, name: 'Cheese Pasta', description: 'Pasta in a rich, cheesy sauce', price: 14.99, image: '/images/dinner/19_four_cheese_pasta_bg.webp' },
          { id: 20, name: 'Sweet and Sour Chicken', description: 'Crispy chicken in a sweet-and-sour glaze', price: 16.99, image: '/images/dinner/20_sweet_and_sour_chicken_bg.webp' },
          { id: 21, name: 'Salmon', description: 'Salmon fillet with seasonal veg on the side', price: 22.99, image: '/images/dinner/21_grilled_salmon_bg.webp' },
          { id: 22, name: 'Burger', description: 'Beef burger with the usual fixings (bun, sauce, toppings)', price: 13.99, image: '/images/dinner/22_classic_burger_pixel_bg.webp' },
          { id: 23, name: 'Steak', description: 'Ribeye cooked your way, served with roasted vegetables', price: 24.99, image: '/images/dinner/23_ribeye_steak_bg.webp' },
          { id: 24, name: 'Fried Dumplings', description: 'Pan-fried dumplings with a pork-and-veg filling', price: 12.99, image: '/images/dinner/24_fried_dumplings_gyoza_bg.webp' },
          { id: 25, name: 'Boiled Dumplings', description: 'Classic boiled dumplings with a savory filling', price: 11.99, image: '/images/dinner/25_boiled_dumplings_pelmeni_bowl_bg.webp' },
          { id: 26, name: 'Sausages in Batter', description: 'Sausages in a crispy batter with dipping sauce', price: 10.99, image: '/images/dinner/26_sausages_in_batter_bg.webp' },
          { id: 27, name: 'Seafood Pasta in Cream Sauce', description: 'Mixed seafood pasta in a creamy white wine sauce', price: 19.99, image: '/images/dinner/27_seafood_pasta_bg.webp' },
          { id: 28, name: 'Meatballs', description: 'Meatballs in creamy gravy with lingonberry jam', price: 14.99, image: '/images/dinner/28_swedish_meatballs_only_bg.webp' },
          { id: 35, name: 'Spaghetti Bolognese', description: 'Slow-cooked beef ragù over al dente spaghetti', price: 15.99, image: '/images/dinner/bolognese.webp' },
          { id: 36, name: 'Tempura Shrimps', description: 'Lightly battered shrimp fried until crisp', price: 17.99, image: '/images/dinner/tempura_shrimps.webp' },
          { id: 37, name: 'Sushi Assortment', description: 'Nigiri and maki selection with fresh fish', price: 18.99, image: '/images/dinner/sushi.webp' },
          { id: 38, name: 'Pizza Margherita', description: 'Neapolitan pizza with tomato, mozzarella, and basil', price: 13.99, image: '/images/dinner/pizza_margherita.webp' },
          { id: 39, name: 'Pizza Pepperoni', description: 'Crispy pizza with tomato, mozzarella, and pepperoni', price: 14.99, image: '/images/dinner/pizza_pepperoni.webp' },
        ];
      default:
        return [];
    }
  }, [mealType]);

  return (
    <SectionContainer position={position} $isMobile={isMobile || isIPhone}>
      <SectionTitle
        initial={{ opacity: 0, x: position === 'left' ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
      </SectionTitle>
      <MenuContainer
        ref={containerRef}
        $isMobile={isMobile || isIPhone}
        $isIPhone={isIPhone}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={item.id}
            $isMobile={isMobile || isIPhone}
            $expanded={expandedId === item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
            <ItemImage src={resolveSrc(item.image)} alt={item.name} />
            <ItemTitle>{item.name}</ItemTitle>
            <ItemDescription $expanded={expandedId === item.id}>{item.description}</ItemDescription>
            {expandedId === item.id && (() => {
              const fullItem = allMenuItems.find(mi => mi.id === item.id);
              return (
                <div
                  style={{
                    marginTop: '6px',
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'rgba(0,0,0,0.03)',
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
                    fontSize: '0.95rem',
                    color: '#444',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '6px' }}>Nutrition</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px', marginBottom: '6px' }}>
                    <span>{(fullItem?.nutrition?.calories ?? fullItem?.calories ?? '—')} kcal</span>
                    <span>Protein: {fullItem?.nutrition?.protein ?? '—'} g</span>
                    <span>Carbs: {fullItem?.nutrition?.carbs ?? '—'} g</span>
                    <span>Fat: {fullItem?.nutrition?.fat ?? '—'} g</span>
                  </div>
                  {fullItem?.options && (
                    <div style={{ marginTop: '6px' }}>
                      <strong>Options:</strong> {fullItem.options.join(', ')}
                    </div>
                  )}
                </div>
              );
            })()}
            <AddToBasketButton 
              $isMobile={isMobile || isIPhone}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToBasket(item);
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              Add to Basket
            </AddToBasketButton>
          </MenuItem>
        ))}
      </MenuContainer>
      <BasketButton
        $isMobile={isMobile || isIPhone}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleBasketClick}
      >
        <FaShoppingBasketIcon size={24} />
      </BasketButton>
      {showOptions && optionsItem && (
        <OptionsOverlay onClick={closeOptions}>
          <OptionsCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: 0 }}>Choose options</h3>
            <p style={{ color: '#666', marginTop: 4, marginBottom: 12 }}>{optionsItem.title}</p>
            <OptionsList>
              {optionsItem.options?.map(opt => (
                <label key={opt}>
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(opt)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOptions(prev => [...prev, opt]);
                      } else {
                        setSelectedOptions(prev => prev.filter(o => o !== opt));
                      }
                    }}
                  />
                  {opt}
                </label>
              ))}
            </OptionsList>
            <OptionsActions>
              <button onClick={closeOptions}>Cancel</button>
              <button onClick={confirmOptions}>Add</button>
            </OptionsActions>
          </OptionsCard>
        </OptionsOverlay>
      )}
    </SectionContainer>
  );
};

export default MenuSection; 