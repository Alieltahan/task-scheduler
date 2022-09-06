import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/Auth/AuthProvider';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/landingPage';
import SigninPage from './pages/signinPage';
import SignupPage from './pages/signupPage';
import HomePage from './pages/homePage';
import NotFoundPage from './pages/notFoundPage';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  onAuthStateChanged(auth, (user) => {
    console.log(`App`, !!user?.uid);
    setUserLoggedIn(!!user?.uid);
  });
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/home"
            element={
              userLoggedIn ? <HomePage /> : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/signin"
            element={
              userLoggedIn ? <Navigate to="/home" replace /> : <SigninPage />
            }
          />
          <Route
            path="/signup"
            element={
              userLoggedIn ? <Navigate to="/home" replace /> : <SignupPage />
            }
          />
          <Route
            path="/"
            element={
              userLoggedIn ? <Navigate to="/home" replace /> : <LandingPage />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
