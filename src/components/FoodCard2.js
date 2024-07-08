import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, fontSizes } from '../assets/Schemes/Schemes';

const FoodCard2 = ({ name, price, image, totalprice, quantity, 
    onPressAddButton, onPressMinusButton }) => {
    const [count, setCount] = useState(quantity);

   
    // const onPressSubtractButton = () => {
    //     if (count > 0) {
    //         setCount(count - 1);
    //     }
    // };

    return (
        <View style={styles.foodCard}>
            <Image
                source={{ uri: image }}
                style={styles.image}
            />

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.price}>₹ {price}</Text>

                <View style={styles.counterContainer}>
                    {quantity === 0 ? (
                        <TouchableOpacity style={styles.addButton} onPress={onPressAddButton}>
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.counter}>
                            <TouchableOpacity style={styles.counterButton} onPress={onPressMinusButton}>
                                <Text style={styles.counterButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.counterText}>{quantity}</Text>
                            <TouchableOpacity style={styles.counterButton} onPress={onPressAddButton}>
                                <Text style={styles.counterButtonText}>+</Text>
                            </TouchableOpacity>
                            <View style={styles.spacer} />
                            <Text style={styles.counterInfoText}>₹ {totalprice}</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    foodCard: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: colors.greencolor,
        fontWeight: '600',
        marginVertical: 4,
    },
    counterContainer: {
        marginTop: 8,
        alignItems: 'flex-start',
    },
    addButton: {
        backgroundColor: '#28a745',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterButton: {
        backgroundColor: '#e2e2e2',
        padding: 2,
        borderRadius: 4,
    },
    counterButtonText: {
        color: '#000',
        fontSize: fontSizes.default,
        width: 20,
        textAlign: 'center',
    },
    counterText: {
        marginHorizontal: 8,
        fontSize: fontSizes.SM,
        fontWeight:'600',
        color: colors.greencolor,
    },
    counterInfoText: {
        marginHorizontal: 8,
        fontSize: fontSizes.SM,
       fontWeight: '600',
        color: colors.greencolor,
    },
    spacer: {
        flex: 1,
    },
});

export default FoodCard2;
