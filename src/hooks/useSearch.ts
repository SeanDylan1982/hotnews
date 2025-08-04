import { useState, useEffect } from 'react';
import { Article } from '../types';
import { api } from '../lib/api';

export const useSearch = (query: string, category?: string) => {
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const searchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the search API endpoint
        const searchResults = await api.searchArticles(query);
        
        // Filter by category if specified
        const filteredResults = category 
          ? searchResults.filter(article => article.category.slug === category)
          : searchResults;

        setResults(filteredResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(searchArticles, 300);
    return () => clearTimeout(timeoutId);
  }, [query, category]);

  return { results, loading, error };
};

export const useSearchSuggestions = (query: string) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    // Mock suggestions based on common search terms
    const commonTerms = [
      'Artificial Intelligence',
      'Machine Learning',
      'Neural Networks',
      'Deep Learning',
      'Quantum Computing',
      'Quantum Entanglement',
      'Quantum Algorithms',
      'CRISPR',
      'Gene Editing',
      'Biotechnology',
      'Blockchain',
      'Cryptocurrency',
      'Web3',
      'Space Technology',
      'Mars Mission',
      'Cybersecurity',
      'Data Privacy'
    ];

    const filtered = commonTerms.filter(term => 
      term.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    setSuggestions(filtered);
  }, [query]);

  return suggestions;
};