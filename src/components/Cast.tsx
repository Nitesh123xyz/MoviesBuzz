import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { IMAGE_BASE_URL } from '@env';
import { BackUpCastImage } from '../utils/Backup';
import { FlatList } from 'react-native-gesture-handler';
import { useColorScheme } from 'nativewind';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/RootStackParamList';

// ------------------------------------------------

interface CastMember {
  id: string | number;
  name: string;
  profile_path: string | null;
}

interface CastComponentProps {
  Casts: {
    cast: CastMember[];
  } | null;
  loader: boolean;
}

// ------------------------------------------------

const Cast = ({ Casts, loader }: CastComponentProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { cast: castMembers } = Casts || {};
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  if (loader) {
    return (
      <>
        <ActivityIndicator
          size="large"
          color="white"
          style={{ marginVertical: 20 }}
        />
      </>
    );
  }

  const renderItem = ({ item }: { item: CastMember }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PersonScreen', { castId: String(item.id) })
      }
    >
      <View className="flex-col items-center mx-2">
        <View className="border-2 border-gray-400 rounded-full p-0.5">
          <Image
            source={{
              uri: !!item?.profile_path
                ? `${IMAGE_BASE_URL}${item?.profile_path}`
                : BackUpCastImage,
            }}
            style={{ width: 70, height: 70, borderRadius: 50 }}
            resizeMode="cover"
          />
        </View>

        <Text
          numberOfLines={2}
          className={` ${
            isDark ? 'text-white' : 'text-black'
          } text-center mt-2 text-xs w-16 truncate`}
        >
          {item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Text
        className={` ${isDark ? 'text-white' : 'text-black'} text-lg mx-4 mb-2`}
      >
        Top Cast
      </Text>
      <FlatList
        data={castMembers}
        keyExtractor={item => item?.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 1, paddingBottom: 20 }}
        decelerationRate={0.8}
      />
    </>
  );
};

export default Cast;
