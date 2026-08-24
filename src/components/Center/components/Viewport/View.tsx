import { useCallback, useEffect, useRef, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';

import Grid from '@/components/Grid';
import MarqueeRect from '@/components/MarqueeRect';
import SelectionBox from '@/components/SelectionBox';
import ShapeRenderer from '@/components/ShapeRenderer';
import ShapeWrapper from '@/components/ShapeWrapper';
import {
  DRAGGING,
  IDLE,
  MOUSE_DOWN_EMPTY,
  MOUSE_DOWN_SHAPE,
  PANNING,
} from '@/constants/interaction';
import useEditorStore from '@/stores/useEditorStore';
import useKeyboardStore from '@/stores/useKeyboardStore';
import viewportToCanvas from '@/utils/viewportToCanvas';

import getZoomData from './utils/getZoomData';
import css from './View.module.scss';
import SnapLines from '@/components/SnapLines';

// TODO: resize and rotate multiselect support
// TODO: apply viewporttocanvas helper for all coordinates

const Viewport = () => {
  const camera = useEditorStore((state) => state.camera);
  const document = useEditorStore((state) => state.document);
  const shapesById = useEditorStore((state) => state.shapesById);
  const shapeIds = useEditorStore((state) => state.shapeIds);
  const selectedIds = useEditorStore((state) => state.selectedIds);
  const interaction = useEditorStore((state) => state.interaction);
  const selectionBounds = useEditorStore((state) => state.selectionBounds);
  const snapLine = useEditorStore((state) => state.snapLine);

  const spaceKey = useKeyboardStore((state) => state.spaceKey);

  const selectOnly = useEditorStore((state) => state.selectOnly);
  const toggleSelection = useEditorStore((state) => state.toggleSelection);
  const clearSelection = useEditorStore((state) => state.clearSelection);
  const startInteraction = useEditorStore((state) => state.startInteraction);
  const zooming = useEditorStore((state) => state.zooming);

  const viewportRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const startPan = (e: MouseEvent) => {
    if (viewportRef.current) {
      startInteraction({
        type: PANNING,
        mouseX: e.pageX - viewportRef.current.offsetLeft,
        mouseY: e.pageY - viewportRef.current.offsetTop,
        scrollX: viewportRef.current.scrollLeft,
        scrollY: viewportRef.current.scrollTop,
      });
    }
  };

  const handleClickEmpty = (e: MouseEvent) => {
    if (svgRef.current) {
      clearSelection();

      const { canvasX, canvasY } = viewportToCanvas(
        e.clientX,
        e.clientY,
        camera,
        svgRef.current,
      );

      startInteraction({
        type: MOUSE_DOWN_EMPTY,
        mouseX: canvasX,
        mouseY: canvasY,
      });
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (spaceKey) startPan(e);
    else if (e.target === viewportRef.current || e.target === svgRef.current) {
      handleClickEmpty(e);
    }
  };

  const handleMouseDownShape = (e: MouseEvent, id: string) => {
    if (spaceKey) return;

    if (e.shiftKey) toggleSelection(id);
    else if (!selectedIds.includes(id)) selectOnly(id);

    startInteraction({
      type: MOUSE_DOWN_SHAPE,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  };

  const handleZoom = useCallback(
    (e: globalThis.WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();

        if (!viewportRef.current) return;

        const { newZoom, docX, docY, mouseX, mouseY } = getZoomData(
          e,
          camera.zoom,
          viewportRef.current,
        );

        flushSync(() => {
          zooming(newZoom);
        });

        viewportRef.current.scrollLeft = docX * newZoom - mouseX;
        viewportRef.current.scrollTop = docY * newZoom - mouseY;
      }
    },
    [camera.zoom, zooming],
  );

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) svg.addEventListener('wheel', handleZoom, { passive: false });

    return () => {
      if (svg) svg.removeEventListener('wheel', handleZoom);
    };
  }, [handleZoom]);

  return (
    <div
      id="viewport"
      ref={viewportRef}
      className={css.viewport}
      onMouseDown={handleMouseDown}
    >
      <div
        className={css.wrapper}
        style={{ width: document.width * camera.zoom }}
      >
        <svg
          id="canvas"
          ref={svgRef}
          width={document.width * camera.zoom}
          height={document.height * camera.zoom}
          viewBox={`0 0 ${document.width} ${document.height}`}
          overflow="visible"
          className={css.canvas}
          style={{
            backgroundColor: document.backgroundColor,
            borderRadius: 4 * camera.zoom,
          }}
        >
          {document.grid.show && <Grid />}

          {selectionBounds &&
            interaction.type === IDLE &&
            selectedIds.length > 1 && <SelectionBox {...selectionBounds} />}

          {shapesById && (
            <>
              {shapeIds.map((id) => {
                const item = shapesById[id];
                return (
                  !!item &&
                  item.show && (
                    <ShapeRenderer
                      key={id}
                      shape={item}
                      onMouseDown={(e) => handleMouseDownShape(e, id)}
                    />
                  )
                );
              })}

              {!!selectedIds.length && <ShapeWrapper />}
            </>
          )}

          {interaction.type === DRAGGING && snapLine && (
            <SnapLines horizontal={snapLine.h} vertical={snapLine.v} />
          )}

          <MarqueeRect />
        </svg>
      </div>
    </div>
  );
};

export default Viewport;
