import React, { useState } from 'react';
import { Player } from '../../type-models/models';
import classes from './SearchPlayerForm.module.css';

const SearchPlayerForm: React.FC<{
  list: Player[];
  getSearchedPlayerHandler: (p: Player) => void;
  getCachedPlayersHandler: () => void;
}> = props => {
  const [enteredSearchValue, setEnteredSearchValue] = useState<string>('');

  const formSubmitHandler = (ev: React.FormEvent) => {
    ev.preventDefault();
    const res = props.list.find(p =>
      p.fullName.toLowerCase().includes(enteredSearchValue.toLowerCase())
    );
    if (!res) return;
    props.getSearchedPlayerHandler(res);
    // clearInput(); //optional...
  };

  const changeInputHandler = (ev: React.FormEvent<HTMLInputElement>) => {
    setEnteredSearchValue(ev.currentTarget.value);
  };

  const clearInput = () => {
    setEnteredSearchValue('');
  };

  const getAllPlayers = () => {
    props.getCachedPlayersHandler();
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
        <button>search</button>
        <button onClick={getAllPlayers}>all players</button>
      </div>
    </form>
  );
};

export default SearchPlayerForm;
