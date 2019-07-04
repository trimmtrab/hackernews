import React from 'react';

import './styles.css';

type Props = {
  children?: JSX.Element | JSX.Element[] | string,
  className?: string,
  onClick: () => void,
};

const Button = ({
  children,
  className, 
  onClick = () => {}, 
}: Props) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export default Button;
