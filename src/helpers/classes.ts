class Figure {
  x: number;
  y: number;
  width: number;
  height?: number;
  color: string;
  speed: number;
  type: 'rectangle' | 'circle';
  name: string;
  lineWidth: number;

  constructor(options: FigureOptions) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.color = options.color;
    this.speed = options.speed;
    this.type = options.type;
    this.name = options.name;
    this.lineWidth = options.lineWidth;

    if (options.type === 'rectangle') {
      this.height = options.height;
    }
  }
}

class Bullet extends Figure {
  id: number;
  constructor(options: BulletOptions) {
    super(options);
    this.id = options.id;
  }
}

export { Figure, Bullet };
