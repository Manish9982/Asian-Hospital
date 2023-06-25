import { Dimensions, StyleSheet } from "react-native"
import { colors, fontFamily, fontSizes } from "../assets/Schemes/Schemes"
import { spacing } from "./Spacing"
const H = Dimensions.get("window").height
const W = Dimensions.get("window").width
export const styles = StyleSheet.create({
    textInput: {
        width: "90%",
        alignSelf: "center",
        marginVertical: spacing.medium,
        backgroundColor: "white"
    },
    textInputHeadings:
    {
        margin: spacing.medium
    },
    button: {
        width: "90%",
        backgroundColor: colors.toobarcolor,
        justifyContent: "center",
        alignItems: "center",
        height: "10%",
        borderRadius: 8,
        alignSelf: "center",
        margin: spacing.medium
    },
    whiteText:
    {
        color: "white"
    },
    infotext:
    {
        margin: spacing.medium,
        fontWeight: "600",
        fontFamily: fontFamily.semibold
    },
    ipdPatientCard:
    {
        marginVertical: spacing.medium,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "white",
        width: W * 0.95,
        alignSelf: "center",
        padding: spacing.medium
    },
    ipdPatientName:
    {
        color: "white",
        width: W * 0.8,
    },
    boldMedium:
    {
        fontWeight: "600",
        fontFamily: fontFamily.semibold,
        fontSize: fontSizes.default,
    },
    boldSmall:
    {

    },
    boldLarge:
    {
        fontWeight: "600",
        fontFamily: fontFamily.semibold,
        fontSize: fontSizes.XL,
    },
    displaySmall:
    {
        fontSize: fontSizes.EXTRASM
    },
    displayMedium:
    {
        fontFamily: fontFamily.regular,
        fontSize: fontSizes.default,
    },
    displayLarge:
    {

    },
    horizontalContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    badgeSegmentedButtons:
    {
        top:H*0.002,
        position: "absolute",
        left: W * 0.18,
        backgroundColor: colors.badgeColor,
        width: 21,
        height: 21,
        borderRadius: 15/2,
        justifyContent:"center",
        alignItems:"center"
    }

})