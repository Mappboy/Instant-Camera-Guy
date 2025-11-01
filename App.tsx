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
          <Route path="/Intstant-Camera-Guy-2025-Redesign/" element={<HomePage />} />
          <Route path="/Intstant-Camera-Guy-2025-Redesign/repair" element={<RepairsPage />} />
          <Route path="/Intstant-Camera-Guy-2025-Redesign/:category" element={<ListPage />} />
          <Route path="/Intstant-Camera-Guy-2025-Redesign/:category/:slug" element={<PostPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
