import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorDashboard from './DoctorDashboard';
const Stack = createNativeStackNavigator();


const HomeNav = () => {
    return (
        <>
            <Stack.Navigator>
                {<Stack.Screen name="DoctorDashboard" component={DoctorDashboard} options={{ headerShown: false }} /> }
                {/* <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> */}
            </Stack.Navigator>
        </>
    )
}

export default HomeNav