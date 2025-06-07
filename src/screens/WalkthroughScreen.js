// src/screens/WalkthroughScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView, // Tambahkan SafeAreaView
} from "react-native";

import TopShape from '../../assets/images/TopShape.png'; // Sesuaikan path jika berbeda
import BottomShape from '../../assets/images/BottomShape.png'; // Sesuaikan path jika berbeda
import HandImage from '../../assets/images/hand.png'; // Sesuaikan path jika berbeda

const WalkthroughScreen = ({ navigation }) => { 
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateHeight = () =>
      setScreenHeight(Dimensions.get("window").height);
    const subscription = Dimensions.addEventListener("change", updateHeight);
    return () => {
      subscription?.remove();
    };
  }, []);

  const handleNavigate = () => {
    // Mengarahkan ke AuthStack (Login/Register) menggunakan React Navigation
    navigation.replace('AuthStack');
  };

  return (
    <SafeAreaView style={styles.safeArea}> {/* Gunakan SafeAreaView */}
      <View style={styles.container}>
        {/* Background utama */}
        <View style={styles.background} />

        {/* Bentuk abstrak atas */}
        <View style={styles.topShapeWrapper}>
          <Image source={TopShape} style={styles.shapeImage} />
        </View>

        {/* Bentuk abstrak bawah */}
        <View style={styles.bottomShapeWrapper}>
          <Image source={BottomShape} style={styles.shapeImage} />
        </View>

        {/* Judul dan tagline */}
        <View style={[styles.textContainer, { top: screenHeight * 0.32 }]}>
          <Text style={styles.title}>Tangan Bicara</Text>
          <Text style={styles.subtitle}>Berbicara Tanpa Batas</Text>
        </View>

        {/* Gambar tangan */}
        <Image
          source={HandImage}
          style={[styles.handImage, { bottom: screenHeight * 0.15 }]}
          resizeMode="contain"
        />

        {/* Tombol Masuk */}
        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
          <Text style={styles.buttonText}>Masuk Sekarang</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1E3A8A", // Warna latar belakang utama
  },
  container: {
    flex: 1,
    backgroundColor: "#1E3A8A", // Warna latar belakang utama
    justifyContent: "center",
    alignItems: "center",
    position: 'relative', // Penting untuk positioning absolut anak-anak
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#1E3A8A",
  },
  topShapeWrapper: {
    position: "absolute",
    top: -100, // Sesuaikan posisi agar sesuai desain
    left: -100, // Sesuaikan posisi agar sesuai desain
    opacity: 0.5,
    transform: [{ rotate: "30deg" }],
  },
  bottomShapeWrapper: {
    position: "absolute",
    bottom: -100, // Sesuaikan posisi agar sesuai desain
    right: -100, // Sesuaikan posisi agar sesuai desain
    opacity: 0.5,
    transform: [{ rotate: "-30deg" }],
  },
  shapeImage: {
    width: 300,
    height: 300,
  },
  textContainer: {
    position: "absolute",
    alignItems: "center",
    // top: screenHeight * 0.32, // Ini sudah diatur inline style
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFD700", // Kuning
  },
  subtitle: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#E0E0E0", // Abu-abu terang
    marginTop: 6,
  },
  handImage: {
    position: "absolute",
    width: "100%",
    height: "35%",
    top: "42%", // Sesuaikan jika perlu
    left: -30, // Sesuaikan jika perlu
  },
  button: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#FFD700", // Kuning
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#1D428A", // Biru gelap
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WalkthroughScreen;
