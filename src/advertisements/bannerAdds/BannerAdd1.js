import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const BannerAdd1 = () => {
  const renderContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text>Banner add 1</Text>
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  banner: {
    backgroundColor: 'grey',
    width: 320,
    height: 50,
  },
})

export default BannerAdd1
