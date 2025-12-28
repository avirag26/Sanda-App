'use client'

import { useState, useRef, useEffect } from 'react'

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        // Switch to Internet Archive (Standard MP3, highly compatible)
        audioRef.current = new Audio('https://ia800303.us.archive.org/0/items/JingleBells_746/JingleBells.mp3')
        audioRef.current.loop = true
        audioRef.current.volume = 0.5
        audioRef.current.preload = 'auto' // Hint to preload

        // Cleanup
        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [])

    const togglePlay = async () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                try {
                    const playPromise = audioRef.current.play()
                    if (playPromise !== undefined) {
                        await playPromise
                        console.log("Audio started playing successfully")
                    }
                } catch (e: any) {
                    console.error("Audio play failed:", e)
                    // Show the specific error to help usage
                    alert(`Playback failed: ${e.message || e}. Please try a different browser or check connection.`)
                }
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (audioRef.current) {
            audioRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100000]"> {/* High Z-index */}
            <div
                onClick={togglePlay}
                className={`
          relative flex items-center justify-center w-14 h-14 rounded-full cursor-pointer
          transition-all duration-300 shadow-lg border-2 border-white/40
          ${isPlaying ? 'bg-christmas-red animate-pulse-slow' : 'bg-gray-800 hover:scale-110'}
        `}
            >
                {/* Floating Notes Animation when playing */}
                {isPlaying && (
                    <>
                        <div className="absolute -top-4 -right-2 transform animate-float text-gold">♪</div>
                        <div className="absolute -bottom-2 -left-4 transform animate-float delay-75 text-gold text-lg">♫</div>
                        <div className="absolute -top-6 left-0 transform animate-float delay-150 text-gold text-sm">♩</div>
                    </>
                )}

                <div className="relative z-10 text-white">
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                    ) : (
                        <div className="h-6 w-6 flex items-center justify-center">
                            <span className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></span>
                        </div>
                    )}
                </div>

                {/* Mute Button (Mini) */}
                {isPlaying && (
                    <div
                        onClick={toggleMute}
                        className="absolute -top-1 -right-1 bg-white text-christmas-red rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                    >
                        {isMuted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                            </svg>
                        )}
                    </div>
                )}
            </div>

            {/* Persistent Tooltip/Label */}
            <div className={`
        absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap
        bg-black/80 text-white text-sm font-bold py-2 px-4 rounded-full
        transition-all duration-300 shadow-xl border border-white/20
        ${isPlaying ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0 animate-bounce'}
      `}>
                Click to Play Music 🎵
            </div>
        </div>
    )
}
