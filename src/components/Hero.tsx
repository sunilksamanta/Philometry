'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Main Sacred Geometry Pattern */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Centered Flower of Life Pattern */}
          <svg className="w-full h-full" viewBox="0 0 800 800">
            <motion.g
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="stroke-blue-200"
            >
              {/* Center Circle */}
              <motion.circle
                cx="400"
                cy="400"
                r="100"
                fill="none"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
              
              {/* First Ring of Circles */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.circle
                  key={i}
                  cx={400 + Math.cos(angle * Math.PI / 180) * 100}
                  cy={400 + Math.sin(angle * Math.PI / 180) * 100}
                  r="100"
                  fill="none"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: i * 0.2 }}
                />
              ))}
              
              {/* Second Ring of Circles */}
              {[30, 90, 150, 210, 270, 330].map((angle, i) => (
                <motion.circle
                  key={`outer-${i}`}
                  cx={400 + Math.cos(angle * Math.PI / 180) * 173.2}
                  cy={400 + Math.sin(angle * Math.PI / 180) * 173.2}
                  r="100"
                  fill="none"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 + i * 0.2 }}
                />
              ))}
            </motion.g>
          </svg>
        </motion.div>
      </div>

      {/* Fixed position floating elements */}
      {[
        { top: "15%", left: "10%" },
        { top: "25%", left: "85%" },
        { top: "60%", left: "15%" },
        { top: "70%", left: "80%" },
        { top: "85%", left: "25%" },
        { top: "35%", left: "45%" },
        { top: "45%", left: "75%" },
        { top: "75%", left: "60%" }
      ].map((position, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            ...position,
            width: '80px',
            height: '80px'
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 100 100" className="stroke-blue-100">
            {i % 2 === 0 ? (
              <polygon
                points="50,10 90,90 10,90"
                fill="none"
                strokeWidth="1"
              />
            ) : (
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                strokeWidth="1"
              />
            )}
          </svg>
        </motion.div>
      ))}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-7xl font-light text-gray-900 mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Patterns of
            <motion.span 
              className="block font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Natural Intelligence
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Discover the universal patterns that shape our reality. 
            Experience mathematics as a gateway to understanding nature&apos;s deepest principles.
          </motion.p>

          <motion.div 
            className="flex gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Link
              href="#examples"
              className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              Begin Journey
            </Link>
            <Link
              href="#about"
              className="bg-white text-gray-800 px-8 py-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;