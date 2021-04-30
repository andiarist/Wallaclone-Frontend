import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import MainLayout from '../../layout/MainLayout';
import useForm from '../../../hooks/useForm';

import './LoginPage.css';

function LoginPage({ onLogin, loading }) {
  const { t } = useTranslation(['loginpage']);
  const [form, onChangeForm] = useForm({
    username: '',
    passwd: '',
    remember: false,
  });

  const { username, passwd, remember } = form;

  const handleSubmit = event => {
    event.preventDefault();
    const credentials = form;
    onLogin(credentials);
  };

  const IsSubmitting = () => !loading && username && passwd;

  return (
    <MainLayout title="Login">
      <div className="loginPage">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={onChangeForm}
            />
          </div>
          <div className="form-field">
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t('Contraseña')}
              name="passwd"
              value={passwd}
              onChange={onChangeForm}
            />
          </div>

          <div className="form-field">
            <Checkbox
              onChange={onChangeForm}
              name="remember"
              valuePropName={remember}
            >
              {t('Recordarme')}
            </Checkbox>
          </div>
          <div className="form-field">
            <p>
              <Link to="/forgotpass" className="link">
                {t('Olvidaste tu contraseña?')}{' '}
              </Link>
            </p>

            <p>
              <Link to="/signup" className="link">
                {t('Aún no tienes cuenta? Regístrate')}
              </Link>
            </p>
          </div>
          <div className="form-field centered">
            <Button type="primary" htmlType="submit" disabled={!IsSubmitting()}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoginPage;
