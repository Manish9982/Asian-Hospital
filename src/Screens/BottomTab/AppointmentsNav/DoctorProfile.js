import { SafeAreaView, View, Image, RefreshControl, TouchableOpacity, FlatList, Modal, ScrollView, Alert, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import Header from '../../../assets/Schemes/Header'
import { colors, fontFamily, fontSizes, GetApiData, getLocalStorageData, H, PostApiData, savelocalStorageData, strToInt, timeStampToDateFormatd_m_y, timeStampToDateFormaty_m_d, W } from '../../../assets/Schemes/Schemes'
import { Button, Divider, Text } from 'react-native-paper'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import HeaderTwo from '../../../assets/Schemes/HeaderTwo'
import Loader from '../../../assets/Loader/Loader'
import DataContext from '../../../assets/Context/DataContext'
import WebView from 'react-native-webview'
import DoctorCardWithoutPrice from '../../../assets/Schemes/DoctorCardWithoutPrice'
import { useIsFocused } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'

const DoctorProfile = ({ navigation, route }) => {

    const isFocused = useIsFocused()

    const { NremainingTime, NapiDate, NmyDoctor, NmyAppointmentDate, NmySlot, NmySlotId, NmyDoctorDesignation, NmyAppointmentType, NpatientID, NmyPrice, NmyDoctorCategory, NmyDoctorImage, NmyDoctorID, NmyDoctorEducation } = useContext(DataContext)

    //////////////////////////////////////////
    const [myPrice, setMyPrice] = NmyPrice
    const [myDoctor, setMyDoctor] = NmyDoctor
    const [myAppointmentDate, setMyAppointmentDate] = NmyAppointmentDate
    const [mySlot, setMySlot] = NmySlot
    const [mySlotId, setMySlotId] = NmySlotId
    const [myDoctorDesignation, setMyDoctorDesignation] = NmyDoctorDesignation
    const [apiDate, setApiDate] = NapiDate
    const [myAppointmentType, setMyAppointmentType] = NmyAppointmentType
    const [myDoctorCategory, setMyDoctorCategory] = NmyDoctorCategory
    const [myDoctorImage, setMyDoctorImage] = NmyDoctorImage
    const [myDoctorID, setMyDoctorID] = NmyDoctorID
    const [remainingTime, setRemainingTime] = NremainingTime
    const [myDoctorEducation, setMyDoctorEducation] = NmyDoctorEducation
    /////////////////////////////////////////
    const [tempTime, setTempTime] = useState(Date.now())
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(true)
    const [loader2, setLoader2] = useState(true)
    const [visible, setVisible] = useState(false)
    const [modalvisible2, setModalvisible2] = useState(false)



    useEffect(() => {
        effectFunctions()
    }, [])
    useEffect(() => {
        getDoctorProfileForToday(tempTime)
    }, [myAppointmentType])



    const effectFunctions = async () => {

        await savelocalStorageData('doctor_id', myDoctorID)
        await setApiDate(Date.now())
        getDoctorProfileForToday(Date.now())
        // console.log("my appointment type at effect == >", myAppointmentType)
    }
    // useEffect(() => {
    //     {
    //         isFocused
    //             &&
    //             getDoctorProfileForToday()

    //     }
    // }, [apiDate, myAppointmentType, isFocused])



    //

    const handleSlotPress = async (item) => {
        if (item.status == "1") {

            // console.log("slotObject===>", item)
            setLoader(true)
            setMySlot(item.slot)
            //console.log("hisID===>" + patientID)
            var formdata = new FormData();
            formdata.append("doctor_id", myDoctorID);
            formdata.append("appointment_date", timeStampToDateFormaty_m_d(apiDate));
            formdata.append("slot", item.slot);
            const result = await PostApiData('reserve_slot', formdata)
            if (result.status == '200') {
                setMySlotId(result?.reserveSlot?.id)
                setRemainingTime(300)
                navigation.navigate("AfterSlotBlockingConfirmation")
            } else {
                // console.log("result for reserve slot api", result)
                Alert.alert('Alert', `${result.message}`)
            }
            setLoader(false)
        }
        else {
            Alert.alert("Alert", "This slot is not available")
        }
    }



    const getDoctorProfileForToday = async (date) => {
        setLoader(true)
        console.log("Today Schedule")
        const temp = await getLocalStorageData('hospital_id')
        var formdata = new FormData();
        formdata.append("hospital_id", temp);
        formdata.append("doctor_id", myDoctorID);
        formdata.append("date", timeStampToDateFormaty_m_d(date));
        formdata.append("type", myAppointmentType)
        // console.log("Formdata Of Doctor Schedule/getDoctorProfileForToday=====>", formdata)
        const result = await PostApiData('doctor_schedule', formdata)
        if (result.status == '200') {
            setData(result)
            setMyDoctor(result?.doctor?.first_name)
            setMyDoctorCategory(result?.doctor?.category)
            setMyPrice(result?.price)
            setMyDoctorImage(`${result?.doctor?.profile_url}${result?.doctor?.image}`)
            setMyDoctorDesignation(`${result?.doctor?.designation}`)
            setMyDoctorEducation(`${result?.doctor?.education}`)
        } else {
            Alert.alert('Error', `${result.message}`)
        }
        // console.log("result Of Doctor Schedule=====>/getDoctorProfileForToday", result)
        setLoader(false)
    }
    // const getDoctorProfileByAppointmentType = async (appo_type) => {
    //     setLoader(true)
    //     setMyAppointmentType(appo_type)
    //     const temp = await getLocalStorageData('hospital_id')
    //     var formdata = new FormData();
    //     formdata.append("hospital_id", temp);
    //     formdata.append("doctor_id", myDoctorID);
    //     formdata.append("date", timeStampToDateFormaty_m_d(apiDate));
    //     formdata.append("type", appo_type);
    //     // console.log("Formdata Of Doctor Schedule=====>/getDoctorProfileByAppointmentType", formdata)
    //     const result = await PostApiData('doctor_schedule', formdata)
    //     if (result.status == '200') {
    //         setData(result)
    //         setMyPrice(result?.price)
    //         setMyDoctorCategory(result?.doctor?.category)
    //         setMyDoctor(result?.doctor?.first_name)
    //         setMyDoctorDesignation(`${result?.doctor?.designation}`)
    //         setMyDoctorImage(`${result?.doctor?.profile_url}${result?.doctor?.image}`)
    //         setMyDoctorEducation(`${result?.doctor?.education}`)
    //     }
    //     else {
    //         Alert.alert('Error', `${result.message}`)
    //     }
    //     setLoader(false)
    // }
    // const getDoctorProfileByDate = async () => {


    //     console.log("Date Schedule")
    //     setLoader(true)
    //     setMyAppointmentDate(apiDate)
    //     const temp = await getLocalStorageData('hospital_id')
    //     var formdata = new FormData();
    //     formdata.append("hospital_id", temp);
    //     formdata.append("doctor_id", myDoctorID);
    //     formdata.append("date", timeStampToDateFormaty_m_d(apiDate));
    //     formdata.append("type", myAppointmentType)
    //     // console.log("Formdata Of getDoctorProfileByDate", formdata)
    //     const result = await PostApiData('doctor_schedule', formdata)
    //     if (result.status == '200') {
    //         setData(result)
    //         setMyDoctorCategory(result?.doctor?.category)
    //         setMyPrice(result?.price)
    //         setMyDoctor(result?.doctor?.first_name)
    //         setMyDoctorDesignation(`${result?.doctor?.designation}`)
    //         setMyDoctorEducation(`${result?.doctor?.education}`)
    //         setMyDoctorImage(`${result?.doctor?.profile_url}${result?.doctor?.image}`)
    //     } else {
    //         Alert.alert('Error', `${result.message}`)
    //     }
    //     // console.log("result Of getDoctorProfileByDate", result)
    //     // console.log("apiDate at getDoctorProfileByDate", timeStampToDateFormaty_m_d(apiDate))
    //     setLoader(false)
    // }
    // const getDoctorProfileByPickerDate = async (date) => {
    //     setLoader(true)
    //     // console.log("my appointment type at getDoctorProfileByPickerDate  == >", myAppointmentType)

    //     const temp = await getLocalStorageData('hospital_id')
    //     var formdata = new FormData();
    //     formdata.append("hospital_id", temp);
    //     formdata.append("doctor_id", myDoctorID);
    //     formdata.append("date", timeStampToDateFormaty_m_d(date));
    //     formdata.append("type", myAppointmentType)
    //     // console.log("Formdata Of /getDoctorProfileByPickerDate", formdata)
    //     const result = await PostApiData('doctor_schedule', formdata)
    //     if (result.status == '200') {
    //         setData(result)
    //         setMyDoctorCategory(result?.doctor?.category)
    //         setMyPrice(result?.price)
    //         setMyDoctor(result?.doctor?.first_name)
    //         setMyDoctorDesignation(`${result?.doctor?.designation}`)
    //         setMyDoctorImage(`${result?.doctor?.profile_url}${result?.doctor?.image}`)
    //         setMyDoctorEducation(`${result?.doctor?.education}`)
    //         setApiDate(date)
    //         setMyAppointmentDate(date)
    //     } else {
    //         Alert.alert('Error', `${result.message}`)
    //     }
    //     // console.log("apiDate at getDoctorProfileByPickerDate", timeStampToDateFormaty_m_d(date))
    //     setLoader(false)
    // }



    const renderItem = ({ item, index }) => {
        return (
            <View key={index}>
                <TouchableOpacity


                    onPress={() => {
                        handleSlotPress(item)
                    }}
                    style={{
                        height: H * 0.042,
                        width: W * 0.2,
                        borderWidth: 0.3,
                        marginHorizontal: H * 0.006,
                        marginVertical: H * 0.015,
                        opacity: item.status == '1' ? 1 : 0.7,
                        borderRadius: 2,
                        borderColor: item.status == '1' ? colors.toobarcolor : "red",
                        justifyContent: 'center',
                    }}>


                    <Text style={{
                        textAlign: "center",
                        alignSelf: 'center',
                        opacity: item.status == '1' ? 1 : 0.7,
                        color: item.status == '1' ? colors.toobarcolor : "red",
                        fontSize: fontSizes.EXTRASM,
                        fontFamily: fontFamily.medium,
                    }}>{item.slot}</Text>

                </TouchableOpacity>

            </View>
        )

    }

    return (
        loader ?
            <>
                <Loader />
            </>
            :


            <View style={styles.primaryContainer}>
                <HeaderTwo
                    Title="Book Slot" />


                <Modal
                    visible={modalvisible2}
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
                            width: W * 0.9,
                            backgroundColor: "white",
                            borderRadius: 8,
                        }}>

                            <Text style={{
                                alignSelf: 'center',
                                marginBottom: 10,
                                color: colors.black,
                                fontFamily: fontFamily.regular,
                                fontSize: fontSizes.default
                            }}>Information</Text>

                            <View style={{
                                height: 300,
                                width: 300,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>

                                <WebView
                                    style={{
                                        height: H * 0.2,
                                        width: W * 0.7,
                                    }}
                                    originWhitelist={['*']}
                                    source={{
                                        html: `
                                    <!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
                                  ${data?.doctor?.description}
                                  </body>
</html>
                                  ` }}
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: H * 0.03,
                                }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        setModalvisible2(false)
                                    }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: 'red',
                                        fontSize: fontSizes.XL,
                                        fontFamily: fontFamily.medium,
                                    }}>Close</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                </Modal>
                <View style={{
                    backgroundColor: 'white',
                    alignItems: "center",
                    paddingBottom: H * 0.1
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


                    <TouchableOpacity onPress={() => {
                        setModalvisible2(true)
                    }}>

                        <View style={{
                            height: H * 0.15,
                            width: W * 0.95,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "gray",
                            overflow: 'hidden',
                            marginTop: H * 0.01,

                        }}>
                            {data?.doctor?.see_more == '1' &&
                                <Text style={{
                                    position: "absolute",
                                    zIndex: 10,
                                    color: "red",
                                    fontFamily: fontFamily.semibold,
                                    fontSize: fontSizes.SM,
                                    top: H * 0.12,
                                    right: W * 0.05
                                }}>...See More</Text>}
                            <Text
                                style={{
                                    textDecorationLine: "underline"
                                }}
                            >Information</Text>
                            <WebView
                                style={{
                                    height: 150,
                                    width: W * 0.93,
                                }}
                                originWhitelist={['*']}
                                source={{
                                    html: `${data?.doctor?.short_description}`
                                }}
                            />

                        </View>
                    </TouchableOpacity>





                    <View style={{
                        marginVertical: H * 0.013,
                    }}>
                        <Text style={{
                            textAlign: "left",
                            color: colors.black,
                            fontSize: fontSizes.default,
                            fontFamily: fontFamily.medium,
                            marginHorizontal: H * 0.015,
                        }}>
                            Schedule for:
                        </Text>


                        <View
                            style={{
                                flexDirection: "row",
                                marginHorizontal: H * 0.035,
                            }}>
                        </View>


                        <View
                            style={{
                                flexDirection: "row",
                                marginHorizontal: H * 0.035,
                                marginTop: 3
                            }}>


                            <TouchableOpacity
                                onPress={() => {
                                    setMyAppointmentType("1")
                                }}  // 1== online
                                style={{
                                    backgroundColor: myAppointmentType == "1" ? colors.toobarcolor : "white",
                                    borderColor: "gray",
                                    alignItems: 'center',
                                    width: W * 0.42,
                                    padding: 10,
                                    borderRadius: 5,
                                    borderColor: colors.darkgray,
                                    borderWidth: 1
                                }}>
                                <Text style={{
                                    color: myAppointmentType == "1" ? "white" : "black",
                                    fontFamily: fontFamily.medium
                                }}>Online</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => {
                                    setMyAppointmentType("0")
                                }}   //0== offline

                                style={{
                                    backgroundColor: myAppointmentType == "0" ? colors.toobarcolor : "white", borderColor: 'gray',
                                    borderWidth: 1,
                                    borderColor: "gray",
                                    alignItems: "center",
                                    width: W * 0.42,
                                    padding: 10,
                                    borderRadius: 5,
                                    marginStart: 10
                                }}>
                                <Text style={{
                                    color: myAppointmentType == "0" ? "white" : "black",
                                    fontFamily: fontFamily.medium
                                }}>In Person</Text>
                            </TouchableOpacity>
                        </View>



                        <TouchableOpacity
                            onPress={() => setVisible(true)}>
                            <View style={{
                                flexDirection: "row",
                                backgroundColor: "white",
                                paddingVertical: H * 0.005,
                                alignItems: "center",
                                marginHorizontal: H * 0.035,
                                justifyContent: "space-between",
                                marginVertical: H * 0.00,
                                borderWidth: 1,
                                borderColor: "gray",
                                paddingLeft: W * 0.05,
                                marginTop: H * 0.01,
                                borderRadius: 8
                            }}>

                                <View>

                                    <Text style={{
                                        color: colors.black,
                                        fontSize: fontSizes.default,
                                        fontFamily: fontFamily.medium
                                    }}>Date</Text>



                                    {Platform.OS == "android" && <Text style={{
                                        textAlign: "center",
                                        color: "gray",
                                        fontSize: fontSizes.SM,
                                        fontFamily: fontFamily.medium
                                    }}>{timeStampToDateFormatd_m_y(apiDate)}</Text>}


                                    {
                                        Platform.OS == "ios" ?
                                            <>
                                                <RNDateTimePicker
                                                    themeVariant="light"
                                                    minimumDate={new Date()}
                                                    style={{
                                                        left: -W * 0.04,
                                                    }}
                                                    onChange={async (info) => {
                                                        setVisible(false)
                                                        getDoctorProfileForToday(info.nativeEvent.timestamp)
                                                        setTempTime(info.nativeEvent.timestamp)
                                                        setApiDate(info.nativeEvent.timestamp)
                                                    }}
                                                    value={new Date(strToInt(tempTime))}
                                                />
                                            </>
                                            :
                                            <>
                                                {
                                                    visible
                                                        ?
                                                        <RNDateTimePicker
                                                            minimumDate={Date.now()}
                                                            onChange={async (info) => {
                                                                setVisible(false)
                                                                getDoctorProfileForToday(info.nativeEvent.timestamp)
                                                                setTempTime(info.nativeEvent.timestamp)
                                                                setApiDate(info.nativeEvent.timestamp)
                                                            }}
                                                            value={new Date(strToInt(tempTime))}
                                                        />
                                                        :
                                                        null
                                                }
                                            </>

                                    }


                                </View>

                                {
                                    Platform.OS == "android"
                                    && <Image source={require('../../../assets/Images/arrow.png')}
                                        style={{
                                            height: H * 0.023,
                                            width: H * 0.023,
                                            position: "absolute",
                                            left: W * 0.8,
                                            alignSelf: "center"
                                        }} />
                                }


                            </View>

                        </TouchableOpacity>

                    </View>
                    <View style={styles.horizontalContainer}>
                        <Text style={{
                            color: 'black',
                            fontSize: fontSizes.default,
                            fontFamily: fontFamily.medium,
                            //marginTop: H * 0,
                            //marginHorizontal: W * 0.025,
                            //alignSelf: "flex-start"
                            // opacity: item.status == '1' ? 1 : 0.4,
                        }}>Slots:</Text>
                        {/* <TouchableOpacity onPress={() => getDoctorProfileByDate()}>
                            <AntDesign name="reload1" size={20} />
                        </TouchableOpacity> */}
                    </View>
                    <View style={{
                        borderWidth: 1,
                        borderColor: "silver",
                        width: W * 0.95,
                        height: H * 0.22,
                        borderRadius: 2
                    }}>

                        <View style={{
                            justifyContent: "center",
                            alignItems: "center"

                        }}>
                            {
                                data?.slots.length == 0
                                    ?
                                    <>
                                        {data?.next_date == "--" ?
                                            <>
                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        marginTop: H * 0.1
                                                    }}
                                                >{"No Slots Available For This Date.."}</Text>
                                            </>
                                            :
                                            <>
                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        marginTop: H * 0.1
                                                    }}
                                                >{"No Slots Available For This Date..\nNext Available Slot On: "}{data?.next_date}</Text>
                                            </>
                                        }

                                    </>
                                    :
                                    <FlatList
                                        persistentScrollbar
                                        showsVerticalScrollIndicator
                                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                                        numColumns={4}
                                        data={data?.slots}
                                        renderItem={renderItem}
                                        keyExtractor={(item, index) => `_key${index}`}
                                    />
                            }

                        </View>
                    </View>

                </View >
            </View >
    )
}

const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1
    },
    horizontalContainer:
    {
        flexDirection: 'row',
        width: W,
        justifyContent: 'space-between',
        paddingHorizontal: W * 0.03,
        paddingVertical: H * 0.001
    }

})

export default DoctorProfile