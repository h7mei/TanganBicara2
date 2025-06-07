// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulasikan loading atau cek otentikasi awal
    setTimeout(() => {
      // TODO: Di sini, Anda akan mengecek status otentikasi dari Firebase
      // Contoh: Jika user sudah login, arahkan ke Main Menu, jika belum ke Login/Register
      // Untuk saat ini, kita arahkan ke Walkthrough dulu
      navigation.replace('Walkthrough');
    }, 2000); // Tunda 2 detik
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tangan Bicara</Text>
      <ActivityIndicator size="large" color="#FFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E3A8A', // Warna biru gelap sesuai gambar
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700', // Warna kuning sesuai gambar
    marginBottom: 20,
  },
});

export default SplashScreen;