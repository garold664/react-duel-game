import clearRect from './clearRect';
import displayScore from './displayScore';
import { player1, player2 } from './players';

function drawElements(ctx: CanvasRenderingContext2D | null = null) {
  clearRect(ctx);

  player1.drawElement(ctx);
  player2.drawElement(ctx);

  displayScore(player1.score, player1.name, ctx);
  displayScore(player2.score, player2.name, ctx);
}

export default drawElements;
