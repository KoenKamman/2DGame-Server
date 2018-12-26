export class Ticker {
    private lastTime: number;
    private tickRate: number;
    private callback: Function;

    constructor(callback: Function, tickRate: number) {
        this.lastTime = Date.now();
        this.tickRate = tickRate;
        this.callback = callback;
        this.tick();
    }

    private tick(): void {
        setInterval(() => {
            let time = Date.now();
            let deltaTime = time - this.lastTime;
            this.lastTime = time;
            let scalar = deltaTime / (1000 / this.tickRate);
            this.callback(scalar);
        }, 1000 / this.tickRate);
    }
}