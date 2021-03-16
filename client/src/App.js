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



function App() {
    //const [data, setData] = useState(null);

    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/signin" component={SignInPage} />
                <Route path="/" exact={true} component={HomePage} />
                <Route path="/search" component={SearchPage}/>
                <Route path="/profile" component={ProfilePage}/>
                <Route path="/addannouncement" component={AddAnnouncementPage}/>
                <Route path="/404" component={ErrorPage} />
                <Redirect to="/404"/>
            </Switch>
        </Router>
    );
}

export default App;
