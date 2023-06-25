import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Screens/SplashScreen/Splash';
import CallingScreen from '../Screens/CallingScreen/CallingScreen';
import Loader from '../assets/Loader/Loader';
import Login from '../Screens/Login/Login';
import Signup from '../Screens/Signup/Signup';
import VerifyOTP from '../Screens/VerifyOTP/VerifyOTP';
import BottomTab from '../Screens/BottomTab/BottomTab';
import OtpInputComponent from '../Screens/VerifyOTP/OtpInputComponent';
import Profile from '../Screens/BottomTab/MoreNav/Profile';
import DoctorProfile from '../Screens/BottomTab/AppointmentsNav/DoctorProfile';
import Doctor from '../Screens/BottomTab/AppointmentsNav/Doctor';
import BottomTabDoctor from '../Screens/BottomTabDoctor/BottomTabDoctor';
import DoctorDashboard from '../Screens/BottomTabDoctor/HomeNav/DoctorDashboard';
import MyProfile from '../Screens/BottomTabDoctor/MoreNav/MyProfile';
import AddReports from '../Screens/AddReports';
import PatientAppoinmentDetails from '../Screens/PatientAppointmentDetails/PatientAppoinmentDetails';
import SearchCity from '../Screens/Search/SearchCity';
import SearchState from '../Screens/Search/SearchState';
import SearchCountry from '../Screens/Search/SearchCountry';
import DisplayReports from '../Screens/BottomTab/ReportsNav/DisplayReports';
import DownloadReports from '../Screens/DownloadReports/DownloadReports';
import DisplayBill from '../Screens/DisplayBill/DisplayBill';
import SlotBlockingScreen from '../Screens/SlotBookingScreen/SlotBlockingScreen';
import AllLogos from '../Screens/AllLogos/AllLogos';
import AddPatients from '../Screens/AddPatients/AddPatients';
import ChangeHospitals from '../Screens/ChangeHospitals/ChangeHospitals';
import AddPatientsDuringAppointments from '../Screens/AddPatientDuringAppointments.js/AddPatientDuringAppointments';
import PaymentGateway from '../Screens/PaymentGateway/PaymentGateway';
import VideoCalling from '../Screens/VideoCalling/VideoCalling';
import AfterSlotBlockingConfirmation from '../Screens/AfterSlotBlockingConfirmation/AfterSlotBlockingConfirmation';
import MyAppointments from '../Screens/MyAppointments/MyAppointments';
import DoCPatientsAppointmentList from '../Screens/DoCPatientsAppointmentList/DoCPatientsAppointmentList';
import DoCPatientDetails from '../Screens/DoCPatientDetails/DoCPatientDetails';
import DoctorCard from '../assets/Schemes/DoctorCard';
import VideoCallingDirect from '../Screens/VideoCallingDirect/VideoCallingDirect';
import DoCViewPrescription from '../Screens/DoCViewPrescription/DoCViewPrescription';
import DoCViewImage from '../Screens/DoCViewPrescription/DoCViewImage';
import DoCImageViewer from '../Screens/DoCViewPrescription/DoCImageViewer';
import DoCAddReports from '../Screens/DoCAddReports/DoCAddReports';
import DoCMyProfile from '../Screens/DoCMyProfile/DoCMyprofile';
import DoCUpcomingAppointments from '../Screens/DoCUpcomingAppointments.js/DoCUpcomingAppointments';
import Timer from '../assets/Schemes/Timer';
import NotificationsDisplaying from '../Screens/NotificationsDisplaying/NotificationsDisplaying';
import DoCBookAppointmnetForMe from '../Screens/DoCBookAppointmentForMe/DoCBookAppointmnetForMe';
import LoginWhenSwitchingFromDoctorToPatient from '../Screens/LoginWhenSwitchingFromDoctorToPatient/LoginWhenSwitchingFromDoctorToPatient';
import DoCIpdBilling from '../Screens/DoCIpdBilling/DoCIpdBilling';
import PermissionScreenForVideoCall from '../Screens/PermissionScreenForVideoCall/PermissionScreenForVideoCall';
import ChangePatient from '../Screens/ChangePatient/ChangePatient';
import CoordinatorWebview from '../Screens/CoordinatorWebview/CoordinatorWebview';
import VirtualPHC from '../Screens/VirtualPHC/VirtualPHC';
import FirstTimePassword from '../Screens/FirstTimePassword/FirstTimePassword';
import ContactUs from '../Screens/ContactUs/ContactUs';
import DoCIpdReports from '../Screens/DoCIpdReports/DoCIpdReports';
import DoCIpdReportsDisplay from '../Screens/DoCIpdReportsDisplay/DoCIpdReportsDisplay';
import DataContext from '../assets/Context/DataContext';

const Router = (props) => {

    const Stack = createNativeStackNavigator();
    const { NsignedState } = useContext(DataContext)
    const [signedState, setSignedState] = NsignedState


    if (signedState == 'doctor') {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={props.initialRoute}
                    screenOptions={{
                        headerShown: false
                    }}>
                    <Stack.Screen name="BottomTabDoctor" component={BottomTabDoctor} options={{ headerShown: false }} />
                    <Stack.Screen name="CallingScreen" component={CallingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Loader" component={Loader} options={{ headerShown: false }} />
                    <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} options={{ headerShown: false }} />
                    <Stack.Screen name="AddReports" component={AddReports} options={{ headerShown: false }} />
                    <Stack.Screen name="PatientAppoinmentDetails" component={PatientAppoinmentDetails} options={{ headerShown: false }} />
                    <Stack.Screen name="AllLogos" component={AllLogos} options={{ headerShown: false }} />
                    <Stack.Screen name="VideoCalling" component={VideoCalling} options={{ headerShown: false }} />
                    <Stack.Screen name="DoCPatientsAppointmentList" component={DoCPatientsAppointmentList} options={{ headerShown: false }} />
                    <Stack.Screen name="DoCPatientDetails" component={DoCPatientDetails} options={{ headerShown: false }} />
                    <Stack.Screen name="DoctorCard" component={DoctorCard} options={{ headerShown: false }} />
                    <Stack.Screen name="VideoCallingDirect" component={VideoCallingDirect} options={{ headerShown: false }} />
                    <Stack.Screen name="DoCViewPrescription" component={DoCViewPrescription} options={{ headerShown: false }} />
                    <Stack.Screen name="DoCViewImage" component={DoCViewImage} options={{ headerShown: false }} />
                    <Stack.Screen name="DoCImageViewer" component={DoCImageViewer} options={{ headerShown: false }} />
                    <Stack.Screen name="DoCAddReports" component={DoCAddReports} options={{ headerShown: false }} />
                    <Stack.Screen name="DoCMyProfile" component={DoCMyProfile} options={{ headerShown: false }} />
                    <Stack.Screen name="DoCUpcomingAppointments" component={DoCUpcomingAppointments} options={{ headerShown: false }} />
                    <Stack.Screen name="DoCBookAppointmnetForMe" component={DoCBookAppointmnetForMe} options={{ headerShown: false }} />
                    <Stack.Screen name="DoCIpdBilling" component={DoCIpdBilling} options={{ headerShown: false }} />
                    <Stack.Screen name="VirtualPHC" component={VirtualPHC} options={{ headerShown: false }} />
                    <Stack.Screen name="FirstTimePassword" component={FirstTimePassword} options={{ headerShown: false }} />
                    <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} />
                    <Stack.Screen name="DoCIpdReports" component={DoCIpdReports} options={{ headerShown: false }} />
                    <Stack.Screen name="DoCIpdReportsDisplay" component={DoCIpdReportsDisplay} options={{ headerShown: false }} />
                    <Stack.Screen name="DisplayBill" component={DisplayBill} options={{ headerShown: false }} />

                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    else if (signedState == 'patient') {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={props.initialRoute}
                    // initalRouteParams={initialRouteParams}
                    screenOptions={{
                        headerShown: false
                    }}>
                    <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
                    <Stack.Screen name="LoginWhenSwitchingFromDoctorToPatient" component={LoginWhenSwitchingFromDoctorToPatient} options={{ headerShown: false }} />
                    <Stack.Screen name="CallingScreen" component={CallingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Loader" component={Loader} options={{ headerShown: false }} />
                    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                    <Stack.Screen name="DoctorProfile" component={DoctorProfile} options={{ headerShown: false }} />
                    <Stack.Screen name="Doctor" component={Doctor} options={{ headerShown: false }} />
                    <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} options={{ headerShown: false }} />
                    <Stack.Screen name="MyProfile" component={MyProfile} options={{ headerShown: false }} />
                    <Stack.Screen name="AddReports" component={AddReports} options={{ headerShown: false }} />
                    <Stack.Screen name="PatientAppoinmentDetails" component={PatientAppoinmentDetails} options={{ headerShown: false }} />
                    <Stack.Screen name="SearchCity" component={SearchCity} options={{ headerShown: false }} />
                    <Stack.Screen name="SearchState" component={SearchState} options={{ headerShown: false }} />
                    <Stack.Screen name="SearchCountry" component={SearchCountry} options={{ headerShown: false }} />
                    <Stack.Screen name="DisplayReports" component={DisplayReports} options={{ headerShown: false }} />
                    <Stack.Screen name="DownloadReports" component={DownloadReports} options={{ headerShown: false }} />
                    <Stack.Screen name="DisplayBill" component={DisplayBill} options={{ headerShown: false }} />
                    <Stack.Screen name="SlotBlockingScreen" component={SlotBlockingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="AllLogos" component={AllLogos} options={{ headerShown: false }} />
                    <Stack.Screen name="AddPatients" component={AddPatients} options={{ headerShown: false }} />
                    <Stack.Screen name="ChangeHospitals" component={ChangeHospitals} options={{ headerShown: false }} />
                    <Stack.Screen name="AddPatientDuringAppointments" component={AddPatientsDuringAppointments} options={{ headerShown: false }} />
                    <Stack.Screen name="PaymentGateway" component={PaymentGateway} options={{ headerShown: false }} />
                    <Stack.Screen name="VideoCalling" component={VideoCalling} options={{ headerShown: false }} />
                    <Stack.Screen name="AfterSlotBlockingConfirmation" component={AfterSlotBlockingConfirmation} options={{ headerShown: false }} />
                    <Stack.Screen name="MyAppointments" component={MyAppointments} options={{ headerShown: false }} />
                    <Stack.Screen name="DoctorCard" component={DoctorCard} options={{ headerShown: false }} />
                    <Stack.Screen name="VideoCallingDirect" component={VideoCallingDirect} options={{ headerShown: false }} />
                    <Stack.Screen name="NotificationsDisplaying" component={NotificationsDisplaying} options={{ headerShown: false }} />
                    <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} />
                    <Stack.Screen name="ChangePatient" component={ChangePatient} options={{ headerShown: false }} />


                </Stack.Navigator>
            </NavigationContainer>
        )
    }
    else {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={props.initialRoute}
                    screenOptions={{
                        headerShown: false
                    }}>
                    <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                    <Stack.Screen name="Loader" component={Loader} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
                    <Stack.Screen name="OtpInputComponent" component={OtpInputComponent} options={{ headerShown: false }} />
                    <Stack.Screen name="CoordinatorWebview" component={CoordinatorWebview} options={{ headerShown: false }} />
                    <Stack.Screen name="SearchCity" component={SearchCity} options={{ headerShown: false }} />
                    <Stack.Screen name="SearchState" component={SearchState} options={{ headerShown: false }} />
                    <Stack.Screen name="SearchCountry" component={SearchCountry} options={{ headerShown: false }} />
                    <Stack.Screen name="AllLogos" component={AllLogos} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

}

export default Router