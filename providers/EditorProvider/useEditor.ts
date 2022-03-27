import { useContext, useEffect, useState } from 'react';
import { EditorContext } from './EditorContext';
import Canvas, { CanvasRenderingContext2D, Image } from 'react-native-canvas';
import { Dimensions } from 'react-native';
import { IRenderable } from './partials';

interface IProps {
    canvas: Canvas | null;
    renderedCanvas: Canvas | null;
}

const options = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

export const useEditor = ({ canvas, renderedCanvas }: IProps) => {
    const { figures, resetFigures, undo, redo, needRerender, ...rest } = useContext(EditorContext);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
    const [renderedCtx, setRenderedCtx] = useState<CanvasRenderingContext2D>();

    useEffect(() => {
        if (needRerender) {
            fullRender();
        }
    }, [needRerender, figures]);

    useEffect(() => {
        if (canvas) {
            canvas.width = options.width;
            canvas.height = options.height;
            setCtx(canvas.getContext('2d'));
        }
    }, [canvas]);

    useEffect(() => {
        if (renderedCanvas) {
            renderedCanvas.width = options.width;
            renderedCanvas.height = options.height;
            setRenderedCtx(renderedCanvas.getContext('2d'));
        }
    }, [renderedCanvas]);

    const prerender = async (withClear: boolean = true) => {
        if (ctx) {
            if (withClear) {
                clear(ctx);
            }

            if (figures.length) {
                await figures[figures.length - 1].render(ctx);
            }
        }
    }

    const render = async () => {
        if (renderedCtx && figures[figures.length - 1]) {
            await figures[figures.length - 1].render(renderedCtx);
        }
    }

    const clear = (ctx: CanvasRenderingContext2D) => {
        if (ctx) {
            ctx.clearRect(0, 0, options.width, options.height);
        }
    }

    const clearWithFigures = () => {
        if (renderedCtx && ctx) {
            clear(renderedCtx);
            clear(ctx);
            resetFigures();
        }
    }

    const fullRender = () => {
        if (renderedCtx && ctx) {
            clear(renderedCtx);
            clear(ctx);
            figures.forEach(fig => fig.render(renderedCtx))
        }
    }

    return {
        ctx,
        render,
        clearWithFigures,
        figures,
        undo,
        redo,
        prerender,
        renderedCtx,
        ...rest,
    };
}
