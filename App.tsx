import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoadingSpinner from './components/LoadingSpinner';
import Layout from './components/Layout';

const RepairsPage = lazy(() => import('./pages/RepairsPage'));
const ListPage = lazy(() => import('./pages/ListPage'));
const PostPage = lazy(() => import('./pages/PostPage'));
const VideosPage = lazy(() => import('./pages/VideosPage'));

const AppContent: React.FC = () => {
  const location = useLocation();
  const isRepairPage = location.pathname === '/repair';
  const isVideosPage = location.pathname === '/videos';

  return (
    <Layout simpleHeader={isRepairPage || isVideosPage}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/repair" element={<RepairsPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/:category" element={<ListPage />} />
          <Route path="/:category/:slug" element={<PostPage />} />
        </Routes>
      </Suspense>
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
