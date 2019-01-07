import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Router from 'next/router';
import NProgress from 'nprogress';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import User from './User';
import calTotalItems from '../lib/calTotalItems';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

class TakeMaMoney extends Component {
  onToken = async (res, createOrder) => {
    NProgress.start();
    const order = await createOrder({
      variables: {
        token: res.id
      }
    }).catch(err => {
      alert(err.message);
    });
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id }
    });
  };
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {createOrder => (
              <StripeCheckout
                amount={me && calcTotalPrice(me.cart)}
                name='SuperSick Fits'
                description={
                  me &&
                  `Order of ${calTotalItems(me.cart)} item${
                    calTotalItems(me.cart) > 1 ? 's' : ''
                  }`
                }
                image={me && me.cart.length && me.cart[0].item.image}
                stripeKey='pk_test_jSKC6AnKG22dYdtH1rf8cmPQ'
                currency='USD'
                email={me && me.email}
                token={res => this.onToken(res, createOrder)}
              >
                {this.props.children}
              </StripeCheckout>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}

export default TakeMaMoney;
