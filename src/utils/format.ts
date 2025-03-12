import dayjs from 'dayjs';

export const formatDateTime = (
  date: string | Date | null | undefined,
  format: string = 'DD/MM/YYYY HH:mm:ss',
): string => {
  if (!date) return 'Date invalide'; // Gère les cas où date est null ou undefined
  return dayjs(date).format(format);
};

// Exemples d'utilisation
console.log(formatDateTime('2025-03-12T14:30:00')); // "12/03/2025 14:30:00"
console.log(formatDateTime(new Date(), 'dddd, MMMM D, YYYY HH:mm'));
// Exemple: "Wednesday, March 12, 2025 15:45"
console.log(formatDateTime(null)); // "Date invalide"
console.log(formatDateTime(undefined)); // "Date invalide"
