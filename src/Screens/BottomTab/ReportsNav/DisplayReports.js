import { View, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Divider, Text } from 'react-native-paper'
import { colors, fontSizes, H, W } from '../../../assets/Schemes/Schemes'
import HeaderTwo from '../../../assets/Schemes/HeaderTwo'
import Loader from '../../../assets/Loader/Loader'
import DataContext from '../../../assets/Context/DataContext'



const DisplayReports = ({ navigation, route }) => {

    useEffect(() => {
        getReports2()

    }, [])


    const { NbillNumberToBeFetched } = useContext(DataContext)

    const [reportsFilter, setReportsFilter] = useState(null)
    const [loader, setLoader] = useState(true)

    const [billNumberToBeFetched, setBillNumberToBeFetched] = NbillNumberToBeFetched

    const getReports2 = () => {
        const result = route?.params?.dataForDisaplyingBill
        //console.log("The Response of Api =======>", result)
        var myArr = []
        for (let i = 0; i < result.length; i++) {
            if (result[i]?.BillNumber == billNumberToBeFetched) {
                myArr.push(result[i])
            }
        }
        setReportsFilter(myArr)
        setLoader(false)
    }
    let previous;
    const renderItem = ({ item, index }) => {
        const getRandomColor = (arr) => {

            let current;
            do {
                current = arr[Math.floor(Math.random() * arr.length)];
            } while (current === previous)
            {
                previous = current
            }


            return current;
        }
        const date = new Date(item.BillDate)
        const day = date.getDate().toString().padStart(2, 0)
        const month = date.toLocaleString('default', { month: "short" })
        const year = date.getFullYear()
        return (
            <TouchableOpacity
                onPress={() => { navigation.navigate("DownloadReports", { 'reportNumber': item.ReportNumber }) }}
                style={{
                    padding:15,
                    width: W * 0.95,
                    justifyContent: "center",
                    backgroundColor: getRandomColor(["#27B99F", "#F1624B", colors.toobarcolor, colors.purplecolor]),
                    alignSelf: "center",
                    margin: 10,
                    borderRadius: 8,
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <View>
                        <Text style={{
                            color: "white"
                        }}>
                            Report Number :  {item.ReportNumber}
                        </Text>
                        <Text style={{
                            color: "white"
                        }}>
                            Report Name :  {item.ServiceName}
                        </Text>
                        <Text style={{
                            color: "white"
                        }}>
                            Date :  {day} {month}, {year}
                        </Text>
                    </View>

                </View>
            </TouchableOpacity>

        )
    }
return (
    loader ?
        <>
            <Loader />
        </> :

        <View style={{
        }}>
            <HeaderTwo Title="Reports List" />
            <View>
                <View style={{
                    height: H * 0.75
                }}>
                    {reportsFilter.length == 0
                        ?
                        <>
                            <Text style={{
                                alignSelf: "center",
                                marginTop: H * 0.4
                            }}>No Reports Found!</Text>
                        </>
                        :
                        <FlatList
                            data={reportsFilter}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => `_key${index}`}
                        />}
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("DisplayBill", { 'billNumber': billNumberToBeFetched })}
                    style={{
                        alignSelf: "center",
                        backgroundColor: "orange",
                        borderRadius: 8,
                        width: W * 0.95,
                        marginVertical: H * 0.01,
                        height: H * 0.05,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text style={{
                        color: "white",
                        alignSelf: "center",

                    }}>View Bill</Text>
                </TouchableOpacity>
            </View>
        </View>
)
}

export default DisplayReports