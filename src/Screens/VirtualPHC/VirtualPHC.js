import { View } from 'react-native'
import React from 'react'
import HeaderTwo from '../../assets/Schemes/HeaderTwo'
import { H } from '../../assets/Schemes/Schemes'
import { Text } from 'react-native-paper'

const VirtualPHC = ({navigation, route}) => {
    return (
        <View>
            <HeaderTwo Title="PHC" />
            <Text style={{
                alignSelf: "center",
                marginTop: H * 0.45,
            }}>{route?.params?.phcMessage}</Text>
        </View>
    )
}

export default VirtualPHC