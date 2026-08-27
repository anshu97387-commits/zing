import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Calendar, Wallet, User, Users, Zap } from 'lucide-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { AppProvider, useAppContext } from './src/context/AppContext';
import { Colors } from './src/theme/colors';

// Onboarding Screens (1:1 Exact Mockup Match)
import LandingScreen from './src/screens/onboarding/LandingScreen';
import PhoneAuthScreen from './src/screens/auth/PhoneAuthScreen';
import GoalScreen from './src/screens/onboarding/GoalScreen';
import PersonalizeScreen from './src/screens/onboarding/PersonalizeScreen';
import AddressScreen from './src/screens/onboarding/AddressScreen';
import SubscriptionConfirmedScreen from './src/screens/SubscriptionConfirmedScreen';

// Dashboard & Main App Screens (1:1 Exact Mockup Match)
import HomeScreen from './src/screens/HomeScreen';
import DrinkLogScreen from './src/screens/DrinkLogScreen';
import DrinkLogDetailScreen from './src/screens/DrinkLogDetailScreen';
import WalletScreen from './src/screens/WalletScreen';
import ReferScreen from './src/screens/ReferScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="SubscriptionConfirmed" component={SubscriptionConfirmedScreen} />
      <HomeStack.Screen name="DrinkLog" component={DrinkLogScreen} />
      <HomeStack.Screen name="DrinkLogDetail" component={DrinkLogDetailScreen} />
    </HomeStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1.5,
          borderTopColor: '#E5E5EA',
          height: 84,
          paddingBottom: 26,
          paddingTop: 10,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.04,
          shadowRadius: 12,
        },
        tabBarActiveTintColor: '#111111',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '800',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackNavigator} 
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Home color={color} size={22} strokeWidth={focused ? 2.5 : 2} />
          )
        }}
      />
      <Tab.Screen 
        name="Streak" 
        component={DrinkLogScreen} 
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Calendar color={color} size={22} strokeWidth={focused ? 2.5 : 2} />
          )
        }}
      />
      <Tab.Screen 
        name="Pass" 
        component={WalletScreen} 
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Wallet color={color} size={22} strokeWidth={focused ? 2.5 : 2} />
          )
        }}
      />
      <Tab.Screen 
        name="Refer" 
        component={ReferScreen} 
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Users color={color} size={22} strokeWidth={focused ? 2.5 : 2} />
          )
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, focused }) => (
            <User color={color} size={22} strokeWidth={focused ? 2.5 : 2} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

function OnboardingStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false, 
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#FFFFFF' }
      }}
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
      <Stack.Screen name="Goal" component={GoalScreen} />
      <Stack.Screen name="Personalize" component={PersonalizeScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="SubscriptionConfirmed" component={SubscriptionConfirmedScreen} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { isOnboarded } = useAppContext();
  
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
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
