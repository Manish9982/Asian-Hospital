import { StyleSheet, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import { colors, fontFamily } from '../assets/Schemes/Schemes'
import Entypo from 'react-native-vector-icons/dist/Entypo'

export default function FoodCard({ name, price, image, quantity, onPressAddToCart, onPressMinus, totalPriceNeeded = false, productStatus = '1', availableQuantity, crossButtonPress = null, adjustQuantity }) {
    return (
        <View style={[styles.foodCard, { borderColor: productStatus == '1' ? '#fff' : colors.maroon, borderWidth: 1 }]}>
            <FastImage
                source={{ uri: image }}
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
            />
            {
                (quantity > availableQuantity)
                &&
                <TouchableOpacity
                    onPress={crossButtonPress}
                    style={styles.crossButtonContainer}>
                    <Entypo name='circle-with-cross' size={25} color={colors.maroon} />
                </TouchableOpacity>
            }
            <View style={styles.foodDetailsContainer}>
                <Text style={styles.foodName}>{name}</Text>
                <Text style={styles.priceText}>₹ {price}</Text>
                {
                    quantity == 0
                        ?
                        <>
                            {
                                productStatus == '1'
                                    ?
                                    <TouchableOpacity
                                        onPress={onPressAddToCart}
                                        style={styles.addToCartButton}>
                                        <Text style={styles.addText}>Add</Text>
                                    </TouchableOpacity>
                                    :
                                    <Text style={styles.notAvailableText}>Item not available</Text>
                            }
                        </>

                        :
                        <View>
                            <View style={styles.plusMinusBox}>
                                <TouchableOpacity
                                    onPress={onPressMinus}
                                    style={styles.plusMinusButton}>
                                    <Text style={styles.addText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{quantity}</Text>
                                <TouchableOpacity
                                    onPress={onPressAddToCart}
                                    style={styles.plusMinusButton}>
                                    <Text style={styles.addText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                (quantity > availableQuantity)
                                &&
                                <TouchableOpacity
                                    onPress={adjustQuantity}
                                    style={styles.setQuantityButton}>
                                    <Text style={styles.setQuantityText}>Set to {availableQuantity}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                }
                {
                    totalPriceNeeded
                    &&
                    <Text style={[styles.priceText, styles.totalPriceText]}>₹ {price * quantity}</Text>
                }
                {
                    (totalPriceNeeded && productStatus !== '1')
                    &&
                    <Text style={[styles.notAvailableText, styles.availableText]}>Available quantity: {availableQuantity}</Text>
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
        fontFamily: fontFamily.semibold,
        fontWeight: '600'
    },
    foodName:
    {
        fontFamily: fontFamily.semibold,
        fontWeight: '600'
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
    },
    totalPriceText:
    {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    notAvailableText:
    {
        color: colors.maroon
    },
    availableText:
    {
        fontSize: 14,
        width: '50%',
        marginTop: 5,
    },
    crossButtonContainer:
    {
        alignSelf: 'center',
        position: 'absolute',
        top: -5,
        right: -10,
        backgroundColor: '#fff',
        borderRadius: 100
    },
    setQuantityButton:
    {
        backgroundColor: colors.maroon,
        marginTop: 5,
        alignSelf:'flex-start',
        borderRadius:8,
        padding:5
    },
    setQuantityText:
    {
        fontSize:14,
        color: '#fff'
    }

})