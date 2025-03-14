import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
const AnimatedOutlet = () => {
  const location = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        {element && React.cloneElement(element, { key: location.pathname })}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedOutlet;
