import { Figure } from './classes';
import { CANVAS_HEIGHT, PLAYER_RADIUS } from './constants';

function movePlayer(player: Figure, mouseCoords: { x: number; y: number }) {
  const overlap = 5 + Math.abs(player.speed * 0.5);
  console.log(overlap);
  if (
    player.y > CANVAS_HEIGHT - PLAYER_RADIUS ||
    player.y < 0 + PLAYER_RADIUS
  ) {
    player.speed = player.speed * -1;
  }

  if (
    player.speed > 0 &&
    player.y + PLAYER_RADIUS > mouseCoords.y &&
    player.y + PLAYER_RADIUS - overlap < mouseCoords.y &&
    player.x + PLAYER_RADIUS > mouseCoords.x &&
    player.x - PLAYER_RADIUS < mouseCoords.x
  ) {
    player.speed = -player.speed;
  }

  if (
    player.speed < 0 &&
    player.y - PLAYER_RADIUS < mouseCoords.y &&
    player.y - PLAYER_RADIUS + overlap > mouseCoords.y &&
    player.x + PLAYER_RADIUS > mouseCoords.x &&
    player.x - PLAYER_RADIUS < mouseCoords.x
  ) {
    player.speed = -player.speed;
  }

  if (player.y + PLAYER_RADIUS > CANVAS_HEIGHT) {
    player.y = CANVAS_HEIGHT - PLAYER_RADIUS;
  }

  if (player.y - PLAYER_RADIUS < 0) {
    player.y = PLAYER_RADIUS;
  }

  player.y += player.speed;
}

export default movePlayer;
