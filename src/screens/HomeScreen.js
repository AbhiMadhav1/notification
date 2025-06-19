import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import notifee from '@notifee/react-native';
import { getFcmToken, requestNotificationPermission, setupNotificationListeners } from '../utils/ notificationService';

const HomeScreen = () => {
  useEffect(() => {
    const setup = async () => {
      await requestNotificationPermission();
      await getFcmToken();
      await setupNotificationListeners();
      await createNotificationChannel();
    };
    setup();
  }, []);

  const createNotificationChannel = async () => {
    await notifee.createChannel({
      id: 'default-channel',
      name: 'Default Channel',
      description: 'A default channel for notifications',
      importance: 4, // or use notifee.AndroidImportance.HIGH
      vibration: true,
    });
  };

  const showTestNotification = async () => {
    await notifee.displayNotification({
      title: 'Test Notification',
      body: 'This is a manually triggered notification!',
      android: {
        channelId: 'default-channel',
        smallIcon: 'ic_launcher', // make sure this exists!
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showTestNotification}>
        <Text style={styles.buttonText}>Show Test Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#13D4E0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
