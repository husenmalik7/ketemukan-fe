import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LostPage from './pages/LostPage';
import ItemDetailPage from './pages/ItemDetailPage';
import FoundPage from './pages/FoundPage';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

function App() {
  const [authedUser, setAuthedUser] = useState(null);

  const commonRoutes = (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/lost" element={<LostPage />} />
      <Route path="/found" element={<FoundPage />} />
      <Route path="/detail/:type/:id" element={<ItemDetailPage />} />
      <Route path="*" element={<NotFound />} />
    </>
  );

  if (authedUser === null) {
    return (
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
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
