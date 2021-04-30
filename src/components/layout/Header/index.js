import { connect } from 'react-redux';
import Header from './Header';
import { getIsLoggedUser, getUsername } from '../../../store/selectors';
import { logout } from '../../../store/actions/auth-actions';

const mapStateToProps = state => ({
  isLogged: getIsLoggedUser(state),
  currentUser: getUsername(state),
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
