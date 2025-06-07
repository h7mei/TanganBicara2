import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { logoutUser } from '../../services/authService';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const user = useAuthStore((state) => state.user); // Objek user sekarang berisi data dari Firestore juga

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Tidak',
          style: 'cancel',
        },
        {
          text: 'Iya',
          onPress: async () => {
            try {
              await logoutUser();
              Alert.alert('Logged Out', 'You have been successfully logged out.');
            } catch (error) {
              Alert.alert('Logout Failed', error.message);
              console.error("Logout error:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Informasi Profil tanpa rectangle */}
          <Image
            source={require('../../../assets/profile/avatar4.png')}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{user ? (user.fullName || user.email) : 'Guest User'}</Text>
          <Text style={styles.userEmail}>{user ? user.email : ''}</Text>
          {user?.dob && <Text style={styles.userInfo}>Tanggal Lahir: {user.dob}</Text>}
          {user?.phoneNumber && <Text style={styles.userInfo}>Telepon: {user.phoneNumber}</Text>}

          {/* Menu Items */}
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} color="#1D428A" />
            <Text style={styles.menuItemText}>Pengaturan Akun</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Ionicons name="document-text-outline" size={24} color="#1D428A" />
            <Text style={styles.menuItemText}>Kebijakan Privasi</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('About')}>
            <Ionicons name="information-circle-outline" size={24} color="#1D428A" />
            <Text style={styles.menuItemText}>Tentang Aplikasi</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text style={styles.logoutButtonText}>Keluar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Latar belakang putih untuk kesan clean
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30, // Padding bawah untuk scroll lebih nyaman
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80, // Jarak atas lebih besar untuk menurunkan profil
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Avatar bulat
    marginBottom: 15,
    backgroundColor: '#E5E7EB', // Placeholder abu-abu jika gambar gagal dimuat
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D428A',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#6B7280', // Abu-abu untuk teks sekunder
    marginBottom: 12,
  },
  userInfo: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12, // Sudut membulat
    padding: 18,
    width: '100%',
    marginTop: 20, // Jarak dari profil untuk pemisahan
    marginBottom: -10, // Jarak antar card lebih dekat
    borderWidth: 1,
    borderColor: '#F3F4F6', // Border tipis untuk definisi
    elevation: 1, // Bayangan sangat subtil
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1D428A',
    marginLeft: 15,
  },
    logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444', // Merah
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#EF4444', // Seragam dengan background
    elevation: 1,
    },
    logoutButtonText: {
    color: '#FFFFFF', // Putih
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    },
});

export default ProfileScreen;