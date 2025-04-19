// useKeyboardVisibility.ts
import { useEffect, useRef, useState } from 'react';

type KeyboardHandlerProps = {
  offset?: number; // Optional offset in pixels
};

export const useKeyboardVisibility = ({ offset = 85 }: KeyboardHandlerProps = {}) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Handle resize events (keyboard appearance)
  const handleResize = () => {
    if (window.visualViewport) {
      const currentHeight = window.visualViewport.height;
      const windowHeight = window.innerHeight;

      // If visual viewport is smaller than window height, keyboard is likely visible
      if (currentHeight < windowHeight) {
        setIsKeyboardVisible(true);
        if (elementRef.current) {
          elementRef.current.style.position = 'absolute';
          elementRef.current.style.bottom = 'auto';
          elementRef.current.style.top = `${currentHeight - offset}px`;
        }
      } else {
        setIsKeyboardVisible(false);
        if (elementRef.current) {
          elementRef.current.style.position = 'fixed';
          elementRef.current.style.top = 'auto';
          elementRef.current.style.bottom = '-1px';
        }
      }
    }
  };

  // Setup event listeners for keyboard visibility
  useEffect(() => {
    // Visual viewport listeners (works on most browsers)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
      handleResize(); // Initial check
    }

    // Additional window resize listener (for iOS)
    const handleWindowResize = () => {
      if (window.innerHeight < window.outerHeight) {
        handleResize();
      }
    };
    window.addEventListener('resize', handleWindowResize);

    // Cleanup event listeners
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
        window.visualViewport.removeEventListener('scroll', handleResize);
      }
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // Focus/blur event handlers
  const handleInputFocus = () => setIsKeyboardVisible(true);
  const handleInputBlur = () => setIsKeyboardVisible(false);

  // Add input field event listeners
  useEffect(() => {
    const inputFields = document.querySelectorAll('input, textarea');

    inputFields.forEach((input) => {
      input.addEventListener('focus', handleInputFocus);
      input.addEventListener('blur', handleInputBlur);
    });

    return () => {
      inputFields.forEach((input) => {
        input.removeEventListener('focus', handleInputFocus);
        input.removeEventListener('blur', handleInputBlur);
      });
    };
  }, []);

  return { isKeyboardVisible, elementRef };
};
