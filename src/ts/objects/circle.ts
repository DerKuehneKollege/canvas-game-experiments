import {Helpers} from "../helpers";

export class Circle {

    x = 0;
    y = 0;
    radius = 10;
    visible = false;
    fillColor = '#ff0000';
    strokeColor = '#ff0000';

    private ctx: CanvasRenderingContext2D;

    public constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }


    public draw() {
        if (!this.visible) {
            return;
        }

        // draw circle
        this.ctx.fillStyle = this.fillColor;
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.beginPath();
        this.ctx.arc(this.x,  this.y, this.radius, 0, Helpers.FULL_CIRCLE);
        this.ctx.fill();
        this.ctx.stroke();
    }

}