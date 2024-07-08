import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Animated, TouchableOpacity, Modal, Easing } from 'react-native';
import { Badge, FAB, Searchbar, Text } from 'react-native-paper';
import FoodCard from '../components/FoodCard';
import { GetApiData, PostApiData, colors } from '../assets/Schemes/Schemes';
import FastImage from 'react-native-fast-image';
import HeaderTwo from '../assets/Schemes/HeaderTwo';
import Loader from '../assets/Loader/Loader';
import DataContext from '../assets/Context/DataContext';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.45; // Adjust the item size as needed
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2; // Spacers to center the items

const FoodDashboard = () => {
    const [hubsList, setHubsList] = useState(null)
    const [foodItems, setFoodItems] = useState(null)
    const [hubName, setHubName] = useState(null)
    const [filteredFoodItems, setFilteredFoodItems] = useState([]);
    const [loaderItem, setLoaderItem] = useState(false)
    const [loader, setLoader] = useState(true)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const { addToCart, removeFromCart, getCountForItem, Ncart } = useContext(DataContext)
    const [cart, setCart] = Ncart
    useEffect(() => { getHubsList() }, [])

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

    const handleMomentumScrollEnd = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.floor(offsetX / (ITEM_SIZE));
        setHubName(hubsList[currentIndex + 1]?.pos_name)
        getItemsList(hubsList[currentIndex + 1]?.pos_code)
    };

    const getHubsList = async () => {
        const result = await GetApiData('all_hub_list')
        if (result?.status == '200') {
            setHubsList([{ key: 'left-spacer', pos_code: result?.data[0]?.pos_code }, ...result?.data, { key: 'right-spacer', pos_code: result?.data[result?.data?.length - 1]?.pos_code },])
            getItemsList(result?.data[0]?.pos_code)
        }
        setLoader(false)
    }

    const getItemsList = async (code) => {
        setLoaderItem(true)
        var formdata = new FormData()
        formdata.append('pos_code', code)
        const result = await PostApiData('hub_item_list', formdata)
        if (result?.status == '200') {
            setFoodItems(result?.data)
            setFilteredFoodItems(result?.data)
        }
        setLoaderItem(false)
    }

    const handlePress = (index) => {
        flatListRef.current.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5 // Centers the item
        });
    };

    const renderFoodCard = ({ item, index }) => {
        return (
            <FoodCard
                name={item?.product_name}
                price={item?.product_price}
                image={item?.product_image}
                code={item?.itemno}
                quantity={getCountForItem(item)}
                onPressAddToCart={() => addToCart(item)}
                onPressMinus={() => removeFromCart(item?.itemno)}
            />
        )
    }

    const initiateSearch = (query) => {
        if (query.trim() === '') {
            setFilteredFoodItems(foodItems); // Reset to original items when search query is empty
        } else {
            const lowerCaseQuery = query.toLowerCase();
            const filteredFoods = foodItems.filter(food =>
                food.product_name.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredFoodItems(filteredFoods);
        }
    };

    return (
        <>
            <HeaderTwo Title={"Order Food"} />
            <Modal
                visible={loaderItem}
                transparent={true}
            >
                <View style={styles.loader}>
                    <Animated.Image
                        style={{
                            height: '12%',
                            aspectRatio: 1,
                            transform: [{ rotate: spin }]
                        }}
                        source={require('../assets/Images/favicon.png')} />
                </View>
            </Modal>
            {
                loader
                    ?
                    <Loader />
                    :
                    <View style={styles.container}>
                        {
                            !isSearchActive
                            &&
                            <View>
                                <Animated.FlatList
                                    ref={flatListRef}
                                    data={hubsList}
                                    keyExtractor={(item, index) => `${index}`}
                                    horizontal
                                    decelerationRate={0.8}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.contentContainerStyle}
                                    snapToInterval={ITEM_SIZE * 1.2}
                                    onMomentumScrollEnd={handleMomentumScrollEnd}
                                    bounces={false}
                                    onScroll={Animated.event(
                                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                        { useNativeDriver: true }
                                    )}
                                    renderItem={({ item, index }) => {
                                        if (item.key === 'left-spacer' || item.key === 'right-spacer') {
                                            return <View style={{ width: SPACER_ITEM_SIZE }} />;
                                        }

                                        const inputRange = [
                                            (index - 2) * ITEM_SIZE,
                                            (index - 1) * ITEM_SIZE,
                                            index * ITEM_SIZE,
                                        ];

                                        const scale = scrollX.interpolate({
                                            inputRange,
                                            outputRange: [0.8, 1.2, 0.8],
                                            extrapolate: 'clamp'
                                        });

                                        const opacity = scrollX.interpolate({
                                            inputRange,
                                            outputRange: [0.5, 1, 0.5],
                                            extrapolate: 'clamp'
                                        });
                                        return (
                                            <TouchableOpacity
                                                onPress={() => handlePress(index)}
                                                activeOpacity={1}
                                            >
                                                <Animated.View style={[
                                                    styles.item,
                                                    {
                                                        transform: [{ scale }],
                                                        opacity,
                                                    }
                                                ]}>
                                                    <FastImage
                                                        style={styles.image}
                                                        source={{
                                                            uri: item?.image,
                                                            priority: FastImage.priority.normal,
                                                        }}
                                                        resizeMode={FastImage.resizeMode.contain}
                                                    />
                                                </Animated.View>
                                            </TouchableOpacity>
                                        );
                                    }}
                                />
                            </View>
                        }
                        <Searchbar
                            placeholder={`Search ${hubName}`}
                            placeholderTextColor={colors.darkgray}
                            style={[styles.searchBar, { marginTop: isSearchActive ? 10 : 0 }]}
                            onFocus={() => setIsSearchActive(true)}
                            onBlur={() => setIsSearchActive(false)}
                            onChangeText={(t) => initiateSearch(t)}
                        />
                        <View style={{ flex: 1, paddingBottom: 5 }}>
                            <FlatList
                                data={filteredFoodItems}
                                renderItem={renderFoodCard}
                                keyExtractor={(item, index) => `${index}`}
                            />
                        </View>
                        <View style={styles.fabContainer}>
                            {
                                cart?.length !== 0
                                &&
                                <Badge visible={true} style={styles.badge}>
                                    {cart?.length}
                                </Badge>
                            }
                            <FAB
                                color={'#fff'}
                                icon={'cart'}
                                collapsable={true}
                                style={styles.fab} />
                        </View>
                    </View>
            }

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    itemText: {
        color: '#fff',
        fontSize: 24
    },
    image:
    {
        width: ITEM_SIZE * 0.8,
        height: ITEM_SIZE * 0.8,
        borderRadius: 8,
    },
    searchBar:
    {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        backgroundColor: '#fff',
        marginBottom: 8
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
    }
});

export default FoodDashboard;
