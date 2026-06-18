'use client';

export default function Footer() {
  return (
    <footer
      className="wwm-section"
      style={{
        paddingTop: '48px',
        paddingBottom: '48px',
        borderTop: '1px solid var(--border)',
      }}
    >
      <p
        className="text-center text-sm"
        style={{ color: 'var(--text-muted)', fontWeight: 400 }}
      >
        © 2025 Vishal
        <span className="mx-2 opacity-30">·</span>
        vishzzl.github.io
        <span className="mx-2 opacity-30">·</span>
        Built with care.
      </p>
    </footer>
  );
}
