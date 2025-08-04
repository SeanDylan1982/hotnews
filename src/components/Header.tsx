import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Menu, X, User, Bell, Bookmark, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './auth/LoginModal';
import SignupModal from './auth/SignupModal';
import SearchModal from './SearchModal';
import ArticleModal from './ArticleModal';
import { Article } from '../types';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showArticleModal, setShowArticleModal] = useState(false);
  
  const location = useLocation();
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const handleSearchArticleSelect = (article: Article) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
    setShowSearchModal(false);
  };

  const handleCloseArticleModal = () => {
    setShowArticleModal(false);
    setSelectedArticle(null);
  };

  // Close user menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setShowUserMenu(false);
    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserMenu]);

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <motion.div 
                  className="text-2xl font-bold text-primary-800"
                  whileHover={{ scale: 1.05 }}
                >
                  DeepResearch
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`font-medium transition-colors ${
                  isActiveRoute('/') 
                    ? 'text-accent-500' 
                    : 'text-primary-700 hover:text-accent-500'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/categories" 
                className={`font-medium transition-colors ${
                  isActiveRoute('/categories') 
                    ? 'text-accent-500' 
                    : 'text-primary-600 hover:text-accent-500'
                }`}
              >
                Categories
              </Link>
              <Link 
                to="/trending" 
                className={`font-medium transition-colors ${
                  isActiveRoute('/trending') 
                    ? 'text-accent-500' 
                    : 'text-primary-600 hover:text-accent-500'
                }`}
              >
                Trending
              </Link>
              <Link 
                to="/about" 
                className={`font-medium transition-colors ${
                  isActiveRoute('/about') 
                    ? 'text-accent-500' 
                    : 'text-primary-600 hover:text-accent-500'
                }`}
              >
                About
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <motion.button
                onClick={() => setShowSearchModal(true)}
                className="p-2 text-primary-600 hover:text-accent-500 hover:bg-primary-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Search articles"
              >
                <Search size={20} />
              </motion.button>

              {/* User Actions - Desktop */}
              <div className="hidden md:flex items-center space-x-3">
                {user ? (
                  <>
                    <motion.button 
                      className="p-2 text-primary-600 hover:text-accent-500 hover:bg-primary-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      title="Notifications"
                    >
                      <Bell size={20} />
                    </motion.button>
                    <motion.button 
                      className="p-2 text-primary-600 hover:text-accent-500 hover:bg-primary-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      title="Saved articles"
                    >
                      <Bookmark size={20} />
                    </motion.button>
                    
                    {/* User Menu */}
                    <div className="relative">
                      <motion.button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowUserMenu(!showUserMenu);
                        }}
                        className="flex items-center space-x-2 p-2 text-primary-600 hover:text-accent-500 hover:bg-primary-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        {user.user_metadata?.avatar_url ? (
                          <img 
                            src={user.user_metadata.avatar_url} 
                            alt={user.user_metadata?.name || user.email}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <User size={20} />
                        )}
                      </motion.button>

                      {showUserMenu && (
                        <motion.div
                          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-primary-200 py-2 z-10"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="px-4 py-2 border-b border-primary-100">
                            <p className="font-semibold text-primary-900 truncate">
                              {user.user_metadata?.name || user.email}
                            </p>
                            <p className="text-sm text-primary-500 truncate">{user.email}</p>
                          </div>
                          <button
                            onClick={handleSignOut}
                            className="w-full text-left px-4 py-2 text-primary-700 hover:bg-primary-50 flex items-center space-x-2 transition-colors"
                          >
                            <LogOut size={16} />
                            <span>Sign Out</span>
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="px-4 py-2 text-primary-600 hover:text-accent-500 transition-colors font-medium"
                      disabled={loading}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setShowSignupModal(true)}
                      className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors font-medium"
                      disabled={loading}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={onMenuToggle}
                className="md:hidden p-2 text-primary-600 hover:text-accent-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Modal */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onArticleSelect={handleSearchArticleSelect}
      />

      {/* Article Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={showArticleModal}
        onClose={handleCloseArticleModal}
      />

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
};

export default Header;