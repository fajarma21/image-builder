const DEFAULT_SHAPE = {
  x: 0,
  y: 0,
  fill: '#ffdd61',
  rotation: 0,
  stroke: 'none',
};

export const DEFAULT_GENERIC_SHAPE = {
  ...DEFAULT_SHAPE,
  width: 120,
  height: 120,
};

export const DEFAULT_TEXT_SHAPE = {
  ...DEFAULT_SHAPE,
  width: 0,
  height: 0,
  text: 'Text',
  fontSize: 24,
};
