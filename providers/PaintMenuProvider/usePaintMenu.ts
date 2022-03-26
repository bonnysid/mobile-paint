import { useContext } from 'react';
import { PaintMenuContext } from './PaintMenuContext';

export const usePaintMenu = () => {
    const value = useContext(PaintMenuContext);

    return value;
}
