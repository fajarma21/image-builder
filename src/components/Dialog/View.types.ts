import type { ReactNode } from 'react';

export interface DialogProps {
  children: ReactNode;
  display: boolean;
  closeText?: string;
  onSubmit?: () => void;
  onClose: () => void;
}
