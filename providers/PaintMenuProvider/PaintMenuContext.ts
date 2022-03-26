import { BrushNames } from './types';
import { createContext } from 'react';
import { FigureStyle } from '../EditorProvider';

interface IPaintMenuContext {
    selectedBrush: BrushNames;
    selectedColor: string;
    selectedLineWidth: number;
    figureStyle: FigureStyle;
    changeColor: (color: string) => void;
    changeBrush: (brush: BrushNames) => void;
    changeLineWidth: (width: number) => void;
    toggleFigureStyle: () => void;
}

const initValue: IPaintMenuContext = {
    selectedLineWidth: 3,
    changeBrush: () => {},
    selectedBrush: BrushNames.BRUSH,
    selectedColor: '',
    figureStyle: FigureStyle.STROKE,
    changeColor: () => {},
    changeLineWidth: () => {},
    toggleFigureStyle: () => {},
}

export const PaintMenuContext = createContext(initValue);
