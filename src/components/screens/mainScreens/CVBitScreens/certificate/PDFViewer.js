import { Linking, Button } from 'react-native'
import React from 'react'
import { View } from 'react-native'

const OpenPDF = ({ pdfUrl }) => {
  const openPDF = () => {
    Linking.openURL(pdfUrl).catch((err) =>
      console.error('Failed to open PDF', err)
    )
  }

  return (
    <View>
      <Button title="Open PDF" onPress={openPDF} />
    </View>
  )
}

export default OpenPDF
