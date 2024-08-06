import React, { useContext, useEffect, useState } from 'react';
import {
    View, FlatList, Dimensions, Image, TouchableOpacity, Alert
} from 'react-native'
import { SegmentedButtons, Text } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DataContext from '../../assets/Context/DataContext';
import Loader from '../../assets/Loader/Loader';
import HeaderTwo from '../../assets/Schemes/HeaderTwo';
import { colors, convert24hTo12hFormat, fontFamily, fontSizes, getLocalStorageData, PostApiData } from '../../assets/Schemes/Schemes';
import { spacing } from '../../components/Spacing';

const MyAppointments = ({ navigation }) => {
    useEffect(() => {
        getAppointmentList()
    }, [])

    const { Nuhid, NpatientID } = useContext(DataContext)
    const [patientID, setPatientID] = NpatientID
    const [uhid, setUhid] = Nuhid
    const [value, setValue] = useState([]);
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState(null)

    const onChangeSearch = query => setSearchQuery(query);

    const H = Dimensions.get("window").height
    const W = Dimensions.get("window").width






    const date = new Date()

    const day = date.getDate().toString().padStart(2, 0)
    const month = (date.getMonth() + 1).toString().padStart(2, 0)
    const year = (date.getFullYear()).toString().padStart(2, 0)

    const currentdate = (`${year}-${month}-${day}`)

    const getAppointmentList = async (date) => {
        const tokenN = await getLocalStorageData('token')
        setLoader(true)
        var formdata = new FormData();

        formdata.append("his_id", uhid)
        formdata.append("type", "1")

        const result = await PostApiData('appointments', formdata)
        // console.log("formdata========================>", formdata)
        // console.log("token=============>", tokenN)
        // console.log("formdata of my appointmnets", formdata)
        // console.log("token of my appointmnets", tokenN)
        // console.log("result==", result)


        if (result.status == '200') {
            setData(result)
        } else {
            Alert.alert('Alert', `${result.message}`)
        }
        setLoader(false)
    }

    const renderItem = ({ item, index }) => {
        if (((item.appointment_status == '0') && (value?.includes("Pending"))) || ((item.appointment_status == '1') && (value?.includes("Completed"))) || (value?.length == 0)) {
            return (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            backgroundColor: item.color,
                            alignItems: "center",
                            padding: spacing.medium,
                            marginVertical: H * 0.015,
                            width: W * 0.88,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#8B82DA'
                        }}
                        onPress={() => {
                            navigation.navigate("PatientAppoinmentDetails", { "appintmentID": `${JSON.stringify(item?.id)}`, "appo_type": `${item?.appointment_type}` })

                            // console.log("APPID== >", JSON.stringify(item?.id))


                        }}>


                        <View style={{}}>
                            <Text
                                style={{
                                    color: "white",
                                    fontFamily: fontFamily.medium,
                                    fontSize: fontSizes.default,
                                }}>{`${item?.full_name}`}
                                <Text
                                    style={{
                                        color: "white",
                                        fontFamily: fontFamily.regular,
                                        fontSize: fontSizes.SM,
                                    }}>  {item?.appointment_type == "0" ? "(In Person)" : "(Online)"}</Text>
                            </Text>

                            {
                                item?.appointment_status == "1"
                                    ?
                                    <Text style={{
                                        color: "white",
                                    }}>(Done <AntDesign name="checkcircle" color="green" size={16} />)</Text>
                                    :
                                    <Text style={{
                                        color: "white",
                                    }}>(Pending)</Text>
                            }

                            <Text
                                style={{
                                    fontFamily: fontFamily.regular,
                                    fontSize: fontSizes.SM,
                                    color: "white"
                                }}>{item?.phone}</Text>

                            <Text
                                style={{
                                    color: "black",
                                    //fontWeight: "bold",
                                    fontFamily: fontFamily.regular,
                                    fontSize: fontSizes.SM,
                                    color: "white"
                                }}>Doctor: {item?.doctor?.first_name}</Text>
                            <Text
                                style={{
                                    color: "black",
                                    //fontWeight: "bold", 
                                    fontFamily: fontFamily.regular,
                                    fontSize: fontSizes.SM,
                                    color: "white"
                                }}>Date: {item?.appointment_date} at {convert24hTo12hFormat(item?.slot)}</Text>

                        </View>


                    </TouchableOpacity>



               
            )
        }
    }
    // console.log("Value==>", value)
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
                    backgroundColor: '#F5F5F5',

                }}>

                <HeaderTwo Title="Appointments" 
                goBackScreen={"BottomTab"}
                />

                {/* <View style={{ 
                    flexDirection: 'row',
                 width: W, 
                 marginLeft: W * 0.06 }}>
                    <Text
                        style={{
                            color: "black",
                            fontFamily: fontFamily.medium,
                            fontSize: fontSizes.default,
                        }}>Appointments</Text>


                    <View style={{
                        left: W * 0.43,
                        borderColor: 'black',
                        borderRadius: 4,
                        padding: 2,
                        borderWidth: 1,
                        //left:W*0.47,
                        alignSelf: 'flex-end'
                    }}>

                        <Text
                            style={{
                                color: "black",
                                fontFamily: fontFamily.medium,
                                fontSize: fontSizes.SM,
                            }}>{currentdate}</Text>

                    </View>
                </View> */}
                <SegmentedButtons
                    multiSelect
                    style={{
                        marginTop: 10,
                    }}
                    value={value}
                    onValueChange={(t) => setValue(t)}
                    buttons={
                        [
                            {
                                showSelectedCheck: true,
                                value: 'Pending',
                                label: <Text style={{
                                    color: value?.includes('Pending') ? "white" : "black",
                                    fontSize: 14
                                }}>Pending</Text>,
                                style: {
                                    borderRadius: 0,
                                }
                            },
                            {
                                showSelectedCheck: true,
                                value: 'Completed',
                                label: <Text style={{
                                    color: value?.includes('Completed') ? "white" : "black",
                                    fontSize: 14
                                }}>Completed</Text>,
                                style: {
                                    borderRadius: 0
                                }
                            },
                        ]}
                />
                <View style={{
                    width: W,
                    height: H,
                    alignItems: 'center',
                    paddingBottom: H * 0.2
                }}>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data?.appoint}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `${index}`} />
                    {/* // numColumns={3}  */}
                </View>
            </View>
    )
}


export default MyAppointments