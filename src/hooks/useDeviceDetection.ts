import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isIOS: boolean;
  isIPhone: boolean;
  isTablet: boolean;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isIOS: false,
    isIPhone: false,
    isTablet: false,
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      
      // Check for iOS
      const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
      
      // Check for iPhone specifically
      const isIPhone = /iPhone/.test(userAgent) && !(window as any).MSStream;
      
      // Check for mobile devices by user agent
      const isMobileByUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
      // Check screen width - only consider mobile if width is small AND it's a touch device
      const width = window.innerWidth;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileByWidth = width <= 768 && hasTouch;
      
      // Only set as mobile if user agent says mobile OR (small width AND touch device)
      const isMobile = isMobileByUA || isMobileByWidth;
      
      // Check for tablet
      const isTablet = /iPad|Android/i.test(userAgent) && !isMobileByUA && width > 768 && width <= 1024;
      
      setDeviceInfo({
        isMobile,
        isIOS,
        isIPhone,
        isTablet,
      });
    };

    detectDevice();
    
    // Re-detect on resize
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  return deviceInfo;
};
