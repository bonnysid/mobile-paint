import { FC, useState } from 'react';
import { PaintMenuContext } from './PaintMenuContext';
import { BrushNames } from './types';
import { FigureStyle } from '../EditorProvider';

export const PaintMenuProvider: FC = ({ children }) => {
    const [selectedBrush, setBrush] = useState<BrushNames>(BrushNames.BRUSH);
    const [figureStyle, setFigureStyle] = useState<FigureStyle>(FigureStyle.STROKE);
    const [selectedColor, setColor] = useState('#333');
    const [selectedLineWidth, setSelectedLineWidth] = useState(3);

    const toggleFigureStyle = () => {
        setFigureStyle(prev => prev === FigureStyle.STROKE ? FigureStyle.FILL : FigureStyle.STROKE);
    }

    return (
        <PaintMenuContext.Provider
            value={{
                selectedBrush,
                changeBrush: setBrush,
                selectedColor,
                changeColor: setColor,
                selectedLineWidth,
                changeLineWidth: setSelectedLineWidth,
                figureStyle,
                toggleFigureStyle,
            }}
        >
            {children}
        </PaintMenuContext.Provider>
    )
}
