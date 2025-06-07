// src/screens/Utility/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native'; // Tambahkan Platform
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D428A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pengaturan Akun</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.container}>
        {/* Opsi Ubah Profil */}
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('EditProfile')} // Nama rute ke EditProfileScreen
        >
          <Ionicons name="person-circle-outline" size={24} color="#1D428A" />
          <Text style={styles.menuItemText}>Ubah Profil</Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>

        {/* Opsi Ubah Password */}
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('ChangePassword')} // Nama rute ke ChangePasswordScreen
        >
          <Ionicons name="lock-closed-outline" size={24} color="#1D428A" />
          <Text style={styles.menuItemText}>Ubah Password</Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>
        
        {/* Anda bisa tambahkan opsi pengaturan lain di sini */}
        {/* <Text style={styles.mainText}>Ini adalah halaman Pengaturan Akun.</Text> */}
        {/* <Text style={styles.subText}>Anda bisa menambahkan opsi seperti ubah profil, ubah password, dll. di sini.</Text> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0, // Menurunkan header di Android
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D428A',
  },
  placeholder: {
    width: 24 + 10,
  },
  container: {
    flex: 1,
    // justifyContent: 'center', // Hapus ini agar item dimulai dari atas
    alignItems: 'center',
    padding: 20,
    paddingTop: 20, // Jarak dari header
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  menuItem: { // Gaya yang sama dengan ProfileScreen
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    width: '100%',
    marginTop: 10, // Jarak antar item
    marginBottom: 5, 
    borderWidth: 1,
    borderColor: '#F3F4F6',
    elevation: 1,
    shadowColor: "#000", // Tambahkan shadow jika ingin lebih menonjol
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1D428A',
    marginLeft: 15,
  },
});

export default SettingsScreen;