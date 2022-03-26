import { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface IProps {
    disabled?: boolean;
    icon: any;
    onPress: () => void;
}

export const MenuIconButton: FC<IProps> = ({ icon, onPress, disabled }) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={[styles.container, disabled && styles.disabled]}>
                <Image source={icon} style={styles.image} />
            </View>
        </TouchableOpacity>
    );
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
    disabled: {
        opacity: 0.5
    }
})
