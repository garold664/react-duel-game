import { Figure } from './classes';
import { CANVAS_HEIGHT, PLAYER_RADIUS } from './constants';

function movePlayer(player: Figure, mouseCoords: { x: number; y: number }) {
  const OVERLAP = 5;
  if (
    player.y > CANVAS_HEIGHT - PLAYER_RADIUS ||
    player.y < 0 + PLAYER_RADIUS
  ) {
    player.speed = player.speed * -1;
  }

  if (
    player.speed > 0 &&
    player.y + PLAYER_RADIUS > mouseCoords.y &&
    player.y + PLAYER_RADIUS - OVERLAP < mouseCoords.y &&
    player.x + PLAYER_RADIUS > mouseCoords.x &&
    player.x - PLAYER_RADIUS < mouseCoords.x
  ) {
    player.speed = -player.speed;
  }

  if (
    player.speed < 0 &&
    player.y - PLAYER_RADIUS < mouseCoords.y &&
    player.y - PLAYER_RADIUS + OVERLAP > mouseCoords.y &&
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
