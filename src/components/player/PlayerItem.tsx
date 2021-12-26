import Card from '../ui/Card';
import { Player } from '../../type-models/models';
import classes from './PlayerItem.module.css';

const PlayerItem: React.FC<{
  player: Player;
  onToggleFavorite: (p: Player) => void;
  isFavorites: boolean;
}> = props => {
  const { fullName, position, team } = props.player;

  const togglePlayer = (ev: any) => {
    props.onToggleFavorite(props.player);
  };

  const favoriteMarker = !props.isFavorites && props.player.isFavorite;

  return (
    <Card>
      <div className={classes.card} onClick={togglePlayer}>
        <h3 className={classes.title}>{fullName.toUpperCase()}</h3>
        <h3>{team}</h3>
        <h4>{`Position: ${position}`}</h4>
        {favoriteMarker && <i className={classes.favorite}>Favorite Player</i>}
      </div>
    </Card>
  );
};

export default PlayerItem;
