interface NBATeam {
  full_name: string;
}

interface NBAPlayer {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  team: NBATeam;
}

export interface PlayerFullData extends NBAPlayer {

}

export interface Player {
  id: number;
  fullName: string;
  team: string;
  position: string;
  isFavorite: boolean;
}

export interface Action {
  type: number;
  player?: Player;
  id?: number;
}
