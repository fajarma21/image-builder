import type { Shape } from '@/types/shape';
import type { LiHTMLAttributes } from 'react';

export interface LayerProps extends LiHTMLAttributes<HTMLLIElement> {
  data: Shape;
  selected: boolean;
}
