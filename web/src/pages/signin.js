import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!){
    signIn(email: $email, password: $password)
  }
`;


const SignIn = props => {
  const client = useApolloClient();

  useEffect(() => {
    document.title = 'Sign In - Notedly';
  });
  
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
      client.writeData({ data: { isLoggedIn: true }});
      props.history.push('/');
    }
  });

  
  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signin" />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account</p>}
    </React.Fragment>
  )
}

export default SignIn;