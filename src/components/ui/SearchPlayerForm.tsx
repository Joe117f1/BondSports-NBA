import React, { useState } from 'react';
import { Player } from '../../type-models/models';
import classes from './SearchPlayerForm.module.css';

const SearchPlayerForm: React.FC<{
  list: Player[];
  onGetSearchedPlayer: (p: Player) => void;
  onGetCachedPlayers: () => void;
}> = props => {
  const [enteredSearchValue, setEnteredSearchValue] = useState<string>('');

  const formSubmitHandler = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!enteredSearchValue) return;
    const res = props.list.find(p =>
      p.fullName.toLowerCase().includes(enteredSearchValue.toLowerCase())
    );
    if (!res) return;
    props.onGetSearchedPlayer(res);
    // clearInput(); //optional...
  };

  const changeInputHandler = (ev: React.FormEvent<HTMLInputElement>) => {
    setEnteredSearchValue(ev.currentTarget.value);
  };

  const clearInput = () => {
    setEnteredSearchValue('');
  };

  const getPlayersHandlers = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    props.onGetCachedPlayers();
  };

  return (
    <form onSubmit={formSubmitHandler} className={classes.form}>
      <label htmlFor='search'>Search Player</label>
      <input
        type='text'
        id='search'
        onChange={changeInputHandler}
        value={enteredSearchValue}
      />
      <div className={classes.actions}>
        <button type='submit'>search</button>
        <button onClick={getPlayersHandlers}>all players</button>
      </div>
    </form>
  );
};

export default SearchPlayerForm;
