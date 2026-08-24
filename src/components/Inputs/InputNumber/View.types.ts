import type { InputHTMLAttributes } from 'react';

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  noDecimal?: boolean;
}
