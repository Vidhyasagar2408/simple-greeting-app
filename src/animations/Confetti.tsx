import { useState } from 'react'

const COLORS = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da']
const PARTICLE_COUNT = 80

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  vx: number
  vy: number
  delay: number
}

export function ConfettiAnimation() {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: 50 - 20 + Math.random() * 40,
      y: 50 - 20 + Math.random() * 40,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 4 + Math.random() * 8,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 20,
      vy: 5 + Math.random() * 15,
      delay: Math.random() * 0.3,
    }))
  )

  return (
    <div className="confetti-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            '--x': `${p.x}%`,
            '--y': `${p.y}%`,
            '--color': p.color,
            '--size': `${p.size}px`,
            '--rotation': `${p.rotation}deg`,
            '--rotation-speed': `${p.rotationSpeed}deg`,
            '--vx': `${p.vx}px`,
            '--vy': `${p.vy}px`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
