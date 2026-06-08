import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';

const githubTheme = {
  light: ['#1e1e1e', '#bf5af222', '#bf5af255', '#bf5af299', '#bf5af2'],
  dark: ['#1e1e1e', '#bf5af222', '#bf5af255', '#bf5af299', '#bf5af2'],
};

export default function About() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 pt-4 animate-[slideUp_0.5s_ease-out_forwards]">
      <div className="animate-[slideUp_0.5s_ease-out_0.1s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-2">Who I Am</p>
        <h1 className="text-4xl font-bold text-white gold-underline pb-2">About Me</h1>
      </div>

      <div className="bg-dark-100 border border-dark-300 rounded-2xl p-6 flex flex-col gap-4 animate-[slideUp_0.5s_ease-out_0.2s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        {/* The original site has an API that loads the about text, here is the skeleton from the initial render, but we can also put static text if we wanted. I'll stick to the exact HTML structure for now. */}
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-dark-200 via-dark-300 to-dark-200 bg-[length:200%_100%] rounded-lg animate-pulse" style={{ width: '100%', height: '1rem' }}></div>
          </div>
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-dark-200 via-dark-300 to-dark-200 bg-[length:200%_100%] rounded-lg animate-pulse" style={{ width: '100%', height: '1rem' }}></div>
          </div>
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-dark-200 via-dark-300 to-dark-200 bg-[length:200%_100%] rounded-lg animate-pulse" style={{ width: '80%', height: '1rem' }}></div>
          </div>
        </div>
      </div>

      <div className="animate-[slideUp_0.5s_ease-out_0.3s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-4">Work Experience</p>
        <div className="bg-dark-100 border border-dark-300 rounded-2xl p-6 relative">
          <div className="flex flex-col">
            <div className="mb-6 pb-6 flex gap-4 items-start">
              <div className="w-6 flex justify-center">
                <div className="w-3 h-3 rounded-full bg-gold border border-dark-300 relative z-20"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">Backend Developer</h3>
                <p className="text-gray-400 text-xs mt-0.5">SafeGate</p>
                <p className="text-gold text-sm mt-1">08/2025 – Present</p>
                <p className="text-gray-400 text-sm mt-2">Designed and optimized backend APIs, resolved system performance bottlenecks, and participated in Agile sprint planning.</p>
              </div>
            </div>
            <div className="mb-0 pb-1 flex gap-4 items-start">
              <div className="w-6 flex justify-center">
                <div className="w-3 h-3 rounded-full bg-gold border border-dark-300 relative z-20"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">Backend Intern</h3>
                <p className="text-gray-400 text-xs mt-0.5">Viettel Network</p>
                <p className="text-gold text-sm mt-1">07/2024 - 10/2024</p>
                <p className="text-gray-400 text-sm mt-2">Built custom CMS solutions, integrated payment gateways, and automated backend data pipelines for small business clients.</p>
              </div>
            </div>
          </div>
          <div className="absolute left-9 top-6 bottom-6 w-px bg-dark-300/60 pointer-events-none z-0"></div>
        </div>
      </div>

      <div className="animate-[slideUp_0.5s_ease-out_0.4s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-4">Education</p>
        <div className="bg-dark-100 border border-dark-300 rounded-2xl p-6 relative">
          <div className="flex flex-col">
            <div className="mb-6 pb-6 flex gap-4 items-start">
              <div className="w-6 flex justify-center">
                <div className="w-3 h-3 rounded-full bg-gold border border-dark-300 relative z-20"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">Hanoi University of Science and Technology (HUST)</h3>
                <p className="text-gold text-sm mt-1">2021 – 2026</p>
                <p className="text-gray-400 text-sm mt-2">I graduated with an Excellent Degree in Computer Science & Engineering from this institution.</p>
              </div>
            </div>
            <div className="mb-0 pb-1 flex gap-4 items-start">
              <div className="w-6 flex justify-center">
                <div className="w-3 h-3 rounded-full bg-gold border border-dark-300 relative z-20"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">Tran Phu High school for the gifted (Hai Phong)</h3>
                <p className="text-gold text-sm mt-1">2018 – 2021</p>
                <p className="text-gray-400 text-sm mt-2">I was a Computer Science specialist student at Tran Phu Gifted High School.</p>
              </div>
            </div>
          </div>
          <div className="absolute left-9 top-6 bottom-6 w-px bg-dark-300/60 pointer-events-none z-0"></div>
        </div>
      </div>

      <div className="animate-[slideUp_0.5s_ease-out_0.5s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-4">By The Numbers</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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

      <div className="animate-[slideUp_0.5s_ease-out_0.6s_forwards]" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        <p className="text-gold font-mono text-xs tracking-[0.2em] uppercase mb-4">GitHub Contributions</p>
        <div className="bg-dark-100 border border-dark-300 rounded-2xl p-6 overflow-x-auto">
          <div className="p-4 rounded-xl bg-dark-100">
            <div className="overflow-x-auto">
              <div className="rounded-xl border border-dark-300 bg-dark-200/70 p-6 flex justify-center overflow-x-auto w-full">
                <GitHubCalendar
                  username="IchiLamlb"
                  theme={githubTheme}
                  colorScheme="dark"
                  labels={{
                    totalCount: '{{count}} contributions in the last year',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
