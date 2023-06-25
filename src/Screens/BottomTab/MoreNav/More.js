import { View, Text, StatusBar, StyleSheet, Image, Modal, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Divider } from 'react-native-paper'
import { colors, fontFamily, fontSizes, GetApiData, getLocalStorageData, H, W } from '../../../assets/Schemes/Schemes'
import HeaderTwo from '../../../assets/Schemes/HeaderTwo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'
import { useIsFocused } from '@react-navigation/native'
import DataContext from '../../../assets/Context/DataContext'


const More = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [visible, setVisible] = useState(false)
  const [wasPreviouslyDoctor, setWasPreviouslyDoctor] = useState(false)
  const [joinCallStatus, setJoinCallStatus] = useState(false)

  const { NsignedState } = useContext(DataContext)
  const [signedState, setSignedState] = NsignedState

  useEffect(() => {
    getWasPreviouslyDoctorStatus()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      getJoinCallStatus()
    }, 3000);

    if (!isFocused) {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }

  }, [isFocused])

  const changePatient = () => {
    navigation.navigate("ChangePatient")
  }

  const getWasPreviouslyDoctorStatus = async () => {
    const temp = await getLocalStorageData('wasPreviouslyDoctor')
    setWasPreviouslyDoctor(temp)
  }

  const getJoinCallStatus = async () => {
    const result = await GetApiData('getCallStatus')
    //console.log(result)
    if (result?.status == "200") {
      if (result?.call_status == '1') {
        setJoinCallStatus(true)
      }
      else {
        setJoinCallStatus(false)
      }
    }
  }

  const logout = async () => {
    try {
      await messaging().unregisterDeviceForRemoteMessages()
      await AsyncStorage.clear()
      // await Alert.alert('Info', `Logged Out Successfully`)
      await setVisible(false)
      //await console.log('Done.')
      setSignedState(null)

    } catch (e) {
      //console.log(e)
    }
  }

  const changeHospital = () => {
    navigation.navigate("ChangeHospitals")
  }

  const addPatient = () => {
    navigation.navigate("AddPatients")
  }
  const handlePrescriptions = () => {
    Alert.alert("Info", "Coming Soon..")
  }

  return (
    <View>
      <HeaderTwo Title="More" />
      <Modal
        visible={visible}
        transparent={true}>
        <View style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          height: H,
          width: W,
          justifyContent: "center",
          alignItems: "center",

        }}>


          <View style={{
            paddingVertical: H * 0.02,
            //height: H * 0.4,
            width: W * 0.9,
            backgroundColor: "white",
            borderRadius: 8,
          }}>

            <Text style={{
              alignSelf: 'center', marginBottom: 10, color: colors.black, fontFamily: fontFamily.medium,
            }}>Logout?</Text>

            <TouchableOpacity>
              <Text
                // onPress={() => { navigation.navigate("Signup") }}

                style={{
                  fontFamily: fontFamily.medium,
                  marginTop: H * 0.03,
                  marginStart: W * 0.05,
                  alignSelf: 'flex-start',
                  color: colors.black,
                }}>Are you sure, you want to logout?</Text>

            </TouchableOpacity>


            <View
              style={{
                flexDirection: 'row',
                width: W,
                justifyContent: 'center',
                marginTop: H * 0.03
              }}>

              <TouchableOpacity
                onPress={() => { logout() }}
              >
                <Text


                  style={{
                    fontFamily: fontFamily.medium,
                    color: colors.toobarcolor,

                    marginLeft: H * 0.2
                  }}>Yes</Text>
              </TouchableOpacity>


              <TouchableOpacity
                onPress={() => {
                  setVisible(false)
                }}>
                <Text style={{
                  marginRight: W * 0.05, color: 'red',

                  fontFamily: fontFamily.medium,
                  marginLeft: H * 0.08
                }}>No</Text>
              </TouchableOpacity>
            </View>


          </View>
        </View>
      </Modal>

      <View >
        {joinCallStatus &&
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("VideoCalling")
              }}

              style={{ flexDirection: 'row' }}>




              <Text style={{
                elevation: 10,
                padding: 15,
                color: colors.black,

                fontFamily: fontFamily.medium,
                marginLeft: 10
              }}>Join Call With Doctor</Text>

              {


                <Image style={{
                  height: H * 0.05,
                  width: H * 0.05,
                  position: "absolute",
                  alignSelf: "center",
                  left: W * 0.8,
                  tintColor: "green"
                }}
                  source={require('../../../assets/Images/camcorder.png')} />


              }
            </TouchableOpacity>
            <Divider style={{ width: W, borderColor: 'gray' }} />
          </>
        }
        {wasPreviouslyDoctor == "true" &&
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LoginWhenSwitchingFromDoctorToPatient")
              }}

              style={{ flexDirection: 'row' }}>




              <Text style={{
                elevation: 10,
                padding: 15,
                color: colors.black,

                fontFamily: fontFamily.medium,
                marginLeft: 10
              }}>Switch To Doctor</Text>

              {


                <Image style={{
                  height: H * 0.02,
                  width: W * 0.024,
                  position: "absolute",
                  alignSelf: "center",
                  left: W * 0.9
                }}
                  source={require('../../../assets/Images/arrow.png')} />


              }
            </TouchableOpacity>
            <Divider style={{ width: W, borderColor: 'gray' }} />
          </>
        }
        <TouchableOpacity
          onPress={() => { navigation.navigate("Profile") }}
          style={{ flexDirection: 'row' }}>

          <Text style={{
            elevation: 10,
            padding: 15,
            color: colors.black,
            fontFamily: fontFamily.medium,
            marginLeft: 10
          }}>My Profile</Text>

          {
            <Image style={{
              height: H * 0.02,
              width: W * 0.024,
              position: "absolute",
              alignSelf: "center",
              left: W * 0.9
            }}
              source={require('../../../assets/Images/arrow.png')} />
          }
        </TouchableOpacity>
        <Divider style={{ width: W, borderColor: 'gray' }} />
        <TouchableOpacity
          onPress={() => { navigation.navigate("NotificationsDisplaying") }}
          style={{ flexDirection: 'row' }}>
          <Text style={{
            elevation: 10,
            padding: 15,
            color: colors.black,
            fontFamily: fontFamily.medium,
            marginLeft: 10
          }}>Activity Log</Text>

          {
            <Image style={{
              height: H * 0.02,
              width: W * 0.024,
              position: "absolute",
              alignSelf: "center",
              left: W * 0.9
            }}
              source={require('../../../assets/Images/arrow.png')} />
          }
        </TouchableOpacity>
        <Divider style={{ width: W, borderColor: 'gray' }} />

        <TouchableOpacity
          onPress={() => { changePatient() }}
          style={{ flexDirection: 'row' }}>
          <Text
            style={{
              padding: 15,
              color: colors.black,
              fontFamily: fontFamily.medium,
              marginLeft: 10
            }}>Change Patient</Text>

          {
            <Image style={{ height: H * 0.02, width: W * 0.024, position: "absolute", alignSelf: "center", left: W * 0.9 }}
              source={require('../../../assets/Images/arrow.png')} />
          }
        </TouchableOpacity>
        <Divider style={{ width: W, borderColor: 'gray' }} />
        <TouchableOpacity
          onPress={() => { changeHospital() }}
          style={{ flexDirection: 'row' }}>
          <Text
            style={{
              padding: 15,
              color: colors.black,
              fontFamily: fontFamily.medium,
              marginLeft: 10
            }}>Change Hospital</Text>

          {
            <Image style={{ height: H * 0.02, width: W * 0.024, position: "absolute", alignSelf: "center", left: W * 0.9 }}
              source={require('../../../assets/Images/arrow.png')} />
          }
        </TouchableOpacity>

        <Divider style={{ width: W, borderColor: 'gray' }} />
        <TouchableOpacity
          onPress={() => {
            addPatient()
          }}
          style={{ flexDirection: 'row' }}>
          <Text
            style={{
              padding: 15,
              color: colors.black,
              fontFamily: fontFamily.medium,
              marginLeft: 10
            }}>Add Patient</Text>

          {
            <Image style={{
              height: H * 0.02,
              width: W * 0.024,
              position: "absolute",
              alignSelf: "center",
              left: W * 0.9
            }}
              source={require('../../../assets/Images/arrow.png')} />
          }
        </TouchableOpacity>

        <Divider style={{
          width: W,
          borderColor: 'gray',
        }} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ContactUs")
          }}
          style={{ flexDirection: 'row' }}>
          <Text
            style={{
              padding: 15,
              color: colors.black,
              fontFamily: fontFamily.medium,
              marginLeft: 10
            }}>Contact Us</Text>

          {
            <Image style={{
              height: H * 0.02,
              width: W * 0.024,
              position: "absolute",
              alignSelf: "center",
              left: W * 0.9
            }}
              source={require('../../../assets/Images/arrow.png')} />
          }
        </TouchableOpacity>

        <Divider style={{
          width: W,
          borderColor: 'gray',
        }} />
        <TouchableOpacity
          onPress={() => { setVisible(true) }}
          style={{ flexDirection: 'row' }}>
          <Text
            style={{
              padding: 15,
              color: colors.black,
              fontFamily: fontFamily.medium,
              marginLeft: 10
            }}>Logout</Text>

          {
            <Image style={{
              height: H * 0.02,
              width: W * 0.024,
              position: "absolute",
              alignSelf: "center",
              left: W * 0.9
            }}
              source={require('../../../assets/Images/arrow.png')} />
          }
        </TouchableOpacity>

        <Divider style={{ width: W, borderColor: 'gray' }} />

      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  LogoImage:
  {
    height: H,
    resizeMode: 'cover',
  }
})




export default More