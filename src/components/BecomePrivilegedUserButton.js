import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BecomePrivilegedUserButton = ({ style, onPress }) => {
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.button}>
                <Icon name="crown" size={15} color="white" style={styles.icon} />
                <Text
                    numberOfLines={1}
                    style={styles.buttonText}>Become Privileged</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 10,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: 'rgba(232, 191, 56, 0.8)',
        borderRadius: 30,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderColor: 'rgba(232, 191, 56, 1)',
        borderWidth: 2
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 5,
    },
    icon: {
    },
});

export default BecomePrivilegedUserButton;