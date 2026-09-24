import viewportToCanvas from '@/utils/viewportToCanvas';
import type { ResizingInteraction } from '@/types/interaction';
import type { Camera } from '@/types';

const getResizeValue = (
  e: MouseEvent,
  canvas: SVGSVGElement,
  camera: Camera,
  interaction: ResizingInteraction,
) => {
  const startShape = interaction.startShapes[0];
  const rad = (startShape.rotation * Math.PI) / 180;

  const localX = {
    x: Math.cos(rad),
    y: Math.sin(rad),
  };

  const localY = {
    x: -Math.sin(rad),
    y: Math.cos(rad),
  };

  const { canvasX, canvasY } = viewportToCanvas(
    e.clientX,
    e.clientY,
    camera,
    canvas,
  );

  const mouseVector = {
    x: canvasX - interaction.anchor.x,
    y: canvasY - interaction.anchor.y,
  };

  const width = mouseVector.x * localX.x + mouseVector.y * localX.y;
  const height = mouseVector.x * localY.x + mouseVector.y * localY.y;
  let newWidth = Math.max(width, 1);
  let newHeight = Math.max(height, 1);

  if (!e.shiftKey) {
    const cornerVector = {
      x: localX.x * startShape.width + localY.x * startShape.height,
      y: localX.y * startShape.width + localY.y * startShape.height,
    };
    const dot = mouseVector.x * cornerVector.x + mouseVector.y * cornerVector.y;
    const lengthSquared =
      cornerVector.x * cornerVector.x + cornerVector.y * cornerVector.y;

    const scale = Math.max(0, dot / lengthSquared);
    const minScale = Math.max(1 / startShape.width, 1 / startShape.height);
    const finalScale = Math.max(scale, minScale);

    newWidth = startShape.width * finalScale;
    newHeight = startShape.height * finalScale;
  }

  const center = {
    x:
      interaction.anchor.x +
      localX.x * (newWidth / 2) +
      localY.x * (newHeight / 2),

    y:
      interaction.anchor.y +
      localX.y * (newWidth / 2) +
      localY.y * (newHeight / 2),
  };

  const newX = center.x - newWidth / 2;
  const newY = center.y - newHeight / 2;

  return {
    id: startShape.id,
    x: newX,
    y: newY,
    width: newWidth,
    height: newHeight,
    rotation: startShape.rotation,
  };
};

export default getResizeValue;
