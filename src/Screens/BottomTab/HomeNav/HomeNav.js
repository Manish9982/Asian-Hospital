import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home'
import PatientDashboard from './PatientDashboard';

const Stack = createNativeStackNavigator();


const HomeNav = () => {
    return (
        <>
            <Stack.Navigator>
                {<Stack.Screen name="PatientDashboard" component={PatientDashboard} options={{ headerShown: false }} /> }
                {/* <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> */}
            </Stack.Navigator>
        </>
    )
}

export default HomeNav