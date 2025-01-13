import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const Star = ({ style }) => (
  <motion.div
    style={{
      position: 'absolute',
      width: '2px',
      height: '2px',
      background: '#fff',
      borderRadius: '50%',
      ...style,
    }}
    animate={{
      opacity: [0.2, 1, 0.2],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration: Math.random() * 3 + 2,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const GalaxyBackground = () => {
  const containerRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const generateStars = () => {
      const stars = [];
      for (let i = 0; i < 100; i++) {
        stars.push({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
        });
      }
      starsRef.current = stars;
    };

    generateStars();
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, #0b0033 0%, #1a1a40 100%)',
        overflow: 'hidden',
        zIndex: -1,
      }}
    >
      {starsRef.current.map((star, index) => (
        <Star key={index} style={star} />
      ))}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(94, 114, 235, 0.1) 0%, rgba(11, 0, 51, 0.1) 100%)',
          filter: 'blur(80px)',
        }}
      />
    </Box>
  );
};

export default GalaxyBackground; 