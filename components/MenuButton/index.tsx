import { FC, useMemo } from 'react';
import {
    GestureResponderEvent,
    Image, StyleProp,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { stopPropagation } from '../../helpers/events';

interface IMenuButtonProps {
    icon: any;
    onPress: () => void;
    isActive?: boolean;
    customStyles?: any;
}

export const MenuButton: FC<IMenuButtonProps> = ({ icon, isActive, onPress, customStyles }) => {
    const handlePress = (e: GestureResponderEvent) => {
        stopPropagation(e);
        onPress();
    }

    const containerStyles = useMemo(() => {
        const res: any[] = [styles.container];
        isActive && res.push(styles.active);
        customStyles && res.push(customStyles);
        return res;
    }, [customStyles, isActive]);

    return (
        <TouchableOpacity onPress={handlePress}>
            <View
                onTouchStart={stopPropagation}
                onTouchMove={stopPropagation}
                onTouchEnd={stopPropagation}
                style={containerStyles}
            >
                <Image source={icon} style={styles.image} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    active: {
        borderRadius: 5,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#997dd2'
    },

    image: {
        width: 30,
        height: 30,
    }
})
