import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './theme';
import { Hero, MenuSection, Basket, Footer } from './components';
import About from './pages/About';
import { BasketProvider } from './context/BasketContext';
import { ToastProvider } from './context/ToastContext';
import KoiLoader from './components/KoiLoader';
import { useDeviceDetection } from './hooks/useDeviceDetection';

const App: React.FC = () => {
  const { isIOS } = useDeviceDetection();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <BasketProvider>
          <ToastProvider>
            <GlobalStyle />
            <KoiLoader visible={isIOS && isLoading} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Hero />
                      <MenuSection mealType="breakfast" position="left" />
                      <MenuSection mealType="lunch" position="right" />
                      <MenuSection mealType="dinner" position="left" />
                    </>
                  }
                />
                <Route path="/basket" element={<Basket />} />
                <Route path="/about" element={<About />} />
              </Routes>
              <Footer />
            </motion.div>
          </ToastProvider>
        </BasketProvider>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
