import { Link } from 'react-router-dom'

import { siteConfig } from '../config/siteConfig'
import '../styles/Footer.css'

import { Mail, Phone, MapPin, Globe, Camera, MessageCircle, Play } from 'lucide-react'

const socialIcons = {
  instagram: Camera,
  facebook: Globe,
  twitter: MessageCircle,
  youtube: Play,
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src={siteConfig.logo}
              alt={siteConfig.logoAlt}
              className="h-9 w-9 rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <span className="font-display text-xl font-extrabold uppercase text-white">
              {siteConfig.companyName}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-300">
            {siteConfig.footerNote}
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/apply-now" className="footer-link">
                Apply Now
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer-heading">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-brand-orange" />
              <a href={`mailto:${siteConfig.contact.email}`} className="footer-link">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-brand-orange" />
              <a href={`tel:${siteConfig.contact.phone}`} className="footer-link">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-orange" />
              <span>{siteConfig.contact.address}</span>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="footer-heading">Follow Us</h3>
          <div className="mt-4 flex gap-3">
            {siteConfig.socials.map((social) => {
              const Icon = socialIcons[social.icon] || Instagram
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-slate-200 transition hover:border-brand-orange hover:text-brand-orange"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-400 sm:flex-row">
          <p>{siteConfig.copyright}</p>
          <p>Built with React, Vite &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}