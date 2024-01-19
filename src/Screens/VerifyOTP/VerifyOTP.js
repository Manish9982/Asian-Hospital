import { FlatList, Modal, StyleSheet, TouchableOpacity, View, Image, Platform, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Text, Divider, } from 'react-native-paper'
import OtpInputComponent from './OtpInputComponent'
import { colors, fontFamily, fontSizes, H, PostApiData, W, getLocalStorageData, savelocalStorageData } from '../../assets/Schemes/Schemes'
import { Button } from 'react-native-vector-icons/dist/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import DataContext from '../../assets/Context/DataContext'
import Loader from '../../assets/Loader/Loader'
import { Constants } from '../../assets/Schemes/Constants'





const VerifyOTP = ({ navigation }) => {


  const [visible, setVisible] = useState(false)
  const [data, setData] = useState(null)
  const [loader, setLoader] = useState(false)
  const [text, setText] = useState("")
  const { NotpGlobal, NmobileNo, NsignedState } = useContext(DataContext)
  const [signedState, setSignedState] = NsignedState
  const [otpGlobal, setOtpGlobal] = NotpGlobal
  const [mobileNo, setMobileNo] = NmobileNo

  useEffect(() => { toastOtp() }, [])


  handleNavigation = async () => {
    const temp = await getLocalStorageData('mobile')
    // console.log("mobileno--=. ", temp)
    setVisible(false)
    setOtpGlobal("")
    navigation.navigate("Signup")

  }

  const resendOTP = async () => {

    setLoader(true)
    var formdata = new FormData();
    formdata.append("mobile", mobileNo);
    formdata.append("device_type", Platform.OS);
    formdata.append("app_version", Constants.APP_VERSION);
    formdata.append("user_type", "1");

    //console.log('params1==', formdata)


    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${Constants.API_BASE}login`, requestOptions)
      const result = await response.json()

      if (result.status == '200') {
        //  console.log(result.token)

        // savelocalStorageData('token', result?.token) //storing token in local database
        // savelocalStorageData('token', result.token) //storing token in local database
        savelocalStorageData('p_count', JSON.stringify(result?.p_count)) //storing token in local database
        savelocalStorageData('otp', JSON.stringify(result?.otp)) //storing token in local database
        savelocalStorageData('userType', "patient")
        //console.log("OTP", result?.otp)
        //Alert.alert("OTP", `${result?.otp}`)
        // console.log(result?.token)

      }
      else {

        Alert.alert('Error', `${result?.message}`)

      }
    } catch (error) {
      Alert.alert('Error', `${error}`)
    }
    setLoader(false)


  }

  const toastOtp = async () => {
    const temp = await getLocalStorageData('otp')
    //Alert.alert("OTP", `${temp}`)
  }


  const submitOTP = async () => {
    setLoader(true)
    const temp = await getLocalStorageData('otp')
    const temp2 = await getLocalStorageData('mobilePatient')
    if (otpGlobal == temp) {
      var formdata = new FormData();
      formdata.append("otp", otpGlobal);
      formdata.append("mobile", temp2)
      const result = await PostApiData('otp_verify', formdata)
      savelocalStorageData('mobile', JSON.stringify(result.mobile))

      if (result?.p_count == '0') {
        //  navigation.navigate("Signup")
        setOtpGlobal("")
        navigation.navigate("Signup", { "mobile": `${result.mobile}` })

      }
      else {
        setVisible(true)
        setData(result)
      }
    }
    else {
      Alert.alert('Error', `OTP Does Not Match!`)
    }
    setLoader(false)
  }



  const RegisterWithHisValue = async (id) => {
    setLoader(true)
    const temp = await getLocalStorageData('mobile')
    var formdata = new FormData();

    formdata.append("his_id", id);
    formdata.append("mobile", temp);


    const result = await PostApiData('his_register', formdata)

   // console.log(result)

    if (result.status == '200') {

      await savelocalStorageData("UHID", id)

      await savelocalStorageData('token', result?.token) //storing token in local database


      //Alert.alert('Error', `${result.message}`)

      setSignedState('patient')

    } else {
      Alert.alert('Error', `${result.message}`)
    }
    // setData(result)
    setLoader(false)
  }





  const renderItem = ({ item, index }) => {
    return (

      <View style={{}}>
        <TouchableOpacity

          onPress={() => { RegisterWithHisValue(item.his_id) }}

          style={{
            marginLeft: 15,
            flexDirection: "row",
            alignItems: "center",
          }}>


          <View style={{
            flexDirection: 'column',
            padding: 5
          }}>
            <Text style={{
              fontSize: fontSizes.default,
              fontFamily: fontFamily.medium
            }}>
              {item.full_name}
            </Text>
            <Text style={{
              fontSize: fontSizes.SM,
              color: 'gray',
              fontFamily: fontFamily.regular,
              marginVertical: H * 0.002
            }}>
              {item.his_id}
            </Text>
          </View>

          {/* <Image style={{ marginLeft: W * 0.6, height: H * 0.02, width: W * 0.024 }}
            source={require('../../assets/Images/arrow.png')} /> */}

        </TouchableOpacity>

        <Divider
          style={{
            width: W,
            borderColor: 'black',
            borderWidth: 0.05
          }} />
      </View>
    )
  }


  return (
    loader ?
      <>
        <Loader />
      </> :
      <View style={{
        backgroundColor: "white",
        height: H,
        width: W,
        alignItems: "center"
      }}>



        <Modal
          visible={visible}
          transparent={true}>
          <View style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            height: H,
            width: W,
            justifyContent: "center",
            alignItems: "center",

          }}>


            <View style={{
              paddingVertical: H * 0.02,
              height: H * 0.6,
              width: W * 0.9,
              backgroundColor: "white",
              borderRadius: 8,
            }}>

              <Text style={{
                alignSelf: 'center', marginBottom: 10,
                fontFamily: fontFamily.medium, fontSize: fontSizes.default
              }}>Choose Patient</Text>


              <Divider
                style={{ width: W, borderColor: 'black', borderWidth: 0.02 }} />
              <FlatList
                data={data?.patients}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}`}
              />

              <TouchableOpacity onPress={() => { handleNavigation() }}>
                <Text

                  // onPress={() => { navigation.navigate("Signup") }}

                  style={{
                    textDecorationLine: 'underline',
                    fontFamily: fontFamily.medium,
                    marginTop: H * 0.03,
                    marginRight: W * 0.05,
                    alignSelf: "flex-end", color: colors.toobarcolor, fontSize: fontSizes.SM,
                  }}>Add new member</Text>

              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                setVisible(false)
              }}>
                <Text style={{
                  marginTop: H * 0.05,
                  marginRight: W * 0.05,
                  alignSelf: "flex-end"
                }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>



        <Text style={{
          fontSize: fontSizes.XXXL,
          fontFamily: fontFamily.semibold,
          marginTop: H * 0.17,
        }}>Verify Your Phone Number</Text>

        <Text style={{
          color: "grey",
          marginTop: H * 0.02,
          marginBottom: H * 0.08,
          fontSize: fontSizes.XL
        }}>Enter Your OTP Here</Text>

        <OtpInputComponent />



        <TouchableOpacity
          onPress={() => { submitOTP() }}
          style={{
            borderRadius: 8,
            justifyContent: 'center',
            marginVertical: H * 0.03
          }}>
          <LinearGradient start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#90E1FF', '#00AEEF', '#00AEEF']}
            style={{
              justifyContent: 'center',
              borderRadius: 8, height: H * 0.06
            }}>

            <Text

              style={{
                width: W * 0.6, borderRadius: 5,
                textAlign: 'center', color: colors.white,
                fontFamily: fontFamily.medium, fontSize: fontSizes.default
              }}>Continue</Text>

          </LinearGradient>


        </TouchableOpacity>


        <Text style={{
          marginTop: H * 0.1,
          fontSize: fontSizes.XL,
          color: 'gray'
        }}>
          Didn't You Receive Any Code?
        </Text>
        <TouchableOpacity onPress={() => {
          resendOTP()
        }}>
          <Text style={{
            color: colors.toobarcolor,
            fontSize: fontSizes.XL,
            fontFamily: fontFamily.medium
          }}>Resend New OTP</Text>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({})
export default VerifyOTP
