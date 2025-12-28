'use client'

import { motion } from 'framer-motion'

interface NaughtyNiceMeterProps {
    score: number // 0 to 100
}

export default function NaughtyNiceMeter({ score }: NaughtyNiceMeterProps) {
    // Clamp score between 0 and 100
    const clampedScore = Math.min(Math.max(score, 0), 100)

    // Calculate needle rotation (-90deg to 90deg)
    const rotation = (clampedScore / 100) * 180 - 90

    let status = 'Naughty'
    let color = 'text-red-500'

    if (clampedScore > 40) {
        status = 'Nice'
        color = 'text-green-500'
    }
    if (clampedScore > 80) {
        status = 'Very Nice!'
        color = 'text-gold'
    }

    return (
        <div className="relative w-64 h-32 mx-auto mb-8">
            {/* Gauge Background (Half Circle) */}
            <div className="w-full h-full overflow-hidden relative">
                <div className="w-full h-[200%] bg-gray-700 rounded-full absolute top-0 left-0 border-4 border-gray-600 box-border"></div>

                {/* Color Zones */}
                <div className="absolute top-0 left-0 w-full h-[200%] rounded-full opacity-30"
                    style={{
                        background: `conic-gradient(from 270deg, 
              #ef4444 0deg, 
              #ef4444 60deg, 
              #eab308 60deg, 
              #eab308 120deg, 
              #22c55e 120deg, 
              #22c55e 180deg
            )`
                    }}
                ></div>
            </div>

            {/* Ticks and Labels */}
            <div className="absolute top-[85%] left-[5%] text-xs font-bold text-red-400">NAUGHTY</div>
            <div className="absolute top-[85%] right-[5%] text-xs font-bold text-green-400">NICE</div>

            {/* Needle */}
            <motion.div
                className="absolute bottom-0 left-1/2 w-1 h-28 bg-white origin-bottom rounded-full shadow-lg z-10"
                initial={{ rotate: -90 }}
                animate={{ rotate: rotation }}
                transition={{ type: "spring", stiffness: 50, damping: 10 }}
                style={{ translateX: "-50%" }}
            >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-sm" />
            </motion.div>

            {/* Center Cap */}
            <div className="absolute bottom-0 left-1/2 w-8 h-8 bg-gray-800 rounded-full border-4 border-gray-600 z-20 transform -translate-x-1/2 translate-y-1/2 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
            </div>

            {/* Score Display */}
            <div className="absolute -bottom-16 left-0 right-0 text-center">
                <div className={`text-3xl font-bold font-mono ${color} drop-shadow-md`}>
                    {Math.round(clampedScore)}%
                </div>
                <div className={`text-xl text-christmas tracking-wider ${color}`}>
                    {status}
                </div>
            </div>
        </div>
    )
}
