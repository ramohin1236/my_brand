"use client";

import React, { useState } from 'react';
// ============================================================
// NEWSLETTER SECTION
// Email subscription with animated success state
// ============================================================

import { motion, AnimatePresence } from 'framer-motion';
import { MailIcon, CheckCircleIcon, ArrowRightIcon } from 'lucide-react';
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'>(
      'idle');
  const [errorMsg, setErrorMsg] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus('success');
  };
  return (
    <section className="py-20 bg-cream" aria-labelledby="newsletter-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest rounded-2xl overflow-hidden shadow-luxury-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Image */}
            <div className="relative hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80"
                alt="Bamboo craft"
                className="w-full h-full object-cover opacity-40" />

              <div className="absolute inset-0 bg-forest/60" />
              {/* Decorative text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-heading text-6xl font-bold text-white/10 text-center leading-tight">
                  Stay
                  <br />
                  Inspired
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <div className="w-12 h-12 bg-orange/20 rounded-xl flex items-center justify-center mb-6">
                <MailIcon className="w-6 h-6 text-orange" />
              </div>

              <p className="text-orange font-body text-sm font-semibold tracking-widest uppercase mb-3">
                Join Our Community
              </p>
              <h2
                id="newsletter-heading"
                className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">

                Get Inspired,
                <br />
                Stay Ahead
              </h2>
              <p className="font-body text-white/70 text-sm leading-relaxed mb-8">
                Subscribe for exclusive offers, new arrivals, care tips, and
                stories from our artisans. No spam, ever. Unsubscribe anytime.
              </p>

              <AnimatePresence mode="wait">
                {status === 'success' ?
                  <motion.div
                    key="success"
                    initial={{
                      opacity: 0,
                      scale: 0.9
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    className="flex items-center gap-3 bg-white/10 rounded-xl p-5">

                    <CheckCircleIcon className="w-8 h-8 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="font-heading text-white font-semibold">
                        You're in!
                      </p>
                      <p className="font-body text-white/70 text-sm mt-0.5">
                        Welcome to the NatureCraft family. Check your inbox for
                        a special welcome offer.
                      </p>
                    </div>
                  </motion.div> :

                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-3">

                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === 'error') setStatus('idle');
                          }}
                          placeholder="Enter your email"
                          className="w-full pl-10 pr-4 py-3.5 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 font-body text-sm focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange/50 transition-colors"
                          aria-label="Email address" />

                      </div>
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="px-5 py-3.5 bg-orange text-white font-body font-semibold text-sm rounded hover:bg-orange-dark transition-colors disabled:opacity-70 flex items-center gap-2 flex-shrink-0">

                        {status === 'loading' ?
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :

                          <>
                            Subscribe
                            <ArrowRightIcon className="w-4 h-4" />
                          </>
                        }
                      </button>
                    </div>

                    {status === 'error' &&
                      <motion.p
                        initial={{
                          opacity: 0,
                          y: -4
                        }}
                        animate={{
                          opacity: 1,
                          y: 0
                        }}
                        className="text-red-400 text-xs font-body">

                        {errorMsg}
                      </motion.p>
                    }

                    <p className="text-white/40 text-xs font-body">
                      🔒 We respect your privacy. Unsubscribe at any time.
                    </p>
                  </motion.form>
                }
              </AnimatePresence>

              {/* Benefits */}
              <div className="flex flex-wrap gap-4 mt-8">
                <span className="text-xs font-body text-white/50 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-orange inline-block" />
                  Exclusive offers
                </span>
                <span className="text-xs font-body text-white/50 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-orange inline-block" />
                  New arrivals first
                </span>
                <span className="text-xs font-body text-white/50 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-orange inline-block" />
                  Artisan stories
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}