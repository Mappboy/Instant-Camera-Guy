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
          <Route path="/" element={<HomePage />} />
          <Route path="/repair" element={<RepairsPage />} />
          <Route path="/:category" element={<ListPage />} />
          <Route path="/:category/:slug" element={<PostPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
