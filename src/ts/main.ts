import '../css/style.css';
import {BaseGame} from "./base-game";
import {PaintGame} from "./games/paint-game";
import {RandomWalkerGame} from "./games/random-walker-game";
import {ParticleGame} from "./games/particle-game";
import {FloaterGame} from "./games/floater-game";

class Main {

    static async start() {
        // const game = new ParticleGame();
        // const game = new PaintGame();
        // const game = new RandomWalkerGame();
        const game = new FloaterGame();

        game.run();

    }
}

Main.start();