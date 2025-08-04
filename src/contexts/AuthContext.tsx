import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: { message: string } }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: { message: string } }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: { message: string } }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      user_metadata: {
        name: email.split('@')[0],
        avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      }
    };
    
    setUser(mockUser);
    setLoading(false);
    
    return { error: undefined };
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    
    // Mock successful signup (user needs to verify email)
    return { error: undefined };
  };

  const signOut = async () => {
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { error: undefined };
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};