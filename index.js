 /**
 * @format
 */
/*
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
*/
import React from 'react';
import App from './App';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
 messaging().setBackgroundMessageHandler(async remoteMessage => {

  console.log('Message handled in the background!', remoteMessage);

 });

 

 function HeadlessCheck({isHeadless}) {

   if (isHeadless) {

     // App has been launched in the background by iOS, ignore

     return null;

   }
return <App />;

 }

 AppRegistry.registerComponent('app', () => HeadlessCheck);
 AppRegistry.registerComponent(appName, () => App);