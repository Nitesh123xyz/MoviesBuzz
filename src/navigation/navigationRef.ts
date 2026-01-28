import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/RootStackParamList';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const isNavigationReadyRef = { current: false };
