import DataContext from "./DataContext";
import { useContext, useState } from "react";
import React from "react";

const DataState = (props) => {

    const [otpGlobal, setOtpGlobal] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("India")
    const [billNumberToBeFetched, setBillNumberToBeFetched] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [data, setData] = useState()
    const [myDoctorID, setmyDoctorID] = useState("")
    const [myDoctor, setMyDoctor] = useState("")
    const [myPrice, setMyPrice] = useState("")
    const [myEmail, setMyEmail] = useState("")
    const [myDoctorCategory, setMyDoctorCategory] = useState("")
    const [myDoctorDesignation, setMyDoctorDesignation] = useState("")
    const [myAppointmentDate, setMyAppointmentDate] = useState(Date.now())
    const [mySlot, setMySlot] = useState("")
    const [mySelf, setMySelf] = useState("")
    const [myAppointmentId, setMyAppointmentId] = useState("")
    const [myDoctorImage, setMyDoctorImage] = useState("")
    const [mySlotId, setMySlotId] = useState("")
    const [myAppointmentType, setMyAppointmentType] = useState("0")
    const [uhid, setUhid] = useState("")
    const [apiDate, setApiDate] = useState(Date.now())
    const [patientID, setPatientID] = useState("")
    const [remainingTime, setRemainingTime] = useState(300);
    const [patientName, setPatientName] = useState("")
    const [myDoctorEducation, setMyDoctorEducation] = useState("")
    const [salutationData, setSalutationData] = useState(null)
    const [shouldDoctorSeeAppointments, setShouldDoctorSeeAppointments] = useState(true)
    const [signedState, setSignedState] = useState(null)

    return (
        <DataContext.Provider value={{
            NotpGlobal: [otpGlobal, setOtpGlobal],
            Ncity: [city, setCity],
            Nstate: [state, setState],
            Ncountry: [country, setCountry],
            NbillNumberToBeFetched: [billNumberToBeFetched, setBillNumberToBeFetched],
            NmobileNo: [mobileNo, setMobileNo],
            Ndata: [data, setData],
            NmyDoctor: [myDoctor, setMyDoctor],
            NmyPrice: [myPrice, setMyPrice],
            NmyEmail: [myEmail, setMyEmail],
            NmyDoctorDesignation: [myDoctorDesignation, setMyDoctorDesignation],
            NmyAppointmentDate: [myAppointmentDate, setMyAppointmentDate],
            NmySlot: [mySlot, setMySlot],
            NmySelf: [mySelf, setMySelf],
            NmyAppointmentId: [myAppointmentId, setMyAppointmentId],
            NmySlotId: [mySlotId, setMySlotId],
            Nuhid: [uhid, setUhid],
            NmyAppointmentType: [myAppointmentType, setMyAppointmentType],
            NapiDate: [apiDate, setApiDate],
            NpatientID: [patientID, setPatientID],
            NmyDoctorCategory: [myDoctorCategory, setMyDoctorCategory],
            NmyDoctorImage: [myDoctorImage, setMyDoctorImage],
            NmyDoctorID: [myDoctorID, setmyDoctorID],
            NremainingTime: [remainingTime, setRemainingTime],
            NpatientName: [patientName, setPatientName],
            NmyDoctorEducation: [myDoctorEducation, setMyDoctorEducation],
            NshouldDoctorSeeAppointments: [shouldDoctorSeeAppointments, setShouldDoctorSeeAppointments],
            NsignedState: [signedState, setSignedState]
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState