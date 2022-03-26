import { FC } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { usePaintMenu } from '../../providers';
import { stopPropagation } from '../../helpers/events';
import { ColorSwitcher } from '../ColorSwitcher';
import { LineWidthSwitcher } from '../LineWidthSwitcher';
import { FigureStyleSwitcher } from '../FigureStyleSwitcher';
import { MenuIconButton } from '../MenuIconButton';

const COLORS = [
    '#333',
    '#3a4eb0',
    '#9b2c4d',
    '#b6b13e',
    '#3eb64e',
    '#a345b7',
    '#ffffff',
];

const lineWidths = [
    3,
    6,
    9,
    12,
    15,
    18,
    21,
];

interface IProps {
    undo: () => void;
    redo: () => void;
    disabledUndo: boolean;
    disabledRedo: boolean;
}

export const BottomMenu: FC<IProps> = ({ disabledRedo, disabledUndo, undo, redo }) => {
    const {
        selectedColor,
        changeColor,
        changeLineWidth,
        selectedLineWidth,
        figureStyle,
        toggleFigureStyle,
    } = usePaintMenu();

    return (
        <SafeAreaView
            onTouchStart={stopPropagation}
            onTouchEnd={stopPropagation}
            onTouchMove={stopPropagation}
            style={styles.container}
        >
            <View style={styles.wrapper}>
                <ColorSwitcher
                    currentColor={selectedColor}
                    onSwitch={changeColor}
                    colors={COLORS}
                />
                <FigureStyleSwitcher
                    currentStyle={figureStyle}
                    toggleStyle={toggleFigureStyle}
                />
                <LineWidthSwitcher
                    onSwitch={changeLineWidth}
                    currentLineWidth={selectedLineWidth}
                    lineWidths={lineWidths}
                />
                <MenuIconButton
                    icon={require('../../assets/round_undo_white_24dp.png')}
                    onPress={undo}
                    disabled={disabledUndo}
                />
                <MenuIconButton
                    icon={require('../../assets/round_redo_white_24dp.png')}
                    onPress={redo}
                    disabled={disabledRedo}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        width: '100%',
        height: 70,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
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
