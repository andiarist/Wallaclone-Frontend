import { connect } from 'react-redux';

import EditAdvertPage from './EditAdvertPage';

import { getAdvertDetail } from '../../../store/selectors';

import { loadAdvertDetail } from '../../../store/actions/adverts-actions';

const mapStateToProps = state => ({
  advert: getAdvertDetail(state),
});

const mapDispatchToProps = dispatch => ({
  loadAdvertDetail: id => dispatch(loadAdvertDetail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAdvertPage);
