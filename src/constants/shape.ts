export const SHAPE_RECT = 'rect' as const;
export const SHAPE_ELLIPSE = 'ellipse' as const;
export const SHAPE_TEXT = 'text' as const;
export const SHAPE_IMAGE = 'image' as const;

const FUNCTION_PROPS = {
  show: true,
};

export const DEFAULT_SHAPE = {
  ...FUNCTION_PROPS,
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  fill: '#F3BC2D',
  fillOpacity: 1,
  rotation: 0,
  stroke: '',
  strokeOpacity: 1,
};

export const DEFAULT_TEXT_SHAPE = {
  ...DEFAULT_SHAPE,
  width: 0,
  height: 0,
  text: 'Text',
  fontSize: 24,
  fontFamily: 'system-ui',
};
