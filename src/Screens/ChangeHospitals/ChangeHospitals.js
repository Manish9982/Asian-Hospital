import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { colors, fontFamily, GetApiData, H, W, savelocalStorageData, getLocalStorageData, fontSizes } from '../../assets/Schemes/Schemes'
import { Divider } from 'react-native-paper'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import DataContext from '../../assets/Context/DataContext'


const ChangeHospitals = ({ navigation }) => {
    const { Ndata } = useContext(DataContext)
    const [loader, setLoader] = useState(false)
    const [data, setData] = Ndata
    const [modalVisible, setModalVisible] = useState(false)
    const [hospitals, setHospitals] = useState([])

    useEffect(() => {
        openHospitallist()
    }, [])


    const openHospitallist = async () => {
        const result = await GetApiData('hospitals')
        //console.log(result)
        setHospitals(result)
        setModalVisible(true)
    }
    const renderItemHospitals = ({ item, index }) => {
        return (

            <View>
                <TouchableOpacity

                    onPress={() => {
                        savelocalStorageData('hospital_name', item?.name)
                        savelocalStorageData('hospital_id', JSON.stringify(item?.id))
                        savelocalStorageData('hospital_code', item.organizationcode)
                        savelocalStorageData('logoHospital', item?.logo)
                        savelocalStorageData('nameHospital', item?.name)
                        savelocalStorageData('addressHospital', item?.address1)
                        setData({
                            "hospital": {
                                "name": `${item?.name}`,
                                "address1": `${item?.address1}`,
                                "logo": `${item?.logo}`
                            },
                        })
                        navigation.navigate("PatientDashboard")
                    }}

                    style={{
                        marginLeft: 15,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>


                    <View style={{ flexDirection: 'column', padding: 5, paddingVertical: H * 0.02 }}>
                        <Text style={{ fontSize: fontSizes.default, fontFamily: fontFamily.medium, color: 'black' }}>
                            {item.name}
                        </Text>

                    </View>
                </TouchableOpacity>

                <Divider
                    style={{ width: W, borderColor: 'black', borderWidth: 0.05 }} />
            </View>
        )
    }
    return (
        <View style={{
            height: H,
            width: W,
            backgroundColor: "white",

        }}>
            <HeaderTwo Title="Choose Hospital" />
            <View style={{


            }}>


                <View style={{

                    width: W,
                    backgroundColor: "white",
                }}>


                    <Divider
                        style={{
                            width: W,
                            borderColor: 'black',
                            borderWidth: 0.02
                        }} />
                    <FlatList
                        data={hospitals?.hospitals}
                        renderItem={renderItemHospitals}
                        keyExtractor={(item, index) => `${index}`}
                    />
                </View>
            </View>
        </View>
    )
}

export default ChangeHospitals