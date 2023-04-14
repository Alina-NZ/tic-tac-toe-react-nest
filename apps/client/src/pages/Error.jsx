import { NavLink, useRouteError } from 'react-router-dom';

export const Error = () => {
    const error = useRouteError();

    return <div>
        <h1>Oops! Something went wrong</h1>
        <p>{error.statusText ?? error.message}</p>
        <NavLink to="/">Menu</NavLink>
    </div>
}