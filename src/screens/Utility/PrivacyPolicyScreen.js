// src/screens/Utility/PrivacyPolicyScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Platform, // <-- Tambahkan import Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D428A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kebijakan Privasi</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.mainText}>Kebijakan Privasi Aplikasi Tangan Bicara</Text> {/* Nama aplikasi diubah */}
          <Text style={styles.paragraph}>
            Selamat datang di aplikasi Tangan Bicara. Kami berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat Anda menggunakan aplikasi kami.
          </Text>
          <Text style={styles.subHeading}>Informasi yang Kami Kumpulkan</Text>
          <Text style={styles.paragraph}>
            Kami mengumpulkan informasi yang Anda berikan langsung kepada kami, seperti nama dan email, saat Anda mendaftar atau menggunakan fitur tertentu dalam aplikasi. Kami juga dapat mengumpulkan data penggunaan non-pribadi untuk tujuan analisis dan peningkatan layanan.
          </Text>
          <Text style={styles.subHeading}>Penggunaan Informasi</Text>
          <Text style={styles.paragraph}>
            Informasi yang kami kumpulkan digunakan untuk menyediakan, memelihara, dan meningkatkan aplikasi kami, serta untuk berkomunikasi dengan Anda mengenai layanan kami. Kami tidak akan membagikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali jika diwajibkan oleh hukum.
          </Text>
          <Text style={styles.subHeading}>Keamanan Data</Text>
          <Text style={styles.paragraph}>
            Kami menerapkan berbagai langkah keamanan untuk menjaga keamanan informasi pribadi Anda. Namun, tidak ada metode transmisi melalui internet, atau metode penyimpanan elektronik, yang 100% aman.
          </Text>
          <Text style={styles.paragraph}>
            Dengan menggunakan aplikasi Tangan Bicara, Anda menyetujui pengumpulan dan penggunaan informasi sesuai dengan Kebijakan Privasi ini.
          </Text>
          <Text style={styles.footerText}>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</Text> {/* Tanggal otomatis */}
        </View>
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    padding: 20,
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#1D428A',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#1D428A',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
    color: '#333',
    textAlign: 'justify', // Diubah menjadi justify
  },
  footerText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default PrivacyPolicyScreen;