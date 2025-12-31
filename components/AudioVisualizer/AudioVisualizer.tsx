'use client'

import React, { useEffect, useRef, useState } from 'react'

// Import the AgentState type from the simulator hook
import { AgentState } from '@/hooks/useAgentSimulator'

// Define the component props interface
interface AudioVisualizerProps {
  agentState: AgentState
  className?: string
  size?: 'small' | 'medium' | 'large'
  animationType?: 'wave' | 'bars' | 'rings'
  onStateChange?: (newState: AgentState) => void
  onAnimationComplete?: () => void
}

// Define visualization parameters based on state
interface VisualizationParams {
  intensity: number
  speed: number
  color: string
  animationPattern: string
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  agentState,
  className = '',
  size = 'medium',
  animationType = 'rings',
  onStateChange,
  onAnimationComplete,
}) => {
  // Canvas ref for direct access (no forwardRef needed)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Animation frame reference
  const animationRef = useRef<number>(0)
  // State for visualization parameters
  const [vizParams, setVizParams] = useState<VisualizationParams>({
    intensity: 0.05,
    speed: 0.3,
    color: '#40e0d0', // Default dim cyan
    animationPattern: 'pulse',
  })

  // Update visualization parameters based on agent state
  useEffect(() => {
    const getVizParams = (): VisualizationParams => {
      switch (agentState) {
        case 'idle':
          return {
            intensity: 0.05 + Math.random() * 0.1, // Very low 0.05-0.15
            speed: 0.3, // Very slow
            color: '#06b6d4', // Dim neon cyan
            animationPattern: 'pulse',
          }
        case 'listening':
          return {
            intensity: 0.3 + Math.random() * 0.3, // 0.3-0.6, more reactive
            speed: 1.0, // Medium
            color: '#00ffff', // Bright neon cyan
            animationPattern: 'wave',
          }
        case 'processing':
          return {
            intensity: 0.5 + Math.random() * 0.3, // 0.5-0.8, pulsing
            speed: 1.5, // Medium-fast
            color: '#d946ef', // Neon magenta
            animationPattern: 'pulse',
          }
        case 'speaking':
          return {
            intensity: 0.7 + Math.random() * 0.3, // 0.7-1.0, high activity
            speed: 2.0, // Fast
            color: '#a855f7', // Neon purple
            animationPattern: 'bars',
          }
        default:
          return {
            intensity: 0.05,
            speed: 0.3,
            color: '#06b6d4',
            animationPattern: 'pulse',
          }
      }
    }

    const newParams = getVizParams()
    setVizParams(newParams)

    // Trigger state change callback if provided
    if (onStateChange) {
      onStateChange(agentState)
    }
  }, [agentState, onStateChange])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size based on component size prop
    const getSize = () => {
      switch (size) {
        case 'small':
          return 100
        case 'large':
          return 200
        default:
          return 150 // medium
      }
    }

    const canvasSize = getSize()
    canvas.width = canvasSize
    canvas.height = canvasSize

    let animationFrameId: number

    const render = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw visualization based on state and animation type
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxRadius = Math.min(centerX, centerY) * 0.8

      // Apply glassmorphism effect with backdrop blur
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
      ctx.shadowBlur = 10

      switch (animationType) {
        case 'rings':
          drawRings(ctx, centerX, centerY, maxRadius)
          break
        case 'wave':
          drawWave(ctx, centerX, centerY, maxRadius)
          break
        case 'bars':
          drawBars(ctx, centerX, centerY, maxRadius)
          break
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [agentState, size, animationType, vizParams])

  // Helper function to draw ring visualization (enhanced glowing ring)
  const drawRings = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    maxRadius: number
  ) => {
    const { intensity, color, speed } = vizParams

    // Draw a central glowing core
    const coreRadius = maxRadius * 0.1 * (0.5 + intensity * 0.5)
    const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius)
    coreGradient.addColorStop(0, color)
    coreGradient.addColorStop(1, `${color}80`) // 50% opacity at edge

    ctx.beginPath()
    ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2)
    ctx.fillStyle = coreGradient
    ctx.fill()

    // Draw multiple concentric pulsing rings with glow effect
    const rings = 4
    for (let i = 0; i < rings; i++) {
      const baseRadius = maxRadius * (0.3 + (i / rings) * 0.6)
      const pulseOffset = Math.sin(Date.now() * 0.005 * speed + i * 1.5) * 0.2 * intensity
      const actualRadius = baseRadius * (1 + pulseOffset)

      ctx.beginPath()
      ctx.arc(centerX, centerY, actualRadius, 0, Math.PI * 2)

      // Create glow effect with blur
      ctx.shadowColor = color
      ctx.shadowBlur = 15 * intensity

      // Create gradient for neon effect
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        actualRadius * 0.8,
        centerX,
        centerY,
        actualRadius
      )
      gradient.addColorStop(0, `${color}FF`) // Fully opaque
      gradient.addColorStop(0.7, `${color}80`) // Half opacity
      gradient.addColorStop(1, 'transparent')

      ctx.strokeStyle = gradient
      ctx.lineWidth = 1 + intensity * 2
      ctx.globalAlpha = 0.2 + intensity * 0.4
      ctx.stroke()

      // Reset shadow after each ring
      ctx.shadowBlur = 0
    }

    // Draw outer ring with pulsing effect
    const outerRadius = maxRadius * (0.9 + Math.sin(Date.now() * 0.003 * speed) * 0.1 * intensity)
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2)

    ctx.shadowColor = color
    ctx.shadowBlur = 20 * intensity
    ctx.strokeStyle = color
    ctx.lineWidth = 1 + intensity * 1.5
    ctx.globalAlpha = 0.3 + intensity * 0.3
    ctx.stroke()

    // Reset shadow and alpha
    ctx.shadowBlur = 0
    ctx.globalAlpha = 1.0
  }

  // Helper function to draw wave visualization
  const drawWave = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    maxRadius: number
  ) => {
    const { intensity, color, speed } = vizParams

    ctx.beginPath()

    const points = 60
    const angleStep = (Math.PI * 2) / points

    for (let i = 0; i <= points; i++) {
      const angle = i * angleStep
      const noise = Math.sin(Date.now() * 0.005 * speed + i * 0.5) * intensity * maxRadius * 0.3
      const radius = maxRadius * 0.7 + noise

      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.closePath()

    // Create gradient for neon effect
    const gradient = ctx.createLinearGradient(
      centerX - maxRadius,
      centerY,
      centerX + maxRadius,
      centerY
    )
    gradient.addColorStop(0, 'transparent')
    gradient.addColorStop(0.5, color)
    gradient.addColorStop(1, 'transparent')

    ctx.strokeStyle = gradient
    ctx.lineWidth = 3 + intensity * 4
    ctx.globalAlpha = 0.5 + intensity * 0.5
    ctx.stroke()

    // Reset global alpha
    ctx.globalAlpha = 1.0
  }

  // Helper function to draw bar visualization
  const drawBars = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    maxRadius: number
  ) => {
    const { intensity, color, speed } = vizParams

    const bars = 24
    const angleStep = (Math.PI * 2) / bars

    for (let i = 0; i < bars; i++) {
      const angle = i * angleStep
      const noise = Math.sin(Date.now() * 0.005 * speed + i * 0.7) * intensity
      const barLength = maxRadius * 0.3 * (0.3 + noise * 0.7)

      const startX = centerX + Math.cos(angle) * maxRadius * 0.4
      const startY = centerY + Math.sin(angle) * maxRadius * 0.4
      const endX = centerX + Math.cos(angle) * (maxRadius * 0.4 + barLength)
      const endY = centerY + Math.sin(angle) * (maxRadius * 0.4 + barLength)

      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)

      // Create gradient for neon effect
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, 'transparent')

      ctx.strokeStyle = gradient
      ctx.lineWidth = 2 + intensity * 3
      ctx.globalAlpha = 0.4 + intensity * 0.6
      ctx.stroke()
    }

    // Reset global alpha
    ctx.globalAlpha = 1.0
  }

  // Determine size classes
  const sizeClass = size === 'small' ? 'w-24 h-24' : size === 'large' ? 'w-48 h-48' : 'w-36 h-36' // medium

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Glassmorphism container */}
      <div
        className={`
        relative rounded-2xl backdrop-blur-lg
        bg-gradient-to-br from-slate-900/30 to-slate-800/20
        border border-white/10 shadow-lg shadow-neon-cyan/20
        ${sizeClass}
        flex items-center justify-center
        transition-all duration-200 ease-in-out
      `}
      >
        <canvas ref={canvasRef} className="rounded-xl" aria-label="Audio visualizer" />
      </div>
    </div>
  )
}

export default AudioVisualizer
