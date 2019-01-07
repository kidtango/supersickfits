import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Signin from '../components/Signin';
import adminValidation from '../lib/adminValidation';

const PleaseSignin = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data: { me } }, loading) => {
      if (loading) return <p>Loading...</p>;
      if (!adminValidation(me)) {
        return (
          <div>
            <p>Please Sign In Before Continuing</p>
            <Signin />
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);

export default PleaseSignin;
