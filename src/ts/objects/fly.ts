import Victor from "victor";

export class Fly {

    pos = new Victor(100, 100);

    rotationAngle = Math.PI / 2 * 3;

    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private img: HTMLImageElement;

    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.ctx = ctx;
        this.canvas = canvas;

        this.img = new Image(20, 20);
        this.img.src = './assets/fly.svg';
    }

    draw() {
        this.ctx.save(); // save current coordination system

        this.ctx.translate(this.pos.x, this.pos.y);
        this.ctx.rotate(this.rotationAngle);

        this.ctx.drawImage(this.img, -25, -25);

        this.ctx.restore(); // restore previously saved coordination system
    }

}