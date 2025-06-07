// src/services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'; // Import 'updateDoc'
import { auth, db } from './firebaseConfig'; // Pastikan 'db' juga diimpor
import { useAuthStore } from '../store/authStore';

// Definisi tipe data pengguna (untuk referensi, karena ini JS)
/**
 * @typedef {Object} UserData
 * @property {string} uid
 * @property {string | null} email
 * @property {"admin" | "user"} role
 * @property {string} [fullName]
 * @property {string} [dob]
 * @property {string} [phoneNumber]
 */

// Fungsi untuk mendaftar pengguna baru dan menyimpan data ke Firestore
/**
 * Registers a new user with email and password and saves additional data to Firestore.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {string} fullName - User's full name.
 * @param {string} dob - User's date of birth (e.g., "18/03/2024").
 * @param {string} phoneNumber - User's phone number.
 * @returns {Promise<UserData>} The registered user data.
 */
export const registerUser = async (email, password, fullName, dob, phoneNumber) => {
  try {
    // 1. Buat akun di Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Siapkan data pengguna tambahan untuk disimpan di Firestore
    /** @type {UserData} */
    const newUser = {
      uid: user.uid,
      email: user.email,
      role: "user", // Default role: user
      fullName: fullName,
      dob: dob,
      phoneNumber: phoneNumber,
    };

    // 3. Simpan data pengguna ke Firestore di koleksi 'users'
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, newUser);

    // Update Zustand store dengan user dari Auth dan data tambahan dari Firestore
    useAuthStore.getState().setUser({ ...user, ...newUser });

    return newUser; // Kembalikan data pengguna lengkap
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk login pengguna
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Setelah login berhasil, ambil data tambahan dari Firestore
    const userDataFromFirestore = await getUserData(user.uid);

    // Gabungkan data dari Auth dan Firestore, lalu update Zustand store
    useAuthStore.getState().setUser({ ...user, ...userDataFromFirestore });

    return user;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk mengirim email reset kata sandi
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
    useAuthStore.getState().logout(); // Reset user di store Zustand
  } catch (error) {
    throw error;
  }
};

// Mengamati status otentikasi Firebase
export const initializeAuthListener = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Jika ada user, coba ambil data tambahan dari Firestore
      try {
        const userDataFromFirestore = await getUserData(user.uid);
        // Gabungkan data dari Auth dan Firestore sebelum menyimpannya ke Zustand
        useAuthStore.getState().setUser({ ...user, ...userDataFromFirestore });
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
        // Jika gagal mengambil data Firestore, set user dasar saja
        useAuthStore.getState().setUser(user);
      }
    } else {
      // Jika tidak ada user (logged out), set user ke null
      useAuthStore.getState().setUser(null);
    }
  });
};

// Fungsi untuk mendapatkan data pengguna dari Firestore berdasarkan UID
/**
 * Fetches additional user data from Firestore.
 * @param {string} uid - User's UID.
 * @returns {Promise<UserData | null>} The user data from Firestore, or null if not found.
 */
export const getUserData = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return { uid: uid, ...userDoc.data() };
    } else {
      console.warn("User data not found in Firestore for UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error getting user data from Firestore:", error);
    throw error;
  }
};

// --- FUNGSI BARU YANG DITAMBAHKAN ---
/**
 * Updates specific fields for a user's document in Firestore.
 * @param {string} uid - User's UID.
 * @param {Partial<UserData>} dataToUpdate - An object containing the fields to update.
 * @returns {Promise<void>}
 */
export const updateUserData = async (uid, dataToUpdate) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, dataToUpdate);
    console.log("User data updated successfully for UID:", uid);
  } catch (error) {
    console.error("Error updating user data in Firestore:", error);
    throw error;
  }
};
// --- AKHIR FUNGSI BARU ---