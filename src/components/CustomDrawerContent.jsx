// CustomDrawerContent.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Settings } from 'lucide-react-native';

export default function CustomDrawerContent(props) {
  return (
    <View className="flex-1 bg-drawer-bg">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {/* Profile Section */}
        <View className="flex-row items-center bg-profile-bg p-5 pt-12 pb-8">
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            className="w-14 h-14 rounded-full mr-3"
          />
          <View>
            <Text className="text-white text-base font-semibold">
              Ashley Miller
            </Text>
            <Text className="text-muted text-xs mt-1 text-white">Switch account</Text>
          </View>
        </View>

        {/* Drawer Items */}
        <View className="flex-1 pt-2">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Footer - Settings at bottom */}
      <View className="flex-row items-center p-5 border-t border-white/5">
        <Settings size={20} color="#b3b3b3" />
        <Text className="text-muted-2 ml-3 text-base text-white">Settings</Text>
      </View>
    </View>
  );
}
