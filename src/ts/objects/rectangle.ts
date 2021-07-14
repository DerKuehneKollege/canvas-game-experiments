import {Helpers} from "../helpers";

export class Rectangle {

    x = 0;
    y = 0;
    width = 10;
    height = 10;
    fillColor = '#ff0000';
    strokeColor = '#ff0000';

    private ctx: CanvasRenderingContext2D;

    public constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }


    public draw() {
        // draw circle
        this.ctx.fillStyle = this.fillColor;
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fill();
        this.ctx.stroke();
    }

}