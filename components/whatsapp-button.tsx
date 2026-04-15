'use client'

import { MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const WHATSAPP_NUMBER = '917021003269'
const DEFAULT_MESSAGE = 'Hello! I would like to inquire about your industrial products.'

interface WhatsAppButtonProps {
  message?: string
  productName?: string
}

export function WhatsAppButton({ message, productName }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Show tooltip after 3 seconds
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 3000)
    // Hide tooltip after 8 seconds
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000)
    return () => {
      clearTimeout(tooltipTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  const finalMessage = productName 
    ? `Hello! I am interested in ${productName}. Please provide more details.`
    : message || DEFAULT_MESSAGE

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`

  return (
    <div className={cn(
      'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-500',
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    )}>
      {/* Tooltip */}
      <div className={cn(
        'absolute bottom-full right-0 mb-3 transition-all duration-300',
        showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      )}>
        <div className="bg-foreground text-background text-sm px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
          Chat with us on WhatsApp!
          <div className="absolute top-full right-6 border-8 border-transparent border-t-foreground" />
        </div>
      </div>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/30 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Contact us on WhatsApp"
        onClick={() => setShowTooltip(false)}
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-300 group-hover:scale-110" />
        
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      </a>
    </div>
  )
}
