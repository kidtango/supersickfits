import React from 'react';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney';
import styled from 'styled-components';
import RemoveItemInCart from './RemoveItemInCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  const { item } = cartItem;

  if (!item)
    return (
      <CartItemStyles>
        <p>This Item has been removed</p>
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );

  return (
    <CartItemStyles>
      <img width='100' src={item.image} alt={item.id} />
      <div className='cart-item-details'>
        <h3>{item.title}</h3>

        <p>
          {formatMoney(item.price * cartItem.quantity)}
          {' - '}
          <em>
            {cartItem.quantity} &times; {formatMoney(item.price)} each
          </em>
        </p>
      </div>
      <RemoveItemInCart id={cartItem.id} />
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired
};

export default CartItem;
