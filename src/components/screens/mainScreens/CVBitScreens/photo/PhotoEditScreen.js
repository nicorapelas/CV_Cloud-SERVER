import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import FormCancelButton from '../../../../common/FormCancelButton'
import { Context as PhotoContext } from '../../../../../context/PhotoContext'
import { Context as NavContext } from '../../../../../context/NavContext'

const PhotoEditScreen = () => {
  const [id, setId] = useState()
  const [title, setTitle] = useState()
  const [photoUrl, setPhotoUrl] = useState()

  const {
    state: { loading, photoToEdit },
    editPhoto,
  } = useContext(PhotoContext)

  const { setCVBitScreenSelected } = useContext(NavContext)

  useEffect(() => {
    if (photoToEdit) {
      const { _id, title, photoUrl } = photoToEdit
      setId(_id)
      setTitle(title)
      setPhotoUrl(photoUrl)
    }
  }, [photoToEdit])

  //   {
  //     editPhoto(id, { title: title }, () => {
  //       navigation.navigate('Photo')
  //     })
  //     setTitle('')
  //     buildCV()
  //   }

  const handlePressEdit = () => {
    editPhoto(id, { title })
    setTitle('')
    setCVBitScreenSelected('photo')
  }

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return (
      <View style={styles.bed}>
        <View>
          <ScrollView keyboardShouldPersistTaps="always">
            <Image
              style={styles.photo}
              source={{
                uri: photoUrl,
              }}
            />
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
              <FormCancelButton route="photo" />
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
  photo: {
    width: 150,
    height: 150,
    borderRadius: 7,
    alignSelf: 'center',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    height: 50,
    width: '85%',
    textAlign: 'center',
    borderRadius: 7,
    margin: 15,
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
    height: 40,
    marginLeft: 10,
  },
  addButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingRight: 5,
  },
  addButtonText: {
    color: '#ffff',
    fontSize: 18,
    marginBottom: 5,
  },
})

export default PhotoEditScreen
