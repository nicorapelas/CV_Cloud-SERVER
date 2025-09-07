import React, {  useContext, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { Context as UniversalContext } from '../../../context/UniversalContext'
import { Context as SecondEduContext } from '../../../context/SecondEduContext'
import { Context as TertEduContext } from '../../../context/TertEduContext'
import { Context as EmployHistoryContext } from '../../../context/EmployHistoryContext'

const YearPicker = ({ bit, buttonText }) => {
  const scrollViewRef = useRef(null)

  const {
    state: { yearPickerShow, startYear, endYear },
    setYearPickerShow,
    setYearPickerProps,
    clearYearPickerProps,
    setStartYear,
    setEndYear,
  } = useContext(UniversalContext)

  const { clearSecondEduErrors } = useContext(SecondEduContext)
  const { clearTertEduErrors } = useContext(TertEduContext)
  const { clearEmployHistoryErrors } = useContext(EmployHistoryContext)

  const yearsArray = []
  for (let i = 1900; i <= new Date().getFullYear(); i++) {
    yearsArray.push(i)
  }

  useEffect(() => {
    if (yearPickerShow === false) {
      clearYearPickerProps()
    }
  }, [yearPickerShow])

  useEffect(() => {
    if (startYear && endYear && parseInt(startYear) > parseInt(endYear)) {
      setEndYear(startYear)
    }
  }, [startYear, endYear])

  // Updated to ensure layout completion before scrolling for iOS
  useEffect(() => {
    if (yearPickerShow && scrollViewRef.current) {
      setTimeout(() => {
        const middleIndex = Math.floor(yearsArray.length / 2)
        scrollViewRef.current.scrollTo({ y: middleIndex * 70, animated: false })
      }, 0) // Ensures the layout is ready before scrolling
    }
  }, [yearPickerShow])

  const handlePressYearSelect = (data) => {
    if (bit === 'startYear') setStartYear(data.toString())
    if (bit === 'endYear') setEndYear(data.toString())
    setYearPickerShow(false)
  }

  const CustomPicker = () => {
    return (
      <View style={styles.pickerBed}>
        <ScrollView
          key="scrollview-yearpicker"
          ref={scrollViewRef}
          style={styles.scrollPicker}
        >
          {yearsArray.map((year) => (
            <TouchableOpacity
              key={year}
              style={styles.pickerItem}
              onPress={() => handlePressYearSelect(year)}
            >
              <Text style={styles.pickerItemText}>{year}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }

  const buttonTextStyle = () => {
    if (bit === 'startYear' && !startYear) return styles.dummyInputText
    if (bit === 'startYear' && startYear) return styles.inputText
    if (bit === 'endYear' && !endYear) return styles.dummyInputText
    if (bit === 'endYear' && endYear) return styles.inputText
  }

  const showPickerButton = () => {
    return (
      <TouchableOpacity
        style={styles.dummyInput}
        onPress={() => {
          setYearPickerShow(true)
          setYearPickerProps({ bit })
          clearSecondEduErrors()
          clearTertEduErrors()
          clearEmployHistoryErrors()
        }}
      >
        <Text style={buttonTextStyle()}>
          {bit !== 'startYear' ? null : startYear}
          {bit !== 'endYear' ? null : endYear}
          {bit === 'startYear' && !startYear ? buttonText : null}
          {bit === 'endYear' && !endYear ? buttonText : null}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderContent = () => {
    if (!yearPickerShow) {
      return showPickerButton()
    }
    return CustomPicker()
  }

  return renderContent()
}

const styles = StyleSheet.create({
  dummyInput: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    alignItems: 'center',
    height: 50,
    width: '85%',
    borderRadius: 7,
    margin: 5,
  },
  dummyInputText: {
    color: '#B6B8BA',
    marginTop: 17,
  },
  inputText: {
    color: 'black',
    marginTop: 17,
  },
  pickerBed: {
    backgroundColor: '#ffff',
    borderRadius: 7,
    margin: 20,
  },
  scrollPicker: {
    maxHeight: 200,
  },
  pickerItem: {
    padding: 10,
    alignItems: 'center',
  },
  pickerItemText: {
    fontSize: 22,
    color: '#1a1a1a',
  },
})

export default YearPicker
