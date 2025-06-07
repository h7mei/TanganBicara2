// src/navigation/AppTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native'; // Pastikan ini diimpor!

import HomeScreen from '../screens/Main/HomeScreen';
import TranslatorScreen from '../screens/Main/TranslatorScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';
import KamusStack from './KamusStack';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Translator') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'KamusTab') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1E3A8A',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        // --- HAPUS BAGIAN tabBarLabel DARI screenOptions INI ---
        // Karena kita akan mendefinisikan label secara individual di setiap Tab.Screen
        // tabBarLabel: ({ focused, color }) => {
        //   let label;
        //   if (route.name === 'Home') {
        //     label = 'Home';
        //   } else if (route.name === 'Translator') {
        //     label = 'Translator';
        //   } else if (route.name === 'KamusTab') {
        //     label = 'Kamus';
        //   } else if (route.name === 'Profile') {
        //     label = 'Profile';
        //   }
        //   return <Text style={{ color }}>{label}</Text>;
        // },
        // **************************************************
      })}
    >
      {/* Sekarang, definisikan tabBarLabel untuk setiap Tab.Screen, pastikan dibungkus Text */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color }}>Home</Text>
        }}
      />
      <Tab.Screen
        name="Translator"
        component={TranslatorScreen}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color }}>Translator</Text>
        }}
      />
      <Tab.Screen
        name="KamusTab"
        component={KamusStack}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color }}>Kamus</Text> // Sudah ada, tapi pastikan seperti ini
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color }}>Profile</Text>
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;