import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import image404 from '../../../assets/404image.png';
import './NotFoundPage.css';

const NotFoundPage = () => (
  <div className="notFoundPage">
    <div className="notFoundPage-img">
      <img src={image404} alt="404" />
    </div>
    <Link to="/">
      <Button type="primary">Go Home</Button>
    </Link>
  </div>
);
export default NotFoundPage;
