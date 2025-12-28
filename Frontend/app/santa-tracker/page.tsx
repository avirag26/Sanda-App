'use client'

import SantaTracker from '../../components/SantaTracker'
import { motion } from 'framer-motion'

export default function SantaTrackerPage() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold text-christmas-red text-christmas mb-2">
                    Global Santa Tracker 🌍
                </h1>
                <p className="text-gray-600 font-medium">
                    Watch Santa travel across the globe in real-time, delivering joy to every child!
                </p>
            </motion.div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-5xl mx-auto"
            >
                <SantaTracker />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="christmas-card text-center bg-white/80">
                    <div className="text-4xl mb-2">🦌</div>
                    <h3 className="text-xl font-bold text-christmas-red">Reindeer Status</h3>
                    <p className="text-green-700 font-bold mt-2">100% Energy</p>
                    <p className="text-sm text-gray-500">Carrots consumed: 12,405</p>
                </div>
                <div className="christmas-card text-center bg-white/80">
                    <div className="text-4xl mb-2">🍪</div>
                    <h3 className="text-xl font-bold text-christmas-gold">Cookie Level</h3>
                    <p className="text-yellow-600 font-bold mt-2">Maximum Capacity</p>
                    <p className="text-sm text-gray-500">Milk liters: 3,200</p>
                </div>
                <div className="christmas-card text-center bg-white/80">
                    <div className="text-4xl mb-2">🎁</div>
                    <h3 className="text-xl font-bold text-purple-600">Sleigh Load</h3>
                    <p className="text-purple-600 font-bold mt-2">Heavy (Magic Assisted)</p>
                    <p className="text-sm text-gray-500">Gifts remaining: 2.1 Billion</p>
                </div>
            </div>
        </div>
    )
}
