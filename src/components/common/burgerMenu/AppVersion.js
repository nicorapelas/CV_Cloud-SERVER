import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Constants from 'expo-constants'

const AppVersion = () => {
  const appVersion = Constants.expoConfig ? Constants.expoConfig.version : 'N/A'

  const renderContent = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>www.cvcloud.app</Text>
        <Text style={styles.text}>v{appVersion}</Text>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  text: {
    color: '#ffff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
})

export default AppVersion
