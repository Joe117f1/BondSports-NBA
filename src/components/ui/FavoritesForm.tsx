import { useState, useContext } from 'react';
import FavoritesContext from '../../store/favorite-context';
import classes from './SearchPlayerForm.module.css';

const FavoritesForm: React.FC<{ onChangeColor: (color: string) => void }> =
  props => {
    const [color, setColor] = useState<string>('#fff2df');
    const favoritesCtx = useContext(FavoritesContext);

    const formSubmitHandler = (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      props.onChangeColor(color);
    };

    const changeInputHandler = (ev: React.FormEvent<HTMLInputElement>) => {
      setColor(ev.currentTarget.value);
    };

    const clearListHandler = (ev: React.MouseEvent<HTMLElement>) => {
      favoritesCtx.clearList();
    };

    return (
      <form onSubmit={formSubmitHandler} className={classes.form}>
        <label htmlFor='bgc'>Change Color</label>
        <input
          type='color'
          id='search'
          value={color}
          onChange={changeInputHandler}
        />
        <div className={classes.actions}>
          <button type='submit'>select</button>
          <button onClick={clearListHandler}>clear List</button>
        </div>
      </form>
    );
  };

export default FavoritesForm;
