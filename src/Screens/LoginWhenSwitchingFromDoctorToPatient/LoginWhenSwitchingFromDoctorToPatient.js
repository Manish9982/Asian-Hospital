import { StyleSheet, View, TouchableOpacity, Image, StatusBar, ScrollView, Platform, Alert, Keyboard } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import { TextInput, Text } from 'react-native-paper'
import { colors, fontFamily, fontSizes, getLocalStorageData, H, savelocalStorageData, W } from '../../assets/Schemes/Schemes'
import LinearGradient from 'react-native-linear-gradient'
import Loader from '../../assets/Loader/Loader'
import { useKeyboard } from '../../assets/Schemes/KeyboardHeight'
import DataContext from '../../assets/Context/DataContext'
import { Constants } from '../../assets/Schemes/Constants'

const LoginWhenSwitchingFromDoctorToPatient = ({ navigation }) => {

    const [userType, setUserType] = useState("1") // 2 == doctor, 1 = patient
    const [loader, setLoader] = useState(false)
    const [myData, setMyData] = useState(null)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const keyboardHeight = useKeyboard()

    const { NmobileNo, NsignedState } = useContext(DataContext)
    const [mobileNo, setMobileNo] = NmobileNo
    const [signedState, setSignedState] = NsignedState

    // //console.log(userType)
    // //console.log("OS=====>", Platform.OS)

    useEffect(() => {
        getUserName()
    }, [])

    const getUserName = async () => {
        const temp = await getLocalStorageData('doctorCode')
        setUserName(temp)
    }


    const handleChange = () => {
        if (mobileNo == "") {
            Alert.alert('Error', `Mobile Number Can Not Be Empty!`)
        }
        else {
            postLoginData()
        }
    }


    const handleChangeForDoctor = () => {
        if (userName == "") {
            Alert.alert('Error', `Name Can Not Be Empty!`)
        } else if (password == "") {
            Alert.alert('Error', `Password Can Not Be Empty!`)
        }
        else {
            postLoginDataDoctor()
        }
    }


    //LoginAPI
    const postLoginData = async () => {
        setLoader(true)
        const fcm_token = await getLocalStorageData('fcm_token')
        var formdata = new FormData();
        formdata.append("mobile", mobileNo);
        formdata.append("device_type", Platform.OS);
        formdata.append("app_version", "1.2");
        formdata.append("user_type", "1");
        formdata.append("fcm_token", fcm_token)

        // //console.log('params1==', formdata)


        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Constants.API_BASE}login`, requestOptions)
            const result = await response.json()

            // //console.log(result)
            setMyData(result)
            if (result.status == '200') {
                // //console.log(result.token)
                savelocalStorageData('mobilePatient', mobileNo)
                // savelocalStorageData('token', result?.token) //storing token in local database
                // savelocalStorageData('token', result.token) //storing token in local database
                savelocalStorageData('p_count', JSON.stringify(result?.p_count)) //storing token in local database
                savelocalStorageData('otp', JSON.stringify(result?.otp)) //storing token in local database
                savelocalStorageData('userType', "patient")
                // //console.log(result?.otp)
                navigation.navigate("VerifyOTP")
                // //console.log(result?.token)
            }
            else {

                Alert.alert('Error', `${result?.message}`)
                //console.log(result)
            }
        } catch (error) {
            //console.log(error)
        }
        setLoader(false)

    }

    //LoginAPI
    const postLoginDataDoctor = async () => {
        setLoader(true)
        const fcm_token = await getLocalStorageData("fcm_token")
        var formdata = new FormData();
        formdata.append("username", userName);
        formdata.append("password", password);
        formdata.append("device_type", Platform.OS);
        formdata.append("app_version", "1.2");
        formdata.append("user_type", "2");
        formdata.append("fcm_token", fcm_token)

        // //console.log('params==', formdata)

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${Constants.API_BASE}login`, requestOptions)
            const result = await response.json()

            // //console.log("resultForDoctorLoginApi", result)
            setMyData(result)
            if (result.status == '200') {
                // //console.log("DoctorLoggedIn")
                await savelocalStorageData('doctorCode', userName)
                await savelocalStorageData('doctorMobile', result?.mobile)
                await savelocalStorageData('userType', "doctor")
                //await savelocalStorageData('p_count', JSON.stringify(result?.p_count)) //storing token in local database

                await savelocalStorageData('token', result?.token) //storing token in local database
                setSignedState('doctor')

            }
            else {

                Alert.alert('Error', `${result?.message}`)
                //console.log(result)

            }
        } catch (error) {
            Alert.alert('Error', error)
            //console.log(error)
        }
        setLoader(false)

    }

    // //console.log("keyboardHeight", Keyboard.isVisible())
    return (
        loader
            ?

            <Loader />

            :
            <ScrollView
                contentContainerStyle={{
                    height: H,
                    paddingBottom: Keyboard.isVisible() ? keyboardHeight : 0,
                    // height: Keyboard.isVisible() ? H - keyboardHeight : H,
                    backgroundColor: "white"
                }}>
                <View>
                    <View style={{
                        //  height: Keyboard.isVisible() ? H - keyboardHeight : H
                    }}>
                        <StatusBar backgroundColor={"white"}
                            barStyle="dark-content" />

                        <Image source={require('../../assets/Images/logoasian.png')}
                            style={styles.logo} />

                        <Image source={require('../../assets/Images/background.png')}
                            style={styles.background} />

                        <Text style={{
                            textAlign: 'left',
                            marginTop: H * 0.07,
                            marginHorizontal: H * 0.03,
                            fontSize: fontSizes.XXL,
                            color: colors.black,
                            fontFamily: fontFamily.medium
                        }}>Sign In As Doctor</Text>

                        {<Text style={{
                            textAlign: 'left',
                            marginHorizontal: H * 0.03,
                            fontSize: fontSizes.default,
                            color: 'gray',
                            fontFamily: fontFamily.regular,
                            marginVertical: H * 0.02
                        }}>Please enter your password to continue</Text>}



                        <TextInput
                            editable={false}
                            mode={"outlined"}
                            keyboardType='email-address'
                            //maxLength={10}
                            underlineColor='transparent'
                            activeUnderlineColor={colors.blue}
                            activeOutlineColor={colors.blue}
                            outlineColor={"black"}
                            left={<TextInput.Icon icon={require('../../assets/Images/phone.png')} />}
                            placeholder='Username'
                            value={userName}

                            onChangeText={(t) => { setUserName(t) }}

                            style={{
                                height: H * 0,
                                width: W * 0.85,
                                alignSelf: "center",
                                borderRadius: 8,
                                fontSize: fontSizes.default,
                                backgroundColor: colors.bgeditext,
                                marginTop: H * 0.00,
                                justifyContent: "center",
                            }}
                        />


                        <TextInput
                            mode={"outlined"}
                            keyboardType='default'
                            secureTextEntry
                            underlineColor='transparent'
                            activeUnderlineColor={colors.blue}
                            activeOutlineColor={colors.blue}
                            outlineColor={"black"}
                            left={<TextInput.Icon icon={require('../../assets/Images/passwrd.png')} />}
                            placeholder='Password'
                            value={password}

                            onChangeText={(t) => { setPassword(t) }}

                            style={{
                                height: H * 0,
                                width: W * 0.85,
                                alignSelf: "center",
                                borderRadius: 8,
                                fontSize: fontSizes.default,
                                backgroundColor: colors.bgeditext,
                                marginTop: H * 0.02,
                                justifyContent: "center",
                            }}
                        />



                        <TouchableOpacity

                            onPress={() => { handleChangeForDoctor() }}

                            style={{
                                marginHorizontal: W * 0.08,
                                marginVertical: H * 0.05,
                                borderRadius: 8
                            }}>
                            <LinearGradient start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                colors={['#90E1FF', '#00AEEF', '#00AEEF']}
                                style={styles.linearGradient}>

                                <Text

                                    style={{
                                        textAlign: 'center', color: colors.white,
                                        fontFamily: fontFamily.medium, fontSize: fontSizes.XL
                                    }}>Sign In</Text>

                            </LinearGradient>


                        </TouchableOpacity>



                        {/* <Text style={{
                alignSelf: "center",
                marginTop: H * 0.02,
                fontSize: fontSizes.XL,
                fontFamily: fontFamily.medium
              }}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => { navigation.navigate("Signup") }}>
                <Text style={{
                  alignSelf: "center",
                  color: colors.blue,
                  marginTop: H * 0.02,
                  fontSize: fontSizes.XL,
                  fontFamily: fontFamily.medium
                }}>Sign up</Text>
              </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView>

    )
}

const styles = StyleSheet.create({
    signupText:
    {
        textAlign: 'center',
        fontSize: fontSizes.default,
        marginTop: H * 0.25,
        fontFamily: fontFamily.medium,
        color: colors.darkgray,
    },
    logo: {
        height: H * 0.08,
        aspectRatio: 28 / 9,
        alignSelf: "center",
        zIndex: 2,
        marginTop: H * 0.1,
    },
    background:
    {
        position: "absolute",
        height: H * 1.1,
        width: W,
        resizeMode: "contain"
    },
    linearGradient:
    {
        height: H * 0.07,
        justifyContent: 'center',
        borderRadius: 8,

    }
})

export default LoginWhenSwitchingFromDoctorToPatient
