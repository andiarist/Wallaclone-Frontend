import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { TagsOutlined } from '@ant-design/icons';

// import { getTags } from '../../../store/selectors';

function SelectTags({
  tags,
  size,
  loadTags,
  onChange,
  defaultTags,
  placeholder,
  val,
}) {
  const { Option } = Select;

  useEffect(() => {
    loadTags();
    return () => {};
  }, []);

  return (
    <Select
      onChange={value => {
        onChange({ target: { value, name: 'tags' } });
      }}
      mode="tags"
      style={{ width: '100%' }}
      value={val}
      defaultValue={defaultTags}
      placeholder={
        <>
          <TagsOutlined className="site-form-item-icon" />
          {` ${placeholder}`}
        </>
      }
      size={size}
    >
      {tags && tags.map(tag => <Option key={tag}>{tag}</Option>)}
    </Select>
  );
}

SelectTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  loadTags: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultTags: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  size: PropTypes.string,
  val: PropTypes.arrayOf(PropTypes.string),
};

SelectTags.defaultProps = {
  placeholder: '',
  tags: [],
  defaultTags: [],
  size: 'middle',
  val: [],
};

export default SelectTags;
