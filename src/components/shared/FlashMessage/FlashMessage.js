import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import { useTranslation } from 'react-i18next';

const popanimation = keyframes`
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    25% {
      transform: translateY(85px);
      opacity: 1;
    }
    50% {
      transform: translateY(85px);
      opacity: 1;
    }
    75% {
      transform: translateY(85px);
      opacity: 1;
    }
    100% {
      transform:translateY(0);
      opacity: 0;
    }
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${popanimation} 2s;
  z-index: 100;
`;

const FlashMessage = ({ alert }) => {
  if (!alert) return null;

  const { type, message } = alert;
  const { t } = useTranslation(['flashalert']);
  return (
    <AlertContainer>
      <Alert
        message={type.toUpperCase()}
        description={t(message)}
        type={type}
        showIcon
      />
    </AlertContainer>
  );
};

FlashMessage.defaultProps = {
  alert: null,
};

FlashMessage.propTypes = {
  alert: PropTypes.objectOf(PropTypes.string),
};

export default FlashMessage;
