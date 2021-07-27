import React from 'react';
import { Text, View } from 'react-native';

const Favorite = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Favorite</Text>
    </View>
  )
}

Favorite.navigationOptions = {
  title: 'Favorite'
};

export default Favorite;