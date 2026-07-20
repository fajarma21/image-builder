import type { InputHTMLAttributes } from 'react';

export const normalizeColor = (
  value: InputHTMLAttributes<HTMLInputElement>['value'],
) => {
  const hex = String(value);
  const cleanHex = hex.replace('#', '').trim();

  let newHex = cleanHex;
  if (cleanHex.length === 3 || cleanHex.length === 4) {
    newHex = cleanHex
      .split('')
      .flatMap((item) => Array(2).fill(item))
      .join('');
  }

  if (newHex.length === 6) return `#${newHex}`;
  if (newHex.length === 8) return `#${newHex.slice(0, -2)}`;
  return value;
};

export const isValidHex = (hex: string) => {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(
    hex,
  );
};
