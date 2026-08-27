import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Wallet, User, Users } from 'lucide-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { AppProvider, useAppContext } from './src/context/AppContext';

// Auth & Onboarding Screens
import PhoneAuthScreen from './src/screens/auth/PhoneAuthScreen';
import NameScreen from './src/screens/onboarding/NameScreen';
import GoalScreen from './src/screens/onboarding/GoalScreen';
import AddressScreen from './src/screens/onboarding/AddressScreen';

// Main Screens
import HomeScreen from './src/screens/HomeScreen';
import WalletScreen from './src/screens/WalletScreen';
import ReferScreen from './src/screens/ReferScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: 'rgba(0,0,0,0.06)',
          height: 82,
          paddingBottom: 24,
          paddingTop: 10,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.04,
          shadowRadius: 12,
        },
        tabBarActiveTintColor: '#111111',
        tabBarInactiveTintColor: '#A1A1AA',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color }) => <Home color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Pass" 
        component={WalletScreen} 
        options={{
          tabBarIcon: ({ color }) => <Wallet color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Refer" 
        component={ReferScreen} 
        options={{
          tabBarIcon: ({ color }) => <Users color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color }) => <User color={color} size={24} />
        }}
      />
    </Tab.Navigator>
  );
}

function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="Goal" component={GoalScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { isOnboarded } = useAppContext();
  
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      {isOnboarded ? <MainTabs /> : <OnboardingStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}
