import React, { useState } from 'react';
import {
  Mail, Phone, Calendar, MapPin, Copy, Check,
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  Code, Briefcase, Send
} from 'lucide-react';

export default function ProfileSidebar({ isMobile = false }) {
  const [isExpanded, setIsExpanded] = useState(isMobile ? false : true);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText('lelam7c10tp@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { icon: <Mail size={16} />, url: "mailto:lelam7c10tp@gmail.com", label: "Email" },
    { icon: <Send size={16} />, url: "https://t.me/lamlb2411", label: "Telegram" },
    { icon: <Code size={16} />, url: "https://github.com/IchiLamlb", label: "GitHub" },
    { icon: <Briefcase size={16} />, url: "https://github.com/IchiLamlb", label: "LinkedIn" }
  ];

  const contactInfo = [
    {
      icon: <Mail size={16} />,
      label: "Email",
      value: "lelam7c10tp@gmail.com",
      action: (
        <button
          onClick={handleCopyEmail}
          className="ml-2 p-1 text-gray-500 hover:text-gold rounded transition-colors"
          title="Copy Email"
        >
          {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
        </button>
      )
    },
    {
      icon: <Phone size={16} />,
      label: "Phone",
      value: "+84 96 241 1002"
    },
    {
      icon: <Calendar size={16} />,
      label: "Birthday",
      value: "24-11-2003"
    },
    {
      icon: <MapPin size={16} />,
      label: "Location",
      value: "Hanoi, Vietnam"
    }
  ];

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="bg-dark-100 border border-dark-300 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl">
        {/* Header Block */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-4 flex items-center gap-4 relative cursor-pointer select-none"
        >
          <div className="w-14 h-14 rounded-2xl bg-dark-200 border border-dark-300 overflow-hidden shrink-0">
            <img
              src="/assets/avatar.jpg"
              alt="Le Bao Lam"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-white text-base">Le Bao Lam</h2>
            <span
              className="text-[10px] text-gold bg-dark-200 border border-gold/40 px-2.5 py-0.5 rounded-full mt-1 inline-block"
              style={{ textShadow: '0 0 8px rgba(191, 90, 242, 0.4)' }}
            >
              Software Developer
            </span>
          </div>
          <button
            className="w-8 h-8 rounded-lg bg-dark-200 border border-dark-300 flex items-center justify-center text-gold"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Expandable Details */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out border-t border-dark-300/30 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
            }`}
        >
          {/* Contact Details List */}
          <div className="p-5 flex flex-col gap-4">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-dark-200 border border-dark-300 flex items-center justify-center text-gold shrink-0">
                  {info.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] uppercase tracking-widest text-gray-500 font-mono">
                    {info.label}
                  </p>
                  <p className="text-xs text-gray-200 mt-0.5 font-medium flex items-center truncate">
                    {info.value}
                    {info.action}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-dark-300/60 mx-5"></div>

          {/* Social Icons */}
          <div className="p-5 flex items-center justify-center gap-3">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-dark-200 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/50 hover:shadow-[0_0_12px_rgba(191,90,242,0.3)] transition-all"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div
      className="hidden lg:flex flex-col bg-dark-100 border border-dark-300 rounded-3xl sticky top-24 self-start shadow-xl w-[280px] h-fit relative overflow-hidden"
    >
      <div className="p-5 w-full flex flex-col relative">
        {/* User Profile Header */}
        <div className="flex items-center gap-3 mt-4 mb-5">
          <div
            className="rounded-2xl bg-dark-200 border border-dark-300 overflow-hidden shadow-md shrink-0"
            style={{ width: '60px', height: '60px' }}
          >
            <img
              src="/assets/avatar.jpg"
              alt="Le Bao Lam"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 pr-6">
            <h2 className="font-bold text-white text-sm tracking-wide truncate">Le Bao Lam</h2>
            <span
              className="text-[9px] text-gold bg-dark-200 border border-gold/40 px-2 py-0.5 rounded-full mt-1.5 inline-block font-mono"
              style={{ textShadow: '0 0 8px rgba(191, 90, 242, 0.4)' }}
            >
              Software Developer
            </span>
          </div>
        </div>

        <div className="h-px bg-dark-300/60 w-full mb-5"></div>

        {/* Contact Details List */}
        <div className="flex flex-col gap-4 mb-5">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-dark-200 border border-dark-300 flex items-center justify-center text-gold shrink-0">
                {info.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] uppercase tracking-widest text-gray-500 font-mono">
                  {info.label}
                </p>
                <p className="text-xs text-gray-200 mt-0.5 font-medium flex items-center truncate">
                  {info.value}
                  {info.action}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-dark-300/60 w-full mb-5"></div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-dark-200 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/50 hover:shadow-[0_0_12px_rgba(191,90,242,0.3)] transition-all"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
