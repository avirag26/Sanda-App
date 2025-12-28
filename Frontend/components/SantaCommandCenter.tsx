'use client'

import { useState } from 'react'
// Icons replaced with inline SVGs
import { GiftIcon } from '@heroicons/react/24/solid'

export default function SantaCommandCenter() {
    const [magicLevel, setMagicLevel] = useState(85)
    const [productionSpeed, setProductionSpeed] = useState(92)
    const [reindeerWarp, setReindeerWarp] = useState(false)

    return (
        <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-slate-700 text-white max-w-sm mx-auto h-full">
            <h3 className="text-xl font-bold text-red-500 mb-6 flex items-center gap-2 border-b border-slate-700 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                COMMAND CENTER // ADMIN
            </h3>

            <div className="space-y-8">
                {/* Magic Level Control */}
                <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                            </svg>
                            Global Magic Field
                        </span>
                        <span className="font-mono text-yellow-500">{magicLevel}%</span>
                    </div>
                    <input
                        type="range"
                        min="0" max="100"
                        value={magicLevel}
                        onChange={(e) => setMagicLevel(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                    />
                    <div className="w-full h-4 mt-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-300"
                            style={{ width: `${magicLevel}%` }}
                        />
                    </div>
                </div>

                {/* Production Speed */}
                <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span className="flex items-center gap-2"><GiftIcon className="w-4 h-4 text-green-500" /> Elven Production</span>
                        <span className="font-mono text-green-500">{productionSpeed} G/s</span>
                    </div>
                    <div className="flex gap-2">
                        {['Normal', 'Fast', 'Turbo', 'Magic'].map((speed, i) => (
                            <button
                                key={speed}
                                onClick={() => setProductionSpeed(90 + (i * 10))}
                                className={`flex-1 py-1 text-xs rounded border ${productionSpeed >= 90 + (i * 10)
                                    ? 'bg-green-900/50 border-green-500 text-green-400'
                                    : 'border-slate-700 text-gray-500'
                                    }`}
                            >
                                {speed}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reindeer Controls */}
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-bold text-sm">Warp Drive (Rudolph)</div>
                            <div className="text-xs text-gray-500">Enable lightspeed travel</div>
                        </div>
                        <button
                            onClick={() => setReindeerWarp(!reindeerWarp)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${reindeerWarp ? 'bg-red-600' : 'bg-slate-600'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${reindeerWarp ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-700 text-xs text-gray-500 font-mono text-center">
                SYSTEM STATUS: ONLINE <br />
                NORTH POLE SERVER: ACTIVE
            </div>
        </div>
    )
}
