export class Player {
    public x: number;
    public y: number;
    public rotation: number;
    public velocity: number;
    public id: number;

    constructor(id: number) {
        this.rotation = 0;
        this.x = 0;
        this.y = 0;
        this.velocity = 3;
        this.id = id;
    }

    public moveForward(deltaTime: number) {
        this.x += this.velocity * Math.cos(this.rotation) * deltaTime;
        this.y += this.velocity * Math.sin(this.rotation) * deltaTime;
    }
}