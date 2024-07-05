import { StyleSheet, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import FastImage from 'react-native-fast-image'

export default function FoodCard() {
    return (
        <View style={styles.foodCard}>
            <FastImage/>
            <Text>Multigrain Cookies</Text>
            <Text>₹ 140</Text>
            <TouchableOpacity>
                <Text>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    foodCard:
    {
        width:'90%',
        alignSelf:'center',
        backgroundColor:'#fff',
        borderRadius:8,
        padding:8,
        marginTop:8,
    }
})