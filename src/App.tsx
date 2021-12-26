// import { Fragment } from 'react';
import FavoritesProvider from './store/favoritesProvider';
import ListContainer from './components/players-list/ListContainer';
import classes from './App.module.css';

function App() {
  return (
    <FavoritesProvider>
      <div className={classes.pageTitle}>
        <h1>NBA PLAYERS</h1>
        <img src={require('./assets/site-images/nba-logo-transparent.png')} alt='NBA logo' />
      </div>
      <ListContainer />
    </FavoritesProvider>
  );
}

export default App;
