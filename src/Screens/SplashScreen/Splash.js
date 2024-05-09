import { StyleSheet, Text, View, Image, StatusBar, PermissionsAndroid, Alert, Platform, BackHandler, Linking } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { check, PERMISSIONS, RESULTS, request, requestMultiple } from 'react-native-permissions';
//import { Colors } from 'react-native/Libraries/NewAppScreen'
import { colors, getLocalStorageData, H, PostApiData, savelocalStorageData, W } from '../../assets/Schemes/Schemes'
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Loader from '../../assets/Loader/Loader';
import DataContext from '../../assets/Context/DataContext';
import { Constants } from '../../assets/Schemes/Constants';


const Splash = ({ navigation }) => {
    const { NsignedState } = useContext(DataContext)
    const [signedState, setSignedState] = NsignedState
    const [permission, setPermission] = useState(null);
    const [visible, setVisible] = useState(true)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        effectFunctions()
    }, [])

    const effectFunctions = async () => {
        await requestPermissions()
        await getToken()
        await checkVersion()
    }

    const checkVersion = async () => {
        var formdata = new FormData()
        formdata.append("app_version", Constants.APP_VERSION)
        formdata.append("device_type", Platform.OS)
        const result = await PostApiData("checkVersion", formdata)
        ////console.log("App version", result)
        if (result.status == '201') {
            Alert.alert(
                'Info',
                'Please Update The App To Continue',
                [{
                    text: 'OK',
                    onPress: () => {
                        setSignedState(null)
                        Linking.openURL(result?.link)
                    }
                },]
            )
        }
    }


    const requestPermissions = async () => {
        if (Platform.OS == "android") {
            requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then((statuses) => {
                //console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
                //console.log('MICROPHONE', statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]);
                //console.log('LOCATION COARSE', statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
                //console.log('LOCATION FINE', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
            });
        }
        else if (Platform.OS == "ios") {
            requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then((statuses) => {
                //console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
                //console.log('MICROPHONE', statuses[PERMISSIONS.IOS.MICROPHONE]);
                //console.log('LOCATION ALWAYS', statuses[PERMISSIONS.IOS.LOCATION_ALWAYS]);
                //console.log('LOCATION WHEN IN USE', statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);
            });
        }
    }


    const getToken = async () => {

        const tokenTemp = await getLocalStorageData('token')
        const userType = await getLocalStorageData('userType')

        //console.log("tokenAtSplash====>", tokenTemp)

        if (tokenTemp) {
            if (userType == "doctor") {
                setLoader(true)
                setTimeout(() => {
                    setSignedState('doctor')
                }, 500);
            }
            else if (userType == "patient") {
                setLoader(true)
                setTimeout(() => {
                    setSignedState('patient')
                }, 500);
            }
            else {
                setLoader(false)
                setTimeout(() => {
                    setSignedState(null)
                }, 500);
            }
        } else {
            ////console.log("TokenNotFound")
            setLoader(false)
            setTimeout(() => {
                navigation.replace('Login')
            }, 500);
        }

    }
    return (
        loader
            ?

            <Loader />
            :
            <View  >
                <StatusBar backgroundColor={colors.toobarcolor} />
                <Image source={require('../../assets/Images/splash2.png')}
                    style={styles.LogoImage} />
            </View>
    )
}

const styles = StyleSheet.create({
    LogoImage:
    {
        height: H,
        alignSelf: "center",
        resizeMode: "cover"
    }
})
export default Splash