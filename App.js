// App.js
import React, { useEffect } from 'react';
import AppNavigator from './src/navigation';
import { initializeAuthListener } from './src/services/authService';
import { useAuthStore } from './src/store/authStore'; // Import useAuthStore

import { enableScreens } from 'react-native-screens';
enableScreens();

import { auth } from './src/services/firebaseConfig';

export default function App() {
  const { setLoading } = useAuthStore(); // Ambil fungsi setLoading dari store

  useEffect(() => {
    // Set loading ke true saat aplikasi mulai, sampai listener auth selesai memuat
    setLoading(true); 
    initializeAuthListener();
    // loadWalkthroughStatus sudah dipanggil di authStore.js secara otomatis
  }, []);

  return <AppNavigator />;
}