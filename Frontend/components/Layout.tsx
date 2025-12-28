'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HomeIcon,
  UserGroupIcon,
  GiftIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      // Allow public access to certain pages if needed, or strictly redirect
      const publicRoutes = ['/santa-tracker', '/kids-portal', '/child-register', '/login', '/']
      if (!publicRoutes.includes(pathname || '')) {
        router.push('/login')
      }
    }
  }, [router, pathname])

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Track Santa', href: '/santa-tracker', icon: GlobeAltIcon }, // New Link
    { name: 'Children', href: '/children', icon: UserGroupIcon },
    { name: 'Gifts', href: '/gifts', icon: GiftIcon },
    { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('Logged out successfully! 👋')
    router.push('/login')
  }

  // If we are strictly checking for user and it's null, show spinner.
  // Note: If this Layout is used in `dashboard/page.tsx` etc, this holds.
  // I will keep the check to avoid breaking existing auth flow for those pages.
  // But I will verify if I should render children if on a public path using this layout?
  // Unlikely this layout is used for standard public pages like Home.

  if (!user && typeof window !== 'undefined' && !['/login', '/'].includes(pathname || '')) {
    // This logic is a bit fragile if this component is used on public pages. 
    // But based on previous reads, Home page didn't use <Layout>. 
    // So this is safe for dashboard pages.
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white/95 border-r border-gray-200 shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-christmas-red text-christmas">
                  Santa's Workshop
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-900"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <nav className="mt-4 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${pathname === item.href
                        ? 'bg-christmas-red text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                  >
                    <item.icon className={`h-5 w-5 mr-3 ${pathname === item.href ? 'text-white' : 'text-gray-500'}`} />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col z-30">
        <div className="flex flex-col flex-grow bg-white/90 backdrop-blur-xl border-r border-gray-200 shadow-2xl">
          <div className="flex items-center flex-shrink-0 px-6 py-8 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🎄</span>
              <h1 className="text-2xl font-bold text-christmas-red text-christmas leading-none">
                Santa's<br />Workshop
              </h1>
            </div>
          </div>
          <nav className="mt-6 flex-1 px-3 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${pathname === item.href
                    ? 'bg-gradient-to-r from-christmas-red to-red-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1'
                  }`}
              >
                <item.icon className={`h-5 w-5 mr-3 transition-colors ${pathname === item.href ? 'text-white' : 'text-gray-400 group-hover:text-christmas-red'
                  }`} />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User info */}
          <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-gray-50/50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-christmas-red to-pink-600 flex items-center justify-center text-white font-bold ring-2 ring-white">
                  🎅
                </div>
              </div>
              {user && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 w-full flex items-center justify-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors border border-red-100 hover:border-red-200"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen relative z-10">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex h-20 flex-shrink-0 items-center gap-x-4 border-b border-white/40 bg-white/70 backdrop-blur-xl px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-600 hover:text-gray-900 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h2 className="text-2xl font-bold text-gray-800 text-christmas tracking-wide">
                {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button className="relative p-2 text-gray-400 hover:text-christmas-red transition-colors">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
              </button>

              <div className="hidden lg:block lg:h-8 lg:w-px lg:bg-gray-200" />

              <div className="flex items-center gap-x-3">
                {user && <span className="text-sm font-medium text-gray-700">{user.name}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
