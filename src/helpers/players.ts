import Player from '../classes/Player';
import {
  CANVAS_WIDTH,
  INITIAL_BULLET_RATE,
  PLAYER1_COLOR,
  PLAYER2_COLOR,
  PLAYER_RADIUS,
  PLAYERS_GAP,
} from '../data/constants';

export const player1 = new Player({
  name: 'player1',
  x: PLAYER_RADIUS + PLAYERS_GAP,
  y: 100,
  radius: PLAYER_RADIUS,
  color: PLAYER1_COLOR,
  speed: 2,
  type: 'circle',
  lineWidth: 0,
  bulletColor: PLAYER1_COLOR,
  score: 0,
  shootingRate: INITIAL_BULLET_RATE,
  gameFrame: 0,
  hit: false,
});

export const player2 = new Player({
  name: 'player2',
  x: CANVAS_WIDTH - PLAYER_RADIUS - PLAYERS_GAP,
  y: 100,
  radius: PLAYER_RADIUS,
  color: PLAYER2_COLOR,
  speed: 2,
  type: 'circle',
  lineWidth: 0,
  bulletColor: PLAYER2_COLOR,
  score: 0,
  shootingRate: INITIAL_BULLET_RATE,
  gameFrame: 0,
  hit: false,
});

Player.player1 = player1;
Player.player2 = player2;
