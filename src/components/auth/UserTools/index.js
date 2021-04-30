import { connect } from 'react-redux';
import UserTools from './UserTools';
import { getUsername } from '../../../store/selectors';

const mapStateToProps = state => ({
  currentUser: getUsername(state),
});

export default connect(mapStateToProps)(UserTools);
