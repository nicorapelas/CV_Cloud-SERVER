import React from 'react'
import { ActivityIndicator, Modal, View, StyleSheet } from 'react-native'

const LoaderModal = ({ loading }) => {
  const loadingStatus = !loading || loading === null ? false : true

  return (
    <Modal
      transparent={true}
      visible={loadingStatus}
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="#ededed" />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loaderContainer: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    padding: 20,
    borderRadius: 10,
  },
})

export default LoaderModal
