import { HomeNavigation } from 'components/HomeNavigation/HomeNavigation';
import css from './Home.module.css';
import user from 'images/start-img.png';

export const Home = () => {
  return (
    <div>
      <img className={css.img} src={user} alt="User greeting avatar" />
      <div>
        <span>[icon]</span>
        <h1>Task Pro</h1>
      </div>
      <p>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don't wait, start achieving your goals now!
      </p>
      <HomeNavigation />
    </div>
  );
};
