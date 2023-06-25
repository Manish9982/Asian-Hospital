import { StyleSheet, View, TouchableOpacity, Image, StatusBar, ScrollView, Platform, Alert, Keyboard, SafeAreaView, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import { TextInput, Text } from 'react-native-paper'
import { colors, fontFamily, fontSizes, getLocalStorageData, globalStyles, H, PostApiData, savelocalStorageData, W } from '../../assets/Schemes/Schemes'
import LinearGradient from 'react-native-linear-gradient'
import Loader from '../../assets/Loader/Loader'
import DataContext from '../../assets/Context/DataContext'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Buttons from '../../components/Buttons'
import { spacing } from '../../components/Spacing'
import { Constants } from '../../assets/Schemes/Constants'

const Login = ({ navigation }) => {

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width

  const styles = makeStyles(H, W)

  const [userType, setUserType] = useState("1") // 2 == doctor, 1 = patient
  const [loader, setLoader] = useState(false)
  const [myData, setMyData] = useState(null)
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const { NmobileNo, NsignedState } = useContext(DataContext)
  const [signedState, setSignedState] = NsignedState
  const [mobileNo, setMobileNo] = NmobileNo

  // console.log(userType)
  // console.log("OS=====>", Platform.OS)


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

  function onChangeTextMobile(t) {
    if (t.includes('.') || t.includes("-") || t.includes(" ") || t.includes(",")) {
    }
    else {
      setMobileNo(t)
    }
  }

  const onPressEye = () => {
    setSecureTextEntry(prev => !prev)
  }

  //LoginAPI Patient
  const postLoginData = async () => {
    setLoader(true)
    const fcm_token = await getLocalStorageData('fcm_token')
    var formdata = new FormData();
    formdata.append("mobile", mobileNo);
    formdata.append("device_type", Platform.OS);
    formdata.append("app_version", Constants.APP_VERSION);
    formdata.append("user_type", "1");
    formdata.append("fcm_token", fcm_token)

    // console.log('params1==', formdata)


    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${Constants.API_BASE}login`, requestOptions)
      const result = await response.json()

      setMyData(result)
      if (result.status == '200') {
        savelocalStorageData('mobilePatient', mobileNo)
        savelocalStorageData('p_count', JSON.stringify(result?.p_count)) //storing token in local database
        savelocalStorageData('otp', JSON.stringify(result?.otp)) //storing token in local database
        savelocalStorageData('userType', "patient")
        navigation.navigate("VerifyOTP")

      }
      else {
        Alert.alert("Error", result?.message)
      }
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error))
    }
    setLoader(false)

  }

  //LoginAPI Doctor
  const postLoginDataDoctor = async () => {
    setLoader(true)
    const fcm_token = await getLocalStorageData("fcm_token")
    var formdata = new FormData();
    formdata.append("username", userName);
    formdata.append("password", password);
    formdata.append("device_type", Platform.OS);
    formdata.append("app_version", Constants.APP_VERSION);
    formdata.append("user_type", "2");
    formdata.append("fcm_token", fcm_token)

    // console.log('params==', formdata)

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${Constants.API_BASE}login`, requestOptions)
      const result = await response.json()

      // console.log("resultForDoctorLoginApi", result)
      setMyData(result)
      if (result.status == '200') {
        await savelocalStorageData('doctorCode', userName)
        await savelocalStorageData('doctorMobile', result?.mobile)
        await savelocalStorageData('userType', "doctor")
        await savelocalStorageData('token', result?.token) //storing token in local database
        setSignedState('doctor')
      }
      else {
        Alert.alert('Error', `${result?.message}`)
      }
    } catch (error) {
      Alert.alert('Error', error.message)
    }
    setLoader(false)

  }

  // console.log("keyboardHeight", Keyboard.isVisible())
  return (
    loader
      ?

      <Loader />

      :

      <KeyboardAwareScrollView
        contentContainerStyle={styles.primaryContainer}>
        <SafeAreaView style={styles.secondaryContainer}>
          <StatusBar backgroundColor={"white"}
            barStyle="dark-content" />
          <TouchableOpacity
            onPress={() => navigation.navigate("CoordinatorWebview")}
            style={styles.coordinatorButton}><Text style={styles.coordinatorText}>Coordinator Login</Text></TouchableOpacity>
          <Image source={require('../../assets/Images/logoasian.png')}
            style={styles.logo} />
          <Image source={require('../../assets/Images/background.png')}
            style={styles.background} />
          <Text style={styles.headingText}>Sign In As</Text>
          <View
            style={styles.switchUser}>

            <TouchableOpacity
              onPress={() => { setUserType("1") }}
              style={[styles.switchButtons, { backgroundColor: userType == "1" ? colors.toobarcolor : "white", }]}>
              <Text style={[styles.textSwitchButtons, { color: userType == "1" ? "white" : "black", }]}>Patient</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { setUserType("2") }}
              style={[styles.switchButtons, { backgroundColor: userType == "2" ? colors.toobarcolor : "white", }]}>
              <Text style={[styles.textSwitchButtons, { color: userType == "2" ? "white" : "black", }]}>Doctor</Text>
            </TouchableOpacity>
          </View>
          {userType == "2" ?


            <View style={styles.doctorDetailsContainer}>

              <Text style={styles.guideText}>Please enter username and password to continue</Text>

              <TextInput
                mode={"outlined"}
                keyboardType='email-address'
                underlineColor='transparent'
                activeUnderlineColor={colors.blue}
                activeOutlineColor={colors.blue}
                outlineColor={"black"}
                left={<TextInput.Icon icon={require('../../assets/Images/phone.png')} />}
                placeholder='Username'
                value={userName}
                onChangeText={(t) => { setUserName(t) }}
                style={styles.textInput}
              />


              <TextInput
                mode={"outlined"}
                keyboardType='default'
                secureTextEntry={secureTextEntry}
                underlineColor='transparent'
                activeUnderlineColor={colors.blue}
                activeOutlineColor={colors.blue}
                outlineColor={"black"}
                left={<TextInput.Icon icon={require('../../assets/Images/passwrd.png')} />}
                placeholder='Password'
                value={password}
                onChangeText={(t) => { setPassword(t) }}
                style={styles.textInput}
                right={<TextInput.Icon
                  onTouchStart={onPressEye}
                  icon="eye"
                  iconColor={secureTextEntry ? null : colors.blue}
                />}
              />
              <Buttons onPress={handleChangeForDoctor}
                title={"Sign In"} />
            </View>

            :

            <View
              style={styles.patientDetailContainer}>

              <Text style={styles.guideText}>Please enter mobile to continue</Text>

              <TextInput
                mode={"outlined"}
                keyboardType='numeric'
                maxLength={10}
                underlineColor='transparent'
                activeUnderlineColor={colors.blue}
                activeOutlineColor={colors.blue}
                outlineColor={"black"}
                left={<TextInput.Icon icon={require('../../assets/Images/phone.png')} />}
                placeholder='Mobile Number'
                value={mobileNo}
                onChangeText={(t) => onChangeTextMobile(t)}
                style={styles.textInput}
              />
              <View
                style={styles.termsAndConditionsBox}>
                <Text style={globalStyles.smallFonts}>{"*Please enter patient registered mobile number.\n*Please schedule appointment with the name of patient only.\n*If patient is already registered, do not register again, because New UHID will not contain the Old UHID History data for Doctor’s treatment.\n*Cancellation of Appointment can only be done before two hours of Appointment time, beyond that no refund would be entertained.\n*All Video consultation are Non Refundable."}</Text>
              </View>
              <Buttons onPress={handleChange}
                title={"Sign In"} />
            </View>
          }

        </SafeAreaView>
      </KeyboardAwareScrollView>
  )
}

const makeStyles = (H, W) => StyleSheet.create({
  primaryContainer: {
    backgroundColor: "white",
    paddingBottom: H * 0.1
  },
  secondaryContainer:
  {
    height: H,
    backgroundColor: 'white'
  },
  headingText:
  {
    textAlign: 'left',
    margin: spacing.xxl,
    fontSize: fontSizes.XXL,
    color: colors.black,
    fontFamily: fontFamily.medium
  },
  coordinatorButton:
  {
    alignSelf: "flex-end",
    margin: H * 0.02,
    right: H * 0.02,
    zIndex: 10,
  },
  coordinatorText:
  {
    textDecorationLine: "underline",
    color: colors.toobarcolor
  },
  signupText:
  {
    textAlign: 'center',
    fontSize: fontSizes.default,
    marginTop: H * 0.25,
    fontFamily: fontFamily.medium,
    color: colors.darkgray,
  },
  switchButtons:
  {
    borderColor: 'gray',
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    width: W * 0.40,
    padding: 10,
    borderRadius: 5,
  },
  textSwitchButtons:
  {
    fontFamily: fontFamily.medium
  },
  logo: {
    height: H * 0.08,
    aspectRatio: 28 / 9,
    alignSelf: "center",
    zIndex: 2,
    marginTop: H * 0.0,
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

  },
  switchUser:
  {
    flexDirection: "row",
    width: W,
    justifyContent: "space-evenly"
  },
  textInput:
  {
    width: W * 0.85,
    alignSelf: "center",
    borderRadius: 8,
    fontSize: fontSizes.default,
    backgroundColor: colors.bgeditext,
    justifyContent: "center",
  },
  termsAndConditionsBox:
  {
    padding: spacing.medium,
    borderWidth: 1,
    borderColor: colors.toobarcolor,
    borderRadius: 8,
    margin: spacing.medium,
  },
  patientDetailContainer: {

  },
  guideText:
  {
    margin: spacing.xxl,
    fontSize: fontSizes.default,
    color: 'gray',
    fontFamily: fontFamily.regular,
  },
  doctorDetailsContainer:
  {

  }
})

export default Login


