const DEFAULT_SHAPE = {
  show: true,
  x: 0,
  y: 0,
  fill: '#ffdd61',
  fillOpacity: 1,
  rotation: 0,
  stroke: '',
  strokeOpacity: 1,
};

export const DEFAULT_GENERIC_SHAPE = {
  ...DEFAULT_SHAPE,
  width: 100,
  height: 100,
};

export const DEFAULT_TEXT_SHAPE = {
  ...DEFAULT_SHAPE,
  width: 0,
  height: 0,
  text: 'Text',
  fontSize: 24,
  fontFamily: 'system-ui',
};
