import React, { useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export default function SlidePage({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHomePage = location.pathname.startsWith('/home');

  const [currentPage, setCurrentPage] = useState<'home' | 'profile'>(
    isHomePage ? 'home' : 'profile'
  );

  const lastDirection = useRef<'home-to-profile' | 'profile-to-home' | ''>('');

  useLayoutEffect(() => {
    const newPage: 'home' | 'profile' = isHomePage ? 'home' : 'profile';

    if (currentPage !== newPage) {
      lastDirection.current =
        currentPage === 'home' && newPage === 'profile' ? 'home-to-profile' : 'profile-to-home';
      setCurrentPage(newPage);
    }
  }, [isHomePage, currentPage]);

  const pageName: 'home' | 'profile' = isHomePage ? 'home' : 'profile';

  const variants: Variants = {
    initial: (custom: 'home' | 'profile') => {
      return {
        x: custom === 'home' ? '100vw' : '-100vw',
        opacity: 0,
      };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: (custom: 'home' | 'profile') => {
      return {
        x: custom === 'home' ? '100vw' : '-100vw',
        opacity: 0,
        transition: { duration: 0.2 },
      };
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        custom={pageName}
        exit="exit"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
