import React, { useState, useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!){
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = props => {
  const [values, setValues] = useState();
  
  useEffect(() => {
    document.title = 'Sign Up - Notedly';
  });
  
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp);
      props.history.push('/');
    }
  });


  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
          signUp({
            variables: {
              ...values
            }
          })
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          required
          type="text"
          id="username"
          name="username"
          placeholder="username"
          onChange={onChange}
        />
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          placeholder="email"
          onChange={onChange}
        />
        <label htmlFor="password">password</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignUp;