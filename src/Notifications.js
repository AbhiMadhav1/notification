import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

class Notifications {
  constructor() {
    PushNotification.configure({
      onRegister: function (token) {
        // console.log('TOKEN:', token); // You can check the token here
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios', // Make sure permissions are requested for iOS
      permissions: {
        alert: true,
        badge: false,
        sound: true, // Set sound to true
      },
    });

    PushNotification.createChannel(
      {
        channelId: 'reminders',
        channelName: 'Task reminder notifications',
        channelDescription: 'Reminder for any tasks',
      },
      () => { },
    );
  }

  schduleNotification(date) {
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: '🔔 Reminder!',
      message: 'You have set this reminder',
      date, // Date object should be valid
      allowWhileIdle: true, // Ensures notification can trigger when app is idle
      soundName: 'default', // Ensure default sound is used
    });
  }
}

export default new Notifications();
