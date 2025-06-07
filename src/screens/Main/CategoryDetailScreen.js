// src/screens/Main/CategoryDetailScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Data dummy untuk tanda-tanda berdasarkan kategori (Sudah di-export)
export const signsData = { // <--- Tambahkan 'export' di sini
  '1': [ // Salam & Pertanyaan Umum
    { id: 'salam-1', name: 'Apa', video: 'apa.mp4', description: 'Tanda untuk menanyakan "apa". Gerakan ini melibatkan menggerakkan tangan terbuka ke atas dan ke bawah di depan tubuh.' },
    { id: 'salam-2', name: 'Apa Kabar', video: 'apa_kabar.mp4', description: 'Tanda untuk menanyakan kabar. Gerakan ini sering diawali dengan tanda "apa" dilanjutkan dengan gerakan tangan menyapu ke depan seperti bertanya kondisi.' },
    { id: 'salam-3', name: 'Bagaimana', video: 'bagaimana.mp4', description: 'Tanda untuk menanyakan "bagaimana". Gerakan ini biasanya melibatkan menggerakkan kedua tangan ke samping dengan telapak tangan menghadap ke atas.' },
    { id: 'salam-4', name: 'Halo', video: 'halo.mp4', description: 'Tanda untuk menyapa "halo". Gerakan ini melibatkan mengibaskan tangan ke depan dan ke belakang.' },
    { id: 'salam-5', name: 'Siapa', video: 'siapa.mp4', description: 'Tanda untuk menanyakan "siapa". Gerakan ini melibatkan jari telunjuk yang bergerak melingkar di sekitar wajah atau dada.' },
    { id: 'salam-6', name: 'Kapan', video: 'kapan.mp4', description: 'Tanda untuk menanyakan "kapan". Gerakan ini sering melibatkan mengetuk pergelangan tangan atau menggerakkan jari telunjuk di sekitar telinga.' },
    { id: 'salam-7', name: 'Kemana', video: 'kemana.mp4', description: 'Tanda untuk menanyakan "kemana". Gerakan ini melibatkan tangan yang menunjuk ke arah yang tidak spesifik atau mengayunkan tangan ke depan.' },
  ],
  '2': [ // Kondisi atau Perasaan
    { id: 'kondisi-1', name: 'Baik', video: 'baik.mp4', description: 'Tanda untuk menyatakan "baik" atau "oke". Biasanya melibatkan mengacungkan jempol.' },
    { id: 'kondisi-2', name: 'Bingung', video: 'bingung.mp4', description: 'Tanda untuk perasaan bingung. Gerakan ini sering melibatkan menggaruk kepala atau menggerakkan tangan dengan ekspresi ragu.' },
    { id: 'kondisi-3', name: 'Marah', video: 'marah.mp4', description: 'Tanda untuk perasaan marah. Gerakan ini melibatkan tangan yang mengepal atau mengusap dada dengan ekspresi kesal.' },
    { id: 'kondisi-4', name: 'Ramah', video: 'ramah.mp4', description: 'Tanda untuk sifat ramah. Gerakan ini melibatkan tangan yang terbuka dan ekspresi wajah yang positif.' },
    { id: 'kondisi-5', name: 'Sabar', video: 'sabar.mp4', description: 'Tanda untuk bersabar. Gerakan ini sering melibatkan tangan yang diletakkan di dada atau gerakan menenangkan.' },
    { id: 'kondisi-6', name: 'Sedih', video: 'sedih.mp4', description: 'Tanda untuk perasaan sedih. Gerakan ini melibatkan tangan yang menyapu ke bawah dari mata seolah menghapus air mata.' },
    { id: 'kondisi-7', name: 'Senang', video: 'senang.mp4', description: 'Tanda untuk perasaan senang. Gerakan ini melibatkan tangan yang bertepuk atau menggerakkan tangan dengan ekspresi gembira.' },
  ],
  '3': [ // Kegiatan & Tindakan
    { id: 'kegiatan-1', name: 'Belajar', video: 'belajar.mp4', description: 'Tanda untuk kegiatan belajar. Gerakan ini sering melibatkan menunjuk buku atau kepala.' },
    { id: 'kegiatan-2', name: 'Berdiri', video: 'berdiri.mp4', description: 'Tanda untuk posisi berdiri. Gerakan ini melibatkan tangan yang tegak lurus ke atas.' },
    { id: 'kegiatan-3', name: 'Duduk', video: 'duduk.mp4', description: 'Tanda untuk posisi duduk. Gerakan ini melibatkan tangan yang menunjuk ke bawah atau meniru gerakan duduk.' },
    { id: 'kegiatan-4', name: 'Makan', video: 'makan.mp4', description: 'Tanda untuk tindakan makan. Gerakan ini melibatkan tangan yang seolah-olah menyuap makanan ke mulut.' },
    { id: 'kegiatan-5', name: 'Mandi', video: 'mandi.mp4', description: 'Tanda untuk tindakan mandi. Gerakan ini melibatkan tangan yang seolah-olah menggosok tubuh.' },
    { id: 'kegiatan-6', name: 'Melihat', video: 'melihat.mp4', description: 'Tanda untuk tindakan melihat. Gerakan ini melibatkan jari telunjuk yang menunjuk ke mata.' },
    { id: 'kegiatan-7', name: 'Membaca', video: 'membaca.mp4', description: 'Tanda untuk tindakan membaca. Gerakan ini melibatkan kedua tangan yang seolah-olah memegang buku.' },
    { id: 'kegiatan-8', name: 'Menulis', video: 'menulis.mp4', description: 'Tanda untuk tindakan menulis. Gerakan ini melibatkan jari yang seolah-olah menulis di telapak tangan.' },
    { id: 'kegiatan-9', name: 'Minum', video: 'minum.mp4', description: 'Tanda untuk tindakan minum. Gerakan ini melibatkan tangan yang seolah-olah memegang gelas ke mulut.' },
    { id: 'kegiatan-10', name: 'Tidur', video: 'tidur.mp4', description: 'Tanda untuk tindakan tidur. Gerakan ini melibatkan telapak tangan yang ditempelkan ke pipi.' },
  ],
  '4': [ // Ucapan Waktu & Tempat
    { id: 'waktu-1', name: 'Dimana', video: 'dimana.mp4', description: 'Tanda untuk menanyakan "dimana". Gerakan ini sering melibatkan tangan yang menunjuk ke berbagai arah.' },
    { id: 'waktu-2', name: 'Selamat Pagi', video: 'selamat_pagi.mp4', description: 'Tanda untuk mengucapkan selamat pagi. Gerakan ini biasanya melibatkan tangan yang diangkat ke samping kepala.' },
    { id: 'waktu-3', name: 'Selamat Siang', video: 'selamat_siang.mp4', description: 'Tanda untuk mengucapkan selamat siang. Gerakan ini melibatkan tangan yang bergerak dari atas ke bawah.' },
    { id: 'waktu-4', name: 'Selamat Sore', video: 'selamat_sore.mp4', description: 'Tanda untuk mengucapkan selamat sore. Gerakan ini melibatkan tangan yang bergerak melengkung ke bawah.' },
    { id: 'waktu-5', name: 'Selamat Malam', video: 'selamat_malam.mp4', description: 'Tanda untuk mengucapkan selamat malam. Gerakan ini melibatkan tangan yang bergerak ke bawah dan ekspresi yang tenang.' },
  ],
  '5': [ // Keluarga & Orang
    { id: 'orang-1', name: 'Dia', video: 'dia.mp4', description: 'Tanda untuk menunjuk orang ketiga tunggal "dia". Gerakan ini melibatkan jari telunjuk yang menunjuk ke arah yang tidak spesifik.' },
    { id: 'orang-2', name: 'Kalian', video: 'kalian.mp4', description: 'Tanda untuk menunjuk orang kedua jamak "kalian". Gerakan ini melibatkan menunjuk beberapa orang secara bergantian.' },
    { id: 'orang-3', name: 'Kami', video: 'kami.mp4', description: 'Tanda untuk orang pertama jamak "kami" (eksklusif). Gerakan ini melibatkan tangan yang menyapu ke arah diri sendiri dan orang lain, tetapi tidak termasuk lawan bicara.' },
    { id: 'orang-4', name: 'Kamu', video: 'kamu.mp4', description: 'Tanda untuk menunjuk orang kedua tunggal "kamu". Gerakan ini melibatkan jari telunjuk yang menunjuk langsung ke lawan bicara.' },
    { id: 'orang-5', name: 'Kita', video: 'kita.mp4', description: 'Tanda untuk orang pertama jamak "kita" (inklusif). Gerakan ini melibatkan tangan yang menyapu ke arah diri sendiri dan lawan bicara.' },
    { id: 'orang-6', name: 'Mereka', video: 'mereka.mp4', description: 'Tanda untuk menunjuk orang ketiga jamak "mereka". Gerakan ini melibatkan tangan yang menyapu ke arah sekelompok orang.' },
    { id: 'orang-7', name: 'Saya', video: 'saya.mp4', description: 'Tanda untuk orang pertama tunggal "saya". Gerakan ini melibatkan jari telunjuk yang menunjuk ke dada.' },
  ],
  '6': [ // Ukuran dan Ciri Fisik
    { id: 'fisik-1', name: 'Pendek', video: 'pendek.mp4', description: 'Tanda untuk menyatakan "pendek". Gerakan ini melibatkan tangan yang diayunkan ke bawah dari ketinggian tertentu.' },
    { id: 'fisik-2', name: 'Tinggi', video: 'tinggi.mp4', description: 'Tanda untuk menyatakan "tinggi". Gerakan ini melibatkan tangan yang diayunkan ke atas dari ketinggian tertentu.' },
  ],
  '7': [ // Ucapan Terima Kasih
    { id: 'terima-1', name: 'Terima Kasih', video: 'terima_kasih.mp4', description: 'Tanda untuk mengucapkan terima kasih. Gerakan ini sering melibatkan tangan yang menyentuh dagu dan bergerak ke depan atau mengayunkan tangan ke depan.' },
  ],
};

// Data kategori yang akan digunakan (Sudah di-export)
export const allCategories = [ // <--- Tambahkan 'export' di sini
  { id: '1', name: 'Salam & Pertanyaan Umum' },
  { id: '2', name: 'Kondisi atau Perasaan' },
  { id: '3', name: 'Kegiatan & Tindakan' },
  { id: '4', name: 'Ucapan Waktu & Tempat' },
  { id: '5', name: 'Keluarga & Orang' },
  { id: '6', name: 'Ukuran dan Ciri Fisik' },
  { id: '7', name: 'Ucapan Terima Kasih' },
];

const CategoryDetailScreen = ({ route, navigation }) => {
  const { categoryName, categoryId } = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSigns = (signsData[categoryId] || []).filter(sign =>
    sign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1D428A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={`Cari di ${categoryName}...`}
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Daftar Tanda</Text>
        {filteredSigns.length > 0 ? (
          <View style={styles.signListContainer}>
            {filteredSigns.map((sign, index) => (
              <TouchableOpacity
                key={sign.id}
                style={styles.signCard}
                onPress={() => navigation.navigate('SignDetail', {
                  sign: sign,
                  categoryId: categoryId,
                  categoryName: categoryName,
                  filteredSigns: filteredSigns,
                  index: index,
                  allCategories: allCategories,
                  signsData: signsData,
                })}
              >
                <Text style={styles.signName}>{sign.name}</Text>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" style={styles.chevronIcon} />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.noResultsText}>Tanda tidak ditemukan dalam kategori ini</Text>
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
    flex: 1,
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
  signListContainer: {
    flexDirection: 'column',
  },
  signCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  signName: {
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

export default CategoryDetailScreen;