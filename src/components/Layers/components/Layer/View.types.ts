import type { Shape } from '@/types/shape';
import type { MouseEvent } from 'react';

export interface LayerProps {
  data: Shape;
  selected: boolean;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}
