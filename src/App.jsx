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

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function fetchUserLogged() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
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

  if (authedUser === null) {
    return (
      <div className="bg-[#FBFBFB]">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<Navigate to="/" />} />
            {commonRoutes}
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#FBFBFB]">
      <Navbar username={authedUser?.username} fullname={authedUser?.fullname} logout={onLogout} />
      <main className="pt-16">
        <Routes>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
          <Route path="/profile" element={<ProfilePage />} />
          {commonRoutes}
        </Routes>
      </main>
    </div>
  );
}

export default App;
