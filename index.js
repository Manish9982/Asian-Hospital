/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Text } from 'react-native-paper'
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from "react-native-push-notification";

messaging().requestPermission()
messaging().registerDeviceForRemoteMessages()

PushNotification.createChannel(
    {
        channelId: "video_calling", // (required)
        channelName: "Video Calling", // (required)
        channelDescription: "A channel to display your calls", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "samsung.mp3", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

messaging().setBackgroundMessageHandler(async (remoteMessage) => {

    // console.log('Message handled in the background!', remoteMessage);
    // console.log('DoctorName', remoteMessage?.data?.doctor_name);
    // console.log("VideoToken", remoteMessage?.data?.video_token)
    // console.log("Appointment Add", remoteMessage?.data?.appo_id)

})
function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        // console.log("Headless");
        return null;
    }

    return <App />;
}

    if(Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
AppRegistry.registerComponent(appName, () => HeadlessCheck);
