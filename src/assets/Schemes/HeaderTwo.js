
import { View, Text, StatusBar, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { Appbar, Divider } from 'react-native-paper'
import { colors, fontSizes, H, W } from './Schemes'
import { useNavigation } from '@react-navigation/native'
import { Constants } from './Constants'


const HeaderTwo = ({ Title, goBackScreen = null, color = colors.toobarcolor  }) => {
    const navigation = useNavigation()
    const backPress = () => {
        if (goBackScreen) {
            navigation.navigate(goBackScreen)
        }
        else {
            navigation.goBack()
        }
    }
    return (
        <View>
            <>
                <StatusBar backgroundColor={color} />

                <Appbar.Header style={{
                    backgroundColor: color,
                    justifyContent: "space-between"
                }}>
                    <Appbar.BackAction color={"white"} onPress={backPress} />
                    <Appbar.Content style={{
                        position: "absolute",
                        left: W * 0.14,
                    }}
                        title={<Text style={{
                            color: colors.white,
                            fontSize: fontSizes.default,
                            fontFamily: "Poppins-Medium",
                        }}>{Title}</Text>} />
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("AllLogos")
                    }}>
                        <Text style={{ position: "absolute", zIndex: 25 }}>{Constants.VERSION_TEXT}</Text>
                        <Image source={require('../Images/asianlogo.png')}
                            style={{
                                height: H * 0.08,
                                aspectRatio: 17 / 7,
                                resizeMode: 'contain'
                            }} />
                    </TouchableOpacity>

                </Appbar.Header>
            </>
        </View>
    )
}

export default HeaderTwo