import React from 'react';
import { useTranslation } from 'react-i18next';
import emptyImg from '../../../assets/emptyImg.png';

import './Empty.css';

const Empty = () => {
  const { t } = useTranslation(['advertspage']);
  return (
    <div className="no-results">
      <h2>{t('No hay resultados')}</h2>
      <img src={emptyImg} alt="no results" />
    </div>
  );
};

export default Empty;
