import { FC, useEffect, useState } from 'react';
import { EditorContext, IUndoRedo } from './EditorContext';
import { IRenderable } from './partials';
import uuid from 'react-native-uuid';

export const EditorProvider: FC = ({ children }) => {
    const [undoStack, setUndoStack] = useState<IUndoRedo[]>([]);
    const [redoStack, setRedoStack] = useState<IUndoRedo[]>([]);
    const [figures, setFigures] = useState<IRenderable[]>([]);
    const [needRerender, setNeedRerender] = useState<boolean>(false);

    const addFigure = (figure: IRenderable) => {
        setFigures(prev => [...prev, figure]);
        setUndoStack(prev => [
            ...prev,
            {
                id: uuid.v4() as string,
                undo: () => setFigures(prev => prev.filter(fig => figure.id !== fig.id)),
                redo: () => setFigures(prev => [...prev, figure]),
            }
        ]);
        setNeedRerender(false);
    };

    const undo = () => {
        if (undoStack.length) {
            const functions = undoStack[undoStack.length - 1];
            functions.undo();
            setUndoStack(prev => prev.filter(undo => undo.id !== functions.id));
            setRedoStack(prev => [...prev, functions]);
            setNeedRerender(true);
        }
    }

    const redo = () => {
        if (redoStack.length) {
            const functions = redoStack[redoStack.length - 1];
            functions.redo();
            setRedoStack(prev => prev.filter(redo => redo.id !== functions.id));
            setUndoStack(prev => [...prev, functions]);
            setNeedRerender(true);
        }
    }

    const resetFigures = () => {
        setUndoStack(prev => [
            ...prev,
            {
                id: uuid.v4() as string,
                undo: () => setFigures(figures),
                redo: () => setFigures([]),
            }
        ])
        setFigures([]);
    };

    return (
        <EditorContext.Provider
            value={{
                addFigure,
                figures,
                resetFigures,
                undo,
                redo,
                disabledRedo: !redoStack.length,
                disabledUndo: !undoStack.length,
                needRerender
            }}
        >
            {children}
        </EditorContext.Provider>
    );
}


