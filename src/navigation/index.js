// src/navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import WalkthroughScreen from '../screens/WalkthroughScreen';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import AdminStack from './AdminStack';
import { useAuthStore } from '../store/authStore';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// Import screen Utility
import SettingsScreen from '../screens/Utility/SettingsScreen';
import PrivacyPolicyScreen from '../screens/Utility/PrivacyPolicyScreen';
import AboutScreen from '../screens/Utility/AboutScreen';
// --- Import screen SettingsSubScreens baru ---
import EditProfileScreen from '../screens/Utility/SettingsSubScreens/EditProfileScreen';
import ChangePasswordScreen from '../screens/Utility/SettingsSubScreens/ChangePasswordScreen';
// --- Akhir Import screen SettingsSubScreens baru ---


const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, isLoading, hasSeenWalkthrough } = useAuthStore(); 

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E3A8A" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* Screen yang sudah ada */}
        {!hasSeenWalkthrough ? (
          <React.Fragment>
            <RootStack.Screen name="Splash" component={SplashScreen} />
            <RootStack.Screen name="Walkthrough" component={WalkthroughScreen} />
            <RootStack.Screen name="AuthStack" component={AuthStack} />
            <RootStack.Screen name="AppTabs" component={AppTabs} />
            <RootStack.Screen name="AdminStack" component={AdminStack} />
          </React.Fragment>
        ) : (user ? (
                user.role === 'admin' ? (
                  <RootStack.Screen name="AdminStack" component={AdminStack} />
                ) : (
                  <RootStack.Screen name="AppTabs" component={AppTabs} />
                )
              ) : (
                <RootStack.Screen name="AuthStack" component={AuthStack} />
              )
        )}
        
        {/* Screen Utility yang sudah ada */}
        <RootStack.Screen name="Settings" component={SettingsScreen} />
        <RootStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <RootStack.Screen name="About" component={AboutScreen} />

        {/* --- Tambahkan Screen SettingsSubScreens Baru di sini --- */}
        <RootStack.Screen name="EditProfile" component={EditProfileScreen} />
        <RootStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        {/* --- Akhir Penambahan Screen Baru --- */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;