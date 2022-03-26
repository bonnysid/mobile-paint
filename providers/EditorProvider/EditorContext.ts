import { createContext } from 'react';
import { IRenderable } from './partials';

export interface IUndoRedo {
    id: string;
    undo: () => void;
    redo: () => void;
}

export interface IEditorContext {
    figures: IRenderable[];
    addFigure: (figure: IRenderable) => void;
    resetFigures: () => void;
    undo: () => void;
    redo: () => void;
    disabledUndo: boolean;
    disabledRedo: boolean;
}

const initialState: IEditorContext = {
    figures: [],
    addFigure: () => {},
    resetFigures: () => {},
    undo: () => {},
    redo: () => {},
    disabledRedo: true,
    disabledUndo: true,
}

export const EditorContext = createContext<IEditorContext>(initialState)
