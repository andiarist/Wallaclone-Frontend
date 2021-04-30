import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import NewAdvertPage from '../NewAdvertPage';

export default function EditAdvertPage({ advert, loadAdvertDetail }) {
  const { id } = useParams();

  useEffect(() => {
    if (!advert) {
      loadAdvertDetail(id);
    }
  }, []);

  const renderContent = () =>
    advert && (
      <NewAdvertPage
        mode="edit"
        initialForm={{
          name: advert.name,
          sale: advert.sale,
          price: advert.price,
          tags: advert.tags,
          description: advert.description,
          image: advert.image,
        }}
      />
    );
  return renderContent();
}
EditAdvertPage.propTypes = {
  advert: PropTypes.objectOf(PropTypes.any),
};

EditAdvertPage.defaultProps = {
  advert: null,
};
