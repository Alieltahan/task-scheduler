import bg from '../media/404.jpg';
import styles from './NotFound.module.css';
import { useNavigate } from 'react-router';
const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className={styles.container}>
      <h4> 404 Error </h4>
      <h3>Sorry, we can’t seem to find what you’re looking for.</h3>
      <button onClick={handleClick} className={styles.glow}>
        Return to Home Page..
      </button>
      <img src={bg} className={styles.background} alt="page not found" />
    </div>
  );
};

export default NotFound;
