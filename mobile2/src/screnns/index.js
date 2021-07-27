import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Feed from './feed';
import Favorite from './favorites';
import MyNotes from './mynotes';

const TabNavigator = createBottomTabNavigator({
  FeedScreen: {
    screen: Feed,
    navigationOptions: {
      tabBarLabel: 'Feed',
    }
  },
  MyNoteScrren: {
    screen: MyNotes,
    navigationOptions: {
      tabBarLabel: 'My Notes',
    }
  },
  FavoriteScrren: {
    screen: Favorite,
    navigationOptions: {
      tabBarLabel: 'Favorite',
    }
  },
});

export default createAppContainer(TabNavigator);