import { connect } from 'react-redux';

import UserChatsPage from './UserChatsPage';
import { getUi, getUsername, getUserId } from '../../../store/selectors';

const mapStateToProps = state => ({
  getUi,
  currentUsername: getUsername(state),
  currentUserId: getUserId(state),
});

export default connect(mapStateToProps)(UserChatsPage);
