export const isRequired = (value: string): boolean => {
  return value.trim() !== '';
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 他のバリデーション関数をここに追加できます