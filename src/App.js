import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContext, AuthProvider } from './components/Auth/AuthProvider';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/landingPage';
import SigninPage from './pages/signinPage';
import SignupPage from './pages/signupPage';
import NotFoundPage from './pages/notFoundPage';
import { useContext } from 'react';

function App() {
  const currentUser = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="home"
            element={currentUser ? <Home /> : <Navigate to="/signin" replace />}
          />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
