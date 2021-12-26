import { useReducer } from 'react';
import FavoritesContext from './favorite-context';
import { Player, Action } from '../type-models/models';

enum Command {ADD, REMOVE, CLEAR};
const defaultFavoritesList = [] as Player[];
const cachedPlayers = [] as Player[];

const FavoritesListReducer = (state: Player[], action: Action) => {
  const updatedFavorites = [...state];

  if (action.type === Command.ADD) {
    updatedFavorites.push(action.player!);
  }

  if (action.type === Command.REMOVE) {
    return updatedFavorites.filter(player => player.id !== action.id);
  }

  if (action.type === Command.CLEAR) {
    return [] as Player[];
  }
  return updatedFavorites;
};

const FavoritesProvider: React.FC<{}> = props => {
  const [FavoritesListState, dispatchListAction] = useReducer(
    FavoritesListReducer,
    defaultFavoritesList
  );

  const addPlayerHandler = (player: Player) => {
    dispatchListAction({ type: Command.ADD, player });
  };

  const removePlayerHandler = (player: Player) => {
    dispatchListAction({ type: Command.REMOVE, id: player.id });
  };

  const clearListHandler = () => {
    dispatchListAction({ type: Command.CLEAR });
  };

  const cacheFetchedPlayers = (players: Player[]) => {
    for (const p of players) {
      cachedPlayers.push(p);
    }
  };

  const favoritesContext = {
    players: FavoritesListState,
    allPlayers: cachedPlayers,
    addPlayer: addPlayerHandler,
    removePlayer: removePlayerHandler,
    clearList: clearListHandler,
    cachePlayers: cacheFetchedPlayers,
  };

  return (
    <FavoritesContext.Provider value={favoritesContext}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
