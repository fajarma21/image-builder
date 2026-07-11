import type { SVGAttributes } from 'react';

import type { Shape, SupportedSVG } from './shape';

export interface ShapeComponent extends SVGAttributes<SupportedSVG> {
  shape: Shape;
}

export interface Camera {
  zoom: number;
}

export interface Bounds {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
