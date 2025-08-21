import React, { useState } from 'react'


const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    const target = (import.meta as any).env?.VITE_API_TARGET || 'https://dseza-backend.lndo.site'
    window.location.href = `${target}/api/auth/login`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Đăng nhập vào hệ thống
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Bạn sẽ được chuyển hướng để hoàn tất quá trình xác thực.
          </p>
        </div>
        <div className="mt-8">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {isLoading ? 'Đang chuyển hướng...' : 'Tiếp tục để đăng nhập'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
