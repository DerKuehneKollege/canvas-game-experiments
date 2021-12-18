import {BaseGame} from "../base-game";
import {Helpers} from "../helpers";
import {makeNoise2D} from "open-simplex-noise";
import {Noise2D} from "open-simplex-noise/lib/2d";

export class PixelDrawerGame extends BaseGame {

    pixels: Uint8Array;

    private noise2D: Noise2D;

    private pixelsWidth;
    private pixelsHeight;

    constructor() {
        super();

        this.canvas.style.background = '#fff';

        this.noise2D = makeNoise2D(Date.now());

        this.pixelsWidth = 600;
        this.pixelsHeight = 600;

        this.pixels = new Uint8Array(this.pixelsWidth * this.pixelsHeight);

        const deltaTx = 0.05;
        const deltaTy = 0.05;

        let xOffset = 0;
        let yOffset = 0;

        for (let y = 0; y < this.pixelsHeight; y++) {
            xOffset = 0;

            for (let x = 0; x < this.pixelsWidth; x++) {
                const item = Helpers.map(this.noise2D(xOffset, yOffset), -1, 1, 0, 255);
                this.pixels[x + y * this.pixelsWidth] = item;

                xOffset += deltaTx;
            }

            yOffset += deltaTy;
        }
    }

    protected init(): void {
        // nothing to do
    }

    protected update(time: number): void {
        // nothing to do
    }

    protected render(time: number): void {
        this.clearCanvas();

        for (let i = 0; i < this.pixels.length; i++) {
            const pixel = this.pixels[i];
            const x = i % this.pixelsWidth;
            const y = Math.floor(i / this.pixelsHeight);

            this.ctx.fillStyle = `rgb(${pixel},${pixel},${pixel})`;
            this.ctx.fillRect(x, y, 2, 2);
        }
    }



}