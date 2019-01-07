import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import Head from 'next/head';
import formatMoney from '../lib/formatMoney';
import Spinner from './Spinner';
import Error from './ErrorMessage';
import OrderItemStyles from './styles/OrderItemStyles';
import OrderStyles from './styles/OrderStyles';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
        name
        email
      }
      items {
        id
        title
        quantity
        description
        price
        image
        quantity
      }
    }
  }
`;

class Order extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };
  render() {
    const { id } = this.props;

    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id }}>
        {({ data, loading, error }) => {
          const { order } = data;
          console.log(order.user);
          if (error) return <Error error={error} />;
          if (loading) return <Spinner />;
          return (
            <OrderStyles>
              <Head>
                <title>SuperSick Fits - Order {id}</title>
              </Head>
              <p>
                <span>Customer Name:</span>
                <span>{order.user.name}</span>
              </p>
              <p>
                <span>Customer Email:</span>
                <span>{order.user.email}</span>
              </p>
              <p>
                <span>Order ID:</span>
                <span>{id}</span>
              </p>
              <p>
                <span>Charge</span>
                <span>{order.charge}</span>
              </p>
              <p>
                <span>Date</span>
                <span>{format(order.createdAt, 'MMMM d, YYYY h:mm a')}</span>
              </p>
              <p>
                <span>Total</span>
                <span>{formatMoney(order.total)}</span>
              </p>
              <p>
                <span>Item Count</span>
                <span>{order.items.length}</span>
              </p>
              <div className='items'>
                {order.items.map(item => (
                  <div className='order-item' key={item.id}>
                    <img src={item.image} alt={item.title} sizes='50' />
                    <div className='item-details'>
                      <h2>{item.title}</h2>
                      <p>Qty: {item.quantity}</p>
                      <p>Each: {formatMoney(item.price)}</p>
                      <p>Subtotal: {formatMoney(item.price * item.quantity)}</p>
                      <p>Description: {item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </OrderStyles>
          );
        }}
      </Query>
    );
  }
}

export default Order;
