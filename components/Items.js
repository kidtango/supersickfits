import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';
import Spinner from './Spinner';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  render() {
    const { page } = this.props;

    return (
      <Center>
        <Pagination page={parseFloat(page)} />
        <Query
          query={ALL_ITEMS_QUERY}
          variables={{
            skip: page * perPage - perPage
          }}
        >
          {({ data, error, loading }) => {
            console.log(data);
            if (loading) return <Spinner />;
            if (error) return <p>{error.message}</p>;
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item item={item} key={item.id} />
                ))}
              </ItemsList>
            );
          }}
        </Query>
        <Pagination />
      </Center>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };
