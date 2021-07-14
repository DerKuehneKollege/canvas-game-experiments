import Victor from "victor";

export class Floater {

    pos = new Victor(100, 100);

    strokeColor = '#444';
    fillColor = '#ddd';

    size = 10;

    rotationAngle = Math.PI / 2 * 3;

    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;

    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.ctx = ctx;
        this.canvas = canvas;
    }

    draw() {

        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.fillStyle = this.fillColor;
        this.ctx.lineWidth = 3;

        this.ctx.save(); // save current coordination system

        this.ctx.translate(this.pos.x, this.pos.y);
        this.ctx.rotate(this.rotationAngle)

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0 - this.size * 2);
        this.ctx.lineTo(this.size, this.size);
        this.ctx.lineTo(0, 0);
        this.ctx.lineTo(-this.size, this.size);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.restore(); // restore previously saved coordination system
    }

}