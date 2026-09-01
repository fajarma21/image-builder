import { DRAGGING, MARQUEE, MOUSE_DOWN_EMPTY } from '@/constants/interaction';
import type {
  MouseDownEmptyInteraction,
  MouseDownShapeInteraction,
} from '@/types/interaction';
import getDeltaAxis from '@/utils/getDeltaAxis';

const getMouseDownValue = (
  e: MouseEvent,
  interaction: MouseDownEmptyInteraction | MouseDownShapeInteraction,
  zoom: number,
) => {
  const currentMouse = { x: e.clientX, y: e.clientY };
  const { dx, dy } = getDeltaAxis(interaction.startMouse, currentMouse, zoom);

  if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
    return {
      type: interaction.type === MOUSE_DOWN_EMPTY ? MARQUEE : DRAGGING,
      mouseX: interaction.startMouse.x,
      mouseY: interaction.startMouse.y,
    };
  }
};

export default getMouseDownValue;
