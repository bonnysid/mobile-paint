import { IRenderable } from './Figure';
import { CanvasRenderingContext2D } from 'react-native-canvas';
import uuid from 'react-native-uuid';

interface IBrushProps {
    width: number;
    color: string;
}

interface IPoint {
    x: number;
    y: number;
}

export class Brush implements IRenderable {
    public id: string;
    public width: number;
    public color: string;
    public points: IPoint[] = [];

    constructor(props: IBrushProps) {
        this.id = uuid.v4() as string;
        this.width = props.width;
        this.color = props.color;
    }

    public addPoint(point: IPoint) {
        this.points.push(point);
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        this.points.forEach(point => {
            ctx.lineTo(point.x, point.y);
        })
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }
}
