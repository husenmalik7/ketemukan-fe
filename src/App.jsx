import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LostPage from './pages/LostPage';
import ItemDetailPage from './pages/ItemDetailPage';
import FoundPage from './pages/FoundPage';
import NotFound from './components/NotFound';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import { putAccessToken, getUserLogged } from './utils/api/auth';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchUserLogged() {
      try {
        const { data } = await getUserLogged();
        setAuthedUser(data);
      } catch (error) {
        console.error(error);
        setHasError(true);
        setAuthedUser(null);
      } finally {
        setInitializing(false);
      }
    }

    fetchUserLogged();
  }, []);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken('');
  }

  const commonRoutes = (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/lost" element={<LostPage />} />
      <Route path="/found" element={<FoundPage />} />
      <Route
        path="/detail/:type/:id"
        element={<ItemDetailPage username={authedUser?.username} />}
      />
      <Route path="*" element={<NotFound />} />
    </>
  );

  if (initializing) {
    return null;
  }

  if (hasError) {
    return (
      <div className="pt-16 text-center text-red-500">
        Server is dead, please contact 911, or try again later
      </div>
    );
  }

  if (authedUser === null) {
    return (
      <div className="bg-[#FBFBFB]">
        <Navbar />
        <main className="pt-16">
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<Navigate to="/" />} />
            {commonRoutes}
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#FBFBFB]">
      <Navbar username={authedUser?.username} fullname={authedUser?.fullname} logout={onLogout} />
      <main className="pt-16">
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
          <Route path="/profile" element={<ProfilePage />} />
          {commonRoutes}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
