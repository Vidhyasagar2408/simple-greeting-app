import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Greeting App', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('displays the "Enter Your Name" label on load', () => {
    render(<App />)
    expect(screen.getByText('Enter Your Name')).toBeInTheDocument()
  })

  it('renders text input with placeholder "Type your name here"', () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Type your name here')
    expect(input).toBeInTheDocument()
  })

  it('renders a "Greet" button', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /greet/i })).toBeInTheDocument()
  })

  it('displays "Hello [name]" when name is entered and Greet is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<App />)
    const input = screen.getByPlaceholderText('Type your name here')
    const button = screen.getByRole('button', { name: /greet/i })

    await user.type(input, 'Alice')
    await user.click(button)

    expect(screen.getByText('Hello Alice')).toBeInTheDocument()
  })

  it('displays "Hello" when no name is entered and Greet is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<App />)
    const button = screen.getByRole('button', { name: /greet/i })

    await user.click(button)

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('greeting output appears below the button', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<App />)
    const input = screen.getByPlaceholderText('Type your name here')
    const button = screen.getByRole('button', { name: /greet/i })

    await user.type(input, 'World')
    await user.click(button)

    const greeting = screen.getByRole('status')
    expect(greeting).toHaveTextContent('Hello World')
  })

  it('shows one of the three animation containers when Greet is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<App />)
    const button = screen.getByRole('button', { name: /greet/i })

    await user.click(button)

    const hasConfetti = document.querySelector('.confetti-container')
    const hasPartyPopper = document.querySelector('.party-popper-container')
    const hasGlowingBurst = document.querySelector('.glowing-burst-container')

    const animationCount = [hasConfetti, hasPartyPopper, hasGlowingBurst].filter(Boolean).length
    expect(animationCount).toBe(1)
  })

  it('clears previous animation before showing next one on multiple clicks', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<App />)
    const button = screen.getByRole('button', { name: /greet/i })

    await user.click(button)

    vi.advanceTimersByTime(100)
    await user.click(button)

    const containers = document.querySelectorAll('.confetti-container, .party-popper-container, .glowing-burst-container')
    expect(containers.length).toBe(1)
  })

  it('responds to Enter key in input', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<App />)
    const input = screen.getByPlaceholderText('Type your name here')

    await user.type(input, 'Test{Enter}')

    await waitFor(() => {
      expect(screen.getByText('Hello Test')).toBeInTheDocument()
    })
  })
})
