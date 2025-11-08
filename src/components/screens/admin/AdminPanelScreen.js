import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons'

import { Context as AuthContext } from '../../../context/AuthContext'
import { Context as BurgerMenuContext } from '../../../context/BurgerMenuContext'
import { Context as AdvertisementContext } from '../../../context/AdvertisementContext'
import ngrokApi from '../../../api/ngrok'

const AdminPanelScreen = () => {
  const {
    state: { user },
  } = useContext(AuthContext)

  const { setInfoToShow } = useContext(BurgerMenuContext)

  const {
    state: { bannerAdStripShow, bannerAdFullShow },
    setBannerAdStripShow,
    setBannerAdFullShow,
  } = useContext(AdvertisementContext)

  const [users, setUsers] = useState([])
  const [stats, setStats] = useState(null)
  const [platformStats, setPlatformStats] = useState(null)
  const [activityStats, setActivityStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTier, setFilterTier] = useState('all')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      setLoading(true)
      await Promise.all([
        fetchUsers(),
        fetchPlatformStats(),
        fetchActivityStats(),
      ])
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await ngrokApi.get('/api/admin/users')
      setUsers(response.data.users)
      setStats(response.data.stats)
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch users')
      console.error('Error fetching users:', err)
    }
  }

  const fetchPlatformStats = async () => {
    try {
      const response = await ngrokApi.get('/api/admin/stats')
      setPlatformStats(response.data)
    } catch (err) {
      console.error('Error fetching platform stats:', err)
    }
  }

  const fetchActivityStats = async () => {
    try {
      const response = await ngrokApi.get('/api/user-activity/stats?days=30')
      setActivityStats(response.data)
    } catch (err) {
      console.error('Error fetching activity stats:', err)
    }
  }

  const handleUpdateTier = async (userId, newTier) => {
    try {
      await ngrokApi.patch(`/api/admin/users/${userId}/tier`, { tier: newTier })
      setSuccess(`User tier updated to ${newTier}`)
      setTimeout(() => setSuccess(''), 3000)
      fetchUsers()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update user tier')
      setTimeout(() => setError(''), 3000)
    }
  }

  const handleToggleStripAds = async () => {
    const newValue = !bannerAdStripShow

    try {
      // Save to database
      await ngrokApi.patch('/api/admin/settings', {
        bannerAdStripShow: newValue,
      })

      // Update local state
      setBannerAdStripShow(newValue)
      setSuccess(`Strip ads ${newValue ? 'enabled' : 'disabled'} globally`)
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update ad settings')
      setTimeout(() => setError(''), 3000)
    }
  }

  const handleToggleFullAds = async () => {
    const newValue = !bannerAdFullShow

    try {
      // Save to database
      await ngrokApi.patch('/api/admin/settings', {
        bannerAdFullShow: newValue,
      })

      // Update local state
      setBannerAdFullShow(newValue)
      setSuccess(
        `Full banner ads ${newValue ? 'enabled' : 'disabled'} globally`
      )
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update ad settings')
      setTimeout(() => setError(''), 3000)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchAllData()
  }

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTier = filterTier === 'all' || u.tier === filterTier
    const matchesType =
      filterType === 'all' ||
      (filterType === 'regular' && !u.HR && !u.isAdmin) ||
      (filterType === 'hr' && u.HR) ||
      (filterType === 'admin' && u.isAdmin)

    return matchesSearch && matchesTier && matchesType
  })

  // Check if user is admin
  if (!user?.isAdmin) {
    return (
      <View style={styles.container}>
        <View style={styles.unauthorizedCard}>
          <FontAwesome name="ban" style={styles.unauthorizedIcon} />
          <Text style={styles.unauthorizedTitle}>Access Denied</Text>
          <Text style={styles.unauthorizedText}>
            You don't have permission to access this page.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setInfoToShow('')}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Loading Admin Panel...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerIcon}>👑</Text>
            <View>
              <Text style={styles.headerTitle}>Admin Panel</Text>
              <Text style={styles.headerSubtitle}>Platform Management</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setInfoToShow('')}
          >
            <MaterialIcons name="cancel" size={28} color="#F9B321" />
          </TouchableOpacity>
        </View>

        {/* Success/Error Messages */}
        {success ? (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>{success}</Text>
          </View>
        ) : null}
        {error ? (
          <View style={styles.errorMessage}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Platform Stats */}
        {platformStats && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📊 Platform Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>👥</Text>
                <Text style={styles.statValue}>
                  {platformStats.users.total}
                </Text>
                <Text style={styles.statLabel}>Total Users</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>🌟</Text>
                <Text style={styles.statValue}>
                  {platformStats.users.premium}
                </Text>
                <Text style={styles.statLabel}>Premium</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>💼</Text>
                <Text style={styles.statValue}>{platformStats.users.hr}</Text>
                <Text style={styles.statLabel}>HR Users</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>📄</Text>
                <Text style={styles.statValue}>{platformStats.cvs.public}</Text>
                <Text style={styles.statLabel}>Public CVs</Text>
              </View>
            </View>
          </View>
        )}

        {/* Activity Stats */}
        {activityStats && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📈 User Activity (30 Days)</Text>
            <View style={styles.activityGrid}>
              <View style={styles.activityCard}>
                <Text style={styles.activityIcon}>📅</Text>
                <Text style={styles.activityValue}>
                  {activityStats.activeUsers?.daily || 0}
                </Text>
                <Text style={styles.activityLabel}>Today</Text>
              </View>
              <View style={styles.activityCard}>
                <Text style={styles.activityIcon}>📆</Text>
                <Text style={styles.activityValue}>
                  {activityStats.activeUsers?.weekly || 0}
                </Text>
                <Text style={styles.activityLabel}>This Week</Text>
              </View>
              <View style={styles.activityCard}>
                <Text style={styles.activityIcon}>📊</Text>
                <Text style={styles.activityValue}>
                  {activityStats.activeUsers?.monthly || 0}
                </Text>
                <Text style={styles.activityLabel}>This Month</Text>
              </View>
            </View>
          </View>
        )}

        {/* Advertisement Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📢 Advertisement Controls</Text>

          {/* Strip Ads Control */}
          <View style={styles.adControlCard}>
            <Text style={styles.adControlTitle}>Strip Ads (Bottom Banner)</Text>
            <View style={styles.adStatusRow}>
              <Text style={styles.adLabel}>Status:</Text>
              <View
                style={[
                  styles.adStatusBadge,
                  bannerAdStripShow
                    ? styles.adStatusEnabled
                    : styles.adStatusDisabled,
                ]}
              >
                <Text style={styles.adStatusText}>
                  {bannerAdStripShow ? '✓ Enabled' : '✗ Disabled'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.toggleButton,
                bannerAdStripShow
                  ? styles.toggleButtonDisable
                  : styles.toggleButtonEnable,
              ]}
              onPress={handleToggleStripAds}
            >
              <Text style={styles.toggleButtonText}>
                {bannerAdStripShow
                  ? '🚫 Disable Strip Ads'
                  : '✅ Enable Strip Ads'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Full Banner Ads Control */}
          <View style={styles.adControlCard}>
            <Text style={styles.adControlTitle}>Full Banner Ads (Popup)</Text>
            <View style={styles.adStatusRow}>
              <Text style={styles.adLabel}>Status:</Text>
              <View
                style={[
                  styles.adStatusBadge,
                  bannerAdFullShow
                    ? styles.adStatusEnabled
                    : styles.adStatusDisabled,
                ]}
              >
                <Text style={styles.adStatusText}>
                  {bannerAdFullShow ? '✓ Enabled' : '✗ Disabled'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.toggleButton,
                bannerAdFullShow
                  ? styles.toggleButtonDisable
                  : styles.toggleButtonEnable,
              ]}
              onPress={handleToggleFullAds}
            >
              <Text style={styles.toggleButtonText}>
                {bannerAdFullShow
                  ? '🚫 Disable Full Ads'
                  : '✅ Enable Full Ads'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Info Note */}
          <View style={styles.adNoteCard}>
            <MaterialIcons name="info" size={16} color="#278ACD" />
            <Text style={styles.adNoteText}>
              Premium users will never see ads, regardless of these settings.
            </Text>
          </View>
        </View>

        {/* User Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 User Management</Text>

          {/* Search Input */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search by email..."
            placeholderTextColor="#999"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          {/* Filters */}
          <View style={styles.filtersRow}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterTier === 'all' && styles.filterButtonActive,
              ]}
              onPress={() => setFilterTier('all')}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filterTier === 'all' && styles.filterButtonTextActive,
                ]}
              >
                All Tiers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterTier === 'free' && styles.filterButtonActive,
              ]}
              onPress={() => setFilterTier('free')}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filterTier === 'free' && styles.filterButtonTextActive,
                ]}
              >
                Free
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterTier === 'premium' && styles.filterButtonActive,
              ]}
              onPress={() => setFilterTier('premium')}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filterTier === 'premium' && styles.filterButtonTextActive,
                ]}
              >
                Premium
              </Text>
            </TouchableOpacity>
          </View>

          {/* User Stats Summary */}
          {stats && (
            <View style={styles.userStatsSummary}>
              <Text style={styles.summaryText}>Total: {stats.total}</Text>
              <Text style={styles.summaryText}>HR: {stats.hr}</Text>
              <Text style={styles.summaryText}>Free: {stats.free}</Text>
              <Text style={styles.summaryText}>Premium: {stats.premium}</Text>
            </View>
          )}

          {/* User List */}
          {filteredUsers.length === 0 ? (
            <Text style={styles.noResults}>No users found</Text>
          ) : (
            filteredUsers.map((u) => (
              <View key={u._id} style={styles.userCard}>
                <View style={styles.userCardHeader}>
                  <Text style={styles.userEmail} numberOfLines={1}>
                    {u.email}
                  </Text>
                  {u.isAdmin && (
                    <View style={styles.adminBadge}>
                      <Text style={styles.adminBadgeText}>ADMIN</Text>
                    </View>
                  )}
                </View>

                <View style={styles.userCardDetails}>
                  <View style={styles.userDetailRow}>
                    <Text style={styles.userDetailLabel}>Type:</Text>
                    <View
                      style={[
                        styles.badge,
                        u.HR ? styles.badgeHR : styles.badgeRegular,
                      ]}
                    >
                      <Text style={styles.badgeText}>
                        {u.isAdmin ? 'Admin' : u.HR ? 'HR' : 'Regular'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.userDetailRow}>
                    <Text style={styles.userDetailLabel}>Tier:</Text>
                    <View
                      style={[
                        styles.badge,
                        u.tier === 'premium'
                          ? styles.badgePremium
                          : styles.badgeFree,
                      ]}
                    >
                      <Text style={styles.badgeText}>{u.tier || 'free'}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.userActions}>
                  {u.tier === 'premium' ? (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.downgradeButton]}
                      onPress={() => handleUpdateTier(u._id, 'free')}
                      disabled={u.isAdmin}
                    >
                      <Text style={styles.actionButtonText}>⬇ Downgrade</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.upgradeButton]}
                      onPress={() => handleUpdateTier(u._id, 'premium')}
                      disabled={u.isAdmin}
                    >
                      <Text style={styles.actionButtonText}>⬆ Upgrade</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1d2e',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1d2e',
  },
  loadingText: {
    color: '#7ac6fa',
    marginTop: 15,
    fontSize: 16,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#232936',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  headerIcon: {
    fontSize: 36,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7ac6fa',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  closeButton: {
    padding: 5,
  },
  unauthorizedCard: {
    backgroundColor: '#232936',
    margin: 20,
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  unauthorizedIcon: {
    fontSize: 60,
    color: '#dc3545',
    marginBottom: 20,
  },
  unauthorizedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 10,
  },
  unauthorizedText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#278ACD',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  successText: {
    color: '#155724',
    fontSize: 14,
    fontWeight: '600',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: '#721c24',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#232936',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7ac6fa',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1a1d2e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7ac6fa',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  activityGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  activityCard: {
    flex: 1,
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  activityIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  activityValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  activityLabel: {
    fontSize: 11,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#1a1d2e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3a3d4e',
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 15,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#1a1d2e',
    borderWidth: 1,
    borderColor: '#3a3d4e',
  },
  filterButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  filterButtonText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 13,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  userStatsSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1d2e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  summaryText: {
    color: '#7ac6fa',
    fontSize: 12,
    fontWeight: '600',
  },
  userCard: {
    backgroundColor: '#1a1d2e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3a3d4e',
  },
  userCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userEmail: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  adminBadge: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  adminBadgeText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  userCardDetails: {
    gap: 8,
    marginBottom: 12,
  },
  userDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userDetailLabel: {
    color: '#999',
    fontSize: 13,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  badgeRegular: {
    backgroundColor: '#e7f3ff',
  },
  badgeHR: {
    backgroundColor: '#d4edda',
  },
  badgeFree: {
    backgroundColor: '#f8d7da',
  },
  badgePremium: {
    backgroundColor: '#fff3cd',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    textTransform: 'capitalize',
  },
  userActions: {
    marginTop: 8,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  upgradeButton: {
    backgroundColor: '#28a745',
  },
  downgradeButton: {
    backgroundColor: '#dc3545',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  noResults: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    paddingVertical: 30,
  },
  adControlCard: {
    gap: 15,
    marginBottom: 20,
    backgroundColor: '#1a1d2e',
    padding: 15,
    borderRadius: 10,
  },
  adControlTitle: {
    color: '#7ac6fa',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
  },
  adStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  adLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  adStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  adStatusEnabled: {
    backgroundColor: '#d4edda',
  },
  adStatusDisabled: {
    backgroundColor: '#f8d7da',
  },
  adStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonEnable: {
    backgroundColor: '#28a745',
  },
  toggleButtonDisable: {
    backgroundColor: '#dc3545',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  adNoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1a1d2e',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#278ACD',
  },
  adNoteText: {
    flex: 1,
    color: '#7ac6fa',
    fontSize: 12,
    lineHeight: 18,
  },
})

export default AdminPanelScreen
