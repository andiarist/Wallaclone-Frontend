/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import MainLayout from '../../layout/MainLayout';
import AdvertCard from '../../adverts';
import Spinner from '../../shared/Spinner';
import Empty from '../../shared/Empty';
import './AdvertsPage.css';

import FiltersForm from '../../shared/FiltersForm';

const AdvertsPage = ({ adverts, pages, loading, loadAdverts, location }) => {
  const { t } = useTranslation(['advertspage']);

  const [querySearch, setQuerySearch] = useState('');

  const handlePageClick = e => {
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

  const handleSubmit = async params => {
    setQuerySearch(params);
  };

  useEffect(() => {
    setQuerySearch(location.search?.substring(1) || '');
  }, [location.search]);

  useEffect(() => {
    loadAdverts(querySearch);
  }, [querySearch]);

  const renderContent = () => {
    if (adverts.length < 1) return <Empty />;

    return adverts.map(ad => <AdvertCard key={ad._id} {...ad} />);
  };

  return (
    <MainLayout title={t('Anuncios')}>
      <div className="advertsPage">
        <div className="grid-container">
          <aside className="advertsPage-aside">
            <FiltersForm onSubmit={handleSubmit} />
          </aside>
          <div className="advertsPage-content">
            <h2>{t('¿Qué estás buscando?')}</h2>
            <div className="advertsPage-adswrapper flex-container">
              {loading ? <Spinner /> : renderContent()}
            </div>
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
};
AdvertsPage.propTypes = {
  adverts: PropTypes.arrayOf(PropTypes.object),
  pages: PropTypes.number.isRequired,
  initialForm: PropTypes.objectOf(PropTypes.any),
  loadAdverts: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

AdvertsPage.defaultProps = {
  adverts: null,
  initialForm: {
    name: '',
    sale: '',
    tags: [],
    price: 0,
    sort: false,
  },
};

export default AdvertsPage;
