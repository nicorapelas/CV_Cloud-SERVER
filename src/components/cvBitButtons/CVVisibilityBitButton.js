import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ScrollView,
  Platform,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Context as PublicCVContext } from '../../context/PublicCVContext'

const CVVisibilityBitButton = () => {
  const {
    state: { loading, isListed, publicCV, error },
    fetchPublicCVStatus,
    togglePublicCV,
    clearError,
  } = useContext(PublicCVContext)

  const [showModal, setShowModal] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  useEffect(() => {
    fetchPublicCVStatus()
  }, [])

  const renderStatus = () => {
    if (loading && !isListed && !publicCV) {
      return (
        <View style={styles.statusBed}>
          <ActivityIndicator size="small" color="#ededed" />
        </View>
      )
    }
    return (
      <View style={styles.statusBed}>
        <MaterialIcons
          name={isListed ? 'public' : 'public-off'}
          style={isListed ? styles.activeIcon : styles.inactiveIcon}
        />
        <Text style={isListed ? styles.activeText : styles.inactiveText}>
          {isListed ? 'LISTED' : 'PRIVATE'}
        </Text>
      </View>
    )
  }

  const handlePress = () => {
    setShowModal(true)
  }

  const handleToggle = async () => {
    setIsToggling(true)
    try {
      await togglePublicCV([])
    } catch (err) {
      console.error('Error toggling visibility:', err)
    } finally {
      setIsToggling(false)
    }
  }

  const renderModal = () => {
    return (
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <MaterialIcons name="public" style={styles.modalIcon} />
                <Text style={styles.modalTitle}>CV Visibility Settings</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowModal(false)}
                >
                  <MaterialIcons name="close" style={styles.closeIcon} />
                </TouchableOpacity>
              </View>

              {/* Status Section */}
              <View style={styles.statusSection}>
                <Text style={styles.statusLabel}>Current Status:</Text>
                <View style={styles.statusBadge}>
                  <MaterialIcons
                    name={isListed ? 'public' : 'public-off'}
                    style={styles.statusBadgeIcon}
                  />
                  <Text style={styles.statusBadgeText}>
                    {isListed ? '✓ Listed Publicly' : 'Not Listed'}
                  </Text>
                </View>
                <Text style={styles.statusDescription}>
                  {isListed
                    ? 'HR users can find and save your CV'
                    : 'Enable to let HR professionals discover your CV'}
                </Text>
              </View>

              {/* Toggle Button */}
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  isListed
                    ? styles.toggleButtonActive
                    : styles.toggleButtonInactive,
                ]}
                onPress={handleToggle}
                disabled={loading || isToggling}
              >
                {isToggling ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.toggleButtonText}>
                    {isListed ? 'TURN OFF' : 'TURN ON'}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Stats Section */}
              {isListed && publicCV && publicCV.viewCount > 0 && (
                <View style={styles.statsSection}>
                  <Text style={styles.statsTitle}>Statistics:</Text>
                  <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                      <MaterialIcons
                        name="visibility"
                        style={styles.statIcon}
                      />
                      <Text style={styles.statValue}>{publicCV.viewCount}</Text>
                      <Text style={styles.statLabel}>
                        {publicCV.viewCount === 1 ? 'HR view' : 'HR views'}
                      </Text>
                    </View>
                    {publicCV.hrViews && publicCV.hrViews.length > 0 && (
                      <View style={styles.statCard}>
                        <MaterialIcons name="group" style={styles.statIcon} />
                        <Text style={styles.statValue}>
                          {publicCV.hrViews.length}
                        </Text>
                        <Text style={styles.statLabel}>
                          {publicCV.hrViews.length === 1
                            ? 'HR professional'
                            : 'HR professionals'}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Recent Views */}
                  {publicCV.hrViews && publicCV.hrViews.length > 0 && (
                    <View style={styles.recentViewsSection}>
                      <Text style={styles.recentViewsTitle}>Recent Views:</Text>
                      {publicCV.hrViews.slice(0, 3).map((view, index) => (
                        <View key={index} style={styles.viewItem}>
                          <Text style={styles.viewName}>
                            {view.hrUserName || 'HR Professional'}
                          </Text>
                          <Text style={styles.viewDate}>
                            {new Date(view.viewedAt).toLocaleDateString()}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )}

              {/* Error Display */}
              {error && (
                <View style={styles.errorContainer}>
                  <MaterialIcons name="error" style={styles.errorIcon} />
                  <Text style={styles.errorText}>{error}</Text>
                  <TouchableOpacity onPress={clearError}>
                    <MaterialIcons name="close" style={styles.errorClose} />
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <>
      <View style={styles.bed}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.title}>CV visibility</Text>
        </TouchableOpacity>
        {renderStatus()}
      </View>
      {renderModal()}
    </>
  )
}

const styles = StyleSheet.create({
  bed: {
    backgroundColor: '#fff',
    width: '95%',
    height: 50,
    marginTop: 5,
    alignSelf: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  title: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statusBed: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    gap: 5,
  },
  activeIcon: {
    color: '#4caf50',
    fontSize: 20,
  },
  inactiveIcon: {
    color: '#3498db',
    fontSize: 20,
  },
  activeText: {
    color: '#4caf50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#3498db',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#232936',
    width: '90%',
    maxHeight: '80%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  modalContent: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  modalIcon: {
    color: '#3498db',
    fontSize: 30,
    marginRight: 10,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  closeIcon: {
    color: '#fff',
    fontSize: 24,
  },
  statusSection: {
    backgroundColor: '#1a1d2e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  statusLabel: {
    color: '#999',
    fontSize: 14,
    marginBottom: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  statusBadgeIcon: {
    color: '#fff',
    fontSize: 20,
    marginRight: 10,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusDescription: {
    color: '#999',
    fontSize: 13,
    lineHeight: 18,
  },
  toggleButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleButtonActive: {
    backgroundColor: '#e74c3c',
  },
  toggleButtonInactive: {
    backgroundColor: '#27ae60',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsSection: {
    backgroundColor: '#1a1d2e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  statsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  statIcon: {
    color: '#3498db',
    fontSize: 30,
    marginBottom: 8,
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
  },
  recentViewsSection: {
    marginTop: 15,
  },
  recentViewsTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2c3e50',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  viewName: {
    color: '#fff',
    fontSize: 13,
  },
  viewDate: {
    color: '#999',
    fontSize: 12,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  errorIcon: {
    color: '#fff',
    fontSize: 20,
    marginRight: 10,
  },
  errorText: {
    color: '#fff',
    fontSize: 13,
    flex: 1,
  },
  errorClose: {
    color: '#fff',
    fontSize: 20,
  },
})

export default CVVisibilityBitButton
