'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Leaf, Infinity } from 'lucide-react';

export const AboutSection = () => {
  const categories = [
    {
      title: "Mathematics",
      icon: <Infinity className="w-8 h-8" />,
      color: "blue",
      description: "Discover the fundamental patterns that govern reality",
      delay: 0.1
    },
    {
      title: "Philosophy",
      icon: <Brain className="w-8 h-8" />,
      color: "purple",
      description: "Explore the deeper meaning behind universal structures",
      delay: 0.2
    },
    {
      title: "Nature",
      icon: <Leaf className="w-8 h-8" />,
      color: "green",
      description: "Observe mathematical harmony in natural phenomena",
      delay: 0.3
    },
    {
      title: "Consciousness",
      icon: <Sparkles className="w-8 h-8" />,
      color: "yellow",
      description: "Understand the patterns of awareness and existence",
      delay: 0.4
    }
  ];

  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Exploring the
                <span className="block text-blue-600 mt-2">Universal Language</span>
              </h2>
              <div className="space-y-6 relative">
                <p className="text-lg text-gray-600">
                  From the elegant dance of subatomic particles to the vast spirals of galaxies, 
                  a profound mathematical harmony underlies all of existence. These patterns aren&apos;t 
                  just coincidences—they&apos;re glimpses into the fundamental nature of reality.
                </p>
                <p className="text-lg text-gray-600">
                  Through interactive visualizations and explorations, we invite you to journey 
                  through the interconnected realms of mathematics, consciousness, and natural phenomena. 
                  Discover how sacred geometry, fractal patterns, and quantum mechanics reveal the 
                  deep unity beneath apparent diversity.
                </p>
                
                {/* Decorative element */}
                <div className="absolute -left-8 top-1/2 w-1 h-24 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full transform -translate-y-1/2" />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {categories.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: category.delay, duration: 0.5 }}
                className={`bg-${category.color}-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center gap-4`}
              >
                <div className={`p-4 rounded-full bg-${category.color}-100 text-${category.color}-600`}>
                  {category.icon}
                </div>
                <h3 className={`text-xl font-semibold text-${category.color}-600`}>
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-gradient-to-tr from-green-50 to-yellow-50 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2" />
      </div>
    </section>
  );
};