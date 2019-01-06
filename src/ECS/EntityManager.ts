import { Component, PositionComponent } from "../Components";

export class EntityManager {
    private entityCount: number;
    private components = new Map<number, Array<Component>>();
    private systems = [

    ];

    constructor() {
        this.entityCount = 0;
    }

    public createEntity(): number {
        const entity = Date.now() + this.entityCount;
        this.components.set(entity, new Array<Component>());
        this.entityCount++;
        return entity;
    }

    public createComponent<T extends Component>(entity: number, component: { new(): T; }): T | undefined {
        let components = this.components.get(entity);
        if (!components) return;
        let newComponent = new component;
        components.push(newComponent);
        return newComponent;
    }

    public getComponent<T extends Component>(entity: number, component: { new(): T; }): T | undefined {
        let components = this.components.get(entity);
        if (!components) return;
        return <T> components.find(x => x.name === component.name);
    }

}