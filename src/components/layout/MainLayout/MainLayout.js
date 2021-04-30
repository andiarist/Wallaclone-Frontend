import React from 'react';
import PropTypes from 'prop-types';

import FlashMessage from '../../shared/FlashMessage';
import Header from '../Header';
import Footer from '../Footer';

import './MainLayout.css';

const MainLayout = ({ title, children }) => (
  <div className="layout">
    <Header className="layout-header" />
    <FlashMessage />
    <main className="layout-main">
      <h2 className="layout-main--title">{title}</h2>
      <section className="layout-main--section">{children}</section>
    </main>
    <Footer className="layout-footer" />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default MainLayout;
