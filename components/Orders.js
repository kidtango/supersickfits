import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { format } from 'date-fns';
import Head from 'next/head';
import formatMoney from '../lib/formatMoney';
import Spinner from './Spinner';
import Error from './ErrorMessage';
import OrderItemStyles from './styles/OrderItemStyles';
import OrderStyles from './styles/OrderStyles';
import { formatDistance } from 'date-fns';

const ALL_ORDERS_QUERY = gql`
  query orders {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const orderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

export default class Orders extends Component {
  render() {
    return (
      <Query
        query={ALL_ORDERS_QUERY}
        refetchQueries={[{ query: ALL_ORDERS_QUERY }]}
      >
        {({ data, error, loading }) => {
          const { orders } = data;
          if (error) return <Error error={error} />;
          if (loading) return <Spinner />;
          return (
            <div>
              <h2>
                You have {orders.length} order{orders.length > 1 ? 's' : ''}
              </h2>
              <orderUl>
                {orders.map(order => (
                  <OrderItemStyles>
                    <Link
                      href={{
                        pathname: '/order',
                        query: { id: order.id }
                      }}
                    >
                      <a>
                        <div className='order-meta'>
                          <p>
                            {order.items.reduce(
                              (tally, item) => tally + item.quantity,
                              0
                            )}{' '}
                            Items
                          </p>
                          <p>{order.items.length} Products</p>
                          <p>{formatDistance(order.createdAt, new Date())}</p>
                        </div>
                        <div className='images'>
                          {order.items.map(item => (
                            <img
                              key={item.id}
                              src={item.image}
                              alt={item.title}
                            />
                          ))}
                        </div>
                      </a>
                    </Link>
                  </OrderItemStyles>
                ))}
              </orderUl>
            </div>
          );
        }}
      </Query>
    );
  }
}
