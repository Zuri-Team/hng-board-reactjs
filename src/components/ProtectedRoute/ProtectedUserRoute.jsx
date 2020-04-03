import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export default ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        sessionStorage.getItem('isUserLogged') == "true" ? <Component {...props} {...rest}/> : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )} />
)
