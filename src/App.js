import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/landingPage';
import SigninPage from './pages/signinPage';
import SignupPage from './pages/signupPage';
import HomePage from './pages/homePage';
import NotFoundPage from './pages/notFoundPage';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import Loader from './components/Loader/loader';
import EditTaskPage from './pages/editTaskPage';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  onAuthStateChanged(auth, (user) => {
    setUserLoggedIn(!!user?.uid);
    setLoading(false);
  });
  if (loading) return <Loader />;
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/home"
          element={
            userLoggedIn ? <HomePage /> : <Navigate to="/signin" replace />
          }
        />
        <Route path="/task/:id" element={<EditTaskPage />} />
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
    </div>
  );
}

export default App;
