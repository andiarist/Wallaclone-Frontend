import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { setLocaleLanguageHeader } from '../../../api/client';

import { getPublicUrl } from '../../../config/envConfig';
import './LangButton.css';

const LangButton = ({ initialLang }) => {
  const [lang, setLang] = useState(initialLang);
  const { i18n } = useTranslation();

  const changeLanguage = language => {
    setLang(language);
    setLocaleLanguageHeader(language);
    i18n.changeLanguage(language);
  };

  const renderContent = () => (
    <img
      className="flag-icon"
      width="20px"
      height="20px"
      src={
        lang === 'es'
          ? `${getPublicUrl()}/icons/espana-icon.svg`
          : `${getPublicUrl()}/icons/usa-icon.svg`
      }
      alt={lang === 'es' ? 'Spanish' : 'English'}
    />
  );

  return (
    <button
      type="button"
      className="flags-wrapper"
      onClick={() => {
        if (i18n.language === 'es') changeLanguage('en');
        else changeLanguage('es');
      }}
    >
      {renderContent()}
    </button>
  );
};

LangButton.propTypes = {
  initialLang: PropTypes.string,
};

LangButton.defaultProps = {
  initialLang: 'es',
};

export default LangButton;
