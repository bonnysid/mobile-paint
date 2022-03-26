import { FC, useState } from 'react';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface IProps {
    colors: string[];
    currentColor: string;
    onSwitch: (color: string) => void;
}

export const ColorSwitcher: FC<IProps> = ({ currentColor, colors, onSwitch }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onPressCurrentColor = () => {
        setIsOpen(prev => !prev);
    }

    const onPressColor = (color: string) => {
        setIsOpen(false);
        onSwitch(color);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressCurrentColor}>
                <View style={[styles.currentColor, styles.color, { backgroundColor: currentColor }]} />
            </TouchableOpacity>
            <View style={[styles.colorsWrapper, isOpen && styles.activeColorsWrapper]}>
                {colors.map((color, i) => (
                    <TouchableWithoutFeedback key={color} onPress={() => onPressColor(color)}>
                        <View
                            style={[
                                styles.color,
                                {
                                    backgroundColor: color,
                                    marginBottom: i === colors.length - 1 ? 0 : 10
                                }
                            ]}
                        />
                    </TouchableWithoutFeedback>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 40,
        height: 40,
    },

    color: {
        width: 38,
        height: 38,
        borderRadius: 20,
    },

    colorsWrapper: {
        position: 'absolute',
        display: 'none',
        bottom: 40,
        left: -20,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#443485'
    },

    activeColorsWrapper: {
        display: 'flex',
    },

    currentColor: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#997dd2',
    },
})
