import 'normalize.css';
import '../css/style.css';
import {BaseGame} from "./base-game";
import {PaintGame} from "./games/paint-game";
import {RandomWalkerGame} from "./games/random-walker-game";
import {ParticleGame} from "./games/particle-game";
import {RandomWalkerFloaterGame} from "./games/random-walker-floater-game";
import {LineDiagram} from "./games/line-diagram";

class Main {

    static async start() {
        // const game = new ParticleGame();
        // const game = new PaintGame();
        // const game = new RandomWalkerGame();
        // const game = new RandomWalkerFloaterGame();
        const game = new LineDiagram();

        game.run();
    }

}

Main.start();