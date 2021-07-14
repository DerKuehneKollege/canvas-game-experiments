export class MouseState {

    /** X coordinate of the mouse */
    public x: number;

    /** Y coordinate of the mouse */
    public y: number;

    /** Is the left mouse button pressed */
    public lmbDown: boolean;

    /** Is the middle mouse button / mouse-wheel pressed */
    public mmbDown: boolean;

    /** Is the right mouse button pressed */
    public rmbDown: boolean;

    /** Is the back button pressed */
    public  bbDown: boolean;

    /** Is the forward button pressed */
    public fbDown: boolean;

    constructor() {
        this.x = 0;
        this.y = 0;
        this.lmbDown = false;
        this.mmbDown = false;
        this.rmbDown = false;
        this.bbDown = false;
        this.fbDown = false;
    }

    public updateByMouseEvent(ev: MouseEvent) {
        this.x = ev.x;
        this.y = ev.y;

        this.lmbDown = !!(ev.buttons & 1);
        this.rmbDown = !!(ev.buttons & 2);
        this.mmbDown = !!(ev.buttons & 4);
        this.bbDown  = !!(ev.buttons & 8);
        this.fbDown  = !!(ev.buttons & 16);
    }

    public updateByTouchEvent(ev: TouchEvent) {
        this.x = ev.changedTouches[0].pageX;
        this.y = ev.changedTouches[0].pageY;

        this.lmbDown = ev.type === 'touchstart' || ev.type === 'touchmove';
        this.rmbDown = false;
        this.mmbDown = false;
        this.bbDown  = false;
        this.fbDown  = false;
    }

}