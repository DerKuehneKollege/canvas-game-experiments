import {BaseGame} from "../base-game";
import {Helpers} from "../helpers";
import {Circle} from "../objects/circle";
import {makeNoise2D} from "open-simplex-noise";
import {Noise2D} from "open-simplex-noise/lib/2d";

export class RandomWalkerGame extends BaseGame {

    private x: number;
    private y: number;
    private circle: Circle;

    private noiseTx = 0;
    private noiseTy = 100;

    private noise2D: Noise2D;

    constructor() {
        super();


        this.x = 100;
        this.y = 100;
        this.circle = new Circle(this.ctx);
        this.circle.visible = true;
        this.circle.x = this.x;
        this.circle.y = this.y;

        this.noise2D = makeNoise2D(Date.now());
    }

    protected init(): void {
        // nothing to do
    }

    protected update(time: number): void {
        this.x = Helpers.map(this.noise2D(this.noiseTx, this.noiseTy), -1, 1, 0, this.right);
        this.y = Helpers.map(this.noise2D(this.noiseTy, this.noiseTx), -1, 1, 0, this.bottom);

        this.noiseTx += 0.01;
        this.noiseTy += 0.01;
    }

    protected render(time: number): void {
        this.clearCanvas();

        this.circle.x = this.x;
        this.circle.y = this.y;
        this.circle.draw();
    }



}