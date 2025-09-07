import React, { useContext, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Octicons } from '@expo/vector-icons'

import { Context as EmployHistoryContext } from '../../context/EmployHistoryContext'
import { Context as NavContext } from '../../context/NavContext'

const EmployHistoryBitButton = () => {
  const {
    state: { loading, employHistoryStatus, employHistoryStatusInitFetchDone },
    fetchEmployHistoryStatus,
    setEmployHistoryStatusInitFetchDone,
  } = useContext(EmployHistoryContext)

  const { setCVBitScreenSelected } = useContext(NavContext)

  useEffect(() => {
    if (!employHistoryStatusInitFetchDone) {
      fetchEmployHistoryStatus()
      setEmployHistoryStatusInitFetchDone(true)
    }
  }, [employHistoryStatusInitFetchDone])

  const renderStatusLoader = () => {
    return <ActivityIndicator size="small" color="#ededed" />
  }

  const renderStatus = () => {
    if (loading)
      return <View style={styles.statusBed}>{renderStatusLoader()}</View>
    return (
      <View style={styles.statusBed}>
        <Text style={styles.percentage}>X {employHistoryStatus}</Text>
        {employHistoryStatus === '0' ? (
          <Octicons style={styles.redDot} name="dot-fill" />
        ) : null}
        {employHistoryStatus === '1' ? (
          <Octicons style={styles.orangeDot} name="dot-fill" />
        ) : null}
        {employHistoryStatus === '2' ? (
          <Octicons style={styles.yellowDot} name="dot-fill" />
        ) : null}
        {employHistoryStatus > '2' ? (
          <Octicons style={styles.greenDot} name="dot-fill" />
        ) : null}
      </View>
    )
  }

  const handlePress = () => {
    setCVBitScreenSelected('employHistory')
  }

  return (
    <View style={styles.bed}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.title}>employment history</Text>
      </TouchableOpacity>
      {renderStatus()}
    </View>
  )
}

const styles = StyleSheet.create({
  bed: {
    backgroundColor: '#3498db',
    width: '95%',
    height: 50,
    marginTop: 5,
    alignSelf: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  button: {
    alignItems: 'center',
    flex: 6,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
  statusBed: {
    backgroundColor: '#2c3e50',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  percentage: {
    color: '#3498db',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  redDot: {
    color: '#e74c3c',
    fontSize: 25,
    marginRight: 5,
  },
  orangeDot: {
    color: '#f39c12',
    fontSize: 25,
    marginRight: 5,
  },
  yellowDot: {
    color: '#f1c40f',
    fontSize: 25,
    marginRight: 5,
  },
  greenDot: {
    color: '#2ecc71',
    fontSize: 25,
    marginRight: 5,
  },
})

export default EmployHistoryBitButton
