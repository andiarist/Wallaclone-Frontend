import { connect } from 'react-redux';
import NewAdvertPage from './NewAdvertPage';

import { getUi } from '../../../store/selectors';
import {
  createAdvert,
  updateAdvert,
} from '../../../store/actions/adverts-actions';

const mapStateToProps = getUi;

const mapDispatchToProps = dispatch => ({
  onCreate: advertData => dispatch(createAdvert(advertData)),
  onUpdate: (adId, advertData) => dispatch(updateAdvert(adId, advertData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAdvertPage);
