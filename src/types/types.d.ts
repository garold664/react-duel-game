interface Circle {
  x: number;
  y: number;
  width: number;
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
};
