export interface Component {
    name: string;
    data: {
        [key: string]: any;
    };
}


// PositionComponent

export interface PositionData {
    x: number | null;
    y: number | null;
}
export class PositionComponent implements Component {
    public name = PositionComponent.name;
    public data: PositionData = {
        x: null,
        y: null
    }
}


// RotationComponent

export interface RotationData {
    rotation: number | null;
}
export class RotationComponent implements Component {
    public name = RotationComponent.name;
    public data: RotationData = {
        rotation: null
    }
}