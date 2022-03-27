import { IRenderable } from './Figure';
import { CanvasRenderingContext2D, ImageData } from 'react-native-canvas';
import uuid from 'react-native-uuid';

interface IBrushProps {
    width: number;
    color: string;
    ctx?: CanvasRenderingContext2D;
    renderedCtx?: CanvasRenderingContext2D;
}

interface IPoint {
    x: number;
    y: number;
}

interface IBrushImage {
    x: number;
    y: number;
    width: number;
    height: number;
    imageData: ImageData;
}

export class Brush implements IRenderable {
    public id: string;
    public width: number;
    public color: string;
    public points: IPoint[] = [];
    public image?: IBrushImage;
    public ctx?: CanvasRenderingContext2D;
    public renderedCtx?: CanvasRenderingContext2D;
    public withoutRender: boolean = true;

    constructor(props: IBrushProps) {
        this.id = uuid.v4() as string;
        this.width = props.width;
        this.color = props.color;
        this.ctx = props.ctx;
        this.renderedCtx = props.renderedCtx;
    }

    public addPoint(point: IPoint) {
        this.points.push(point);

        if (this.ctx) {
            this.renderPoint(point, this.ctx);
        }
    }

    public configure() {
        if (this.ctx && this.renderedCtx) {
            this.ctx.strokeStyle = this.color;
            this.ctx.fillStyle = this.color;
            this.ctx.lineWidth = this.width;

            this.renderedCtx.strokeStyle = this.color;
            this.renderedCtx.fillStyle = this.color;
            this.renderedCtx.lineWidth = this.width;
        }
    }

    public renderPoint(point: IPoint, ctx: CanvasRenderingContext2D): Promise<void> {
        return new Promise(resolve => {
            this.configure();
            if (ctx) {
                ctx.lineTo(point.x, point.y);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(point.x, point.y, this.width / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();

                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.closePath();
            }
            resolve();
        })
    }

    public render(ctx: CanvasRenderingContext2D): Promise<void> {
        return new Promise(resolve => {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.lineWidth = this.width;
            if (this.renderedCtx) {
                this.renderedCtx.lineWidth = this.width;
                this.renderedCtx.fillStyle = this.color;
                this.renderedCtx.strokeStyle = this.color;

                this.points.forEach(point => {
                    if (this.renderedCtx) {
                        this.renderPoint(point, this.renderedCtx);
                    }
                })
            }
            ctx.closePath();
            resolve();
        });
    }
}
