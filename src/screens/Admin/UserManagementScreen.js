// src/screens/Admin/UserManagementScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  Image,
  Dimensions,
  Platform,
  TextInput,
  Pressable,
  TouchableWithoutFeedback // <-- Import ini!
} from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { logoutUser, registerUser } from '../../services/authService';
import { getAllUsers, updateUserRole, deleteUser } from '../../services/adminService';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.7; // Lebar sidebar 70% dari lebar layar

const UserManagementScreen = () => {
  const navigation = useNavigation();
  const { user: currentUser } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserFullName, setNewUserFullName] = useState('');
  const [newUserDob, setNewUserDob] = useState('');
  const [newUserPhoneNumber, setNewUserPhoneNumber] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [isRoleFilterDropdownOpen, setIsRoleFilterDropdownOpen] = useState(false);


  const fetchUsers = async () => {
    setRefreshing(true);
    try {
      const fetchedUsers = await getAllUsers();
      // Filter out current logged-in user from the list
      setUsers(fetchedUsers.filter(u => u.uid !== currentUser.uid));
    } catch (error) {
      console.error("Failed to fetch users:", error);
      Alert.alert("Error", "Gagal mengambil data user.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  useEffect(() => {
    let currentUsers = users;

    if (filterRole !== 'all') {
      currentUsers = currentUsers.filter(user => user.role === filterRole);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentUsers = currentUsers.filter(user =>
        (user.fullName && user.fullName.toLowerCase().includes(lowerCaseSearchTerm)) ||
        user.email.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    setFilteredUsers(currentUsers);
  }, [users, searchTerm, filterRole]);

  const handleChangeRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    Alert.alert(
      "Konfirmasi Perubahan Role",
      `Apakah Anda yakin ingin mengubah role user ini menjadi '${newRole}'?`,
      [
        {
          text: "Batal",
          style: "cancel"
        },
        {
          text: "Ya",
          onPress: async () => {
            setLoading(true);
            try {
              await updateUserRole(userId, newRole);
              fetchUsers();
            } catch (error) {
              console.error("Failed to update role:", error);
              Alert.alert("Error", "Gagal mengubah role user.");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const handleDeleteUser = async (userId, userName) => {
    Alert.alert(
      "Konfirmasi Hapus User",
      `Apakah Anda yakin ingin menghapus user "${userName}"?`,
      [
        {
          text: "Batal",
          style: "cancel"
        },
        {
          text: "Ya",
          onPress: async () => {
            setLoading(true);
            try {
              await deleteUser(userId);
              fetchUsers();
            } catch (error) {
              console.error("Failed to delete user:", error);
              Alert.alert("Error", "Gagal menghapus user.");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  // duplicated function, it should be removed or handled correctly
  // const handleLogout = async () => { ... } 
  const handleLogoutAdmin = async () => { // Renamed to avoid conflict with `logoutUser` import
    Alert.alert(
      "Logout",
      "Apakah Anda yakin ingin logout?",
      [
        {
          text: "Batal",
          style: "cancel"
        },
        {
          text: "Ya",
          onPress: async () => {
            try {
              await logoutUser();
              // navigation.replace('Login'); // This navigation logic should be in initializeAuthListener
            } catch (error) {
              console.error("Logout error:", error);
              Alert.alert("Logout Failed", "Terjadi kesalahan saat logout.");
            }
          }
        }
      ]
    );
  };


  const handleAddUser = async () => {
    if (!newUserEmail || !newUserPassword || !newUserFullName || !newUserDob || !newUserPhoneNumber) {
      Alert.alert("Input Kosong", "Semua field harus diisi.");
      return;
    }

    setLoading(true);
    try {
      await registerUser(newUserEmail, newUserPassword, newUserFullName, newUserDob, newUserPhoneNumber);

      Alert.alert("Berhasil", "User baru berhasil ditambahkan.");
      setIsAddUserModalVisible(false);
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserFullName('');
      setNewUserDob('');
      setNewUserPhoneNumber('');
      setNewUserRole('user');
      setIsPasswordVisible(false);
      fetchUsers();
    } catch (error) {
      console.error("Failed to add user:", error);
      Alert.alert("Error", `Gagal menambahkan user: ${error.message || "Terjadi kesalahan"}`);
    } finally {
      setLoading(false);
    }
  };

  // Duplicated function, remove the other one
  // const navigateAndCloseSidebar = (screenName) => { ... }


  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <View>
        <Text style={styles.userName}>{item.fullName || item.email}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userRole}>Role: {item.role}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, item.role === 'admin' ? styles.demoteButton : styles.promoteButton]}
          onPress={() => handleChangeRole(item.id, item.role)}
          disabled={loading}
        >
          <Text style={styles.actionButtonText}>
            {item.role === 'admin' ? 'Demote' : 'Promote'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteUser(item.id, item.fullName || item.email)}
          disabled={loading}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsSidebarOpen(true)} style={styles.hamburgerButton}>
          <Ionicons name="menu-outline" size={30} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Management</Text>
        <TouchableOpacity onPress={() => setIsAddUserModalVisible(true)} style={styles.addUserButton}>
          <Ionicons name="person-add-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.controlsContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by name or email..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor="#999"
        />

        <View style={styles.filterContainer}>
          <Pressable style={styles.filterButton} onPress={() => setIsRoleFilterDropdownOpen(!isRoleFilterDropdownOpen)}>
            <Text style={styles.filterButtonText}>Filter: {filterRole === 'all' ? 'All Roles' : filterRole === 'admin' ? 'Admin' : 'User'}</Text>
            <Ionicons name={isRoleFilterDropdownOpen ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#1E3A8A" />
          </Pressable>
          {isRoleFilterDropdownOpen && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownMenuItem} onPress={() => { setFilterRole('all'); setIsRoleFilterDropdownOpen(false); }}>
                <Text style={styles.dropdownMenuItemText}>All Roles</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownMenuItem} onPress={() => { setFilterRole('admin'); setIsRoleFilterDropdownOpen(false); }}>
                <Text style={styles.dropdownMenuItemText}>Admin</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownMenuItem} onPress={() => { setFilterRole('user'); setIsRoleFilterDropdownOpen(false); }}>
                <Text style={styles.dropdownMenuItemText}>User</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E3A8A" />
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item.id}
          renderItem={renderUserItem}
          contentContainerStyle={styles.listContainer}
          onRefresh={fetchUsers}
          refreshing={refreshing}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>
              {searchTerm || filterRole !== 'all' ? "Data tidak ditemukan." : "No users found."}
            </Text>
          }
        />
      )}

      {/* Modal Sidebar Kustom */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSidebarOpen}
        onRequestClose={() => setIsSidebarOpen(false)}
      >
        {/* Menggunakan TouchableWithoutFeedback untuk overlay penutup */}
        <TouchableWithoutFeedback onPress={() => setIsSidebarOpen(false)}>
          <View style={styles.sidebarOverlay}>
            {/* Sidebar Container itu sendiri */}
            <View 
              style={styles.sidebarContainer}
              // Mencegah klik di dalam sidebar menutup modal
              onStartShouldSetResponder={() => true} 
              pointerEvents="auto" 
            >
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../../assets/logos/tb-logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.sidebarUserName}>{currentUser?.fullName || currentUser?.email || "Admin User"}</Text>
              </View>

              <View style={styles.sidebarMenu}>
                <TouchableOpacity 
                  style={styles.sidebarMenuItem} 
                  onPress={() => navigateAndCloseSidebar('AdminDashboard')}
                >
                  <Ionicons name="home-outline" size={24} color="#333" />
                  <Text style={styles.sidebarMenuText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.sidebarMenuItem, {backgroundColor: '#E0E7FF'}]}
                  onPress={() => navigateAndCloseSidebar('UserManagement')}
                >
                  <Ionicons name="people-outline" size={24} color="#1E3A8A" />
                  <Text style={[styles.sidebarMenuText, {color: '#1E3A8A'}]}>User Management</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.sidebarMenuItem} 
                  onPress={() => { Alert.alert('Coming Soon', 'Fitur Kelola Kamus akan segera hadir!'); setIsSidebarOpen(false); }}
                >
                  <Ionicons name="book-outline" size={24} color="#333" />
                  <Text style={styles.sidebarMenuText}>Kelola Kamus</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.sidebarMenuItem} 
                  onPress={() => { Alert.alert('Coming Soon', 'Fitur Analytics Aplikasi akan segera hadir!'); setIsSidebarOpen(false); }}
                >
                  <Ionicons name="analytics-outline" size={24} color="#333" />
                  <Text style={styles.sidebarMenuText}>Analytics Aplikasi</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.sidebarFooter}>
                  <TouchableOpacity style={styles.sidebarLogoutButton} onPress={handleLogoutAdmin}> {/* Use handleLogoutAdmin */}
                      <Ionicons name="log-out-outline" size={24} color="#FFF" />
                      <Text style={styles.sidebarLogoutButtonText}>Logout</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal Add User */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddUserModalVisible}
        onRequestClose={() => setIsAddUserModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.addModalContainer}>
            <Text style={styles.addModalTitle}>Add New User</Text>
            <TextInput
              style={styles.addModalInput}
              placeholder="Full Name"
              value={newUserFullName}
              onChangeText={setNewUserFullName}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.addModalInput}
              placeholder="Date of Birth (DD/MM/YYYY)"
              value={newUserDob}
              onChangeText={setNewUserDob}
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.addModalInput}
              placeholder="Phone Number"
              value={newUserPhoneNumber}
              onChangeText={setNewUserPhoneNumber}
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.addModalInput}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={newUserEmail}
              onChangeText={setNewUserEmail}
              placeholderTextColor="#999"
            />
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordTextInput}
                placeholder="Password"
                secureTextEntry={!isPasswordVisible}
                value={newUserPassword}
                onChangeText={setNewUserPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={styles.passwordVisibilityToggle}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.roleSelectionContainer}>
              <Text style={styles.roleSelectionLabel}>Select Role:</Text>
              <TouchableOpacity
                style={[styles.roleOptionButton, newUserRole === 'user' && styles.roleOptionButtonActive]}
                onPress={() => setNewUserRole('user')}
              >
                <Text style={[styles.roleOptionButtonText, newUserRole === 'user' && styles.roleOptionButtonTextActive]}>User</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleOptionButton, newUserRole === 'admin' && styles.roleOptionButtonActive]}
                onPress={() => setNewUserRole('admin')}
              >
                <Text style={[styles.roleOptionButtonText, newUserRole === 'admin' && styles.roleOptionButtonTextActive]}>Admin</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.addModalButtonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => { setIsAddUserModalVisible(false); setIsPasswordVisible(false); }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleAddUser} disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Add User</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#1E3A8A',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    minHeight: Platform.OS === 'android' ? 70 : 60,
  },
  hamburgerButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  addUserButton: {
    padding: 5,
  },
  controlsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#F0F4F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchBar: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  filterContainer: {
    zIndex: 1,
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E0E7FF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B3C6FF',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#1E3A8A',
    fontWeight: 'bold',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  dropdownMenuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  dropdownMenuItemText: {
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  userItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  userRole: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A8A',
    marginTop: 5,
  },
  actionsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 5,
    minWidth: 120,
    alignItems: 'center',
  },
  promoteButton: {
    backgroundColor: '#22C55E',
  },
  demoteButton: {
    backgroundColor: '#F97316',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    marginTop: 5,
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  // --- Gaya untuk Sidebar Kustom ---
  sidebarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sidebarContainer: {
    width: SIDEBAR_WIDTH,
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    justifyContent: 'space-between',
  },
  logoContainer: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  sidebarUserName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sidebarMenu: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  sidebarMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: 'transparent',
  },
  sidebarMenuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    fontWeight: '500',
  },
  sidebarFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    alignItems: 'center',
  },
  sidebarLogoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
  },
  sidebarLogoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  // --- Gaya untuk Modal Add User ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addModalContainer: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  addModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E3A8A',
  },
  addModalInput: {
    width: '100%',
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  passwordTextInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  passwordVisibilityToggle: {
    padding: 10,
  },
  roleSelectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    width: '100%',
  },
  roleSelectionLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
    fontWeight: '600',
  },
  roleOptionButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A0AEC0',
    marginHorizontal: 5,
    backgroundColor: '#F0F4F8',
  },
  roleOptionButtonActive: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  roleOptionButtonText: {
    color: '#4A5568',
    fontSize: 15,
    fontWeight: 'bold',
  },
  roleOptionButtonTextActive: {
    color: '#FFF',
  },
  addModalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserManagementScreen;