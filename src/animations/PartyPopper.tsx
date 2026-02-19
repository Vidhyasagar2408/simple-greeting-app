import { useMemo } from 'react'

const COLORS = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#aa96da', '#f38181', '#95e1d3']
const STREAMER_COUNT = 60

interface Streamer {
  id: number
  angle: number
  color: string
  length: number
  delay: number
  duration: number
}

export function PartyPopperAnimation() {
  const streamers = useMemo<Streamer[]>(
    () =>
      Array.from({ length: STREAMER_COUNT }, (_, i) => ({
        id: i,
        angle: (360 / STREAMER_COUNT) * i + Math.random() * 10,
        color: COLORS[i % COLORS.length],
        length: 15 + Math.random() * 25,
        delay: Math.random() * 0.2,
        duration: 1.2 + Math.random() * 0.8,
      })),
    []
  )

  return (
    <div className="party-popper-container" aria-hidden="true">
      <div className="party-popper-center" />
      {streamers.map((s) => (
        <div
          key={s.id}
          className="party-popper-streamer"
          style={
            {
              '--angle': `${s.angle}deg`,
              '--color': s.color,
              '--length': `${s.length}%`,
              '--delay': `${s.delay}s`,
              '--duration': `${s.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
