import React, { useEffect } from 'react'


const LoginPage: React.FC = () => {
  const cmsLoginUrl = 'https://dseza-backend.lndo.site/user/login'

  useEffect(() => {
    window.location.replace(cmsLoginUrl)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <a href={cmsLoginUrl}>Đang chuyển hướng tới trang đăng nhập CMS...</a>
    </div>
  )
}

export default LoginPage
