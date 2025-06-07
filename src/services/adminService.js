// src/services/adminService.js
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Alert } from 'react-native'; // Untuk feedback

/**
 * Mendapatkan daftar semua pengguna dari koleksi 'users' di Firestore.
 * @returns {Promise<Array>} Array of user objects.
 */
export const getAllUsers = async () => {
  try {
    const usersCollectionRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersCollectionRef);
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id, // ID dokumen Firestore adalah UID pengguna
      ...doc.data()
    }));
    return users;
  } catch (error) {
    console.error("Error getting all users:", error);
    Alert.alert("Error", "Failed to load users: " + error.message);
    throw error;
  }
};

/**
 * Memperbarui data pengguna tertentu di Firestore.
 * @param {string} userId - UID pengguna yang akan diperbarui.
 * @param {object} updates - Objek berisi bidang yang akan diperbarui (misal: { role: 'admin' }).
 */
export const updateUserRole = async (userId, newRole) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { role: newRole });
    Alert.alert("Success", `User role updated to ${newRole} for ${userId}.`);
  } catch (error) {
    console.error("Error updating user role:", error);
    Alert.alert("Error", "Failed to update user role: " + error.message);
    throw error;
  }
};

/**
 * Menghapus pengguna dari Firestore.
 * CATATAN: Ini hanya menghapus dokumen dari Firestore, BUKAN akun dari Firebase Authentication.
 * Untuk menghapus akun Auth juga, perlu backend Function atau proses manual.
 * @param {string} userId - UID pengguna yang akan dihapus.
 */
export const deleteUser = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await deleteDoc(userDocRef);
    Alert.alert("Success", `User ${userId} deleted from database.`);
  } catch (error) {
    console.error("Error deleting user:", error);
    Alert.alert("Error", "Failed to delete user: " + error.message);
    throw error;
  }
};