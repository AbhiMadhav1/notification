import messaging from '@react-native-firebase/messaging';
import { Platform, StyleSheet } from 'react-native';
import RootNavigator from './src/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import PushNotification from 'react-native-push-notification';
import { Provider } from 'react-redux';
import store from './src/store';

const App = () => {
  // useEffect(() => {
  //   // Foreground message handler
  //   const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
  //     console.log('Foreground message:', remoteMessage);
  //     PushNotification.localNotification({
  //       ...(Platform.OS === 'android' && { channelId: 'default-channel-id' }),
  //       title: remoteMessage.notification?.title,
  //       message: remoteMessage.notification?.body,
  //     });
  //   });

  //   // App opened from background
  //   const unsubscribeOnNotificationOpenApp = messaging().onNotificationOpenedApp(
  //     remoteMessage => {
  //       console.log('App opened from background by notification:', remoteMessage);
  //     }
  //   );

  //   // App opened from quit state
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log('App opened from quit state by notification:', remoteMessage);
  //       }
  //     });

  //   return () => {
  //     unsubscribeOnMessage();
  //     unsubscribeOnNotificationOpenApp();
  //   };
  // }, []);

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
