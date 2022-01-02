import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import FavoritesContext from '../../store/favorite-context';
import ListContent from './ListContent';
import FavoritesForm from '../ui/FavoritesForm';
import SearchPlayerForm from '../ui/SearchPlayerForm';
import { PlayerFullData, Player } from '../../type-models/models';
import classes from './PlayersList.module.css';

const PLAYERS_API = 'https://www.balldontlie.io/api/v1/players'; //can be an environment variable

const PlayersList: React.FC<{
  isFavorites: boolean;
}> = props => {
  const [isFavorites, setIsFavorites] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [cachedPlayers, setCachedPlayers] = useState<Player[]>([]);
  const [, setError] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const favoritesCtx = useContext(FavoritesContext);

  const fetchPlayersList = useCallback(async (api: string): Promise<void> => {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      const formatPlayers = data.data.map((player: PlayerFullData): Player => {
        return {
          id: player.id,
          fullName: `${player.first_name} ${player.last_name}`,
          team: player.team.full_name,
          position: player.position,
          isFavorite: false,
        };
      });

      setPlayers(formatPlayers);
      setCachedPlayers(formatPlayers);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); //handle errors by logging it in server & display something to the user
      }
    }
  }, []);

  useEffect(() => {
    if (props.isFavorites) {
      setIsFavorites(true);
      return;
    }
    fetchPlayersList(PLAYERS_API).then(res => {
      favoritesCtx.cachePlayers(cachedPlayers);
    });
  }, [fetchPlayersList, props.isFavorites]);

  const listTitle = isFavorites ? 'YOUR FAVORITE PLAYERS' : 'ALL PLAYERS';

  const listPlayers = useMemo(() => {
    return isFavorites ? favoritesCtx.players : players;
  }, [favoritesCtx.players, players, isFavorites]);

  const changeColorHandler = (color: string) => {
    setBackgroundColor(color);
  };

  const getSearchedPlayerHandler = (player: Player) => {
    const searcheResult = [player];
    setPlayers(searcheResult);
  };

  const getCachedPlayersHandler = () => {
    setPlayers(cachedPlayers);
    // fetchPlayersList(PLAYERS_API); // Might be better with caching the list
  };

  return (
    <div className={classes.list}>
      <div className={classes.listHeader}>
        <h1>{listTitle}</h1>
        {isFavorites && <FavoritesForm onChangeColor={changeColorHandler} />}
        {!isFavorites && (
          <SearchPlayerForm
            list={players}
            onGetSearchedPlayer={getSearchedPlayerHandler}
            onGetCachedPlayers={getCachedPlayersHandler}
          />
        )}
      </div>
      <div className={classes.container} style={{ backgroundColor }}>
        <ListContent players={listPlayers} isFavorites={isFavorites} />
      </div>
    </div>
  );
};

export default PlayersList;
