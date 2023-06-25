import { View, Text } from 'react-native'
import React from 'react'

const PatientDetailsCard = () => {
    return (
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
                                color: "white",
                                fontFamily: fontFamily.medium,
                                fontSize: fontSizes.XL,
                                width: W * 0.55,
                            }}>{`${item.full_name}`}</Text>

                    </View>

                    {item?.appo_status == "1" ? <Text style={{
                        color: "white",
                        position: "absolute",
                        left: W * 0.55
                    }}>(Call done <AntDesign name="checkcircle" color="green" size={16} />)</Text> : null}


                    <Text
                        style={{
                            color: "white",
                            fontFamily: fontFamily.regular,
                            fontSize: fontSizes.SM,
                            color: "white"
                        }}>{item?.phone}</Text>

                    <Text
                        style={{
                            color: "white",
                            fontFamily: fontFamily.regular,
                            fontSize: fontSizes.SM,
                            color: "white",
                        }}>Date:{` ${item?.date} at ${item?.slot}`}
                        <Text
                            style={{
                                //color: item?.appointment_type == "0" ? "blue" : "green",
                                color: "white",
                                fontFamily: fontFamily.medium,
                                fontSize: fontSizes.SM,
                            }}>            ({item?.appo_type})
                        </Text>
                    </Text>
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
                            color: 'black',
                            marginLeft: W * 0.02
                        }}>Check In: </Text>

                    <Text
                        style={{
                            color: "black",
                            fontFamily: fontFamily.regular,
                            fontSize: fontSizes.XXXXSM,
                            maxWidth: W * 0.15,
                            color: 'black',
                        }}>{item?.checkin}</Text>

                    <Text
                        style={{
                            fontFamily: fontFamily.regular,
                            fontSize: fontSizes.XXXXSM,
                            maxWidth: W * 0.15,
                            color: 'black',
                            marginLeft: W * 0.05
                        }}>Wait Time: </Text>
                    <Text
                        style={{
                            color: "black",
                            fontFamily: fontFamily.regular,
                            fontSize: fontSizes.XXXXSM,
                            maxWidth: W * 0.15,
                            color: 'black'
                        }}>{item?.wait_time}</Text>


                    <Text
                        style={{
                            fontFamily: fontFamily.regular,
                            fontSize: fontSizes.XXXXSM,
                            maxWidth: W * 0.15,
                            color: 'black', marginLeft: W * 0.05
                        }}>Check Out: </Text>
                    <Text
                        style={{
                            color: "black",
                            fontFamily: fontFamily.regular,
                            fontSize: fontSizes.XXXXSM,
                            maxWidth: W * 0.15,
                            color: 'black',
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
                    }}>

                    <Text
                        style={{
                            fontFamily: fontFamily.regular,
                            fontSize: fontSizes.XXXXSM,
                            color: 'black',
                            marginLeft: W * 0.02
                        }}>Call Duration: </Text>

                    <Text
                        style={{
                            color: "black",
                            fontFamily: fontFamily.regular,
                            fontSize: fontSizes.XXXXSM,
                            maxWidth: W * 0.15,
                            color: 'black',
                        }}>{item?.call_duration}</Text>

                </View>}

        </View>

    )
}

export default PatientDetailsCard