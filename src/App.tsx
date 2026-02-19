import { useState, useCallback, useRef } from 'react'
import './App.css'
import { ConfettiAnimation } from './animations/Confetti'
import { PartyPopperAnimation } from './animations/PartyPopper'
import { GlowingBurstAnimation } from './animations/GlowingBurst'

type AnimationType = 'confetti' | 'partyPopper' | 'glowingBurst'

const ANIMATIONS: AnimationType[] = ['confetti', 'partyPopper', 'glowingBurst']

function App() {
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState<string | null>(null)
  const [activeAnimation, setActiveAnimation] = useState<AnimationType | null>(null)
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearPreviousAnimation = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = null
    }
    setActiveAnimation(null)
  }, [])

  const triggerRandomAnimation = useCallback(() => {
    clearPreviousAnimation()
    const randomIndex = Math.floor(Math.random() * ANIMATIONS.length)
    const chosen = ANIMATIONS[randomIndex]
    setActiveAnimation(chosen)
    animationTimeoutRef.current = setTimeout(() => {
      setActiveAnimation(null)
      animationTimeoutRef.current = null
    }, 3000)
  }, [clearPreviousAnimation])

  const handleGreet = useCallback(() => {
    setGreeting(name ? `Hello ${name}` : 'Hello')
    triggerRandomAnimation()
  }, [name, triggerRandomAnimation])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleGreet()
      }
    },
    [handleGreet]
  )

  return (
    <div className="app">
      <div className="animation-layer">
        {activeAnimation === 'confetti' && <ConfettiAnimation />}
        {activeAnimation === 'partyPopper' && <PartyPopperAnimation />}
        {activeAnimation === 'glowingBurst' && <GlowingBurstAnimation />}
      </div>

      <main className="card">
        <label htmlFor="name-input">Enter Your Name</label>
        <input
          id="name-input"
          type="text"
          placeholder="Type your name here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Name input"
        />
        <button type="button" onClick={handleGreet} className="greet-btn">
          Greet
        </button>
        {greeting !== null && (
          <p className="greeting-output" role="status">
            {greeting}
          </p>
        )}
      </main>
    </div>
  )
}

export default App
