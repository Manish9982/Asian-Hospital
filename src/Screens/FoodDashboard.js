import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import FoodCard from '../components/FoodCard';
import { GetApiData } from '../assets/Schemes/Schemes';
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.45; // Adjust the item size as needed
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2; // Spacers to center the items

const data = [
    { key: 'left-spacer' },
    { key: '1' },
    { key: '2' },
    { key: '3' },
    { key: '4' },
    { key: '5' },
    { key: 'right-spacer' }
];

const DATA = [
    {
        id: '1',
        food_name: 'Burger',

    }
]

const FoodDashboard = () => {
    const [hubsList, setHubsList] = useState(null)
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    useEffect(() => { getHubsList() }, [])

    const getHubsList = async () => {
        const result = await GetApiData('all_hub_list')
        if (result?.status == '200') {
            setHubsList([{ key: 'left-spacer' }, ...result?.data, { key: 'right-spacer' },])
        }
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
            <FoodCard />
        )
    }

    return (
        <View style={styles.container}>
            <Animated.FlatList
                ref={flatListRef}
                data={hubsList}
                keyExtractor={(item, index) => `${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}
                snapToInterval={ITEM_SIZE * 1.1}
                decelerationRate={0.8}
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
                                    //borderRadius: opacity * 10
                                    // Primary and secondary colors
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
            <Searchbar
                style={styles.searchBar}
            />
            <FlatList
                data={hubsList}
                renderItem={renderFoodCard}
                keyExtractor={(item, index) => `${index}`}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
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
        alignSelf:'center',
        borderRadius:15,
        backgroundColor:'#fff'
    },
    contentContainerStyle:
    {
        alignItems: 'center',
        height: ITEM_SIZE * 1.2
    }
});

export default FoodDashboard;
