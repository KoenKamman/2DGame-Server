import { Player } from "./player";
import { Ticker } from "./ticker";
import { Subject } from 'rxjs';

interface Snapshot {
    players: Player[]
}

export class Game {
    private ticker: Ticker;

    public snapshot: Subject<Snapshot>;
    public players: Player[];

    constructor() {
        this.snapshot = new Subject<Snapshot>();
        this.players = [];
        this.ticker = new Ticker(this.gameLoop, 12);
    }

    private gameLoop = (deltaTime: number): void => {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].moveForward(deltaTime);
        }
        this.snapshot.next({ players: this.players });
    }
}