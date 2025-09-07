import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { Context as NavContext } from '../../context/NavContext'

const HeaderCVBit = () => {
  const [label, setLabel] = useState('')

  const {
    state: { CVBitScreenSelected },
    setCVBitScreenSelected,
  } = useContext(NavContext)

  useEffect(() => {
    switch (CVBitScreenSelected) {
      case 'attribute':
        setLabel('attributes')
        break
      case 'interest':
        setLabel('interests')
        break
      case 'skill':
        setLabel('skills')
        break
      case 'language':
        setLabel('languages')
        break
      case 'personalInfo':
        setLabel('personal information')
        break
      case 'personalSummary':
        setLabel('personal summary')
        break
      case 'contactInfo':
        setLabel('contact information')
        break
      case 'secondEdu':
        setLabel('secondary education')
        break
      case 'tertEdu':
        setLabel('tertiary education')
        break
      case 'employHistory':
        setLabel('employment history')
        break
      case 'experience':
        setLabel('work experience')
        break
      case 'reference':
        setLabel('references')
        break
      case 'photo':
        setLabel('photo')
        break
      case 'certificate':
        setLabel('certificates')
        break
      case 'firstImpression':
        setLabel('first impression')
        break
      case 'firstImpressionCreate':
        setLabel('recorder')
        break
      default:
        setLabel('')
        break
    }
  }, [CVBitScreenSelected])

  const handleBackButtonPress = () => {
    setCVBitScreenSelected('')
  }

  const renderContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackButtonPress}
          >
            <Feather name="arrow-left" style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerBed}>
          <View style={styles.headingContainer}>
            <Text style={styles.headerText}>{label}</Text>
          </View>
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center', // Ensures children are centered vertically
  },
  buttonContainer: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, // Increases the touchable area
    marginLeft: 10, // Adds some margin to the left
  },
  arrowIcon: {
    color: '#ffff',
    fontSize: 24,
  },
  headerBed: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  headingContainer: {
    justifyContent: 'center',
    paddingRight: 50,
    paddingBottom: 8,
  },
  headerText: {
    color: '#ffff',
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
  },
})

export default HeaderCVBit
