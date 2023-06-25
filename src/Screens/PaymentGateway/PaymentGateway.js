import { View, Text, SafeAreaView, BackHandler } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { WebView } from 'react-native-webview';
import DataContext from '../../assets/Context/DataContext';
import { H, W } from '../../assets/Schemes/Schemes';
import { Constants } from '../../assets/Schemes/Constants';

const PaymentGateway = ({ navigation, route }) => {
  const { NmyAppointmentId, NmySelf, NpatientName, NmyPrice, NmyEmail, NmyDoctor, NmyAppointmentDate, NmySlot, NmySlotId, NmyDoctorDesignation, NmobileNo } = useContext(DataContext)
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
  const [patientName, setPatientName] = NpatientName

  useEffect(() => {

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)

    return () => backHandler.remove();
  }, []);

  const navigationOnWebView = (info) => {
    if (info?.url == "payu-money-payment") {
      navigation.navigate("PatientDashboard")
    }
    else if (info?.url == `${Constants.BASE}payu-money-payment-cancel`) {
      navigation.navigate("DoctorProfile")
    }
  }


  return (
    <SafeAreaView style={{
      height: H,
      width: W,
    }}>
      <WebView
        source={{ uri: `${Constants.BASE}payu-money-payment?productinfo=${myAppointmentId}&firstname=${route.params.gender == "Self" ? mySelf : patientName}&amount=${myPrice}&email=${myEmail}&phone=${mobileNo}` }}
        style={{ marginTop: 20 }}
        onNavigationStateChange={(info) => navigationOnWebView(info)}
      />
    </SafeAreaView>
  );
}

export default PaymentGateway