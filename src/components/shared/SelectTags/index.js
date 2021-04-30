import { connect } from 'react-redux';
import SelectTags from './SelectTags';

import { loadTags } from '../../../store/actions/adverts-actions';
import { getTags } from '../../../store/selectors';

const mapStateToProps = state => ({
  tags: getTags(state),
});

const mapDispatchToProps = { loadTags };

export default connect(mapStateToProps, mapDispatchToProps)(SelectTags);
