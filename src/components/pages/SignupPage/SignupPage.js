import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import useForm from '../../../hooks/useForm';
import MainLayout from '../../layout/MainLayout';

import { signup } from '../../../store/actions/user-actions';
import { getUi, getUsername, getUserEmail } from '../../../store/selectors';

import './SignupPage.css';

const SignupPage = ({
  onSignup,
  loading,
  error,
  currentUserEmail,
  currentUsername,
}) => {
  const [form, onChangeForm] = useForm({
    username: '',
    email: '',
    passwd: '',
    passwd2: '',
  });
  const { t } = useTranslation(['loginpage']);

  const { username, email, passwd, passwd2 } = form;

  const handleSubmit = event => {
    event.preventDefault();
    const formData = form;
    onSignup(formData);
  };

  const IsSubmitting = () => !loading && username && passwd && passwd2 && email;

  return (
    <MainLayout title={t('Regístrate')}>
      <div className="signupPage">
        {currentUserEmail ? (
          <div className="form-field">
            <Alert
              message={`Bienvenido ${currentUsername}!`}
              description={`Solo un paso más! Hemos enviado un
            email a ${currentUserEmail}. Verifica tu bandeja de entrada para
            confirmar la dirección y poder acceder a la aplicación.`}
              type="success"
              showIcon
            />
          </div>
        ) : (
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <Input
                placeholder="Username"
                type="text"
                name="username"
                value={username}
                onChange={onChangeForm}
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </div>
            <div className="form-field">
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChangeForm}
                prefix="@"
              />
            </div>
            <div className="form-field">
              <Input.Password
                type="password"
                placeholder={t('Contraseña')}
                name="passwd"
                value={passwd}
                onChange={onChangeForm}
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </div>
            <div className="form-field">
              <Input.Password
                type="password"
                placeholder={t('Confirma Contraseña')}
                name="passwd2"
                value={passwd2}
                onChange={onChangeForm}
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </div>
            <div className="form-field centered">
              <Button
                type="primary"
                htmlType="submit"
                disabled={!IsSubmitting()}
              >
                {t('Registrarse')}
              </Button>
            </div>
          </form>
        )}
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
};

SignupPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any),
  onSignup: PropTypes.func.isRequired,
  currentUsername: PropTypes.string,
  currentUserEmail: PropTypes.string,
};
SignupPage.defaultProps = {
  currentUsername: null,
  currentUserEmail: null,
  loading: false,
  error: null,
};

const mapStateToProps = state => ({
  error: getUi(state).error,
  loading: getUi(state).loading,
  currentUsername: getUsername(state),
  currentUserEmail: getUserEmail(state),
});

const mapDispatchToProps = {
  onSignup: signup,
};

const ConnectedSignupPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupPage);

export default ConnectedSignupPage;
