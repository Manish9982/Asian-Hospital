import { View, TouchableOpacity, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { Appbar, Text } from 'react-native-paper'
import { colors, fontSizes, W } from './Schemes'


const Header = (props) => {
    const navigation = useNavigation()
    return (
        <>
            <StatusBar backgroundColor={colors.toobarcolor} />
            <Appbar.Header style={styles.appBar}>
                <Appbar.BackAction color={colors.toobarcolor} style={{ backgroundColor: "white" }} onPress={() => { navigation.goBack() }} />
                <Appbar.Content style={{ alignItems: "center", marginRight: W * 0.125 }}
                    title={<Text style={{ color: "white", fontSize: fontSizes.XL, fontFamily: "Poppins-SemiBold" }}>{props.Title}</Text>} />
            </Appbar.Header>
        </>
    )
}

const styles = StyleSheet.create({
    appBar:
    {
        backgroundColor: colors.toobarcolor,
        width: W
    }
})

export default Header