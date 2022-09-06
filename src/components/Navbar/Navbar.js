import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { auth } from '../../Firebase';
import { NavbarContainer } from './Navbar.styles';

const Navbar = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success(`SignOut Completed!`);
      })
      .catch(() => {
        toast.error(`Error while signing out!`);
      });
  };
  return (
    <NavbarContainer>
      <NavLink to={`/signin`}>
        <div className="button"> Sign In</div>
      </NavLink>
      <NavLink to={`/signup`}>
        <div className="button"> Sign Up</div>
      </NavLink>
      <div onClick={handleSignOut}>
        <div className="button"> Sign out</div>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
