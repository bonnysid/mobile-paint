import { IRenderable } from './Figure';
import { CanvasRenderingContext2D, ImageData } from 'react-native-canvas';
import uuid from 'react-native-uuid';

interface IBrushProps {
    width: number;
    color: string;
    ctx?: CanvasRenderingContext2D;
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

    constructor(props: IBrushProps) {
        this.id = uuid.v4() as string;
        this.width = props.width;
        this.color = props.color;
        this.ctx = props.ctx;
    }

    public addPoint(point: IPoint) {
        this.points.push(point);

        if (this.ctx) {
            this.renderPoint(point);
        }
    }

    public async updateImageData() {
        if (this.ctx) {
            console.log("UPDATE IMAGE DATA")
            const xCoords = this.points.map(point => point.x);
            const yCoords = this.points.map(point => point.y);
            const minX = Math.min(...xCoords);
            const minY = Math.min(...yCoords);
            const maxX = Math.max(...xCoords);
            const maxY = Math.max(...yCoords);
            const width = Math.abs(maxX - minX);
            const height = Math.abs(maxY - minY);

            this.image = {
                x: minX,
                y: minY,
                imageData: await this.ctx.getImageData(minX, minY, width, height),
                width,
                height
            };
        }
    }

    public renderPoint(point: IPoint) {
        if (this.ctx) {
            this.ctx.lineTo(point.x, point.y);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, this.width / 2, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();

            this.ctx.beginPath();
            this.ctx.moveTo(point.x, point.y);
            this.ctx.closePath();
        }
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineWidth = this.width;
        this.points.forEach(point => {
            this.renderPoint(point);
        })
        ctx.closePath();
    }
}
