import { Figure } from './classes';
import { CANVAS_HEIGHT, PLAYER_RADIUS } from './constants';

function movePlayer(player: Figure, mouseCoords: { x: number; y: number }) {
  if (
    player.y > CANVAS_HEIGHT - PLAYER_RADIUS ||
    player.y < 0 + PLAYER_RADIUS
  ) {
    player.speed = player.speed * -1;
  }

  // if (
  //   player.speed > 0 &&
  //   player.y + PLAYER_RADIUS > mouseCoords.y &&
  //   player.x + PLAYER_RADIUS > mouseCoords.x &&
  //   player.x - PLAYER_RADIUS < mouseCoords.x
  // ) {
  //   player.speed = -player.speed;
  //   console.log(player.speed);
  //   console.log('cursor touch');
  // }

  if (
    player.speed < 0 &&
    player.y - PLAYER_RADIUS < mouseCoords.y &&
    player.y - PLAYER_RADIUS + 3 > mouseCoords.y &&
    player.x + PLAYER_RADIUS > mouseCoords.x &&
    player.x - PLAYER_RADIUS < mouseCoords.x
  ) {
    player.speed = -player.speed;
    console.log(player.speed);
    console.log('cursor touch');
  }

  player.y += player.speed;
}

export default movePlayer;
