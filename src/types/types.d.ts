interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  type: 'circle';
  name: string;
  lineWidth: number;
}
interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: number;
  type: 'rectangle';
  name: string;
  lineWidth: number;
}
type FigureOptions = Circle | Rect;

type BulletOptions = FigureOptions & {
  id: number;
  radius: number;
};
type PlayerOptions = FigureOptions & {
  radius: number;
  bulletColor: string;
  score: number;
  name: 'player1' | 'player2';
  shootingRate: number;
  gameFrame: number;
  hit: boolean;
  // hitEffect: HitEffectOptions;
};

type HitEffectOptions = Omit<FigureOptions, 'speed'> & {
  radius: number;
};
