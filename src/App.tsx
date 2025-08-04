import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Trending from './pages/Trending';
import About from './pages/About';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;