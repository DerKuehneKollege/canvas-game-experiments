import {Circle} from "./circle";
import {Helpers} from "../helpers";

export class Particle {

    public readonly eventTarget = new EventTarget();

    private size: number;

    private speedX: number;
    private speedY: number;

    private circle: Circle;
    private canvas: HTMLCanvasElement;

    private r = 0;
    private g = 0;
    private b = 0;

    private alpha = 1;

    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.size = Helpers.randomIntBetween(5, 10);

        this.speedX = Helpers.randomIntBetween(-5, 5);
        this.speedY = Helpers.randomIntBetween(-5, 5);

        this.r = Helpers.randomIntBetween(0, 255);
        this.g = Helpers.randomIntBetween(0, 255);
        this.b = Helpers.randomIntBetween(0, 255);
        this.alpha = 1;

        this.circle = new Circle(ctx);
        this.circle.x = Helpers.randomIntBetween(0, canvas.width / window.devicePixelRatio);
        this.circle.y = Helpers.randomIntBetween(0, canvas.height / window.devicePixelRatio);
        this.circle.visible = true;
        this.circle.radius = 10;
        this.circle.fillColor = this.getColor();
        this.circle.strokeColor = this.getColor();

        this.eventTarget.addEventListener('collision', this.behaviourShrinking.bind(this));
        // this.eventTarget.addEventListener('collision', this.behaviourSlowDown.bind(this));
        // this.eventTarget.addEventListener('collision', this.behaviourFadeOut.bind(this));
    }

    public update() {
        this.circle.x += this.speedX;
        this.circle.y += this.speedY;

        if (   this.circle.x <= 0
            || this.circle.x >= this.canvas.width / window.devicePixelRatio
        ) {
            this.speedX *= -1;
            this.eventTarget.dispatchEvent(new Event('collision'));
        }

        if (   this.circle.y <= 0
            || this.circle.y >= this.canvas.height / window.devicePixelRatio
        ) {
            this.speedY *= -1;
            this.eventTarget.dispatchEvent(new Event('collision'));
        }
    }

    public draw() {
        this.circle.fillColor = this.getColor();
        this.circle.strokeColor = this.getColor();

        this.circle.draw();
    }

    public isDeletable(): boolean {
        return this.alpha <= 0 || this.circle.radius <= 0;
    }

    private getColor(): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`
    }

    private behaviourSlowDown() {
        this.speedX *= 0.9;
        this.speedY *= 0.9;
    }

    private behaviourShrinking() {
        this.circle.radius = Math.max(this.circle.radius - 2, 0);
    }

    private behaviourFadeOut() {
        this.alpha = Math.max(this.alpha - 0.3, 0);
    }

}