'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// FingerPrintIcon replaced with inline SVG

const RESULTS = [
    { status: 'NICE', color: 'text-green-500', bg: 'bg-green-100', message: 'Amazing work this year! Santa is proud! 🌟' },
    { status: 'NICE', color: 'text-green-500', bg: 'bg-green-100', message: 'You have been very helpful! Keep it up! 🎁' },
    { status: 'NAUGHTY', color: 'text-red-500', bg: 'bg-red-100', message: 'Oh dear... Try to share more with friends! 🍪' },
    { status: 'CHEEKY', color: 'text-yellow-500', bg: 'bg-yellow-100', message: 'A a little mischief detected! Be careful! 😜' },
]

export default function NaughtyNiceScanner() {
    const [isScanning, setIsScanning] = useState(false)
    const [result, setResult] = useState<typeof RESULTS[0] | null>(null)

    const startScan = () => {
        setIsScanning(true)
        setResult(null)
        setTimeout(() => {
            setIsScanning(false)
            setResult(RESULTS[Math.floor(Math.random() * RESULTS.length)])
        }, 3000)
    }

    return (
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 text-center max-w-sm mx-auto">
            <h3 className="text-2xl font-bold text-christmas-red mb-4 text-christmas">Naughty or Nice Scanner 🕵️‍♀️</h3>

            <div className="relative h-48 flex items-center justify-center mb-6">
                <AnimatePresence mode="wait">
                    {!isScanning && !result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={startScan}
                            className="cursor-pointer group"
                        >
                            <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-dashed border-gray-300 flex items-center justify-center group-hover:border-christmas-red transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 group-hover:text-christmas-red transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                                </svg>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 font-medium">Touch to Scan</p>
                        </motion.div>
                    )}

                    {isScanning && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            <div className="w-32 h-32 border-4 border-christmas-green rounded-full flex items-center justify-center relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-christmas-green/20"
                                    animate={{ top: ['100%', '0%', '100%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-christmas-green">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                                </svg>
                            </div>
                            <p className="mt-4 text-christmas-green font-bold animate-pulse">Analyzing Behavior...</p>
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`p-6 rounded-xl ${result.bg} border-2 border-current ${result.color}`}
                        >
                            <div className="text-4xl font-black mb-2 tracking-wider">{result.status}</div>
                            <p className="text-gray-700 font-medium text-sm">{result.message}</p>
                            <button
                                onClick={() => setResult(null)}
                                className="mt-4 text-xs underline opacity-60 hover:opacity-100"
                            >
                                Scan Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="text-xs text-gray-400 mt-2">
                * Accurately verified by Elf Intelligence Agency
            </div>
        </div>
    )
}
