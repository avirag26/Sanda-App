'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SparklesIcon, StarIcon } from '@heroicons/react/24/outline'

interface Reindeer {
    name: string
    personality: string
    emoji: string
    color: string
}

const REINDEER_DATA: Reindeer[] = [
    { name: "Dasher", personality: "Speed is my middle name! ⚡", emoji: "🦌", color: "from-blue-400 to-blue-600" },
    { name: "Dancer", personality: "Want to see my new holiday dance? 💃", emoji: "🦌", color: "from-pink-400 to-pink-600" },
    { name: "Prancer", personality: "I'm the most stylish in the sky! ✨", emoji: "🦌", color: "from-purple-400 to-purple-600" },
    { name: "Vixen", personality: "Anyone for some holiday treats? 🍪", emoji: "🦌", color: "from-orange-400 to-orange-600" },
    { name: "Comet", personality: "I can fly faster than a shooting star! ☄️", emoji: "🦌", color: "from-indigo-400 to-indigo-600" },
    { name: "Cupid", personality: "Sending love to everyone! ❤️", emoji: "🦌", color: "from-red-400 to-red-600" },
    { name: "Donner", personality: "I have the loudest belly laugh! 🤣", emoji: "🦌", color: "from-green-400 to-green-600" },
    { name: "Blitzen", personality: "Sparkling like holiday lightning! 🌩️", emoji: "🦌", color: "from-yellow-400 to-yellow-600" },
    { name: "Rudolph", personality: "My nose is shining bright for Santa! 🔴", emoji: "🦌", color: "from-red-500 to-red-700" },
]

export default function ReindeerStable() {
    const [selectedReindeer, setSelectedReindeer] = useState<string | null>(null)
    const [feedingReindeer, setFeedingReindeer] = useState<string | null>(null)

    const handleFeed = (name: string) => {
        setFeedingReindeer(name)
        setTimeout(() => setFeedingReindeer(null), 1500)
    }

    return (
        <div className="christmas-card bg-white/95 border-2 border-christmas-gold/40 p-8 relative overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-black text-christmas-red italic flex items-center gap-3">
                        <span className="text-4xl">🛶</span> REINDEER STABLES
                    </h2>
                    <p className="text-gray-500 font-medium">Say hello to Santa's magical flight team! ❄️</p>
                </div>
                <div className="bg-red-50 px-4 py-2 rounded-full border border-red-100 italic">
                    <span className="text-red-600 font-bold flex items-center gap-2">
                        <SparklesIcon className="w-5 h-5" /> 9 Happy Reindeer
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {REINDEER_DATA.map((rd) => (
                    <motion.div
                        key={rd.name}
                        whileHover={{ y: -5 }}
                        className={`relative p-1 rounded-3xl bg-gradient-to-br ${rd.color} shadow-lg cursor-pointer group`}
                        onClick={() => setSelectedReindeer(rd.name === selectedReindeer ? null : rd.name)}
                    >
                        <div className="bg-white rounded-[1.4rem] p-4 flex flex-col items-center text-center h-full transition-colors group-hover:bg-opacity-90">
                            <motion.div
                                animate={rd.name === selectedReindeer ? { rotate: [0, -10, 10, -10, 0] } : {}}
                                className="relative mb-2"
                            >
                                <span className="text-6xl filter drop-shadow-md">
                                    {rd.name === "Rudolph" ? "🦌🔴" : rd.emoji}
                                </span>

                                <AnimatePresence>
                                    {feedingReindeer === rd.name && (
                                        <motion.div
                                            initial={{ scale: 0, y: 0, opacity: 0 }}
                                            animate={{ scale: 1.5, y: -40, opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl z-50 pointer-events-none"
                                        >
                                            🥕🧡
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            <h3 className="font-black text-gray-800 text-lg uppercase tracking-wider">{rd.name}</h3>

                            <AnimatePresence>
                                {selectedReindeer === rd.name && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="mt-3 overflow-hidden"
                                    >
                                        <p className="text-xs text-christmas-green font-bold leading-tight mb-3 italic">
                                            "{rd.personality}"
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFeed(rd.name);
                                            }}
                                            className="bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-md hover:bg-orange-600 transition-colors uppercase tracking-widest flex items-center gap-1 mx-auto"
                                        >
                                            Feed Carrot 🥕
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 text-center">
                <p className="text-blue-700 text-sm font-medium italic">
                    "Every carrot you feed them makes the sleigh fly faster! 🥕🌙"
                </p>
            </div>
        </div>
    )
}
