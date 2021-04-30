import { connect } from 'react-redux';

import MainLayout from './MainLayout';

import { getUi } from '../../../store/selectors';

const mapStateToProps = getUi;

export default connect(mapStateToProps)(MainLayout);
