import { FC } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { BrushNames, useEditor, usePaintMenu } from '../../providers';
import { MenuButton } from '../MenuButton';
import { stopPropagation } from '../../helpers/events';

const buttons = [
    {icon: require('../../assets/baseline_brush_white_24dp.png'), brush: BrushNames.BRUSH},
    {icon: require('../../assets/baseline_call_made_white_24dp.png'), brush: BrushNames.LINE},
    {icon: require('../../assets/baseline_crop_square_white_24dp.png'), brush: BrushNames.RECT},
    {icon: require('../../assets/baseline_radio_button_unchecked_white_24dp.png'), brush: BrushNames.CIRCLE},
]

interface IProps {
    clear: () => void;
}

export const Menu: FC<IProps> = ({ clear }) => {
    const {changeBrush, selectedBrush} = usePaintMenu();

    return (
        <SafeAreaView
            onTouchStart={stopPropagation}
            onTouchEnd={stopPropagation}
            onTouchMove={stopPropagation}
            style={styles.container}
        >
            <View style={styles.wrapper}>
                {buttons.map(({icon, brush}) => (
                    <MenuButton
                        key={brush}
                        isActive={brush === selectedBrush}
                        icon={icon}
                        onPress={() => changeBrush(brush)}
                    />
                ))}
                <MenuButton
                    icon={require('../../assets/baseline_delete_outline_white_24dp.png')}
                    onPress={clear}
                    customStyles={styles.deleteButton}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 0,
        width: '100%',
        height: 70,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        zIndex: 9999,
    },

    deleteButton: {
        borderLeftWidth: 2,
        borderStyle: 'solid',
        borderColor: '#997dd2',
        paddingLeft: 15
    },

    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        width: '95%',
        height: '100%',
        backgroundColor: '#443485',
        borderRadius: 20
    }
})
