import React from 'react';
import {
  Mail, MapPin, Send, Bot, Code, Sparkles, ShieldCheck, ArrowRight,
  Lightbulb, Clipboard, Cpu, Eye, Beaker, BookOpen, Briefcase
} from 'lucide-react';

export default function Contact() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 pt-4 animate-[slideUp_0.5s_ease-out_forwards]">

      {/* Header */}
      <div className="animate-[slideUp_0.5s_ease-out_0.1s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-2">Contact · Workflow · Identity</p>
        <h1 className="text-4xl font-bold text-white gold-underline pb-2">Reach Out</h1>
      </div>

      {/* Intro Description */}
      <div className="bg-dark-100 border border-dark-300 rounded-2xl p-6 animate-[slideUp_0.5s_ease-out_0.2s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gray-300 text-sm leading-relaxed text-left">
          I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Whether you need an automated Telegram bot, a production-ready backend service, or integrating AI capabilities into your application, feel free to send a message below.
        </p>
      </div>

      {/* Grid of Contact Info & Form */}
      <section className="relative overflow-hidden rounded-3xl border border-dark-300/80 bg-gradient-to-br from-dark-100 via-dark to-dark-100/90 p-4 sm:p-6 animate-[slideUp_0.5s_ease-out_0.3s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <div className="pointer-events-none absolute -top-10 -left-8 h-48 w-48 rounded-full bg-gold/10 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-12 -right-10 h-56 w-56 rounded-full bg-gold/10 blur-3xl"></div>
        <div className="relative grid gap-5 lg:grid-cols-2">

          {/* Left Column (Info) */}
          <div className="space-y-6 text-left animate-[slideUp_0.5s_ease-out_0.4s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div>
              <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.3em] text-gold/90">Ping · Build · Ship</p>
              <h2 className="text-2xl font-bold leading-tight text-white">Tell me what you want to build.</h2>
              <p className="mt-3 max-w-xl text-xs leading-relaxed text-gray-300">
                If you need a bot, API, dashboard, automation flow, or an AI-assisted tool, send the brief here. I keep the conversation direct, technical, and focused on shipping something useful.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-dark-300 bg-dark-100/70 p-3">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gold/30 bg-dark-200 text-gold">
                  <Bot size={14} />
                </div>
                <p className="text-sm font-semibold text-gray-100 leading-tight">Bots &amp; automation</p>
                <p className="mt-1 text-[10px] leading-relaxed text-gray-400">Telegram, workflow, and utility systems that save time.</p>
              </div>
              <div className="rounded-2xl border border-dark-300 bg-dark-100/70 p-3">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gold/30 bg-dark-200 text-gold">
                  <Code size={14} />
                </div>
                <p className="text-sm font-semibold text-gray-100 leading-tight">Backend builds</p>
                <p className="mt-1 text-[10px] leading-relaxed text-gray-400">APIs, databases, auth, and production-ready server logic.</p>
              </div>
              <div className="rounded-2xl border border-dark-300 bg-dark-100/70 p-3">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gold/30 bg-dark-200 text-gold">
                  <Sparkles size={14} />
                </div>
                <p className="text-sm font-semibold text-gray-100 leading-tight">AI integrations</p>
                <p className="mt-1 text-[10px] leading-relaxed text-gray-400">Practical AI features woven into real products.</p>
              </div>
            </div>

            {/* Quick Stats/Metadata */}
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-dark-300 bg-dark-100/70 p-3">
                <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500">Response</p>
                <p className="mt-1.5 text-xs font-semibold text-gold">Usually within 24-48 hours</p>
              </div>
              <div className="rounded-2xl border border-dark-300 bg-dark-100/70 p-3">
                <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500">Best fit</p>
                <p className="mt-1.5 text-xs font-semibold text-gold">Startups, bots, and backend work</p>
              </div>
              <div className="rounded-2xl border border-dark-300 bg-dark-100/70 p-3">
                <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500">Location</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-gold">
                  <MapPin size={12} /> Hanoi, Vietnam
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (Contact Form) */}
          <div className="rounded-2xl border border-dark-300/90 bg-dark-100/70 p-6 backdrop-blur animate-[slideUp_0.5s_ease-out_0.4s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className="mb-6 flex items-start justify-between">
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">Send a message</p>
                <h3 className="mt-1 text-3xl font-semibold text-white">Contact form</h3>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gold/30 bg-dark-200 text-gold shadow-sm">
                <ShieldCheck size={16} />
              </div>
            </div>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 flex flex-col items-start">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Your Name</span>
                  <input maxLength={80} required className="w-full rounded-2xl border border-dark-300 bg-dark-200 px-4 py-2.5 text-sm text-gray-200 outline-none transition-all placeholder:text-gray-500 focus:border-gold/70 focus:ring-2 focus:ring-gold/20" placeholder="Full name" name="name" />
                </label>
                <label className="space-y-1.5 flex flex-col items-start">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Email Address</span>
                  <input type="email" maxLength={120} required className="w-full rounded-2xl border border-dark-300 bg-dark-200 px-4 py-2.5 text-sm text-gray-200 outline-none transition-all placeholder:text-gray-500 focus:border-gold/70 focus:ring-2 focus:ring-gold/20" placeholder="you@example.com" name="email" />
                </label>
              </div>
              <label className="block space-y-1.5 flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Your Message</span>
                <textarea name="message" required minLength={10} maxLength={2500} rows={4} className="w-full resize-none rounded-2xl border border-dark-300 bg-dark-200 px-4 py-3 text-sm text-gray-200 outline-none transition-all placeholder:text-gray-500 focus:border-gold/70 focus:ring-2 focus:ring-gold/20" placeholder="Describe the project, timeline, and what outcome you want."></textarea>
              </label>
              <button type="submit" className="w-full rounded-2xl bg-gold px-6 py-2.5 text-base font-semibold text-dark transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2 mt-2">
                Send message <ArrowRight size={16} />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Workflow Section */}
      <div className="bg-dark-100 border border-dark-300 rounded-2xl p-6 animate-[slideUp_0.5s_ease-out_0.4s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6 text-left">My Workflow</p>

        {/* Desktop Workflow */}
        <div className="hidden md:flex items-center gap-0 overflow-x-auto pt-3 pb-5">
          {[
            { label: "Idea", icon: <Lightbulb size={18} /> },
            { label: "Plan", icon: <Clipboard size={18} /> },
            { label: "AI Help", icon: <Cpu size={18} /> },
            { label: "Code", icon: <Code size={18} /> },
            { label: "Review", icon: <Eye size={18} /> },
            { label: "Test", icon: <Beaker size={18} /> },
            { label: "Learn", icon: <BookOpen size={18} /> }
          ].map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-2 group overflow-visible">
                <div className="w-12 h-12 rounded-xl bg-dark-200 border border-dark-300 flex items-center justify-center text-lg transition-all group-hover:border-gold/70 group-hover:bg-dark-300 group-hover:shadow-[0_0_18px_rgba(212,166,73,0.45),0_0_36px_rgba(212,166,73,0.18)]">
                  <div className="transition-all group-hover:text-gold group-hover:[filter:drop-shadow(0_0_8px_rgba(212,166,73,0.95))] text-gray-400">
                    {step.icon}
                  </div>
                </div>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest group-hover:text-gold transition-colors">{step.label}</span>
              </div>
              {idx < 6 && <div className="w-6 h-px bg-dark-300 mx-1 shrink-0"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Workflow */}
        <div className="md:hidden">
          <div className="grid grid-cols-3 gap-y-6">
            {[
              { label: "Idea", icon: <Lightbulb size={17} /> },
              { label: "Plan", icon: <Clipboard size={17} /> },
              { label: "AI Help", icon: <Cpu size={17} /> },
              { label: "Code", icon: <Code size={17} /> },
              { label: "Review", icon: <Eye size={17} /> },
              { label: "Test", icon: <Beaker size={17} /> },
              { label: "Learn", icon: <BookOpen size={17} /> }
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                <div className="flex flex-col items-center gap-1.5 group overflow-visible">
                  <div className="w-14 h-14 rounded-xl bg-dark-200 border border-dark-300 flex items-center justify-center text-xl transition-all group-hover:border-gold/70 group-hover:shadow-[0_0_18px_rgba(212,166,73,0.45),0_0_36px_rgba(212,166,73,0.18)] text-gray-400 group-hover:text-gold">
                    {step.icon}
                  </div>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest text-center">{step.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Hit Me Up Section */}
      <div className="bg-dark-100 border border-dark-300 rounded-2xl p-6 animate-[slideUp_0.5s_ease-out_0.5s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-5 text-left">Hit Me Up</p>

        {/* Mobile Socials */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          <a href="lelam7c10tp@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-200 border border-dark-300 text-gray-400 text-sm font-medium transition-all duration-200 justify-center hover:border-red-500/70 hover:text-red-400 hover:shadow-[0_0_18px_rgba(239,68,68,0.45),0_0_34px_rgba(239,68,68,0.18)]">
            <Mail size={15} /> Mail
          </a>
          <a href="https://github.com/IchiLamlb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-200 border border-dark-300 text-gray-400 text-sm font-medium transition-all duration-200 justify-center hover:border-white/40 hover:text-white hover:shadow-[0_0_18px_rgba(255,255,255,0.28),0_0_34px_rgba(255,255,255,0.1)]">
            <Code size={15} /> GitHub
          </a>
          <a href="https://github.com/IchiLamlb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-200 border border-dark-300 text-gray-400 text-sm font-medium transition-all duration-200 justify-center hover:border-blue-500/70 hover:text-blue-400 hover:shadow-[0_0_18px_rgba(59,130,246,0.42),0_0_34px_rgba(59,130,246,0.18)]">
            <Briefcase size={15} /> LinkedIn
          </a>
          <a href="https://t.me/lamlb24112411" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-200 border border-dark-300 text-gray-400 text-sm font-medium transition-all duration-200 justify-center hover:border-sky-500/70 hover:text-sky-400 hover:shadow-[0_0_18px_rgba(14,165,233,0.42),0_0_34px_rgba(14,165,233,0.18)]">
            <Send size={15} /> Telegram
          </a>
        </div>

        {/* Desktop Socials */}
        <div className="hidden md:flex flex-wrap gap-3">
          <a href="mailto:your-email@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-dark-200 border border-dark-300 text-gray-400 text-sm font-medium transition-all duration-200 group hover:border-red-500/70 hover:text-red-400 hover:shadow-[0_0_18px_rgba(239,68,68,0.45),0_0_34px_rgba(239,68,68,0.18)]">
            <Mail size={15} /> Mail
            <ArrowRight size={12} className="opacity-50" />
          </a>
          <a href="https://github.com/IchiLamlb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-dark-200 border border-dark-300 text-gray-400 text-sm font-medium transition-all duration-200 group hover:border-white/40 hover:text-white hover:shadow-[0_0_18px_rgba(255,255,255,0.28),0_0_34px_rgba(255,255,255,0.1)]">
            <Code size={15} /> GitHub
            <ArrowRight size={12} className="opacity-50" />
          </a>
          <a href="https://github.com/IchiLamlb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-dark-200 border border-dark-300 text-gray-400 text-sm font-medium transition-all duration-200 group hover:border-blue-500/70 hover:text-blue-400 hover:shadow-[0_0_18px_rgba(59,130,246,0.42),0_0_34px_rgba(59,130,246,0.18)]">
            <Briefcase size={15} /> LinkedIn
            <ArrowRight size={12} className="opacity-50" />
          </a>
          <a href="https://t.me/lamlb2411" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-dark-200 border border-dark-300 text-gray-400 text-sm font-medium transition-all duration-200 group hover:border-sky-500/70 hover:text-sky-400 hover:shadow-[0_0_18px_rgba(14,165,233,0.42),0_0_34px_rgba(14,165,233,0.18)]">
            <Send size={15} /> Telegram
            <ArrowRight size={12} className="opacity-50" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 animate-[slideUp_0.5s_ease-out_0.6s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold text-xs font-mono tracking-widest">© 2026 Le Bao Lam</p>
      </div>

    </div>
  );
}
