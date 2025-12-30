'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SparklesIcon, StarIcon } from '@heroicons/react/24/outline'

const INITIAL_LOGS = [
    { id: 1, msg: "Elf Alabaster: Finished painting 200 wooden trains 🚂", time: "Just now" },
    { id: 2, msg: "Security: Sleigh perimeter is clear (checked twice) ✅", time: "1m ago" },
    { id: 3, msg: "Kitchen: 5000 gingerbread cookies ready for tasting 🍪", time: "5m ago" },
    { id: 4, msg: "Rudolph: Practice flight successful in light snow 🦌", time: "12m ago" },
]

export default function WorkshopPulse() {
    const [magicEnergy, setMagicEnergy] = useState(92)
    const [logs, setLogs] = useState(INITIAL_LOGS)

    useEffect(() => {
        const interval = setInterval(() => {
            setMagicEnergy(prev => {
                const next = prev + (Math.random() > 0.5 ? 1 : -1)
                return Math.min(Math.max(next, 88), 99)
            })

            const newActivities = [
                "Elf Bernard: Toy wrapping machine at 100% capacity 🎁",
                "Weather: Magical aurora borealis spotted nearby 🌌",
                "Reindeer: Second meal of magical carrots served 🥕",
                "Stables: Reindeer shoes polished and glowing ✨",
                "Mail: 50 incoming letters sorted by Zip Code 📬",
                "Workshop: Hot cocoa break for section 7 ☕"
            ]
            const randomMsg = newActivities[Math.floor(Math.random() * newActivities.length)]

            setLogs(prev => [
                { id: Date.now(), msg: randomMsg, time: "Just now" },
                ...prev.slice(0, 3)
            ])
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="christmas-card bg-white/40 border-2 border-christmas-gold text-slate-900 overflow-hidden shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-400 rounded-lg animate-pulse shadow-md">
                        <SparklesIcon className="w-6 h-6 text-slate-900" />
                    </div>
                    <h3 className="text-xl font-black italic tracking-widest text-christmas-red">NORTH POLE PULSE</h3>
                </div>

                <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-2xl shadow-lg">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm font-bold text-white uppercase tracking-tighter">Magic Energy:</span>
                    <span className="text-xl font-black text-yellow-400 font-mono tracking-widest">{magicEnergy}%</span>
                </div>
            </div>

            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            className="flex items-start gap-3 p-3 bg-white/60 rounded-xl border border-gray-100 group hover:bg-white transition-colors shadow-sm"
                        >
                            <div className="mt-1 w-2 h-2 rounded-full bg-christmas-green group-hover:animate-ping" />
                            <div className="flex-1">
                                <p className="text-sm font-bold text-slate-700">{log.msg}</p>
                                <span className="text-[10px] text-slate-400 uppercase font-black">{log.time}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-6 flex gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                    <motion.div
                        animate={{ width: `${magicEnergy}%` }}
                        className="h-full bg-gradient-to-r from-christmas-red to-christmas-gold"
                    />
                </div>
            </div>
            <p className="mt-2 text-[10px] text-gray-400 text-center font-bold uppercase tracking-[0.2em]">
                Live Workshop Feed • High Magic Density
            </p>
        </div>
    )
}
