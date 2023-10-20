
import { View, Text, StatusBar, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { Appbar, Divider } from 'react-native-paper'
import { colors, fontSizes, H, W } from './Schemes'
import { useNavigation } from '@react-navigation/native'
import { Constants } from './Constants'


const HeaderTwo = (props) => {
    const navigation = useNavigation()
    return (
        <View>
            <>
                <StatusBar backgroundColor={colors.toobarcolor} />
               
                <Appbar.Header style={{
                    backgroundColor: colors.toobarcolor,
                    justifyContent: "space-between"
                }}>
                    <Appbar.BackAction color={"white"} onPress={() => { navigation.goBack() }} />
                    <Appbar.Content style={{
                        position: "absolute",
                        left: W * 0.14,
                    }}
                        title={<Text style={{
                            color: colors.white,
                            fontSize: fontSizes.default,
                            fontFamily: "Poppins-Medium",
                        }}>{props.Title}</Text>} />
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("AllLogos")
                    }}>
                         <Text style={{position:"absolute", zIndex:25}}>{Constants.VERSION_TEXT}</Text>
                        <Image source={require('../Images/asianlogo.png')}
                            style={{
                                height: H * 0.08,
                                aspectRatio: 17 / 7,
                                resizeMode:'contain'
                            }} />
                    </TouchableOpacity>

                </Appbar.Header>
            </>
        </View>
    )
}

export default HeaderTwo