// src/screens/Main/SignDetailScreen.js
import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");

const SignDetailScreen = ({ route, navigation }) => {
  const { sign, categoryId, categoryName, filteredSigns, index, allCategories, signsData } = route.params;
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  const videoSource = sign.video ? require(`../../../assets/videos/Apa.mp4`) : null;

  const handleNextSign = () => {
    const nextIndex = index + 1;
    if (nextIndex < filteredSigns.length) {
      const next = filteredSigns[nextIndex];
      navigation.replace("SignDetail", {
        sign: next,
        categoryId,
        categoryName,
        filteredSigns,
        index: nextIndex,
        allCategories,
        signsData,
      });
    }
  };

  const handlePreviousSign = () => {
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      const prev = filteredSigns[prevIndex];
      navigation.replace("SignDetail", {
        sign: prev,
        categoryId,
        categoryName,
        filteredSigns,
        index: prevIndex,
        allCategories,
        signsData,
      });
    }
  };

  const handleNextCategory = () => {
    const currentCategoryIndex = allCategories.findIndex((cat) => cat.id === categoryId);
    const nextCategoryIndex = currentCategoryIndex + 1;

    if (nextCategoryIndex < allCategories.length) {
      const nextCategory = allCategories[nextCategoryIndex];
      const nextCategorySigns = signsData[nextCategory.id];

      if (nextCategorySigns && nextCategorySigns.length > 0) {
        navigation.replace("SignDetail", {
          sign: nextCategorySigns[0],
          categoryId: nextCategory.id,
          categoryName: nextCategory.name,
          filteredSigns: nextCategorySigns,
          index: 0,
          allCategories,
          signsData,
        });
      } else {
        alert(`Kategori "${nextCategory.name}" tidak memiliki tanda.`);
      }
    } else {
      alert("Ini adalah kategori terakhir.");
    }
  };

  const isLastSignInCategory = index === filteredSigns.length - 1;
  const currentCategoryIndex = allCategories.findIndex((cat) => cat.id === categoryId);
  const isLastCategory = currentCategoryIndex === allCategories.length - 1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D428A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          {categoryName} | {sign.name}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CategoryDetail", { categoryId, categoryName })}
          style={styles.categoryButton}
        >
          <Ionicons name="list" size={24} color="#1D428A" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Kontainer Video */}
        {videoSource ? (
          <View style={styles.videoContainer}>
            <Video
              ref={videoRef}
              style={styles.videoPlayer}
              source={videoSource}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </View>
        ) : (
          <View style={styles.videoPlaceholder}>
            <Ionicons name="videocam-off-outline" size={80} color="#6B7280" />
            <Text style={styles.videoPlaceholderText}>Video tidak tersedia</Text>
            <Text style={styles.videoPlaceholderTextSmall}>
              Pastikan file video ada di assets/videos dan path sudah benar.
            </Text>
          </View>
        )}

        {/* Judul di bawah video */}
        <Text style={styles.signName}>{sign.name}</Text>

        {/* Deskripsi tanda */}
        <Text style={styles.signDescription}>{sign.description}</Text>

        {/* Navigasi antar tanda */}
        <View style={styles.navigationRow}>
          {index > 0 && (
            <TouchableOpacity style={styles.navButton} onPress={handlePreviousSign}>
              <Ionicons name="chevron-back" size={20} color="#fff" />
              <Text style={styles.navButtonText}>Sebelumnya</Text>
            </TouchableOpacity>
          )}

          {index > 0 && !isLastSignInCategory && <View style={{ width: 10 }} />}

          {!isLastSignInCategory && (
            <TouchableOpacity style={styles.navButton} onPress={handleNextSign}>
              <Text style={styles.navButtonText}>Berikutnya</Text>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Tombol Lanjut Kategori */}
        {isLastSignInCategory && !isLastCategory && (
          <TouchableOpacity style={styles.nextCategoryButton} onPress={handleNextCategory}>
            <Text style={styles.nextCategoryButtonText}>Lanjut ke Kategori Berikutnya</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D428A",
    flex: 1,
    marginHorizontal: 5,
  },
  categoryButton: {
    marginLeft: 10,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  signName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D428A",
    marginBottom: 10,
    textAlign: "left",
  },
  signDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "left",
    lineHeight: 24,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  videoPlayer: {
    width: "100%",
    height: "100%",
    alignSelf: "stretch",
    flex: 1,
  },
  videoPlaceholder: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#E5E7EB",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  videoPlaceholderText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 10,
  },
  videoPlaceholderTextSmall: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 5,
    paddingHorizontal: 10,
  },
  navigationRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 5,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D428A",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexGrow: 1,
    justifyContent: "center",
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginHorizontal: 5,
  },
  nextCategoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D428A",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexGrow: 1,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  nextCategoryButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginRight: 10,
  },
});

export default SignDetailScreen;
