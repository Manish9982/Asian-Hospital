import { View, TouchableOpacity, FlatList, Modal, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { colors, convert24hTo12hFormat, fontFamily, fontSizes, GetApiData, getLocalStorageData, H, PostApiData, timeStampToDateFormatd_m_y, timeStampToDateFormaty_m_d, W } from '../../assets/Schemes/Schemes'
import { Divider, Text } from 'react-native-paper'
import DataContext from '../../assets/Context/DataContext'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import Loader from '../../assets/Loader/Loader'
import DoctorCardWithoutPrice from '../../assets/Schemes/DoctorCardWithoutPrice'
import { useIsFocused } from '@react-navigation/native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'


const AfterSlotBlockingConfirmation = ({ navigation, route }) => {
    const isFocused = useIsFocused()
    useEffect(() => {
        {
            isFocused &&
                effectFunctions()
        }
    }, [isFocused])

    useEffect(() => {
        if (route?.params?.newAdded) {
            setGender('Relative')
        }
    }, [])


    // let intervalId
    // useEffect(() => {
    //console.log("isFocused at time effect", isFocused)
    //     intervalId = setInterval(() => {
    //console.log("interval triggered")
    //         setRemainingTime(prev => prev - 1)
    //     }, 1000);

    //     if (!isFocused) {
    //         clearInterval(intervalId)
    //     }


    //     return () => {
    //         clearInterval(intervalId)
    //     }
    // }, [isFocused])




    const { NmyEmail, NmyAppointmentId, NpatientName, NremainingTime, NapiDate, NmyDoctor, NmyAppointmentDate, NmySlot, NmySlotId, NmyDoctorDesignation, NmyAppointmentType, NpatientID, NmySelf, Nuhid, NmyPrice, NmyDoctorCategory, NmyDoctorImage, NmyDoctorEducation } = useContext(DataContext)

    //////////////////////////////////////////
    const [myDoctor, setMyDoctor] = NmyDoctor
    const [myAppointmentDate, setMyAppointmentDate] = NmyAppointmentDate
    const [mySlot, setMySlot] = NmySlot
    const [mySlotId, setMySlotId] = NmySlotId
    const [myDoctorDesignation, setMyDoctorDesignation] = NmyDoctorDesignation
    const [myDoctorEducation, setMyDoctorEducation] = NmyDoctorEducation
    const [apiDate, setApiDate] = NapiDate
    const [myAppointmentType, setMyAppointmentType] = NmyAppointmentType
    const [mySelf, setMySelf] = NmySelf
    const [myPrice, setMyPrice] = NmyPrice
    const [myEmail, setMyEmail] = NmyEmail
    const [myDoctorCategory, setMyDoctorCategory] = NmyDoctorCategory
    const [myDoctorImage, setMyDoctorImage] = NmyDoctorImage
    const [remainingTime, setRemainingTime] = NremainingTime
    const [patientID, setPatientID] = NpatientID
    const [patientName, setPatientName] = NpatientName
    const [uhid, setUhid] = Nuhid
    const [myAppointmentId, setMyAppointmentId] = NmyAppointmentId
    /////////////////////////////////////////
    const [timerUpdate, setTimerUpdate] = useState(300)
    const [data2, setData2] = useState([])
    const [loader, setLoader] = useState(true)
    const [gender, setGender] = useState("Self")
    const [patientListModal, setPatientListModal] = useState(false)
    const [textVisible, setTextVisible] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [slotBlockingScreenModal, setSlotBlockingScreenModal] = useState(false)
    const [wasPreviouslyDoctor, setWasPreviouslyDoctor] = useState("false")
    const [corporatePrice, setCorporatePrice] = useState("")
    const [discountGiven, setDiscountGiven] = useState(true)
    const [oldPrice, setOldPrice] = useState("")
    const [companyName, setCompanyName] = useState("")
    //const [paymentLink, setPaymentLink] = useState(second)

    const renderItem = ({ item, index }) => {
        return (

            <View>
                <TouchableOpacity

                    onPress={() => {
                        setPatientListModal(false)
                        setPatientID(item.his_id)
                        setPatientName(item.full_name)
                    }}

                    style={{
                        marginLeft: 15,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>


                    <View style={{ flexDirection: 'column', padding: 5 }}>
                        <Text style={{
                            fontSize: fontSizes.default,
                            fontFamily: fontFamily.medium,
                            color: 'black',

                        }}>
                            {item.full_name}
                        </Text>
                        <Text style={{
                            fontSize: fontSizes.SM, color: 'gray',
                            fontFamily: fontFamily.regular,
                            marginVertical: H * 0.002
                        }}>
                            {item.his_id}
                        </Text>
                    </View>
                </TouchableOpacity>

                <Divider
                    style={{ width: W, borderColor: 'black', borderWidth: 0.05 }} />
            </View>
        )
    }


    const effectFunctions = async () => {
        const temp = await getLocalStorageData('wasPreviouslyDoctor')
        setWasPreviouslyDoctor(temp)
        getPatients()
        // console.log("my appointment type at effect == >", myAppointmentType)
    }

    const corporatePriceApi = async () => {
        setLoader(true)
        const hospital_id = await getLocalStorageData('hospital_id')
        const doctor_id = await getLocalStorageData('doctor_id')
        var formdata = new FormData()
        formdata.append("hospital_id", hospital_id)
        formdata.append("doctor_id", doctor_id)
        formdata.append("appointment_type", myAppointmentType)
        gender == "Self" ? formdata.append("his_id", uhid) : formdata.append("his_id", patientID);
        const result = await PostApiData('calculate_coprice', formdata)
        if (result?.status == '200') {
            setMyPrice(result?.amount)
            setSlotBlockingScreenModal(true)
            setCompanyName(result?.compname)
            setOldPrice(result?.old_amount)
            //setDiscountGiven(result?.amount)
            //setOldPrice(result?.setOldPrice)
        }
        else {
            Alert.alert('Error', result?.message)
        }
        // console.log(result)
        setLoader(false)
    }

    const getPatients = async () => {

        const result = await GetApiData('get_patients')
        if (result?.status == '200') {
            setData2(result)
        } else {
            //Alert.alert('Error', `${result.message}`)
        }
        setLoader(false)
        //console.log("get aptients api", result)
    }

    const cancelSlotAndNavigate = async () => {
        setLoader(true)
        var formdata = new FormData();
        formdata.append("slot_id", mySlotId);
        const result = await PostApiData('delete_slot', formdata)
        if (result?.status == '200') {
            // console.log("Slot Freed!")
            await setSlotBlockingScreenModal(false)
            navigation.goBack()
        }
        else {
            Alert.alert('Warning!', `${result?.message}`)
        }
        setLoader(false)
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
        gender == "Self" ? formdata.append("his_id", uhid) : formdata.append("his_id", patientID);
        formdata.append("amount", myPrice);
        // console.log("formdata for appointment api", formdata)
        const result = await PostApiData('appointment', formdata)
        // console.log("result of appointment api", result)
        if (result?.status == '200') {
            await setMyAppointmentId(result?.appoint?.id)
            //await setMyPrice(result?.appoint?.amount)
            await setMyEmail(result?.appoint?.email)
            // await setPaymentLink(result?.payment_link)
            await setSlotBlockingScreenModal(false)
            //  setMobileNo(result?.appoint?.phone)
            navigation.navigate("PaymentGateway", { "gender": gender })
        }
        else {
            Alert.alert("Alert", `${result?.message}`)
        }
        setLoader(false)
    }



    return (
        <View style={{
        }}>
            <HeaderTwo Title="Appointment Details" />
            <Modal
                visible={loader}
                transparent={true}
            >
                <Loader />
            </Modal >
            <Modal
                visible={patientListModal}
                transparent={true}
            >
                <View style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                    height: H,
                    width: W,
                    justifyContent: "center",
                    alignItems: "center",

                }}>


                    <View style={{
                        height: H * 0.7,
                        paddingVertical: H * 0.02,
                        width: W * 0.9,
                        backgroundColor: "white",
                        borderRadius: 8,
                    }}>

                        <Text style={{
                            alignSelf: 'center',
                            marginBottom: 10,
                            fontFamily: fontFamily.medium,
                            fontSize: fontSizes.default,
                            color: 'black'
                        }}>Choose Patient</Text>


                        <Divider
                            style={{ width: W, borderColor: 'black', borderWidth: 0.02 }} />
                        {data2?.patients?.length == 0 && <Text style={{
                            alignSelf: "center",
                            marginTop: H * 0.2
                        }}>No Relatives Added</Text>}
                        <FlatList
                            data={data2?.patients}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => `${index}`}
                        />


                        <TouchableOpacity onPress={() => {
                            setPatientListModal(false)

                        }}>
                            <Text style={{
                                marginTop: H * 0.05,
                                marginRight: W * 0.05,
                                alignSelf: "flex-end"
                            }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
            <Modal
                visible={slotBlockingScreenModal}
                transparent={true}>
                <View style={{
                    height: H,
                    width: W,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    // backgroundColor: "red",
                    justifyContent: "center"
                }}>
                    <View
                        style={{
                            //paddingBottom: H * 0.2
                            backgroundColor: "white",
                            width: W * 0.97,
                            paddingVertical: H * 0.03,
                            borderRadius: 8,
                            alignSelf: "center"
                            //height: H * 0.3
                        }}>

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

                            {gender == "Self" ?
                                <Text style={{
                                    maxWidth: W * 0.46,
                                    fontFamily: fontFamily.semibold,
                                    marginLeft: W * 0.05
                                }}>{mySelf}</Text>
                                :
                                <Text style={{
                                    width: W * 0.46,
                                    fontFamily: fontFamily.semibold,
                                    marginLeft: W * 0.05,
                                }}>{patientName}</Text>
                            }
                            <Text style={{
                                fontFamily: fontFamily.semibold,
                                marginLeft: W * 0.05
                            }}>{timeStampToDateFormatd_m_y(apiDate)}, {convert24hTo12hFormat(mySlot)}</Text>
                            <Text
                                style={{
                                    fontFamily: fontFamily.semibold,
                                    marginTop: H * 0.015,
                                    marginStart: W * 0.05,
                                    alignSelf: 'flex-start',
                                    fontWeight: "600"
                                }}>Price: ₹{myPrice}
                                {(companyName !== "") && <Text style={{
                                    fontFamily: fontFamily.semibold,
                                    marginTop: H * 0.015,
                                    marginStart: W * 0.05,
                                    alignSelf: 'flex-start',
                                    color: "black",
                                    fontSize: fontSizes.SM,
                                    fontWeight: "600"
                                }}>  ({companyName})</Text>
                                }

                            </Text>
                            <Text style={{
                                fontFamily: fontFamily.semibold,
                                right: W * 0.07,
                                top: H * 0.01,
                                position: "absolute",
                                color: myAppointmentType == "0" ? "blue" : "green"
                            }}>({myAppointmentType == "0" ? "In Person" : "Online"})</Text>
                        </View>
                        <TouchableOpacity
                            disabled={isDisabled}
                            onPress={() => { bookAppointmentAndContinueToPaymentGateway() }}
                            style={{
                                height: H * 0.06,
                                width: W * 0.85,
                                alignSelf: "center",
                                backgroundColor: isDisabled ? "gray" : "green",
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
                                // cancelSlotAndNavigate()
                                setSlotBlockingScreenModal(false)
                            }}
                            style={{
                                height: H * 0.06,
                                width: W * 0.85,
                                alignSelf: "center",
                                backgroundColor: colors.maroon,
                                borderRadius: 8,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <Text style={{
                                color: "white"
                            }}>Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <ScrollView contentContainerStyle={{
                backgroundColor: "white",
                paddingBottom: H * 0.1
            }}>

                <Text
                    style={{
                        fontFamily: fontFamily.medium,
                        alignSelf: 'flex-start',
                        color: colors.black,
                        fontSize: fontSizes.XL,
                        paddingLeft: W * 0.04,
                        paddingTop: W * 0.02,
                        //paddingBottom: W * 0.02,
                        width: W
                    }}>Doctor Details:</Text>

                <DoctorCardWithoutPrice
                    profile_url={myDoctorImage}
                    image={""}
                    first_name={myDoctor}
                    category={myDoctorCategory}
                    designation={myDoctorDesignation}
                    education={myDoctorEducation}
                />

                <Text
                    style={{
                        fontFamily: fontFamily.medium,
                        alignSelf: 'flex-start',
                        color: colors.black,
                        fontSize: fontSizes.XL,
                        paddingLeft: W * 0.04,
                        paddingTop: W * 0.02,
                        paddingBottom: W * 0.02,
                        width: W
                    }}>Billing Details:</Text>

                <View style={{
                    borderColor: colors.toobarcolor,
                    borderWidth: 1,
                    width: "95%",
                    alignSelf: "center",
                    borderRadius: 8
                }}>


                    <Text
                        style={{
                            fontFamily: fontFamily.semibold,
                            marginTop: H * 0.015,
                            marginStart: W * 0.05,
                            alignSelf: 'flex-start',
                            color: "gray",
                            fontSize: fontSizes.SM,
                            fontWeight: "600"
                        }}>Price: ₹{oldPrice == "" ? myPrice : oldPrice}

                    </Text>

                    <Text
                        style={{
                            fontFamily: fontFamily.medium,
                            marginTop: H * 0.015,
                            marginStart: W * 0.05,
                            alignSelf: 'flex-start',
                            color: "gray",
                            fontSize: fontSizes.SM,
                        }}>Date: {timeStampToDateFormatd_m_y(apiDate)}</Text>

                    <View style={{
                        flexDirection: "row"
                    }}>
                        <Text
                            style={{
                                fontFamily: fontFamily.medium,
                                marginTop: H * 0.015,
                                marginStart: W * 0.05,
                                alignSelf: 'flex-start',
                                color: 'gray',
                                fontSize: fontSizes.SM,
                                marginBottom: H * 0.015,
                            }}>Slot: {convert24hTo12hFormat(mySlot)}</Text>
                        <Text style={{
                            fontFamily: fontFamily.semibold,
                            marginTop: H * 0.015,
                            marginStart: W * 0.05,
                            alignSelf: 'flex-start',
                            color: myAppointmentType == '0' ? "blue" : "green",
                            fontSize: fontSizes.SM,
                            marginBottom: H * 0.015,
                        }}>
                            ({myAppointmentType == '0' ? "In Person" : "Online"})
                        </Text>
                    </View>

                    <View style={{
                        position: "absolute",
                        left: W * 0.7,
                        top: H * 0.024
                    }}>
                        <CountdownCircleTimer
                            onComplete={() => {
                                setIsDisabled(true)
                                // Alert.alert("Time Out!", "Please Book your slot again.")
                                //navigation.navigate("DoctorProfile")
                            }}
                            strokeWidth={6}
                            size={W * 0.17}
                            isPlaying
                            duration={300}
                            colors={colors.toobarcolor}
                            trailColor="orange"
                        //colors={['green', 'yellow', 'orange', 'red']}
                        //colorsTime={[200, 150, , 50]}
                        >
                            {({ remainingTime }) => {
                                const minutes = String(Math.floor(remainingTime / 60)).padStart(2, '0');
                                const seconds = String(remainingTime % 60).padStart(2, '0');
                                return <Text style={{
                                    //position: "absolute",
                                    //left: W * 0.15,
                                    color: "gray",
                                    textAlign: "center",
                                    fontSize: fontSizes.SM
                                }}>{`${minutes}:${seconds}`}</Text>
                            }
                            }
                        </CountdownCircleTimer>
                    </View>
                </View>

                <Text
                    style={{
                        fontFamily: fontFamily.medium,
                        alignSelf: 'flex-start',
                        color: colors.black,
                        fontSize: fontSizes.XL,
                        paddingLeft: W * 0.04,
                        paddingTop: W * 0.02,
                        paddingBottom: W * 0.02,
                        width: W
                    }}>Confirm Booking For:</Text>
                {/* {!(wasPreviouslyDoctor == "true") && */}
                <View
                    style={{
                        flexDirection: "row",
                        marginLeft: W * 0.018,
                        marginRight: W * 0.018,
                        justifyContent: 'space-evenly',
                        height: H * 0.05
                    }}>

                    {
                        // !(wasPreviouslyDoctor == "true") &&
                        <TouchableOpacity
                            onPress={() => {
                                setGender("Self")
                            }}

                            style={{
                                backgroundColor: gender == "Self" ? colors.toobarcolor : "white",
                                justifyContent: "center",
                                borderWidth: 1,
                                borderColor: "gray",
                                alignItems: "center",
                                width: W * 0.29,
                                borderRadius: 5,
                            }}>
                            <Text style={{
                                fontFamily: fontFamily.medium,
                                color: gender == "Self" ? "white" : "black"
                            }}>Self</Text>
                        </TouchableOpacity>
                    }
                    {
                        // !(wasPreviouslyDoctor == "true") &&
                        <TouchableOpacity

                            onPress={() => {
                                setPatientListModal(true)
                                setGender("Relative")
                            }}

                            style={{
                                backgroundColor: gender == "Relative" ? colors.toobarcolor : "white",
                                justifyContent: "center",
                                borderWidth: 1,
                                borderColor: "gray",
                                alignItems: "center",
                                width: W * 0.29,
                                borderRadius: 5,
                                marginLeft: 5,
                                marginRight: 5
                            }}>
                            <Text style={{
                                fontFamily: fontFamily.medium,
                                color: gender == "Relative" ? "white" : "black"
                            }}

                            >Relative</Text>
                        </TouchableOpacity>
                    }
                    {
                        // !(wasPreviouslyDoctor == "true") &&
                        <TouchableOpacity

                            onPress={() => {

                                navigation.navigate("AddPatientDuringAppointments")
                            }}

                            style={{
                                backgroundColor: "white",
                                justifyContent: "center",
                                borderWidth: 1,
                                borderColor: "gray",
                                alignItems: "center",
                                width: W * 0.29,
                                // padding: 10,
                                borderRadius: 5,
                            }}>
                            <View>
                                <Text
                                    style={{
                                        fontFamily: fontFamily.medium,
                                        color: "black"
                                    }}
                                >Add <AntDesign name="pluscircle" size={16} color={colors.toobarcolor} /></Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
                {/* } */}


                {gender == "Relative" ?
                    <TouchableOpacity
                        onPress={() => {

                            setPatientListModal(true)

                        }}

                    >
                        {
                            patientName == ""
                                ?
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginHorizontal: H * 0.01,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    borderRadius: 5,
                                    padding: 8,
                                    marginTop: H * 0.02,
                                    backgroundColor: colors.bgeditext,
                                }}
                                >
                                    <Text
                                        style={{
                                            // textAlign: "center",
                                            color: "black",
                                            fontSize: fontSizes.SM,
                                            fontFamily: fontFamily.regular,
                                            marginLeft: W * 0.05,
                                            marginRight: W * 0.09,

                                        }}
                                    >{patientName == "" ? "Click here to choose" : null}</Text>
                                </View>
                                :
                                <Text
                                    style={{
                                        fontFamily: fontFamily.medium,
                                        marginTop: H * 0.015,
                                        alignSelf: "center",
                                        color: colors.black,
                                        fontSize: fontSizes.XL,
                                        paddingLeft: W * 0.04,
                                        paddingTop: W * 0.02,
                                        paddingBottom: W * 0.02,
                                        borderColor: colors.toobarcolor,
                                        borderWidth: 1,
                                        width: W * 0.95,
                                        borderRadius: 8,
                                    }}>
                                    {patientName}
                                </Text>
                        }

                    </TouchableOpacity>
                    :
                    <Text
                        style={{
                            fontFamily: fontFamily.medium,
                            marginTop: H * 0.015,
                            alignSelf: "center",
                            color: colors.black,
                            fontSize: fontSizes.XL,
                            paddingLeft: W * 0.04,
                            paddingTop: W * 0.02,
                            paddingBottom: W * 0.02,
                            borderColor: colors.toobarcolor,
                            borderWidth: 1,
                            borderRadius: 8,
                            width: W * 0.95
                        }}>
                        {mySelf}
                    </Text>

                }

                <View
                    style={{
                        width: W, justifyContent: 'center',
                        marginTop: H * 0.02
                    }}>


                    <TouchableOpacity
                        disabled={isDisabled}
                        onPress={() => {
                            if ((gender == "Relative") && (patientName == "")) {
                                Alert.alert("Warning", "Kindly choose a patient first before proceeding")
                            }
                            else {
                                corporatePriceApi()
                                // navigation.navigate("SlotBlockingScreen", { "gender": gender })

                            }

                        }}
                        style={{

                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                            width: W * 0.9,
                            fontSize: fontSizes.default,
                            backgroundColor: isDisabled ? "gray" : "green",
                            color: 'white',
                            textAlign: 'center',
                            borderRadius: 8,
                            elevation: 2,
                            padding: 10,
                            marginBottom: H * 0.023,

                        }}><Text
                            style={{
                                color: isDisabled ? "white" : "white"
                            }}
                        >Pay</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: W * 0.9,
                            fontSize: fontSizes.default,
                            backgroundColor: colors.maroon,
                            color: 'white',
                            textAlign: 'center',
                            borderRadius: 8,
                            elevation: 2,
                            padding: 10,
                            alignSelf: "center"
                        }}
                        onPress={() => {
                            cancelSlotAndNavigate()
                            // console.log("cancelSlotAndNavigate()")

                        }}>
                        <Text style={{
                            color: "white"
                        }}>Cancel</Text>
                    </TouchableOpacity>
                    <View style={{
                        borderWidth: 1,
                        borderColor: colors.toobarcolor,
                        borderRadius: 8,
                        width: W * 0.92,
                        alignSelf: "center",
                        marginVertical: H * 0.03
                    }}>
                        <Text style={{
                            padding: H * 0.03,
                            fontSize: fontSizes.SM,
                        }}>{"*Please schedule appointment with the name of patient only.\n*If patient is already registered, do not register again, because New UHID will not contain the Old UHID History data for Doctor’s treatment.\n*Cancellation of Appointment can only be done before two hours of Appointment time, beyond that no refund would be entertained.\n*All Video consultation are Non Refundable."}</Text>
                    </View>
                </View>



            </ScrollView>

        </View >
    )
}

export default AfterSlotBlockingConfirmation