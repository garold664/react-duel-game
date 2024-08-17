import { CANVAS_WIDTH, PLAYER1_COLOR, PLAYER2_COLOR } from './constants';

async function displayScore(
  score: number,
  player: 'player1' | 'player2',
  ctx: CanvasRenderingContext2D | null = null
) {
  await document.fonts.ready;
  if (!ctx) return;
  const x =
    player === 'player1' ? CANVAS_WIDTH / 2 - 100 : CANVAS_WIDTH / 2 + 100;
  ctx.font = "30px 'Pixelify Sans'";
  ctx.fillStyle = player === 'player1' ? PLAYER1_COLOR : PLAYER2_COLOR;
  ctx.fillText(`${score}`, x, 30);
}

export default displayScore;
