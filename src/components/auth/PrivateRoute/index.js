import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import { getIsLoggedUser } from '../../../store/selectors';

const mapStateToProps = state => ({
  isLogged: getIsLoggedUser(state),
});

export default connect(mapStateToProps)(PrivateRoute);
