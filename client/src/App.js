import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import LoginPage from './views/LoginPage/LoginPage';
import HomePage from './views/HomePage/HomePage';
import Header from './components/Header/Header';



function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://192.168.1.22:3001/users')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, []);

    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
                <Route path="*">
                    <LoginPage/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
