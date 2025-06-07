// src/screens/Utility/AboutScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D428A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tentang Aplikasi</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/logos/tb-logo.png')} // Path logo disesuaikan
            style={styles.logo}
          />
          <Text style={styles.appName}>Tangan Bicara</Text> {/* Nama aplikasi diubah */}
          <Text style={styles.appVersion}>Versi 1.0.0</Text>
          <Text style={styles.mainText}>
            Tangan Bicara adalah aplikasi inovatif yang dirancang untuk menjembatani komunikasi antara komunitas dengar dan tuli melalui teknologi penerjemah bahasa isyarat. Misi kami adalah membuat dunia lebih inklusif dengan memfasilitasi pembelajaran dan pemahaman bahasa isyarat.
          </Text>
          <Text style={styles.paragraph}>
            Aplikasi ini menyediakan kamus bahasa isyarat interaktif, fitur deteksi bahasa isyarat (akan datang), dan sumber daya edukasi lainnya untuk membantu Anda mempelajari dan mempraktikkan Bisindo (Bahasa Isyarat Indonesia).
          </Text>
          <Text style={styles.subHeading}>Tim Pengembang</Text>
          <Text style={styles.paragraph}>
            Aplikasi ini dikembangkan dengan dedikasi oleh **Irawan Rexy Albiansyah (NIM: 1203210041)** sebagai bagian dari proyek skripsi. Kami berkomitmen untuk terus meningkatkan dan memperluas fitur Tangan Bicara.
          </Text>
          <Text style={styles.subHeading}>Hubungi Kami</Text>
          <Text style={styles.paragraph}>
            Untuk pertanyaan, saran, atau laporan bug, silakan hubungi kami di:{'\n'}
            support@tanganbicara.com {/* Email disesuaikan dengan nama aplikasi */}
          </Text>
          <Text style={styles.footerText}>© {new Date().getFullYear()} Tangan Bicara. Semua Hak Dilindungi.</Text> {/* Tahun diperbarui otomatis */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 20, // Tambahkan paddingTop di sini untuk menurunkan konten SafeAreaView secara keseluruhan
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12, // Default
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0, // Tambahkan padding khusus Android
    // Jika iOS, SafeAreaView sudah menangani padding atas.
    // Jika Android, tambahkan padding ekstra karena tidak ada SafeAreaView default di status bar.
  },
  backButton: {
    padding: 5,
    // marginTop: Platform.OS === 'android' ? 20 : 0, // Jika ingin menurunkannya lagi di Android
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
    alignItems: 'center', // Pusatkan konten
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D428A',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  mainText: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify', // Diubah menjadi justify
    color: '#333',
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
    textAlign: 'justify', // Diubah menjadi justify
    color: '#333',
  },
  footerText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default AboutScreen;