import { Linking, Alert, Platform } from "react-native";


export openSettings = () => {
    Linking.openSettings().catch(() => {
        Alert.alert("Unable to open settings");
    })
}

export const checkPermissions = () => {
    if (Platform.OS === 'android') {
        
        openSettings();
    }
};