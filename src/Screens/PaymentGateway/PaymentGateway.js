import { View, Text, SafeAreaView, BackHandler, Linking } from 'react-native'
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
    if (info?.url == Constants.PAYMENT_SUCCESS) {
      navigation.navigate("PatientDashboard")
    }
    else if (info?.url == Constants.PAYMENT_FAIL) {
      navigation.navigate("DoctorProfile")
    }
  }

  console.log("ID==========>", `${Constants.PAYMENT_GATEWAY}${myAppointmentId}`)
  return (
    <SafeAreaView style={{
      height: H,
      width: W,
    }}>
      <WebView
        javaScriptEnabled={true}
        onShouldStartLoadWithRequest={(event) => {
          const { url } = event;
          console.log("url===============>", url)
          if (url.startsWith('upi://')) {
            // Handle the custom scheme here, e.g., open it in a browser
            Linking.openURL(url); // Open the URL in the device's browser
            return false; // Prevent the WebView from navigating
          }
          return true; // Allow other URLs to load
        }}
        javaScriptCanOpenWindowsAutomatically={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        originWhitelist={['upi://', 'https://']}
        //source={{ uri: `${Constants.PAYMENT_GATEWAY}${myAppointmentId}&firstname=${route.params.gender == "Self" ? mySelf : patientName}&amount=${myPrice}&email=${myEmail}&phone=${mobileNo}` }}
        source={{ uri: `${Constants.PAYMENT_GATEWAY}${myAppointmentId}` }}
        style={{ marginTop: 20 }}
        onNavigationStateChange={(info) => navigationOnWebView(info)}
      />
    </SafeAreaView>
  );
}

export default PaymentGateway