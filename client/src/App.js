import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from './views/LoginPage/LoginPage';
import SignInPage from './views/SignInPage/SignInPage';
import HomePage from './views/HomePage/HomePage';
import SearchPage from './views/SearchPage/SearchPage';
import ProfilePage from './views/ProfilePage/ProfilePage';
import AddAnnouncementPage from './views/AddAnnouncementPage/AddAnnouncementPage';
import ErrorPage from './views/ErrorPage/ErrorPage';
import Header from './components/Header/Header';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {useEffect, useState} from "react"
import AuthorizationService from "./services/AuthorizationService/AuthorizationService";


function App() {
    const [authorized, setAuthorized] = useState(false);
    useEffect(() => {
        console.log("app is authorized");
        AuthorizationService.isAuthorized()
            .then(data => {
                if (data.status === 200) {
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
                <ProtectedRoute path="/profile/:id" authorized={authorized} setAuthorized={setAuthorized}
                                render={(props) => (
                                    <ProfilePage {...props}/>
                                )}/>
                <ProtectedRoute path="/add-announcement" authorized={authorized} setAuthorized={setAuthorized}
                                render={(props) => (
                                    <AddAnnouncementPage {...props}/>
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
