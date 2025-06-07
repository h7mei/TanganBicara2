import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
// Impor dari expo-camera
import { CameraView, useCameraPermissions } from 'expo-camera'; // Kembali ke CameraView Expo
// Impor dari TensorFlow.js
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native'; // Ini yang menginisialisasi backend TF.js untuk RN
import * as jpeg from 'jpeg-js'; // Untuk memproses gambar, perlu diinstal: npm install jpeg-js
import * as mobilenet from '@tensorflow-models/mobilenet'; // Contoh jika Anda butuh utilitas model

import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// ====================================================================
// SANGAT PENTING: LABELS ANDA DARI DATA KATEGORI (tetap sama)
// ====================================================================
const LABELS = [
  "Apa", "Apa Kabar", "Bagaimana", "Halo", "Siapa", "Kapan", "Kemana", 
  "Baik", "Bingung", "Marah", "Ramah", "Sabar", "Sedih", "Senang", 
  "Belajar", "Berdiri", "Duduk", "Makan", "Mandi", "Melihat", "Membaca", "Menulis", "Minum", "Tidur", 
  "Dimana", "Selamat Pagi", "Selamat Siang", "Selamat Sore", "Selamat Malam", 
  "Dia", "Kalian", "Kami", "Kamu", "Kita", "Mereka", "Saya", 
  "Pendek", "Tinggi", 
  "Terima Kasih", 
];
// Pastikan LABELS.length ini cocok dengan output model Anda (39 atau 40).

export default function TranslatorScreen({ navigation }) {
  const [facing, setFacing] = useState('front'); 
  const [permission, requestPermission] = useCameraPermissions(); 
  const cameraRef = useRef(null); 

  const [predictionResult, setPredictionResult] = useState('...');
  const [predictionDescription, setPredictionDescription] = useState('...');
  const [isModelReady, setIsModelReady] = useState(false); 
  const [loadingModel, setLoadingModel] = useState(true);

  // Model TensorFlow.js akan dimuat di sini
  const [tfModel, setTfModel] = useState(null); 

  const INPUT_SIZE = 224; 
  const INPUT_CHANNELS = 3; 
  const SEQUENCE_LENGTH = 30; // Untuk model sequence (LSTM)

  // Path ke model .tflite kamu di assets/model/
  // TF.js perlu path string (format file:// atau http://)
  // Atau bisa juga langsung `require` jika model.json
  const modelUrl = require('../../../assets/model/best_model_mobilenetv2.tflite'); 

  useEffect(() => {
    async function loadTensorFlow() {
      setLoadingModel(true);
      try {
        // Inisialisasi TensorFlow.js backend untuk React Native
        await tf.ready();
        // Coba backend WebGL untuk performa (jika Expo GL terinstal dan compatible)
        // await tf.setBackend('rn-webgl'); 
        console.log(`TensorFlow.js is ready! Using backend: ${tf.getBackend()}`);

        // Muat model TFLite.
        // `tf.lite.loadTFLiteModel` memerlukan URL atau Asset (untuk React Native).
        // Ini adalah cara yang benar untuk memuat .tflite di TF.js RN
        const loadedModel = await tf.lite.loadTFLiteModel(modelUrl);
        setTfModel(loadedModel);
        setIsModelReady(true);
        console.log("Model TFLite berhasil dimuat oleh TF.js!");
      } catch (error) {
        console.error("Gagal memuat TensorFlow.js atau model TFLite:", error);
        Alert.alert("Error AI", `Gagal memuat model AI: ${error.message}.`);
      } finally {
        setLoadingModel(false);
      }
    }
    loadTensorFlow();
  }, []);

  // Fungsi untuk pra-pemrosesan gambar dari base64/URI menjadi tensor
  // Ini adalah bagian paling kompleks untuk model sequence (LSTM)
  const imageToTensor = async (base64Image) => {
    // Anda perlu mengonversi base64 menjadi array piksel
    // Lalu resize dan normalisasi
    // Ini membutuhkan library seperti `jpeg-js` (jika base64) atau `expo-image-manipulator`

    // Contoh placeholder (ini tidak akan berfungsi langsung tanpa pra-pemrosesan yang tepat)
    // Untuk model CNN-LSTM, Anda perlu mengumpulkan 30 frame dan membuat sequence tensor.
    // Ini adalah tantangan terbesar di sini.
    // Misalnya, menggunakan `expo-camera`'s `onCameraReady` atau `onTextureCreated`
    // untuk mendapatkan stream frame, lalu memprosesnya.

    // Untuk TFLite di TF.js RN, Anda perlu tensor [1, 30, 224, 224, 3] (contoh)
    // atau jika model Anda menerima fitur yang sudah di-pooling, maka [1, 30, 1280]
    // Berdasarkan MLIR Anda, inputnya adalah gambar (frames, height, width, channels)
    return tf.zeros([1, SEQUENCE_LENGTH, INPUT_SIZE, INPUT_SIZE, INPUT_CHANNELS]); 
  };


  // Callback untuk memproses frame dari kamera.
  // Expo Camera tidak memiliki 'frameProcessor' built-in seperti VisionCamera.
  // Anda harus menggunakan `onCameraReady` atau `onMountError`
  // dan kemudian menggunakan `cameraRef.current.takePictureAsync` secara berkala
  // atau menggunakan `expo-gl-camera` untuk stream texture.
  
  // Untuk tujuan demo: kita akan menggunakan interval untuk simulasi deteksi
  // Anda akan mengganti ini dengan pengambilan frame kamera secara nyata.
  useEffect(() => {
    let intervalId;
    if (isModelReady && tfModel && cameraRef.current) {
        // Ini adalah simulasi. Anda harus mengganti ini dengan:
        // 1. Mengambil gambar dari cameraRef.current (misal takePictureAsync)
        // 2. Mengolah gambar menjadi tensor sequence (30 frame)
        // 3. Menjalankan inferensi

        intervalId = setInterval(async () => {
            // Contoh sederhana: Ambil gambar sekali, ubah ke base64
            // Ini akan memicu deteksi per detik, BUKAN streaming real-time
            // Untuk real-time, Anda perlu expo-camera-gl atau sejenisnya
            try {
                // Untuk real-time, ini butuh integrasi lebih dalam dengan `expo-camera`
                // atau `expo-gl-camera` untuk mendapatkan frame secara terus-menerus
                // dan mengolahnya di sisi native/JSI.
                // Jika Anda tidak mengintegrasikan real-time dari cameraRef.current,
                // ini hanya akan menjadi dummy prediction.
                
                // --- placeholder untuk mendapatkan frame real-time ---
                // const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });
                // const imageTensor = await imageToTensor(photo.base64);
                // --- akhir placeholder ---

                // Placeholder dummy tensor untuk memicu inferensi jika model sudah siap
                const dummyInputTensor = tf.zeros([1, SEQUENCE_LENGTH, INPUT_SIZE, INPUT_SIZE, INPUT_CHANNELS]);
                const predictions = tfModel.predict(dummyInputTensor);
                const probabilities = predictions.dataSync(); // Ambil array probabilitas

                let maxConfidence = -1;
                let predictedClassIndex = -1;
                for (let i = 0; i < probabilities.length; i++) {
                    if (probabilities[i] > maxConfidence) {
                        maxConfidence = probabilities[i];
                        predictedClassIndex = i;
                    }
                }

                if (predictedClassIndex !== -1 && maxConfidence > 0.6) {
                    const detectedLabel = LABELS[predictedClassIndex];
                    setPredictionResult(detectedLabel);
                    setPredictionDescription(`Keyakinan: ${(maxConfidence * 100).toFixed(2)}%`);
                } else {
                    setPredictionResult("...");
                    setPredictionDescription("Menunggu deteksi jelas...");
                }

                predictions.dispose(); // Penting: bebaskan memori tensor
                dummyInputTensor.dispose();

            } catch (e) {
                console.error("Prediction Error:", e);
                setPredictionResult("Error Deteksi");
                setPredictionDescription("Gagal memproses frame.");
            }
        }, 1000); // Deteksi setiap 1 detik

    } else if (!isModelReady && !loadingModel && tfModel) {
        setPredictionResult("Error Model");
        setPredictionDescription("Model AI tidak siap untuk deteksi.");
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isModelReady, tfModel, loadingModel]); // Dependensi

  // Fungsi untuk mengganti kamera (depan/belakang)
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  // --- START: Izin Kamera ---
  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text style={styles.message}>Memuat izin kamera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>Kami memerlukan izin Anda untuk menampilkan kamera.</Text>
        <TouchableOpacity style={styles.grantButton} onPress={requestPermission}>
            <Text style={styles.grantButtonText}>Berikan Izin</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // --- END: Izin Kamera ---

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Arahkan Kamera Ke Tangan!</Text>

      <View style={styles.cameraWrapper}>
        {loadingModel || !isModelReady ? (
          <View style={styles.cameraLoadingOverlay}>
            <ActivityIndicator size="large" color="#1D428A" />
            <Text style={styles.cameraLoadingText}>
              {loadingModel ? "Memuat model AI..." : "Model AI tidak siap."}
            </Text>
            {!loadingModel && tfModel && !tfModel.isLoaded() && (
                <Text style={styles.cameraLoadingSubText}>Model belum dimuat oleh TF.js.</Text>
            )}
            {!loadingModel && !tfModel && state.error && ( // state.error dari useTensorflowLite kalau ada
                <Text style={styles.cameraLoadingSubText}>{state.error.message || "Periksa log konsol."}</Text>
            )}
          </View>
        ) : (
          <CameraView // Menggunakan CameraView dari expo-camera
            ref={cameraRef}
            style={styles.cameraContainer}
            facing={facing} // 'front' atau 'back'
            // Properti untuk Expo Camera (bukan TfliteCamera atau VisionCamera)
            // Ini tidak punya frameProcessor bawaan.
            // onCameraReady={...} // Anda bisa gunakan ini untuk memulai interval deteksi
          />
        )}
        
        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
          <Ionicons name="camera-reverse" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.signLabel}>Terdeteksi:</Text>
        <Text style={styles.resultText}>{predictionResult}</Text>
        <Text style={styles.signDescription}>{predictionDescription}</Text>
      </View>

      <Text style={styles.learnText}>
        Masih Awam Gerakan Bisindo?{' '}
        <Text
          style={styles.learnLink}
          onPress={() => navigation.navigate('KamusTab', { screen: 'Dictionary' })} 
        >
          Belajar Disini Dulu
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  cameraWrapper: {
    position: "relative",
    width: width * 0.9,
    height: width * 1.2,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: { 
    width: "100%",
    height: "100%",
  },
  cameraLoadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    zIndex: 1,
  },
  cameraLoadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1D428A',
    fontWeight: 'bold',
  },
  cameraLoadingSubText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  flipButton: {
    position: "absolute",
    bottom: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    borderRadius: 50,
  },
  infoContainer: {
    width: width * 0.9,
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginTop: 10,
  },
  signLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: '#333',
  },
  resultText: { 
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D428A',
    marginBottom: 8,
    textAlign: 'center',
  },
  signDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: 'center',
  },
  learnText: {
    marginTop: 10,
    fontSize: 12,
    color: "gray",
    textAlign: 'center',
  },
  learnLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
    color: '#004d40',
  },
  grantButton: {
    backgroundColor: '#00796b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  grantButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});