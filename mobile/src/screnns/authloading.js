import React, { useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';

import Loading from '../components/Loading';

const AuthLoading = props => {
  useEffect(() => {
    checkLoginState();
  });
    
  const checkLoginState = async () => {
    const userToken = await SecureStore.getItemAsync('token');

    props.navigation.navigate(userToken? 'App': 'Auth');
  }
  
  return <Loading />;
};

export default AuthLoading;