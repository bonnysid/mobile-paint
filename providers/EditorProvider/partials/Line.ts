import { Figure, IFigureProps, IRenderable } from './Figure';
import { CanvasRenderingContext2D } from 'react-native-canvas';

interface ILineProps extends IFigureProps {
    endX: number;
    endY: number;
    width?: number;
}

export class Line extends Figure implements IRenderable {
    public endX: number;
    public endY: number;
    public width: number;

    constructor(props: ILineProps) {
        super(props);
        this.endX = props.endX;
        this.endY = props.endY;
        this.width = props.width || 3;
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();

        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.endX, this.endY);

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.stroke();

        ctx.closePath();
    }
}
