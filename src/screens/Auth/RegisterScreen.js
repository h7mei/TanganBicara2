// src/screens/Auth/RegisterScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { registerUser } from '../../services/authService';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  // const [birthDate, setBirthDate] = useState(''); // Dikomentari: State untuk tanggal lahir
  // const [phoneNumber, setPhoneNumber] = useState(''); // Dikomentari: State untuk nomor telepon
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validasi sederhana (sesuaikan jika kolom yang dikomentari tidak wajib)
    if (!fullName || !email || !password) { // Validasi hanya untuk kolom yang aktif
      Alert.alert('Input Error', 'Please fill in all required fields (Full Name, Email, Password).');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Password Error', 'Password should be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      // Panggil registerUser. Jika birthDate dan phoneNumber tidak digunakan,
      // Anda mungkin perlu menyesuaikan fungsi registerUser di authService.js
      // agar menerima argumen opsional atau default.
      // Untuk sementara, kita kirim string kosong jika tidak ada input.
      await registerUser(email, password, fullName, '', ''); // Mengirim string kosong untuk birthDate dan phoneNumber
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Sign up</Text>
          <Text style={styles.subtitle}>Create an account to continue!</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Lois Becket"
            placeholderTextColor="#888"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Loisbecket@gmail.com"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {/* Dikomentari: Form untuk Birth of date */}
          {/*
          <Text style={styles.label}>Birth of date</Text>
          <TextInput
            style={styles.input}
            placeholder="18/03/2024"
            placeholderTextColor="#888"
            value={birthDate}
            onChangeText={setBirthDate}
            keyboardType="numbers-and-punctuation"
          />
          */}

          {/* Dikomentari: Form untuk Phone Number */}
          {/*
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneContainer}>
            <Text style={{ fontSize: 16, color: '#000' }}>+62</Text>
            <Ionicons name="chevron-down" size={16} color="#000" style={{ marginLeft: 5 }} />
            <TextInput
              style={styles.phoneInput}
              placeholder="(454) 726-0592"
              placeholderTextColor="#888"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
          */}

          <Text style={styles.label}>Set Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="********"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#888" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.registerButtonText}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
    textAlign: "left",
    width: "100%",
  },
  subtitle: {
    fontSize: width * 0.04,
    color: "gray",
    marginBottom: 30,
    textAlign: "left",
    width: "100%",
  },
  label: {
    color: "#000",
    alignSelf: "flex-start",
    marginBottom: 5,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    justifyContent: "center",
  },
  phoneContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  phoneInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    marginLeft: 10,
  },
  passwordContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 15,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  loginText: {
    color: "gray",
  },
  loginLink: {
    color: "#3B82F6",
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});

export default RegisterScreen;
