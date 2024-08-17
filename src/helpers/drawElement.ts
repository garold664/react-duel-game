import { Figure } from './classes';

function drawElement(
  figure: Figure,
  ctx: CanvasRenderingContext2D | null = null
) {
  if (!ctx) return;
  if (figure.type === 'rectangle' && figure.height) {
    ctx.fillStyle = figure.color;
    ctx.fillRect(figure.x, figure.y, figure.width, figure.height);
  } else if (figure.type === 'circle') {
    ctx.fillStyle = figure.color;
    ctx.beginPath();
    ctx.arc(figure.x, figure.y, figure.width / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}

export default drawElement;
