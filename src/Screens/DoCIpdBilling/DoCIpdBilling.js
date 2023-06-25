import { FlatList, Modal, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider, Text } from 'react-native-paper'
import DoCIpdBillingList from './DoCIpdBillingList'
import { colors, fontFamily, fontSizes, GetApiData, getLocalStorageData, H, PostApiData, W } from '../../assets/Schemes/Schemes'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import Loader from '../../assets/Loader/Loader'
import { spacing } from '../../components/Spacing'

const DoCIpdBilling = () => {


    const [data, setData] = useState([])
    const [hospitals, setHospitals] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [hospitalName, setHospitalName] = useState("")
    const [hospitalID, setHospitalID] = useState("")
    const [hospitalCode, setHospitalCode] = useState("")
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        getIpdPatientsListFirstTime()
        //getIpdPatientsList()
    }, [])

    const styles = StyleSheet.create({
        fontsPatientCount:
        {
            textAlign: 'center',
            padding: spacing.small,
        },
        containerPatientCount:
        {
            width: W * 0.4,
            alignSelf: 'flex-end',
            marginHorizontal: spacing.medium,
            borderRadius: 8,
        }
    })


    const getIpdPatientsList = async (organizationCode) => {
        setLoader(true)
        const temp = await getLocalStorageData('doctorCode')
        var formdata = new FormData()
        formdata.append("hospital_code", organizationCode)
        formdata.append("doctor_code", temp)
        // formdata.append("hospital_code", "H01")
        // formdata.append("doctor_code", "D00003")
        const result = await PostApiData('ipddata', formdata)
        setData(result)
        setLoader(false)
    }
    const getIpdPatientsListFirstTime = async () => {
        setLoader(true)
        const temp = await getLocalStorageData('doctorCode')
        const temp2 = await getLocalStorageData('hospital_code')
        const temp3 = await getLocalStorageData('HNAME')
        var formdata = new FormData()
        // formdata.append("hospital_code", organizationCode)
        formdata.append("hospital_code", temp2)
        formdata.append("doctor_code", temp)
        // formdata.append("hospital_code", "H01")
        // formdata.append("doctor_code", "D00003")
        const result = await PostApiData('ipddata', formdata)
        setData(result)
        // console.log(result)
        setLoader(false)
        setHospitalName(temp3)
        setHospitalCode(temp2)
    }

    const setValuetoText = (hospitalName, ID, organizationCode) => {
        setModalVisible(false)
        setHospitalID(ID)
        setHospitalName(hospitalName)
        setHospitalCode(organizationCode)
        getIpdPatientsList(organizationCode)
        // console.log("HospitalCode", ID)
    }


    const renderItemHospitals = ({ item, index }) => {
        return (

            <View>
                <TouchableOpacity

                    onPress={() => {
                        setValuetoText(item.name, JSON.stringify(item.id), item.organizationcode)
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
                            {item?.name}
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

    const openHospitallist = async () => {

        const result = await GetApiData('hospitals')
        // console.log("Hospitals===", result)
        setHospitals(result)
        setModalVisible(true)

    }

    return (
        loader
            ?
            <Loader />
            :
            <View style={{
                height: H,
                width: W
            }}>
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
                <HeaderTwo Title="IPD Patients" />
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
                {data?.ipdPatients?.length == 0 &&
                    <Text style={{
                        alignSelf: "center",
                        marginTop: H * 0.3,
                        textAlign: "center"
                    }}>{"No Patients Found..\nPlease Select/Change The Hospital"}</Text>}
                <View style={{
                    paddingBottom: H * 0.3
                }}>
                    {
                        data?.ipdPatients?.length !== 0 &&
                        <View style={[styles.containerPatientCount, { backgroundColor: data?.count_bg_color }]}>
                            <Text style={[styles.fontsPatientCount, { color: data?.count_text_color }]}>No. of patients:
                                <Text style={[styles.fontsPatientCount, { color: data?.count_text_color }]}> {data?.countIPD}</Text>
                            </Text>
                        </View>

                    }

                    <DoCIpdBillingList data={data?.ipdPatients} />
                </View>
            </View>
    )
}

export default DoCIpdBilling