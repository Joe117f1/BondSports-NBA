import React, { Fragment, useState, useEffect, useContext } from 'react';
import FavoritesContext from '../../store/favorite-context';
import PlayerItem from '../player/PlayerItem';
import LoadingSpinner from '../ui/LoadingSpinner';
import { Player } from '../../type-models/models';
import classes from './ListContent.module.css';

const ListContent: React.FC<{
  players: Player[];
  isFavorites: boolean;
}> = props => {
  const [isFavorites, setIsFavorites] = useState(false);
  const [isPlayers, setIsPlayers] = useState(false);
  const favoritesCtx = useContext(FavoritesContext);
  const players = props.players;
  //TODO: mange empty list from API...

  useEffect(() => {
    if (props.isFavorites) {
      setIsFavorites(true);
    }
  }, [props.isFavorites]);

  useEffect(() => {
    if (players.length > 0) {
      setIsPlayers(true);
    } else {
      setIsPlayers(false);
    }
  }, [players]);

  const toggleFavoriteHandler = (player: Player) => {
    if (isFavorites) {
      player.isFavorite = false;
      favoritesCtx.removePlayer(player);
    } else {
      if (favoritesCtx.players.includes(player)) return; //can be turn into un-favorite
      player.isFavorite = true;
      favoritesCtx.addPlayer(player);
    }
  };

  const placeHolder = isFavorites ? (
    <h3 className={classes.placeHolder}>Choose your favorite players</h3>
  ) : (
    <LoadingSpinner />
  );

  return (
    <Fragment>
      {!isPlayers && placeHolder}
      {isPlayers && (
        <div className={classes.list}>
          {players.map(player => {
            return (
              <PlayerItem
                key={player.id}
                onToggleFavorite={toggleFavoriteHandler}
                player={player}
                isFavorites={isFavorites}
              />
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default React.memo(ListContent);
