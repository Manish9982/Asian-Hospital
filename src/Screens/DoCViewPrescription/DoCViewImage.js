import { View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, fontFamily, fontSizes, H, W } from '../../assets/Schemes/Schemes'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native-paper'


const DoCViewImage = (props) => {

    const navigation = useNavigation()

    const renderItem = ({ item, index }) => {
        return (

            <View style={{

            }}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate("DoCImageViewer", { "link": `${props.Link}${item.prescription_image}` }) }}
                    style={{
                        height: W * 0.38,
                        width: W * 0.38,
                        marginVertical: H * 0.02,
                        marginHorizontal: H * 0.025,
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: colors.toobarcolor
                    }}>

                    <Image source={{ uri: `${props.Link}${item.prescription_image}` }}
                        style={{
                            height: W * 0.35,
                            width: W * 0.35,
                            borderRadius: 8,
                            resizeMode: 'stretch'
                        }}
                    />

                </TouchableOpacity>
                <Text style={{
                    fontSize: fontSizes.XXXXSM,
                    width: W * 0.35,
                    textAlign: "center",
                    alignSelf: "center"
                }}>{item?.upload_date}</Text>
            </View>
        )

    }


    // console.log("Req== ", props?.ImageData)

    return (
        <View>
            <FlatList
                columnWrapperStyle={{
                    justifyContent: "space-evenly"
                }}
                numColumns={2}
                data={props?.ImageData}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}`} />

        </View>
    )
}

export default DoCViewImage