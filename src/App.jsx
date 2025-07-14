import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LostPage from './pages/LostPage';
import ItemDetailPage from './pages/ItemDetailPage';
import FoundPage from './pages/FoundPage';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import { putAccessToken, getUserLogged } from './utils/api/auth';

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

  const commonRoutes = (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/lost" element={<LostPage />} />
      <Route path="/found" element={<FoundPage />} />
      <Route path="/detail/:type/:id" element={<ItemDetailPage />} />
      <Route path="*" element={<NotFound />} />
    </>
  );

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
            {commonRoutes}
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
          {commonRoutes}
        </Routes>
      </main>
    </div>
  );
}

export default App;
