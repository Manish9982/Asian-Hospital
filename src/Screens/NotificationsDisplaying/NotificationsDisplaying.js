import { FlatList, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider, Text } from 'react-native-paper'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import { colors, convertTimestampTo12hFormat, convertTimestampToDateString, fontFamily, fontSizes, GetApiData, H, W } from '../../assets/Schemes/Schemes'
import Loader from '../../assets/Loader/Loader'

const NotificationsDisplaying = () => {

    const [data, setData] = useState(null)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        getNotificationList()
    }, [])

    const getNotificationList = async () => {
        const result = await GetApiData('notifications')
        setData(result)
        setLoader(false)
    }



    const renderItem = ({ item, index }) => {


        return (
            <>
                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={{
                        width: "95%",
                        alignSelf: "center",
                        borderColor: colors.toobarcolor,
                        borderWidth: 1,
                        borderRadius: 8,
                        marginVertical: H * 0.01,
                        paddingVertical: H * 0.01,
                        paddingHorizontal: W * 0.05
                    }}>
                    <Text style={{
                        fontFamily: fontFamily.semibold
                    }}>
                        {item.title} <Text>for</Text> {item.patient_name}
                    </Text>
                    <Text style={{
                        fontSize: fontSizes.EXTRASM,
                    }}>
                        ({convertTimestampToDateString(item?.created_at)} at {convertTimestampTo12hFormat(item?.created_at)})
                    </Text>
                    <Text>
                        Message: "{item.body}"
                    </Text>
                </TouchableOpacity>
                <Divider />
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