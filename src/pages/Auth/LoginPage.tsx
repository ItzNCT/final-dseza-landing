import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { API_TARGET } from '@/config'


const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()
  const [bgIndex, setBgIndex] = useState<number>(() => Math.floor(Math.random() * 4))

  useEffect(() => {
    // Re-pick on mount to avoid SSR mismatches, if any
    setBgIndex(Math.floor(Math.random() * 4))
  }, [])

  const handleLoginExternal = () => {
    setIsLoading(true)
    const target = API_TARGET
    const callback = encodeURIComponent(window.location.origin + '/vi/auth/callback')
    window.location.href = `${target}/api/auth/login?flow=external&redirect=${callback}`
  }

  const handleLoginInternal = () => {
    setIsLoading(true)
    const target = API_TARGET
    window.location.href = `${target}/api/auth/login?flow=internal`
  }

  const lightImages = [
    '/media/HeroBackground/Slide1light.png',
    '/media/HeroBackground/Slide2light.png',
    '/media/HeroBackground/Slide3light.png',
    '/media/HeroBackground/Slide4light.png',
  ]

  const darkImages = [
    '/media/HeroBackground/Slide1dark.png',
    '/media/HeroBackground/Slide2dark.png',
    '/media/HeroBackground/Slide3dark.png',
    '/media/HeroBackground/Slide4dark.png',
  ]

  const bgUrl = theme === 'dark' ? darkImages[bgIndex] : lightImages[bgIndex]

  return (
    <div className="relative min-h-screen w-full">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <img src={bgUrl} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white/60 dark:from-black/50 dark:to-black/80" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-2xl border border-dseza-light-border bg-white/90 p-8 shadow-xl backdrop-blur-md dark:border-dseza-dark-border dark:bg-dseza-dark-secondary-bg/80">
          <div className="flex flex-col items-center text-center">
            <img src="/media/lightlogo3.png" alt="DSEZA" className="mb-4 h-12 w-auto dark:hidden"/>
            <img src="/media/darklogo3.png" alt="DSEZA" className="mb-4 hidden h-12 w-auto dark:block"/>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-dseza-light-main-text dark:text-dseza-dark-main-text">
              Đăng nhập vào hệ thống
            </h1>
            <p className="mt-2 text-sm text-dseza-light-secondary-text dark:text-dseza-dark-secondary-text">
              Bạn sẽ được chuyển hướng để hoàn tất quá trình xác thực.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <button
              onClick={handleLoginExternal}
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center rounded-lg bg-dseza-light-primary px-4 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-dseza-light-primary hover:bg-dseza-light-primary-hover disabled:opacity-60 dark:bg-dseza-dark-primary dark:hover:bg-dseza-dark-primary-hover dark:focus:ring-dseza-dark-primary"
            >
              {isLoading ? 'Đang chuyển hướng...' : 'Đăng nhập ngoài (OIDC)'}
            </button>

            <button
              onClick={handleLoginInternal}
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center rounded-lg border border-dseza-light-primary bg-white px-4 py-3 text-sm font-medium text-dseza-light-primary transition hover:bg-dseza-light-hover focus:outline-none focus:ring-2 focus:ring-dseza-light-primary disabled:opacity-60 dark:border-dseza-dark-primary dark:bg-dseza-dark-secondary-bg dark:text-dseza-dark-primary dark:hover:bg-dseza-dark-hover dark:focus:ring-dseza-dark-primary"
            >
              {isLoading ? 'Đang chuyển hướng...' : 'Đăng nhập nội bộ (Drupal)'}
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-dseza-light-secondary-text dark:text-dseza-dark-secondary-text">
            © {new Date().getFullYear()} DSEZA. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
