import type { SVGAttributes } from 'react';

import type { Shape, SupportedSVG } from '@/types/shape';

export interface ShapeOutlineProps extends SVGAttributes<SupportedSVG> {
  shape: Shape;
}
