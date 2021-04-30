/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdvertCard from '../../adverts';

import MainLayout from '../../layout/MainLayout';

import './UserPage.css';
import UserPageAside from './UserPageAside';
import Empty from '../../shared/Empty';
import Spinner from '../../shared/Spinner';

function UserPage({
  mode,
  loading,
  currentUsername,
  adverts,
  onLoadFavAdverts,
  favsAdverts,
  onLoadReservedAdverts,
  onLoadSoldAdverts,
  loadAdverts,
  pages,
}) {
  const { username } = useParams();
  const { pathname } = useLocation();
  const { t } = useTranslation(['userpage']);
  const [sectionTitle, setSectionTitle] = useState('');

  const [querySearch, setQuerySearch] = useState('');
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = e => {
    scrollToTop();
    const selectedPage = e.selected;
    const start = selectedPage + 1;
    const searchParams = new URLSearchParams(querySearch);
    if (searchParams.has('start')) {
      searchParams.set('start', start);
    } else {
      searchParams.append('start', start);
    }
    setQuerySearch(searchParams.toString());
  };

  useEffect(() => {
    if (mode === 'userAdverts') {
      if (currentUsername === username) setSectionTitle('Mis Anuncios');
      loadAdverts(`username=${username}`);
    }
    if (mode === 'reserved') {
      setSectionTitle('Mis Anuncios Reservados');
      onLoadReservedAdverts();
    }
    if (mode === 'sold') {
      setSectionTitle('Mis Anuncios Vendidos');
      onLoadSoldAdverts();
    }
  }, [pathname, username]);

  useEffect(() => {
    if (mode === 'favs') {
      setSectionTitle('Mis Anuncios Favoritos');
      onLoadFavAdverts();
    }
  }, [favsAdverts, pathname]);

  const renderAdverts = () => {
    if (adverts.length < 1) return <Empty />;
    return adverts.map(ad => <AdvertCard key={ad._id} {...ad} />);
  };

  return (
    <MainLayout title="">
      <div className="userPage">
        <div className="grid-container">
          <aside className="userPage-aside">
            <UserPageAside user={username} />
          </aside>
          <div className="userPage-content">
            {mode === 'userAdverts' || currentUsername === username ? (
              <>
                <h2>{t(sectionTitle)}</h2>
                <div className="userPage-adswrapper flex-container">
                  {loading ? <Spinner /> : renderAdverts()}
                </div>
              </>
            ) : (
              <Redirect to={`/user/${username}`} />
            )}
            <ReactPaginate
              previousLabel="<<"
              nextLabel=">>"
              breakLabel="..."
              breakClassName="break-me"
              pageCount={pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              subContainerClassName="pages pagination"
              activeClassName="active"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

UserPage.propTypes = {
  mode: PropTypes.string.isRequired,
  currentUsername: PropTypes.string,
  onLoadFavAdverts: PropTypes.func.isRequired,
  adverts: PropTypes.arrayOf(PropTypes.object),
  favsAdverts: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool.isRequired,
  onLoadReservedAdverts: PropTypes.func.isRequired,
  onLoadSoldAdverts: PropTypes.func.isRequired,
  loadAdverts: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
};

UserPage.defaultProps = {
  currentUsername: '',
  adverts: null,
  favsAdverts: {},
};

export default UserPage;
