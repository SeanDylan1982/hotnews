import React, { useState } from 'react';
import Header from './Header';
import MobileMenu from './MobileMenu';
import SearchModal from './SearchModal';
import ArticleModal from './ArticleModal';
import Footer from './Footer';
import { Article } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchArticleSelect = (article: Article) => {
    setSelectedArticle(article);
    setIsArticleModalOpen(true);
    setIsSearchModalOpen(false);
  };

  const handleCloseArticleModal = () => {
    setIsArticleModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onMenuToggle={toggleMobileMenu} isMenuOpen={isMobileMenuOpen} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onSearchOpen={() => setIsSearchModalOpen(true)}
      />
      
      <main className="pt-16">
        {children}
      </main>
      
      <Footer />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onArticleSelect={handleSearchArticleSelect}
      />

      {/* Global Article Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={isArticleModalOpen}
        onClose={handleCloseArticleModal}
      />
    </div>
  );
};

export default Layout;