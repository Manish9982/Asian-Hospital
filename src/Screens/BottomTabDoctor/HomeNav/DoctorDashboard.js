import { View, Text, Image, Dimensions, TouchableOpacity, FlatList, ToastAndroid, Alert, StatusBar, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { colors, fontFamily, fontSizes, GetApiData, getLocalStorageData, PostApiData, savelocalStorageData } from '../../../assets/Schemes/Schemes'
import { ActivityIndicator } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'
import DoctorCardWithoutPrice from '../../../assets/Schemes/DoctorCardWithoutPrice'
import Loader from '../../../assets/Loader/Loader'
import Geolocation from '@react-native-community/geolocation'
import DataContext from '../../../assets/Context/DataContext'



const H = Dimensions.get("window").height
const W = Dimensions.get("window").width


const DoctorDashboard = ({ navigation }) => {
  const isFocused = useIsFocused()

  const { NshouldDoctorSeeAppointments } = useContext(DataContext)

  const [shouldDoctorSeeAppointments, setShouldDoctorSeeAppointments] = NshouldDoctorSeeAppointments

  const [data, setData] = useState(null)
  const [loader, setLoader] = useState(false)
  const [phcMessage, setPhcMessage] = useState('Nothing to display here..')


  // useEffect(() => { getUserProfile() }, [isFocused])
  useEffect(() => {
    requestLocationPermission()
    // showUHID()
    // getPatientDashboardDetails("28.4468437", "77.3092768")
    // getHospitalData()
  }, [])

  const requestLocationPermission = async () => {
    Geolocation.getCurrentPosition(info => {
      getUserProfile(JSON.stringify(info?.coords?.latitude), JSON.stringify(info?.coords?.longitude))
    },
      error => {
        getUserProfile("", "")
        // console.log("error", error)
      })
  }


  const data2 = [
    {
      "name": " All Appointments",
      "uri": "https://cdn-icons-png.flaticon.com/512/747/747310.png",
      "color": "#47B4F1",
      // "color": "#FFFFFF",
      "count": "20"
    },
    {
      "name": "IPD",
      "uri": "https://cdn-icons-png.flaticon.com/512/1512/1512910.png",
      "color": "#27B99F",
      //"color": "#FFFFFF",
      "count": "15"
    },
    {
      "name": "PHC",
      "uri": "https://cdn-icons-png.flaticon.com/512/1512/1512910.png",
      "color": "#A88FEE",
      // "color": "#FFFFFF",
      "count": "15"
    },
    {
      "name": "Upcoming Appointments",
      "uri": "https://cdn-icons-png.flaticon.com/512/1512/1512910.png",
      "color": "#FFA858",
      // "color": "#FFFFFF",
      "count": "15"
    },
  ]


  const getUserProfile = async (lat, lon) => {
    setLoader(true)

    const token = await getLocalStorageData('token')
    var formdata = new FormData()
    formdata.append("lat", lat)
    formdata.append("lon", lon)
    const result = await PostApiData('doctor_profile', formdata)

    // console.log("Doctor Token At Dashboard", token)
    if (result?.status == '200') {
      setData(result)
      console.log("==>>>>>>> ", result)
      if (result?.appointment_card == 0) {
        setShouldDoctorSeeAppointments(false)
      }
      savelocalStorageData('HID', JSON.stringify(result?.doctor?.hospital_id))
      savelocalStorageData('HNAME', (result?.doctor?.hospital_name))
      savelocalStorageData('hospital_code', (result?.doctor?.organization_code))
      setPhcMessage(result?.phc_message)
      // console.log("=== ", JSON.stringify(result?.doctor?.hospital_name))
    } else {
      Alert.alert('Info', result?.message)
    }
    setLoader(false)
  }


  const renderItem = ({ item, index }) => {

    const getPressed = () => {

      if (index == 0 && data?.appointment_card == 1) {
        return (
          navigation.navigate("DoCPatientsAppointmentList")
        )
      } else if (index == 1 && data?.ipd_card == 1) {

        navigation.navigate("DoCIpdBilling")

      } else if (index == 2 && data?.virtual_phc_card == 1) {
        navigation.navigate("VirtualPHC", { 'phcMessage': phcMessage })

      } else if (index == 3 && data?.upcoming_appointmnets_card == 1) {
        navigation.navigate("DoCUpcomingAppointments")
      }
      else {
        Alert.alert("Info", "This category is not available for you.")
      }

    }


    const getColor = () => {
      if (index == 0 && data?.appointment_card == 1) {
        return (
          "#27B99F"
        )
      } else if (index == 1 && data?.ipd_card == 1) {
        return (
          colors.toobarcolor
        )
      }
      else if (index == 2 && data?.virtual_phc_card == 1) {
        return (
          "#F1624B"
        )
      } else if (index == 3 && data?.upcoming_appointmnets_card == 1) {
        return (
          colors.purplecolor
        )
      }
      else {
        return "silver"
      }
    }
    return (

      <TouchableOpacity
        onPress={() => { getPressed() }}

        style={{
          //flex: 3,
          backgroundColor: getColor(),
          height: W * 0.4,
          width: W * 0.4,
          marginTop: H * 0.03,
          marginHorizontal: W * 0.05,
          borderRadius: 8,
          justifyContent: 'center',
        }}>
        <View style={{
          flex: 1,
          justifyContent: "center"
        }}>
          <Image
            source={require('../../../assets/Images/asianlogo.png')}
            style={{
              height: H * 0.04,
              width: W * 0.3,
              tintColor: "white",
              marginStart: H * 0.005,
              alignSelf: "center"
            }} />

        </View>
        <View style={{
          flex: 1,
          justifyContent: "center"
        }}>
          {
            <Image
              source={{ uri: item.uri }}
              style={{
                height: H * 0.04,
                width: H * 0.04,
                tintColor: "white",
                marginTop: H * 0.02,
                //  marginStart: H * 0.02,
                alignSelf: 'center'

              }}
            />
          }
        </View>
        <View style={{
          flex: 1,
          justifyContent: "center"
        }}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={2}
            style={{
              width: W * 0.35,
              marginTop: 5,
              color: 'white',
              fontSize: fontSizes.default,
              fontFamily: fontFamily.medium,
              alignSelf: 'center',
              textAlign: 'center'
            }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (

    loader ?
      <>
        <Loader />
      </>
      :

      <View
        style={{
          //marginTop: Platform.OS == "android" ? 0 : H * 0.03,
          width: W,
          backgroundColor: 'red',
        }}>
        <StatusBar backgroundColor={colors.toobarcolor} />
        <View

          style={{
            height: H,
            width: W,
            backgroundColor: "white",
            paddingBottom: H * 0.1
          }}>

          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: W * 0.05
            }}>

            <Image
              source={require('../../../assets/Images/bgimage.png')}
              style={{
                height: H * 0.25,
                position: 'absolute',
                width: W,
              }} />

            <View
              style={{ flexDirection: 'row', }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: fontFamily.medium,
                  color: colors.white,
                  marginLeft: H * 0.02,
                  color: "white",
                  fontSize: fontSizes.XL,
                  marginTop: Platform.OS == "android" ? H * 0.025 : H * 0.055,
                }}>Dashboard</Text>

              <TouchableOpacity
                style={{
                  left: W * 0.3
                }}
                onPress={() => { navigation.navigate("AllLogos") }}>

                <Image
                  source={require('../../../assets/Images/asianlogo.png')}
                  style={{
                    height: H * 0.05,
                    width: W * 0.3,
                    alignSelf: 'center',
                    resizeMode: "cover",
                    alignSelf: 'center',
                    marginTop: Platform.OS == "android" ? H * 0.025 : H * 0.055,
                    tintColor: 'white'
                  }} />
              </TouchableOpacity>

            </View>

          </View>

          <View style={{
            paddingTop: H * 0.04
          }}>
            <DoctorCardWithoutPrice
              id={data?.doctor?.id}
              profile_url={data?.doctor?.profile_url}
              image={data?.doctor?.image}
              first_name={data?.doctor?.first_name}
              category={data?.doctor?.category}
              designation={data?.doctor?.designation}
              education={data?.doctor?.education}
            />
          </View>

          <View style={{
            backgroundColor: "white",
            alignItems: "center",
            height: H * 0.55
          }}>

            <FlatList
              data={data2}
              keyExtractor={(item, index) => `${index}`}
              renderItem={renderItem}
              numColumns={2} />

          </View>

        </View>

      </View >
  )
}

export default DoctorDashboard