import { View, Text, StatusBar, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { colors, H } from '../../assets/Schemes/Schemes'
import { useNavigation } from '@react-navigation/native'

const AllLogos = () => {

    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.goBack()
        }, 2200);
    }, [])

    return (
        <TouchableOpacity onPress={() => { navigation.goBack() }}  >
            <StatusBar backgroundColor={colors.toobarcolor} />
            <Image source={require('../../assets/Images/splash2.png')}
                style={{
                    height: H,
                    alignSelf: "center",
                    resizeMode: "cover"
                }} />
        </TouchableOpacity>
    )
}

export default AllLogos