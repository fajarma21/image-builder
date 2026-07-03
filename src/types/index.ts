import type { SVGAttributes } from 'react';

import type { Shape, SupportedSVG } from './shape';

export interface ShapeComponent extends SVGAttributes<SupportedSVG> {
  shape: Shape;
}

export interface Camera {
  offsetX: number;
  offsetY: number;
  zoom: number;
}
