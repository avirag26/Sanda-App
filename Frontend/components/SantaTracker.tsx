'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/outline'

const LOCATIONS = [
    { name: 'North Pole', x: 50, y: 10 },
    { name: 'Tokyo, Japan', x: 85, y: 35 },
    { name: 'Sydney, Australia', x: 90, y: 75 },
    { name: 'Mumbai, India', x: 70, y: 45 },
    { name: 'Moscow, Russia', x: 65, y: 20 },
    { name: 'Paris, France', x: 49, y: 30 },
    { name: 'London, UK', x: 47, y: 27 },
    { name: 'New York, USA', x: 28, y: 33 },
    { name: 'Rio de Janeiro, Brazil', x: 32, y: 65 },
]

export default function SantaTracker() {
    const [currentStopIndex, setCurrentStopIndex] = useState(0)
    const [nextStopIndex, setNextStopIndex] = useState(1)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStopIndex(prev => (prev + 1) % LOCATIONS.length)
            setNextStopIndex(prev => (prev + 1) % LOCATIONS.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const currentStop = LOCATIONS[currentStopIndex]

    return (
        <div className="w-full aspect-video bg-[#0F172A] rounded-2xl overflow-hidden relative border-2 border-white/20 shadow-2xl">
            {/* Starry Background */}
            <div className="absolute inset-0 opacity-50">
                <div className="stars"></div>
            </div>

            {/* World Map SVG (Simplified) */}
            <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full text-white/10"
                preserveAspectRatio="none"
            >
                <path
                    d="M20,30 Q40,10 60,30 T100,30"
                    fill="none"
                    stroke="none"
                />
                {/* Placeholder for continents - just stylized blobs for aesthetic */}
                <path d="M10,20 Q15,10 25,20 T40,25 T50,20 T80,15 T95,25 V80 H5 Q5,50 10,20" fill="currentColor" opacity="0.1" />
                <path d="M5,25 Q15,15 25,25 T45,30 T65,25 T85,20 T95,30 V85 H5 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

                {/* Grid lines */}
                <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="0.1" />
                <line x1="0" y1="40" x2="100" y2="40" stroke="currentColor" strokeWidth="0.1" />
                <line x1="0" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="0.1" />
                <line x1="0" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="0.1" />
                <line x1="20" y1="0" x2="20" y2="100" stroke="currentColor" strokeWidth="0.1" />
                <line x1="40" y1="0" x2="40" y2="100" stroke="currentColor" strokeWidth="0.1" />
                <line x1="60" y1="0" x2="60" y2="100" stroke="currentColor" strokeWidth="0.1" />
                <line x1="80" y1="0" x2="80" y2="100" stroke="currentColor" strokeWidth="0.1" />
            </svg>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path
                    d={`M${currentStop.x},${currentStop.y} L${LOCATIONS[nextStopIndex].x},${LOCATIONS[nextStopIndex].y}`}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="0.5"
                    strokeDasharray="1 1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 4, ease: "linear" }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#D42426" />
                        <stop offset="100%" stopColor="#F8B229" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Locations */}
            {LOCATIONS.map((loc, idx) => (
                <div
                    key={loc.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                >
                    <div className={`w-2 h-2 rounded-full ${idx === currentStopIndex ? 'bg-christmas-gold animate-ping' : 'bg-white/30'}`} />
                    {idx === currentStopIndex && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded border border-white/20">
                            {loc.name}
                        </div>
                    )}
                </div>
            ))}

            {/* Santa Sleigh */}
            <motion.div
                className="absolute w-12 h-12 z-10"
                animate={{
                    left: `${currentStop.x}%`,
                    top: `${currentStop.y}%`,
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut"
                }}
                style={{ transform: 'translate(-50%, -50%)' }}
            >
                <div className="relative w-full h-full">
                    <span className="text-3xl absolute top-0 left-0 filter drop-shadow-lg">🛷</span>
                    <span className="text-xl absolute top-0 -left-6 transform -scale-x-100">🦌</span>
                    <div className="absolute -bottom-1 left-2 w-full h-1 bg-white/20 blur-sm rounded-full" />
                </div>
            </motion.div>

            {/* Info Overlay */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-xs">
                <h3 className="text-christmas text-xl text-christmas-gold mb-1">Live Tracking</h3>
                <p className="text-xs text-gray-300 mb-2">Santa is currently delivering gifts to:</p>
                <div className="flex items-center space-x-2 text-white font-bold text-lg">
                    <StarIcon className="h-5 w-5 text-christmas-red" />
                    <span>{currentStop.name}</span>
                </div>
                <div className="mt-3 flex space-x-4 text-center">
                    <div>
                        <div className="text-xs text-gray-400">Speed</div>
                        <div className="font-mono text-christmas-green">3,200 <span className="text-[10px]">km/s</span></div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Gifts</div>
                        <div className="font-mono text-christmas-gold">4.2B</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
