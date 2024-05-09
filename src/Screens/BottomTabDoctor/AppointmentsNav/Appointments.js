import { View, Text, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { colors, fontFamily, fontSizes, getLocalStorageData, PostApiData, } from '../../../assets/Schemes/Schemes';
import HeaderTwo from '../../../assets/Schemes/HeaderTwo';
import { useIsFocused } from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker'
import Loader from '../../../assets/Loader/Loader';




const Appointments = ({ navigation }) => {






    const isFocused = useIsFocused()


    const [searchQuery, setSearchQuery] = React.useState('');
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState(null)


    const onChangeSearch = query => setSearchQuery(query);

    const H = Dimensions.get("window").height
    const W = Dimensions.get("window").width


    useEffect(() => { getAppointmentList("2023-01-05") }, [isFocused])

    const date = new Date()

    const day = date.getDate().toString().padStart(2, 0)
    const month = (date.getMonth() + 1).toString().padStart(2, 0)
    const year = (date.getFullYear()).toString().padStart(2, 0)

    const currentdate = (`${year}-${month}-${day}`)

    const getAppointmentList = async (date) => {
        setLoader(true)
        var formdata = new FormData();
        formdata.append("date", "2023-01-05");
        const result = await PostApiData('appointments', formdata)

       // console.log("result==", result)

        if (result.status == '200') {
            setData(result)
        } else {
            Alert.alert('Error', `${result.message}`)
        }
        setLoader(false)
    }

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("PatientAppoinmentDetails", { "appintmentID": `${JSON.stringify(item?.id)}` })

                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            backgroundColor: item.color,
                            paddingVertical: H * 0.01,
                            paddingHorizontal: W * 0.04,
                            alignItems: "center",
                            marginVertical: H * 0.015,
                            width: W * 0.88,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#8B82DA',
                        }}>

                        <View style={{
                            height: H * 0.07,
                            width: H * 0.07,
                            borderRadius: H * 0.07 / 2,
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                            borderColor: 'black',
                            backgroundColor: item?.patient?.color
                        }}>

                            <Text
                                style={{
                                    color: "black",
                                    //fontWeight: "bold", 
                                    marginHorizontal: W * 0.04,
                                    fontFamily: fontFamily.regular,
                                    fontSize: fontSizes.XL,
                                    color: 'white'
                                }}>{item.patient.icon}</Text>
                        </View>

                        <View style={{}}>
                            <Text
                                style={{
                                    color: item?.patient?.color,
                                    marginHorizontal: W * 0.04,
                                    fontFamily: fontFamily.medium,
                                    fontSize: fontSizes.default,
                                }}>{`${item.patient.salutation} ${item.patient.first_name}`}</Text>
                            <Text
                                style={{
                                    color: "black",
                                    marginHorizontal: W * 0.04,
                                    fontFamily: fontFamily.regular,
                                    fontSize: fontSizes.SM,
                                    color: 'black'
                                }}>{item.patient.phone}</Text>


                        </View>
                    </View >
                </TouchableOpacity>


            </View>


        )

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
                    backgroundColor: '#F5F5F5',

                }}>

                <HeaderTwo Title="Appointments" />

                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}>

                </View>



                <Searchbar
                    placeholder="Search patient.."
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={{
                        backgroundColor: "white",
                        marginVertical: H * 0.02,
                        width: W * 0.90,
                        alignSelf: "center",
                        color: 'gray'
                    }}
                />

                <View style={{
                    flexDirection: 'row',
                    width: W,
                    marginLeft: W * 0.06
                }}>
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
                        alignSelf: 'flex-end'
                    }}>

                        <Text
                            style={{
                                color: "black",
                                fontFamily: fontFamily.medium,
                                fontSize: fontSizes.SM,
                            }}>{currentdate}</Text>

                    </View>
                </View>

                <View style={{
                    width: W,
                    height: H,
                    alignItems: 'center',
                    paddingBottom: H * 0.08
                }}>

                    <FlatList
                        data={data?.appoint}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `${index}`} />
                    {/* // numColumns={3}  */}
                </View>
            </View>
    )
}
export default Appointments