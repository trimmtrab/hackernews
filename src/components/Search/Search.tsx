import React from 'react';

import './styles.css'

type Props = {
  children?: JSX.Element | JSX.Element[] | string,
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void,
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void,
  value?: string,
};

const Search = ({ 
  children,
  onChange = () => {}, 
  onSubmit = () => {}, 
  value = '',
}: Props) => (
  <form 
    className="search"
    onSubmit={onSubmit} 
  >
    <input
      onChange={onChange}
      type="text"
      value={value}
    />
    <button type="submit">
      {children}
    </button>
  </form>
);

export default Search;
