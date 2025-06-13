// src/services/apiService.js

const BASE_URL = 'http://192.168.1.40:5000'; // Ganti dengan IP lokal lo, sesuai yg Flask kasih

export const fetchPrediction = async (inputData) => {
  try {
    const response = await fetch(`${BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: inputData }),
    });

    if (!response.ok) {
      throw new Error('Gagal mendapatkan prediksi');
    }

    const result = await response.json();
    return result; // Misalnya { prediction: 'A' }
  } catch (error) {
    console.error('Error saat fetch prediction:', error);
    return null;
  }
};
