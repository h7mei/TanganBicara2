import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DictionaryScreen from '../screens/Main/DictionaryScreen';
import CategoryDetailScreen from '../screens/Main/CategoryDetailScreen';
import SignDetailScreen from '../screens/Main/SignDetailScreen';

const Stack = createNativeStackNavigator();

const KamusStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dictionary" component={DictionaryScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
      <Stack.Screen name="SignDetail" component={SignDetailScreen} />
    </Stack.Navigator>
  );
};

export default KamusStack;
