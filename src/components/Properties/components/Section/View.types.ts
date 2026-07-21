import type { ReactNode } from 'react';

export interface SectionProps {
  inline?: boolean;
  title?: string;
  children: ReactNode;
}
