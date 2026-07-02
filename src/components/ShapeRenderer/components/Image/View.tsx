import type { ImageProps } from './View.types';

const Image = ({ shape, ...actionProps }: ImageProps) => {
  const { x, y, width, height } = shape;

  return (
    <image
      href={shape.imageSrc}
      x={x}
      y={y}
      width={width}
      height={height}
      {...actionProps}
    />
  );
};

export default Image;
