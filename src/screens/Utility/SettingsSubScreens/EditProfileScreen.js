// src/screens/Utility/SettingsSubScreens/EditProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../../store/authStore'; // Import store untuk akses user
import { updateUserData } from '../../../services/authService'; // Contoh fungsi update data

const EditProfileScreen = ({ navigation }) => {
  const user = useAuthStore((state) => state.user); // Dapatkan user dari store

  // State untuk form input
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  // Tambahkan state lain yang ingin diubah (misal: dob jika memang diubah dari sini)

  const handleSaveChanges = async () => {
    try {
      if (!user?.uid) {
        Alert.alert('Error', 'Pengguna tidak dikenali.');
        return;
      }
      // Update data di Firestore
      await updateUserData(user.uid, {
        fullName: fullName,
        phoneNumber: phoneNumber,
        // ... data lain
      });
      // Update juga di Zustand store (jika diperlukan)
      useAuthStore.getState().setUser({ ...user, fullName, phoneNumber });

      Alert.alert('Sukses', 'Profil berhasil diperbarui!');
      navigation.goBack(); // Kembali ke halaman sebelumnya
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert('Gagal', 'Gagal memperbarui profil: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D428A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ubah Profil</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Masukkan nama lengkap"
        />

        <Text style={styles.label}>Nomor Telepon</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Masukkan nomor telepon"
          keyboardType="phone-pad"
        />

        {/* Anda bisa tambahkan input lain di sini, misal tanggal lahir */}

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
        </TouchableOpacity>
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
    paddingTop: Platform.OS === 'android' ? 30 : 0,
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
    padding: 20,
    alignItems: 'center', // Pusatkan secara horizontal
  },
  label: {
    alignSelf: 'flex-start', // Posisikan label ke kiri
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginTop: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#1D428A',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;