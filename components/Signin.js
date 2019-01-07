import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

class Signin extends Component {
  state = {
    email: '',
    password: ''
  };

  saveToState = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => {
          return (
            <Form
              method='Post'
              onSubmit={async e => {
                e.preventDefault();
                await signin();
                this.setState({
                  email: '',
                  password: ''
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign In To Checkout</h2>
                <label htmlFor='email'>Email</label>
                <Error error={error} />
                <input
                  type='email'
                  name='email'
                  placeholder='email'
                  value={this.state.email}
                  onChange={this.saveToState}
                />
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  name='password'
                  placeholder='password'
                  value={this.state.password}
                  onChange={this.saveToState}
                />
                <button type='submit'>Sign In!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
