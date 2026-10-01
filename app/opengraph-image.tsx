import { ImageResponse } from 'next/og';

export const alt = 'Vamsi Music & Mobiles, Sriharipuram, Visakhapatnam';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Every element with more than one child needs `display: flex` in next/og.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#08080a',
          color: '#ece8e1',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{ width: 20, height: 20, background: '#8B0000', marginRight: 20 }}
          />
          <div style={{ display: 'flex', fontSize: 30, color: '#9a9ea6' }}>
            Sriharipuram, Visakhapatnam
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 250,
              fontWeight: 800,
              letterSpacing: -10,
              lineHeight: 0.85,
              textTransform: 'uppercase',
            }}
          >
            Vamsi
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 54,
              fontWeight: 700,
              color: '#8B0000',
            }}
          >
            Music &amp; Mobiles
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
