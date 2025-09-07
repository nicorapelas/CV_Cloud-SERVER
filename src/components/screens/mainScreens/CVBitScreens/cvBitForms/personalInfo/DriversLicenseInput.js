import React, { useState, useContext, useEffect } from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'
import Checkbox from 'expo-checkbox'

import { Context as PersonalInfoContext } from '../../../../../../context/PersonalInfoContext'

const DriversLicenceInput = () => {
  const {
    state: { driversLicense, licenseCode },
    setLicenseCode,
    setDirversLicense,
  } = useContext(PersonalInfoContext)

  const [A, setA] = useState(licenseCode === 'A' ? true : false)
  const [A1, setA1] = useState(licenseCode === 'A1' ? true : false)
  const [B, setB] = useState(licenseCode === 'B' ? true : false)
  const [C1, setC1] = useState(licenseCode === 'C1' ? true : false)
  const [C, setC] = useState(licenseCode === 'C' ? true : false)
  const [EB, setEB] = useState(licenseCode === 'EB' ? true : false)
  const [EC1, setEC1] = useState(licenseCode === 'EC1' ? true : false)
  const [EC, setEC] = useState(licenseCode === 'EC' ? true : false)

  const toggleDiversLicense = () => setDirversLicense(!driversLicense)

  const renderLicenseSwitch = () => {
    return (
      <View>
        <View style={styles.switchFieldBed}>
          <Text style={styles.switchFieldText}>drivers license?</Text>
          <Switch
            trackColor={{ false: '#ffff', true: '#81b0ff' }}
            thumbColor={driversLicense ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleDiversLicense}
            value={driversLicense}
          />
          <Text style={styles.switchFieldText}>
            {driversLicense ? 'yes' : 'no'}
          </Text>
        </View>
      </View>
    )
  }

  const renderLicenseSelector = () => {
    if (!driversLicense) return null
    return (
      <>
        <Text style={styles.licenseCodeIntruction}>select license code</Text>
        <View style={styles.licenseCodecheckContainer}>
          <View style={styles.licenseCodecheck}>
            <Text style={styles.licenseCodeCheckText}>A</Text>
            <Checkbox
              color="#278ACD"
              disabled={false}
              value={A}
              onValueChange={() => {
                setLicenseCode('A')
                setA(true)
                setA1(false)
                setB(false)
                setC1(false)
                setC(false)
                setEB(false)
                setEC1(false)
                setEC(false)
              }}
            />
          </View>
          <View style={styles.licenseCodecheck}>
            <Text style={styles.licenseCodeCheckText}>A1</Text>
            <Checkbox
              color="#278ACD"
              disabled={false}
              value={A1}
              onValueChange={() => {
                setLicenseCode('A1')
                setA(false)
                setA1(true)
                setB(false)
                setC1(false)
                setC(false)
                setEB(false)
                setEC1(false)
                setEC(false)
              }}
            />
          </View>
          <View style={styles.licenseCodecheck}>
            <Text style={styles.licenseCodeCheckText}>B</Text>
            <Checkbox
              color="#278ACD"
              disabled={false}
              value={B}
              onValueChange={() => {
                setLicenseCode('B')
                setA(false)
                setA1(false)
                setB(true)
                setC1(false)
                setC(false)
                setEB(false)
                setEC1(false)
                setEC(false)
              }}
            />
          </View>
        </View>
        <View style={styles.licenseCodecheckContainer}>
          <View style={styles.licenseCodecheck}>
            <Text style={styles.licenseCodeCheckText}>C</Text>
            <Checkbox
              color="#278ACD"
              disabled={false}
              value={C}
              onValueChange={() => {
                setLicenseCode('C')
                setA(false)
                setA1(false)
                setB(false)
                setC1(false)
                setC(true)
                setEB(false)
                setEC1(false)
                setEC(false)
              }}
            />
          </View>
          <View style={styles.licenseCodecheck}>
            <Text style={styles.licenseCodeCheckText}>C1</Text>
            <Checkbox
              color="#278ACD"
              disabled={false}
              value={C1}
              onValueChange={() => {
                setLicenseCode('C1')
                setA(false)
                setA1(false)
                setB(false)
                setC1(true)
                setC(false)
                setEB(false)
                setEC1(false)
                setEC(false)
              }}
            />
          </View>
          <View style={styles.licenseCodecheck}>
            <Text style={styles.licenseCodeCheckText}>EB</Text>
            <Checkbox
              color="#278ACD"
              disabled={false}
              value={EB}
              onValueChange={() => {
                setLicenseCode('EB')
                setA(false)
                setA1(false)
                setB(false)
                setC1(false)
                setC(false)
                setEB(true)
                setEC1(false)
                setEC(false)
              }}
            />
          </View>
        </View>
        <View style={styles.licenseCodecheckContainer}>
          <View style={styles.licenseCodecheck}>
            <Text style={styles.licenseCodeCheckText}>EC</Text>
            <Checkbox
              color="#278ACD"
              disabled={false}
              value={EC}
              onValueChange={() => {
                setLicenseCode('EC')
                setA(false)
                setA1(false)
                setB(false)
                setC1(false)
                setC(false)
                setEB(false)
                setEC1(false)
                setEC(true)
              }}
            />
          </View>
          <View style={styles.licenseCodecheck}>
            <Text style={styles.licenseCodeCheckText}>EC1</Text>
            <Checkbox
              color="#278ACD"
              disabled={false}
              value={EC1}
              onValueChange={() => {
                setLicenseCode('EC1')
                setA(false)
                setA1(false)
                setB(false)
                setC1(false)
                setC(false)
                setEB(false)
                setEC1(true)
                setEC(false)
              }}
            />
          </View>
        </View>
      </>
    )
  }

  const renderContent = () => {
    return (
      <>
        {renderLicenseSwitch()}
        {renderLicenseSelector()}
      </>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  switchFieldBed: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  switchFieldText: {
    color: '#ffff',
    paddingHorizontal: 10,
  },
  licenseCodeIntruction: {
    color: '#ffff',
    alignSelf: 'center',
    paddingTop: 7,
    marginBottom: 15,
  },
  licenseCodecheckContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  licenseCodecheck: {
    backgroundColor: '#232936',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '20%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ffff',
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  licenseCodeCheckText: {
    color: '#ffff',
    fontSize: 17,
    paddingRight: 7,
  },
})

export default DriversLicenceInput
