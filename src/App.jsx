import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

import FoundPage from './pages/FoundPage';
import LostPage from './pages/LostPage';
import ItemDetailPage from './pages/ItemDetailPage';

import NotFound from './components/NotFound';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import { putAccessToken, getUserLogged } from './utils/api/auth';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

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
    toast.success('Berhasil login');
  }

  async function onChangeProfile(data) {
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken('');
    toast.success('Berhasil logout');
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
        <ToastContainer position="bottom-right" />
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
      <ToastContainer position="bottom-right" />
      <Navbar
        username={authedUser?.username}
        fullname={authedUser?.fullname}
        picture_url={authedUser?.picture_url}
        logout={onLogout}
      />
      <main className="pt-16">
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<Navigate to="/" />} />
          <Route path="/profile" element={<ProfilePage onChangeProfile={onChangeProfile} />} />
          {commonRoutes}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
