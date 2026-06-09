import React from 'react';
import { Download, X } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * INSTRUCTIONS FOR UPDATING YOUR CV WITHOUT REDEPLOYING:
 * 1. Upload your CV PDF file to Google Drive.
 * 2. Right-click the file -> Share -> Anyone with the link can view.
 * 3. Copy the link: e.g., https://drive.google.com/file/d/1XlWqY7uD-w8k1h5Fp9G1G54Q86W_t9eO/view?usp=sharing
 * 4. Extract the file ID: in this case, "1XlWqY7uD-w8k1h5Fp9G1G54Q86W_t9eO".
 * 5. Replace the GOOGLE_DRIVE_FILE_ID constant below with your file ID.
 * 
 * HOW TO UPDATE IN THE FUTURE:
 * Go to Google Drive, right-click the same file -> File information -> Manage versions -> Upload new version.
 * Do NOT create a new link. The ID will stay the same, and your website will update instantly!
 */
const GOOGLE_DRIVE_FILE_ID = '1qSc7bQkIBL9kuXPFHOS8TuG_bOe5d2BJ'; // Replace this with your actual Google Drive PDF File ID

export default function Resume() {
  const previewUrl = `https://drive.google.com/file/d/${GOOGLE_DRIVE_FILE_ID}/preview`;
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${GOOGLE_DRIVE_FILE_ID}`;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-[#070708] text-white">
      {/* Top thin gold gradient border line */}
      <div className="h-0.5 bg-gradient-to-r from-gold/30 via-gold to-gold/30 shrink-0"></div>

      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0d0d10] border-b border-dark-300 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse shadow-[0_0_8px_rgba(245,166,35,0.7)]"></div>
          <p className="text-white text-sm font-semibold tracking-wide font-mono">Resume.pdf</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gold/10 hover:bg-gold/20 border border-gold/40 hover:border-gold rounded-xl text-gold text-xs font-semibold tracking-wide transition-all shadow-[0_0_12px_rgba(191,90,242,0.1)] hover:shadow-[0_0_18px_rgba(191,90,242,0.25)]"
          >
            <Download size={14} /> Download
          </a>
          <Link
            to="/"
            className="w-9 h-9 rounded-xl bg-dark-200 border border-dark-300 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold/40 transition-colors"
          >
            <X size={16} />
          </Link>
        </div>
      </div>

      {/* Embed Container */}
      <div className="flex-1 bg-[#141416] p-4 flex justify-center items-center relative">
        <iframe
          src={previewUrl}
          className="w-full h-full max-w-5xl rounded-xl border border-dark-300 shadow-2xl"
          allow="autoplay"
          title="Le Bao Lam Resume"
          style={{ backgroundColor: '#1e1e1e' }}
        ></iframe>
      </div>
    </div>
  );
}
