import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/Auth/AuthProvider';
import Home from './components/Home/Home';
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
              userLoggedIn ? <Home /> : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/signin"
            element={userLoggedIn ? <HomePage /> : <SigninPage />}
          />
          <Route
            path="/signup"
            element={userLoggedIn ? <HomePage /> : <SignupPage />}
          />
          <Route
            path="/"
            element={userLoggedIn ? <HomePage /> : <LandingPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
