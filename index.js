import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

const createNotificationChannel = async () => {
    await notifee.createChannel({
        id: 'default-channel',
        name: 'Default Channel',
        description: 'A default channel for notifications',
        importance: notifee.AndroidImportance.HIGH,
        vibration: true,
    });
};

createNotificationChannel();

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('📩 Background FCM Message:', JSON.stringify(remoteMessage, null, 2));

    await notifee.displayNotification({
        title: remoteMessage.notification?.title + ' (Notifee)' || 'Notification',
        body: remoteMessage.notification?.body + ' - Abhishek' || 'You have a new message',
        android: {
            channelId: 'default-channel',
            smallIcon: 'ic_launcher',
            pressAction: {
                id: 'default',
            },
        },
    }); ``
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    console.log('🔥 Background Event Triggered');
    console.log('Type:', type);
    console.log('Notification:', JSON.stringify(notification, null, 2));
    console.log('PressAction:', pressAction);

    if (type === EventType.ACTION_PRESS && pressAction.id === 'default') {
        console.log('✅ Notification action pressed');
        await notifee.cancelNotification(notification.id);
    }
});

AppRegistry.registerComponent(appName, () => App);
