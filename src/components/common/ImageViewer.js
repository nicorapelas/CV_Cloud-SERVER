import React, { useContext } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons'

import { Context as UniversalContext } from '../../context/UniversalContext'

const { width, height } = Dimensions.get('window')

const ImageViewer = () => {
  const {
    state: { imageToViewUrl },
    setImageToViewUrl,
  } = useContext(UniversalContext)

  const scale = useSharedValue(1)

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale
    })
    .onEnd(() => {
      // Smoothly reset the scale back to 1 when the gesture ends
      scale.value = withTiming(1, { duration: 300 })
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePressClose = () => {
    setImageToViewUrl(null)
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageBed}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            onPress={handlePressClose}
            style={{
              padding: 10,
              marginTop: '20%',
            }}
          >
            <AntDesign name="closecircle" style={styles.closeButton} />
          </TouchableOpacity>
        </View>
        <GestureDetector gesture={pinchGesture}>
          <Animated.View style={{ flex: 1 }}>
            <Animated.Image
              source={{ uri: imageToViewUrl }}
              style={[styles.image, animatedStyle]}
              resizeMode="contain"
            />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232936',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  closeButton: {
    color: '#ffff',
    fontSize: 24,
  },
  image: {
    width: width,
    height: height,
  },
})

export default ImageViewer
