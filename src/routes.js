import React from "react";
import { Route } from "react-router-dom";
import Home from "./view/Home/Home";
import Profile from "./view/profile/Profile";
import Play from './view/play/Play';
import Login from './view/auth/Login';

const Routes = () => (
    <div className='home'>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/play" component={Play}></Route>
    </div>
);

export default Routes;