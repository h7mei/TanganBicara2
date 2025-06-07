// src/store/translationStore.js
import { create } from 'zustand';

export const useTranslationStore = create((set) => ({
  currentSentence: '', // Untuk menyimpan kalimat terjemahan saat ini
  translationHistory: [], // Untuk menyimpan history kata per kata
  lastDetectionTime: Date.now(), // Untuk melacak kapan deteksi terakhir terjadi

  addWordToSentence: (word) => set((state) => {
    const newSentence = state.currentSentence ? `${state.currentSentence} ${word}` : word;
    const newHistory = [...state.translationHistory, { word, timestamp: Date.now() }];
    return {
      currentSentence: newSentence,
      translationHistory: newHistory,
      lastDetectionTime: Date.now(),
    };
  }),

  // Fungsi untuk mereset kalimat dan history
  resetSentence: () => set({ currentSentence: '', translationHistory: [], lastDetectionTime: Date.now() }),

  // Fungsi untuk mengamati dan mereset berdasarkan inactivity
  // Ini akan dipanggil di TranslatorScreen
  startInactivityTimer: () => {
    const timer = setTimeout(() => {
      const state = useTranslationStore.getState();
      // Reset jika sudah lebih dari 5 detik (contoh) tanpa deteksi baru
      if (Date.now() - state.lastDetectionTime > 5000) {
        state.resetSentence();
        console.log('Sentence reset due to inactivity.');
      }
    }, 5000); // Cek setiap 5 detik
    return () => clearTimeout(timer);
  }
}));