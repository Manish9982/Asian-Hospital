import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Platform, Dimensions, Animated, TouchableOpacity, Alert } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { GetApiData, H, PostApiData, W, colors, fontFamily, fontSizes } from '../assets/Schemes/Schemes';
import HeaderTwo from '../assets/Schemes/HeaderTwo';
import FoodCard2 from '../components/FoodCard2';
import LinearGradient from 'react-native-linear-gradient'
const { height, width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.45; // Adjust the item size as needed
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const FoodCart = () => {
    const { width, height } = Dimensions.get('window');

    const [cartList, setCartList] = useState(null)
    const [price, setPrice] = useState(null)
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => { getCartDetails() }, [price])

    const getCartDetails = async () => {
        try {
            const result = await GetApiData('cart_details');
            console.log("result", result)
            if (result?.status == 200) {
                setCartList(result.data.orders);
                // setCartList([]);
                setPrice(result.data.order_total)
                // Alert.alert("hello")
            } else {
                Alert.alert('Error', result?.message || 'Something went wrong');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch data');
        }
    };
    const onPressPlus = async (item) => {
        var formdata = new FormData()
        formdata.append('product_name', item?.product_name)
        formdata.append('itemno', item?.itemno)
        formdata.append('product_price', item?.product_price)
        formdata.append('quantity', '1')
        formdata.append('pos_code', "")
        const result = await PostApiData('add_to_cart', formdata)
        await getCartDetails()


        if (result?.status == '200') {
            //setFoodItems(result?.data)



        }
    }
    const onPressMinus = async (item) => {
        var formdata = new FormData()
        formdata.append('product_name', item?.product_name)
        formdata.append('itemno', item?.itemno)
        formdata.append('product_price', item?.product_price)
        formdata.append('quantity', '-1')
        formdata.append('pos_code', "")
        const result = await PostApiData('add_to_cart', formdata)
        await getCartDetails()


        if (result?.status == '200') {
            //setFoodItems(result?.data)



        }
    }

    const renderFoodCard = ({ item }) => {
        console.log("items ", item)
        return (
            <FoodCard2
                name={item.product_name}
                price={item.product_price}
                image={item.product_image}
                totalprice={item.total_price}
                quantity={item.quantity}
                onPressAddButton={() => onPressPlus(item)}
                onPressMinusButton={() => onPressMinus(item)}
            />
        )
    }







    return (

        <View style={styles.container}>
            <HeaderTwo Title="Review Order" />
            <FlatList
                data={cartList}
                renderItem={renderFoodCard}
                keyExtractor={(item, index) => `${index}`}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
            />


            <View style={styles.totalSection}>


                <TouchableOpacity
                    onPress={() => { console.log("Clicked") }}
                    style={styles.payButtonContainer}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#00AEEF', '#00AEEF', '#00AEEF']}
                        style={styles.payButtonGradient}
                    >
                        <View style={styles.payButtonContent}>
                            <View style={styles.priceContainer}>
                                <Text style={styles.payButtonPriceText}>₹ {price}</Text>
                                <Text style={styles.totalText}>Total</Text>
                            </View>
                            <View style={styles.payButtonTextContainer}>
                                <Text style={styles.payButtonText}>Proceed to Pay</Text>
                                <FontAwesome name="arrow-right" size={16} color="#fff" style={styles.arrowIcon} />
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: ITEM_SIZE,
        height: ITEM_SIZE / 1.4, // Adjust height as needed
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    totalText: {
        fontSize: fontSizes.default,
        textAlign: 'center',
        fontWeight: '600',
        color: '#fff',
    },
    flatListContent: {
        paddingBottom: 10, // Adjust based on your design needs
    },
    contentContainerStyle: {
        paddingBottom: 200,
        // Ensure space for the summary section
    },

    itemText: {
        color: '#fff',
        fontSize: 24
    },
    arrowIcon: {
        marginLeft: 5,
    },
    payButtonTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    payButtonContainer: {
        marginBottom: height * 0.02
    },
    payButtonGradient: {
        borderRadius: 8,
        height: height * 0.07,
        justifyContent: 'center'// Adjust the value as needed
        // Your existing styles
    },
    image:
    {
        width: ITEM_SIZE * 0.8,
        height: ITEM_SIZE * 0.8,
        borderRadius: 8,
    },

    payButtonContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    payButtonPriceText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: fontSizes.XL,
    },
    totalButtonPriceText: {
        color: colors.white,
        fontFamily: fontFamily.medium,
        fontSize: fontSizes.default,
    },
    payButtonText: {
        color: colors.white,
        fontFamily: fontFamily.medium,
        fontSize: fontSizes.XL,
    },
    contentContainerStyle:
    {
        alignItems: 'center',
        height: ITEM_SIZE * 1.2
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 16,
    },
    totalSection: {
        margin: 20,

        //alignItems: 'center',
    },
    totalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    totalItemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black
    },
    totalAmountText: {
        fontWeight: 'bold',
        color: colors.greencolor
    },
    payButton: {
        backgroundColor: '#007bff',
        marginTop: 16,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default FoodCart;
