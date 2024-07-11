import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Animated, TouchableOpacity, Modal, Easing, Alert, Platform } from 'react-native';
import { Badge, FAB, Searchbar, Text } from 'react-native-paper';
import FoodCard from '../components/FoodCard';
import { GetApiData, PostApiData, W, colors } from '../assets/Schemes/Schemes';
import FastImage from 'react-native-fast-image';
import HeaderTwo from '../assets/Schemes/HeaderTwo';
import Loader from '../assets/Loader/Loader';
import DataContext from '../assets/Context/DataContext';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.45; // Adjust the item size as needed
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2; // Spacers to center the items

const FoodDashboard = ({ navigation }) => {
    const [hubsList, setHubsList] = useState(null)
    const [foodItems, setFoodItems] = useState(null)
    const [loader, setLoader] = useState(true)
    const [hubName, setHubName] = useState('')
    const [filteredFoodItems, setFilteredFoodItems] = useState([]);
    const [loaderItem, setLoaderItem] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [posCode, setPosCode] = useState("")
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const { addToCart, removeFromCart, getCountForItem, Ncart, getFullCount } = useContext(DataContext)
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

    const handleMomentumScrollEnd = async (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Platform.OS == "ios" ? Math.floor((offsetX / (ITEM_SIZE)) + 0.1) : Math.floor(offsetX / (ITEM_SIZE));;
        setHubName(hubsList[currentIndex + 1]?.pos_name)
        console.log('handleMomentumScrollEnd re-render issue ===>')
        await getItemsList(hubsList[currentIndex + 1]?.pos_code)
    };

    const getHubsList = async () => {
        const result = await GetApiData('all_hub_list')
        if (result?.status == '200') {
            setHubsList([{ key: 'left-spacer', pos_code: result?.data[0]?.pos_code }, ...result?.data, { key: 'right-spacer', pos_code: result?.data[result?.data?.length - 1]?.pos_code },])
            setLoader(false)
            await getItemsList(result?.data[0]?.pos_code)
            setHubName(result?.data[0]?.pos_name)
        }
    }

    const getItemsList = async (code) => {
        try {
            setLoaderItem(true);
            const formdata = new FormData();
            formdata.append('pos_code', code);
            const result = await PostApiData('hub_item_list', formdata);

            if (result?.status == '200') {
                setFoodItems(result?.data); // Wait for setFoodItems to complete
                setFilteredFoodItems(result?.data);
                setPosCode(code)
            }
        } catch (error) {
            Alert.alert('Error fetching items:', error);
        } finally {
            setLoaderItem(false); // Always set loaderItem to false at the end
        }
    };


    const handlePress = (index) => {
        flatListRef.current.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5 // Centers the item
        });
        getItemsList(hubsList[index]?.pos_code)
    };

    const renderFoodCard = ({ item, index }) => {
        return (
            <FoodCard
                name={item?.product_name}
                price={item?.product_price}
                image={item?.product_image}
                code={item?.itemno}
                quantity={getCountForItem(item)}
                onPressAddToCart={() => addToCart(item, posCode)}
                onPressMinus={() => removeFromCart(item?.itemno)}
                productStatus={item.product_status}
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

    const onPressFab = async () => {
        var formdata = new FormData()
        for (let i = 0; i < cart.length; i++) {
            formdata.append('items[]', JSON.stringify(cart[i]))
        }
        const result = await PostApiData('bulk_add_to_cart', formdata)
        if (result?.status == '200') {
            navigation.navigate('FoodCart')
        }
    }
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
                                    snapToInterval={ITEM_SIZE}
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
                                            (index) * ITEM_SIZE,
                                        ];

                                        const scale = scrollX.interpolate({
                                            inputRange,
                                            outputRange: [0.8, 1.1, 0.8],
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
                        <View style={styles.searchBarContainer}>
                            <Searchbar
                                placeholder={`Search ${hubName}`}
                                placeholderTextColor={colors.darkgray}
                                style={[styles.searchBar, { marginTop: isSearchActive ? 10 : 0 }]}
                                onFocus={() => setIsSearchActive(true)}
                                onBlur={() => setIsSearchActive(false)}
                                onChangeText={(t) => initiateSearch(t)}
                            />
                        </View>
                        <View style={{ flex: 1, padding: 10, paddingBottom: 15 }}>
                            <FlatList
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
        alignItems: 'center'
    }
});

export default FoodDashboard;
