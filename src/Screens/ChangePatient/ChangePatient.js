import { FlatList, StyleSheet, TouchableOpacity, View, Image, Platform, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Text, Divider, } from 'react-native-paper'
import { colors, fontFamily, fontSizes, H, PostApiData, W, getLocalStorageData, savelocalStorageData, GetApiData } from '../../assets/Schemes/Schemes'
import Loader from '../../assets/Loader/Loader'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import DataContext from '../../assets/Context/DataContext'





const ChangePatient = ({ navigation }) => {

    const { Nuhid } = useContext(DataContext)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState(null)
    const [loader, setLoader] = useState(false)
    const [text, setText] = useState("")
    const [uhid, setUhid] = Nuhid

    useEffect(() => {
        getPatients()
    }, [])

    const getPatients = async () => {
        setLoader(true)
        const result = await GetApiData('get_patients')
        setData(result)
        setLoader(false)
    }

    handleNavigation = async () => {
        const temp = await getLocalStorageData('mobile')
        // console.log("mobileno--=. ", temp)
        setVisible(false)
        navigation.navigate("Signup")
    }


    const RegisterWithHisValue = async (id) => {
        setLoader(true)
        const temp = await getLocalStorageData('mobile')
        var formdata = new FormData();

        formdata.append("his_id", id);
        formdata.append("mobile", temp);


        const result = await PostApiData('his_register', formdata)

        //console.log(result)

        if (result.status == '200') {

            await savelocalStorageData("UHID", id)
            await savelocalStorageData('token', result?.token) //storing token in local database
            await navigation.navigate("BottomTab")
            setUhid(id)

        } else {
            Alert.alert('Error', `${result.message}`)
        }
        setLoader(false)
    }

    const renderItem = ({ item, index }) => {
        return (

            <View style={{}}>
                <TouchableOpacity

                    onPress={() => { RegisterWithHisValue(item.his_id) }}

                    style={{
                        marginLeft: 15,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>


                    <View style={{
                        flexDirection: 'column',
                        padding: 5
                    }}>
                        <Text style={{
                            fontSize: fontSizes.default,
                            fontFamily: fontFamily.medium
                        }}>
                            {item.full_name}
                        </Text>
                        <Text style={{
                            fontSize: fontSizes.SM,
                            color: 'gray',
                            fontFamily: fontFamily.regular,
                            marginVertical: H * 0.002
                        }}>
                            {item.his_id}
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


    return (
        loader ?
            <>
                <Loader />
            </> :
            <>
                <View style={{
                    backgroundColor: "white",
                    flex: 1
                }}>
                    <HeaderTwo Title="Change Patient" />
                    <View style={{
                        backgroundColor: "white",
                        height: Platform.OS == "android" ? H * 0.84 : H * 0.85,
                        width: W,
                        alignItems: "center"
                    }}>

                        <Divider
                            style={{ width: W, borderColor: 'black', borderWidth: 0.02 }} />
                        <FlatList
                            data={data?.patients}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => `${index}`}
                        />


                    </View>
                </View>
            </>
    )
}

const styles = StyleSheet.create({})
export default ChangePatient
