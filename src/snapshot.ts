import { Game } from "./game";
import { Player } from "./entities/player";

export class Snapshot {
    public timestamp: number;
    public players: Array<Player>;

    constructor(game: Game) {
        this.players = game.players;
        this.timestamp = Date.now();
    }
}