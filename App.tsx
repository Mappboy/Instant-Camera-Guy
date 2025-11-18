import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RepairsPage from './pages/RepairsPage';
import ListPage from './pages/ListPage';
import PostPage from './pages/PostPage';
import Layout from './components/Layout';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isRepairPage = location.pathname === '/Instant-Camera-Guy/repair';

  return (
    <Layout simpleHeader={isRepairPage}>
      <Routes>
        <Route path="/Instant-Camera-Guy/" element={<HomePage />} />
        <Route path="/Instant-Camera-Guy/repair" element={<RepairsPage />} />
        <Route path="/Instant-Camera-Guy/:category" element={<ListPage />} />
        <Route path="/Instant-Camera-Guy/:category/:slug" element={<PostPage />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
