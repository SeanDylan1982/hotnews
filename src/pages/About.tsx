import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Shield, 
  Users, 
  Target, 
  Award,
  Mail,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Research',
      description: 'Our advanced AI systems analyze thousands of research papers, patents, and industry reports to deliver deep insights.'
    },
    {
      icon: Zap,
      title: 'Real-time Analysis',
      description: 'Get the latest developments as they happen with our real-time monitoring of scientific publications and tech news.'
    },
    {
      icon: Shield,
      title: 'Verified Sources',
      description: 'Every article is fact-checked and sourced from peer-reviewed journals, reputable institutions, and verified experts.'
    },
    {
      icon: Users,
      title: 'Expert Network',
      description: 'Our content is reviewed by a network of PhD researchers, industry veterans, and technology thought leaders.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Monthly Readers' },
    { number: '1000+', label: 'Research Articles' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '24/7', label: 'Content Updates' }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Researcher',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Former Google AI researcher with 15+ years in machine learning and neural networks.',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Technology Editor',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Award-winning technology journalist covering emerging tech trends for over a decade.',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Quantum Computing Lead',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Quantum computing researcher and former IBM Quantum team member.',
      social: { linkedin: '#', twitter: '#' }
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              About DeepResearch
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize access to cutting-edge technology research and make complex scientific breakthroughs accessible to everyone.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-accent-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-primary-600 mb-6 leading-relaxed">
                In an era of rapid technological advancement, staying informed about breakthrough research and emerging technologies has never been more critical. DeepResearch bridges the gap between complex scientific literature and practical understanding.
              </p>
              <p className="text-lg text-primary-600 mb-8 leading-relaxed">
                We believe that everyone should have access to the latest developments in AI, quantum computing, biotechnology, and other transformative fields that are shaping our future.
              </p>
              
              <div className="flex items-center space-x-4">
                <Target className="w-8 h-8 text-accent-500" />
                <div>
                  <h3 className="font-semibold text-primary-900">Our Goal</h3>
                  <p className="text-primary-600">Make cutting-edge research accessible to everyone</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <img
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Research and Technology"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-6">
              What Makes Us Different
            </h2>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto">
              Our unique approach combines artificial intelligence, expert curation, and rigorous fact-checking to deliver unparalleled research insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-primary-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto">
              Our diverse team of researchers, journalists, and technologists brings decades of combined experience in cutting-edge technology fields.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent rounded-full"></div>
                </div>
                
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-accent-600 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-primary-600 mb-6 leading-relaxed">
                  {member.bio}
                </p>
                
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.linkedin}
                    className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-accent-100 hover:text-accent-600 transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 hover:bg-accent-100 hover:text-accent-600 transition-colors"
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Have questions, suggestions, or want to collaborate? We'd love to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="mailto:hello@deepresearch.com"
                className="flex items-center space-x-2 px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
              >
                <Mail size={20} />
                <span>hello@deepresearch.com</span>
              </a>
              
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;