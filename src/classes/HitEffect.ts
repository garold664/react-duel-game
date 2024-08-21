import Bullet from './Bullet';

class HitEffect extends Bullet {
  timer: number;
  growFactor: number;
  opacity: number;
  constructor(options: HitEffectOptions) {
    const bulletOptions: BulletOptions = {
      ...options,
      speed: 0,
      type: 'circle',
      id: 0,
    };
    super(bulletOptions);

    this.timer = 0;
    this.growFactor = 1.01;
    this.opacity = 1;
  }
}

export default HitEffect;
