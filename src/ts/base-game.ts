import {MouseState} from "./mouse-state";


export abstract class BaseGame {

    protected readonly canvas: HTMLCanvasElement;
    protected readonly ctx: CanvasRenderingContext2D;

    protected readonly mouseState: MouseState;

    protected fpsCounterEnabled = true;

    private fpsCounter = 0;
    private lastFps = 0;

    protected constructor() {
        this.mouseState = new MouseState();

        // create canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'game-canvas';
        document.body.appendChild(canvas);

        // create context
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Could not create 2D context');
        }

        // canvas should fill the complete window
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;

        // scale for HiDPI displays
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        ctx.translate(0.5, 0.5);

        // resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        });

        // disable right click context menu
        canvas.oncontextmenu = () => {
            return false;
        };

        // mouse events
        canvas.onmouseup = this.mouseState.updateByMouseEvent.bind(this.mouseState);
        canvas.onmousemove = this.mouseState.updateByMouseEvent.bind(this.mouseState);
        canvas.onmousedown = this.mouseState.updateByMouseEvent.bind(this.mouseState);

        // touch events
        canvas.ontouchstart = this.mouseState.updateByTouchEvent.bind(this.mouseState);
        canvas.ontouchmove = this.mouseState.updateByTouchEvent.bind(this.mouseState);
        canvas.ontouchend = this.mouseState.updateByTouchEvent.bind(this.mouseState);
        canvas.ontouchcancel = this.mouseState.updateByTouchEvent.bind(this.mouseState);

        window.setInterval(() => {
            this.lastFps = this.fpsCounter;
            this.fpsCounter = 0;
        }, 1000)

        this.canvas = canvas;
        this.ctx = ctx;

        this.init();
    }

    public run(): void {
        this.gameLoop();
    }

    protected abstract init(): void;

    protected abstract update(time: number): void;

    protected abstract render(time: number): void;

    protected gameLoop(): void {
        window.requestAnimationFrame(time => {
            this.update(time);
            this.render(time);

            if (this.fpsCounterEnabled) {
                this.renderFpsCounter();
            }

            this.gameLoop();
            this.fpsCounter++;
        });
    }

    protected clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    protected get left(): number {
        return 0;
    }

    protected get top(): number {
        return 0;
    }

    protected get right(): number {
        return this.canvas.width / window.devicePixelRatio;
    }

    protected get bottom(): number {
        return this.canvas.height / window.devicePixelRatio;
    }

    protected get centerX(): number {
        return this.canvas.width / window.devicePixelRatio / 2;
    }

    protected get centerY(): number {
        return this.canvas.height / window.devicePixelRatio / 2;
    }

    private renderFpsCounter() {
        this.ctx.textAlign = 'right';
        this.ctx.strokeStyle = '#000';
        this.ctx.font = '16px monospace';
        this.ctx.strokeText(`${this.lastFps} FPS`, this.right - 10, 16);
    }

}