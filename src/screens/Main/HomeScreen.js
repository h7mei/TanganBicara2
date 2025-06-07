import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../services/firebaseConfig';
import { getUserData } from '../../services/authService';
import { useAuthStore } from '../../store/authStore'; // <--- Import useAuthStore

// Import ikon gambar kustom dari assets/images
import BookIcon from '../../../assets/images/book.png';
import TranslatorIcon from '../../../assets/images/translator.png';

// Import data kategori dan tanda dari CategoryDetailScreen.js
// PASTIKAN PATH INI SESUAI DENGAN LOKASI FILE DI PROYEK ANDA
import { signsData, allCategories } from './CategoryDetailScreen';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("Pengguna");
  const authUser = useAuthStore((state) => state.user); // <--- Dapatkan user dari Zustand store

  // Filter atau pilih tanda-tanda populer/rekomendasi
  const popularSigns = [
    signsData['1'] ? signsData['1'][0] : null, // Apa
    signsData['1'] ? signsData['1'][1] : null, // Apa Kabar
    signsData['7'] ? signsData['7'][0] : null, // Terima Kasih
    signsData['5'] ? signsData['5'][6] : null, // Saya
  ].filter(sign => sign !== null);

  useEffect(() => {
    const fetchAndSetUserName = async () => {
      // Gunakan authUser dari Zustand store
      if (authUser) { 
        // Jika fullName sudah ada di authUser dari store, langsung gunakan
        if (authUser.fullName) {
          setUserName(authUser.fullName);
        } else {
          // Jika tidak ada di store (misal, pertama kali login atau data belum lengkap),
          // coba ambil dari Firestore lagi.
          try {
            const userData = await getUserData(authUser.uid);
            if (userData?.fullName) {
              setUserName(userData.fullName);
              // Pastikan store juga diupdate jika ada perbedaan
              useAuthStore.getState().setUser({ ...authUser, ...userData });
            }
          } catch (error) {
            console.error("Error fetching user data for HomeScreen:", error);
          }
        }
      } else {
        setUserName("Pengguna"); // Jika tidak ada user (logged out)
      }
    };

    fetchAndSetUserName();

    // Listener onAuthStateChanged tetap penting untuk perubahan status auth (login/logout)
    // Tapi untuk update data profil, kita bisa andalkan perubahan di authUser dari Zustand
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // Jika ada perubahan user dari Firebase Auth, fetch lagi
        // initializeAuthListener di App.js seharusnya sudah menangani ini
        // Tapi kita bisa panggil fetchAndSetUserName lagi untuk memastikan
        fetchAndSetUserName();
      } else {
        setUserName("Pengguna");
      }
    });

    return () => unsubscribe();
  }, [authUser]); // <--- TAMBAHKAN authUser SEBAGAI DEPENDENSI!

  // Fungsi untuk menangani klik pada kartu tanda populer
  const handleSignCardPress = (sign) => {
    let categoryId = null;
    let categoryName = '';
    let filteredSigns = [];
    let index = 0;

    for (const catId in signsData) {
      const signsInCat = signsData[catId];
      const foundIndex = signsInCat.findIndex(s => s.id === sign.id);
      if (foundIndex !== -1) {
        categoryId = catId;
        filteredSigns = signsInCat;
        index = foundIndex;
        const categoryObj = allCategories.find(cat => cat.id === catId);
        if (categoryObj) {
          categoryName = categoryObj.name;
        }
        break;
      }
    }

    if (categoryId) {
      navigation.navigate('KamusTab', {
        screen: 'SignDetail',
        params: {
          sign: sign,
          categoryId: categoryId,
          categoryName: categoryName,
          filteredSigns: filteredSigns,
          index: index,
          allCategories: allCategories,
          signsData: signsData,
        },
      });
    } else {
      Alert.alert("Error", "Tanda tidak ditemukan dalam kategori mana pun.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>
            Hai, {userName}{"\n"}
            <Text style={styles.boldText}>Selamat Datang!</Text>
          </Text>
          <Text style={styles.subText}>Bagaimana Harimu?</Text>
        </View>

        <View style={styles.contentContainer}>
          {/* Fitur Kamus & Translator */}
          <Text style={styles.featureTitle}>Yuk, Eksplor Fitur Kami!</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('KamusTab')}>
              <Image source={BookIcon} style={styles.icon} />
              <Text style={styles.featureText}>Kamus BISINDO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('Translator')}>
              <Image source={TranslatorIcon} style={styles.icon} />
              <Text style={styles.featureText}>Translator</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.spacingBetweenSections} />

          {/* Bagian untuk Menampilkan Tanda-Tanda Populer */}
          <Text style={styles.featureTitle}>Tanda Populer & Rekomendasi</Text>
          <View style={styles.signContainer}>
            {popularSigns.map((sign, index) => (
              <TouchableOpacity
                key={sign.id}
                style={styles.signCard}
                onPress={() => handleSignCardPress(sign)}
              >
                <View style={styles.imageContainer}>
                  <Ionicons name="hand-right-outline" size={50} color="#1D428A" />
                  {index === 0 && (
                    <View style={styles.tagContainer}>
                      <Text style={styles.tagPopular}>Populer</Text>
                    </View>
                  )}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.signLabel}>{sign.name}</Text>
                  <Text style={styles.signDescription}>{sign.description.split('.')[0] + '.'}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.spacingBetweenSections} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContent: {
    backgroundColor: '#1D428A',
    padding: 20,
    marginTop: 0,
    paddingTop: 80,
    paddingBottom: 80,
  },
  welcomeText: {
    fontSize: 36,
    color: "#fff",
  },
  boldText: {
    fontWeight: "bold",
    color: "#FFD700",
  },
  subText: {
    fontWeight: "normal",
    color: "#FFF",
    fontSize: 18,
    marginTop: 7,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  featureButton: {
    width: width * 0.43,
    paddingVertical: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  featureText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: 'center',
  },
  spacingBetweenSections: {
    marginBottom: 25,
  },
  signContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  signCard: {
    width: width * 0.43,
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
    padding: 0,
    overflow: "hidden",
  },
  imageContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F2F7',
    marginBottom: 10,
    position: 'relative',
  },
  tagContainer: {
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 1,
  },
  tagPopular: {
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor: "#FFD700",
    color: "#1D428A",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  tagNew: {
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor: "#1D428A",
    color: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
    alignItems: 'flex-start',
  },
  signLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: '#1D428A',
  },
  signDescription: {
    fontSize: 12,
    color: 'gray',
  },
});

export default HomeScreen;