"use client";

import React from 'react';
// ============================================================
// THEME TOGGLE — dark / light mode button
// ============================================================

import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleTheme, selectTheme } from '../../store/themeSlice';
export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectTheme);
  const isDark = mode === 'dark';
  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-forest/60 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-forest/40">

      <motion.div
        animate={{
          x: isDark ? 28 : 2
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30
        }}
        className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center">

        {isDark ?
          <MoonIcon className="w-3 h-3 text-forest" /> :

          <SunIcon className="w-3 h-3 text-amber-500" />
        }
      </motion.div>
    </button>);

}