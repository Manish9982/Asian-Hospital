import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Doctor from './Doctor';
import Appointments from './Appointments';




const Stack = createNativeStackNavigator();

const AppointmentsNav = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="Appointments" component={Appointments} options={{ headerShown: false }} />

                {/* <Stack.Screen name="Doctor" component={Doctor} options={{ headerShown: false }} /> */}
            </Stack.Navigator>
        </>
    )
}

export default AppointmentsNav