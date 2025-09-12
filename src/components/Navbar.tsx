// components/Navbar.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: "/projects", label: "PROJECTS" },
  { href: "/process", label: "PROCESS" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "SERVICES" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-20 py-6 px-4 sm:px-8 md:px-12 lg:px-16 text-charcoal">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold tracking-widest font-serif">
            HEARTH & HOME
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium tracking-wider hover:text-opacity-70 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="lg:hidden z-30" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-cream/90 backdrop-blur-sm z-20 flex items-center justify-center"
          >
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center space-y-8"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    className="text-3xl font-serif text-charcoal"
                    onClick={() => setIsOpen(false)} // Close menu on link click
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}