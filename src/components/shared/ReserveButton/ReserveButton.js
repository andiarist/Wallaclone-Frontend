import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { advertsSetAdState } from '../../../store/actions/adverts-actions';
import { setUnsetReserved } from '../../../api/users';
import './ReserveButton.css';

const ReserveButton = ({ initialValue, adId }) => {
  const [reserved, setReserved] = useState(initialValue);
  const { t } = useTranslation(['advertdetails']);

  const dispatch = useDispatch();

  const handleClick = async e => {
    e.preventDefault();
    try {
      const { adStatus } = await setUnsetReserved(adId);
      setReserved(!reserved);
      dispatch(advertsSetAdState(adStatus));
    } catch (err) {
      console.log(err);
    }
  };
  const renderContent = () => (
    <span>{reserved ? t('Poner disponible') : t('Reservar')}</span>
  );

  return (
    <button
      type="button"
      className={
        reserved ? 'reserved-wrapper-reserved' : 'reserved-wrapper-available'
      }
      onClick={handleClick}
    >
      {renderContent()}
    </button>
  );
};

ReserveButton.propTypes = {
  initialValue: PropTypes.bool,
  adId: PropTypes.string.isRequired,
};

ReserveButton.defaultProps = {
  initialValue: false,
};

export default ReserveButton;
