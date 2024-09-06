import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import RootNavigator from './src/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  React.useEffect (() => {

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', JSON.stringify(remoteMessage));
      PushNotification.localNotification({
        channelId: 'default-channel-id',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
    });
    
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
    console.log('Foreground message:' , remoteMessage);
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
    });
      });
    
    const unsubscribeOnNotificationOpenApp = messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log('App opened by notification while in foreground:',remoteMessage);
    
    });
    
    messaging().getInitialNotification(async remoteMessage => {
      console.log('App opened by notification from closed state:',remoteMessage);
    
    });
    
    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenApp();
    };
      },[]);
    
  return (
    <SafeAreaView style={styles.container}>
      {/* <RootNavigator /> */}
      <Text>Notification</Text>
    </SafeAreaView>
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
