import { connect } from 'react-redux';
import EditUserPage from './EditUserPage';

import { getUi, getUsername, getUserEmail } from '../../../store/selectors';
import { editUser } from '../../../store/actions/user-actions';

const mapStateToProps = state => ({
  getUi,
  currentUsername: getUsername(state),
  currentUserEmail: getUserEmail(state),
});

const mapDispatchToProps = {
  onEditUser: editUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);
