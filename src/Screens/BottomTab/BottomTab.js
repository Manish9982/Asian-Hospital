import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react'
import { Image, Linking, Platform, Alert } from 'react-native';
import HomeNav from './HomeNav/HomeNav';
import BookingsNav from './ReportsNav/BookingsNav';
import MoreNav from './MoreNav/MoreNav';
import AppointmentsNav from './AppointmentsNav/AppointmentsNav';
import { colors, fontSizes, H, PostApiData, savelocalStorageData } from '../../assets/Schemes/Schemes';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { displayNotification } from '../../assets/Schemes/NotificationServices';
import { Constants } from '../../assets/Schemes/Constants';
import notifee, { EventType } from '@notifee/react-native';



const Tab = createBottomTabNavigator();
const BottomTab = () => {

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            //console.log('video_token============>', remoteMessage?.data?.video_token)
            if (remoteMessage?.data?.video_token) {
                if (remoteMessage?.data?.video_token == "end_call") {
                    //console.log("remoteMessage for hanging up call video token null", remoteMessage)
                    navigation.navigate("BottomTab")
                    //console.log('Call is Ended!!!')
                }
                else {
                    //console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
                    displayNotification(remoteMessage?.data?.title, remoteMessage?.data?.body)
                    savelocalStorageData('doctorNameDuringCall', remoteMessage?.data?.doctor_name)
                    savelocalStorageData('ID', remoteMessage?.data?.appo_id)
                    savelocalStorageData('accessToken', remoteMessage?.data?.video_token)
                    navigation.navigate("CallingScreen")
                }
            }
            else {
                displayNotification(remoteMessage?.data?.title, remoteMessage?.data?.body, remoteMessage?.data)
                //console.log("remoteMessage for hanging up call display", remoteMessage)
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        getToken()
        checkVersion()
    }, [])
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
            if (remoteMessage?.data?.video_token) {
                if (remoteMessage?.data?.video_token == "end_call") {
                    //console.log("remoteMessage for hanging up call for doc", remoteMessage)
                    //no navigation here because doctor needs to upload the prescription
                }
                else {
                    //console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
                    displayNotification(remoteMessage?.data?.title, remoteMessage?.data?.body)
                    // savelocalStorageData('doctorNameDuringCall', remoteMessage?.data?.doctor_name)
                    // savelocalStorageData('ID', remoteMessage?.data?.appo_id)
                    // savelocalStorageData('accessToken', remoteMessage?.data?.video_token)
                    // navigation.navigate("CallingScreen")
                }
            }
            else {
                displayNotification(remoteMessage?.data?.title, remoteMessage?.data?.body, remoteMessage?.data)
                //console.log("remoteMessage for hanging up call doctor dis", remoteMessage)
            }
        });
        return unsubscribe;
    }, []);
    useEffect(() => {
        return notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.DISMISSED:
                    console.log('User dismissed notification', detail.notification);
                    break;
                case EventType.PRESS:
                    console.log('User pressed notification', detail);
                    navigation.navigate(detail?.notification?.data?.onClick)
                    // if (detail?.notification?.data?.onClick) {

                    //     navigation.navigate(detail?.notification?.data?.onClick,
                    //         { "user_id": `34` })

                    //     // if (detail?.notification?.data?.onClick !== 'default') {
                    //     //     navigation.navigate(detail?.notification?.data?.onClick)
                    //     // } else if (detail?.notification?.data?.onClick == "chat") {
                    //     //     //navigation.navigate(detail?.notification?.data?.onClick, { "user_id": 14 });
                    //     //     navigation.navigate('ChatScreen_Parent',
                    //     //         { user_id: `14` })


                    //     // }
                    // }
                    break;
            }
        });
    }, []);
    useEffect(() => {
        messaging().onNotificationOpenedApp(remoteMessage => {
            // //console.log(
            //     'Notification caused app to open from background state:',
            //     remoteMessage.notification,
            // );
            if (remoteMessage?.data?.video_token) {
                if (remoteMessage?.data?.video_token == "end_call") {
                    ////console.log('Do Nothing')
                }
                else {
                    savelocalStorageData("accessToken", remoteMessage?.data?.video_token)
                    savelocalStorageData("ID", remoteMessage?.data?.appo_id)
                    savelocalStorageData('doctorNameDuringCall', remoteMessage?.data?.doctor_name)
                    navigation.navigate("CallingScreen")
                }
            }
        });
    }, [])

    const checkVersion = async () => {
        var formdata = new FormData()
        formdata.append("app_version", Constants.APP_VERSION)
        formdata.append("device_type", Platform.OS)
        const result = await PostApiData("checkVersion", formdata)
        if (result.status == '201') {
            Alert.alert(
                'Info',
                'Please Update The App To Continue',
                [{
                    text: 'OK',
                    onPress: () => Linking.openURL(result?.link)
                },]
            )
        }
    }
    const getToken = async () => {
        if (Platform.OS == "ios") {
            const authStatus = await messaging().requestPermission();
            if (authStatus === 1) {
                // //console.log("Trying To Get Token ======================>")
                let fcmToken = await messaging().getToken();
                await messaging().registerDeviceForRemoteMessages();
                if (fcmToken) {
                    const fcmToken = await messaging().getToken();
                    savelocalStorageData('fcm_token', fcmToken)
                    var formdata = new FormData()
                    formdata.append("fcm_token", fcmToken)
                    const result = await PostApiData('fcm_update', formdata)
                    // //console.log("fcmToken=========================================================================>", fcmToken)
                    // //console.log(" result of getToken at Dashboard===>", result)
                    // //console.log(" formdata  of getToken at Dashboard===>", formdata)
                }
            }
        }
        else {
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();
            savelocalStorageData('fcm_token', token)
            var formdata = new FormData()
            formdata.append("fcm_token", token)
            const result = await PostApiData('fcm_update', formdata)
            // //console.log("fcmToken===>", token)
            // //console.log(" result of getToken at Dashboard===>", result)
            // //console.log(" formdata  of getToken at Dashboard===>", formdata)
        }
    }

    


    return (
        <Tab.Navigator
            screenOptions={(propsTab) => ({
                tabBarHideOnKeyboard: true,
                tabBarIcon: ({ focused, color, size }) => {

                    if (propsTab.route.name === 'HomeNav') {

                        return <Image source={require('../../assets/Images/home2.png')}
                            style={{ height: 20, aspectRatio: 8 / 8, tintColor: color }} />
                    }
                    else if (propsTab.route.name === 'AppointmentsNav') {

                        return <Image source={require('../../assets/Images/appointment.png')}
                            style={{ height: 21, aspectRatio: 8 / 8, tintColor: color }} />
                    }
                    else if (propsTab.route.name === 'ReportsNav') {

                        return <Image source={require('../../assets/Images/reportss.png')}
                            tintColor={color}
                            style={{ height: 20, aspectRatio: 8 / 8, tintColor: color }} />
                    }
                    else if (propsTab.route.name === 'MoreNav') {

                        return <Image source={require('../../assets/Images/menu2.png')}
                            tintColor={color}
                            style={{ height: 20, aspectRatio: 8 / 8, tintColor: color }} />
                    }
                },
                tabBarActiveTintColor: colors.toobarcolor,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                // tabBarStyle: { height: Platform.OS == "ios" ? H * 0.1 : H * 0.08 },
                tabBarStyle: { height: H * 0.1 },
                tabBarLabelStyle: {
                    fontSize: fontSizes.EXTRASM,
                    fontFamily: 'Poppins-Medium'

                },

                initialRouteName: " "

            })}>
            <Tab.Screen name="HomeNav" component={HomeNav} options={{ tabBarLabel: "Home" }} />
            <Tab.Screen name="AppointmentsNav" component={AppointmentsNav} options={{ tabBarLabel: "Appointments" }} />
            <Tab.Screen name="ReportsNav" component={BookingsNav} options={{ tabBarLabel: "Reports" }} />
            <Tab.Screen name="MoreNav" component={MoreNav} options={{ tabBarLabel: "More" }} />
        </Tab.Navigator >
    )
}

export default BottomTab

