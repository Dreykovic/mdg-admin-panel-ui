export const formatDateTime = (
  date: string | Date | null | undefined,
  format: string = 'DD/MM/YYYY HH:mm:ss',
): string => {
  if (!date) return 'Date invalide'; // Gère les cas où date est null ou undefined

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return 'Date invalide'; // Vérifie si la date est valide

  const padZero = (num: number) => num.toString().padStart(2, '0');

  const day = padZero(dateObj.getDate());
  const month = padZero(dateObj.getMonth() + 1); // Les mois commencent à 0
  const year = dateObj.getFullYear();
  const hours = padZero(dateObj.getHours());
  const minutes = padZero(dateObj.getMinutes());
  const seconds = padZero(dateObj.getSeconds());

  // Gère différents formats si nécessaire
  switch (format) {
    case 'DD/MM/YYYY HH:mm:ss':
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    case 'YYYY-MM-DD HH:mm:ss':
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    case 'MM/DD/YYYY HH:mm':
      return `${month}/${day}/${year} ${hours}:${minutes}`;
    case 'dddd, MMMM D, YYYY HH:mm':
      return dateObj.toLocaleString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    default:
      return dateObj.toLocaleString();
  }
};

// Exemples d'utilisation
console.log(formatDateTime('2025-03-12T14:30:00')); // "12/03/2025 14:30:00"
console.log(formatDateTime(new Date(), 'dddd, MMMM D, YYYY HH:mm')); // Exemple: "Wednesday, March 12, 2025 15:45"
console.log(formatDateTime(null)); // "Date invalide"
console.log(formatDateTime(undefined)); // "Date invalide"
console.log(formatDateTime('invalid-date')); // "Date invalide"
