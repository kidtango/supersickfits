import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import SickButton from './styles/SickButton';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_ITEM_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

// Optimistic uploading using cache
const update = (cache, payload) => {
  //1. read cache
  const data = cache.readQuery({ query: CURRENT_USER_QUERY });
  const cartItemId = payload.data.removeFromCart.id;
  // 2. remove that item from cart
  data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
  // 3. Write it back to cache
  cache.writeQuery({ query: CURRENT_USER_QUERY, data });
};

const removeItemFromCart = ({ id }) => {
  return (
    <Mutation
      mutation={REMOVE_ITEM_MUTATION}
      variables={{ id }}
      update={update}
      optimisticResponse={{
        __typename: 'Mutation',
        removeFromCart: {
          __typename: 'CartItem',
          id
        }
      }}
    >
      {(removeFromCart, { error, loading }) => (
        <SickButton onClick={removeFromCart}>&times;</SickButton>
      )}
    </Mutation>
  );
};

removeItemFromCart.propTypes = {
  id: PropTypes.string.isRequired
};

export default removeItemFromCart;
