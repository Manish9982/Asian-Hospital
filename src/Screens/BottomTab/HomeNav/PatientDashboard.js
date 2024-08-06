import { Modal, ScrollView, View, Text, FlatList, Dimensions, Image, TouchableOpacity, Alert, SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native'

import React, { useEffect, useState, useContext } from 'react'
import { Divider } from 'react-native-paper';
import { colors, fontFamily, fontSizes, GetApiData, getLocalStorageData, PostApiData, savelocalStorageData, W } from '../../../assets/Schemes/Schemes';

import Geolocation from '@react-native-community/geolocation';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Loader from '../../../assets/Loader/Loader';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataContext from '../../../assets/Context/DataContext';
import BecomePrivilegedUserButton from '../../../components/BecomePrivilegedUserButton';

const PatientDashboard = ({ navigation }) => {
  const isFocused = useIsFocused()

  const { Ndata, NmobileNo, Nuhid, NmySelf } = useContext(DataContext)
  const [searchQuery, setSearchQuery] = React.useState('');
  const [loader, setLoader] = useState(false)
  const [data, setData] = Ndata
  const [modalVisible, setModalVisible] = useState(false)
  const [hospitals, setHospitals] = useState([])

  const [mobileNo, setMobileNo] = NmobileNo
  const [uhid, setUhid] = Nuhid
  const [mySelf, setMySelf] = NmySelf

  const onChangeSearch = query => setSearchQuery(query);
  const H = Dimensions.get("window").height
  const W = Dimensions.get("window").width

  useEffect(() => {
    {
      isFocused &&
        requestLocationPermission()
    }
    // showUHID()
    // getPatientDashboardDetails("28.4468437", "77.3092768")
    // getHospitalData()
  }, [isFocused])



  const requestLocationPermission = async () => {
    Geolocation.getCurrentPosition(info => {
      getPatientDashboardDetails(JSON.stringify(info?.coords?.latitude), JSON.stringify(info?.coords?.longitude))
    },
      error => {
        getPatientDashboardDetails("28.4468437", "77.3092768")
        //console.log("error", error)
      })
  }


  const showUHID = async () => {
    const temp = await getLocalStorageData('UHID')
    Alert.alert("Your UHID:", `${temp}`)
  }

  const getHospitalData = async () => {
    const temp = await getLocalStorageData('hospital_name')
    const temp2 = await getLocalStorageData('itemaddress1')
    const temp3 = await getLocalStorageData('itemlogo')
    setData({
      "hospital": {
        "name": `${temp}`,
        "address1": `${temp2}`,
        "logo": `${temp3}`
      },
    })
  }

  const openHospitallist = async () => {
    const result = await GetApiData('hospitals')
    //console.log(result)
    setHospitals(result)
    setModalVisible(true)
  }

  const renderItemHospitals = ({ item, index }) => {
    return (

      <View>
        <TouchableOpacity

          onPress={() => {
            setModalVisible(false)
            savelocalStorageData('hospital_name', item.name)
            savelocalStorageData('hospital_id', JSON.stringify(item.id))
            savelocalStorageData('hospital_code', item.organizationcode)
            savelocalStorageData('logoHospital', item?.logo)
            savelocalStorageData('nameHospital', item?.name)
            savelocalStorageData('addressHospital', item?.address1)
            setData({
              "hospital": {
                "name": `${item.name}`,
                "address1": `${item.address1}`,
                "logo": `${item.logo}`,
                "hospital_id": `${item.id}`
              },
            })
          }}

          style={{
            marginLeft: 15,
            flexDirection: "row",
            alignItems: "center",
          }}>


          <View style={{ flexDirection: 'column', padding: 5, paddingVertical: H * 0.02 }}>
            <Text style={{ fontSize: fontSizes.default, fontFamily: fontFamily.medium, color: 'black' }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>

        <Divider
          style={{ width: W, borderColor: 'black', borderWidth: 0.05 }} />
      </View>
    )
  }

  const getPatientDashboardDetails = async (lat, lon) => {
    setLoader(true)
    var formdata = new FormData();
    formdata.append("lat", lat)
    formdata.append("lang", lon)
    const result = await PostApiData('patient_dashboard', formdata)
    //console.log("Patient Dashboard Api response", result)
    if (result.status == '200') {
      setMySelf(result?.name)
      setUhid(result?.his_id)
      setMobileNo(result?.mobile)
      // savelocalStorageData('hospital_name', (result?.hospital?.name))
      try {
        const value1 = await AsyncStorage.getItem('logoHospital')
        const value2 = await AsyncStorage.getItem('hospital_name')
        const value3 = await AsyncStorage.getItem('addressHospital')
        const value4 = await AsyncStorage.getItem('token')
        const value5 = await AsyncStorage.getItem('hospital_id')
        //console.log("Token At Dashboard========>", value4)
        if ((value1 == null) && (value2 == null) && (value3 == null) && (value5 == null)) {
          savelocalStorageData('hospital_id', JSON.stringify(result?.hospital?.id))
          savelocalStorageData('hospital_code', result?.hospital?.organizationcode)
          savelocalStorageData('logoHospital', result?.hospital?.logo)
          savelocalStorageData('hospital_name', result?.hospital?.name)
          savelocalStorageData('addressHospital', result?.hospital?.address1)
          setData({
            "hospital": {
              "name": `${result?.hospital?.name}`,
              "address1": `${result?.hospital?.address1}`,
              "logo": `${result?.hospital?.logo}`,
              "hospital_id": `${result?.hospital?.id}`,
            },
          })
        }
        else {
          setData({
            "hospital": {
              "name": `${value2}`,
              "address1": `${value3}`,
              "logo": `${value1}`,
              "hospital_id": `${value5}`
            },
          })
        }
      } catch (e) {
      }

    } else {

      Alert.alert('Error', `${result.message}`)
    }
    setLoader(false)
  }

  const sliderdata = [
    {
      "name": "Book Appointments",
      "number_of_doc": "25 Doctors",
      "uri": require('../../../assets/Images/bookAppointments.png'),
      "isvisible": true
    },

    {
      "name": "Reports",
      "number_of_doc": "25 Doctors",
      "uri": require('../../../assets/Images/reports-copy.png'),
      "isvisible": true
    },
    {
      "name": "My Appointments",
      "number_of_doc": "25 Doctors",
      "uri": require('../../../assets/Images/myAppointments.png'),
      "isvisible": true
    },
    {
      "name": "Add Patient",
      "number_of_doc": "25 Doctors",
      "uri": require('../../../assets/Images/addPatients.png'),
      "isvisible": true
    },


    {
      "name": "Obesity Packages",
      "number_of_doc": "25 Doctors",
      "uri": require('../../../assets/Images/obesity.png'),
      "isvisible": true
    },
    {
      "name": "Scan QR & Order Food",
      "number_of_doc": "25 Doctors",
      "uri": require('../../../assets/Images/fast-food.png'),
      "isvisible": data?.hospital?.hospital_id == '1'
    },
    {
      //spacer
      "name": "",
      "number_of_doc": "",
      //"uri": require('../../../assets/Images/fast-food.png'),
      "isvisible": !(data?.hospital?.hospital_id == '1')
    },

  ]

  const onPressBecomePrivilegedButton = () => {
    navigation.navigate('PrivilegePackages')
  }

  const renderItem = (item, index) => {

    const getPressed = () => {
      if (index == 0) {
        navigation.navigate("AppointmentsNav")
      }
      else if (index == 1) {
        navigation.navigate("ReportsNav")
      }
      else if (index == 2) {
        navigation.navigate("MyAppointments")
      }
      else if (index == 3) {
        navigation.navigate("AddPatients")
      }
      else if (index == 4) {
        navigation.navigate("ObesityPackages")
      }
      else if (index == 5) {
        navigation.navigate("ScannerScreen")
      }
    }

    const getColor = () => {
      if (index == 0) {
        return colors.greencolor;
      } else if (index == 1) {
        return colors.toobarcolor;
      }
      else if (index == 2) {
        return "#F1624B";

      } else if (index == 3) {
        return colors.purplecolor;

      } else if (index == 4) {
        return colors.mustard;

      } else if (index == 5) {
        return colors.pink;
      } else if (index == 6) {
        return null;
      } 
      
    }
    if (item?.isvisible) {
      return (

        <View key={index}>

          <TouchableOpacity

            onPress={() => { getPressed() }}

            style={{
              flex: 3,
              backgroundColor: getColor(),
              height: W * 0.4,
              width: W * 0.4,
              marginTop: W * 0.05,
              borderRadius: 8,
              justifyContent: "space-evenly",
              alignItems: "center"
            }}>
            <View style={{
              flex: 1
            }}>
              <Image
                source={require('../../../assets/Images/asianlogo.png')}
                style={{
                  height: W * 0.12,
                  tintColor: 'white',
                  resizeMode: "contain",
                }} />
            </View>
            <View style={{
              flex: 1
            }}>
              <Image
                source={item.uri}
                style={{
                  resizeMode: "contain",
                  tintColor: "white",
                  height: W * 0.12,
                  width: W * 0.12
                }}
              />
            </View>
            <View style={{
              flex: 1,
              justifyContent: "center"
            }}>
              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={{
                  alignSelf: "center",
                  width: H * 0.15,
                  color: 'white',
                  fontSize: fontSizes.default,
                  fontFamily: fontFamily.medium,
                  textAlign: "center",
                }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }

  }
  return (
    loader ?
      <>
        <Loader />
      </>

      :

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <StatusBar backgroundColor={colors.toobarcolor} />

        {<Image
          source={require('../../../assets/Images/bgimage.png')}
          style={{
            height: H * 0.25,
            position: 'absolute',

            width: W,
          }} />}


        <View
          style={{
            //backgroundColor: 'red',
            paddingBottom: 30,
            alignItems: "center",
            flexDirection: 'row',
            marginTop: Platform.OS == "ios" ? H * 0.04 : H * 0.025,
          }}>
          <Modal
            visible={modalVisible}
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
                width: W * 0.9,
                backgroundColor: "white",
                borderRadius: 8,
              }}>

                <Text style={{
                  alignSelf: 'center', marginBottom: 10, color: colors.black,
                  fontFamily: fontFamily.medium, fontSize: fontSizes.default
                }}>Choose Hospital</Text>


                <Divider
                  style={{
                    width: W,
                    borderColor: 'black',
                    borderWidth: 0.02
                  }} />
                <FlatList
                  persistentScrollbar
                  showsVerticalScrollIndicator
                  data={hospitals?.hospitals}
                  renderItem={renderItemHospitals}
                  keyExtractor={(item, index) => `${index}`}
                />



                <TouchableOpacity onPress={() => {
                  setModalVisible(false)
                }}>
                  <Text style={{
                    marginTop: H * 0.05,
                    textDecorationLine: 'underline',
                    marginRight: W * 0.05,
                    color: colors.toobarcolor,
                    fontSize: fontSizes.SM,
                    alignSelf: "flex-end"
                  }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: fontFamily.medium,
                color: colors.white,
                marginLeft: H * 0.035,
                color: "white",
                fontSize: fontSizes.XL,
              }}>Dashboard</Text>
          </View>
          <BecomePrivilegedUserButton
            onPress={onPressBecomePrivilegedButton}
            style={styles.becomePrivilegedButton} />
          <TouchableOpacity
            style={{
              alignSelf: "center",
              left: W * 0.35,
              top: - H * 0.01

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
                marginTop: H * 0.025,
                tintColor: 'white'
              }} />
          </TouchableOpacity>

        </View>

        {
          data?.hospital?.logo
            ?
            <Image source={{ uri: `${data?.hospital.logo}` }}

              style={{
                height: H * 0.23,
                width: W * 0.9,
                alignSelf: 'center',
                //marginTop: H * 0.03,
                borderRadius: 12,
              }} />
            :

            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2749/2749678.png' }}

              style={{
                height: H * 0.23,
                width: W * 0.9,
                alignSelf: 'center',
                marginTop: H * 0.03,
                borderRadius: 12,
              }} />
        }

        <TouchableOpacity onPress={() => {
          openHospitallist()
        }}>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{
              marginStart: W * 0.07,
              marginTop: 8,
              alignSelf: 'flex-start',
              color: 'black',
              fontSize: fontSizes.XL,
              fontFamily: fontFamily.medium,
            }}>{data?.hospital?.name}</Text>

            <Image
              style={{
                height: H * 0.02,
                width: H * 0.02,
                alignSelf: 'center',
                marginLeft: H * 0.01,
                marginTop: H * 0.005
              }}

              source={require('../../../assets/Images/pencil.png')}></Image>

          </View>

          <View style={{
            flexDirection: 'row',
            marginHorizontal: W * 0.07
          }}>
            <Image
              style={{
                height: H * 0.025,
                width: H * 0.025,
                tintColor: 'red'
              }}
              source={require('../../../assets/Images/loc.png')} />

            <Text
              adjustsFontSizeToFit
              style={{
                alignSelf: 'flex-start',
                color: 'gray',
                fontSize: fontSizes.SM,
                fontFamily: fontFamily.medium,
                marginStart: W * 0.02
              }}>{data?.hospital?.address1}</Text>

          </View>
        </TouchableOpacity>

        <View
          style={{ width: W, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}
        >
          {/* <FlatList
            columnWrapperStyle={{
              flex: 1,
              justifyContent: "space-evenly"
            }
            }
            data={sliderdata}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}`}
            scrollEnabled={false}
            numColumns={2} /> */}
          {

            sliderdata?.map((item, index) => {
              return (
                renderItem(item, index)
              )
            })
          }
        </View>

      </ScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle:
  {
    paddingBottom: 20,
    backgroundColor: '#fff'
  },
  becomePrivilegedButton:
  {
    position: 'absolute',
    bottom: 0,
    left: 0
  }
})

export default PatientDashboard

