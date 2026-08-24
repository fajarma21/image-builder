import { useCallback, useEffect } from 'react';

import {
  DRAGGING,
  EDITING_TEXT,
  IDLE,
  MARQUEE,
  MOUSE_DOWN_EMPTY,
  MOUSE_DOWN_SHAPE,
  PANNING,
  RESIZING,
  ROTATING,
} from '@/constants/interaction';
import useEditorStore from '@/stores/useEditorStore';
import useKeyboardStore from '@/stores/useKeyboardStore';
import isTextEditing from '@/utils/isTextEditing';
import viewportToCanvas from '@/utils/viewportToCanvas';

import { ARROW_VALUES } from './index.constants';
import getResizeValue from './utils/getResizeValue';
import getRotateValue from './utils/getRotateValue';
import getPanValue from './utils/getPanValue';
import getDragValue from './utils/getDragValue';
import getMouseDownValue from './utils/getMouseDownValue';

const useGlobalEvent = () => {
  const camera = useEditorStore((state) => state.camera);
  const selectedIds = useEditorStore((state) => state.selectedIds);
  const interaction = useEditorStore((state) => state.interaction);
  const selectionBounds = useEditorStore((state) => state.selectionBounds);
  const snapBounds = useEditorStore((state) => state.snapBounds);

  const clearSelection = useEditorStore((state) => state.clearSelection);
  const selectAll = useEditorStore((state) => state.selectAll);
  const deleteSelected = useEditorStore((state) => state.deleteSelected);
  const startInteraction = useEditorStore((state) => state.startInteraction);
  const stopInteraction = useEditorStore((state) => state.stopInteraction);
  const updateShape = useEditorStore((state) => state.updateShape);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const dragShapes = useEditorStore((state) => state.dragShapes);
  const moveShapes = useEditorStore((state) => state.moveShapes);
  const duplicate = useEditorStore((state) => state.duplicate);
  const copy = useEditorStore((state) => state.copy);
  const paste = useEditorStore((state) => state.paste);
  const marquee = useEditorStore((state) => state.marquee);
  const updateSnapLine = useEditorStore((state) => state.updateSnapLine);

  const toggleSpace = useKeyboardStore((state) => state.toggleSpace);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === ' ') toggleSpace(false);
    },
    [toggleSpace],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isTextEditing()) return;

      const key = e.key;

      // DELETE
      if (key === 'Delete' || key === 'Backspace') deleteSelected();

      const controlKey = e.ctrlKey || e.metaKey;
      const shiftKey = e.shiftKey;

      const controlShift = controlKey && shiftKey;
      const controlOnly = controlKey && !shiftKey;

      // UNDO & REDO
      if (controlOnly && key === 'z') undo();
      if (controlShift && key === 'z') redo();

      if (selectedIds.length) {
        // ARROW MOVEMENT + SHIFT
        if (
          key === 'ArrowRight' ||
          key === 'ArrowLeft' ||
          key === 'ArrowUp' ||
          key === 'ArrowDown'
        ) {
          e.preventDefault();
          const multiplier = shiftKey ? 10 : 1;
          const { x, y } = ARROW_VALUES[key];
          moveShapes(selectedIds, x * multiplier, y * multiplier);
        }

        // DUPLICATE
        if (controlOnly && key === 'd') {
          e.preventDefault();
          duplicate(selectedIds);
        }

        // COPY
        if (controlOnly && key === 'c') copy();
      }

      // PASTE
      if (controlOnly && key === 'v') paste();

      // SELECT ALL
      if (controlOnly && key === 'a') {
        e.preventDefault();
        selectAll();
      }
      // DESELECT ALL
      if (controlShift && key === 'd') {
        e.preventDefault();
        clearSelection();
      }

      if ((!controlKey || !controlShift) && e.key === ' ') {
        e.preventDefault();
        toggleSpace(true);
      }
    },
    [
      selectedIds,
      clearSelection,
      copy,
      deleteSelected,
      duplicate,
      moveShapes,
      paste,
      redo,
      selectAll,
      toggleSpace,
      undo,
    ],
  );

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      const viewport = document.getElementById('viewport');
      const canvas = document.getElementById('canvas') as SVGSVGElement | null;
      if (
        !viewport ||
        !canvas ||
        interaction.type === IDLE ||
        interaction.type === EDITING_TEXT
      )
        return;

      switch (interaction.type) {
        case MOUSE_DOWN_EMPTY:
        case MOUSE_DOWN_SHAPE: {
          const mouseDownValue = getMouseDownValue(e, interaction, camera.zoom);

          if (mouseDownValue) startInteraction(mouseDownValue);
          break;
        }

        case DRAGGING: {
          const { dx, dy, snapXPoint, snapYPoint } = getDragValue(
            e,
            interaction,
            selectionBounds,
            snapBounds,
            camera.zoom,
          );

          updateSnapLine(snapYPoint, snapXPoint);
          dragShapes(interaction.startShapes, dx, dy);
          break;
        }

        case RESIZING: {
          const { id, ...resizeValue } = getResizeValue(
            e,
            interaction,
            camera.zoom,
          );
          updateShape(id, { ...resizeValue });
          break;
        }

        case ROTATING: {
          const { id, rotation } = getRotateValue(
            e,
            canvas,
            camera,
            interaction,
          );
          updateShape(id, { rotation });
          break;
        }

        case PANNING: {
          const { walkX, walkY } = getPanValue(e, viewport, interaction);
          viewport.scrollLeft = interaction.scrollLeft - walkX;
          viewport.scrollTop = interaction.scrollTop - walkY;
          break;
        }

        case MARQUEE: {
          const { canvasX, canvasY } = viewportToCanvas(
            e.clientX,
            e.clientY,
            camera,
            canvas,
          );
          marquee(canvasX, canvasY);
          break;
        }

        default:
          break;
      }
    },
    [
      camera,
      interaction,
      selectionBounds,
      snapBounds,
      dragShapes,
      marquee,
      startInteraction,
      updateShape,
      updateSnapLine,
    ],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopInteraction);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopInteraction);
    };
  }, [handleKeyDown, handleKeyUp, handleMouseMove, stopInteraction]);
};

export default useGlobalEvent;
