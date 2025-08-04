export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  category: Category;
  tags: string[];
  publishedAt: string;
  readTime: number;
  likes: number;
  views: number;
  featured: boolean;
  trending: boolean;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  preferences: UserPreferences;
}

export interface UserPreferences {
  categories: string[];
  notifications: boolean;
  theme: 'light' | 'dark';
}