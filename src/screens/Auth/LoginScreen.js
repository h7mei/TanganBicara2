// src/screens/Auth/LoginScreen.js
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
import { loginUser } from '../../services/authService';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore'; // <-- IMPORT BARU

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Dapatkan state user dari store untuk mengecek role
  const { user } = useAuthStore(); // Ambil user dari Zustand

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Input Error', 'Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      // loginUser akan memperbarui state 'user' di Zustand
      await loginUser(email, password); 
      
      // Setelah login berhasil dan state user di Zustand sudah diperbarui
      // (ini terjadi secara asynchronous setelah loginUser),
      // kita perlu memastikan navigasi terjadi ke tempat yang benar
      // berdasarkan role user yang BARU SAJA LOGIN.
      
      // Karena `user` dari `useAuthStore` mungkin belum di-update
      // TEPAT di sini secara sinkron, lebih aman memanggil `getUserData` lagi
      // atau mengambil role langsung dari objek user yang dikembalikan `loginUser`
      // (jika `loginUser` mengembalikan role).
      // Alternatif: Kita bisa langsung cek `useAuthStore().user.role` 
      // setelah `await loginUser` karena `setUser` di `authService`
      // harus sudah selesai.

      const loggedInUser = useAuthStore.getState().user; // Ambil user yang baru saja diperbarui dari Zustand
      
      if (loggedInUser && loggedInUser.role === 'admin') {
        navigation.replace('AdminStack'); // Redirect ke halaman admin
      } else {
        navigation.replace('AppTabs'); // Redirect ke halaman utama aplikasi
      }

      Alert.alert('Success', 'Logged in successfully!');

    } catch (error) {
      Alert.alert('Login Failed', error.message || "Terjadi kesalahan saat login.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Sign in to your</Text>
          <Text style={styles.title}>Account</Text>
          <Text style={styles.subtitle}>Enter your email and password to log in</Text>

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

          <Text style={styles.label}>Password</Text>
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

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.loginButtonText}>Log In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.divider} />
          </View>

          {/* Tombol untuk login dengan Google (dikomentari) */}
          {/*
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={24} color="#DB4437" style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          */}

          {/* Tombol untuk login dengan Facebook (dikomentari) */}
          {/*
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={24} color="#4267B2" style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>
          */}

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupLink}>Sign Up</Text>
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
    paddingHorizontal: 20,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
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
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  orText: {
    color: "gray",
    marginHorizontal: 10,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 10,
    marginBottom: 10,
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
  signupLink: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
    marginLeft: 5,
    textAlign: "center",
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

export default LoginScreen;