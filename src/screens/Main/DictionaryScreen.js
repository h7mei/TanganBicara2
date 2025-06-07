// src/screens/Main/DictionaryScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window'); // Dapatkan lebar layar untuk gaya responsif

const DictionaryScreen = ({ navigation }) => {
  // Data untuk 7 kategori
  const categories = [
    { id: '1', name: 'Salam & Pertanyaan Umum', icon: 'chatbubble-ellipses-outline' },
    { id: '2', name: 'Kondisi atau Perasaan', icon: 'heart-outline' },
    { id: '3', name: 'Kegiatan & Tindakan', icon: 'walk-outline' },
    { id: '4', name: 'Ucapan Waktu & Tempat', icon: 'time-outline' },
    { id: '5', name: 'Keluarga & Orang', icon: 'people-outline' },
    { id: '6', name: 'Ukuran dan Ciri Fisik', icon: 'body-outline' },
    { id: '7', name: 'Ucapan Terima Kasih', icon: 'hand-left-outline' },
  ];

  // State untuk input pencarian
  const [searchQuery, setSearchQuery] = useState('');

  // Filter kategori berdasarkan input pencarian
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D428A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kamus BISINDO</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari Tanda BISINDO..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Kategori</Text>
        {filteredCategories.length > 0 ? (
          <View style={styles.categoryContainer}>
            {filteredCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                // Mengarahkan ke 'CategoryDetail' dan meneruskan nama kategori
                onPress={() => navigation.navigate('CategoryDetail', { categoryName: category.name, categoryId: category.id })}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name={category.icon} size={28} color="#1D428A" />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" style={styles.chevronIcon} />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.noResultsText}>Kategori tidak ditemukan</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D428A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#1D428A',
  },
  content: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D428A',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'column',
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    elevation: 1,
    shadowColor: '#000', // Tambahkan shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#F0F4FF',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1D428A',
  },
  chevronIcon: {
    marginLeft: 5,
  },
  noResultsText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DictionaryScreen;
