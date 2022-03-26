import { useContext, useEffect, useState } from 'react';
import { EditorContext } from './EditorContext';
import Canvas, { CanvasRenderingContext2D } from 'react-native-canvas';
import { Dimensions } from 'react-native';

interface IProps {
    canvas: Canvas | null;
}

const options = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

export const useEditor = ({ canvas }: IProps) => {
    const { figures, resetFigures, undo, redo, ...rest } = useContext(EditorContext);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

    useEffect(() => {
        if (canvas) {
            canvas.width = options.width;
            canvas.height = options.height;
            setCtx(canvas.getContext('2d'));
        }
    }, [canvas]);

    useEffect(() => {
        render();
    }, [figures, ctx]);

    const render = (withClear: boolean = true) => {
        if (ctx) {
            if (withClear) {
                clear();
            }
            figures.forEach(figure => figure.render(ctx));
        }
    }

    const clear = () => {
        if (ctx) {
            ctx.clearRect(0, 0, options.width, options.height);
        }
    }

    const clearWithFigures = () => {
        if (ctx) {
            ctx.clearRect(0, 0, options.width, options.height);
            resetFigures();
        }
    }

    const onUndo = () => {
        undo();
        render();
    }

    const onRedo = () => {
        redo();
        render();
    }

    return {
        ctx,
        render,
        clearWithFigures,
        figures,
        onRedo,
        onUndo,
        ...rest,
    };
}
