import React from 'react';
// ============================================================
// FOOTER COMPONENT
// Luxury brand footer with links, newsletter, social
// ============================================================
import Link from 'next/link';
import {
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  YoutubeIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon
} from
  'lucide-react';
export function Footer() {
  return (
    <footer className="bg-forest text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange rounded flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">
                  N
                </span>
              </div>
              <div>
                <span className="font-heading text-xl font-bold text-white leading-none block">
                  NatureCraft
                </span>
                <span className="text-xs font-body text-white/50 tracking-widest uppercase leading-none">
                  Luxury Living
                </span>
              </div>
            </div>
            <p className="text-sm font-body text-white/70 leading-relaxed mb-6">
              Handcrafted furniture from sustainably sourced wood, bamboo, and
              cane. Each piece tells a story of nature's beauty and artisan
              skill.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors">

                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors">

                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors">

                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors">

                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/category/wood"
                  className="text-sm font-body text-white/70 hover:text-orange transition-colors">

                  Wood Furniture
                </Link>
              </li>
              <li>
                <Link
                  href="/category/bamboo"
                  className="text-sm font-body text-white/70 hover:text-orange transition-colors">

                  Bamboo Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/category/cane"
                  className="text-sm font-body text-white/70 hover:text-orange transition-colors">

                  Cane Furniture
                </Link>
              </li>
              <li>
                <Link
                  href="/products?filter=bestseller"
                  className="text-sm font-body text-white/70 hover:text-orange transition-colors">

                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/products?filter=new"
                  className="text-sm font-body text-white/70 hover:text-orange transition-colors">

                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/products?filter=sale"
                  className="text-sm font-body text-white/70 hover:text-orange transition-colors">

                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm font-body text-white/70 hover:text-orange transition-colors">

                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-sm font-body text-white/70 hover:text-orange transition-colors">

                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="/artisans"
                  className="text-sm font-body text-white/70 hover:text-orange transition-colors">

                  Our Artisans
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm font-body text-white/70 hover:text-orange transition-colors">

                  Journal
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm font-body text-white/70 hover:text-orange transition-colors">

                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-sm font-body text-white/70 hover:text-orange transition-colors">

                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />
                <span className="text-sm font-body text-white/70">
                  House 42, Road 5, Gulshan-1
                  <br />
                  Dhaka 1212, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="w-4 h-4 text-orange flex-shrink-0" />
                <a
                  href="tel:+8801700000000"
                  className="text-sm font-body text-white/70 hover:text-orange transition-colors">

                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="w-4 h-4 text-orange flex-shrink-0" />
                <a
                  href="mailto:hello@naturecraft.com.bd"
                  className="text-sm font-body text-white/70 hover:text-orange transition-colors">

                  hello@naturecraft.com.bd
                </a>
              </li>
            </ul>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-xs font-body bg-white/10 text-white/70 px-3 py-1.5 rounded-full">
                🔒 Secure Payments
              </span>
              <span className="text-xs font-body bg-white/10 text-white/70 px-3 py-1.5 rounded-full">
                🌿 Eco Certified
              </span>
              <span className="text-xs font-body bg-white/10 text-white/70 px-3 py-1.5 rounded-full">
                🚚 Free Shipping
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-body text-white/50">
            © {new Date().getFullYear()} NatureCraft. All rights reserved.
            Crafted with ❤️ in Bangladesh.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs font-body text-white/50 hover:text-white transition-colors">

              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs font-body text-white/50 hover:text-white transition-colors">

              Terms of Service
            </Link>
            <Link
              href="/returns"
              className="text-xs font-body text-white/50 hover:text-white transition-colors">

              Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>);

}