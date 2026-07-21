import type { ImageProps } from './View.types';

const Image = ({ shape, ...actionProps }: ImageProps) => {
  const { x, y, width, height, imageSrc } = shape;

  return (
    <image
      href={imageSrc}
      x={x}
      y={y}
      width={width}
      height={height}
      {...actionProps}
    />
  );
};

export default Image;
