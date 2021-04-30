import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'antd';
import { useTranslation } from 'react-i18next';

import MainLayout from '../../layout/MainLayout';

import { signupConfirm } from '../../../store/actions/user-actions';
import { getUi } from '../../../store/selectors';

const SignupConfirmPage = ({ onConfirm, loading, error }) => {
  const { token } = useParams();
  const { t } = useTranslation(['loginpage']);

  useEffect(() => {
    onConfirm(token);
  }, []);

  return (
    <MainLayout title={t('Valida tu email')}>
      <div>
        {loading && <div>{t('Verificando...')}</div>}
        {error ? (
          <Alert
            message="Error"
            description={error.message}
            type="error"
            showIcon
          />
        ) : (
          <Alert
            message={t('Email confirmado!')}
            description={t(
              'Ya puedes iniciar sesión con tu email y contraseña.',
            )}
            type="success"
            showIcon
          />
        )}
      </div>
    </MainLayout>
  );
};

SignupConfirmPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any),
  onConfirm: PropTypes.func.isRequired,
};
SignupConfirmPage.defaultProps = {
  loading: false,
  error: null,
};

const mapStateToProps = getUi;

const mapDispatchToProps = {
  onConfirm: signupConfirm,
};

const ConnectedSignupConfirmPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupConfirmPage);

export default ConnectedSignupConfirmPage;
