import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { RoutesConfigType } from '@/types/routes-type';

type Props = {
  routes: RoutesConfigType;
};

const RouteProvider = ({ routes }: Props) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="popLayout">
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
        <Routes location={location} key={location.key}>
          {Object.keys(routes).map((key) => (
            <Route
              key={key}
              index={key === 'home' || key === 'login'}
              path={routes[key].path}
              element={routes[key].component}
            />
          ))}
          <Route path="*" element={<Navigate to={'/'} replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default RouteProvider;
