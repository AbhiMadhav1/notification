import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import RootNavigator from './src/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import PushNotification from 'react-native-push-notification';
import { store } from './src/store';
import { Provider } from 'react-redux';
const App = () => {
  React.useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('message', remoteMessage);
      console.log(
        'Message handled in the background!',
        JSON.stringify(remoteMessage),
      );
      PushNotification.localNotification({
        channelId: 'default-channel-id',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
    });

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message:', remoteMessage);
      PushNotification.localNotification({
        ...(Platform.OS === 'android' && {channelId: 'default-channel-id'}),
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
    });

    const unsubscribeOnNotificationOpenApp =
      messaging().onNotificationOpenedApp(async remoteMessage => {
        console.log(
          'App opened by notification while in foreground:',
          remoteMessage,
        );
      });

    messaging().getInitialNotification(async remoteMessage => {
      console.log(
        'App opened by notification from closed state:',
        remoteMessage,
      );
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenApp();
    };
  }, []);

  return (
    <Provider store={store}>
    <SafeAreaView style={styles.container}>
      <RootNavigator />
    </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
