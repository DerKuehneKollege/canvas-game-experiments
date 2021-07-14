import {makeNoise2D, Noise2D } from "open-simplex-noise/lib/2d";
import {BaseGame} from "../base-game";
import {Floater} from "../objects/floater";
import {Helpers} from "../helpers";
import Victor from "victor";

export class FloaterGame extends BaseGame {

    private floater: Floater;

    private noiseTx = 0;
    private noiseTy = 100;

    private noise2D: Noise2D;

    private lastPos = new Victor(0, 0);

    constructor() {
        super();

        this.canvas.style.background = '#fff';

        this.floater = new Floater(this.ctx, this.canvas);
        this.floater.pos = new Victor(this.centerX, this.centerY);

        this.lastPos = this.floater.pos.clone();

        this.noise2D = makeNoise2D(Date.now());
    }

    protected init(): void {
        // nothing to do
    }

    protected update(time: number): void {
        this.lastPos = this.floater.pos.clone();

        this.floater.pos.x = Helpers.map(this.noise2D(this.noiseTx, this.noiseTy), -1, 1, 0, this.right);
        this.floater.pos.y = Helpers.map(this.noise2D(this.noiseTy, this.noiseTx), -1, 1, 0, this.bottom);

        // Rotation angle = angle of delta to last position + Pi/2
        this.floater.rotationAngle = this.floater.pos.clone().subtract(this.lastPos).angle() + Math.PI / 2;

        this.noiseTx += 0.005;
        this.noiseTy += 0.005;
    }

    protected render(time: number): void {
        this.clearCanvas();

        this.floater.draw();
    }

}