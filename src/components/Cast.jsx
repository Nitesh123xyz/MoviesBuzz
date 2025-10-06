import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const Cast = ({ navigation }) => {
  const castMembers = [
    {
      id: 1,
      name: 'Ryan Reynolds / Deadpool / Wade Wilson',
      character: 'Wade Wilson / Deadpool',
      imageUrl: 'https://ntvb.tmsimg.com/assets/assets/536163_v9_bb.jpg',
    },
    {
      id: 2,
      name: 'Hugh Jackman',
      character: 'Logan / Wolverine',
      imageUrl: 'https://ntvb.tmsimg.com/assets/assets/536163_v9_bb.jpg',
    },
    {
      id: 3,
      name: 'Emma Corrin',
      character: 'Cassandra Nova',
      imageUrl: 'https://ntvb.tmsimg.com/assets/assets/536163_v9_bb.jpg',
    },
    {
      id: 4,
      name: 'Morena Baccarin',
      character: 'Vanessa Carlysle',
      imageUrl: 'https://ntvb.tmsimg.com/assets/assets/536163_v9_bb.jpg',
    },
    {
      id: 5,
      name: 'Rob Delaney',
      character: 'Peter',
      imageUrl: 'https://ntvb.tmsimg.com/assets/assets/536163_v9_bb.jpg',
    },
    {
      id: 6,
      name: 'Leslie Uggams',
      character: 'Blind Al',
      imageUrl: 'https://ntvb.tmsimg.com/assets/assets/536163_v9_bb.jpg',
    },
    {
      id: 7,
      name: 'Karan Soni',
      character: 'Dopinder',
      imageUrl: 'https://ntvb.tmsimg.com/assets/assets/536163_v9_bb.jpg',
    },
    {
      id: 8,
      name: 'Shioli Kutsuna',
      character: 'Yukio',
      imageUrl: 'https://ntvb.tmsimg.com/assets/assets/536163_v9_bb.jpg',
    },
    {
      id: 9,
      name: 'Aaron Stanford',
      character: 'Pyro',
      imageUrl: 'https://ntvb.tmsimg.com/assets/assets/536163_v9_bb.jpg',
    },
    {
      id: 10,
      name: 'Stefan Kapičić',
      character: 'Colossus (voice)',
      imageUrl: 'https://ntvb.tmsimg.com/assets/assets/536163_v9_bb.jpg',
    },
  ];

  return (
    <>
      <Text className="text-white text-lg mx-4 mb-2">Top Cast</Text>
      <ScrollView
        data={castMembers}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 1, paddingBottom: 20 }}
        decelerationRate={0.8}
      >
        {castMembers?.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('Person', { actor: item })}
          >
            <View className="flex-col items-center mx-2">
              <View className="border-2 border-gray-400 rounded-full p-0.5">
                <Image
                  source={{ uri: item.imageUrl }}
                  className="w-20 h-20 rounded-full"
                />
              </View>
              <Text
                numberOfLines={2}
                className="text-white text-center mt-2 text-xs w-16 truncate"
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default Cast;
