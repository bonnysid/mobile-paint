import { Figure, FigureStyle, IFigureProps, IRenderable } from './Figure';
import { CanvasRenderingContext2D } from 'react-native-canvas';

interface ICircleProps extends IFigureProps {
    lineWidth: number;
    radius: number;
}

export class Circle extends Figure implements IRenderable {
    public radius: number;
    public lineWidth: number;

    constructor(props: ICircleProps) {
        super(props);
        this.radius = props.radius;
        this.lineWidth = props.lineWidth;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();

        ctx.arc(this.x, this.y, this.radius,0,Math.PI*2,true);
        ctx.lineWidth = this.lineWidth;

        if (this.style === FigureStyle.STROKE) {
            ctx.strokeStyle = this.color;
            ctx.stroke();
        } else {
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        ctx.closePath();
    }
}
