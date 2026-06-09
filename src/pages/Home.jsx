import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Download, ChevronLeft, ChevronRight, Code, ExternalLink, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileSidebar from '../components/ProfileSidebar';

const VISITOR_API_URL = 'https://script.google.com/macros/s/AKfycbwRMcUB-9CmV4esuqfXcbmcQeh08CByTV3u4YExZwt6IlaIheG6-t1uBHt2dTTgTANF5A/exec'; // Paste your Google Apps Script Web App URL here

const guessCountryFromTimezone = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return 'Others';
    if (tz.includes('Ho_Chi_Minh') || tz.includes('Saigon') || tz.includes('Hanoi')) return 'Vietnam';
    if (tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('Delhi') || tz.includes('Asia/Colombo')) return 'India';
    if (tz.includes('Singapore')) return 'Singapore';
    if (tz.includes('America') || tz.includes('US/')) return 'United States';
    if (tz.includes('London') || tz.includes('Europe/London') || tz.includes('GB')) return 'United Kingdom';
    if (tz.includes('Tokyo') || tz.includes('Japan')) return 'Japan';
    if (tz.includes('Seoul') || tz.includes('Korea')) return 'South Korea';
  } catch (e) {
    console.error(e);
  }
  return 'Others';
};

const getCountryWithFlag = (country) => {
  const flags = {
    'Vietnam': 'Vietnam 🇻🇳',
    'United States': 'United States 🇺🇸',
    'India': 'India 🇮🇳',
    'Singapore': 'Singapore 🇸🇬',
    'Others': 'Others 🌐',
    'United Kingdom': 'United Kingdom 🇬🇧',
    'Japan': 'Japan 🇯🇵',
    'South Korea': 'South Korea 🇰🇷'
  };
  return flags[country] || `${country} 🏳️`;
};

const getCountryCode = (country) => {
  const codes = {
    'Vietnam': 'vn',
    'United States': 'us',
    'India': 'in',
    'Singapore': 'sg',
    'Philippines': 'ph',
    'Pakistan': 'pk',
    'United Kingdom': 'gb',
    'Japan': 'jp',
    'South Korea': 'kr'
  };
  return codes[country] || null;
};

const countryGPS = {
  'Vietnam': [14.058324, 108.277199],
  'Viet Nam': [14.058324, 108.277199],
  'United States': [37.09024, -95.712891],
  'US': [37.09024, -95.712891],
  'India': [20.593684, 78.96288],
  'Philippines': [12.879721, 121.774017],
  'Pakistan': [30.375321, 69.345116],
  'Japan': [36.204824, 138.252924],
  'United Kingdom': [55.378051, -3.435973],
  'Germany': [51.165691, 10.451526],
  'France': [46.227638, 2.213749],
  'Canada': [56.130366, -106.346771],
  'Australia': [-25.274398, 133.775136],
  'Brazil': [-14.235004, -51.92528],
  'Singapore': [1.352083, 103.819836],
  'Indonesia': [-0.789275, 113.921327],
  'Thailand': [15.870032, 100.992541],
  'Malaysia': [4.210484, 101.975766],
  'China': [35.86166, 104.195397],
  'South Korea': [35.907757, 127.766922],
  'Russia': [61.52401, 105.318756]
};

export default function Home() {
  const [showGeography, setShowGeography] = useState(false);
  const [visitorLoc, setVisitorLoc] = useState(null);
  const [loadingLoc, setLoadingLoc] = useState(false);

  const [totalViews, setTotalViews] = useState(0);
  const [trafficBreakdown, setTrafficBreakdown] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);

  const [customGPS, setCustomGPS] = useState({});
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersGroupRef = useRef(null);

  useEffect(() => {
    if (trafficBreakdown.length === 0) return;

    const fetchMissingGPS = async () => {
      const missingCountries = trafficBreakdown
        .map(item => item.country)
        .filter(name => name !== 'Others' && !countryGPS[name] && !customGPS[name]);

      if (missingCountries.length === 0) return;

      const newGPS = { ...customGPS };
      let updated = false;

      for (const country of missingCountries) {
        try {
          let res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true&fields=latlng`);
          if (!res.ok) {
            res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fields=latlng`);
          }
          if (res.ok) {
            const data = await res.json();
            if (data && data[0] && data[0].latlng) {
              newGPS[country] = data[0].latlng;
              updated = true;
            }
          }
        } catch (error) {
          console.error(`Failed to fetch GPS for ${country}:`, error);
        }
      }

      if (updated) {
        setCustomGPS(newGPS);
      }
    };

    fetchMissingGPS();
  }, [trafficBreakdown]);

  useEffect(() => {
    if (!showGeography || !mapRef.current) return;

    let map = leafletMap.current;

    const initMap = () => {
      if (!mapRef.current) return;

      const L = window.L;

      if (!map) {
        map = L.map(mapRef.current, {
          center: [25, 0],
          zoom: 1.2,
          minZoom: 1.1,
          maxZoom: 8,
          zoomControl: false,
          attributionControl: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 20
        }).addTo(map);

        L.control.zoom({
          position: 'bottomright'
        }).addTo(map);

        leafletMap.current = map;
        markersGroupRef.current = L.layerGroup().addTo(map);
      }

      if (markersGroupRef.current) {
        markersGroupRef.current.clearLayers();
      }

      const sorted = [...trafficBreakdown].sort((a, b) => b.count - a.count);
      const top4 = sorted.slice(0, 4);

      top4.forEach((item, index) => {
        const gps = countryGPS[item.country] || customGPS[item.country];
        if (!gps) return;

        const pulsingIcon = L.divIcon({
          className: 'leaflet-custom-marker',
          html: `
            <div class="map-dot">
              <div class="map-tooltip">
                <span style="font-weight: 600; display: block;">${item.country}</span>
                <span style="color: #bf5af2; display: block; margin-top: 2px; font-size: 9px;">
                  #${index + 1} • ${item.count.toLocaleString()} visits
                </span>
              </div>
            </div>
          `,
          iconSize: [10, 10],
          iconAnchor: [5, 5]
        });

        L.marker(gps, { icon: pulsingIcon }).addTo(markersGroupRef.current);
      });
    };

    if (!window.L) {
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (!document.getElementById('leaflet-js')) {
        const script = document.createElement('script');
        script.id = 'leaflet-js';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = initMap;
        document.body.appendChild(script);
      }
    } else {
      const timer = setTimeout(initMap, 100);
      return () => clearTimeout(timer);
    }

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
        markersGroupRef.current = null;
      }
    };
  }, [showGeography, trafficBreakdown, customGPS]);

  useEffect(() => {
    if (!VISITOR_API_URL) return;

    const hasVisited = sessionStorage.getItem('portfolio_visited');
    setLoadingStats(true);

    const fetchLocationAndLog = async () => {
      try {
        let countryName = guessCountryFromTimezone();

        // If first visit in this session, detect country and log it
        if (!hasVisited) {
          const locRes = await fetch('https://ipapi.co/json/');
          if (locRes.ok) {
            const locData = await locRes.json();
            if (locData.country_name) {
              countryName = locData.country_name;
              setVisitorLoc(locData);
            }
          }

          const logRes = await fetch(`${VISITOR_API_URL}?action=log&country=${encodeURIComponent(countryName)}`);
          if (logRes.ok) {
            const statsData = await logRes.json();
            if (statsData.total && statsData.breakdown) {
              setTotalViews(statsData.total);
              setTrafficBreakdown(statsData.breakdown);
              sessionStorage.setItem('portfolio_visited', 'true');
            }
          }
        } else {
          // If already logged, just fetch latest counts
          const statsRes = await fetch(`${VISITOR_API_URL}?action=get`);
          if (statsRes.ok) {
            const statsData = await statsRes.json();
            if (statsData.total && statsData.breakdown) {
              setTotalViews(statsData.total);
              setTrafficBreakdown(statsData.breakdown);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching visitor statistics:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchLocationAndLog();
  }, []);

  const handleOpenGeography = () => {
    setShowGeography(true);
    if (!visitorLoc) {
      setLoadingLoc(true);
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          setVisitorLoc(data);
          setLoadingLoc(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingLoc(false);
        });
    }
  };

  return (
    <div className="relative z-10 flex flex-col gap-16">
      {/* Mobile Avatar Card */}
      <div className="lg:hidden mb-6 mt-10 animate-[slideDown_0.5s_ease-out_forwards]">
        <ProfileSidebar isMobile={true} />
      </div>

      {/* Hero Section */}
      <div className="flex flex-col justify-center min-h-[40vh] gap-7 pt-4">
        <p className="text-gold font-mono text-sm tracking-[0.2em] uppercase animate-[slideUp_0.5s_ease-out_0.1s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          Hello! I'm
        </p>
        <div className="animate-[slideUp_0.5s_ease-out_0.2s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">Le Bao Lam</h1>
          <h2 className="text-xl lg:text-2xl text-gray-400 mt-2 font-light">
            A passionate <span className="text-gold font-medium">Software</span> &amp; <span className="text-gold font-medium">Backend</span> Developer
          </h2>
        </div>
        <p className="text-gray-400 text-base lg:text-lg max-w-xl leading-relaxed animate-[slideUp_0.5s_ease-out_0.3s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          Building intelligent systems at the intersection of <span className="text-white font-medium">full-stack development</span> and <span className="text-white font-medium">automation</span>.
        </p>
        <div className="animate-[slideUp_0.5s_ease-out_0.4s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
          <a className="inline-flex items-center gap-2 px-6 py-3 border border-dark-300 text-gray-300 rounded-xl hover:border-gold hover:text-gold transition-colors" href="/resume">
            Resume <Download size={16} />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent animate-[scaleX_0.5s_ease-out_0.5s_forwards]" style={{ opacity: 0, transform: 'scaleX(0)' }}></div>

      {/* Projects Section */}
      <div className="animate-[slideUp_0.5s_ease-out_0.6s_forwards]" style={{ opacity: 0, transform: 'translateY(30px)' }}>
        <div className="flex flex-col gap-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-2">Featured Work</p>
              <h2 className="text-3xl font-bold text-white gold-underline pb-2">Selected Projects</h2>
            </div>
            <div className="hidden md:flex gap-2">
              <button className="w-9 h-9 rounded-xl bg-dark-100 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/50 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 rounded-xl bg-dark-100 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/50 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Desktop Projects Grid */}
          <div className="hidden md:grid grid-cols-3 gap-4 items-stretch">
            {/* Project 1 */}
            <div className="relative rounded-2xl overflow-hidden flex flex-col border transition-all duration-500 cursor-pointer border-dark-300 hover:border-gold/30 hover:opacity-60" style={{ minHeight: '360px' }}>
              <div className="absolute inset-0">
                <div className="relative block overflow-hidden h-full w-full">
                  <img src="/assets/project-1.png" alt="Vaani" className="absolute inset-0 h-full w-full transition-opacity duration-500 opacity-25 object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/70 to-transparent"></div>
              </div>
              <div className="relative z-10 flex flex-col justify-end h-full p-5 gap-3">
                <div className="absolute top-4 left-5 right-5 flex justify-between">
                  <span className="text-[10px] font-mono text-gray-600">2025</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                    <span className="text-[10px] text-gray-500">WIP</span>
                  </div>
                </div>
                <div className="absolute top-8 right-5 text-[64px] font-bold text-white/[0.03] leading-none select-none">01</div>
                <h3 className="font-bold text-white leading-tight text-base">Vaani</h3>
                <p className="text-gray-400 leading-relaxed text-xs line-clamp-2">A Voice based Assistant for Illiterate users.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Python</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Flask</span>
                </div>
              </div>
            </div>

            {/* Project 2 (Featured/Gold Border) */}
            <div className="relative rounded-2xl overflow-hidden flex flex-col border transition-all duration-500 cursor-pointer border-gold shadow-lg shadow-gold/10" style={{ minHeight: '420px' }}>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/40 via-gold to-gold/40 z-10"></div>
              <div className="absolute inset-0">
                <div className="relative block overflow-hidden h-full w-full">
                  <img src="/assets/project-2.png" alt="Spotigram" className="absolute inset-0 h-full w-full transition-opacity duration-500 opacity-25 object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/70 to-transparent"></div>
              </div>
              <div className="relative z-10 flex flex-col justify-end h-full p-5 gap-3">
                <div className="absolute top-4 left-5 right-5 flex justify-between">
                  <span className="text-[10px] font-mono text-gray-600">2026</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] text-gray-500">Live</span>
                  </div>
                </div>
                <div className="absolute top-8 right-5 text-[64px] font-bold text-white/[0.03] leading-none select-none">02</div>
                <h3 className="font-bold text-white leading-tight text-xl">Spotigram</h3>
                <p className="text-gray-400 leading-relaxed text-sm">A high-speed, asynchronous Telegram bot that acts as a direct bridge between Spotify and Telegram. Features a custom concurrent web scraper, MongoDB rate limiting, and a sleek terminal-style UI.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Python</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Pyrogram</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">MongoDB</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">BeautifulSoup</span>
                </div>
                <div className="flex gap-2 group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ opacity: 1, transform: 'translateY(0)' }}>
                  <a href="https://github.com/ankittroy-21/Spotigram" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-dark-200/90 border border-dark-300 rounded-lg text-xs text-gray-300 hover:text-gold hover:border-gold/50 transition-colors">
                    <Code size={12} />Code
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="relative rounded-2xl overflow-hidden flex flex-col border transition-all duration-500 cursor-pointer border-dark-300 hover:border-gold/30 hover:opacity-60" style={{ minHeight: '360px' }}>
              <div className="absolute inset-0">
                <div className="relative block overflow-hidden h-full w-full">
                  <img src="/assets/project-3.png" alt="BBD Papers" className="absolute inset-0 h-full w-full transition-opacity duration-500 opacity-25 object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/70 to-transparent"></div>
              </div>
              <div className="relative z-10 flex flex-col justify-end h-full p-5 gap-3">
                <div className="absolute top-4 left-5 right-5 flex justify-between">
                  <span className="text-[10px] font-mono text-gray-600">2025</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] text-gray-500">Live</span>
                  </div>
                </div>
                <div className="absolute top-8 right-5 text-[64px] font-bold text-white/[0.03] leading-none select-none">03</div>
                <h3 className="font-bold text-white leading-tight text-base">BBD Papers</h3>
                <p className="text-gray-400 leading-relaxed text-xs line-clamp-2">A full-stack educational platform providing BBD University students with easy access to previous year question papers (PYQs) and study notes.</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">Next.js</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-dark-300/80 border border-dark-300 text-gold/80 rounded-full">TypeScript</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center gap-2">
            <button className="rounded-full transition-all duration-300 w-1.5 h-1.5 bg-dark-300 hover:bg-gold/40"></button>
            <button className="rounded-full transition-all duration-300 w-6 h-1.5 bg-gold"></button>
            <button className="rounded-full transition-all duration-300 w-1.5 h-1.5 bg-dark-300 hover:bg-gold/40"></button>
          </div>

          <div className="flex justify-center">
            <Link className="flex items-center gap-2 px-6 py-2.5 border border-dark-300 text-gray-400 text-sm rounded-xl hover:border-gold hover:text-gold transition-colors" to="/projects">
              View All Projects <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="animate-[slideUp_0.5s_ease-out_0.7s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-4">By The Numbers</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="bg-dark-100 border border-dark-300 rounded-2xl p-5 flex flex-col items-center justify-center gap-1">
            <span className="text-3xl font-bold text-gold">10+</span>
            <span className="text-xs text-gray-500 text-center">Projects Built</span>
          </div>
          <div className="bg-dark-100 border border-dark-300 rounded-2xl p-5 flex flex-col items-center justify-center gap-1">
            <span className="text-3xl font-bold text-gold">20+</span>
            <span className="text-xs text-gray-500 text-center">GitHub Repos</span>
          </div>
          <div className="bg-dark-100 border border-dark-300 rounded-2xl p-5 flex flex-col items-center justify-center gap-1">
            <span className="text-3xl font-bold text-gold">5+</span>
            <span className="text-xs text-gray-500 text-center">Certifications</span>
          </div>
          <div className="bg-dark-100 border border-dark-300 rounded-2xl p-5 flex flex-col items-center justify-center gap-1">
            <span className="text-3xl font-bold text-gold">15+</span>
            <span className="text-xs text-gray-500 text-center">Technologies</span>
          </div>
        </div>
      </div>

      {/* Visitors Section */}
      <div className="flex justify-start">
        <div className="relative inline-flex self-start animate-[slideUp_0.5s_ease-out_0.8s_forwards]" style={{ opacity: 0, transform: 'translateY(10px)' }}>
          <button
            type="button"
            onClick={handleOpenGeography}
            className="relative inline-flex items-center gap-2 rounded-full border border-gold/25 bg-black/70 px-3 py-2 text-xs text-gray-200 shadow-[0_0_30px_rgba(245,166,35,0.12)] backdrop-blur-md transition-colors duration-300 hover:border-gold/50 cursor-pointer select-none group"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/10 text-gold">
              <Users size={14} />
            </span>
            <div className="flex flex-col leading-tight text-left">
              <span className="uppercase tracking-[0.18em] text-[10px] text-gray-400">Visitors</span>
              <span className="text-[10px] tracking-[0.18em] text-gray-500 sm:hidden">Tap for geography</span>
              <span className="hidden text-[10px] tracking-[0.18em] text-gray-500 sm:inline">Click for geography</span>
            </div>

            {/* Tooltip */}
            <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-max max-w-[220px] rounded-xl border border-gold/20 bg-[#101010] px-3 py-2 text-[11px] text-gray-300 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ transform: 'translateY(6px)' }}>
              <div className="uppercase tracking-[0.18em] text-[10px] text-gray-500">Total visitors</div>
              <div className="mt-1 font-mono text-sm text-white">{totalViews.toLocaleString()}</div>
            </div>
          </button>
        </div>
      </div>

      {/* Geography Modal */}
      {showGeography && (
        <div
          onClick={() => setShowGeography(false)}
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="border border-dark-300 rounded-3xl p-6 w-full max-w-4xl shadow-2xl relative text-left overflow-y-auto max-h-[95vh]"
            style={{ backgroundColor: '#000000', animation: 'zoomIn 0.3s ease-out' }}
          >

            {/* Close Button */}
            <button
              onClick={() => setShowGeography(false)}
              className="absolute w-9 h-9 rounded-full bg-dark-200 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold/50 transition-colors cursor-pointer"
              style={{ right: '24px', top: '24px', zIndex: 10 }}
            >
              ✕
            </button>

            {/* Header */}
            <div className="mb-6">
              <p className="text-gold font-mono text-xs tracking-[0.25em] uppercase mb-1">Visitor Geography</p>
              <h3 className="text-3xl font-bold text-white">Top countries</h3>
            </div>

            {/* 2-Column Grid */}
            <div className="geo-grid">

              {/* Left Column: Total Visitors & World Map */}
              <div className="bg-[#141414] border border-dark-300 rounded-2xl p-5 flex flex-col justify-between gap-4">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Total Visitors</p>
                  <h4 className="text-5xl font-extrabold text-white mt-2 mb-2 font-mono">{totalViews.toLocaleString()}</h4>
                </div>

                <div className="bg-dark-200/50 border border-dark-300/60 rounded-xl p-3 flex flex-col flex-1" style={{ minHeight: '260px' }}>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-mono mb-2">World Map</p>
                  <div className="map-container" style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid rgba(58, 58, 58, 0.3)' }}>
                    <div ref={mapRef} style={{ width: '100%', height: '100%', background: '#0a0a0a' }} />
                  </div>
                </div>
              </div>

              {/* Right Column: Distribution List */}
              <div className="bg-[#141414] border border-dark-300 rounded-2xl p-5 flex flex-col">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Distribution</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5 mb-4 font-mono">Top 4 + other</p>

                <div className="flex flex-col gap-3 overflow-y-auto max-h-[360px] pr-1">
                  {loadingStats ? (
                    <div className="flex items-center justify-center py-20 text-sm text-gray-400 font-mono gap-2">
                      <span className="w-5 h-5 rounded-full border-2 border-t-gold border-dark-300 animate-spin"></span>
                      Loading statistics...
                    </div>
                  ) : (
                    (() => {
                      const sorted = [...trafficBreakdown].sort((a, b) => b.count - a.count);
                      const top4 = sorted.slice(0, 4);
                      const othersCount = sorted.slice(4).reduce((sum, item) => sum + item.count, 0);
                      if (othersCount > 0) {
                        top4.push({ country: 'Others', count: othersCount });
                      }

                      const barGradients = [
                        'linear-gradient(to right, #f59e0b, #10b981)', // Index 0 (amber to emerald)
                        'linear-gradient(to right, #f43f5e, #6366f1)', // Index 1 (rose to indigo)
                        'linear-gradient(to right, #3b82f6, #14b8a6)', // Index 2 (blue to teal)
                        'linear-gradient(to right, #059669, #34d399)', // Index 3 (emerald)
                        'linear-gradient(to right, #475569, #94a3b8)'  // Index 4 (slate)
                      ];

                      return top4.map((item, index) => {
                        const percentage = totalViews > 0 ? ((item.count / totalViews) * 100).toFixed(1) : 0;
                        const code = getCountryCode(item.country);
                        const gradientStyle = barGradients[index] || barGradients[4];

                        return (
                          <div
                            key={index}
                            className="bg-[#1b1b1b] border border-dark-300/80 rounded-xl p-3 flex items-center justify-between gap-4 transition-all hover:border-dark-300"
                          >
                            {/* Left: Flag & Details */}
                            <div className="flex items-center gap-3.5 flex-1 min-w-0">
                              <div className="rounded overflow-hidden border border-dark-300/40 bg-dark-200 flex items-center justify-center shrink-0" style={{ width: '48px', height: '32px' }}>
                                {code ? (
                                  <img
                                    src={`https://flagcdn.com/h40/${code}.png`}
                                    alt={item.country}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  />
                                ) : (
                                  <span className="text-lg">🌐</span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col">
                                <span className="text-white text-sm font-semibold truncate leading-tight">{item.country === 'Others' ? 'Other' : item.country}</span>
                                <span className="text-gray-500 text-[11px] font-mono mt-0.5">{item.count.toLocaleString()} visitors</span>

                                {/* Progress Bar */}
                                <div className="h-1.5 w-full max-w-[200px] bg-dark-200 border border-dark-300/30 rounded-full overflow-hidden mt-1.5">
                                  <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{ width: `${percentage}%`, backgroundImage: gradientStyle }}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            {/* Right: Percentage */}
                            <div className="text-white font-bold text-sm tracking-wide shrink-0 font-mono">
                              {percentage}%
                            </div>
                          </div>
                        );
                      });
                    })()
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      <style>{`
        .geo-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .geo-grid {
            grid-template-columns: 1fr 1.25fr;
          }
        }
        .map-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 0.5rem;
          overflow: hidden;
          border: 1px solid rgba(58, 58, 58, 0.3);
          position: relative;
          min-height: 220px;
        }
        .map-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #ff3b30;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 0 10px rgba(255, 59, 48, 0.9), 0 0 20px rgba(255, 59, 48, 0.5);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .map-dot:hover {
          transform: scale(1.35);
          background-color: #ff453a;
          box-shadow: 0 0 14px rgba(255, 59, 48, 1), 0 0 28px rgba(255, 59, 48, 0.7);
        }
        .map-dot::after {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border-radius: 50%;
          border: 2px solid #ff3b30;
          opacity: 0;
          animation: mapPulse 2s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
        }
        @keyframes mapPulse {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }
        .map-tooltip {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%) translateY(5px);
          background-color: #0f0f0f;
          border: 1px solid rgba(58, 58, 58, 0.8);
          color: #fff;
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 10px;
          font-family: JetBrains Mono, monospace;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.7);
          z-index: 20;
        }
        .map-dot:hover .map-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .leaflet-custom-marker {
          background: transparent !important;
          border: none !important;
          overflow: visible !important;
        }
        .leaflet-bar {
          border: 1px solid rgba(58, 58, 58, 0.6) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5) !important;
        }
        .leaflet-bar a {
          background-color: #111111 !important;
          color: #888888 !important;
          border-bottom: 1px solid rgba(58, 58, 58, 0.4) !important;
          transition: all 0.2s ease !important;
        }
        .leaflet-bar a:hover {
          background-color: #bf5af2 !important;
          color: #ffffff !important;
        }
        @keyframes slideDown {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleX {
          to { opacity: 1; transform: scaleX(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
