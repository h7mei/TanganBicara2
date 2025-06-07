// src/screens/Utility/HelpScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HelpScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D428A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Panduan Penggunaan</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.mainText}>Selamat Datang di Panduan Aplikasi Tangan Bicara!</Text>
          <Text style={styles.paragraph}>
            Aplikasi ini dirancang untuk membantu Anda belajar Bahasa Isyarat Indonesia (Bisindo) dan berkomunikasi dengan lebih mudah. Berikut adalah cara menggunakan fitur-fitur utama kami:
          </Text>

          {/* Bagian 1: Kamus BISINDO */}
          <Text style={styles.subHeading}>1. Kamus BISINDO</Text>
          <Text style={styles.paragraph}>
            Fitur Kamus memungkinkan Anda mencari dan mempelajari berbagai tanda Bisindo.
          </Text>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>a.</Text>
            <Text style={styles.stepText}>
              Dari layar utama (Home), ketuk kartu "Kamus BISINDO" atau pilih tab "Kamus" di navigasi bawah.
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>b.</Text>
            <Text style={styles.stepText}>
              Di halaman Kamus, Anda bisa melihat daftar kategori tanda. Ketuk kategori untuk menjelajahi tanda-tanda di dalamnya.
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>c.</Text>
            <Text style={styles.stepText}>
              Gunakan kolom pencarian di bagian atas untuk menemukan tanda spesifik berdasarkan namanya.
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>d.</Text>
            <Text style={styles.stepText}>
              Ketuk sebuah tanda untuk melihat detailnya, termasuk video demonstrasi, deskripsi, dan navigasi ke tanda lain dalam kategori yang sama.
            </Text>
          </View>

          {/* Bagian 2: Penerjemah Bahasa Isyarat */}
          <Text style={styles.subHeading}>2. Penerjemah Bahasa Isyarat</Text>
          <Text style={styles.paragraph}>
            Fitur Penerjemah menggunakan teknologi deteksi untuk membantu Anda memahami gerakan tangan.
          </Text>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>a.</Text>
            <Text style={styles.stepText}>
              Dari layar utama (Home), ketuk kartu "Translator" atau pilih tab "Translator" di navigasi bawah.
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>b.</Text>
            <Text style={styles.stepText}>
              Arahkan kamera perangkat Anda ke tangan yang melakukan bahasa isyarat. Pastikan pencahayaan cukup dan tangan terlihat jelas di dalam kotak kamera.
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>c.</Text>
            <Text style={styles.stepText}>
              Hasil deteksi akan muncul di bagian bawah layar, menunjukkan tanda yang terdeteksi dan deskripsinya.
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>d.</Text>
            <Text style={styles.stepText}>
              Gunakan ikon flip kamera di pojok kanan bawah untuk beralih antara kamera depan dan belakang.
            </Text>
          </View>

          {/* Bagian 3: Pengaturan Akun */}
          <Text style={styles.subHeading}>3. Pengaturan Akun</Text>
          <Text style={styles.paragraph}>
            Kelola informasi pribadi dan preferensi akun Anda.
          </Text>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>a.</Text>
            <Text style={styles.stepText}>
              Dari layar utama (Home), pilih tab "Profil" di navigasi bawah.
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>b.</Text>
            <Text style={styles.stepText}>
              Di halaman Profil, ketuk "Pengaturan Akun".
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>c.</Text>
            <Text style={styles.stepText}>
              Anda dapat mengubah nama, email, dan nomor telepon di "Ubah Profil", atau mengganti password Anda di "Ubah Password".
            </Text>
          </View>
          
          <Text style={styles.footerText}>
            Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami melalui halaman "Tentang Aplikasi".
          </Text>
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
    marginTop: 20, // Jarak antar bagian
    marginBottom: 10,
    color: '#1D428A',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
    color: '#333',
    textAlign: 'justify',
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingLeft: 10, // Indentasi untuk langkah-langkah
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1D428A',
    marginRight: 5,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  footerText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 30,
    textAlign: 'center',
  },
});

export default HelpScreen;