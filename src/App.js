import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useSound from 'use-sound';
import './App.css';
import { auth } from '../src/services/firebase/config';
import { setEmail, setUsername } from '../src/store/profile';
import { setAuth } from '../src/store/auth';
import gamesong from './assets/sound/gamesong.mp3'
import Play from './view/play/Play';
import GameOver from './view/play/GameOver';

function App() {
  const dispatch = useDispatch()
  const [play] = useSound(gamesong);

  useEffect(() => {
    play()
    auth.onAuthStateChanged(async user => {
      if (user) {
        dispatch(setEmail(user.email))
        dispatch(setUsername(user.displayName))
        dispatch(setAuth(true))
      }
      else {
        dispatch(setAuth(false))
      }
    })
  })


  return (
    <>
      <Router>
        <Switch>

          {/* <Route exact path="/">
        <Login />
      </Route>  */}
          {/* <Route exact path="/home">
        <Home />
      </Route>  */}
          <Route exact path="/">
            <Play />
          </Route>
          {/* <Route exact path="/profile">
        <Profile />
      </Route>  */}
          {/* <Route exact path="/script">
        <Script />
      </Route>  */}
          <Route exact path="/gameover">
            <GameOver />
          </Route>
          {/* <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/play" component={Play} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/script" component={Script} />
      <PrivateRoute path="/gameover" component={GameOver} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
