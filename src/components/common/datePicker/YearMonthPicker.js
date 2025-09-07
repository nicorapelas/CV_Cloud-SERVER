import React, { useState, useContext, useEffect, useRef } from 'react'
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

const YearMonthPicker = ({ bit, buttonText }) => {
  const [yearSelectionDone, setYearSelectionDone] = useState(false)
  const [monthSelectionDone, setMonthSelectionDone] = useState(false)
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)

  const scrollViewRef = useRef(null)
  const monthScrollViewRef = useRef(null)

  const {
    state: { yearPickerShow, startYear, endYear, startMonth, endMonth },
    setYearPickerShow,
    setMonthYearPickerProps,
    clearYearPickerProps,
    setStartYear,
    setEndYear,
    setStartMonth,
    setEndMonth,
  } = useContext(UniversalContext)

  const { clearSecondEduErrors } = useContext(SecondEduContext)
  const { clearTertEduErrors } = useContext(TertEduContext)
  const { clearEmployHistoryErrors } = useContext(EmployHistoryContext)

  const yearsArray = []
  for (let i = 1900; i <= new Date().getFullYear(); i++) {
    yearsArray.push(i)
  }

  const monthsArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

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

  useEffect(() => {
    if (yearPickerShow && scrollViewRef.current) {
      setTimeout(() => {
        const middleIndex = Math.floor(yearsArray.length / 2)
        scrollViewRef.current.scrollTo({ y: middleIndex * 70, animated: false })
      }, 0) 
    }
  }, [yearPickerShow])

  useEffect(() => {
    if (yearSelectionDone && monthSelectionDone) {
      setYearPickerShow(false)
      setMonthYearPickerProps(null)
    }
  }, [yearSelectionDone, monthSelectionDone])

  const handlePressYearSelect = (data) => {
    if (bit === 'startYearMonth') setStartYear(data.toString())
    if (bit === 'endYearMonth') setEndYear(data.toString())
    setSelectedYear(data)
    setYearSelectionDone(true)
  }

  const handlePressMonthSelect = (month) => {
    if (bit === 'startYearMonth') setStartMonth(month)
    if (bit === 'endYearMonth') setEndMonth(month)
    setSelectedMonth(month)
    setMonthSelectionDone(true)
  }

  const CustomPicker = () => {
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.pickerBed}>
          <ScrollView ref={scrollViewRef} style={styles.scrollPicker}>
            {yearsArray.map((year) => (
              <TouchableOpacity
                key={year}
                style={[
                  styles.pickerItem,
                  selectedYear === year && styles.selectedItem,
                ]}
                onPress={() => handlePressYearSelect(year)}
              >
                <Text
                  style={[
                    styles.pickerItemText,
                    selectedYear === year && styles.selectedItemText,
                  ]}
                >
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.pickerBed}>
          <ScrollView ref={monthScrollViewRef} style={styles.scrollPicker}>
            {monthsArray.map((month, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.pickerItem,
                  selectedMonth === month && styles.selectedItem,
                ]}
                onPress={() => handlePressMonthSelect(month)}
              >
                <Text
                  style={[
                    styles.pickerItemText,
                    selectedMonth === month && styles.selectedItemText,
                  ]}
                >
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    )
  }

  const buttonTextStyle = () => {
    if (bit === 'endYearMonth' && !endYear) return styles.dummyInputText
    if (bit === 'endYearMonth' && endYear) return styles.inputText
    if (bit === 'startYearMonth' && !startYear) return styles.dummyInputText
    if (bit === 'startYearMonth' && startYear) return styles.inputText
  }

  const buttonTextSelector = () => {
    if (bit === 'startYearMonth' && !startYear) return buttonText
    if (bit === 'startYearMonth' && startYear)
      return `${startMonth} ${startYear}`
    if (bit === 'endYearMonth' && !endYear) return buttonText
    if (bit === 'endYearMonth' && endYear) return `${endMonth} ${endYear}`
  }

  const showPickerButton = () => {
    return (
      <TouchableOpacity
        style={styles.dummyInput}
        onPress={() => {
          setYearPickerShow(true)
          setYearSelectionDone(false)
          setMonthSelectionDone(false)
          setMonthYearPickerProps({ bit })
          clearSecondEduErrors()
          clearTertEduErrors()
          clearEmployHistoryErrors()
        }}
      >
        <Text style={buttonTextStyle()}>{buttonTextSelector()}</Text>
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
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pickerBed: {
    backgroundColor: '#ffff',
    borderRadius: 7,
    margin: 10,
    flex: 1,
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
  selectedItem: {
    backgroundColor: '#d3e0ea',
  },
  selectedItemText: {
    fontWeight: '700',
  },
})

export default YearMonthPicker
