// src/screens/Admin/AdminDashboardScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions,
  Modal, 
  Image, 
  Alert,
  Platform, // Untuk deteksi OS
  TouchableWithoutFeedback // Import ini
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../../services/authService';

const { width, height } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.7; // Lebar sidebar 70% dari lebar layar

const AdminDashboardScreen = () => {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
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
            } catch (error) {
              console.error("Logout error:", error);
              Alert.alert("Logout Gagal", "Terjadi kesalahan saat logout.");
            }
          }
        }
      ]
    );
  };

  const navigateAndCloseSidebar = (screenName) => {
    setIsSidebarOpen(false);
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsSidebarOpen(true)} style={styles.hamburgerButton}>
          <Ionicons name="menu-outline" size={30} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigateAndCloseSidebar('UserManagement')}
          >
            <Ionicons name="people-outline" size={width * 0.1} color="#1E3A8A" />
            <Text style={styles.cardTitle}>User Management</Text>
            <Text style={styles.cardSubtitle}>Kelola akun pengguna dan role.</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card} 
            onPress={() => Alert.alert('Coming Soon', 'Fitur Kelola Kamus akan segera hadir!')}
          >
            <Ionicons name="book-outline" size={width * 0.1} color="#22C55E" />
            <Text style={styles.cardTitle}>Kelola Kamus</Text>
            <Text style={styles.cardSubtitle}>Tambah, edit, dan hapus entri kamus isyarat.</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => Alert.alert('Coming Soon', 'Fitur Analytics Aplikasi akan segera hadir!')}
          >
            <Ionicons name="analytics-outline" size={width * 0.1} color="#F97316" />
            <Text style={styles.cardTitle}>Analytics Aplikasi</Text>
            <Text style={styles.cardSubtitle}>Lihat statistik dan performa aplikasi.</Text>
          </TouchableOpacity>

          <View style={styles.comingSoonCard}>
            <Text style={styles.comingSoonText}>Coming Soon</Text>
            <Ionicons name="ellipsis-horizontal-circle-outline" size={width * 0.08} color="#999" style={{ marginTop: 10 }}/>
          </View>
        </View>
      </View>

      {/* Modal Sidebar Kustom - Struktur diubah */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSidebarOpen}
        onRequestClose={() => setIsSidebarOpen(false)}
      >
        {/* Overlay yang bisa diklik untuk menutup sidebar */}
        <TouchableWithoutFeedback onPress={() => setIsSidebarOpen(false)}>
          <View style={styles.sidebarOverlay}>
            {/* Sidebar Container itu sendiri (tidak lagi dibungkus TouchableOpacity) */}
            {/* Menggunakan onStartShouldSetResponder untuk mencegah klik di dalam sidebar menutupnya */}
            <View 
              style={styles.sidebarContainer}
              onStartShouldSetResponder={(event) => true} // Mencegah event sentuh menyebar ke overlay
              pointerEvents="auto" // Memastikan View bisa menerima event sentuh
            >
              {/* Area Logo di atas Sidebar */}
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../../assets/logos/tb-logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.sidebarUserName}>Admin User</Text>
              </View>

              {/* Menu Navigasi Sidebar */}
              <View style={styles.sidebarMenu}>
                <TouchableOpacity 
                  style={styles.sidebarMenuItem} 
                  onPress={() => navigateAndCloseSidebar('AdminDashboard')}
                >
                  <Ionicons name="home-outline" size={24} color="#333" />
                  <Text style={styles.sidebarMenuText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.sidebarMenuItem} 
                  onPress={() => navigateAndCloseSidebar('UserManagement')}
                >
                  <Ionicons name="people-outline" size={24} color="#333" />
                  <Text style={styles.sidebarMenuText}>User Management</Text>
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

              {/* Tombol Logout di bagian bawah Sidebar */}
              <View style={styles.sidebarFooter}>
                  <TouchableOpacity style={styles.sidebarLogoutButton} onPress={handleLogout}>
                      <Ionicons name="log-out-outline" size={24} color="#FFF" />
                      <Text style={styles.sidebarLogoutButtonText}>Logout</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
  container: {
    flex: 1,
    padding: 10, 
    paddingTop: 20, 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginBottom: 10, 
  },
  card: {
    width: width * 0.44, 
    backgroundColor: '#FFFFFF',
    borderRadius: 15, 
    padding: 15, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8, 
    height: width * 0.44, 
    marginHorizontal: 5, 
  },
  cardTitle: {
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12, 
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  comingSoonCard: {
    width: width * 0.44, 
    height: width * 0.44, 
    backgroundColor: '#E0E0E0', 
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 5,
    elevation: 4, 
    marginHorizontal: 5,
    opacity: 0.7, 
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#777',
    textAlign: 'center',
  },

  // --- Gaya untuk Sidebar Kustom ---
  sidebarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', // Untuk menempatkan sidebar di kiri
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
});

export default AdminDashboardScreen;