import Figure from './Figure';

class Bullet extends Figure {
  id: number;
  radius: number;

  static bullets: Bullet[] = [];
  constructor(options: BulletOptions) {
    super(options);
    this.id = options.id;
    this.radius = options.radius;
  }
}

export default Bullet;
