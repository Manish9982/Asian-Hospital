import { View, FlatList, Image, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
//import Header from '../../../assets/Schemes/Header'
import { Appbar, Text } from 'react-native-paper'
import { colors, fontFamily, fontSizes, getLocalStorageData, H, PostApiData, savelocalStorageData, W } from '../../../assets/Schemes/Schemes'
import HeaderTwo from '../../../assets/Schemes/HeaderTwo'
import Loader from '../../../assets/Loader/Loader'
import DataContext from '../../../assets/Context/DataContext'
import DoctorCard from '../../../assets/Schemes/DoctorCard'



const Doctor = ({ navigation, route }) => {

  //console.log(route.params.catID)

  const [data, setData] = useState(null)
  const [loader, setLoader] = useState(false)

  const H = Dimensions.get("screen").height
  const W = Dimensions.get("screen").width

  const { NmyAppointmentType, NmyDoctorID } = useContext(DataContext)
  const [myAppointmentType, setMyAppointmentType] = NmyAppointmentType
  const [myDoctorID, setMyDoctorID] = NmyDoctorID
  useEffect(() => { toastHospitalID() }, [])

  const toastHospitalID = async () => {
    const temp = await getLocalStorageData('hospital_id')
    getCategoryData(temp, route.params.catID)
    // console.log(temp)
  }

  const handleNavigation = (doctor_id) => {
    // console.log("Doctor ID in Doctor.js", doctor_id)
    setMyDoctorID(JSON.stringify(doctor_id))
    navigation.navigate('DoctorProfile')
  }



  const getCategoryData = async (hospital_id, cat_id) => {
    setLoader(true)

    var formdata = new FormData();

    formdata.append("hospital_id", hospital_id);
    formdata.append("cat_id", cat_id);

    const result = await PostApiData('doctors_list', formdata)

    // console.log(formdata)

    if (result.status == '200') {

      setData(result)
      // console.log("Doctors List Api result", result)

    } else {

      Alert.alert('Error', `${result.message}`)
    }
    setLoader(false)
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => { handleNavigation(item.doctor.id, item) }}>
        <DoctorCard
          id={item?.doctor?.id}
          profile_url={item.doctor.profile_url}
          image={item?.doctor?.image}
          first_name={item?.doctor?.first_name}
          category={item?.doctor?.category}
          designation={item?.doctor?.designation}
          education={item?.doctor?.education}
          consultant_online={item?.doctor?.consultant_online}
          consultant_person={item?.doctor?.consultant_person}
        />
      </TouchableOpacity>

    )
  }

  return (

    loader ?
      <>
        <Loader />
      </> :
      <View
        style={{
          paddingBottom: 60,
          backgroundColor: 'white'
        }}>
        <>
        </>



        <HeaderTwo Title="Select Doctor" />
        <Text
          style={{
            fontFamily: fontFamily.semibold,
            alignSelf: "center",
            marginVertical: H * 0.01,
            textDecorationLine:"underline"
          }}
        >{route.params.catName}</Text>

        <View style={{ height: H, paddingBottom: H * 0.24 }}>
          <FlatList
            data={data?.doctors}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>


      </View>
  )
}

export default Doctor