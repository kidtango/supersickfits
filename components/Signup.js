import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import Router from 'next/router';

const CREATEUSER_MUTATION = gql`
  mutation CREATEUSER_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

class Signup extends Component {
  state = {
    email: '',
    name: '',
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
        mutation={CREATEUSER_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => {
          return (
            <Form
              method='Post'
              onSubmit={async e => {
                e.preventDefault();
                await signup();
                this.setState({
                  email: '',
                  name: '',
                  password: ''
                });
                Router.push({
                  pathname: '/items'
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign Up for An Account</h2>
                <label htmlFor='email'>Email</label>
                <Error error={error} />
                <input
                  type='email'
                  name='email'
                  placeholder='email'
                  value={this.state.email}
                  onChange={this.saveToState}
                />
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  name='name'
                  placeholder='name'
                  value={this.state.name}
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
                <button type='submit'>Sign Up!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
