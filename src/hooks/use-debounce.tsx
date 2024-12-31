import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Annuler le précédent timeout si l'utilisateur tape avant la fin du délai
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
