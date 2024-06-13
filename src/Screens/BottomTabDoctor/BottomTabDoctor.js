import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react'
import { Alert, Image, Linking, Platform } from 'react-native';
import HomeNav from './HomeNav/HomeNav';
import BookingsNav from './ReportsNav/BookingsNav';
import AppointmentsNav from './AppointmentsNav/AppointmentsNav';
import { colors, fontSizes, H, PostApiData, savelocalStorageData } from '../../assets/Schemes/Schemes';
import MoreNav from './MoreNav/MoreNav';
import DoCPatientsAppointmentList from '../DoCPatientsAppointmentList/DoCPatientsAppointmentList';
import messaging from '@react-native-firebase/messaging';
import { displayNotification } from '../../assets/Schemes/NotificationServices';
import { Constants } from '../../assets/Schemes/Constants';
import PackageAppointments from './PackageAppointments';




const Tab = createBottomTabNavigator();

const BottomTabDoctor = () => {

    const [isDietician, setIsDietician] = useState(false)

    useEffect(() => {
        getToken()
        checkVersion()
        checkDietician()
    }, [])

    const checkDietician = async () => {
        setIsDietician(true)
    }

    const getToken = async () => {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        savelocalStorageData('fcm_token', token)
        var formdata = new FormData()
        formdata.append("fcm_token", token)
        formdata.append("user_type", "2")
        const result = await PostApiData('fcm_update', formdata)
        //console.log("fcmToken===>", token)
        //console.log(" result of getToken at Dashboard===>", result)
        //console.log(" formdata  of getToken at Dashboard===>", formdata)
    }

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
                displayNotification(remoteMessage?.data?.title, remoteMessage?.data?.body)
                //console.log("remoteMessage for hanging up call doctor dis", remoteMessage)
            }


        });
        return unsubscribe;
    }, []);

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


    return (
        <Tab.Navigator
            screenOptions={(propsTab) => ({
                tabBarIcon: ({ focused, color, size }) => {

                    if (propsTab.route.name === 'HomeNav') {

                        return <Image source={require('../../assets/Images/home2.png')}
                            tintColor={color}
                            style={{ height: 20, aspectRatio: 8 / 8, tintColor: color }} />
                    }
                    else if (propsTab.route.name === 'AppointmentsNav') {

                        return <Image source={require('../../assets/Images/appointment.png')}
                            tintColor={color}
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
                    else if (propsTab.route.name === 'PackageAppointments') {

                        return <Image source={require('../../assets/Images/nutrition.png')}
                            tintColor={color}
                            style={{ height: 20, aspectRatio: 8 / 8, tintColor: color }} />
                    }
                },
                tabBarActiveTintColor: colors.toobarcolor,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: { height: H * 0.1 },
                tabBarLabelStyle: {
                    fontSize: fontSizes.SM,
                    fontFamily: 'Poppins-Medium'

                },

                initialRouteName: " "

            })}>
            <Tab.Screen name="HomeNav" component={HomeNav} options={{ tabBarLabel: "Home" }} />
            <Tab.Screen name="AppointmentsNav" component={DoCPatientsAppointmentList} options={{ tabBarLabel: "Appointments" }} />
            {
                isDietician ?
                    <Tab.Screen name="PackageAppointments" component={PackageAppointments} options={{ tabBarLabel: "Packages" }} />
                    :
                    null
            }

            {/* <Tab.Screen name="ReportsNav" component={BookingsNav} options={{ tabBarLabel: "Reports" }} /> */}
            <Tab.Screen name="MoreNav" component={MoreNav} options={{ tabBarLabel: "More" }} />
        </Tab.Navigator >
    )
}

export default BottomTabDoctor

