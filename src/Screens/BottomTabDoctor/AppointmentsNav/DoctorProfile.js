import { View, Text, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Header from '../../../assets/Schemes/Header'
import { colors, fontFamily, fontSizes } from '../../../assets/Schemes/Schemes'



const H = Dimensions.get("window").height
const W = Dimensions.get("window").width




const DoctorProfile = ({ navigation }) => {

    const data = [
        {
            "name": "12:00",
            "number_of_doc": "25 Doctors",
            //"image": require('../../../assets/Images/image.png')
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:10",
            "number_of_doc": "25 Doctors",
            "image": require('../../../assets/Images/image.png')
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:00",
            "number_of_doc": "25 Doctors",
            //"image": require('../../../assets/Images/image.png')
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:10",
            "number_of_doc": "25 Doctors",
            "image": require('../../../assets/Images/image.png')
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:00",
            "number_of_doc": "25 Doctors",
            //"image": require('../../../assets/Images/image.png')
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:10",
            "number_of_doc": "25 Doctors",
            "image": require('../../../assets/Images/image.png')
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:00",
            "number_of_doc": "25 Doctors",
            //"image": require('../../../assets/Images/image.png')
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:10",
            "number_of_doc": "25 Doctors",
            "image": require('../../../assets/Images/image.png')
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:00",
            "number_of_doc": "25 Doctors",
            //"image": require('../../../assets/Images/image.png')
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:10",
            "number_of_doc": "25 Doctors",
            "image": require('../../../assets/Images/image.png')
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:00",
            "number_of_doc": "25 Doctors",
            //"image": require('../../../assets/Images/image.png')
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:10",
            "number_of_doc": "25 Doctors",
            "image": require('../../../assets/Images/image.png')
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:00",
            "number_of_doc": "25 Doctors",
            //"image": require('../../../assets/Images/image.png')
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:10",
            "number_of_doc": "25 Doctors",
            "image": require('../../../assets/Images/image.png')
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:00",
            "number_of_doc": "25 Doctors",
            //"image": require('../../../assets/Images/image.png')
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:10",
            "number_of_doc": "25 Doctors",
            "image": require('../../../assets/Images/image.png')
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },
        {
            "name": "12:20",
            "number_of_doc": "25 Doctors",
            "image": source = ({ uri: 'http://172.16.0.140:8080/html/hospital/hospitalimage/1672221294.jpg' })
        },

    ]

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity

                    // onPress={() => { handlenavigation(item.status, item.category.id) }}

                    style={{
                        height: H * 0.042,
                        width: W * 0.2,
                        borderWidth: 0.3,
                        marginHorizontal: H * 0.006,
                        // alignItems: 'center',
                        marginVertical: H * 0.015,
                        //opacity: item.status == '1' ? 1 : 0.4,
                        //backgroundColor: item.status == '1' ? item.category.background_colour : "grey",
                        borderRadius: 2,
                        borderColor: 'gray',
                        justifyContent: 'center',
                    }}>



                    <Text style={{

                        textAlign: "center",
                        alignSelf: 'center',
                        // justifyContent:'center',
                        color: colors.toobarcolor,
                        fontSize: fontSizes.SM,
                        fontFamily: fontFamily.medium,
                        // opacity: item.status == '1' ? 1 : 0.4,
                    }}>{item.name}</Text>

                </TouchableOpacity>

            </View>
        )

    }

    return (


        <View style={{ backgroundColor: 'white', height: H }}>

            <Header

                Title="Select date and time" />

            <View style={{ flexDirection: 'row' }}>


                <View
                    style={{
                        backgroundColor: "white",
                        paddingVertical: H * 0.04,
                        width: W,
                        paddingHorizontal: W * 0.05,
                        flexDirection: 'row'

                    }}>

                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/2750/2750657.png" }}
                        style={{
                            height: H * 0.13,
                            width: H * 0.13,
                            borderRadius: H * 0.17 / 2,
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                            backgroundColor: "silver",
                        }}
                    />

                    <View style={{
                        backgroundColor: "white",
                        borderRadius: 8,
                        alignItems: "center",
                        paddingVertical: H * 0.02,
                        paddingHorizontal: W * 0.05
                    }}>

                        <Text style={{
                            color: colors.black,
                            fontSize: fontSizes.XL,
                            fontFamily: fontFamily.medium
                        }}>Dr. Rahul Kumar</Text>


                        <Text style={{
                            fontSize: fontSizes.SM,
                            color: "gray",
                            fontFamily: fontFamily.medium
                        }}>Associate Director - CTVS</Text>

                        <Text style={{
                            fontSize: fontSizes.SM,
                            color: "gray",
                            fontFamily: fontFamily.medium
                        }}>Fee - 200 (Rs.)</Text>
                    </View>
                </View>


            </View>

            <View style={{
                borderWidth: 1,
                //marginVertical:H*0.02,
                marginBottom: H * 0.01,
                marginHorizontal: W * 0.035,
                borderColor: 'gray',
            }}>
                <Text style={{
                    fontSize: fontSizes.SM,
                    color: "gray",
                    padding: H * 0.015,
                    fontFamily: fontFamily.medium
                }}>Associate Director - CTVS,ssociate Director - CTVS,ssociate Director - CTVS,ssociate Director - CTVS,ssociate Director - CTVS</Text>
            </View>



            <View style={{
                marginVertical: H * 0.02,
                //   marginHorizontal: W * 0.05,
            }}>
                <Text style={{
                    textAlign: "left",
                    color: colors.black,
                    fontSize: fontSizes.default,
                    fontFamily: fontFamily.medium, marginHorizontal: H * 0.015,
                }}>
                    Schedule for
                </Text>


                <View style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                    elevation: 5,
                    paddingVertical: H * 0.02,
                    paddingHorizontal: W * 0.05,
                    alignItems: "center",
                    marginHorizontal: H * 0.01,
                    justifyContent: "space-between",
                    borderRadius: 8,
                    marginVertical: H * 0.01

                }}>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <View>

                            <Text style={{
                                color: colors.black,
                                fontSize: fontSizes.default,
                                fontFamily: fontFamily.medium
                            }}>Date</Text>
                            <Text style={{
                                textAlign: "center",
                                color: "gray",
                                fontSize: fontSizes.SM,
                                fontFamily: fontFamily.medium
                            }}>26 December 2022</Text>


                        </View>
                        <Image source={require('../../../assets/Images/arrow.png')}

                            style={{
                                height: H * 0.025,
                                width: H * 0.025,
                                position: "absolute",
                                left: W * 0.8,
                                alignSelf: "center"
                            }} />
                    </View>

                </View>


                <View style={{
                    // width: W,
                    //flexDirection: "row",
                    backgroundColor: "white",
                    elevation: 10,

                    // alignItems: "center",
                    padding: H * 0.01,
                    justifyContent: 'space-evenly',
                    borderRadius: 8,
                    marginVertical: H * 0.01,
                    marginHorizontal: W * 0.02
                }}>


                    <Text style={{
                        // justifyContent:'center',
                        color: 'black',
                        fontSize: fontSizes.default,
                        fontFamily: fontFamily.medium,
                        marginVertical: H * 0.005,
                        marginHorizontal: W * 0.025,
                        // opacity: item.status == '1' ? 1 : 0.4,
                    }}>Time</Text>

                    <View style={{ height: H * 0.5 }}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => `${index}`}
                            numColumns={4} />
                    </View>


                </View>

            </View>
            {/* ////////////////////// */}

        </View>
    )
}

export default DoctorProfile