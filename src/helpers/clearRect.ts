import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';

function clearRect(ctx: CanvasRenderingContext2D | null) {
  if (!ctx) return;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

export default clearRect;
