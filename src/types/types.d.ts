interface Circle {
  x: number;
  y: number;
  width: number;
  color: string;
  speed: number;
  type: 'circle';
  name: string;
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
}
type FigureOptions = Circle | Rect;

type BulletOptions = FigureOptions & {
  id: number;
};
