import { MOUSE_THROTTLE_DELAY } from '../data/constants';
import throttle from './throttle';

export const updateMouseCoordsOnMouseLeave = (
  mouseCoords: React.MutableRefObject<{ x: number; y: number }>,
  mouseTracker: React.MutableRefObject<HTMLDivElement | null>
) => {
  return () => {
    setTimeout(() => {
      mouseCoords.current = { x: 0, y: 0 };
      if (!mouseTracker.current) return;
      mouseTracker.current.style.top = '0px';
      mouseTracker.current.style.left = '0px';
    }, MOUSE_THROTTLE_DELAY + 10);
  };
};

export const getMouseCoords = (
  mouseCoords: React.MutableRefObject<{ x: number; y: number }>,
  mouseTracker: React.MutableRefObject<HTMLDivElement | null>
) => {
  return throttle((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    mouseCoords.current = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    if (!mouseTracker.current) return;
    mouseTracker.current.style.top = `${mouseCoords.current.y - 5}px`;
    mouseTracker.current.style.left = `${mouseCoords.current.x - 5}px`;
  }, MOUSE_THROTTLE_DELAY);
};
