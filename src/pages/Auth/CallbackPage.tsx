import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const CallbackPage: React.FC = () => {
  const navigate = useNavigate()
  const { syncUser } = useAuth()
  const { lang } = useParams<{ lang: string }>()

  useEffect(() => {
    const completeLogin = async () => {
      try {
        await syncUser()
        navigate(`/${lang || 'vi'}`)
      } catch (error) {
        console.error('Login callback failed:', error)
        navigate(`/${lang || 'vi'}`)
      }
    }

    completeLogin()
  }, [syncUser, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Đang hoàn tất quá trình đăng nhập...</p>
    </div>
  )
}

export default CallbackPage


