import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Ayush Sanj — Frontend & Mobile Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d0c09',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 96px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top accent line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c8f13f' }} />
          <span style={{ color: '#4a4535', fontSize: 18, letterSpacing: '0.2em' }}>
            OPEN TO WORK
          </span>
        </div>

        {/* Name */}
        <div style={{ color: '#ede8da', fontSize: 88, fontWeight: 700, lineHeight: 1, marginBottom: 24 }}>
          Ayush Sanj
        </div>

        {/* Role */}
        <div style={{ color: '#898060', fontSize: 32, marginBottom: 64 }}>
          Frontend &amp; Mobile Engineer
        </div>

        {/* Stack strip */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {['Next.js', 'React', 'TypeScript', 'React Native'].map((t, i) => (
            <span
              key={t}
              style={{ color: i === 0 ? '#c8f13f' : '#4a4535', fontSize: 18, fontFamily: 'monospace' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Logo mark bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: 72,
            right: 96,
            color: '#c8f13f',
            fontSize: 22,
            fontFamily: 'monospace',
            opacity: 0.6,
          }}
        >
          {'<AS/>'}
        </div>
      </div>
    ),
    { ...size }
  );
}
