import { Image, StyleSheet, TouchableOpacity, View, ActivityIndicator, ScrollView, Alert, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors, convert24hTo12hFormat, fontFamily, fontSizes, getLocalStorageData, H, PostApiData, savelocalStorageData, W } from '../../assets/Schemes/Schemes'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import { Button, Divider, Text } from 'react-native-paper'
import Loader from '../../assets/Loader/Loader'
import DoctorCardWithoutPrice from '../../assets/Schemes/DoctorCardWithoutPrice'
import { spacing } from '../../components/Spacing'


const DoCPatientDetails = ({ navigation, route }) => {


    const [data, setData] = useState([])
    const [loader, setLoader] = useState([])
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => { getAppointmentList(route.params.appintmentID) }, [])

    const viewBillButtonPress = () => {
        navigation.navigate('DisplayBill', { billNumber: data?.appoint?.bill_id })
    }

    const stylesheet = StyleSheet.create({
        pullDownText:
        {
            color: 'red',
            textAlign: 'center',
            fontSize: fontSizes.EXTRASM,
            marginTop: spacing.small
        },
        viewBillButton:
        {
            position: 'absolute',
            left: W * 0.73,
            top: H * 0.02,
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


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAppointmentList(route.params.appintmentID)
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    const getAppointmentList = async (id) => {
        setLoader(true)
        var formdata = new FormData();
        route.params.appo_type == '2' ? formdata.append("bill_id", route.params.bill_id) : formdata.append("appointment_id", id);
        const result = await PostApiData('appointment_detail', formdata)

        if (result?.status == '200') {
            setData(result)
        } else {
            Alert.alert('Info', result.message)
        }
        setLoader(false)
    }

    const startVideoCallWithPatient = async () => {
        if (data?.video == "Yes") {
            setLoader(true)
            const id = await getLocalStorageData('ID')
            var formdata = new FormData();
            formdata.append("appo_id", id);
            // console.log("formdata of startCall ", formdata)
            const result = await PostApiData('startCall', formdata)
            if (result?.status == "200") {
                // console.log("result of startCall ", result)
                await savelocalStorageData('accessToken', `${result?.call_video?.doctor_token}`)
                await navigation.navigate("VideoCalling")
            }
            setLoader(false)
        }
        else {
            //Alert.alert("Info", "Video call will be active 5 minutes before the appointment.")
        }
    }


    return (
        loader ?
            <>
                <Loader />
            </> :

            <View>
                <HeaderTwo
                    Title="Details" />

                <ScrollView
                    contentContainerStyle={{
                        height: H * 1.2,
                        backgroundColor: "white"
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <Text style={stylesheet.pullDownText}>(Pull down to Refresh)</Text>
                    <View style={[styles.container, { backgroundColor: data?.appoint?.color }]}>

                        <View style={styles.detailsContainer}>
                            <Text style={[styles.nameText, { color: data?.appoint?.text_color }]}>{data?.appoint?.full_name}</Text>
                            <Text
                                style={[styles.infoText, {
                                    color: data?.appoint?.text_color
                                }]}>Gender: {data?.appoint?.gender}

                                <Text
                                    style={[styles.infoText, {
                                        color: data?.appoint?.text_color
                                    }]}>      Age: {data?.appoint?.age}



                                </Text>


                            </Text>
                            <Text style={[styles.infoText, {
                                color: data?.appoint?.text_color
                            }]}>UHID: {data?.appoint?.his_id}</Text>
                            <Text style={[styles.infoText, {
                                color: data?.appoint?.text_color
                            }]}>Date: {data?.appoint?.appointment_date} at {data?.appoint?.slot}</Text>

                            {route.params.appo_type == '1' && (
                                <View style={styles.typeContainer}>
                                    <Text style={[styles.typeText, { color: data?.appoint?.text_color }]}>Type: </Text>
                                    <Text style={[styles.typeText, { color: data?.appoint?.text_color }]}>Online</Text>
                                    <TouchableOpacity
                                        disabled={data?.video !== 'Yes'}
                                        style={styles.videoIconContainer}
                                        onPress={() => startVideoCallWithPatient()}>
                                        <Image source={require('../../assets/Images/camcorder.png')} style={[styles.videoIcon, { tintColor: data?.video == 'Yes' ? 'green' : 'gray' }]} />
                                    </TouchableOpacity>
                                </View>
                            )}

                            {route.params.appo_type != '1' && (
                                <Text style={[styles.typeText, { color: data?.appoint?.text_color }]}>Type: {data?.appoint?.appo_type}</Text>
                            )}
                        </View>
                    </View>
                    {
                        ((route.params.appo_type == "1") && (route.params.appo_status == "1"))
                            ?
                            <>
                                <Text style={styles.headingText}>Prescription:</Text>
                                <View style={styles.container2}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('DoCViewPrescription', { appintmentID: `${route.params.appintmentID}` });
                                        }}
                                        style={[styles.button]}>
                                        <Text style={styles.buttonText}>View</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('DoCAddReports', { appintmentID: `${route.params.appintmentID}` });
                                        }}
                                        style={[styles.button, styles.uploadButton]}>
                                        <Text style={styles.buttonText}>Upload</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            :
                            null
                    }

                    <Text style={styles.headingText}>
                        Bill Details:
                    </Text>
                    <View style={styles.billContainer}>
                        <Text style={styles.billText}>Bill Number: {data?.appoint?.bill_id}</Text>
                        <Text style={styles.billText}>Amount : ₹{data?.appoint?.appo_price}</Text>
                        {/* <TouchableOpacity
                            onPress={viewBillButtonPress}
                            style={stylesheet.viewBillButton}>
                            <Text style={stylesheet.viewBillText}>View Bill</Text>
                        </TouchableOpacity> */}
                    </View>
                    <Text style={styles.headingText}>Hospital Name:
                        <Text style={styles.headingText}> {data?.appoint?.hospital?.name}</Text>
                    </Text>
                    <View style={styles.conditionBox}>
                        <Text style={styles.noteText}>
                            * Cancellation of Appointment can only be done before two hours of Appointment time, beyond that no refund would be entertained.
                        </Text>
                        <Text></Text>
                        <Text style={styles.noteText}>
                            * Refund amount would be transferred to the bank account between 5 to 10 working days after cancellation.
                        </Text>
                    </View>

                </ScrollView>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 1,
        padding: spacing.medium,
        borderColor: colors.toobarcolor,
        marginTop: spacing.medium,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: spacing.medium,
    },
    nameText: {
        fontSize: 20,
        fontFamily: fontFamily.medium,
        color: 'white',
    },
    infoText: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        color: 'white',
    },
    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    typeText: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        color: 'white',
    },
    videoIcon: {
        height: 30,
        width: 30,
        tintColor: 'red',
    },
    videoIconContainer:
    {
        marginLeft: 5,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        width: 45,
        borderRadius: 45 / 2
    },
    container2: {
        flexDirection: "row",
        width: '95%',
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.toobarcolor,
        padding: spacing.medium,
        justifyContent: "space-evenly"
    },
    button: {
        backgroundColor: '#FFA858',
        fontSize: fontSizes.SM,
        textAlign: 'center',
        alignItems: 'center',
        paddingVertical: H * 0.013,
        fontFamily: fontFamily.medium,
        borderRadius: 3,
        width: W * 0.4,
    },
    buttonText: {
        color: colors.white,
    },
    uploadButton: {
        backgroundColor: '#A88FEE',
    },
    headingText: {
        color: colors.black,
        fontSize: fontSizes.XL,
        fontFamily: fontFamily.medium,
        padding: spacing.medium
    },
    container3: {
        width: '95%',
        alignSelf: 'center'
    },
    billContainer: {
        borderColor: colors.toobarcolor,
        borderWidth: 1,
        width: "95%",
        alignSelf: "center",
        borderRadius: 8,
        justifyContent: "space-evenly",
        padding: spacing.medium
    },
    billText: {
        textAlign: "left",
        color: "black",
        fontSize: fontSizes.SM,
        fontFamily: fontFamily.medium,
        margin: spacing.medium,
    },
    hospitalText: {
        fontSize: fontSizes.L,
        color: "black",
        fontFamily: fontFamily.medium,
        marginTop: 20,
    },
    hospitalName: {
        fontSize: fontSizes.XL,
        color: "black",
        fontFamily: fontFamily.medium,
    },
    divider: {
        width: "100%",
        marginTop: spacing.medium,
    },
    noteText: {
        color: "black",
        fontSize: fontSizes.EXTRASM,
        fontFamily: fontFamily.regular,
        maxWidth: "95%",
    },
    conditionBox:
    {
        alignSelf: 'center',
        width: '95%',
        borderColor: colors.toobarcolor,
        borderWidth: 1,
        padding: spacing.medium,
        borderRadius: 8
    }
})
export default DoCPatientDetails