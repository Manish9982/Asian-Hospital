import DataContext from "./DataContext";
import { useState, useReducer } from "react";
import React from "react";

// Define action types
const SET_FIELD = "SET_FIELD";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// Define initial state
const initialState = {
    otpGlobal: "",
    city: "",
    state: "",
    country: "India",
    billNumberToBeFetched: "",
    mobileNo: "",
    data: null,
    myDoctorID: "",
    myDoctor: "",
    myPrice: "",
    myEmail: "",
    myDoctorCategory: "",
    myDoctorDesignation: "",
    myAppointmentDate: Date.now(),
    mySlot: "",
    mySelf: "",
    myAppointmentId: "",
    myDoctorImage: "",
    mySlotId: "",
    myAppointmentType: "0",
    uhid: "",
    apiDate: Date.now(),
    patientID: "",
    remainingTime: 300,
    patientName: "",
    myDoctorEducation: "",
    salutationData: null,
    shouldDoctorSeeAppointments: true,
    signedState: null,
    cart: []
};

// Define reducer
const reducer = (state, action) => {
    switch (action.type) {
        case SET_FIELD:
            return {
                ...state,
                [action.field]: action.value
            };
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.item]
            };
        case REMOVE_FROM_CART:
            const index = state.cart.findIndex(item => item.itemno === action.itemno);
            if (index !== -1) {
                const newCart = [...state.cart];
                newCart.splice(index, 1);
                return {
                    ...state,
                    cart: newCart
                };
            }
            return state;
        default:
            return state;
    }
};

const DataState = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Helper functions to update state
    const setField = (field, value) => {
        dispatch({ type: SET_FIELD, field, value });
    };

    const addToCart = (item) => {
        dispatch({ type: ADD_TO_CART, item });
    };

    const removeFromCart = (itemno) => {
        dispatch({ type: REMOVE_FROM_CART, itemno });
    };

    const getCountForItem = (item) => {
        const count = state.cart.filter(i => i.itemno === item.itemno).length;
        return `${count}`;
    };

    // Provide individual setters for each field to maintain the same API
    const value = {
        NotpGlobal: [state.otpGlobal, value => setField('otpGlobal', value)],
        Ncity: [state.city, value => setField('city', value)],
        Nstate: [state.state, value => setField('state', value)],
        Ncountry: [state.country, value => setField('country', value)],
        NbillNumberToBeFetched: [state.billNumberToBeFetched, value => setField('billNumberToBeFetched', value)],
        NmobileNo: [state.mobileNo, value => setField('mobileNo', value)],
        Ndata: [state.data, value => setField('data', value)],
        NmyDoctor: [state.myDoctor, value => setField('myDoctor', value)],
        NmyPrice: [state.myPrice, value => setField('myPrice', value)],
        NmyEmail: [state.myEmail, value => setField('myEmail', value)],
        NmyDoctorDesignation: [state.myDoctorDesignation, value => setField('myDoctorDesignation', value)],
        NmyAppointmentDate: [state.myAppointmentDate, value => setField('myAppointmentDate', value)],
        NmySlot: [state.mySlot, value => setField('mySlot', value)],
        NmySelf: [state.mySelf, value => setField('mySelf', value)],
        NmyAppointmentId: [state.myAppointmentId, value => setField('myAppointmentId', value)],
        NmySlotId: [state.mySlotId, value => setField('mySlotId', value)],
        Nuhid: [state.uhid, value => setField('uhid', value)],
        NmyAppointmentType: [state.myAppointmentType, value => setField('myAppointmentType', value)],
        NapiDate: [state.apiDate, value => setField('apiDate', value)],
        NpatientID: [state.patientID, value => setField('patientID', value)],
        NmyDoctorCategory: [state.myDoctorCategory, value => setField('myDoctorCategory', value)],
        NmyDoctorImage: [state.myDoctorImage, value => setField('myDoctorImage', value)],
        NmyDoctorID: [state.myDoctorID, value => setField('myDoctorID', value)],
        NremainingTime: [state.remainingTime, value => setField('remainingTime', value)],
        NpatientName: [state.patientName, value => setField('patientName', value)],
        NmyDoctorEducation: [state.myDoctorEducation, value => setField('myDoctorEducation', value)],
        NshouldDoctorSeeAppointments: [state.shouldDoctorSeeAppointments, value => setField('shouldDoctorSeeAppointments', value)],
        NsignedState: [state.signedState, value => setField('signedState', value)],
        Ncart : [state.cart, value => setField('cart', value)],
        addToCart,
        removeFromCart,
        getCountForItem
    };

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    );
};

export default DataState;
