import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
//import PushNotification from 'react-native-push-notification';
//Check whether Push Notifications are enabled or not
import {Alert} from 'react-native';
const checkPermission = async () => {
try {
const enabled = await messaging().hasPermission();
   if (enabled) {
      getToken();
      } else {
      requestPermission();
    }
  } catch (error) {
      console.log('$$$$', error);
 }
};
//Get Device Registration Token
const getToken = async () => {
   let fcmToken = await AsyncStorage.getItem('fcmToken');
   if (!fcmToken) {
      fcmToken = await messaging().getToken();
   if (fcmToken) {
       console.log('fcmToken:', fcmToken);
       await AsyncStorage.setItem('fcmToken', fcmToken);
    }
}
};
//Request for Push Notification
const requestPermission = async () => {
try {
   await messaging().requestPermission();
   // If user allow Push Notification
   getToken();
 } catch (error) {
   // If user do not allow Push Notification
   console.log('Rejected');
}
};
const createNotificationListensers = async () => {
// handling foreground messages
    messaging().onMessage(async remoteMessage => {
    console.log('foreground message handler');
    //alert(remoteMessage.notification.title)
    //alert(remoteMessage.notification.body)
    Alert.alert('New Notification',remoteMessage.notification.title+'\n'+remoteMessage.notification.body,[
        {text:'cancel',style:'cancel'},
        {
            text:'Go to history'
        }
    ],{cancelable:false}
    )
   /* PushNotification.localNotification({
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
      smallIcon: '@drawable/ic_notification',
});*/
});

  //background notification caused app to open
messaging().onNotificationOpenedApp(remoteMessage => {
console.log(
     'Notification caused app to open from background state:',
      remoteMessage.notification,
);
});
//quit state notification
messaging()
.getInitialNotification()
.then(remoteMessage => {
if (remoteMessage) {
console.log(
'Notification caused app to open from quit state:',
 remoteMessage.notification,
);
}
});
};
export {
   checkPermission,
  createNotificationListensers,

};