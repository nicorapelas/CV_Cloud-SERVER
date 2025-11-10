import React, { useContext, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Feather, Octicons } from '@expo/vector-icons'

import { Context as PersonalSummaryContext } from '../../context/PersonalSummaryContext'
import { Context as NavContext } from '../../context/NavContext'
import { useRealTime } from '../../context/RealTimeContext'

const PersonalSummaryBitButton = () => {
  const {
    state: { loading, personalSummaryStatus, personalSummaryStatusFetchDone },
    fetchPersonalSummaryStatus,
    setPersonalSummaryStatusFetchDone,
  } = useContext(PersonalSummaryContext)

  const { setCVBitScreenSelected } = useContext(NavContext)
  const { lastUpdate } = useRealTime()
  const lastRefreshTimestamp = useRef(null)

  useEffect(() => {
    if (!personalSummaryStatusFetchDone) {
      fetchPersonalSummaryStatus()
      setPersonalSummaryStatusFetchDone(true)
    }
  }, [personalSummaryStatusFetchDone])

  // Handle real-time updates
  useEffect(() => {
    if (lastUpdate && lastUpdate.dataType === 'personal-summary') {
      const now = Date.now()
      if (
        lastRefreshTimestamp.current &&
        now - lastRefreshTimestamp.current < 2000
      ) {
        return
      }

      lastRefreshTimestamp.current = now
      setTimeout(() => {
        fetchPersonalSummaryStatus()
      }, 500)
    }
  }, [lastUpdate])

  const renderStatusLoader = () => {
    return <ActivityIndicator size="small" color="#ededed" />
  }

  const renderStatus = () => {
    if (loading)
      return <View style={styles.statusBed}>{renderStatusLoader()}</View>
    return (
      <View style={styles.statusBed}>
        {personalSummaryStatus < 10 ? (
          <>
            <Text style={styles.percentage}>
              <Feather name="circle" size={24} />
            </Text>
            <Octicons style={styles.redDot} name="dot-fill" />
          </>
        ) : null}
        {personalSummaryStatus > 9 && personalSummaryStatus < 100 ? (
          <>
            <Text style={styles.percentage}>
              <Feather name="check-circle" size={24} />
            </Text>
            <Octicons style={styles.orangeDot} name="dot-fill" />
          </>
        ) : null}
        {personalSummaryStatus > 99 && personalSummaryStatus < 150 ? (
          <>
            <Text style={styles.percentage}>
              <Feather name="check-circle" size={24} />
            </Text>
            <Octicons style={styles.yellowDot} name="dot-fill" />
          </>
        ) : null}
        {personalSummaryStatus > 149 ? (
          <>
            <Text style={styles.percentage}>
              <Feather name="check-circle" size={24} />
            </Text>
            <Octicons style={styles.greenDot} name="dot-fill" />
          </>
        ) : null}
      </View>
    )
  }

  const handlePress = () => {
    setCVBitScreenSelected('personalSummary')
  }

  return (
    <View style={styles.bed}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.title}>personal summary</Text>
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

export default PersonalSummaryBitButton
