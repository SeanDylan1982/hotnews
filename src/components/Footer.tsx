import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Twitter, 
  Linkedin, 
  Github, 
  ArrowRight,
  Brain,
  Zap,
  Shield
} from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = {
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Mission', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
    ],
    Resources: [
      { name: 'Research Papers', href: '#' },
      { name: 'AI Tools', href: '#' },
      { name: 'API Documentation', href: '#' },
      { name: 'Developer Hub', href: '#' },
    ],
    Categories: [
      { name: 'Artificial Intelligence', href: '#' },
      { name: 'Quantum Computing', href: '#' },
      { name: 'Biotechnology', href: '#' },
      { name: 'Space Technology', href: '#' },
    ],
    Support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  const features = [
    { icon: Brain, title: 'AI-Powered Research', description: 'Deep analysis using advanced AI' },
    { icon: Zap, title: 'Real-time Updates', description: 'Latest tech news as it happens' },
    { icon: Shield, title: 'Verified Sources', description: 'Trusted and fact-checked content' },
  ];

  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-3xl font-bold mb-4">DeepResearch</div>
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                Your gateway to cutting-edge technology research and AI-powered insights. 
                Discover the future of innovation through deep, analytical content.
              </p>
              
              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center mt-0.5">
                      <feature.icon className="w-4 h-4 text-accent-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{feature.title}</div>
                      <div className="text-sm text-white/70">{feature.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + categoryIndex * 0.1, duration: 0.6 }}
                >
                  <h3 className="font-semibold text-white mb-4">{category}</h3>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + categoryIndex * 0.1 + linkIndex * 0.05, duration: 0.4 }}
                      >
                        <a
                          href={link.href}
                          className="text-white/70 hover:text-accent-400 transition-colors group flex items-center"
                        >
                          {link.name}
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              className="text-white/60 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              © 2024 DeepResearch. All rights reserved. Powered by AI.
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-accent-400 hover:bg-accent-500/20 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.4 }}
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;