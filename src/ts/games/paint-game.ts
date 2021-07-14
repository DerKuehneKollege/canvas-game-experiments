import {BaseGame} from "../base-game";
import {Helpers} from "../helpers";
import {Circle} from "../objects/circle";
import {Rectangle} from "../objects/rectangle";

export class PaintGame extends BaseGame {

    private mouseDragCircle: Circle;

    constructor() {
        super();

        this.mouseDragCircle = new Circle(this.ctx);
    }

    protected init(): void {
        // nothing to do
    }

    protected update(time: number): void {
        if (this.mouseState.lmbDown) {
            this.mouseDragCircle.visible = true;
            this.mouseDragCircle.x = this.mouseState.x;
            this.mouseDragCircle.y = this.mouseState.y;
        }

        if (this.mouseState.rmbDown) {
            this.mouseDragCircle.visible = false;
        }
    }

    protected render(time: number): void {
        // this.clearCanvas();

        this.mouseDragCircle.draw();
    }

}