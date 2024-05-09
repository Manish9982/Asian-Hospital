import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import More from './More';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import ContactUs from '../../ContactUs/ContactUs';


const Stack = createNativeStackNavigator();
const MoreNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="More" component={More} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
export default MoreNav
