import { NavLink } from 'react-router-dom';
import css from './HomeNavigation.module.css';

export const HomeNavigation = () => {
  return (
    <ul>
      <li>
        <NavLink to="/auth/register">Registration</NavLink>
      </li>
      <li>
        <NavLink to="/auth/login">Log in</NavLink>
      </li>
    </ul>
  );
};
