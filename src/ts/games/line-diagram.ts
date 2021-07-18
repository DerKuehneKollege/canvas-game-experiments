import { makeNoise2D } from "open-simplex-noise";
import {BaseGame} from "../base-game";
import {Helpers} from "../helpers";
import {Circle} from "../objects/circle";
import {Rectangle} from "../objects/rectangle";

export class LineDiagram extends BaseGame {

    zeroX = 50;
    zeroY = 300;

    width = 500;
    height = 250;

    oneY = 200;

    values: number[];

    tx = 0;
    ty = 100;

    private noise: any;

    constructor() {
        super();

        this.canvas.style.background = '#fff';

        this.values = [];

        this.noise = makeNoise2D(Date.now());

        for (let i = 0; i < this.width - 20; i++) {
            this.addNextValue();
        }

        this.ctx.lineCap = 'round';
    }

    protected init(): void {
        // nothing to do
    }

    protected update(time: number): void {
        // TODO
    }

    protected render(time: number): void {
        this.clearCanvas();

        this.ctx.strokeStyle = '#000';

        this.ctx.beginPath();
        this.drawLineWithArrows(
            this.zeroX,
            this.zeroY + this.height,
            this.zeroX,
            this.zeroY - this.height
        );

        this.drawLineWithArrows(
            this.zeroX - 20,
            this.zeroY,
            this.zeroX + this.width,
            this.zeroY
        );
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(this.zeroX - 5, this.zeroY - this.oneY);
        this.ctx.lineTo(this.zeroX + 5, this.zeroY - this.oneY);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(this.zeroX - 5, this.zeroY + this.oneY);
        this.ctx.lineTo(this.zeroX + 5, this.zeroY + this.oneY);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.strokeStyle = '#ba0000';
        this.ctx.moveTo(this.zeroX, this.zeroY - this.values[0] * this.oneY);

        this.ctx.beginPath();
        for (let i = 0; i < this.values.length; i++) {
            const value = this.values[i];
            this.ctx.lineTo(
                this.zeroX + i,
                this.zeroY - value * this.oneY
            );
        }

        this.ctx.stroke();
        this.ctx.closePath();

        this.values.shift();
        this.addNextValue();
    }

    private addNextValue() {
        // this.values.push(this.noise(this.tx, this.ty));
        this.values.push(this.noise(this.tx, this.ty));
        this.tx += 0.05;
        this.ty += 0.05;
    }

    drawLineWithArrows(
        fromX: number,
        fromY: number,
        toX: number,
        toY: number,
        arrowWidth = 5,
        arrowLength = 10,
        arrowStart = false,
        arrowEnd = true
    ) {
        const dx = toX - fromX;
        const dy = toY - fromY;
        const angle = Math.atan2(dy, dx);
        const length = Math.sqrt(dx * dx + dy * dy);

        this.ctx.save();

        this.ctx.translate(fromX, fromY);
        this.ctx.rotate(angle);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(length, 0);

        if (arrowStart) {
            this.ctx.moveTo(arrowLength, -arrowWidth);
            this.ctx.lineTo(0, 0);
            this.ctx.lineTo(arrowLength, arrowWidth);
        }

        if (arrowEnd) {
            this.ctx.moveTo(length - arrowLength, -arrowWidth);
            this.ctx.lineTo(length, 0);
            this.ctx.lineTo(length - arrowLength, arrowWidth);
        }

        this.ctx.stroke();

        this.ctx.restore();
    }

}