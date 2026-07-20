import type { ChangeEvent, InputHTMLAttributes } from 'react';

export interface UseInputParams {
  inputData: InputHTMLAttributes<HTMLInputElement>;
  callback: (
    e: ChangeEvent<HTMLInputElement>,
  ) => void | ChangeEvent<HTMLInputElement>;
}
