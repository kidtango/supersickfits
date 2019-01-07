import UpdateItem from '../components/UpdateItem';
import PleaseSignin from '../components/PleaseSignin';

const Update = ({ query }) => (
  <div>
    <PleaseSignin>
      <UpdateItem id={query.id} />
    </PleaseSignin>
  </div>
);

export default Update;
