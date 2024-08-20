import Bullet from './Bullet';

class HitEffect extends Bullet {
  constructor(options: HitEffectOptions) {
    const bulletOptions: BulletOptions = {
      ...options,
      speed: 0,
      radius: 0,
      type: 'circle',
      id: 0,
    };
    super(bulletOptions);
  }
}

export default HitEffect;
