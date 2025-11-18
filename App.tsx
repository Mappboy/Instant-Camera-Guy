import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RepairsPage from './pages/RepairsPage';
import ListPage from './pages/ListPage';
import PostPage from './pages/PostPage';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/Instant-Camera-Guy/" element={<HomePage />} />
          <Route path="/Instant-Camera-Guy/repair" element={<RepairsPage />} />
          <Route path="/Instant-Camera-Guy/:category" element={<ListPage />} />
          <Route path="/Instant-Camera-Guy/:category/:slug" element={<PostPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
