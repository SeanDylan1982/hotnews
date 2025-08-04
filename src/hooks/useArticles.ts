import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Article } from '../types';

export const useArticles = (filters?: { category?: string; featured?: boolean; trending?: boolean }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params: Record<string, string> = {};
        if (filters?.category) params.category = filters.category;
        if (filters?.featured !== undefined) params.featured = filters.featured.toString();
        if (filters?.trending !== undefined) params.trending = filters.trending.toString();

        const data = await api.getArticles(params);
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [filters?.category, filters?.featured, filters?.trending]);

  return { articles, loading, error };
};

export const useFeaturedArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getFeaturedArticles();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured articles');
        console.error('Error fetching featured articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticles();
  }, []);

  return { articles, loading, error };
};

export const useArticle = (slug: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getArticle(slug);
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  return { article, loading, error };
};