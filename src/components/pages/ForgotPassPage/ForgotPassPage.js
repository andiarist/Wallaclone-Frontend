import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Input, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';

import { forgotPasswd } from '../../../api/users';

import useForm from '../../../hooks/useForm';
import MainLayout from '../../layout/MainLayout';

import './ForgotPassPage.css';
import { showFlashAlert } from '../../../store/actions/ui-actions';

function ForgotPassPage({ error }) {
  const [form, onChangeForm] = useForm({
    email: '',
  });
  const { t } = useTranslation(['forgotpass']);
  const dispatch = useDispatch();
  const { email } = form;

  const handleClick = async () => {
    try {
      const { message } = await forgotPasswd(email);
      dispatch(showFlashAlert({ type: 'success', message }));
    } catch (err) {
      dispatch(showFlashAlert({ type: 'error', message: err.message }));
    }
  };
  const IsSubmitting = () => email;

  return (
    <MainLayout title={t('Cambiar Contraseña')}>
      <div className="forgotPage">
        <form className="forgot-form">
          {t('Introduce el email de tu usario de wallaclone')}
          <div className="form-field">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={onChangeForm}
            />
          </div>
          <div className="form-field centered">
            <Button
              as={Link}
              to="/login"
              type="primary"
              onClick={handleClick}
              disabled={!IsSubmitting(email)}
            >
              {t('Enviar')}
            </Button>
          </div>
        </form>
        {error && (
          <Alert
            message="Error"
            description={error.message}
            type="error"
            showIcon
          />
        )}
      </div>
    </MainLayout>
  );
}

ForgotPassPage.propTypes = {
  error: PropTypes.objectOf(PropTypes.any),
};
ForgotPassPage.defaultProps = {
  error: null,
};
export default ForgotPassPage;
