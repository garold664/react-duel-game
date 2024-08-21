import HitEffect from '../classes/HitEffect';
import Player from '../classes/Player';

function drawHitEffect(
  ctx: CanvasRenderingContext2D | null,
  hitEffect: HitEffect,
  receiver: Player
) {
  if (!ctx) return;
  hitEffect.timer++;

  hitEffect.x = receiver.x;
  hitEffect.y = receiver.y;
  hitEffect.radius *= hitEffect.growFactor;
  hitEffect.color = `rgba(150, 0, 0, ${hitEffect.opacity})`;
  hitEffect.opacity -= 0.03;
  hitEffect.growFactor += 0.005;

  if (hitEffect.timer > 28) {
    hitEffect.opacity = 1;
    hitEffect.x = -1000;
    hitEffect.y = -1000;
    hitEffect.radius = receiver.radius;
    hitEffect.timer = 0;
    receiver.hit = false;
    hitEffect.growFactor = 1.01;
  }
  hitEffect.drawElement(ctx);
}

export default drawHitEffect;
