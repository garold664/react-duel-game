import { Figure } from './classes';
import { CANVAS_HEIGHT, PLAYER_RADIUS } from './constants';

function movePlayer(player: Figure) {
  if (
    player.y > CANVAS_HEIGHT - PLAYER_RADIUS ||
    player.y < 0 + PLAYER_RADIUS
  ) {
    player.speed = player.speed * -1;
  }
  player.y += player.speed;
  // }
}

export default movePlayer;
