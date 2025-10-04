import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { ChevronLeft, Heart } from 'lucide-react-native';
import { Shadow } from 'react-native-shadow-2';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const PersonScreen = ({ route, navigation }) => {
  const { actor } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <ScrollView
      className="flex-1 bg-neutral-800"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 20,
      }}
    >
      <View className="z-20 w-full flex-row items-center justify-between px-4 mt-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex items-center justify-center bg-white/40 backdrop-blur-md w-10 h-10 rounded-full shadow-lg"
        >
          <ChevronLeft color={'white'} size={26} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg ${
            isFavorite ? 'bg-red-500' : 'bg-white/40'
          }`}
        >
          <Heart color={'white'} size={26} />
        </TouchableOpacity>
      </View>

      {/* selected person */}

      <>
        <View className="flex-row justify-center mt-5">
          <Shadow
            distance={15}
            startColor="rgba(255,255,255,0.4)"
            endColor="rgba(0,0,0,0.5)"
            offset={[0, 0]}
            style={{ borderRadius: 999 }}
          >
            <View className="w-[22rem] h-[22rem] border-4 border-neutral-400 rounded-full overflow-hidden">
              <Image
                source={{ uri: actor.imageUrl }}
                className="rounded-full w-full h-full"
              />
            </View>
          </Shadow>
        </View>
        <View className="mt-6 px-16 mx-auto">
          <Text
            numberOfLines={2}
            className="text-2xl text-center font-bold text-white"
          >
            {actor.name}
          </Text>
        </View>
      </>
    </ScrollView>
  );
};

export default PersonScreen;
