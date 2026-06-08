import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, FolderOpen, Zap, Award, Mail } from 'lucide-react';

export function DesktopNav() {
  const navLinkClass = ({ isActive }) => 
    `flex items-center justify-center rounded-lg transition-all duration-200 ${
      isActive ? 'p-1.5 bg-gold text-dark font-semibold' : 'px-4 py-1.5 text-sm font-medium text-gray-400 hover:text-white'
    }`;
    
  return (
    <nav className="hidden lg:flex fixed top-5 left-1/2 -translate-x-1/2 z-50 items-center gap-2 px-3 py-1.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
      <NavLink to="/" className={({ isActive }) => `flex items-center justify-center rounded-lg transition-all duration-200 ${isActive ? 'p-1.5 bg-gold text-dark font-semibold' : 'px-4 py-1.5 text-sm font-medium text-gray-400 hover:text-white'}`}>
        {({ isActive }) => isActive ? <Home size={20} /> : 'Home'}
      </NavLink>
      <NavLink to="/about" className={navLinkClass}>About</NavLink>
      <NavLink to="/projects" className={navLinkClass}>Projects</NavLink>
      <NavLink to="/skills" className={navLinkClass}>Skills</NavLink>
      <NavLink to="/credentials" className={navLinkClass}>Credentials</NavLink>
      <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
    </nav>
  );
}

export function MobileNav() {
  const navLinkClass = ({ isActive }) => 
    `relative flex-1 flex flex-col items-center justify-center px-0 py-1 gap-0.5 group rounded-xl`;

  const iconClass = (isActive) => 
    `transition-colors ${isActive ? 'text-gold' : 'text-gray-500'}`;

  const textClass = (isActive) =>
    `text-[9px] ${isActive ? 'text-gold' : 'text-gray-500'}`;

  return (
    <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] max-w-md bg-dark-100/95 backdrop-blur-md border border-dark-300 rounded-2xl shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between px-2 py-2">
        <NavLink to="/" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <Home size={18} className={iconClass(isActive)} />
              <span className={textClass(isActive)}>Home</span>
            </>
          )}
        </NavLink>
        <NavLink to="/about" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <User size={18} className={iconClass(isActive)} />
              <span className={textClass(isActive)}>About</span>
            </>
          )}
        </NavLink>
        <NavLink to="/projects" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <FolderOpen size={18} className={iconClass(isActive)} />
              <span className={textClass(isActive)}>Projects</span>
            </>
          )}
        </NavLink>
        <NavLink to="/skills" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <Zap size={18} className={iconClass(isActive)} />
              <span className={textClass(isActive)}>Skills</span>
            </>
          )}
        </NavLink>
        <NavLink to="/credentials" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <Award size={18} className={iconClass(isActive)} />
              <span className={textClass(isActive)}>Creds</span>
            </>
          )}
        </NavLink>
        <NavLink to="/contact" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <Mail size={18} className={iconClass(isActive)} />
              <span className={textClass(isActive)}>Contact</span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
