import { Fragment, useState, useContext } from 'react';
import FavoritesContext from '../../store/favorite-context';
import classes from './SearchPlayerForm.module.css';

const FavoritesForm: React.FC<{ onChangeColor: (color: string) => void }> =
  props => {
    const [color, setColor] = useState<string>('#fff2df');
    const favoritesCtx = useContext(FavoritesContext);

    const formSubmitHandler = () => {
      props.onChangeColor(color);
    };

    const changeInputHandler = (ev: React.FormEvent<HTMLInputElement>) => {
      setColor(ev.currentTarget.value);
    };

    const clearListHandler = () => {
      favoritesCtx.clearList();
    };

    return (
        <form className={classes.form}>
          <label htmlFor='bgc'>Change Color</label>
          <input
            type='color'
            id='search'
            value={color}
            onChange={changeInputHandler}
          />
          <div className={classes.actions}>
            <button onClick={formSubmitHandler}>select</button>
            <button onClick={clearListHandler}>clear</button>
          </div>
        </form>
    );
  };

export default FavoritesForm;
