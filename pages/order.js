import Link from 'next/link';
import CreateItem from '../components/CreateItem';
import PleaseSignin from '../components/PleaseSignin';
import Order from '../components/Order';

const OrderPage = props => (
  <div>
    <Order id={props.query.id} />
  </div>
);

export default OrderPage;
