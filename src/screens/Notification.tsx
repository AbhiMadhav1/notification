import React, {useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {requestPermission} from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const Notification = () => {
  useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      requestPermissions: true,
    });
    PushNotification.createChannel(
      {
        channelId: 'updated-channel-id', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional)
        playSound: false, // (optional)
        soundName: 'default', // (optional)
        importance: 4, // (optional)
        vibrate: true, // (optional)
      },
      created => console.log(`createChannel returned '${created}'`), // (optional)
    );
    // PushNotification.localNotification({
    //   channelId: 'updated-channel-id',
    //   title: 'Notification Title',
    //   message: 'This is a local notification message.',
    // });
    PushNotification.localNotificationSchedule({
      message: 'My Notification Message', // (required)
      date: new Date(Date.now() + 60 * 1000), // in 60 secs
    });
    return () => {
      PushNotification.cancelAllLocalNotifications();
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Notification</Text>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});
