'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// PaperAirplaneIcon replaced with inline SVG

export default function LetterToSanta() {
    const [wish, setWish] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const sendLetter = (e: React.FormEvent) => {
        e.preventDefault()
        if (!wish.trim()) return

        setIsSending(true)
        setTimeout(() => {
            setIsSending(false)
            setIsSent(true)
        }, 2000)
    }

    return (
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50 max-w-sm mx-auto h-full relative overflow-hidden">
            <h3 className="text-2xl font-bold text-christmas-red mb-4 text-christmas flex items-center justify-center gap-2">
                Letter to Santa 📮
            </h3>

            {!isSent ? (
                <form onSubmit={sendLetter} className="space-y-4 relative z-10">
                    <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200 transform rotate-1 shadow-inner">
                        <textarea
                            value={wish}
                            onChange={(e) => setWish(e.target.value)}
                            placeholder="Dear Santa, this year I would like..."
                            rows={5}
                            className="w-full bg-transparent border-none focus:ring-0 resize-none font-handwriting text-gray-700 text-lg leading-relaxed placeholder-gray-400"
                            style={{ fontFamily: 'cursive' }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSending}
                        className="w-full bg-christmas-red hover:bg-christmas-red-dark text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 group disabled:opacity-70"
                    >
                        {isSending ? (
                            <span>Sending to North Pole... 📨</span>
                        ) : (
                            <>
                                <span>Send Wish</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>
            ) : (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                >
                    <div className="text-6xl mb-4">📬</div>
                    <h4 className="text-xl font-bold text-christmas-green mb-2">Message Sent!</h4>
                    <p className="text-gray-600">Santa's elves have received your letter. Keep being good!</p>
                    <button
                        onClick={() => { setIsSent(false); setWish('') }}
                        className="mt-6 text-christmas-red text-sm font-bold hover:underline"
                    >
                        Write Another Letter
                    </button>
                </motion.div>
            )}

            {isSending && (
                <motion.div
                    className="absolute inset-0 bg-white/90 z-20 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        animate={{ x: [0, 200, 400], y: [0, -50, -200], rotate: [0, 10, 45], opacity: [1, 1, 0] }}
                        transition={{ duration: 1.5, ease: "easeIn" }}
                        className="text-6xl"
                    >
                        ✉️
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}
