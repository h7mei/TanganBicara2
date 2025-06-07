// src/navigation/AdminStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDashboardScreen from '../screens/Admin/AdminDashboardScreen';
import UserManagementScreen from '../screens/Admin/UserManagementScreen';
// Tidak perlu AdminDrawerContent lagi

const Stack = createNativeStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Layar pertama di AdminStack adalah AdminDashboardScreen */}
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} /> 
      {/* UserManagementScreen bisa diakses dari Dashboard */}
      <Stack.Screen name="UserManagement" component={UserManagementScreen} />
      {/* Anda bisa menambahkan layar untuk Kelola Kamus dan Analytics di sini juga */}
      {/* <Stack.Screen name="KelolaKamusScreen" component={KelolaKamusScreen} /> */}
      {/* <Stack.Screen name="AnalyticsAplikasiScreen" component={AnalyticsAplikasiScreen} /> */}
    </Stack.Navigator>
  );
};

export default AdminStack;