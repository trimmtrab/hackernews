import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Button = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: '',
}

Button.propTypes = {
  // without isRequired can also be null or undefined
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Button;
