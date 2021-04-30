import { connect } from 'react-redux';

import AdvertPage from './AdvertPage';
import {
  getUiLoading,
  getUserEmail,
  getIsLoggedUser,
  getAdvertDetail,
} from '../../../store/selectors';

import {
  loadAdvertDetail,
  deleteAdvert,
} from '../../../store/actions/adverts-actions';

const mapStateToProps = state => ({
  loading: getUiLoading(state),
  currentUserEmail: getUserEmail(state),
  isLogged: getIsLoggedUser(state),
  advert: getAdvertDetail(state),
});

const mapDispatchToProps = dispatch => ({
  loadAdvertDetail: id => dispatch(loadAdvertDetail(id)),
  onDelete: advertId => dispatch(deleteAdvert(advertId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvertPage);
