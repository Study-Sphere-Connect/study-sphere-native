import tamaguiConfig from '@/tamagui.config';
import { Stack } from 'expo-router/stack';
import { TamaguiProvider } from 'tamagui';

export default function AppLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)/register' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)/login' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='room/[token]' options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  );
}