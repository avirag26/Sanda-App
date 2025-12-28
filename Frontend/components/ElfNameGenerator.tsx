'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// SparklesIcon replaced with inline SVG

const PREFIXES = ['Sparkle', 'Jolly', 'Twinkle', 'Frosty', 'Peppermint', 'Cookie', 'Snowball', 'Tinsel', 'Bubbles', 'Gingersnap']
const SUFFIXES = ['McJingles', 'CandyCane', 'Snowflake', 'Evergreen', 'Sugarplum', 'Pudding', 'Mistletoe', 'Bells', 'Ribbon', 'Star']

export default function ElfNameGenerator() {
    const [name, setName] = useState('')
    const [elfName, setElfName] = useState('')

    const generateName = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) return

        // specialized mapping algorithm (hash function) to ensure same name always gets same elf name
        let hash = 0
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash)
        }

        const prefixIndex = Math.abs(hash) % PREFIXES.length
        const suffixIndex = Math.abs(hash >> 1) % SUFFIXES.length

        setElfName(`${PREFIXES[prefixIndex]} ${SUFFIXES[suffixIndex]}`)
    }

    return (
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50 max-w-sm mx-auto h-full flex flex-col">
            <h3 className="text-2xl font-bold text-christmas-green mb-4 text-christmas flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-christmas-gold">
                    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
                </svg>
                Elf Name Generator
            </h3>

            <form onSubmit={generateName} className="space-y-4 flex-1">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Your Human Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-christmas-green focus:ring-2 focus:ring-christmas-green/20 outline-none transition-all text-center text-lg"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-christmas-green hover:bg-christmas-green-dark text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2 group"
                >
                    <span>Reveal My Elf Name</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:animate-spin">
                        <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
                    </svg>
                </button>
            </form>

            {elfName && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center"
                >
                    <div className="text-sm text-gray-500 font-medium mb-2">✨ You are known in the North Pole as:</div>
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-christmas-red to-christmas-gold p-2 animate-pulse">
                        {elfName}
                    </div>
                    <div className="mt-4 text-4xl">🧝</div>
                </motion.div>
            )}
        </div>
    )
}
