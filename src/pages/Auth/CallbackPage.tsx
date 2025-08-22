import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const CallbackPage: React.FC = () => {
  const navigate = useNavigate()
  const { syncUser } = useAuth()
  const [status, setStatus] = useState<'working' | 'ok' | 'error'>('working')
  const { lang } = useParams<{ lang: string }>()

  useEffect(() => {
    let cancelled = false
    const completeLogin = async () => {
      // Retry a few times in case backend needs a moment to finalize session
      const maxAttempts = 4
      const backoffMs = [200, 400, 800, 1200]
      for (let i = 0; i < maxAttempts; i++) {
        try {
          const ok = await syncUser()
          if (ok) {
            if (!cancelled) setStatus('ok')
            navigate(`/${lang || 'vi'}`)
            return
          }
        } catch (e) {
          // keep retrying
        }
        await new Promise(r => setTimeout(r, backoffMs[i] || 500))
      }
      if (!cancelled) {
        setStatus('error')
        navigate(`/${lang || 'vi'}`)
      }
    }

    completeLogin()
    return () => { cancelled = true }
  }, [syncUser, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>{status === 'working' ? 'Đang hoàn tất quá trình đăng nhập...' : status === 'ok' ? 'Đăng nhập thành công, đang chuyển hướng...' : 'Không thể xác thực. Đang chuyển hướng...'}</p>
    </div>
  )
}

export default CallbackPage


