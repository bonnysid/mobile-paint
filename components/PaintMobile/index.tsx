import { FC, useEffect, useRef, useState } from 'react';
import { GestureResponderEvent, NativeTouchEvent, StyleSheet, View } from 'react-native';
import { Brush, BrushNames, Circle, Figure, Line, Rect, useEditor, usePaintMenu } from '../../providers';
import Canvas from 'react-native-canvas';
import { Menu } from '../Menu';
import { BottomMenu } from '../BottomMenu';

interface IPos {
    x: number;
    y: number;
}

export const PaintMobile: FC = () => {
    const [currentFigure, setCurrentFigure] = useState<Figure | Brush | null>(null);
    const [startPos, setStartPos] = useState<IPos>({ x: 0, y: 0});
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    const { selectedBrush, selectedColor, selectedLineWidth, figureStyle } = usePaintMenu();
    const {
        addFigure,
        render,
        clearWithFigures,
        disabledUndo,
        disabledRedo,
        onRedo,
        onUndo
    } = useEditor({ canvas });
    const canvasWrapper = useRef<View>(null);

    useEffect(() => {
        if (currentFigure) {
            addFigure(currentFigure);
        }
    }, [currentFigure]);


    const onTouchStart = (e: GestureResponderEvent) => {
        const touch = e.nativeEvent.touches[0];
        const x = touch.pageX;
        const y = touch.pageY;

        switch (selectedBrush) {
            case BrushNames.RECT:
                setStartPos({ y, x });
                setCurrentFigure(new Rect({
                    x,
                    y,
                    width: 0,
                    height: 0,
                    color: selectedColor,
                    lineWidth: selectedLineWidth,
                    style: figureStyle
                }));
                break;
            case BrushNames.LINE:
                setCurrentFigure(new Line({
                    x,
                    y,
                    endX: x,
                    endY: y,
                    color: selectedColor,
                    width: selectedLineWidth,
                    style: figureStyle
                }));
                break;
            case BrushNames.CIRCLE:
                setCurrentFigure(new Circle({
                    x,
                    y,
                    radius: 0,
                    color: selectedColor,
                    lineWidth: selectedLineWidth,
                    style: figureStyle
                }));
                break;
            case BrushNames.BRUSH:
                setCurrentFigure(new Brush({ width: selectedLineWidth, color: selectedColor }));
                break;
        }
    }

    const onTouchMove = (e: GestureResponderEvent) => {
        if (currentFigure) {
            const withClear = selectedBrush !== BrushNames.BRUSH;
            const touch = e.nativeEvent.touches[0];
            switch (selectedBrush) {
                case BrushNames.RECT:
                    drawRect(touch, currentFigure as Rect);
                    break;
                case BrushNames.LINE:
                    drawLine(touch, currentFigure as Line);
                    break;
                case BrushNames.CIRCLE:
                    drawCircle(touch, currentFigure as Circle);
                    break;
                case BrushNames.BRUSH:
                    drawBrush(touch, currentFigure as Brush);
                    break;
                default: break;
            }
            render(withClear);
        }
    }

    const onTouchEnd = (e: GestureResponderEvent) => {
        if (currentFigure) {
            setCurrentFigure(null);
        }
    }

    const drawRect = (e: NativeTouchEvent, figure: Rect) => {
        const x = e.pageX;
        const y = e.pageY;
        const isUp = y < startPos.y;
        const isLeft = x < startPos.x;

        figure.y = isUp ? y : startPos.y;
        figure.x = isLeft ? x : startPos.x;

        const width = Math.abs(figure.x - (isLeft ? startPos.x : x));
        const height = Math.abs(figure.y - (isUp ? startPos.y : y));

        figure.width = width;
        figure.height = height;
    }

    const drawLine = (e: NativeTouchEvent, figure: Line) => {
        const x = e.pageX;
        const y = e.pageY;

        figure.endX = x;
        figure.endY = y;
    }

    const drawCircle = (e: NativeTouchEvent, figure: Circle) => {
        const x = e.pageX;
        const y = e.pageY;

        const width = figure.x - x;
        const height = figure.y - y;

        figure.radius = Math.sqrt(width ** 2 + height ** 2);
    }

    const drawBrush = (e: NativeTouchEvent, figure: Brush) => {
        const x = e.pageX;
        const y = e.pageY;

        figure.addPoint({ x, y });
    }

    return (
        <View
            style={styles.container}
            ref={canvasWrapper}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
        >
            <Menu clear={clearWithFigures} />
            <Canvas ref={setCanvas} />
            <BottomMenu disabledRedo={disabledRedo} disabledUndo={disabledUndo} redo={onRedo} undo={onUndo} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
