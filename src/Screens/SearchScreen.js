import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Animated, Modal, Easing } from 'react-native';
import { Badge, FAB, Searchbar, Text } from 'react-native-paper';
import FoodCard from '../components/FoodCard';
import { GetApiData, PostApiData, W, colors } from '../assets/Schemes/Schemes';
import HeaderTwo from '../assets/Schemes/HeaderTwo';
import DataContext from '../assets/Context/DataContext';

const SearchScreen = ({ navigation, route }) => {
    const [foodItems, setFoodItems] = useState(null)
    const [filteredFoodItems, setFilteredFoodItems] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false)
    const flatListRef2 = useRef(null);
    const { addToCart, removeFromCart, getCountForItem, Ncart, getFullCount } = useContext(DataContext)
    const [cart, setCart] = Ncart
    useEffect(() => { getAllItems() }, [])

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

    const getAllItems = async () => {
        setFoodItems(route?.params?.allData); // Wait for setFoodItems to complete
        setFilteredFoodItems(route?.params?.allData);
    }

    const renderFoodCard = ({ item, index }) => {
        return (
            <FoodCard
                name={item?.product_name}
                price={item?.product_price}
                image={item?.product_image}
                code={item?.itemno}
                quantity={getCountForItem(item)}
                onPressAddToCart={() => addToCart(item, item?.POS_CODE)}
                onPressMinus={() => removeFromCart(item?.itemno)}
                productStatus={item.product_status}
            />
        )
    }

    const initiateSearch = (query) => {
        if (query?.trim() === '') {
            setFilteredFoodItems(foodItems); // Reset to original items when search query is empty
        } else {
            const lowerCaseQuery = query.toLowerCase();
            const filteredFoods = foodItems.filter(food =>
                food.product_name.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredFoodItems(filteredFoods);
        }
    };

    const onPressFab = async () => {
        var formdata = new FormData()
        for (let i = 0; i < cart.length; i++) {
            formdata.append('items[]', JSON.stringify(cart[i]))
        }
        const result = await PostApiData('bulk_add_to_cart', formdata)
        console.log(result)
        if (result?.status == '200') {
            navigation.navigate('FoodCart')
        }
    }
    return (
        <>
            <HeaderTwo Title={"Search All Hubs"} />
            <View style={styles.container}>
                <View style={styles.searchBarContainer}>
                    <Searchbar
                        placeholder={`Search All Hubs`}
                        placeholderTextColor={colors.darkgray}
                        style={[styles.searchBar, { marginTop: isSearchActive ? 10 : 0 }]}
                        onChangeText={(t) => initiateSearch(t)}
                    />
                </View>
                <View style={{ flex: 1, padding: 10, paddingBottom: 15 }}>
                    <FlatList
                        ref={flatListRef2}
                        data={filteredFoodItems}
                        renderItem={renderFoodCard}
                        keyExtractor={(item, index) => `${index}`}
                    />
                </View>
                {
                    cart?.length !== 0
                    &&
                    <View style={styles.fabContainer}>
                        <Badge visible={true} style={styles.badge}>
                            {getFullCount()}
                        </Badge>
                        <FAB
                            onPress={onPressFab}
                            color={'#fff'}
                            icon={'cart'}
                            collapsable={true}
                            style={styles.fab} />
                    </View>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemText: {
        color: '#fff',
        fontSize: 24
    },
    contentContainerStyle:
    {
        alignItems: 'center',
        height: 150,
    },
    loader:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    fab:
    {
        backgroundColor: colors.toobarcolor2
    },
    fabContainer:
    {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    badge:
    {
        zIndex: 10,
        position: 'absolute',
        right: 4,
        top: 4
    },
    searchBar:
    {
        width: W * 0.9,
        backgroundColor: '#fff',
    },
    searchBarContainer:
    {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    }
});

export default SearchScreen;
