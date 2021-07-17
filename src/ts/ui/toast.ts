export class Toast {

    private static container: HTMLDivElement | undefined;

    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    public display(durationMs = 2000) {
        const toastDiv = document.createElement('div');
        toastDiv.classList.add('game-ui-toast');
        toastDiv.textContent = this.text;
        toastDiv.style.opacity = '0.5';

        Toast.getContainer().appendChild(toastDiv);
        requestAnimationFrame(() => {
            toastDiv.classList.add('anim-fadein');
        });

        setTimeout(() => {
            toastDiv.style.animation = 'fadeOut 0.2s ease-in';
            toastDiv.style.opacity = '0';
            toastDiv.addEventListener('animationend', () => {
                toastDiv.remove();
                Toast.freeContainer();
            });
        }, durationMs);
    }

    private static getContainer(): HTMLDivElement {
        if (!Toast.container) {
            Toast.container = document.createElement('div');
            Toast.container.classList.add('game-ui-toast-container');
            document.body.appendChild(Toast.container);
        }

        return Toast.container;
    }

    private static freeContainer(): void {
        if (!Toast.container) {
            return;
        }

        if (Toast.container.childElementCount > 0) {
            return;
        }

        Toast.container.remove();
        Toast.container = undefined;
    }

}