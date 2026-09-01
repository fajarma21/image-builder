import type { PanningInteraction } from '@/types/interaction';

const getPanValue = (
  e: MouseEvent,
  viewport: HTMLElement,
  interaction: PanningInteraction,
) => {
  const currentX = e.pageX - viewport.offsetLeft;
  const currentY = e.pageY - viewport.offsetTop;
  const walkX = currentX - interaction.startMouse.x;
  const walkY = currentY - interaction.startMouse.x;

  return { walkX, walkY };
};

export default getPanValue;
