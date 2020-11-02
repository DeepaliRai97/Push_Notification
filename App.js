import React,{useEffect} from 'react';
import {StyleSheet,Text,View} from 'react-native';
import {checkPermission, createNotificationListensers} from './Notification';
const App = () => {
   useEffect(()=>{checkPermission();},[])
   useEffect(()=>{createNotificationListensers();},[])
    return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>hello</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    
})

export default App;