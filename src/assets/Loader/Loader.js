import { View, Text, Animated, Easing } from 'react-native'
import React from 'react'
import { H, W } from '../Schemes/Schemes'

const Loader = () => {
    const spinValue = new Animated.Value(0);

    // First set up animation 
    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true  // To make use of native driver for performance
            }
        )
    ).start();

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return (
        <View style={{
            height: H,
            width: W,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
        }}>
            {/* <Image source={require('../Images/favicon.png')}
                style={{
                    height: H * 0.07,
                    width: H * 0.07,

                }}
            /> */}
            <Animated.Image
                style={{
                    height: H * 0.12,
                    width: H * 0.12,
                    transform: [{ rotate: spin }]
                }}
                source={require('../Images/favicon.png')} />

            {/* <LottieView source={require('./')} autoPlay loop /> */}
        </View>
    )
}

export default Loader;
