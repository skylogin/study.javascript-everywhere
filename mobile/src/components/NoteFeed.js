import React from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components';

import Note from './Note';

const notes = [
  {id: 0, content: 'Giant Steps'},
  {id: 1, content: 'Giant Steps2'},
  {id: 2, content: 'Giant Steps3'},
];

const FeedView = styled.View`
  height: 100;
  overflow: hidden;
  margin-bottom: 10px;
`;
const Separator = styled.View`
  height: 1;
  width: 100%;
  background-color: #ced0ce;
`;


const NoteFeed = props => {
  return (
    <View>
      <FlatList
        data={notes}
        keyExtractor={({ id }) => id.toString()}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => (
          <FeedView>
            <Note note={item} />
          </FeedView>
        )}
      />
    </View>
  )
};

export default NoteFeed;