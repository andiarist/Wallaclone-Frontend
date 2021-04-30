import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UserTools from '../../auth/UserTools';

import './Footer.css';

function Footer({ className, isLogged }) {
  const [isMobile, setMobile] = useState(window.innerWidth < 768);

  const updateMedia = () => {
    setMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  return (
    <footer className={classNames('footer', className, 'fixed-footer')}>
      <div className="footer-wrapper">
        {isLogged && isMobile ? <UserTools /> : null}

        <p className="copy">
          &copy; Wallaclone Speedy Coders {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
  isLogged: PropTypes.bool,
};
Footer.defaultProps = {
  className: 'layout-header',
  isLogged: false,
};

export default Footer;
