import { View, Image, Dimensions, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Divider, Text } from 'react-native-paper'
import { colors, fontFamily, fontSizes, PostApiData } from '../../../assets/Schemes/Schemes'
import HeaderTwo from '../../../assets/Schemes/HeaderTwo'
import { useIsFocused } from '@react-navigation/native'
import Loader from '../../../assets/Loader/Loader'
import DataContext from '../../../assets/Context/DataContext'
import { spacing } from '../../../components/Spacing'



const H = Dimensions.get("window").height
const W = Dimensions.get("window").width


const BookingsNav = ({ navigation }) => {
  const isFocused = useIsFocused()
  useEffect(() => {
    {
      isFocused &&
        getReports()
    }
    //return () => {
    // setDataForDisplayingBill([])
    //}
  }, [isFocused])
  const { NbillNumberToBeFetched, Nuhid } = useContext(DataContext)
  const [billNumbers, setBillNumbers] = useState([])
  const [uhid, setUhid] = Nuhid
  const [loader, setLoader] = useState(true)
  const [dataFromReportListApi, setDataFromReportListApi] = useState(null)
  const [dataForDisplayingBill, setDataForDisplayingBill] = useState([])
  const [billNumberToBeFetched, setBillNumberToBeFetched] = NbillNumberToBeFetched
  const getReports = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var formdata = new FormData()
    formdata.append("uhid", uhid)
    const result = await PostApiData('report_list', formdata)
    //const result = await response.json()
    await setDataForDisplayingBill(result?.bills)
    setDataFromReportListApi(result)

    const removeDuplicates = (arr, key) => {
      return arr.filter((item, index, self) => self.findIndex(i => i[key] === item[key]) === index);
    }

    var myFilteredArray = await removeDuplicates(result?.bills, 'BillNumber')


    //console.log("My Final Array ======>", myFilteredArray)
    setBillNumbers(myFilteredArray)
    setLoader(false)
  }


  let previous;
  const renderItem = ({ item, index }) => {
    const date = new Date(item?.BillDate)
    const day = date.getDate().toString().padStart(2, 0)
    const month = date.toLocaleString('default', { month: "short" })
    const year = date.getFullYear()
    const getRandomColor = (arr) => {

      let current;
      do {
        current = arr[Math.floor(Math.random() * arr.length)];
      } while (current === previous)
      {
        previous = current
      }


      return current;
    }
    return (
      <TouchableOpacity
        style={{
          height: H * 0.1,
          width: W * 0.95,
          paddingLeft: W * 0.05,
          justifyContent: "center",
          backgroundColor: getRandomColor(["#27B99F", "#F1624B", colors.toobarcolor, colors.purplecolor]),
          alignSelf: "center",
          marginVertical: H * 0.01,
          borderRadius: 12,
        }}
        onPress={
          () => {
            setBillNumberToBeFetched(item?.BillNumber)
            navigation.navigate("DisplayReports", { "dataForDisaplyingBill": dataForDisplayingBill })
          }
        }>
        <Text style={{
          color: 'white'
        }}>
          Bill No: {item?.BillNumber}
        </Text>
        <Text style={{
          color: 'white'
        }}>
          Date :  {day} {month}, {year}
        </Text>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/271/271228.png' }}
          style={{
            height: H * 0.03,
            width: H * 0.03,
            position: "absolute",
            left: W * 0.84,
            tintColor: "white"
          }}
        />

      </TouchableOpacity>
    )

  }




  return (
    loader ?
      <>
        <Loader />
      </>
      :
      <View
        style={{
          height: H,
          width: W,
          backgroundColor: 'white',
          paddingBottom: H * 0.1
        }}>
        <HeaderTwo Title="Reports" />
        <Text style={styles.noteText}>
          {dataFromReportListApi?.display_text} <Text onPress={() => navigation.navigate(dataFromReportListApi?.on_click)} style={styles.linkText}>{dataFromReportListApi?.display_text_link}</Text>

        </Text>
        {billNumbers?.length == 0 && <Text style={{
          alignSelf: "center",
          marginTop: H * 0.4
        }}>No reports available for this user...</Text>}
        <FlatList
          data={billNumbers}
          renderItem={renderItem}
          keyExtractor={(item, index) => `_key${index}`}
        />
      </View>


  )
}

const styles = StyleSheet.create({
  noteText:
  {
    padding: spacing.medium,
    textAlign: 'center'
  },
  linkText:
  {
    color: colors.toobarcolor,
    textDecorationLine: 'underline'
  }
})

export default BookingsNav