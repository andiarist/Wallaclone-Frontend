import { connect } from 'react-redux';

import LoginPage from './LoginPage';
import { login } from '../../../store/actions/auth-actions';
import { getUi } from '../../../store/selectors';

const mapStateToProps = getUi;
const mapDispatchToProps = dispatch => ({
  onLogin: credentials => dispatch(login(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
