import { View, StatusBar, StyleSheet, Image, Modal, TouchableOpacity, Alert, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { Appbar, Divider, Text } from 'react-native-paper'
import { colors, fontFamily, getLocalStorageData, H, PostApiData, savelocalStorageData, W } from '../../../assets/Schemes/Schemes'
import HeaderTwo from '../../../assets/Schemes/HeaderTwo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../../assets/Loader/Loader'
import DataContext from '../../../assets/Context/DataContext'
import { spacing } from '../../../components/Spacing'
import { Constants, LocalStore } from '../../../assets/Schemes/Constants'


//doctors
const More = ({ navigation }) => {
  const [visible, setVisible] = useState(false)
  const [switchVisible, setSwitchVisible] = useState(false)
  const [loader, setLoader] = useState(false)

  const { NsignedState } = useContext(DataContext)
  const [signedState, setSignedState] = NsignedState

  const generateTokenAndMoveToPatientDashboard = async () => {
    setLoader(true)
    const temp1 = await getLocalStorageData('doctorCode')
    const temp2 = await getLocalStorageData('doctorMobile')
    const temp3 = await getLocalStorageData('fcm_token')
    var formdata = new FormData()
    formdata.append("his_id", temp1)
    //formdata.append("user_type", "2")
    formdata.append("device_type", Platform.OS)
    formdata.append("app_version", Constants.APP_VERSION)
    formdata.append("fcm_token", temp3)
    const result = await PostApiData('his_register', formdata)
    if (result?.status == '200') {
      await savelocalStorageData('token', result?.token)
      await savelocalStorageData('userType', "patient")
      await savelocalStorageData('wasPreviouslyDoctor', "true")
      setSignedState('patient')
    }
    else {

      Alert.alert("Warning!", `${result.message}`)
    }
    setLoader(false)
    setSwitchVisible(false)
  }
  const handleSwitch = () => {
    generateTokenAndMoveToPatientDashboard();
    setSwitchVisible(false);
  }


  const logout = async () => {
    try {

      await AsyncStorage.clear()
      //Alert.alert('Info', `Logged Out Successfully`)
      setVisible(false)
      setSignedState(null)

    } catch (e) {

      //console.log(e)

    }
    //console.log('Done.')
  }

  return (
    loader
      ?
      <Loader />
      :
      <View>
        <HeaderTwo Title="More" />
        <Modal visible={switchVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Switch To Patient?</Text>
              <TouchableOpacity>
                <Text style={styles.modalText}>Are you sure you want to switch to your patient account?</Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSwitch}>
                  <Text style={[styles.buttonText, { color: 'green' }]}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSwitchVisible(false)}>
                  <Text style={[styles.buttonText, { color: 'red' }]}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
                alignSelf: 'center', marginBottom: 10,
                color: colors.black,
                fontFamily: fontFamily.medium,
              }}>Logout?</Text>

              <TouchableOpacity>
                <Text
                  // onPress={() => { navigation.navigate("Signup") }}

                  style={{
                    margin: spacing.medium,
                    fontFamily: fontFamily.medium,
                    marginTop: H * 0.03,
                    alignSelf: 'flex-start',
                    color: colors.black,

                  }}>Are you sure you want to logout?</Text>

              </TouchableOpacity>


              <View
                style={{
                  flexDirection: 'row',
                  width: W, justifyContent: 'center', marginTop: H * 0.03
                }}>

                <TouchableOpacity>
                  <Text

                    onPress={() => { logout() }}





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

          <TouchableOpacity
            onPress={() => { navigation.navigate("DoCMyProfile") }}
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
            onPress={() => { setSwitchVisible(true) }}
            style={{ flexDirection: 'row' }}>
            <Text style={{
              elevation: 10,
              padding: 15,
              color: colors.black,
              fontFamily: fontFamily.medium,
              marginLeft: 10
            }}>Switch To Patient Account</Text>

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
          <Divider style={{ width: W, borderColor: 'gray' }} />
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
              <Image style={{ height: H * 0.02, width: W * 0.024, position: "absolute", alignSelf: "center", left: W * 0.9 }}
                source={require('../../../assets/Images/arrow.png')} />
            }
          </TouchableOpacity>
          <Divider style={{ width: W, borderColor: 'gray' }} />
        </View>

      </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '90%',
  },
  modalTitle: {
    alignSelf: 'center',
    fontFamily: 'Medium',
    fontSize: 18,
    marginBottom: 10,
  },
  modalText: {
    alignSelf: 'flex-start',
    fontFamily: 'Medium',
    fontSize: 14,
    marginVertical: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontFamily: 'Medium',
    fontSize: 16,
    marginHorizontal: 16,
  },
});



export default More