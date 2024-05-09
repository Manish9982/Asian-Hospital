import { FlatList, TouchableOpacity, View, Image, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider, Text } from 'react-native-paper'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import { colors, convertTimestampTo12hFormat, convertTimestampToDateString, fontFamily, fontSizes, GetApiData, H, W } from '../../assets/Schemes/Schemes'
import Loader from '../../assets/Loader/Loader'

const NotificationsDisplaying = ({ navigation }) => {

    const [data, setData] = useState(null)
    const [loader, setLoader] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const callStartTime = "10:00 AM";
    const callEndTime = "10:15 AM";
    const totalDuration = "15 min";

    useEffect(() => {
        getNotificationList()
    }, [])

    const getNotificationList = async () => {
        const result = await GetApiData('notifications')
        //console.log("NotificationResult ", result)
        setData(result)
        setLoader(false)
    }

    const redirectionToScreen = () => {
        navigation.navigate("MyAppointments")
        //Alert.alert("GAurav")
    }

    const showAlert = () => {
        Alert.alert(
            'Confirmation',
            'Do you want to delete only this notification,or should I remove all of them?',
            [
                {
                    text: 'Delete',
                    onPress: () => Alert.alert("Delete button pressed"),

                },
                {
                    text: 'Delete All',
                    onPress: () => Alert.alert('Delete All button pressed'),
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel button pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };


    const renderItem = ({ item, index }) => {
        return (
            <>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 10,
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: 'red',
                                fontSize: 20,
                                marginBottom: 10,
                            }}>Call Log</Text>
                            <Text>Call Start Time: {callStartTime}</Text>
                            <Text style={{
                                marginTop: 10
                            }}>Call End Time: {callEndTime}</Text>
                            <Text style={{
                                marginTop: 10
                            }}>Total Duration: {totalDuration}</Text>
                            <TouchableOpacity style={{
                                marginTop: 10
                            }}>
                                <Text style={{
                                    color: 'red',
                                }} onPress={() => setModalVisible(false)} >Okay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        overflow: 'hidden',
                        marginStart: 10,
                        marginTop: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'lightblue'
                    }}>
                        <Image
                            source={require('../../assets/Images/call.png')}
                            style={{
                                width: '50%',
                                height: '50%',
                                tintColor: 'blue',
                                resizeMode: 'contain',
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(true)
                            // redirectionToScreen()
                        }}
                        style={{
                            width: "77%",
                            alignSelf: "center",
                            marginVertical: H * 0.01,
                            paddingVertical: H * 0.01,
                            paddingHorizontal: W * 0.04
                        }}>
                        <Text style={{
                            color: "black",
                        }}>
                            {item.title} <Text>for</Text> {item.patient_name}
                        </Text>
                        <Text style={{
                            fontSize: fontSizes.EXTRASM,
                            marginTop: 10
                        }}>
                            {convertTimestampToDateString(item?.created_at)} at {convertTimestampTo12hFormat(item?.created_at)}
                        </Text>
                        {/* <Text>
                        Message: "{item.body}"
                    </Text> */}
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {
                            showAlert()
                        }}>
                        <Image
                            source={require('../../assets/Images/delete.png')}
                            style={{
                                height: 20,
                                width: 20,
                                marginTop: 20,
                                resizeMode: 'contain',
                            }}
                        />
                    </TouchableOpacity>
                </View >
                <Divider
                    style={{
                        marginStart: 60,
                        marginRight: 15,
                        height: 2
                    }} />
            </>
        )
    }

    return (
        loader
            ?
            <Loader />

            :

            <View style={{

            }}>
                <HeaderTwo Title="Activity" />

                <View style={{
                    paddingBottom: H * 0.2
                }}>
                    {
                        data?.notifications?.length == 0
                            ?
                            <Text style={{
                                alignSelf: "center",
                                marginTop: H * 0.45
                            }}>
                                No records found here...
                            </Text>

                            :

                            <FlatList data={data?.notifications}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => `_key${index}`}
                            />
                    }
                </View>

            </View>
    )
}

export default NotificationsDisplaying