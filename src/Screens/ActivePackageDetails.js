import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Text } from 'react-native-paper'
import HeaderTwo from '../assets/Schemes/HeaderTwo'

export default function ActivePackageDetails() {
  const [first, setfirst] = useState('')
  return (
    <View style={styles.container}>
      <HeaderTwo Title={"Active Package"}/>
      <Text>ActivePackageDetails</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})