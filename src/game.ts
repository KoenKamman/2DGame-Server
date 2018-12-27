import { Player } from "./entities/player";
import { Ticker } from "./ticker";
import { Snapshot } from "./snapshot";

export interface GameOptions {
    tickRate: number
}

export class Game {
    private ticker: Ticker;
    private tickRate: number;

    public players: Player[];

    constructor(options: GameOptions) {
        this.tickRate = options.tickRate;
        this.players = [];
        this.ticker = new Ticker(this.gameLoop, this.tickRate);
    }

    private gameLoop = (deltaTime: number): void => {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].moveForward(deltaTime);
        }
    }

    public snapshot() {
        return new Snapshot(this);
    }
}