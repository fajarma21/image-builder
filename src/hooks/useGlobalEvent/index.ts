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
import radToDeg from '@/utils/radToDeg';
import viewportToCanvas from '@/utils/viewportToCanvas';

import { ARROW_VALUES } from './index.constants';

const useGlobalEvent = () => {
  const camera = useEditorStore((state) => state.camera);
  const selectedIds = useEditorStore((state) => state.selectedIds);
  const interaction = useEditorStore((state) => state.interaction);

  const clearSelection = useEditorStore((state) => state.clearSelection);
  const selectAll = useEditorStore((state) => state.selectAll);
  const deleteSelected = useEditorStore((state) => state.deleteSelected);
  const startInteraction = useEditorStore((state) => state.startInteraction);
  const stopInteraction = useEditorStore((state) => state.stopInteraction);
  const updateShape = useEditorStore((state) => state.updateShape);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const moveShape = useEditorStore((state) => state.moveShape);
  const duplicate = useEditorStore((state) => state.duplicate);
  const copy = useEditorStore((state) => state.copy);
  const paste = useEditorStore((state) => state.paste);
  const marquee = useEditorStore((state) => state.marquee);
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
          for (const id of selectedIds)
            moveShape(id, x * multiplier, y * multiplier); // TODO: change to batch update
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
      clearSelection,
      copy,
      deleteSelected,
      duplicate,
      moveShape,
      paste,
      redo,
      selectAll,
      selectedIds,
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

      const dx = (e.clientX - interaction.startMouseX) / camera.zoom;
      const dy = (e.clientY - interaction.startMouseY) / camera.zoom;

      switch (interaction.type) {
        case MOUSE_DOWN_EMPTY:
        case MOUSE_DOWN_SHAPE: {
          if (Math.abs(dx) > 3 || Math.abs(dy) > 3)
            startInteraction({
              type: interaction.type === MOUSE_DOWN_EMPTY ? MARQUEE : DRAGGING,
              mouseX: interaction.startMouseX,
              mouseY: interaction.startMouseY,
            });
          break;
        }

        case DRAGGING: {
          for (const shape of interaction.startShapes) {
            updateShape(shape.id, {
              x: shape.x + dx,
              y: shape.y + dy,
            });
          }
          break;
        }

        case RESIZING: {
          const shape = interaction.startShapes[0];
          const angle = (shape.rotation * Math.PI) / 180;

          const localDx = (dx * Math.cos(angle) + dy * Math.sin(angle)) * 2;
          const localDy = (-dx * Math.sin(angle) + dy * Math.cos(angle)) * 2;

          const width = Math.max(1, shape.width + localDx);
          const height = Math.max(1, shape.height + localDy);

          updateShape(shape.id, {
            x: interaction.centerX - width / 2,
            y: interaction.centerY - height / 2,
            width: width,
            height,
          });
          break;
        }

        case ROTATING: {
          const canvasRect = canvas.getBoundingClientRect();
          const canvasMouseX =
            Math.max(e.clientX - canvasRect.left, 0) / camera.zoom;
          const canvasMouseY =
            Math.max(e.clientY - canvasRect.top, 0) / camera.zoom;

          const radian = Math.atan2(
            canvasMouseY - interaction.centerY,
            canvasMouseX - interaction.centerX,
          );

          const degrees = radToDeg(radian);

          updateShape(interaction.startShapes[0].id, {
            rotation: degrees + 90,
          });
          break;
        }

        case PANNING: {
          const currentX = e.pageX - viewport.offsetLeft;
          const currentY = e.pageY - viewport.offsetTop;
          const walkX = currentX - interaction.startMouseX;
          const walkY = currentY - interaction.startMouseY;
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
    [interaction, startInteraction, updateShape, camera, marquee],
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
