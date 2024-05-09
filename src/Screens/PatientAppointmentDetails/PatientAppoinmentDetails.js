import { Image, StyleSheet, TouchableOpacity, View, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, convert24hTo12hFormat, fontFamily, fontSizes, H, PostApiData, W } from '../../assets/Schemes/Schemes'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import { Divider, Text } from 'react-native-paper'
import Loader from '../../assets/Loader/Loader'
import DoctorCardWithoutPrice from '../../assets/Schemes/DoctorCardWithoutPrice'
import { spacing } from '../../components/Spacing'




const PatientAppoinmentDetails = ({ navigation, route }) => {

    // //console.log("id= " + route.params.appintmentID)

    const [data, setData] = useState([])

    const [loader, setLoader] = useState([])


    useEffect(() => { getAppointmentList(route.params.appintmentID) }, [])

    const stylesheet = StyleSheet.create({
        viewBillButton:
        {
            position: 'absolute',
            left: W * 0.73,
            backgroundColor: colors.placeholderColor,
            borderRadius: 8,
            padding: spacing.small
        },
        viewBillText:
        {
            color: '#fff',
            fontSize: fontSizes.SM
        }
    })

    const viewBillButtonPress = () => {
        navigation.navigate('DisplayBill', { billNumber: data?.appoint?.bill_id })
    }

    const getAppointmentList = async (id) => {
        setLoader(true)
        var formdata = new FormData();
        formdata.append("appointment_id", id);
        const result = await PostApiData('appointment_detail', formdata)
        // //console.log("result of appointment_detail api ", result)
        // //console.log("formdata for appointment details", formdata)
        if (result.status == '200') {
            setData(result)
            //console.log(result)
        } else {
            Alert.alert('Alert', `${result.message}`)
        }
        setLoader(false)
    }

    const startCall = () => {
        if (data?.appoint?.call_token == "") {
            Alert.alert("Sorry!", "The Doctor Is Not Available For Call Right Now")
        }
        else {
            navigation.navigate("VideoCalling", { "access_token": `${data?.appoint?.call_token}`, "ID": JSON.stringify(data?.appoint?.id) })
        }
    }



    return (
        loader
            ?
            <>
                <Loader />
            </>
            :

            <View>
                <HeaderTwo Title="Details" />
                <ScrollView>


                    <View style={{ backgroundColor: 'white', height: H * 1.2 }}>



                        <DoctorCardWithoutPrice
                            id={data?.doctor?.id}
                            profile_url={data?.appoint?.doctor?.profile_url}
                            image={data?.appoint?.doctor?.image}
                            first_name={data?.appoint?.doctor?.first_name}
                            category={data?.appoint?.category}
                            designation={data?.appoint?.doctor?.designation}
                            education={data?.appoint?.doctor?.education}
                            consultant_online={data?.doctor?.consultant_online}
                            consultant_person={data?.doctor?.consultant_person}
                        />
                        <Text style={{
                            textAlign: "left",
                            color: colors.black,
                            fontSize: fontSizes.XL,
                            fontFamily: fontFamily.medium,
                            paddingVertical: W * 0.02,
                            paddingHorizontal: W * 0.05,
                        }}>
                            Appointment Details:
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            borderColor: colors.toobarcolor,
                            borderRadius: 8,
                            borderWidth: 1,
                            width: "95%",
                            alignSelf: "center",
                            backgroundColor: data?.appoint?.color,
                        }}>


                            <View
                                style={{
                                    flexDirection: "row",
                                    marginVertical: H * 0.015,
                                    paddingVertical: H * 0.0,
                                    backgroundColor: data?.appoint?.color,
                                    //width: W,
                                    borderRadius: 5

                                }}>

                                <View style={{
                                    backgroundColor: data?.appoint?.color,
                                    borderRadius: 8,
                                    // alignItems: "center",
                                    paddingVertical: H * 0.01,
                                    paddingHorizontal: W * 0.05
                                }}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: fontSizes.XL,
                                        maxWidth: W * 0.6,
                                        fontFamily: fontFamily.medium
                                    }}>{`${data?.appoint?.full_name}`}</Text>

                                    <Text style={{
                                        fontSize: fontSizes.SM,
                                        color: "white",
                                        maxWidth: W * 0.6,
                                        //alignSelf: 'center',
                                        fontFamily: fontFamily.regular
                                    }}>UHID: {data?.appoint?.his_id}</Text>


                                    {/* <Text style={{
                                        fontSize: fontSizes.SM,
                                        color: "black",
                                        maxWidth: W * 0.6, //alignSelf: 'center',
                                        fontFamily: fontFamily.regular
                                    }}>{data?.appoint?.phone}</Text> */}


                                    {/* <Text style={{
                                        fontSize: fontSizes.SM,
                                        color: "black",
                                        maxWidth: W * 0.6, //alignSelf: 'center',
                                        fontFamily: fontFamily.medium
                                    }}>DOB: {data?.appoint?.dob_f}, {data?.appoint?.age} Yrs.</Text> */}
                                    <Text style={{
                                        fontSize: fontSizes.SM,
                                        color: "white",
                                    }}>
                                        Date: {data?.appoint?.appointment_date} at {convert24hTo12hFormat(data?.appoint?.slot)}
                                    </Text>
                                    {
                                        route.params.appo_type == "1" ?
                                            <>
                                                <Text style={{
                                                    fontSize: fontSizes.SM,
                                                    color: "white"
                                                }}>
                                                    {"Type:"}<Text style={{
                                                        fontSize: fontSizes.SM,
                                                        color: "white"
                                                    }}> Online</Text>
                                                </Text>

                                            </>
                                            :
                                            <Text style={{
                                                fontSize: fontSizes.SM,
                                                color: "white",
                                            }}>
                                                {"Type:"}<Text style={{
                                                    fontSize: fontSizes.SM,
                                                    color: "white"
                                                }}> In Person</Text>
                                            </Text>
                                    }



                                </View>
                            </View>


                        </View>





                        {/* location */}



                        {/* <Divider style={{width:W,marginTop:H*0.025}}></Divider> */}
                        {route.params.appo_type == "1"
                            ?
                            <View style={{
                                flexDirection: "row",
                                borderColor: colors.toobarcolor,
                                borderWidth: 1,
                                width: "95%",
                                alignSelf: "center",
                                borderRadius: 8,
                                paddingVertical: H * 0.01,
                                marginVertical: H * 0.01
                                //   marginHorizontal: W * 0.05,
                            }}>
                                <Text style={{
                                    textAlign: "left",
                                    color: colors.black,
                                    fontSize: fontSizes.XL,
                                    fontFamily: fontFamily.medium,
                                    paddingVertical: W * 0.02,
                                    paddingHorizontal: W * 0.05,
                                }}>
                                    Prescription:
                                </Text>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginLeft: W * 0.03
                                    }}>


                                    <TouchableOpacity

                                        onPress={() => {
                                            navigation.navigate("DoCViewPrescription", { "appintmentID": `${route.params.appintmentID}` })
                                            //console.log("APPID== ", route.params.appintmentID)
                                        }}
                                        style={{
                                            backgroundColor: '#FFA858',
                                            fontSize: fontSizes.SM,
                                            alignItems: 'center',
                                            paddingVertical: H * 0.013,
                                            fontFamily: fontFamily.medium,
                                            borderRadius: 3,
                                            width: W * 0.4,
                                            alignSelf: "center"
                                        }}>
                                        <Text style={{ color: colors.white }}>
                                            View
                                        </Text>

                                    </TouchableOpacity>
                                </View>




                            </View>
                            :
                            null
                        }


                        <View style={{
                            marginVertical: H * 0.01,
                            //   marginHorizontal: W * 0.05,
                        }}>

                            <Text style={{
                                textAlign: "left",
                                color: colors.black,
                                fontSize: fontSizes.XL,
                                fontFamily: fontFamily.medium,
                                paddingVertical: W * 0.02,
                                paddingHorizontal: W * 0.05,
                            }}>
                                Bill Details:
                            </Text>
                            <View style={{
                                borderColor: colors.toobarcolor,
                                borderWidth: 1,
                                width: "95%",
                                borderRadius: 8,
                                alignSelf: "center",
                                height: H * 0.1,
                                justifyContent: "space-evenly",
                            }}>

                                <Text style={{
                                    textAlign: "left",
                                    color: "black",
                                    fontSize: fontSizes.SM,
                                    fontFamily: fontFamily.medium,
                                    marginHorizontal: W * 0.07,
                                }}>
                                    Bill Number: {data?.appoint?.bill_id}
                                </Text>
                                <Text style={{
                                    marginHorizontal: W * 0.07,
                                    color: "black",
                                    fontSize: fontSizes.SM,
                                    fontFamily: fontFamily.medium,
                                }}>
                                    Amount: ₹{data?.appoint?.appo_price}
                                </Text>
                                <TouchableOpacity
                                    onPress={viewBillButtonPress}
                                    style={stylesheet.viewBillButton}>
                                    <Text style={stylesheet.viewBillText}>View Bill</Text>
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity>
                            </TouchableOpacity>
                            <Text style={{
                                textAlign: "left",
                                color: colors.black,
                                fontSize: fontSizes.XL,
                                fontFamily: fontFamily.medium,
                                paddingVertical: W * 0.02,
                                paddingHorizontal: W * 0.05,
                            }}>
                                Hospital Name:

                                <Text style={{
                                    textAlign: "left",
                                    color: colors.black,
                                    fontSize: fontSizes.XL,
                                    fontFamily: fontFamily.medium,
                                    paddingVertical: W * 0.02,
                                    paddingHorizontal: W * 0.05,
                                }}> {data?.appoint?.hospital?.name}</Text>


                            </Text>
                            <View style={styles.conditionBox}>
                                <Text style={{
                                    width: W * 0.8,
                                    color: "black",
                                    fontSize: fontSizes.EXTRASM,
                                    fontFamily: fontFamily.regular,
                                    left: W * 0.05,
                                    // marginHorizontal:W*0.02
                                }}>
                                    *Cancellation of Appointment can only be done before two hours of Appointment time, beyond that no refund would be entertained.

                                </Text>

                                <Text style={{
                                    color: "black",
                                    fontSize: fontSizes.EXTRASM,
                                    fontFamily: fontFamily.regular,
                                    left: W * 0.05,
                                    marginTop: H * 0.03,
                                    maxWidth: W * 0.8,
                                }}>
                                    *Refund amount would be transferred to the bank account
                                    between 5 to 10 working days after cancellation.
                                </Text>
                            </View>
                        </View>

                    </View>



                </ScrollView>


            </View>


    )
}

const styles = StyleSheet.create({
    conditionBox:
    {
        alignSelf: 'center',
        width: "95%",
        borderColor: colors.toobarcolor,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8
    }
})
export default PatientAppoinmentDetails
