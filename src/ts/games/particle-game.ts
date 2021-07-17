import {BaseGame} from "../base-game";
import {Particle} from "../objects/particle";

export class ParticleGame extends BaseGame {

    private readonly numParticles = 100;

    private particles: Particle[] = [];

    private audioCtx: AudioContext;

    constructor() {
        super();

        // @ts-ignore
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();

        this.particles = [];

        this.loadAudio().then((audioBuffer) => {
            for (let i = 0; i < this.numParticles; i++) {
                const particle = new Particle(this.ctx, this.canvas);
                particle.eventTarget.addEventListener('collision', () => { this.createTrack(audioBuffer).start(0); });
                this.particles.push(particle);
            }
        });
    }

    protected init() {
        // Nothing
    }

    protected update(time: number): void {
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];

            particle.update();

            if (particle.isDeletable()) {
                this.particles.splice(i, 1);
                console.debug(`Element an Stelle ${i} gelöscht`);
            }
        }
    }

    protected render(time: number): void {
        this.clearCanvas();

        for (const particle of this.particles) {
            particle.draw();
        }
    }

    private async loadAudio() {
        // @ts-ignore

        const response = await fetch('assets/ball.mp3');
        const arrayBuffer = await response.arrayBuffer();
        return await this.audioCtx.decodeAudioData(arrayBuffer);
    }

    private createTrack(audioBuffer: AudioBuffer) {
        const trackSource = this.audioCtx.createBufferSource();
        trackSource.buffer = audioBuffer;
        trackSource.connect(this.audioCtx.destination);

        return trackSource;
    }

}