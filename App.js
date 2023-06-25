import { StyleSheet, LogBox, Platform } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import React, { useState, useEffect } from 'react'
import { DefaultTheme, Provider as PaperProvider, configureFonts, } from 'react-native-paper';
import { colors, fontSizes, savelocalStorageData } from './src/assets/Schemes/Schemes';
import DataState from './src/assets/Context/DataState';
import { checkNotificationPermission, displayNotification, NotificationListener, requestUserPermission } from './src/assets/Schemes/NotificationServices';
import Router from './src/components/Router';



LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications



const fontConfig = {
  fontFamily: 'Poppins-Regular',
  fontSize: fontSizes.default,
  color: "black"
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
  }, [])

  useEffect(() => {
    if (Platform.OS == "android") {
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage?.data?.video_token) {
            savelocalStorageData("accessToken", remoteMessage?.data?.video_token)
            savelocalStorageData("ID", remoteMessage?.data?.appo_id)
            savelocalStorageData('doctorNameDuringCall', remoteMessage?.data?.doctor_name)
            setInitialRoute("CallingScreen"); // e.g. "Settings"
            //console.log("VideoTrigger")
          }
          setLoading(false);
        });
    }
    else {
      PushNotificationIOS.getInitialNotification().then(remoteMessage => {
        //console.log("remoteMessage at PushNotificationIOS get initial", remoteMessage)
        if (remoteMessage?._data?.video_token) {
          savelocalStorageData("accessToken", remoteMessage?._data?.video_token)
          savelocalStorageData("ID", remoteMessage?._data?.appo_id)
          savelocalStorageData('doctorNameDuringCall', remoteMessage?._data?.doctor_name)
          setInitialRoute("CallingScreen"); // e.g. "Settings"
          //console.log("VideoTrigger")
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
        <Router initialRoute={initialRoute} />
      </PaperProvider>
    </DataState>
  );
}
export default App
