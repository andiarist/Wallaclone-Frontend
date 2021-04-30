import { connect } from 'react-redux';

import UserPage from './UserPage';
import {
  getUi,
  getUsername,
  getUserEmail,
  getIsLoggedUser,
  getAdverts,
  getIsFavAdvert,
  getPages,
} from '../../../store/selectors';

import { loadAdverts } from '../../../store/actions/adverts-actions';
import {
  loadFavAdverts,
  loadReservedAdverts,
  loadSoldAdverts,
} from '../../../store/actions/user-adverts-actions';

const mapStateToProps = state => ({
  currentUsername: getUsername(state),
  currentUserEmail: getUserEmail(state),
  isLogged: getIsLoggedUser(state),
  adverts: getAdverts(state),
  favsAdverts: getIsFavAdvert(state),
  loading: getUi(state).loading,
  error: getUi(state).error,
  pages: getPages(state),
});

const mapDispatchToProps = {
  onLoadFavAdverts: loadFavAdverts,
  onLoadReservedAdverts: loadReservedAdverts,
  onLoadSoldAdverts: loadSoldAdverts,
  loadAdverts: form => loadAdverts(form),
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
