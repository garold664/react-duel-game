class Figure {
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  color: string;
  speed: number;
  type: 'rectangle' | 'circle';
  name: string;
  lineWidth: number;

  constructor(options: FigureOptions) {
    this.x = options.x;
    this.y = options.y;
    this.color = options.color;
    this.speed = options.speed;
    this.type = options.type;
    this.name = options.name;
    this.lineWidth = options.lineWidth;

    if (options.type === 'rectangle') {
      this.width = options.width;
      this.height = options.height;
    } else if (options.type === 'circle') {
      this.radius = options.radius;
    }
  }

  drawElement(ctx: CanvasRenderingContext2D | null = null) {
    if (!ctx) return;
    if (this.type === 'rectangle' && this.height && this.width) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } else if (this.type === 'circle' && this.radius) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.strokeStyle = this.color + '80';
      ctx.lineWidth = this.lineWidth;
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }
  }
}

export default Figure;
