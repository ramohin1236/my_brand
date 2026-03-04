"use client";

import React, { useState, Component } from 'react';
// ============================================================
// SOCIAL SHARE BAR — share artisan page on social platforms
// ============================================================

import { LinkIcon, CheckIcon, FacebookIcon, TwitterIcon } from 'lucide-react';
interface SocialShareBarProps {
  url: string;
  title: string;
  description: string;
  image: string;
}
export function SocialShareBar({
  url,
  title,
  description
}: SocialShareBarProps) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const SHARES = [
    {
      label: 'Facebook',
      Icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      color: 'hover:bg-blue-600 hover:text-white hover:border-blue-600'
    },
    {
      label: 'Twitter / X',
      Icon: TwitterIcon,
      href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
      color: 'hover:bg-sky-500 hover:text-white hover:border-sky-500'
    }];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-body text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
        Share:
      </span>
      {SHARES.map(({ label, Icon, href, color }) =>
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-body font-medium border border-gray-200 dark:border-gray-600 rounded-full text-gray-600 dark:text-gray-300 transition-all ${color}`}>

          <Icon className="w-3.5 h-3.5" />
          {label}
        </a>
      )}
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-body font-medium border border-gray-200 dark:border-gray-600 rounded-full text-gray-600 dark:text-gray-300 hover:bg-forest hover:text-white hover:border-forest transition-all">

        {copied ?
          <CheckIcon className="w-3.5 h-3.5 text-green-400" /> :

          <LinkIcon className="w-3.5 h-3.5" />
        }
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>);

}