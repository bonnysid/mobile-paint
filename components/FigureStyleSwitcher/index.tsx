import { FC } from 'react';
import { FigureStyle } from '../../providers';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface IProps {
    currentStyle: FigureStyle;
    toggleStyle: () => void;
}

export const FigureStyleSwitcher: FC<IProps> = ({ currentStyle, toggleStyle }) => {
    return (
        <TouchableOpacity onPress={toggleStyle}>
            <View style={styles.container}>
                <Image
                    source={currentStyle === FigureStyle.STROKE
                        ? require('../../assets/baseline_radio_button_unchecked_white_24dp.png')
                        : require('../../assets/round_circle_white_24dp.png')
                    }
                    style={styles.image}
                />
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
    image: {
        width: 30,
        height: 30,
    },
})
