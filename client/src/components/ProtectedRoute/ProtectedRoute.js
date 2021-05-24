import {Redirect, Route, useLocation} from "react-router-dom";
import AuthorizationService from "../../services/AuthorizationService/AuthorizationService";
import {useEffect} from "react";

function ProtectedRoute(props){
    const [authorized, setAuthorized] = [props.authorized, props.setAuthorized]
    const location = useLocation();
    useEffect(()=>{
        AuthorizationService.isAuthorized()
            .then(data => {
                if(data.status===200){
                    setAuthorized(true);
                }
            })
            .catch(() => {
                setAuthorized(false);
            })
    },[])
    return authorized ? (
        <Route {...props} />
    ) : (
        <Redirect to={{pathname: "/login", state: {from: location}}}/>
    );

}

export default ProtectedRoute;