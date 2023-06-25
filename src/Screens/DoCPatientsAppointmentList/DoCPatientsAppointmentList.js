import {
    View, FlatList, Dimensions, Image, TouchableOpacity, Modal, Alert, Platform
} from 'react-native'

import React, { useContext, useEffect, useState } from 'react'
import { Searchbar, ActivityIndicator, Divider, Text, Badge, Chip } from 'react-native-paper';
import { colors, fontFamily, fontSizes, GetApiData, getLocalStorageData, PostApiData, savelocalStorageData, timeStampToDateFormatd_m_y, timeStampToDateFormatd_m_y2, } from '../../assets/Schemes/Schemes'
import HeaderTwo from '../../assets/Schemes/HeaderTwo';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../assets/Loader/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SegmentedButtons } from 'react-native-paper';
import { styles } from '../../components/Styles';
import DataContext from '../../assets/Context/DataContext';


const DoCPatientsAppointmentList = ({ navigation }) => {

    const { NshouldDoctorSeeAppointments } = useContext(DataContext)

    const [shouldDoctorSeeAppointments, setShouldDoctorSeeAppointments] = NshouldDoctorSeeAppointments

    const isFocused = useIsFocused()
    const [hospitals, setHospitals] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [hospitalID, setHospitalID] = useState("")
    const [hospitalName, setHospitalName] = useState("")
    const [searchQuery, setSearchQuery] = React.useState('');
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState(null)
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState([]);
    const [timeStamp, setTimeStamp] = useState(Date.now())


    useEffect(() => {
        if (!shouldDoctorSeeAppointments && isFocused) {
            navigation.goBack()
            Alert.alert('Info', 'This feature is not available to you')
        }
    }, [isFocused])




    const onChangeSearch = query => setSearchQuery(query);

    const H = Dimensions.get("window").height
    const W = Dimensions.get("window").width

    const date2 = new Date()
    const currentdate = timeStampToDateFormatd_m_y2(date2)

    useEffect(() => { toastHospitalID() }, [])


    const openHospitallist = async () => {

        const result = await GetApiData('hospitals')
        // console.log("Hospitals===", result)
        setHospitals(result)
        setModalVisible(true)

    }

    const startVideoCallWithPatient = async (id) => {
        setLoader(true)

        var formdata = new FormData();
        formdata.append("appo_id", id);
        // console.log("formdata of startCall ", formdata)
        const result = await PostApiData('startCall', formdata)
        if (result?.status == "200") {
            // console.log("result of startCall ", result)
            await savelocalStorageData('accessToken', `${result?.call_video?.doctor_token}`)
            await savelocalStorageData('ID', `${id}`)
            await navigation.navigate("VideoCalling")
        }
        setLoader(false)
    }


    const renderItemHospitals = ({ item, index }) => {
        return (

            <View>
                <TouchableOpacity

                    onPress={() => {
                        //setModalVisible(false)
                        setValuetoText(item.name, JSON.stringify(item.id))
                    }}

                    style={{
                        marginLeft: 15,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>


                    <View

                        style={{ flexDirection: 'column', padding: 10 }}>
                        <Text style={{
                            fontSize: fontSizes.default,
                            fontFamily: fontFamily.medium,
                            color: 'black'
                        }}>
                            {item.name}
                        </Text>

                    </View>
                </TouchableOpacity>

                <Divider
                    style={{
                        width: W,
                        borderColor: 'black',
                        borderWidth: 0.05
                    }} />
            </View>
        )
    }

    const toastHospitalID = async () => {

        const hID = await getLocalStorageData('HID')
        const hName = await getLocalStorageData('HNAME')

        setHospitalName(hName)

        if (hID) {
            getAppointmentList(currentdate, hID)

        }
    }

    const getAppointmentList = async (date, ID) => {
        setLoader(true)
        const token = await getLocalStorageData('token')
        var formdata = new FormData();

        formdata.append("date", date);
        formdata.append("hospital_id", JSON.parse(ID));

        const result = await PostApiData('patient_appo', formdata)


        // console.log("result==", result)

        if (result?.status == '200') {
            setData(result)
        } else {
            console.log(result)
            setData(null)
            Alert.alert('Info', result?.message)
            // navigation.goBack()
        }
        setLoader(false)
    }


    const setValuetoText = (hospitalName, ID) => {
        setModalVisible(false)
        savelocalStorageData("HID", ID)
        setHospitalID(ID)
        getAppointmentList(timeStampToDateFormatd_m_y(timeStamp), ID)
        setHospitalName(hospitalName)
        //ToastAndroid.show(hospitalID, ToastAndroid.SHORT)
    }

    const renderItem = ({ item, index }) => {
         console.log("Item.AppoValue== ==", item.appo_status)
        if (((item.appointment_type == '2') && (value?.includes("Walk-In")) && (item?.appo_status == 0)) || ((item.appointment_type == '1') && (value?.includes("Online")) && (item?.appo_status == 0)) || ((item.appointment_type == '0') && (value?.includes("In Person")) && (item?.appo_status == 0)) || ((item?.appo_status == "1") && value?.includes("Completed")) || (value?.length == 0)) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        savelocalStorageData("ID", `${item?.id}`)
                        navigation.navigate("DoCPatientDetails", { "appintmentID": `${JSON.stringify(item?.id)}`, "appo_type": `${item?.appointment_type}`, "bill_id": `${item.bill_id}`, "video": `${item?.video}`, "appo_status": `${item.appo_status}` })
                    }} >

                    <View
                        style={{
                            backgroundColor: item?.color,
                            marginVertical: H * 0.015,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#8B82DA',
                            width: W * 0.95
                        }}>

                        <View
                            style={{
                                flexDirection: "row",
                                marginLeft: W * 0.05
                            }}>

                            <View style={{
                                //marginLeft: W * 0.07,
                                marginTop: H * 0.01
                            }}>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text
                                        style={{
                                            color: item?.text_color,
                                            fontFamily: fontFamily.medium,
                                            fontSize: fontSizes.XL,
                                            width: W * 0.86,
                                        }}>{`${item.full_name}`}
                                        {/* 
                                        {item?.appo_status == "1" ? <Text style={{
                                            color: "white",
                                        }}>  (Done <AntDesign name="checkcircle" color="green" size={16} />)</Text> : null} */}

                                    </Text>

                                </View>

                                <Text
                                    style={{
                                        color: item?.text_color,
                                        fontFamily: fontFamily.regular,
                                        fontSize: fontSizes.SM,
                                    }}>Gender: {item?.gender}

                                    <Text
                                        style={{
                                            color: item?.text_color,
                                            fontFamily: fontFamily.regular,
                                            fontSize: fontSizes.SM,
                                        }}>       Age: {item?.age}</Text>
                                </Text>

                                <Text
                                    style={{
                                        color: item?.text_color,
                                        fontFamily: fontFamily.regular,
                                        fontSize: fontSizes.SM,
                                    }}>UHID: {item?.his_id}
                                    <Text
                                        style={{
                                            color: item?.text_color,
                                            fontFamily: fontFamily.regular,
                                            fontSize: fontSizes.SM,
                                        }}>      M: {item?.phone}</Text>
                                </Text>






                                <Text
                                    style={{
                                        color: item?.text_color,
                                        fontFamily: fontFamily.regular,
                                        fontSize: fontSizes.SM,
                                    }}>Date:{` ${item?.date} at ${item?.slot}`}
                                    <Text
                                        style={{
                                            //color: item?.appointment_type == "0" ? "blue" : "green",
                                            color: item?.text_color,
                                            fontFamily: fontFamily.medium,
                                            fontSize: fontSizes.SM,
                                        }}>            ({item?.appo_type})
                                    </Text>
                                </Text>
                                <Text
                                    style={{
                                        color: item?.text_color,
                                        fontFamily: fontFamily.regular,
                                        fontSize: fontSizes.SM,
                                    }}>Pay: {item?.p_type}</Text>
                                {
                                    item?.p_name !== "" &&
                                    <Text
                                        style={{
                                            color: item?.text_color,
                                            fontFamily: fontFamily.regular,
                                            fontSize: fontSizes.SM,
                                        }}>Inst: {item?.p_name}</Text>
                                }
                            </View>
                        </View>
                        {item.appo_type !== "Online" ?
                            <View
                                style={{
                                    opacity: item.appo_type !== "Online" ? 1 : 0,
                                    flexDirection: 'row',
                                    backgroundColor: 'lightgray',
                                    borderBottomEndRadius: 5,
                                    borderBottomLeftRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'space-evenly',
                                    marginTop: W * 0.03,
                                    padding: H * 0.006,
                                }}>

                                <Text
                                    style={{
                                        fontFamily: fontFamily.regular,
                                        fontSize: fontSizes.XXXXSM,
                                        maxWidth: W * 0.15,
                                        fontWeight: "600",
                                        color: 'black',
                                        marginLeft: W * 0.02
                                    }}>Check In: </Text>

                                <Text
                                    style={{
                                        fontWeight: "600",
                                        color: "black",
                                        fontFamily: fontFamily.regular,
                                        fontSize: fontSizes.XXXXSM,
                                        maxWidth: W * 0.15,
                                        color: 'black',
                                    }}>{item?.checkin}</Text>

                                <Text
                                    style={{
                                        fontWeight: "600",
                                        fontFamily: fontFamily.regular,
                                        fontSize: fontSizes.XXXXSM,
                                        maxWidth: W * 0.15,
                                        color: 'black',
                                        marginLeft: W * 0.05
                                    }}>Start Time: </Text>
                                <Text
                                    style={{
                                        fontWeight: "600",
                                        color: "black",
                                        fontFamily: fontFamily.regular,
                                        fontSize: fontSizes.XXXXSM,
                                        maxWidth: W * 0.15,
                                    }}>{item?.start_time}</Text>

                                <Text
                                    style={{
                                        fontWeight: "600",
                                        fontFamily: fontFamily.regular,
                                        fontSize: fontSizes.XXXXSM,
                                        maxWidth: W * 0.15,
                                        color: 'black',
                                        marginLeft: W * 0.05
                                    }}>Check Out: </Text>
                                <Text
                                    style={{
                                        fontWeight: "600",
                                        color: "black",
                                        fontFamily: fontFamily.regular,
                                        fontSize: fontSizes.XXXXSM,
                                        maxWidth: W * 0.15,
                                        marginRight: H * 0.01
                                    }}>{item?.checkout}</Text>
                            </View>
                            :
                            <View
                                style={{
                                    opacity: 1,
                                    flexDirection: 'row',
                                    backgroundColor: 'lightgray',
                                    borderBottomEndRadius: 5,
                                    borderBottomLeftRadius: 5,
                                    marginTop: W * 0.03,
                                    padding: H * 0.006,
                                    fontWeight: "600",
                                }}>

                                <Text
                                    style={{
                                        fontFamily: fontFamily.regular,
                                        fontSize: fontSizes.XXXXSM,
                                        color: 'black',
                                        marginLeft: W * 0.02,
                                        fontWeight: "600",
                                    }}>Call Duration: </Text>

                                <Text
                                    style={{
                                        color: "black",
                                        fontFamily: fontFamily.regular,
                                        fontSize: fontSizes.XXXXSM,
                                        maxWidth: W * 0.15,
                                        color: 'black',
                                        fontWeight: "600",
                                    }}>{item?.call_duration}</Text>

                            </View>
                        }

                    </View>
                </TouchableOpacity>
            )
        }
    }
    return (

        loader
            ?
            <>
                <Loader />
            </>
            :
            <View
                style={{
                    width: W,
                    height: H,
                    backgroundColor: '#F5F5F5',
                }}>

                <HeaderTwo Title="Appointments" />

                <Modal
                    visible={modalVisible}
                    transparent={true}
                >
                    <View style={{
                        backgroundColor: "rgba(0,0,0,0.3)",
                        height: H,
                        width: W,
                        alignItems: "center", justifyContent: 'center'

                    }}>

                        <View style={{
                            paddingVertical: H * 0.02,
                            width: W * 0.9,
                            backgroundColor: "white",
                            borderRadius: 8,
                        }}>

                            <Text style={{
                                alignSelf: 'center', marginBottom: 10,
                                fontFamily: fontFamily.medium, fontSize: fontSizes.default
                            }}>Choose hospital</Text>


                            <Divider
                                style={{ width: W, borderColor: 'black', borderWidth: 0.02 }} />
                            <FlatList
                                data={hospitals?.hospitals}
                                renderItem={renderItemHospitals}
                                keyExtractor={(item, index) => `${index}`}
                            />



                            <TouchableOpacity onPress={() => {
                                setModalVisible(false)
                            }}>
                                <Text style={{
                                    marginTop: H * 0.05,
                                    marginRight: W * 0.05,
                                    alignSelf: "flex-end"
                                }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>





                <TouchableOpacity
                    onPress={() => openHospitallist()}>

                    <Text
                        style={{
                            color: "black",
                            fontFamily: fontFamily.medium,
                            fontSize: fontSizes.default,
                            borderRadius: 2, borderWidth: 1,
                            marginHorizontal: W * 0.03,
                            paddingVertical: H * 0.01,
                            marginVertical: H * 0.01,
                            textAlign: 'center'
                        }}>{hospitalName == "" ? "Choose Hospital" : hospitalName}</Text>
                </TouchableOpacity>


                <View style={{
                    flexDirection: 'row',
                    marginTop: H * 0.02,
                    marginLeft: W * 0.05,
                    marginRight: W * 0.05,
                    justifyContent: 'space-between'

                }}>
                    <Text


                        style={{
                            color: "black",
                            fontFamily: fontFamily.medium,
                            fontSize: fontSizes.default,
                        }}>Choose Date</Text>


                    <TouchableOpacity
                        onPress={() => setVisible(true)}>
                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "white",
                            // elevation: 5,
                            paddingHorizontal: W * 0.05,
                            alignItems: "center",
                            borderRadius: 3,
                            borderWidth: 1,
                        }}>
                            <View style={{
                                flexDirection: "row"
                            }}>
                                <View>

                                    {Platform.OS == "android" && <Text style={{
                                        textAlign: "center",
                                        color: "black",
                                        fontSize: fontSizes.SM,
                                        fontFamily: fontFamily.medium, padding: 3
                                    }}>{timeStampToDateFormatd_m_y(timeStamp)}</Text>}

                                    {

                                        Platform.OS == "ios" ?
                                            <>
                                                <RNDateTimePicker
                                                    style={{
                                                    }}
                                                    onChange={async (info) => {
                                                        // console.log("date ===", info.nativeEvent.timestamp)
                                                        setVisible(false)
                                                        setTimeStamp(Number.parseInt(info.nativeEvent.timestamp, 10))

                                                        // temp = hospitalID

                                                        const hID = await getLocalStorageData('HID')

                                                        if (hID) {
                                                            getAppointmentList(timeStampToDateFormatd_m_y(info.nativeEvent.timestamp), hID)

                                                        }
                                                    }}
                                                    //maximumDate={Date.now()}
                                                    value={new Date(timeStamp)}
                                                />

                                            </>
                                            :
                                            <>
                                                {
                                                    visible
                                                        ?
                                                        <RNDateTimePicker
                                                            style={{

                                                            }}
                                                            onChange={async (info) => {
                                                                // console.log("date ===", info.nativeEvent.timestamp)
                                                                setVisible(false)
                                                                setTimeStamp(Number.parseInt(info.nativeEvent.timestamp, 10))

                                                                // temp = hospitalID

                                                                const hID = await getLocalStorageData('HID')

                                                                if (hID) {
                                                                    getAppointmentList(timeStampToDateFormatd_m_y(info.nativeEvent.timestamp), hID)

                                                                }
                                                                //  else {
                                                                //     getAppointmentList(timeStampToDateFormatd_m_y(info.nativeEvent.timestamp), temp)
                                                                // }


                                                                //  getAppointmentList(info.nativeEvent.timestamp, hID)
                                                            }}
                                                            value={new Date(timeStamp)}
                                                        />
                                                        :
                                                        null
                                                }
                                            </>



                                    }


                                </View>


                            </View>

                        </View>

                    </TouchableOpacity>
                </View>
                <View>
                    <SegmentedButtons
                        multiSelect
                        style={{
                            marginTop: 10,
                        }}

                        value={value}
                        onValueChange={setValue}
                        buttons={
                            [
                                {
                                    showSelectedCheck: true,
                                    value: 'Online',
                                    label:
                                        <Text style={{
                                            color: data?.online_tcolor,
                                            fontSize: 11
                                        }}>Online
                                        </Text>
                                    ,
                                    style: {
                                        borderRadius: 0,
                                        backgroundColor: data?.online_color
                                    },

                                },

                                {
                                    showSelectedCheck: true,
                                    value: 'Walk-In',
                                    label: <Text style={{
                                        color: data?.walkin_tcolor,
                                        fontSize: 11
                                    }}>Walk-In</Text>,
                                    style: {
                                        borderRadius: 0,
                                        // backgroundColor: value?.includes('Walk-In') ? data?.walkin_color : null
                                        backgroundColor: data?.walkin_color
                                    }
                                },
                                {
                                    showSelectedCheck: true,
                                    value: 'In Person',
                                    label: <Text style={{
                                        color: data?.inperson_tcolor,
                                        fontSize: 11
                                    }}>In Person</Text>,
                                    style: {
                                        borderRadius: 0,
                                        //backgroundColor: value?.includes('In Person') ? data?.inperson_color : null
                                        backgroundColor: data?.inperson_color
                                    }
                                },
                                {
                                    showSelectedCheck: true,
                                    value: 'Completed',
                                    label: <Text
                                        style={{
                                            color: data?.done_tcolor,
                                            fontSize: 11
                                        }}>Done</Text>,
                                    style: {
                                        borderRadius: 0,
                                        //backgroundColor: value?.includes('Completed') ? data?.done_color : null
                                        backgroundColor: data?.done_color
                                    }
                                },
                            ]}
                    />
                    {
                        data?.online_patient_count !== 0 &&
                        <View style={[styles.badgeSegmentedButtons]}>
                            <Text style={[styles.whiteText, styles.displaySmall]}>{data?.online_patient_count}</Text>
                        </View>
                    }
                    {
                        data?.walkin_patient_count !== 0 &&
                        <View style={[styles.badgeSegmentedButtons, { left: W * 0.43 }]}>
                            <Text style={[styles.whiteText, styles.displaySmall]}>{data?.walkin_patient_count}</Text>
                        </View>
                    }
                    {
                        data?.inperson_patient_count !== 0 &&
                        <View style={[styles.badgeSegmentedButtons, { left: W * 0.68 }]}>
                            <Text style={[styles.whiteText, styles.displaySmall]}>{data?.inperson_patient_count}</Text>
                        </View>
                    }
                    {
                        data?.completed_patient_count !== 0 &&
                        <View style={[styles.badgeSegmentedButtons, { left: W * 0.93 }]}>
                            <Text style={[styles.whiteText, styles.displaySmall]}>{data?.completed_patient_count}</Text>
                        </View>
                    }
                </View>


                <View style={{
                    width: W,
                    height: H,
                    alignItems: 'center',

                }}>
                    {data?.appoint?.length == 0 && <Text style={{
                        marginTop: H * 0.3
                    }}>No Appointments Available For This Date..</Text>}
                    <FlatList
                        contentContainerStyle={{ paddingBottom: H * 0.5 }}
                        data={data?.appoint}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `${index}`} />

                </View>
            </View>
    )
}
export default DoCPatientsAppointmentList