import React from 'react';
import PropTypes from 'prop-types';

import './styles.css'

const Search = ({ value, onChange, onSubmit, children }) => (
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

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Search;
