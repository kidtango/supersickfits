import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      name
      email
    }
  }
`;

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired
  };
  state = {
    password: '',
    confirmPassword: ''
  };

  saveToState = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { resetToken } = this.props;
    console.log(resetToken);
    const { password, confirmPassword } = this.state;
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{ resetToken, password, confirmPassword }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading, called }) => {
          return (
            <Form
              method='Post'
              onSubmit={async e => {
                e.preventDefault();
                await reset();
                this.setState({
                  password: '',
                  confirmPassword: ''
                });
                Router.push({
                  pathname: '/items'
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset Your Password</h2>
                <label htmlFor='password'>Password</label>
                <Error error={error} />
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={password}
                  onChange={this.saveToState}
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <Error error={error} />
                <input
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={this.saveToState}
                />

                <button type='submit'>Reset Your Password!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Reset;
