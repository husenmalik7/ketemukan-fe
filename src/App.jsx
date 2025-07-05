import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LostPage from './pages/LostPage';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="app-container">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lost" element={<LostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
