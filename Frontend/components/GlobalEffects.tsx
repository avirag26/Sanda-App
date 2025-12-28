'use client'

import { useEffect, useState } from 'react'
import MusicPlayer from './MusicPlayer'

export default function GlobalEffects() {
    const [mounted, setMounted] = useState(false)

    // Generate random snowflakes
    const [snowflakes, setSnowflakes] = useState<{ id: number, left: string, duration: string, delay: string, opacity: number, size: string }[]>([])

    useEffect(() => {
        setMounted(true)
        const flakes = Array.from({ length: 75 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}vw`,
            duration: `${Math.random() * 5 + 5}s`,
            delay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5 + 0.5, // Brighter opacity
            size: Math.random() > 0.8 ? '25px' : '15px' // Mix of sizes
        }))
        setSnowflakes(flakes)
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
            <div className="stars"></div>
            <div className="snow-container" style={{ zIndex: 99999 }}>
                {snowflakes.map((flake) => (
                    <div
                        key={flake.id}
                        className="snowflake"
                        style={{
                            left: flake.left,
                            animationDuration: flake.duration,
                            animationDelay: flake.delay,
                            opacity: flake.opacity,
                            width: flake.size || '20px',
                            height: flake.size || '20px',
                            position: 'absolute',
                            top: '-30px' // Start slightly higher
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                            <path d="M12 2V22M2 12H22M4.929 4.929L19.071 19.071M19.071 4.929L4.929 19.071" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </div>
                ))}
            </div>
            <div className="pointer-events-auto z-50 relative">
                <MusicPlayer />
            </div>
        </div>
    )
}
