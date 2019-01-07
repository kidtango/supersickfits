import Link from 'next/link';
import { Query, Mutation } from 'react-apollo';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';
import { TOGGLE_CART_MUTATION } from '../components/Cart';
import CartCount from './CartCount';
import adminValidation from '../lib/adminValidation';
import calTotalItems from '../lib/calTotalItems';

const Nav = () => (
  <User>
    {({ data: { me } }) => {
      return (
        <NavStyles>
          {adminValidation(me) && (
            <>
              <Link href='/sell'>
                <a>Sell</a>
              </Link>
              <Link href='/orders'>
                <a>Orders</a>
              </Link>
              <Signout />
            </>
          )}
          {me && !adminValidation(me) && (
            <>
              <Link href='/items'>
                <a>Shop</a>
              </Link>

              <Link href='/orders'>
                <a>orders</a>
              </Link>

              <Link href='/account'>
                <a>Account</a>
              </Link>

              <Mutation mutation={TOGGLE_CART_MUTATION}>
                {toggleCart => (
                  <button onClick={toggleCart}>
                    My Cart <CartCount count={calTotalItems(me.cart)} />
                  </button>
                )}
              </Mutation>

              <Signout />
            </>
          )}
          {!me && (
            <>
              <Link href='/items'>
                <a>Shop</a>
              </Link>
              <Link href='/signup'>
                <a>Sign In</a>
              </Link>
            </>
          )}
        </NavStyles>
      );
    }}
  </User>
);

export default Nav;
