import { Figure, FigureStyle, IFigureProps, IRenderable } from './Figure';
import { CanvasRenderingContext2D } from 'react-native-canvas'

interface IRectProps extends IFigureProps {
    width: number;
    height: number;
    lineWidth: number;
}

export class Rect extends Figure implements IRenderable {
    public width: number;
    public height: number;
    public lineWidth: number;

    constructor(props: IRectProps) {
        super(props);
        this.width = props.width;
        this.height = props.height;
        this.lineWidth = props.lineWidth;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();

        if (this.style === FigureStyle.STROKE) {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.lineWidth;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        ctx.closePath();
    }
}
