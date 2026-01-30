import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { useGetGenreMoviesQuery } from '../features/movies';

const GenresScreen = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Genres'>;
}) => {
  const { genreId } = route.params;
  console.log(genreId);
  const { data } = useGetGenreMoviesQuery(genreId);
  const result = data?.results || [];
  console.log(result);

  return (
    <View>
      <Text>GenresScreen {genreId}</Text>
    </View>
  );
};

export default GenresScreen;

const styles = StyleSheet.create({});
