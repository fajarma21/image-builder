import type { ChangeEventHandler } from 'react';

import type { Shape } from '@/types/shape';

export interface TypographyProps {
  shape: Shape;
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}
