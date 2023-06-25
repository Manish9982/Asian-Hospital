import { Alert, Image, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Text } from 'react-native-paper'
import { colors, convert24hTo12hFormat, fontFamily, fontSizes, getLocalStorageData, H, PostApiData, timeStampToDateFormatd_m_y, timeStampToDateFormaty_m_d, W } from '../../assets/Schemes/Schemes'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import DataContext from '../../assets/Context/DataContext'
import Loader from '../../assets/Loader/Loader'
import DoctorCardWithoutPrice from '../../assets/Schemes/DoctorCardWithoutPrice'
import Timer from '../../assets/Schemes/Timer'

const SlotBlockingScreen = ({ navigation, route }) => {

  const { NpatientName, NapiDate, Nuhid, NmyAppointmentId, NmySelf, NmyPrice, NmyEmail, NmyDoctor, NmyAppointmentDate, NmySlot, NmySlotId, NmyDoctorDesignation, NmobileNo, NpatientID, NmyAppointmentType, NmyDoctorImage, NmyDoctorCategory, NmyDoctorEducation } = useContext(DataContext)

  const [myDoctor, setMyDoctor] = NmyDoctor
  const [myAppointmentDate, setMyAppointmentDate] = NmyAppointmentDate
  const [mySlot, setMySlot] = NmySlot
  const [mySlotId, setMySlotId] = NmySlotId
  const [myDoctorDesignation, setMyDoctorDesignation] = NmyDoctorDesignation
  const [myAppointmentId, setMyAppointmentId] = NmyAppointmentId
  const [mySelf, setMySelf] = NmySelf
  const [myPrice, setMyPrice] = NmyPrice
  const [myEmail, setMyEmail] = NmyEmail
  const [mobileNo, setMobileNo] = NmobileNo
  const [apiDate, setApiDate] = NapiDate
  const [patientID, setPatientID] = NpatientID
  const [myAppointmentType, setMyAppointmentType] = NmyAppointmentType
  const [uhid, setUhid] = Nuhid
  const [myDoctorImage, setMyDoctorImage] = NmyDoctorImage
  const [myDoctorCategory, setMyDoctorCategory] = NmyDoctorCategory
  const [patientName, setPatientName] = NpatientName
  const [myDoctorEducation, setMyDoctorEducation] = NmyDoctorEducation

  const [loader, setLoader] = useState(false)

  const cancelSlotAndNavigate = async () => {
    var formdata = new FormData();
    formdata.append("slot_id", mySlotId);
    const result = await PostApiData('delete_slot', formdata)
    if (result?.status == '200') {
      navigation.goBack()
    }
    else {
      Alert.alert('Warning!', `${result?.message}`)
    }
  }

  const bookAppointmentAndContinueToPaymentGateway = async () => {
    setLoader(true)
    const hospital_id = await getLocalStorageData('hospital_id')
    const doctor_id = await getLocalStorageData('doctor_id')
    var formdata = new FormData();
    formdata.append("hospital_id", hospital_id);
    formdata.append("doctor_id", doctor_id);
    formdata.append("appointment_date", timeStampToDateFormaty_m_d(apiDate));
    formdata.append("appointment_type", myAppointmentType);
    formdata.append("slot", mySlot);
    route.params.gender == "Self" ? formdata.append("his_id", uhid) : formdata.append("his_id", patientID);
    formdata.append("amount", "1");
    //console.log("formdata for appointment api", formdata)
    const result = await PostApiData('appointment', formdata)
    //console.log("result of appointment api", result)
    if (result?.status == '200') {
      await setMyAppointmentId(result?.appoint?.id)
      await setMyPrice(result?.appoint?.amount)
      await setMyEmail(result?.appoint?.email)
      //  setMobileNo(result?.appoint?.phone)
      navigation.navigate("PaymentGateway")
    }
    else {
      Alert.alert("Alert", `${result?.message}`)
    }
    setLoader(false)
  }


  return (
    loader ?
      <Loader />
      :
      <View style={{
        height: H,
        width: W,
        backgroundColor: "white",
      }}>
        <HeaderTwo Title="" />
        <View >

          <DoctorCardWithoutPrice
            profile_url={myDoctorImage}
            image={""}
            first_name={myDoctor}
            category={myDoctorCategory}
            designation={myDoctorDesignation}
            education={myDoctorEducation}
          />
          <Text style={{
            marginTop: H * 0.03,
            textDecorationLine: "underline",
            textAlign: "center"
          }}>Appointment Details:</Text>
          <View style={{
            borderColor: "black",
            borderWidth: 1,
            alignSelf: "center",
            width: W * 0.85,
            borderRadius: 8,
            marginVertical: H * 0.03,
            paddingVertical: H * 0.01
          }}>
            {route.params.gender == "Self" ?
              <Text style={{
                maxWidth: W * 0.46,
                fontFamily: fontFamily.semibold,
                marginLeft: W * 0.05
              }}>{mySelf}</Text>
              :
              <Text style={{
                maxWidth: W * 0.46,
                fontFamily: fontFamily.semibold,
                marginLeft: W * 0.05
              }}>{patientName}</Text>
            }
            <Text style={{
              fontFamily: fontFamily.semibold,
              marginLeft: W * 0.05
            }}>{timeStampToDateFormatd_m_y(apiDate)}, {convert24hTo12hFormat(mySlot)}</Text>

            <Text style={{
              fontFamily: fontFamily.semibold,
              right: W * 0.07,
              top: H * 0.01,
              position: "absolute",
              color: myAppointmentType == "0" ? "blue" : "green"
            }}>({myAppointmentType == "0" ? "In Person" : "Online"})</Text>
          </View>
          <TouchableOpacity
            onPress={() => { bookAppointmentAndContinueToPaymentGateway() }}
            style={{
              height: H * 0.06,
              width: W * 0.85,
              alignSelf: "center",
              backgroundColor: "green",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: H * 0.01
            }}>
            <Text style={{
              color: "white"
            }}>Continue to payment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              cancelSlotAndNavigate()
            }}
            style={{
              height: H * 0.06,
              width: W * 0.85,
              alignSelf: "center",
              backgroundColor: "red",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Text style={{
              color: "white"
            }}>Cancel</Text>
          </TouchableOpacity>
          {/* <Text style={{
          width: W * 0.7,
          alignSelf: "center",
          textAlign: "center",
          fontSize: fontSizes.SM,
          marginTop: 2,
        }}>(On Cancelling, This Slot Might Become Unavailable Later.)</Text> */}
        </View>
      </View>
  )
}

export default SlotBlockingScreen