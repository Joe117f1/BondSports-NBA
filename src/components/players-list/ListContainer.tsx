import React from 'react';
import PlayersList from './PlayersList';
import classes from './ListContainer.module.css';

const ListContainer: React.FC = () => {
  return (
    <div className={classes.container}>
      <PlayersList isFavorites={false} />
      <PlayersList isFavorites={true} />
    </div>
  );
};

export default ListContainer;
