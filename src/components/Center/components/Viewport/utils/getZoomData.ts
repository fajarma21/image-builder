import { MAX_ZOOM, MIN_ZOOM } from '@/constants';

const getZoomData = (
  e: globalThis.WheelEvent,
  oldZoom: number,
  viewport: HTMLDivElement,
) => {
  const currentZoom = e.deltaY * -0.01;
  const newZoom = Math.max(MIN_ZOOM, Math.min(oldZoom + currentZoom, MAX_ZOOM));

  const viewportRect = viewport.getBoundingClientRect();

  const mouseX = e.clientX - viewportRect.left;
  const mouseY = e.clientY - viewportRect.top;

  const docX = (viewport.scrollLeft + mouseX) / oldZoom;
  const docY = (viewport.scrollTop + mouseY) / oldZoom;

  return {
    newZoom,
    docX,
    docY,
    mouseX,
    mouseY,
  };
};

export default getZoomData;
