import React from 'react';
import { Player } from '../type-models/models';

const FavoritesContext = React.createContext({
  players: [] as Player[],
  allPlayers: [] as Player[],
  addPlayer: (p: Player): void => { },
  removePlayer: (p: Player): void => { },
  clearList: (): void => { },
  cachePlayers: (p: Player[]): void => { },
});

export default FavoritesContext;