import type { SVGAttributes } from 'react';

import type { Shape, SupportedSVG } from '@/types/shape';

export interface ShapeRendererProps extends SVGAttributes<SupportedSVG> {
  shape: Shape;
}
