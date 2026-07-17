'use client'

import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  targetAlpha: number
}

interface ParticleBackgroundProps {
  density?: number // Number of particles per 100,000 pixels
  maxLineDistance?: number // Max distance to draw lines between particles
  particleColor?: string // Any valid CSS color (e.g. '#06b6d4', 'rgba(6, 182, 212, 0.5)', 'cyan')
  lineColor?: string // Any valid CSS color
  speedMultiplier?: number // Speed modifier
  interactive?: boolean // Connect particles to mouse
}

export function ParticleBackground({
  density = 40,
  maxLineDistance = 110,
  particleColor = '#06b6d4', // Cyan-400
  lineColor = '#06b6d4', // Cyan-400
  speedMultiplier = 0.4,
  interactive = true,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })
  const isVisibleRef = useRef<boolean>(true)
  const sizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 })
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    
    // Initialize particles based on size and density settings
    const initParticles = (width: number, height: number) => {
      const area = width * height
      const desiredCount = Math.min(
        Math.floor((area / 70000) * density), 
        120 // Performance limit
      )
      
      const colors = [
        particleColor,
        '#6366f1', // Indigo-500
        '#ffffff', // White
      ]

      const newParticles: Particle[] = []
      for (let i = 0; i < desiredCount; i++) {
        const radius = Math.random() * 2 + 1.2 // 1.2px to 3.2px particles
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speedMultiplier,
          vy: (Math.random() - 0.5) * speedMultiplier,
          radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.2,
          targetAlpha: Math.random() * 0.5 + 0.2,
        })
      }
      particlesRef.current = newParticles
    }

    // Set canvas dimensions with device pixel ratio scaling for crispness
    const resizeCanvas = (currentWidth: number, currentHeight: number) => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = currentWidth * dpr
      canvas.height = currentHeight * dpr
      ctx.scale(dpr, dpr)
      
      sizeRef.current = { width: currentWidth, height: currentHeight }
      initParticles(currentWidth, currentHeight)
    }

    // Handle hover / movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null }
    }

    const parent = canvas.parentElement
    if (parent && interactive) {
      parent.addEventListener('mousemove', handleMouseMove)
      parent.addEventListener('mouseleave', handleMouseLeave)
    }

    // Performance Optimization: Use IntersectionObserver to pause drawing when section is offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting
        })
      },
      { threshold: 0.01 }
    )
    
    if (parent) {
      observer.observe(parent)
    }

    // Use ResizeObserver for responsive canvas sizing without infinite loop risk
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        if (width > 0 && height > 0) {
          resizeCanvas(width, height)
        }
      }
    })

    if (parent) {
      resizeObserver.observe(parent)
    } else {
      // Fallback if no parent
      resizeCanvas(window.innerWidth, window.innerHeight)
    }

    // Main animation loop
    const animate = () => {
      if (!canvas || !ctx) return
      
      animationFrameId = requestAnimationFrame(animate)
      
      if (!isVisibleRef.current) return

      const { width, height } = sizeRef.current
      if (width === 0 || height === 0) return

      ctx.clearRect(0, 0, width, height)

      const particles = particlesRef.current

      // 1. Update and Draw Particles
      particles.forEach((p) => {
        // Move particle
        p.x += p.vx
        p.y += p.vy

        // Wrap around boundaries
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Subtle pulsing effect on alpha
        if (Math.random() < 0.01) {
          p.targetAlpha = Math.random() * 0.5 + 0.2
        }
        p.alpha += (p.targetAlpha - p.alpha) * 0.05

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      })

      // 2. Draw Network Lines between close particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        
        // Draw connection to mouse
        if (interactive && mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = p1.x - mouseRef.current.x
          const dy = p1.y - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < maxLineDistance * 1.3) {
            const alpha = (1 - dist / (maxLineDistance * 1.3)) * 0.25
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
            ctx.strokeStyle = lineColor
            ctx.globalAlpha = alpha
            ctx.lineWidth = 0.9
            ctx.stroke()
          }
        }

        // Draw connections between particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxLineDistance) {
            // Opacity maps to proximity (closer = more opaque lines)
            const alpha = (1 - dist / maxLineDistance) * 0.12
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = lineColor
            ctx.globalAlpha = alpha
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      
      // Reset globalAlpha
      ctx.globalAlpha = 1.0
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove)
        parent.removeEventListener('mouseleave', handleMouseLeave)
        observer.unobserve(parent)
        resizeObserver.unobserve(parent)
      }
    }
  }, [density, maxLineDistance, particleColor, lineColor, speedMultiplier, interactive])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none block z-[1]"
    />
  )
}
