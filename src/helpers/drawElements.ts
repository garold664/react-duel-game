import clearRect from './clearRect';
import displayScore from './displayScore';
import drawElement from './drawElement';
import { player1, player2 } from './players';

function drawElements(
  ctx: CanvasRenderingContext2D | null = null,
  score1: number,
  score2: number
) {
  clearRect(ctx);

  // drawElement(bullet);
  drawElement(player1, ctx);
  drawElement(player2, ctx);

  displayScore(score1, 'player1', ctx);
  displayScore(score2, 'player2', ctx);
}

export default drawElements;
