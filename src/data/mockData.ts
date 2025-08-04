import { Article, Category, Author } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Artificial Intelligence', slug: 'ai', color: 'bg-blue-500', icon: 'Brain' },
  { id: '2', name: 'Quantum Computing', slug: 'quantum', color: 'bg-purple-500', icon: 'Cpu' },
  { id: '3', name: 'Blockchain & Web3', slug: 'blockchain', color: 'bg-green-500', icon: 'Link' },
  { id: '4', name: 'Biotechnology', slug: 'biotech', color: 'bg-red-500', icon: 'Dna' },
  { id: '5', name: 'Space Technology', slug: 'space', color: 'bg-indigo-500', icon: 'Rocket' },
  { id: '6', name: 'Cybersecurity', slug: 'security', color: 'bg-orange-500', icon: 'Shield' },
];

export const authors: Author[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'AI Research Scientist with 15+ years in machine learning and neural networks',
    verified: true
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Technology journalist covering emerging tech trends and innovations',
    verified: true
  },
  {
    id: '3',
    name: 'Dr. Emily Watson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Quantum computing researcher and technology evangelist',
    verified: true
  }
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Revolutionary Impact of Quantum-AI Hybrid Systems on Modern Computing',
    slug: 'quantum-ai-hybrid-systems-computing-revolution',
    excerpt: 'Exploring how the convergence of quantum computing and artificial intelligence is reshaping computational paradigms and opening new frontiers in problem-solving capabilities.',
    content: 'Full article content here...',
    coverImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: authors[0],
    category: categories[0],
    tags: ['Quantum Computing', 'AI', 'Machine Learning', 'Technology'],
    publishedAt: '2024-01-15T10:00:00Z',
    readTime: 12,
    likes: 1247,
    views: 8932,
    featured: true,
    trending: true
  },
  {
    id: '2',
    title: 'Breakthrough in Neural Interface Technology: Direct Brain-Computer Communication',
    slug: 'neural-interface-brain-computer-communication',
    excerpt: 'Scientists achieve unprecedented success in creating seamless brain-computer interfaces that could revolutionize how we interact with digital systems.',
    content: 'Full article content here...',
    coverImage: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: authors[1],
    category: categories[3],
    tags: ['Neurotechnology', 'BCI', 'Innovation', 'Medical Technology'],
    publishedAt: '2024-01-14T14:30:00Z',
    readTime: 8,
    likes: 892,
    views: 5421,
    featured: true,
    trending: false
  },
  {
    id: '3',
    title: 'The Next Generation of Blockchain: Sustainable and Scalable Web3 Solutions',
    slug: 'next-generation-blockchain-sustainable-web3',
    excerpt: 'Analyzing emerging blockchain technologies that promise to solve scalability and environmental concerns while maintaining decentralization principles.',
    content: 'Full article content here...',
    coverImage: 'https://images.pexels.com/photos/8499886/pexels-photo-8499886.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: authors[2],
    category: categories[2],
    tags: ['Blockchain', 'Web3', 'Cryptocurrency', 'Sustainability'],
    publishedAt: '2024-01-13T09:15:00Z',
    readTime: 10,
    likes: 634,
    views: 3876,
    featured: false,
    trending: true
  },
  {
    id: '4',
    title: 'Space Manufacturing: How Zero-Gravity Production Could Transform Industries',
    slug: 'space-manufacturing-zero-gravity-production',
    excerpt: 'Investigating the potential of manufacturing in space environments and how it could lead to revolutionary advances in materials science and production.',
    content: 'Full article content here...',
    coverImage: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: authors[1],
    category: categories[4],
    tags: ['Space Technology', 'Manufacturing', 'Innovation', 'Materials Science'],
    publishedAt: '2024-01-12T16:45:00Z',
    readTime: 15,
    likes: 756,
    views: 4329,
    featured: false,
    trending: false
  },
  {
    id: '5',
    title: 'Cybersecurity in the Age of AI: New Threats and Advanced Defense Mechanisms',
    slug: 'cybersecurity-ai-threats-defense-mechanisms',
    excerpt: 'Examining how artificial intelligence is both creating new cybersecurity challenges and providing innovative solutions for digital protection.',
    content: 'Full article content here...',
    coverImage: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: authors[0],
    category: categories[5],
    tags: ['Cybersecurity', 'AI', 'Digital Protection', 'Technology'],
    publishedAt: '2024-01-11T11:20:00Z',
    readTime: 9,
    likes: 445,
    views: 2987,
    featured: false,
    trending: true
  },
  {
    id: '6',
    title: 'Gene Editing 2.0: CRISPR Advances and the Future of Personalized Medicine',
    slug: 'gene-editing-crispr-personalized-medicine',
    excerpt: 'Deep dive into the latest CRISPR developments and how they\'re paving the way for truly personalized medical treatments and therapies.',
    content: 'Full article content here...',
    coverImage: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    author: authors[2],
    category: categories[3],
    tags: ['CRISPR', 'Gene Editing', 'Biotechnology', 'Medicine'],
    publishedAt: '2024-01-10T13:00:00Z',
    readTime: 11,
    likes: 923,
    views: 6543,
    featured: false,
    trending: false
  }
];