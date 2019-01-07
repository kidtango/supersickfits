import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';
import User from './User';
import adminValidation from '../lib/adminValidation';

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const { item } = this.props;

    return (
      <User>
        {({ data: { me } }) => (
          <ItemStyles>
            {adminValidation(me) ? (
              <>
                <img src={item.image} alt={item.title} />
                <Title>
                  <Link
                    href={{
                      pathname: '/item',
                      query: { id: item.id }
                    }}
                  >
                    <a>{item.title}</a>
                  </Link>
                </Title>
                <PriceTag>{formatMoney(item.price)}</PriceTag>
                <p>{item.description}</p>
                <div className='buttonList'>
                  <Link
                    href={{
                      pathname: 'update',
                      query: { id: item.id }
                    }}
                  >
                    <a>Edit</a>
                  </Link>

                  <DeleteItem id={item.id}>Delete</DeleteItem>
                </div>
              </>
            ) : (
              <>
                <img src={item.image} alt={item.title} />
                <Title>
                  <Link
                    href={{
                      pathname: '/item',
                      query: { id: item.id }
                    }}
                  >
                    <a>{item.title}</a>
                  </Link>
                </Title>
                <PriceTag>{formatMoney(item.price)}</PriceTag>
                <p>{item.description}</p>
                <div className='buttonList'>
                  <AddToCart id={item.id} />
                </div>
              </>
            )}
          </ItemStyles>
        )}
      </User>
    );
  }
}
