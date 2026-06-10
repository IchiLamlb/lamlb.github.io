import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon } from 'lucide-react';

export default function TerminalModal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    {
      type: 'output',
      content: (
        <div className="text-gray-400 font-mono text-xs select-none">
          <p className="text-gold font-bold text-sm mb-1">LE BAO LAM (LAMLB) PORTFOLIO TERMINAL [Version 1.0.0]</p>
          <p className="mb-2">(c) 2026 Le Bao Lam. All rights reserved.</p>
          <p className="text-purple-400 mb-2">Welcome! Type <span className="text-gold font-bold">help</span> to view all available commands.</p>
          <p className="text-[#bf5af2]/60 mb-2">You can also try <span className="text-[#bf5af2] font-bold">ls</span> and <span className="text-[#bf5af2] font-bold">cat &lt;filename&gt;</span> to browse directory files.</p>
          <p className="border-b border-[#bf5af2]/20 pb-2 mb-2"></p>
        </div>
      )
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  // Auto-focus input when terminal opens or is clicked
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Autoscroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmedCmd = inputVal.trim();
      if (trimmedCmd) {
        // Add to history list
        setCommandHistory((prev) => [...prev, trimmedCmd]);
      }
      setHistoryIndex(-1);
      executeCommand(trimmedCmd);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInputVal(commandHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? -1 : historyIndex + 1;
      if (newIndex >= commandHistory.length || newIndex === -1) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(newIndex);
        setInputVal(commandHistory[newIndex]);
      }
    }
  };

  const executeCommand = (cmdText) => {
    const parts = cmdText.split(' ').filter(Boolean);
    if (parts.length === 0) {
      setHistory((prev) => [
        ...prev,
        { type: 'command', text: '' }
      ]);
      return;
    }

    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Command input log line
    const newLogs = [...history, { type: 'command', text: cmdText }];

    let outputContent = null;

    switch (command) {
      case 'help':
        outputContent = (
          <div className="space-y-1 text-gray-400 font-mono text-xs">
            <p className="text-gold font-bold mb-1">Available commands:</p>
            <div className="grid grid-cols-[120px_1fr] gap-x-4">
              <div><span className="text-[#bf5af2] font-semibold">about</span></div>
              <div>Display biography/about me.</div>

              <div><span className="text-[#bf5af2] font-semibold">skills</span></div>
              <div>List technical stack & skills.</div>

              <div><span className="text-[#bf5af2] font-semibold">projects</span></div>
              <div>List selected works and links.</div>

              <div><span className="text-[#bf5af2] font-semibold">credentials</span></div>
              <div>Show certifications and achievements.</div>

              <div><span className="text-[#bf5af2] font-semibold">contact</span></div>
              <div>Show contact information (Email, Phone, Telegram).</div>

              <div><span className="text-[#bf5af2] font-semibold">socials</span></div>
              <div>Show social media profiles.</div>

              <div><span className="text-[#bf5af2] font-semibold">resume</span></div>
              <div>Open CV/resume PDF in a new tab.</div>

              <div><span className="text-[#bf5af2] font-semibold">ls</span></div>
              <div>List files in the virtual directory.</div>

              <div><span className="text-[#bf5af2] font-semibold">cat &lt;file&gt;</span></div>
              <div>Read a text file (e.g., <span className="text-gray-300">cat about.txt</span>).</div>

              <div><span className="text-[#bf5af2] font-semibold">clear</span></div>
              <div>Clear the terminal screen.</div>

              <div><span className="text-[#bf5af2] font-semibold">exit / close</span></div>
              <div>Close the terminal window.</div>
            </div>
          </div>
        );
        break;

      case 'about':
        outputContent = (
          <div className="text-gray-300 font-mono text-xs space-y-2">
            <p className="text-gold font-bold text-sm">LÊ BẢO LÂM - Software Developer</p>
            <p className="leading-relaxed max-w-2xl text-gray-400">
              A passionate software developer specializing in backend architecture, automation, and building high-performance systems. Currently based in Hanoi, Vietnam, I strive to solve complex engineering challenges with clean, optimal, and scalable code.
            </p>
            <div className="grid grid-cols-[80px_1fr] gap-x-2 text-gray-500 text-[11px] pt-1">
              <div>Role:</div><div className="text-gray-300">Software Developer / Backend Architect</div>
              <div>Location:</div><div className="text-gray-300">Hanoi, Vietnam</div>
              <div>Birthday:</div><div className="text-gray-300">24-11-2003</div>
            </div>
          </div>
        );
        break;

      case 'skills':
        outputContent = (
          <div className="text-gray-300 font-mono text-xs space-y-2">
            <p className="text-gold font-bold mb-1">TECHNICAL SKILLS</p>
            <div className="space-y-1 text-gray-400">
              <p><span className="text-gray-200 font-bold w-32 inline-block">Backend:</span>Java, C, Node.js, Telethon</p>
              <p><span className="text-gray-200 font-bold w-32 inline-block">Frontend:</span>HTML, CSS, JavaScript, TypeScript, TailwindCSS</p>
              <p><span className="text-gray-200 font-bold w-32 inline-block">Database/Cloud:</span>PostgreSQL, MySQL, MongoDB, Docker, Google Cloud</p>
              <p><span className="text-gray-200 font-bold w-32 inline-block">DevOps:</span>Git, Docker, VS Code</p>
              <p><span className="text-gray-200 font-bold w-32 inline-block">AI & ML:</span>Antigravity, Google Colab</p>
            </div>
          </div>
        );
        break;

      case 'projects':
        outputContent = (
          <div className="text-gray-300 font-mono text-xs space-y-3">
            <p className="text-gold font-bold mb-1">SELECTED WORKS</p>
            <div className="space-y-3">
              <div>
                <p className="font-bold text-white">1. Vaani (2025) <span className="text-yellow-500 text-[10px] ml-2 font-normal border border-yellow-500/30 px-1.5 py-0.2 rounded bg-yellow-500/10">WIP</span></p>
                <p className="text-gray-400 text-[11px]">A Voice based Assistant for Illiterate users designed to democratize access to digital services.</p>
                <p className="text-gray-500 text-[10px]">Stack: Python, Flask, Sentence Transformers</p>
                <a href="https://github.com/ankittroy-21/vaani" target="_blank" rel="noopener noreferrer" className="text-[#bf5af2] hover:underline text-[11px] block mt-0.5">Code: https://github.com/ankittroy-21/vaani</a>
              </div>
              <div>
                <p className="font-bold text-white">2. Spotigram (2026) <span className="text-emerald-400 text-[10px] ml-2 font-normal border border-emerald-500/30 px-1.5 py-0.2 rounded bg-emerald-500/10">Live</span></p>
                <p className="text-gray-400 text-[11px]">High-speed asynchronous Telegram bot acting as a bridge between Spotify and Telegram. Custom scraper and MongoDB rate limiter.</p>
                <p className="text-gray-500 text-[10px]">Stack: Python, Pyrogram, MongoDB, BeautifulSoup</p>
                <a href="https://github.com/ankittroy-21/Spotigram" target="_blank" rel="noopener noreferrer" className="text-[#bf5af2] hover:underline text-[11px] block mt-0.5">Code: https://github.com/ankittroy-21/Spotigram</a>
              </div>
              <div>
                <p className="font-bold text-white">3. BBD Papers (2025) <span className="text-emerald-400 text-[10px] ml-2 font-normal border border-emerald-500/30 px-1.5 py-0.2 rounded bg-emerald-500/10">Live</span></p>
                <p className="text-gray-400 text-[11px]">A full-stack educational platform providing BBD University students with easy access to PYQs and study notes.</p>
                <p className="text-gray-500 text-[10px]">Stack: Next.js, TypeScript, Tailwind CSS, Supabase</p>
                <a href="https://bbdpapers.me" target="_blank" rel="noopener noreferrer" className="text-[#bf5af2] hover:underline text-[11px] block mt-0.5">Live Link: https://bbdpapers.me</a>
              </div>
              <div>
                <p className="font-bold text-white">4. Support Triage Agent (2025) <span className="text-yellow-500 text-[10px] ml-2 font-normal border border-yellow-500/30 px-1.5 py-0.2 rounded bg-yellow-500/10">WIP</span></p>
                <p className="text-gray-400 text-[11px]">RAG-powered CLI agent that triages support tickets across HackerRank, Claude, and Visa.</p>
                <p className="text-gray-500 text-[10px]">Stack: Python, RAG, ChromaDB</p>
                <a href="https://github.com/ankittroy-21/hackerrank-orchestrate-may26" target="_blank" rel="noopener noreferrer" className="text-[#bf5af2] hover:underline text-[11px] block mt-0.5">Code: https://github.com/ankittroy-21/hackerrank-orchestrate-may26</a>
              </div>
            </div>
          </div>
        );
        break;

      case 'credentials':
      case 'certs':
        outputContent = (
          <div className="text-gray-300 font-mono text-xs space-y-3">
            <p className="text-gold font-bold mb-1">CERTIFICATIONS & CREDENTIALS</p>
            <div className="space-y-2.5">
              <div>
                <p className="font-bold text-white">1. Software Engineer Certification</p>
                <p className="text-gray-400 text-[11px]">Issuer: HackerRank | Date: 09 Jun, 2026</p>
                <a href="https://www.hackerrank.com/certificates/9efa4ad74c8e" target="_blank" rel="noopener noreferrer" className="text-[#bf5af2] hover:underline text-[11px] block mt-0.5">Verify: https://www.hackerrank.com/certificates/9efa4ad74c8e</a>
              </div>
              <div>
                <p className="font-bold text-white">2. SQL (Advanced)</p>
                <p className="text-gray-400 text-[11px]">Issuer: HackerRank | Date: 09 Jun, 2026</p>
                <a href="https://www.hackerrank.com/certificates/0dfbf1a678e6" target="_blank" rel="noopener noreferrer" className="text-[#bf5af2] hover:underline text-[11px] block mt-0.5">Verify: https://www.hackerrank.com/certificates/0dfbf1a678e6</a>
              </div>
              <div>
                <p className="font-bold text-white">3. Java (Basic)</p>
                <p className="text-gray-400 text-[11px]">Issuer: HackerRank | Date: 09 Jun, 2026</p>
                <a href="https://www.hackerrank.com/certificates/9b2979c9d99d" target="_blank" rel="noopener noreferrer" className="text-[#bf5af2] hover:underline text-[11px] block mt-0.5">Verify: https://www.hackerrank.com/certificates/9b2979c9d99d</a>
              </div>
              <div>
                <p className="font-bold text-white">4. Rest API (Intermediate)</p>
                <p className="text-gray-400 text-[11px]">Issuer: HackerRank | Date: 09 Jun, 2026</p>
                <a href="https://www.hackerrank.com/certificates/a7def0bdc3c1" target="_blank" rel="noopener noreferrer" className="text-[#bf5af2] hover:underline text-[11px] block mt-0.5">Verify: https://www.hackerrank.com/certificates/a7def0bdc3c1</a>
              </div>
              <div>
                <p className="font-bold text-white">5. TOEIC Certification</p>
                <p className="text-gray-400 text-[11px]">Issuer: IIG Vietnam | Date: 03 Mar, 2026</p>
                <span className="text-gray-500 text-[11px] block">Verification link not available</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'contact':
        outputContent = (
          <div className="text-gray-300 font-mono text-xs space-y-1">
            <p className="text-gold font-bold mb-1">CONTACT INFO</p>
            <p><span className="text-gray-500 w-24 inline-block">Email:</span><a href="mailto:lelam7c10tp@gmail.com" className="text-[#bf5af2] hover:underline">lelam7c10tp@gmail.com</a></p>
            <p><span className="text-gray-500 w-24 inline-block">Phone:</span>+84 793 206 191</p>
            <p><span className="text-gray-500 w-24 inline-block">Location:</span>Hanoi, Vietnam</p>
            <p><span className="text-gray-500 w-24 inline-block">Telegram:</span><a href="https://t.me/lamlb2411" target="_blank" rel="noopener noreferrer" className="text-[#bf5af2] hover:underline">https://t.me/lamlb2411</a></p>
          </div>
        );
        break;

      case 'socials':
        outputContent = (
          <div className="text-gray-300 font-mono text-xs space-y-1">
            <p className="text-gold font-bold mb-1">SOCIAL LINKS</p>
            <p><span className="text-gray-500 w-24 inline-block">GitHub:</span><a href="https://github.com/IchiLamlb" target="_blank" rel="noopener noreferrer" className="text-[#bf5af2] hover:underline">https://github.com/IchiLamlb</a></p>
            <p><span className="text-gray-500 w-24 inline-block">Telegram:</span><a href="https://t.me/lamlb2411" target="_blank" rel="noopener noreferrer" className="text-[#bf5af2] hover:underline">https://t.me/lamlb2411</a></p>
            <p><span className="text-gray-500 w-24 inline-block">LinkedIn:</span><a href="https://github.com/IchiLamlb" target="_blank" rel="noopener noreferrer" className="text-[#bf5af2] hover:underline">https://github.com/IchiLamlb</a></p>
          </div>
        );
        break;

      case 'resume':
        outputContent = (
          <div className="text-gray-400 font-mono text-xs">
            <p className="text-gold">Opening resume preview link in a new tab...</p>
          </div>
        );
        window.open('https://drive.google.com/file/d/1qSc7bQkIBL9kuXPFHOS8TuG_bOe5d2BJ/preview', '_blank');
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
      case 'close':
        onClose();
        return;

      case 'ls':
        outputContent = (
          <div className="text-gray-300 font-mono text-xs flex gap-6">
            <span className="text-[#bf5af2] font-semibold">about.txt</span>
            <span className="text-[#bf5af2] font-semibold">skills.txt</span>
            <span className="text-[#bf5af2] font-semibold">projects.txt</span>
            <span className="text-[#bf5af2] font-semibold">contact.txt</span>
            <span className="text-red-400 font-semibold">resume.pdf</span>
          </div>
        );
        break;

      case 'cat':
        const file = args[0] ? args[0].toLowerCase() : '';
        if (!file) {
          outputContent = <p className="text-red-400 font-mono text-xs">Usage: cat &lt;filename&gt;</p>;
        } else if (file === 'about.txt') {
          outputContent = (
            <div className="text-gray-300 font-mono text-xs space-y-1 whitespace-pre-line leading-relaxed">
              {`Lê Bảo Lâm - Software Developer
----------------------------------------
A passionate software developer specializing in backend architecture, 
automation, and building high-performance systems. Currently based in 
Hanoi, Vietnam, I strive to solve complex engineering challenges with 
clean and scalable code.`}
            </div>
          );
        } else if (file === 'skills.txt') {
          outputContent = (
            <div className="text-gray-300 font-mono text-xs space-y-1 whitespace-pre-line leading-relaxed">
              {`TECHNICAL SKILLS:
- Backend: Java, C, Node.js, Telethon
- Frontend: HTML, CSS, JavaScript, TypeScript, TailwindCSS
- Database/Cloud: PostgreSQL, MySQL, MongoDB, Docker, Google Cloud
- DevOps: Git, Docker, VS Code
- AI & ML: Antigravity, Google Colab`}
            </div>
          );
        } else if (file === 'projects.txt') {
          outputContent = (
            <div className="text-gray-300 font-mono text-xs space-y-3 leading-relaxed">
              <div>
                <p className="font-bold text-white">- Vaani (2025)</p>
                <p className="text-gray-400 pl-4">A Voice based Assistant for Illiterate users. Link: https://github.com/ankittroy-21/vaani</p>
              </div>
              <div>
                <p className="font-bold text-white">- Spotigram (2026)</p>
                <p className="text-gray-400 pl-4">Spotify & Telegram bot. Link: https://github.com/ankittroy-21/Spotigram</p>
              </div>
              <div>
                <p className="font-bold text-white">- BBD Papers (2025)</p>
                <p className="text-gray-400 pl-4">Educational platform. Link: https://bbdpapers.me</p>
              </div>
              <div>
                <p className="font-bold text-white">- Support Triage Agent (2025)</p>
                <p className="text-gray-400 pl-4">RAG CLI agent. Link: https://github.com/ankittroy-21/hackerrank-orchestrate-may26</p>
              </div>
            </div>
          );
        } else if (file === 'contact.txt') {
          outputContent = (
            <div className="text-gray-300 font-mono text-xs space-y-1">
              <p>Email: lelam7c10tp@gmail.com</p>
              <p>Phone: +84 793 206 191</p>
              <p>Location: Hanoi, Vietnam</p>
              <p>Telegram: https://t.me/lamlb2411</p>
            </div>
          );
        } else if (file === 'resume.pdf') {
          outputContent = (
            <div className="text-gray-400 font-mono text-xs">
              <p className="text-gold">Opening resume preview link in a new tab...</p>
            </div>
          );
          window.open('https://drive.google.com/file/d/1qSc7bQkIBL9kuXPFHOS8TuG_bOe5d2BJ/preview', '_blank');
        } else {
          outputContent = <p className="text-red-400 font-mono text-xs">cat: {args[0]}: No such file or directory</p>;
        }
        break;

      default:
        outputContent = (
          <p className="text-red-400 font-mono text-xs">
            Command not found: <span className="font-bold">{command}</span>. Type <span className="text-gold font-bold">help</span> to view available commands.
          </p>
        );
    }

    setHistory([...newLogs, { type: 'output', content: outputContent }]);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999]"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Terminal Window container */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleTerminalClick();
        }}
        className="terminal-modal-card rounded-2xl border flex flex-col overflow-hidden relative shadow-2xl animate-[terminalPopIn_0.3s_ease-out_forwards] select-text cursor-text"
        style={{
          backgroundColor: 'rgba(13, 13, 16, 0.94)',
          borderColor: 'rgba(191, 90, 242, 0.4)',
          boxShadow: '0 20px 50px rgba(191, 90, 242, 0.2), inset 0 0 10px rgba(191, 90, 242, 0.15)',
        }}
      >
        {/* Glow */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#bf5af2]/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Scanlines layer */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(191, 90, 242, 0.15) 2px, rgba(191, 90, 242, 0.15) 4px)',
            opacity: 0.35
          }}
        ></div>

        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#bf5af2]/20 px-4 py-3 bg-black/40 shrink-0 select-none">
          {/* Windows buttons */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-500 border border-red-500/30 transition-colors flex items-center justify-center text-[8px] text-red-950 font-bold group"
              title="Close"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">×</span>
            </button>
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 border border-yellow-500/30"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 border border-emerald-500/30"></span>
          </div>

          <div className="flex items-center gap-2">
            <TerminalIcon size={12} className="text-[#bf5af2]/70" />
            <span className="text-[11px] text-gray-400 font-mono tracking-wide">Lelam - terminal</span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-[#bf5af2]/20 hover:border-[#bf5af2]/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            title="Close window"
          >
            <X size={14} />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto p-5 font-mono text-xs space-y-4 scrollbar-thin">
          <div className="space-y-3">
            {history.map((item, idx) => {
              if (item.type === 'command') {
                return (
                  <div key={idx} className="flex items-center text-gray-200">
                    <span className="text-emerald-400 font-semibold mr-2">Lelam:~$</span>
                    <span>{item.text}</span>
                  </div>
                );
              } else {
                return <div key={idx} className="leading-relaxed">{item.content}</div>;
              }
            })}
          </div>

          {/* Active prompt line */}
          <div className="flex items-center text-gray-200">
            <span className="text-emerald-400 font-semibold mr-2 shrink-0">Lelam:~$</span>
            <div className="relative flex-1 flex items-center min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent text-gray-200 focus:outline-none p-0 m-0 w-full font-mono text-xs select-text"
                style={{
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                  background: 'transparent',
                  color: '#e5e7eb',
                  width: '100%',
                }}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>

      <style>{`
        .terminal-modal-card {
          position: fixed;
          bottom: 230px;
          right: 16px;
          width: calc(100vw - 32px);
          height: 280px;
          z-index: 50;
        }
        @media (min-width: 1024px) {
          .terminal-modal-card {
            bottom: 160px;
            right: 32px;
            width: 480px;
            height: 360px;
          }
        }
        @keyframes terminalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes terminalPopIn {
          from { opacity: 0; transform: scale(0.95) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(191, 90, 242, 0.2);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(191, 90, 242, 0.4);
        }
      `}</style>
    </div>
  );
}
