import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';

export const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('✅ Notification permission granted');
        } else {
            console.log('❌ Notification permission denied');
        }
    }
};

export const getFcmToken = async () => {
    try {
        const token = await messaging().getToken();
        console.log('📲 FCM Token:', token);
    } catch (error) {
        console.log('⚠️ Error getting FCM token:', error);
    }
};

export const createNotificationChannel = async () => {
    await notifee.createChannel({
        id: 'default-channel',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
    });
};

// Foreground listener
export const setupNotificationListeners = () => {
    return messaging().onMessage(async remoteMessage => {
        console.log(' Foreground FCM Message:', JSON.stringify(remoteMessage, null, 2));

        await notifee.displayNotification({
            title: remoteMessage.notification?.title || 'Notification',
            body: remoteMessage.notification?.body || 'You have a new message',
            android: {
                channelId: 'default-channel',
                smallIcon: 'ic_launcher',
                pressAction: {
                    id: 'default',
                },
            },
        });
    });
};
