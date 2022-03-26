import { FC, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface IProps {
    lineWidths: number[];
    currentLineWidth: number;
    onSwitch: (width: number) => void;
}

export const LineWidthSwitcher: FC<IProps> = ({ currentLineWidth, lineWidths, onSwitch }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onPressCurrentLineWidth = () => {
        setIsOpen(prev => !prev);
    }

    const onPressLineWidth = (color: number) => {
        setIsOpen(false);
        onSwitch(color);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressCurrentLineWidth}>
                <Image source={require('../../assets/baseline_width_normal_white_24dp.png')} style={styles.image} />
            </TouchableOpacity>
            <View style={[styles.textsWrapper, isOpen && styles.textsWrapperActive]}>
                {lineWidths.map((width, i) => (
                    <TouchableWithoutFeedback key={width} onPress={() => onPressLineWidth(width)}>
                        <View style={[
                                styles.textContainer,
                                width === currentLineWidth && styles.activeTextContainer,
                                {
                                    marginBottom: i === lineWidths.length - 1 ? 0 : 10
                                }
                            ]}
                        >
                            <Text style={[styles.text]}>
                                {width}
                            </Text>
                        </View>
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
        justifyContent: 'center'
    },

    text: {
        fontSize: 17,
        color: '#fff',
    },

    textContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    activeTextContainer: {
        borderRadius: 5,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#997dd2'
    },

    textsWrapper: {
        position: 'absolute',
        display: 'none',
        bottom: 40,
        left: -25,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#443485'
    },

    textsWrapperActive: {
        display: 'flex',
    },

    image: {
        width: 30,
        height: 30,
    },
})
