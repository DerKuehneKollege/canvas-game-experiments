import {makeNoise2D, Noise2D } from "open-simplex-noise/lib/2d";
import {BaseGame} from "../base-game";
import {Floater} from "../objects/floater";
import {Helpers} from "../helpers";
import Victor from "victor";
import {Fly} from "../objects/fly";
import {Toast} from "../ui/toast";

export class RandomWalkerFloaterGame extends BaseGame {

    private floater: Floater | Fly;

    private noiseTx = 0;
    private noiseTy = 100;

    private noise2D: Noise2D;

    private lastPos = new Victor(0, 0);

    private deltaTx = 0.005;
    private deltaTy = 0.005;

    private uiDiv!: HTMLDivElement;

    constructor() {
        super();

        this.canvas.style.background = '#fff';

        // this.floater = new Floater(this.ctx, this.canvas);
        this.floater = new Fly(this.ctx, this.canvas);

        this.floater.pos = new Victor(this.centerX, this.centerY);

        this.lastPos = this.floater.pos.clone();

        this.noise2D = makeNoise2D(Date.now());

        this.createUi();

        window.addEventListener('keydown', (ev) => {
            console.log(ev);

            if (ev.key === 'Escape') {
                this.uiDiv.style.display = (this.uiDiv.style.display !== 'none')
                    ? 'none'
                    : 'block';
            }
        });
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

        this.noiseTx += this.deltaTx;
        this.noiseTy += this.deltaTy;
    }

    protected render(time: number): void {
        this.clearCanvas();

        this.floater.draw();
    }

    private createUi() {
        // UI
        const uiDiv = document.createElement('div');
        uiDiv.classList.add('game-ui-overlay');
        uiDiv.style.padding = '1rem';
        uiDiv.style.display = 'none';

        const form = document.createElement('form');
        form.classList.add('game-ui-form');

        const labelTx = document.createElement('label');
        labelTx.textContent = 'deltaTx:';

        const labelTy = document.createElement('label');
        labelTy.textContent = 'deltaTy:';

        const inputTx = document.createElement('input');
        inputTx.classList.add('game-ui-input-number');
        inputTx.type = 'number';
        inputTx.value = this.deltaTx.toString();
        inputTx.onchange = (ev) => {
            this.deltaTx = parseFloat((ev.target as HTMLInputElement).value);
            (new Toast('deltaTx has been changed to another value.')).display();
        }

        const inputTy = document.createElement('input');
        inputTy.classList.add('game-ui-input-number');
        inputTy.type = 'number';
        inputTy.value = this.deltaTy.toString();
        inputTy.onchange = (ev) => {
            this.deltaTy = parseFloat((ev.target as HTMLInputElement).value);
            (new Toast('deltaTy has been changed to another value.')).display();
        }

        form.appendChild(labelTx);
        form.appendChild(inputTx);
        form.appendChild(labelTy);
        form.appendChild(inputTy);

        uiDiv.appendChild(form);

        document.body.appendChild(uiDiv);

        this.uiDiv = uiDiv;
    }

}