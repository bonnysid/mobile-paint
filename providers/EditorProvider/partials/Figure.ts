import { CanvasRenderingContext2D } from 'react-native-canvas';
import uuid from 'react-native-uuid';

export interface IRenderable {
    id: string;
    render: (ctx: CanvasRenderingContext2D) => void;
}

export enum FigureStyle {
    STROKE = 'STROKE',
    FILL = 'FILL',
}

export interface IFigureProps {
    x: number;
    y: number;
    color?: string;
    style?: FigureStyle;
}

export class Figure implements IRenderable {
    public id: string;
    public x: number;
    public y: number;
    public color: string;
    public style: FigureStyle;

    constructor(props: IFigureProps) {
        this.id = uuid.v4() as string;
        this.x = props.x;
        this.y = props.y;
        this.color = props.color || '#333';
        this.style = props.style || FigureStyle.STROKE;
    }

    render(ctx: CanvasRenderingContext2D): void {}
}
