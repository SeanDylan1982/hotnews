import React from 'react';
import Hero from '../components/Hero';
import ArticleGrid from '../components/ArticleGrid';
import Newsletter from '../components/Newsletter';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ArticleGrid />
      <Newsletter />
    </>
  );
};

export default Home;