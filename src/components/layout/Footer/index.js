import { connect } from 'react-redux';
import { getIsLoggedUser } from '../../../store/selectors';

import Footer from './Footer';

const mapStateToProps = state => ({
  isLogged: getIsLoggedUser(state),
});

export default connect(mapStateToProps)(Footer);
