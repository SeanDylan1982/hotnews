import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-800 to-primary-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22 fill-rule=%22evenodd%22%3E%3Cpath d=%22m0 40l40-40h-40v40zm40 0v-40h-40l40 40z%22/%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-accent-500/20 rounded-full mb-8"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(249, 115, 22, 0.3)',
                '0 0 40px rgba(249, 115, 22, 0.5)',
                '0 0 20px rgba(249, 115, 22, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Mail className="w-8 h-8 text-accent-400" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Stay Ahead of the Curve
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-white/80 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Get weekly deep-dive research articles on emerging technologies, AI breakthroughs, and industry insights delivered to your inbox.
          </motion.p>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="flex items-center justify-center px-8 py-4 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-colors shadow-lg hover:shadow-xl whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </form>
            ) : (
              <motion.div
                className="flex items-center justify-center space-x-3 text-success-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg font-semibold">Thank you for subscribing!</span>
              </motion.div>
            )}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-400 rounded-full"></div>
              <span className="text-sm">Join 50,000+ subscribers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-400 rounded-full"></div>
              <span className="text-sm">No spam, unsubscribe anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-400 rounded-full"></div>
              <span className="text-sm">Weekly deep research</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;