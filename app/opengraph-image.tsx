import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Ayush Sanj — Frontend Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '66px 80px', background: '#d8dbf1', color: '#22203d', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, letterSpacing: 2, textTransform: 'uppercase' }}>
          <span>Frontend engineer / India</span>
          <span>Portfolio / 2026</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 75, fontSize: 145, fontWeight: 800, letterSpacing: -9, lineHeight: 0.9 }}>
          <span>AYUSH</span>
          <span style={{ marginLeft: 160 }}>SANJ<span style={{ color: '#bb493c' }}>.</span></span>
        </div>
        <div style={{ display: 'flex', marginTop: 'auto', fontSize: 28, fontWeight: 500 }}>
          I build the part you use.
        </div>
      </div>
    ),
    { ...size }
  );
}
