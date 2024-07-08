import { StyleSheet, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import { colors, fontFamily } from '../assets/Schemes/Schemes'

export default function FoodCard({ name, price, image, quantity, code, onPressAddToCart, onPressMinus }) {
    return (
        <View style={styles.foodCard}>
            <FastImage
                source={{ uri: image }}
                style={styles.image}
            />
            <View style={styles.foodDetailsContainer}>
                <Text style={styles.foodName}>{name}</Text>
                <Text style={styles.priceText}>₹ {price}</Text>
                {
                    quantity == 0
                        ?
                        <TouchableOpacity
                            onPress={onPressAddToCart}
                            style={styles.addToCartButton}>
                            <Text style={styles.addText}>Add</Text>
                        </TouchableOpacity>
                        :
                        <View style={styles.plusMinusBox}>
                            <TouchableOpacity
                                onPress={onPressAddToCart}
                                style={styles.plusMinusButton}>
                                <Text style={styles.addText}>+</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity
                                onPress={onPressMinus}
                                style={styles.plusMinusButton}>
                                <Text style={styles.addText}>-</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    foodCard:
    {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        marginTop: 8,
        flexDirection: 'row',
        flex: 3,
    },
    image:
    {
        // height: 40,
        // width: 80,
        flex: 1,
        borderRadius: 8,
    },
    foodDetailsContainer:
    {
        flex: 2,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    addToCartButton: {
        backgroundColor: colors.toobarcolor,
        borderRadius: 8,
        alignItems: 'center',
        width: '35%',
        justifyContent: 'center'
    },
    addText:
    {
        color: '#fff',
    },
    priceText:
    {
        color: colors.greencolor,
        fontFamily: fontFamily.semibold
    },
    foodName:
    {
        fontFamily: fontFamily.semibold
    },
    plusMinusBox:
    {
        flexDirection: 'row'
    },
    plusMinusButton:
    {
        backgroundColor: colors.orangecolor,
        borderRadius: 23 / 2,
        width: 23,
        height: 23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText:
    {
        marginHorizontal: 8
    }
})