import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RepairsPage from './pages/RepairsPage';
import ListPage from './pages/ListPage';
import PostPage from './pages/PostPage';
import VideosPage from './pages/VideosPage';
import Layout from './components/Layout';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isRepairPage = location.pathname === '/repair';
  const isVideosPage = location.pathname === '/videos';

  return (
    <Layout simpleHeader={isRepairPage || isVideosPage}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/repair" element={<RepairsPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/:category" element={<ListPage />} />
        <Route path="/:category/:slug" element={<PostPage />} />
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
