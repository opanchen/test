import { Outlet } from 'react-router-dom';
import css from './StartLayout.module.css';

export const StartLayout = () => {
  return (
    <div className={css.container}>
      {/* <p>Start Page Layout</p> */}
      {/* <br /> */}
      <Outlet />
    </div>
  );
};
