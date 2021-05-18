//import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import LoginPage from './views/LoginPage/LoginPage';
import SignInPage from './views/SignInPage/SignInPage';
import HomePage from './views/HomePage/HomePage';
import SearchPage from './views/SearchPage/SearchPage';
import ProfilePage from './views/ProfilePage/ProfilePage';
import AddAnnouncementPage from './views/AddAnnouncementPage/AddAnnouncementPage';
import ErrorPage from './views/ErrorPage/ErrorPage';
import Header from './components/Header/Header';
import {useEffect, useState} from "react";
import axios from "axios";



function App() {
    const [authorized, setAuthorized] = useState(false);
    useEffect(() => {
        axios.post('api/users/isAuthorized')
            .then(data => {
               if(data.status===200){
                   setAuthorized(true);
               }
            })
            .catch(() => {
                setAuthorized(false);
            })
    });
    return (
        <Router>
            <Header authorized={authorized} setAuthorized={setAuthorized}/>
            <Switch>
                <Route path="/" exact={true} render={(props) => (
                    <HomePage {...props} />
                )}/>
                <Route path="/login" render={(props) => (
                    <LoginPage {...props} authorized={authorized} setAuthorized={setAuthorized}/>
                )}/>
                <Route path="/signin" render={(props) => (
                    <SignInPage {...props} authorized={authorized} setAuthorized={setAuthorized}/>
                )}/>
                <Route path="/search" render={(props) => (
                    <SearchPage {...props} />
                )}/>
                <Route path="/profile" render={(props) => (
                    <ProfilePage {...props} authorized={authorized} setAuthorized={setAuthorized}/>
                )}/>
                <Route path="/add-announcement" render={(props) => (
                    <AddAnnouncementPage {...props} authorized={authorized} setAuthorized={setAuthorized}/>
                )}/>
                <Route path="/404" render={(props) => (
                    <ErrorPage {...props} />
                )}/>
                <Redirect to="/404"/>
            </Switch>
        </Router>
    );
}

export default App;
