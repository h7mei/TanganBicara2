// src/screens/WalkthroughScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, SafeAreaView } from "react-native";

import TopShape from "../../assets/images/TopShape.png";
import BottomShape from "../../assets/images/BottomShape.png";
import HandImage from "../../assets/images/hand.png";

const WalkthroughScreen = ({ navigation }) => {
  const [screenHeight, setScreenHeight] = useState(Dimensions.get("window").height);

  useEffect(() => {
    const updateHeight = () => setScreenHeight(Dimensions.get("window").height);
    const subscription = Dimensions.addEventListener("change", updateHeight);
    return () => {
      subscription?.remove();
    };
  }, []);

  const handleNavigate = () => {
    navigation.replace("AuthStack");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <Image source={HandImage} style={[styles.handImage, { bottom: screenHeight * 0.15 }]} resizeMode="contain" />

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
    backgroundColor: "#1E3A8A",
  },
  container: {
    flex: 1,
    backgroundColor: "#1E3A8A",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#1E3A8A",
  },
  topShapeWrapper: {
    position: "absolute",
    top: -100,
    left: -100,
    opacity: 0.5,
    transform: [{ rotate: "30deg" }],
  },
  bottomShapeWrapper: {
    position: "absolute",
    bottom: -100,
    right: -100,
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
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFD700",
  },
  subtitle: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#E0E0E0",
    marginTop: 6,
  },
  handImage: {
    position: "absolute",
    width: "100%",
    height: "35%",
    top: "42%",
    left: -30,
  },
  button: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#FFD700",
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
    color: "#1D428A",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WalkthroughScreen;
