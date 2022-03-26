import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaintMobile } from './components';
import { EditorProvider, PaintMenuProvider } from './providers';

export default function App() {
    return (
        <View style={styles.container}>
            <EditorProvider>
                <PaintMenuProvider>
                    <PaintMobile />
                </PaintMenuProvider>
            </EditorProvider>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
