import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Credentials from './Credentials';
import Contact from './Contact';

export default function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isScrollingRef = useRef(false);

  // Scroll to section when URL path changes (e.g. from clicking Nav links)
  useEffect(() => {
    const path = location.pathname.substring(1) || 'home';
    const element = document.getElementById(path);
    if (element) {
      isScrollingRef.current = true;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      const timer = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000); // Temporary disable observer to avoid scroll fights
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // Sync URL active path as user scrolls manually
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Active when section occupies middle viewport
      threshold: 0,
    };

    const observerCallback = (entries) => {
      if (isScrollingRef.current) return;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const newPath = id === 'home' ? '/' : `/${id}`;
          if (window.location.pathname !== newPath) {
            navigate(newPath, { replace: true });
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'about', 'projects', 'skills', 'credentials', 'contact'];
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navigate]);

  return (
    <div className="flex flex-col w-full mx-auto" style={{ gap: '100px' }}>
      <section id="home" className="min-h-[90vh] flex flex-col justify-center">
        <Home />
      </section>
      <section id="about" className="min-h-screen pt-24">
        <About />
      </section>
      <section id="projects" className="min-h-screen pt-24">
        <Projects />
      </section>
      <section id="skills" className="min-h-screen pt-24">
        <Skills />
      </section>
      <section id="credentials" className="min-h-screen pt-24">
        <Credentials />
      </section>
      <section id="contact" className="min-h-screen pt-24 pb-12">
        <Contact />
      </section>
    </div>
  );
}
