import { StyleSheet, LogBox, Platform } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import React, { useState, useEffect } from 'react'
import { DefaultTheme, Provider as PaperProvider, configureFonts, } from 'react-native-paper';
import { colors, fontSizes, savelocalStorageData } from './src/assets/Schemes/Schemes';
import DataState from './src/assets/Context/DataState';
import { checkNotificationPermission, displayNotification, NotificationListener, requestUserPermission } from './src/assets/Schemes/NotificationServices';
import Router from './src/components/Router';
import { changeIcon, getIcon } from 'react-native-change-icon';
import ToastManager from 'toastify-react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const fontConfig = {
  fontFamily: 'Poppins-Regular',
  fontSize: fontSizes.default,
  color: "#000"
};
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: colors.toobarcolor,
  },
  fonts: configureFonts({ config: fontConfig })
};

const App = () => {

  //const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Splash');

  useEffect(() => {
    requestUserPermission()
    checkNotificationPermission()
    // pass the icon name to change the icon 
  }, [])

  useEffect(() => {
    if (Platform.OS == "android") {
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          console.log('remoteMessage?.data', remoteMessage?.data)
          if (remoteMessage?.data?.video_token) {
            savelocalStorageData("accessToken", remoteMessage?.data?.video_token)
            savelocalStorageData("ID", remoteMessage?.data?.appo_id)
            savelocalStorageData('doctorNameDuringCall', remoteMessage?.data?.doctor_name)
            setInitialRoute("CallingScreen"); // e.g. "Settings"
            //console.log("VideoTrigger")
          }
          else {
            setInitialRoute(remoteMessage?.data?.onClick); // e.g. "Settings"
          }
          setLoading(false);
        });
    }
    else {
      PushNotificationIOS.getInitialNotification().then(remoteMessage => {
        //console.log("remoteMessage at PushNotificationIOS get initial", remoteMessage)
        console.log('remoteMessage?._data', remoteMessage?._data)
        if (remoteMessage?._data?.video_token) {
          savelocalStorageData("accessToken", remoteMessage?._data?.video_token)
          savelocalStorageData("ID", remoteMessage?._data?.appo_id)
          savelocalStorageData("doctorNameDuringCall", remoteMessage?._data?.doctor_name)
          setInitialRoute("CallingScreen"); // e.g. "Settings"
          //console.log("VideoTrigger")
        }
        else {
          setInitialRoute(remoteMessage?._data?.onClick); // e.g. "Settings"
        }
        setLoading(false);
      })
    }
  }, []);


  if (loading) {
    return null;
  }

  return (
    <DataState>
      <PaperProvider theme={theme}>
        <ToastManager
          duration={1000} />
        <Router initialRoute={initialRoute} />
      </PaperProvider>
    </DataState>
  );
}
export default App
