import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const BannerAdFull1 = () => {
  const renderContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.banner}>
            <Text>Banner add full 1</Text>
          </View>
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  banner: {
    backgroundColor: 'grey',
    width: 320,
    height: 480,
  },
})

export default BannerAdFull1
