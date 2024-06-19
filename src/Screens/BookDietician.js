import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Animated, Easing, Platform, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from 'react-native-paper';
import HeaderTwo from '../assets/Schemes/HeaderTwo'

const BookDietician = () => {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == "ios");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [frequency, setFrequency] = useState('');
    const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);
    const dropdownHeight = useState(new Animated.Value(0))[0];
    const [appointments, setAppointments] = useState([]);

    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM'];

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        if (Platform.OS == "android") {
            setShowDatePicker(false);
        }
        setDate(currentDate);
    };

    const toggleFrequencyDropdown = () => {
        setShowFrequencyDropdown(!showFrequencyDropdown);
        Animated.timing(dropdownHeight, {
            toValue: showFrequencyDropdown ? 0 : 100, // Adjust the height value as per the number of dropdown options
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();
    };

    const selectFrequency = (value) => {
        setFrequency(value);
        toggleFrequencyDropdown();
    };

    const generateAppointments = () => {
        if (!selectedTimeSlot || !frequency) return;

        let appointmentList = [];
        let currentDate = new Date(date);

        for (let i = 0; i < 5; i++) {
            appointmentList.push({
                date: new Date(currentDate),
                time: selectedTimeSlot,
            });
            currentDate.setDate(currentDate.getDate() + (frequency === 'Weekly' ? 7 : 30));
        }
        setAppointments(appointmentList);
    };

    useEffect(() => {
        generateAppointments();
    }, [date, selectedTimeSlot, frequency]);

    return (
        <>
            <HeaderTwo Title="Book Visits" />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>📅 Let's Schedule Your Visits!</Text>
                <Text style={styles.message}>
                    Choose your preferred <Text style={styles.highlight}>date</Text>, <Text style={styles.highlight}>time slot</Text>, and <Text style={styles.highlight}>frequency</Text> for your sessions.
                </Text>
                <Text style={styles.message}>
                    🌟 You can set your visits to be <Text style={styles.highlight}>weekly</Text> or <Text style={styles.highlight}>monthly</Text>.
                </Text>
                <Text style={styles.message}>
                    Don't worry, you can always <Text style={styles.highlight}>change your schedule later</Text> if needed. Let's make this journey enjoyable and flexible for you! 😊
                </Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Choose Date</Text>
                    {/* <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                        <Text style={styles.dateText}>{date.toDateString()}</Text>
                    </TouchableOpacity> */}
                    {showDatePicker && (
                        <DateTimePicker
                            style={styles.dateTimePicker}
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                    <Text style={styles.label}>Select Time Slot</Text>
                    <ScrollView horizontal contentContainerStyle={styles.timeSlotsContainer}>
                        {timeSlots.map((slot, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.timeSlot,
                                    selectedTimeSlot === slot && styles.selectedTimeSlot,
                                ]}
                                onPress={() => setSelectedTimeSlot(slot)}
                            >
                                <Text style={styles.timeSlotText}>{slot}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Text style={styles.label}>Frequency</Text>
                    <TouchableOpacity onPress={toggleFrequencyDropdown} style={styles.dropdown}>
                        <Text style={styles.dropdownText}>{frequency || 'Select Frequency'}</Text>
                    </TouchableOpacity>
                    <Animated.View style={[styles.dropdownOptions, { height: dropdownHeight }]}>
                        <TouchableOpacity onPress={() => selectFrequency('Weekly')} style={styles.dropdownOption}>
                            <Text style={styles.dropdownOptionText}>Weekly</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectFrequency('Monthly')} style={styles.dropdownOption}>
                            <Text style={styles.dropdownOptionText}>Monthly</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                {
                    appointments.length > 0 &&
                    <Text style={styles.label}>Appointments</Text>
                }
                {appointments.length > 0 && appointments.map((appointment, index) => (
                    <View key={index} style={styles.appointment}>
                        <Text style={styles.appointmentText}>
                            {appointment.date.toDateString()} - {appointment.time}
                        </Text>
                    </View>
                ))}
                <TouchableOpacity style={styles.paymentButton}>
                    <Text style={styles.paymentButtonText}>Continue to Payment</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        marginVertical: 5,
    },
    highlight: {
        fontWeight: 'bold',
        color: '#4CAF50', // Green color for highlight
    },
    label: {
        margin: 20,
        fontSize: 18,
        marginBottom: 10,
    },
    datePickerButton: {
        margin: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 2,
    },
    dateText: {
        fontSize: 18,
        color: '#333',
    },
    timeSlotsContainer: {
        padding: 15,
    },
    timeSlot: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 2,
        height: 50,
    },
    selectedTimeSlot: {
        backgroundColor: '#4caf50',
        height: 50,
    },
    timeSlotText: {
        fontSize: 14,
        color: '#333',
    },
    dropdown: {
        margin: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 2,
    },
    dropdownText: {
        fontSize: 18,
        color: '#333',
    },
    dropdownOptions: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 2,
        overflow: 'hidden',
    },
    dropdownOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    dropdownOptionText: {
        fontSize: 16,
        color: '#333',
    },
    dateTimePicker: {
        alignSelf: 'flex-start',
    },
    appointment: {
        margin: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 2,
    },
    appointmentText: {
        fontSize: 16,
        color: '#333',
    },
    paymentButton: {
        backgroundColor: '#4caf50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 2,
    },
    paymentButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default BookDietician;