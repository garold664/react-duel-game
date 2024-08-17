import { Figure } from './classes';
import {
  CANVAS_WIDTH,
  PLAYER1_COLOR,
  PLAYER2_COLOR,
  PLAYER_RADIUS,
} from './constants';

export const player1 = new Figure({
  name: 'player1',
  x: PLAYER_RADIUS + 5,
  y: 100,
  width: PLAYER_RADIUS * 2,
  color: PLAYER1_COLOR,
  speed: 1,
  type: 'circle',
});

export const player2 = new Figure({
  name: 'player2',
  x: CANVAS_WIDTH - PLAYER_RADIUS - 5,
  y: 100,
  width: PLAYER_RADIUS * 2,
  color: PLAYER2_COLOR,
  speed: 1,
  type: 'circle',
});
