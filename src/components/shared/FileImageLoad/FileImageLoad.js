import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import './FileImageLoad.css';
import { getApiBaseUrl, getPublicUrl } from '../../../config/envConfig';

const FileImageLoad = ({ onFileSelect, imgUrl }) => {
  const [file, setFile] = useState(null);
  const [initialImg, setInitialImg] = useState(imgUrl);
  const inputRef = createRef(null);

  const handleFileInput = e => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      onFileSelect(e.target.files[0]);
    }
    e.target.value = null;
  };

  const handleClick = () => {
    setFile(null);
    const { current: fileInput } = inputRef;
    fileInput.click();
  };

  const renderImage = () => (
    <div className="fileLoad-image-container">
      <Image
        width={200}
        height={200}
        src={file ? URL.createObjectURL(file) : `${getApiBaseUrl()}${imgUrl}`}
      />
      <button
        type="button"
        className="deleteimage-wrapper"
        onClick={() => {
          setFile(null);
          setInitialImg(null);
          onFileSelect(null);
        }}
      >
        <img
          className="deleteimage-icon"
          src={`${getPublicUrl()}/icons/del-photo-30.png`}
          alt="Delete file"
        />
      </button>
    </div>
  );
  return (
    <div className="fileLoad">
      <div className="fileLoad-image">
        {initialImg || file ? (
          renderImage()
        ) : (
          <div className="fileLoad-image-empty">
            <button
              type="button"
              className="addimage-wrapper"
              onClick={handleClick}
            >
              <img
                className="addimage-icon"
                src={`${getPublicUrl()}/icons/add-photo-80.png`}
                alt="Add file"
              />
            </button>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/x-png,image/jpeg"
        id="file"
        onChange={handleFileInput}
        hidden
      />
    </div>
  );
};

FileImageLoad.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  imgUrl: PropTypes.string,
};

FileImageLoad.defaultProps = {
  imgUrl: '',
};

export default FileImageLoad;
