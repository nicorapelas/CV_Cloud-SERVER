import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'

import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import FormCancelButton from '../../../../common/FormCancelButton'
import { Context as CertificateContext } from '../../../../../context/CertificateContext'
import { Context as NavContext } from '../../../../../context/NavContext'

const CertificateEditScreen = () => {
  const [id, setId] = useState()
  const [title, setTitle] = useState()
  const [photoUrl, setPhotoUrl] = useState()

  const {
    state: { loading, certificateToEdit },
    editCertificate,
  } = useContext(CertificateContext)

  const { setCVBitScreenSelected } = useContext(NavContext)

  useEffect(() => {
    if (certificateToEdit) {
      const { _id, title, photoUrl } = certificateToEdit
      setId(_id)
      setTitle(title)
      if (photoUrl) setPhotoUrl(photoUrl)
    }
  }, [certificateToEdit])

  const handlePressEdit = () => {
    editCertificate(id, { title })
    setTitle('')
    setCVBitScreenSelected('certificate')
  }

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return (
      <View style={styles.bed}>
        <View>
          <ScrollView keyboardShouldPersistTaps="always">
            {!photoUrl ? (
              <AntDesign name="pdffile1" style={styles.fileSelectedIcon} />
            ) : (
              <Image
                style={styles.photo}
                source={{
                  uri: `${photoUrl}`,
                }}
              />
            )}

            <TextInput
              style={styles.input}
              textAlign="center"
              placeholder="title"
              value={title}
              onChangeText={setTitle}
              onFocus={() => {
                setTitle('')
              }}
              autoCorrect={false}
            />
            <View style={styles.buttonContainer}>
              <FormCancelButton route="certificate" />
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={handlePressEdit}
              >
                <MaterialIcons style={styles.addButtonIcon} name="add-circle" />
                <Text style={styles.addButtonText}>save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontSize: 22,
  },
  bed: {
    backgroundColor: '#232936',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  fileSelectedIcon: {
    color: '#ffff',
    fontSize: 60,
    alignSelf: 'center',
    paddingBottom: 10,
  },
  photo: {
    height: 90,
    width: 90,
    alignSelf: 'center',
    marginBottom: 7,
  },
  input: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    height: 50,
    width: '85%',
    textAlign: 'center',
    borderRadius: 7,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addButtonContainer: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    width: 90,
    margin: 5,
    height: 40,
  },
  addButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingRight: 5,
  },
  addButtonText: {
    color: '#ffff',
    fontSize: 18,
    paddingBottom: 5,
  },
})

export default CertificateEditScreen
