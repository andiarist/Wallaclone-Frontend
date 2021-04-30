import { connect } from 'react-redux';
import { getUi } from '../../../store/selectors';
import FlashMessage from './FlashMessage';

const mapStateToProps = getUi;

export default connect(mapStateToProps)(FlashMessage);
