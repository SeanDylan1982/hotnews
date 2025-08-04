import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Bookmark, Home, Grid, TrendingUp, Info, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchOpen?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onSearchOpen }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Grid, label: 'Categories', href: '/categories' },
    { icon: TrendingUp, label: 'Trending', href: '/trending' },
    { icon: Info, label: 'About', href: '/about' },
  ];

  const userActions = [
    { icon: Bell, label: 'Notifications', href: '#' },
    { icon: Bookmark, label: 'Saved Articles', href: '#' },
    { icon: User, label: 'Profile', href: '#' },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const handleSearchClick = () => {
    onSearchOpen?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            className="fixed top-16 left-0 right-0 bg-white border-b border-primary-200 z-50 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-6 space-y-6">
              {/* Search Button */}
              <motion.button
                onClick={handleSearchClick}
                className="w-full flex items-center space-x-3 px-4 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Search size={20} />
                <span className="font-medium">Search Articles</span>
              </motion.button>

              {/* Navigation */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-primary-900 uppercase tracking-wider mb-3">
                  Navigation
                </h3>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 2) }}
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                        isActiveRoute(item.href)
                          ? 'bg-accent-50 text-accent-600'
                          : 'text-primary-700 hover:bg-primary-50 hover:text-accent-500'
                      }`}
                      onClick={onClose}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* User Actions */}
              {user && (
                <div className="space-y-2 border-t pt-4">
                  <h3 className="text-sm font-semibold text-primary-900 uppercase tracking-wider mb-3">
                    Account
                  </h3>
                  {userActions.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-primary-700 hover:bg-primary-50 hover:text-accent-500 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (menuItems.length + index + 2) * 0.1 }}
                      onClick={onClose}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </motion.a>
                  ))}
                </div>
              )}

              {/* Sign In Button */}
              {!user && (
                <motion.button
                  className="w-full bg-accent-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Sign In
                </motion.button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;