import React, { memo, useSyncExternalStore } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Home, Search, Library, Heart, User } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { navigationRef } from './navigationRef';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabs = [
  { name: 'Home', icon: Home },
  { name: 'Search', icon: Search },
  { name: 'Library', icon: Library },
  { name: 'Favorite', icon: Heart },
  { name: 'Profile', icon: User },
];

function getDeepestRoute(state: any): string | undefined {
  if (!state) return;
  const route = state.routes[state.index];
  return route.state ? getDeepestRoute(route.state) : route.name;
}

function useActiveRoute() {
  return useSyncExternalStore(
    cb => navigationRef.addListener('state', cb),
    () => getDeepestRoute(navigationRef.getRootState()),
  );
}

function CustomTabBar() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  const activeRoute = useActiveRoute();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#000' : '#fff',
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
    >
      {tabs.map(({ name, icon: Icon }: any) => {
        const isActive = activeRoute === name;

        return (
          <Pressable
            key={name}
            style={styles.tab}
            onPress={() => {
              if (navigationRef.isReady() && !isActive) {
                navigationRef.navigate(name);
              }
            }}
          >
            <Icon
              size={22}
              color={
                isActive
                  ? isDark
                    ? '#fff'
                    : '#000'
                  : isDark
                  ? '#9ca3af'
                  : '#6b7280'
              }
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export default memo(CustomTabBar);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    flexDirection: 'row',
    // margin: 10,
    // borderRadius: 100,
    // borderTopWidth: 0.5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
