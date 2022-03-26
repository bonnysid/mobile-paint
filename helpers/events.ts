import { GestureResponderEvent } from 'react-native';

export const stopPropagation = (e: GestureResponderEvent) => {
    e.stopPropagation();
}
