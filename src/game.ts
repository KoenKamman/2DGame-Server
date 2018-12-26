import { Player } from "./player";
import { Ticker } from "./ticker";

export interface GameOptions {
    tickRate: number
}

export interface Snapshot {
    players: Player[]
}

export class Game {
    private ticker: Ticker;
    private tickRate: number;

    public snapshot: Snapshot;
    public players: Player[];

    constructor(options: GameOptions) {
        this.snapshot = { players: [] };
        this.tickRate = options.tickRate;
        this.players = [];
        this.ticker = new Ticker(this.gameLoop, this.tickRate);
    }

    private gameLoop = (deltaTime: number): void => {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].moveForward(deltaTime);
        }
        this.snapshot = {players: this.players};
    }
}