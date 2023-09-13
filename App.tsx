import React, { useContext, useEffect, useReducer } from 'react';
import { NativeBaseProvider } from 'native-base';
import theme from './styles/theme';
import { NavigationContainer } from '@react-navigation/native';
import DrawerMenu from './screens/DrawerMenu';
import io from 'socket.io-client';
import { secretHashContext } from './screens/DrawerMenu';
import LoginScreens from './screens/LoginScreen';
import DetailInformation from './screens/DetailInformation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './utils/constants/ui';
import { API_URL } from './services/api/urls';

export default function App() {
  const secrectHash = useContext(secretHashContext);
  const socket = io(API_URL.webSocket);

  useEffect(() => {
    socket.emit('subscribe-global-notification', secrectHash.secretHash); //global notification
  }, [socket]);

  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Login"
            component={LoginScreens}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTES.HIIER}
            options={{ headerShown: false }}
            component={DrawerMenu}
          />
          <Stack.Screen
            name={ROUTES.DETAIL_INFORMATION}
            component={DetailInformation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
