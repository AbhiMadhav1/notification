import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AppState } from 'react-native';
import PushNotification from 'react-native-push-notification';

// Configure push notifications
PushNotification.configure({
  onNotification: function (notification) {
    console.log('Notification received:', notification);
    notification.finish(PushNotification.FetchResult.NoData);
  },
  requestPermissions: true,
  popInitialNotification: true,
});

// Create a channel for Android notifications
PushNotification.createChannel(
  {
    channelId: 'default-channel-id',
    channelName: 'Default Channel',
    channelDescription: 'A channel for default notifications',
    soundName: 'default',
    importance: PushNotification.Importance.HIGH,
    vibrate: true,
  },
  created => console.log(`Channel created: ${created}`),
);

const App = () => {
  const handleImmediateNotification = () => {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: 'Immediate Notification',
      message: 'This is an immediate notification!',
    });
  };

  const handleScheduledNotification = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'default-channel-id',
      title: 'Scheduled Notification',
      message: 'This notification will appear in 5 seconds!',
      date: new Date(Date.now() + 5 * 1000), // 5 seconds from now
      allowWhileIdle: true,
    });
    console.log('Scheduled notification for 5 seconds later.');
  };

  useEffect(() => {
    // Schedule a notification when the app goes to the background
    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'background') {
        PushNotification.localNotification({
          channelId: 'default-channel-id',
          title: 'App in Background',
          message: 'The app is running in the background!',
        });
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleImmediateNotification}>
        <Text style={styles.buttonText}>Immediate Notification</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={handleScheduledNotification}>
        <Text style={styles.buttonText}>Schedule Notification (5s)</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
