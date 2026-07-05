"use client";

// A small celebratory badge shown when a task (or all essentials) is complete.
export default function Trophy({ label, sub }) {
  return (
    <div className="trophy" role="status">
      <svg viewBox="0 0 64 64" className="trophy-icon" aria-hidden="true">
        <path d="M22 12 h20 v8 a10 10 0 0 1 -20 0 z" fill="var(--gold)" />
        <path d="M22 15 h-6 a6 6 0 0 0 7 8" fill="none" stroke="var(--gold)" strokeWidth="3" />
        <path d="M42 15 h6 a6 6 0 0 1 -7 8" fill="none" stroke="var(--gold)" strokeWidth="3" />
        <rect x="30" y="30" width="4" height="8" fill="var(--gold)" />
        <rect x="24" y="38" width="16" height="4" rx="2" fill="var(--gold)" />
        <rect x="26" y="44" width="12" height="5" rx="2" fill="var(--gold-dark)" />
      </svg>
      <p className="trophy-label">{label}</p>
      {sub && <p className="trophy-sub">{sub}</p>}
    </div>
  );
}
