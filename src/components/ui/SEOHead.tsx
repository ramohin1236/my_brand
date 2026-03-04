"use client";

import React, { useEffect, createElement } from 'react';
// ============================================================
// SEO HEAD COMPONENT
// Manages document title and meta tags for each page
// Uses React Helmet pattern via direct DOM manipulation
// ============================================================
interface SEOHeadProps {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  keywords?: string;
  /** Canonical URL for this page */
  canonicalUrl?: string;
}
export function SEOHead({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  keywords,
  canonicalUrl
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(
        `meta[${attr}="${name}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    if (description) setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    // OpenGraph tags
    setMeta('og:title', ogTitle || title, true);
    setMeta('og:description', ogDescription || description || '', true);
    if (ogImage) setMeta('og:image', ogImage, true);
    setMeta('og:type', 'website', true);
    if (canonicalUrl) setMeta('og:url', canonicalUrl, true);
    // Twitter card
    setMeta('twitter:card', ogImage ? 'summary_large_image' : 'summary');
    setMeta('twitter:title', ogTitle || title);
    setMeta('twitter:description', ogDescription || description || '');
    if (ogImage) setMeta('twitter:image', ogImage);
  }, [
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    keywords,
    canonicalUrl]
  );
  return null;
}