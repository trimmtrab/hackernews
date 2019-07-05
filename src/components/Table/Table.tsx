import React from 'react';

import Button from '../Button';

import './styles.css';

type Props = {
  list: {
    author?: string,
    num_comments?: number,
    objectID: string,
    points?: number,
    title?: string,
    url?: string,
  }[],
  onDismiss: (id: any) => void,
};

const Table = ({ 
  list, 
  onDismiss 
}: Props) => {
  const largeColumn = {
    width: '40%',
  };

  const midColumn = {
    width: '30%',
  };

  const smallColumn = {
    width: '10%',
  };

  return (
    <div className="table">
      {list.map(item =>
        <div key={item.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={midColumn}>
            {item.author}
          </span>
          <span style={smallColumn}>
            {item.num_comments}
          </span>
          <span style={smallColumn}>
            {item.points}
          </span>
          <span style={smallColumn}>
            <Button
              className="button-inline"
              onClick={() => onDismiss(item.objectID)}
            >
              Dismiss
            </Button>
          </span>
        </div>
      )}
    </div>
  );
}

export default Table;
