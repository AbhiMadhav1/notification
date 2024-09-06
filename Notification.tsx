import { requestPermission } from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet,  } from 'react-native';
import  PushNotification  from 'react-native-push-notification';

const Notification = () => {

useEffect (() => {
    PushNotification.configure({
        onRegister: function (token) {
            console.log("TOKEN:", token);
        },
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
        },
        requestPermission: true;
    }); 

    PushNotification.createChannel(
        {
          channelId: "updated-channel-id", // (required)
          channelName: "My channel", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) 
          playSound: false, // (optional) 
          soundName: "default", // (optional)
          importance: 4, // (optional)
          vibrate: true, // (optional) 
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) 
      );
      openSettings();

      PushNotification.localNotification({
        channelId: "updated-channel-id",
        title: "Notification Title",
        message: "This is a local notification message.",
      });


})

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
  },
});
