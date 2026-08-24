const getDeltaAxis = (
  startMouseX: number,
  startMouseY: number,
  liveMouseX: number,
  liveMouseY: number,
  zoom: number,
) => {
  return {
    dx: Math.round((liveMouseX - startMouseX) / zoom),
    dy: Math.round((liveMouseY - startMouseY) / zoom),
  };
};

export default getDeltaAxis;
