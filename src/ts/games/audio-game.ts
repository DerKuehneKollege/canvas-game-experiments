import {makeNoise2D} from "open-simplex-noise/lib/2d";
import {BaseGame} from "../base-game";
import {Helpers} from "../helpers";

export class AudioGame extends BaseGame {

    private uiDiv!: HTMLDivElement;

    constructor() {
        super();

        this.canvas.style.background = '#fff';

        this.createUi();
        this.setupAudio();
    }

    protected init(): void {
        // nothing to do
    }

    protected update(time: number): void {
        // nothing to do
    }

    protected render(time: number): void {
        this.clearCanvas();

        // nothing to do
    }

    private createUi() {
        // UI
        const uiDiv = document.createElement('div');
        uiDiv.classList.add('game-ui-overlay');
        uiDiv.style.padding = '1rem';
        // uiDiv.style.display = 'none';

        document.body.appendChild(uiDiv);

        this.uiDiv = uiDiv;
    }

    private setupAudio() {
        const audioContext = new AudioContext();

        console.log('sampleRate:', audioContext.sampleRate);

        const audioBuffer = audioContext.createBuffer(
            1, // Mono
            audioContext.sampleRate * 1, // 1 second
            audioContext.sampleRate
        );

        const channelData = audioBuffer.getChannelData(0);
        const noise2D = makeNoise2D(Date.now());

        let noiseTx = 0;

        for (let i = 0; i < audioBuffer.length; i++) {
            channelData[i] = Helpers.map(noise2D(noiseTx, 1), -1, 1, 0.2, 1);
            noiseTx += 0.05;
        }

        const primaryGainControl = audioContext.createGain();
        primaryGainControl.gain.setValueAtTime(0.1, 0);

        primaryGainControl.connect(audioContext.destination);

        // UI
        const playButtonElement = document.createElement('button');
        playButtonElement.textContent = 'Play';

        playButtonElement.onclick = () => {
            const whiteNoiseSource = audioContext.createBufferSource();
            whiteNoiseSource.buffer = audioBuffer;
            whiteNoiseSource.connect(primaryGainControl);

            whiteNoiseSource.start();
        }

        this.uiDiv.appendChild(playButtonElement);

    }

}