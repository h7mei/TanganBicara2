// src/screens/Utility/SettingsSubScreens/ChangePasswordScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  Alert, 
  Platform // Pastikan Platform diimpor
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../../services/firebaseConfig';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'; // Import reauthenticateWithCredential dan EmailAuthProvider

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // States baru untuk visibility masing-masing password input
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Error', 'Semua kolom harus diisi.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'Password baru tidak cocok.');
      return;
    }
    if (newPassword.length < 6) { 
      Alert.alert('Error', 'Password baru minimal 6 karakter.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'Tidak ada pengguna yang login.');
        return;
      }

      // --- Bagian Re-authentication (penting!) ---
      // Re-authenticate user dengan password lama mereka
      // Ini diperlukan oleh Firebase untuk operasi sensitif seperti perubahan password.
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      // --- Akhir Bagian Re-authentication ---

      // Update password
      await updatePassword(user, newPassword);

      Alert.alert('Sukses', 'Password berhasil diubah!');
      // Reset form
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setShowOldPassword(false);
      setShowNewPassword(false);
      setShowConfirmNewPassword(false);
      
      navigation.goBack(); // Kembali ke halaman sebelumnya
    } catch (error) {
      console.error("Error changing password:", error);
      let errorMessage = 'Gagal mengubah password. Silakan coba lagi.';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Password lama salah.';
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Operasi ini sensitif dan membutuhkan autentikasi terbaru. Silakan masukkan password lama Anda dengan benar.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password terlalu lemah. Gunakan kombinasi huruf, angka, dan simbol.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Kredensial tidak valid. Silakan coba lagi.';
      }
      Alert.alert('Gagal', errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D428A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ubah Password</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Password Lama</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            value={oldPassword}
            onChangeText={setOldPassword}
            placeholder="Masukkan password lama Anda"
            secureTextEntry={!showOldPassword}
          />
          <TouchableOpacity 
            style={styles.visibilityToggle} 
            onPress={() => setShowOldPassword(!showOldPassword)}
          >
            <Ionicons 
              name={showOldPassword ? 'eye-off-outline' : 'eye-outline'} 
              size={24} 
              color="#6B7280" 
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Password Baru</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Masukkan password baru"
            secureTextEntry={!showNewPassword}
          />
          <TouchableOpacity 
            style={styles.visibilityToggle} 
            onPress={() => setShowNewPassword(!showNewPassword)}
          >
            <Ionicons 
              name={showNewPassword ? 'eye-off-outline' : 'eye-outline'} 
              size={24} 
              color="#6B7280" 
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Konfirmasi Password Baru</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            placeholder="Konfirmasi password baru Anda"
            secureTextEntry={!showConfirmNewPassword}
          />
          <TouchableOpacity 
            style={styles.visibilityToggle} 
            onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
          >
            <Ionicons 
              name={showConfirmNewPassword ? 'eye-off-outline' : 'eye-outline'} 
              size={24} 
              color="#6B7280" 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
          <Text style={styles.saveButtonText}>Ubah Password</Text>
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
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginTop: 15,
  },
  passwordInputContainer: { // Kontainer untuk input password dan ikon
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    paddingRight: 10, // Ruang untuk ikon
    marginBottom: 10, // Jarak antar inputGroup
  },
  passwordInput: { // TextInput di dalam passwordInputContainer
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  visibilityToggle: { // Tombol ikon mata
    padding: 5,
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

export default ChangePasswordScreen;