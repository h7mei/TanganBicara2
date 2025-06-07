// src/store/authStore.js
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  hasSeenWalkthrough: false, // <-- Tambahkan state ini
  
  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, hasSeenWalkthrough: true }), // Saat logout, asumsikan user sudah melihat walkthrough
  
  // Fungsi baru untuk mengatur status walkthrough
  setHasSeenWalkthrough: (seen) => {
    set({ hasSeenWalkthrough: seen });
    AsyncStorage.setItem('has_seen_walkthrough', JSON.stringify(seen)); // Simpan ke AsyncStorage
  },

  // Fungsi untuk memuat status walkthrough saat aplikasi dimulai
  loadWalkthroughStatus: async () => {
    try {
      const storedValue = await AsyncStorage.getItem('has_seen_walkthrough');
      const seen = storedValue != null ? JSON.parse(storedValue) : false;
      set({ hasSeenWalkthrough: seen, isLoading: false }); // Set isLoading ke false setelah status dimuat
    } catch (e) {
      console.error("Failed to load walkthrough status from AsyncStorage", e);
      set({ hasSeenWalkthrough: false, isLoading: false }); // Default ke false jika ada error
    }
  }
}));

// Panggil loadWalkthroughStatus secara otomatis saat store dibuat
// Ini akan memuat status saat aplikasi dimulai
useAuthStore.getState().loadWalkthroughStatus();