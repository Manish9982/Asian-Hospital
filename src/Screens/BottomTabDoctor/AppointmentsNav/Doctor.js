import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, StatusBar, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
//import Header from '../../../assets/Schemes/Header'
import { Appbar } from 'react-native-paper'
import { colors, fontFamily, fontSizes, getLocalStorageData, H, PostApiData, W } from '../../../assets/Schemes/Schemes'



const Doctor = ({ navigation, route }) => {

  ////console.log(route.params.catID)

  const [data, setData] = useState(null)

  const H = Dimensions.get("screen").height
  const W = Dimensions.get("screen").width

  useEffect(() => { toastHospitalID() }, [])

  const toastHospitalID = async () => {
    const temp = await getLocalStorageData('hospital_id')

    getCategoryData(temp, route.params.catID)

    //getCategoryData(temp, '5')

    
   
    //console.log(temp)
  }

  const getCategoryData = async (hospital_id, cat_id) => {
    // setLoader(true)

    var formdata = new FormData();

    formdata.append("hospital_id", hospital_id);
    formdata.append("cat_id", cat_id);

    const result = await PostApiData('doctors_list', formdata)

    //console.log(formdata)

    if (result.status == '200') {

      setData(result)

      //navigation.navigate("BottomTab
    } else {

      Alert.alert('Error', `${result.message}`)
    }
    // setLoader(false)
  }




  const data2 = [
    {
      "name": "Dr Subrat Akhoury",
      "specialty": "Associate Director - CTVS",
      "onlinePrice": "500",
      "personalPrice": "1000",
      "profile_pic": "https://cdn-icons-png.flaticon.com/512/2785/2785482.png"
    },
    {
      "name": "Dr Subrat Akhoury",
      "specialty": "CARDIOLOGY",
      "onlinePrice": "500",
      "personalPrice": "1000",
      "profile_pic": "https://cdn-icons-png.flaticon.com/512/2785/2785482.png"
    },
    {
      "name": "Dr Subrat Akhoury",
      "specialty": "CARDIOLOGY",
      "onlinePrice": "500",
      "personalPrice": "1000",
      "profile_pic": "https://cdn-icons-png.flaticon.com/512/2785/2785482.png"
    },
    {
      "name": "Dr Subrat Akhoury",
      "specialty": "CARDIOLOGY",
      "onlinePrice": "500",
      "personalPrice": "1000",
      "profile_pic": "https://cdn-icons-png.flaticon.com/512/2785/2785482.png"
    },
  ]

  const renderItem = ({ item, index }) => {
    return (
   

      <View style={{}}>
        <View >
          <View
            style={{
              alignItems: 'center',
              
              flexDirection: "row",
              elevation: 10,
              marginVertical: H * 0.015,
              paddingVertical: H * 0,
              width: W * 0.98,
              alignSelf: "center",
              borderRadius: 10
            }}>

            <View style={{
              backgroundColor: "#e8c4a7",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}>


              <Image source={{ uri: `${item.doctor.profile_url}${item.doctor.image}` }}
                style={{
                  height: H * 0.18,
                  width: H * 0.18,
                }} />



            </View>

            <View>
              <Text 
              onPress={()=>{navigation.navigate('DoctorProfile')}}
              
              numberOfLines={1}

                 style={{
                  marginLeft: W * 0.04,
                  fontSize: fontSizes.default,
                  fontFamily: fontFamily.medium,
                  color: colors.black,
                  maxWidth: W * 0.5,
                }}>

                {item.doctor.first_name}

              </Text>



              <Text style={{
                marginLeft: W * 0.04, fontSize: fontSizes.SM, color: 'gray'
              }}>

                {`${item.doctor.designation} - ${item.doctor.education}`}
              </Text>

              <View style={{
                flexDirection: "row",
                marginLeft: W * 0.04
              }}>
                <View>
                  <Text style={{
                    fontSize: fontSizes.SM,
                    width: W * 0.2,
                    textAlign: "center",
                    marginTop: H * 0.025,
                    marginBottom: H * 0.01,
                    color: "blue",
                    fontFamily: fontFamily.medium
                  }}>
                    CONSULT ONLINE
                  </Text>

                  <TouchableOpacity style={{
                    height: H * 0.03,
                    width: W * 0.2,
                    backgroundColor: "blue",
                    marginRight: W * 0.1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 6,
                  }}>

                    <Text style={{
                      color: "white", fontFamily: fontFamily.medium
                    }}>
                      ₹
                      {item.doctor.consultant_online}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{
                    fontSize: fontSizes.SM,
                    width: W * 0.4,
                    textAlign: "center",
                    marginTop: H * 0.025,
                    marginBottom: H * 0.01,

                    color: "red", fontFamily: fontFamily.medium
                  }}>
                    {"CONSULT\nIN PERSON"}
                  </Text>
                  <TouchableOpacity style={{
                    height: H * 0.03,
                    width: W * 0.2,
                    backgroundColor: "orange",
                    marginRight: W * 0.1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 6,
                  }}>
                    <Text style={{
                      color: "white", fontFamily: fontFamily.medium
                    }}>
                      ₹
                      {item.doctor.consultant_person}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

      </View>

    )
  }

  return (
    <View style={{ paddingBottom: 60, backgroundColor: 'white' }}>
      <>
        <StatusBar backgroundColor={colors.toobarcolor} />
        <Appbar.Header style={styles.appBar}>
          <Appbar.Content style={{ alignItems: "center", }}
            title={<Text style={{
              alignSelf: 'center', color: "white",
              fontSize: fontSizes.XL, fontFamily: "Poppins-Medium"
            }}>Select Doctor</Text>} />
        </Appbar.Header>
      </>

      <View style={{height:H,paddingBottom:H*0.1}}>
      <FlatList
        data={data?.doctors}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
      />
      </View>
    

    </View>
  )
}
const styles = StyleSheet.create({
  appBar:
  {
    backgroundColor: colors.toobarcolor,
    width: W,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export default Doctor