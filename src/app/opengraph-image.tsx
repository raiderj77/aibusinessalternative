import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AI Business Alternative — Find the Right AI Tool for Every Job'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, color: 'white', textAlign: 'center' }}>
          AI Business Alternative
        </div>
        <div style={{ fontSize: 32, color: '#a5b4fc', marginTop: 24, textAlign: 'center' }}>
          Find the Right AI Tool for Every Job
        </div>
      </div>
    ),
    { ...size }
  )
}
