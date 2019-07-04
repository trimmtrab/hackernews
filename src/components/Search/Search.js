import React from 'react';
import PropTypes from 'prop-types';

import './styles.css'

const Search = ({ 
  children,
  onChange, 
  onSubmit, 
  value,
}) => (
  <form onSubmit={onSubmit} className="search">
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>
);

Search.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
}

export default Search;
