import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'

import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import BitNoData from '../../../../common/BitNoData'
import AddContentButtonLink from '../../../../links/AddContentButtonLink'
import DoneButton from '../../../../links/DoneButton'
import DeleteModal from '../../../../common/modals/DeleteModal'
import { Context as PhotoContext } from '../../../../../context/PhotoContext'
import { Context as UniversalContext } from '../../../../../context/UniversalContext'
import { Context as NavContext } from '../../../../../context/NavContext'

const PhotoScreen = () => {
  const [photoSelected, setPhotoSelected] = useState(null)
  const [documentId, setDocumentId] = useState('')
  const [documentSelected, setDocumentSelected] = useState('')
  const [photoPublicId, setPhotoPublicId] = useState(null)

  const { showDeleteModal } = useContext(UniversalContext)

  const { setCVBitScreenSelected } = useContext(NavContext)

  const {
    state: { loading, photos, photoAssignLoading },
    assignPhoto,
    setPhotoToEdit,
    setAssignedPhotoId,
  } = useContext(PhotoContext)
  
  useEffect(() => {
    if (photos && photos.length > 0) {
      const photoAssigned = photos.filter(ph => {
        return ph.assigned === true
      })
      setAssignedPhotoId(photoAssigned[0]._id)
    }
  }, [photos])

  const handlePressUsePhoto = (data) => {
    setPhotoSelected(data._id)
    assignPhoto(data._id)
  }

  const handlePressEdit = (data) => {
    setPhotoToEdit(data)
    setCVBitScreenSelected('photoEdit')
  }

  const handlePressDelete = (data) => {
    setDocumentId(data._id)
    setDocumentSelected(data.title)
    setPhotoPublicId(data.publicId)
    showDeleteModal()
  }

  const renderList = () => {
    if (loading || photos === null) return <LoaderFullScreen />
    if (photos.length < 1)
      return (
        <BitNoData
          cvBit="Photo"
          routeName="photoCreate"
          buttonText="add photo"
        />
      )
    return (
      <>
        <AddContentButtonLink routeName="photoCreate" text="upload photo" />
        <FlatList
          keyExtractor={(photo) => photo._id}
          data={photos}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <View>
                  {
                    photoAssignLoading ? (
                      <View
                      style={styles.assignImageButton}
                      onPress={() => handlePressUsePhoto(item)}
                    >
                      <Text style={styles.assignImageButtonText}>
                        updating...
                      </Text>
                    </View>
                    ) : (
                      item.assigned || item._id === photoSelected ? (
                        <View style={styles.assignedImage}>
                          <Feather
                            style={styles.assignedImageIcon}
                            name="check-circle"
                            size={24}
                          />
                          <Text style={styles.assignedImageText}>assigned</Text>
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={styles.assignImageButton}
                          onPress={() => handlePressUsePhoto(item)}
                        >
                          <Text style={styles.assignImageButtonText}>
                            use photo
                          </Text>
                        </TouchableOpacity>
                      )
                    )
                  }
                  <View style={styles.imageBed}>
                    <Image
                      style={styles.photo}
                      source={{
                        uri: `${item.photoUrl}`,
                      }}
                    />
                  </View>
                  <View style={styles.titleBed}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                  <View style={styles.buttonBed}>
                    <TouchableOpacity
                      style={styles.editButtonBed}
                      onPress={() => handlePressEdit(item)}
                    >
                      <MaterialCommunityIcons
                        style={styles.actionButton}
                        name="pencil"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButtonBed}
                      onPress={() => handlePressDelete(item)}
                    >
                      <MaterialCommunityIcons
                        style={styles.actionButton}
                        name="delete"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          }}
        />
      </>
    )
  }

  return (
    <>
      <DeleteModal
        id={documentId}
        documentSelected={documentSelected}
        publicId={photoPublicId}
        bit="photo"
      />
      <View style={styles.bed}>{renderList()}</View>
      {loading || !photos || photos.length < 1 ? null : (
        <DoneButton text="Done" routeName="" />
      )}
    </>
  )
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
  container: {
    backgroundColor: '#2e3647',
    margin: 10,
    padding: 10,
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  assignImageButton: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    height: 40,
  },
  assignImageButtonText: {
    color: '#ffff',
  },
  assignedImage: {
    backgroundColor: '#0ca302',
    borderColor: '#ffff',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    height: 40,
  },
  assignedImageIcon: {
    color: '#ffff',
    paddingTop: 3,
  },
  assignedImageText: {
    color: '#ffff',
    paddingLeft: 5,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 7,
  },
  titleBed: {
    alignSelf: 'center',
    paddingTop: 5,
  },
  title: {
    color: '#ffff',
    fontSize: 17,
  },
  buttonBed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: 120,
    paddingTop: 5,
  },
  editButtonBed: {
    backgroundColor: '#558dd8',
    borderRadius: 25,
  },
  deleteButtonBed: {
    backgroundColor: '#c35a44',
    borderRadius: 25,
  },
  actionButton: {
    fontSize: 22,
    color: '#ffff',
    padding: 7,
  },
})

export default PhotoScreen
