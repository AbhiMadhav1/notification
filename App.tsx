import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

const App = () => {
  const [fcmToken, setFcmToken] = useState(null);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFCMToken();
    } else {
      console.log('User has not granted notification permission');
    }
  };

  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:', token);
        setFcmToken(token);
      }
    } catch (error) {
      console.log('Error getting FCM token:', error);
    }
  };

  useEffect(() => {
    requestUserPermission();

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const { notification, data } = remoteMessage;
      const notificationTitle = notification?.title || 'No Title';
      const notificationBody = notification?.body || 'No Body';

      Alert.alert(
        'Notification',
        `Title: ${notificationTitle}\nBody: ${notificationBody}`,
      );

      console.log('Message handled in the foreground!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notification</Text>
      {/* <Text style={styles.tokenText}>FCM Token: {fcmToken ? fcmToken : 'Fetching token...'}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    color: '#000',
  },
  tokenText: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});

export default App;
