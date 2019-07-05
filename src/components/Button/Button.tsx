import React from 'react';

import './styles.css';

type Props = {
  children?: JSX.Element | JSX.Element[] | string,
  className?: string,
  onClick: () => void,
  showSpinner?: boolean,
};

const Button = ({
  children,
  className, 
  onClick = () => {},
  showSpinner = false,
}: Props) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type="button"
    >
      {
        showSpinner ?
        '...': // TODO: make it actual spinner
        children
      }
    </button>
  );
}

export default Button;
