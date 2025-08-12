import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'
import { useTranslation } from '@/utils/translations'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'


const LoginPage: React.FC = () => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()

  // Form state management
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Function to decode user data from JWT token or API response
  const decodeUserData = (tokenResponse: any) => {
    // In a real implementation, you might decode JWT or get user info from another endpoint
    // For now, we'll simulate user data
    return {
      id: tokenResponse.user_id || '1',
      name: tokenResponse.user_name || usernameOrEmail.includes('@') ? usernameOrEmail.split('@')[0] : usernameOrEmail,
      email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@example.com`,
      role: tokenResponse.user_role || 'user'
    }
  }

  // Handle form submission - Connect to Drupal OAuth API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Basic validation
    if (!usernameOrEmail.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập/email và mật khẩu')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Prepare OAuth request data for Drupal
      const requestData = {
        grant_type: OAUTH_CONFIG.grant_type,
        client_id: OAUTH_CONFIG.client_id,
        client_secret: OAUTH_CONFIG.client_secret,
        username: usernameOrEmail,
        password: password
        // Removed scope parameter
      }

      // Make request to Drupal OAuth endpoint
      const response = await fetch('/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: new URLSearchParams(requestData)
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Tên đăng nhập/email hoặc mật khẩu không chính xác')
        } else if (response.status === 400) {
          throw new Error('Dữ liệu đăng nhập không hợp lệ')
        } else {
          throw new Error('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại')
        }
      }

      const tokenData = await response.json()

      if (!tokenData.access_token) {
        throw new Error('Không nhận được token từ máy chủ')
      }

      // Decode user data from response
      const userData = decodeUserData(tokenData)

      // Save authentication data using AuthContext
      login(tokenData.access_token, userData)

      // Navigate to home page after successful login
      navigate('/')

      console.log('Login successful:', userData.name)

    } catch (error) {
      // Handle different types of errors
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Có lỗi không xác định xảy ra. Vui lòng thử lại.')
      }
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Theme-based styling
  const logoSrc = theme === "dark" ? "/media/darklogo3.png" : "/media/lightlogo3.png"
  
  const bgColor = theme === "dark" ? "bg-dseza-dark-main-bg" : "bg-dseza-light-main-bg"
  const cardBg = theme === "dark" ? "bg-dseza-dark-secondary-bg" : "bg-dseza-light-secondary-bg"
  const textColor = theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text"
  const secondaryTextColor = theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text"
  const borderColor = theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border"
  const inputBg = theme === "dark" ? "bg-dseza-dark-main-bg/50" : "bg-dseza-light-main-bg"
  const focusBorderColor = theme === "dark" ? "focus:border-dseza-dark-primary-accent" : "focus:border-dseza-light-primary-accent"
  const buttonBg = theme === "dark" ? "bg-dseza-dark-primary-accent hover:bg-dseza-dark-primary-hover" : "bg-dseza-light-primary-accent hover:bg-dseza-light-primary-hover"
  const linkColor = theme === "dark" ? "text-dseza-dark-primary-accent hover:text-dseza-dark-primary-hover" : "text-dseza-light-primary-accent hover:text-dseza-light-primary-hover"
  const errorBorderColor = "border-red-500 focus:border-red-500"

  return (
    <div className={cn("min-h-screen flex flex-col items-center justify-center px-4 py-8", bgColor)}>
      {/* Logo */}
      <div className="mb-8">
        <Link to="/" className="flex items-center">
          <img
            src={logoSrc}
            alt="DSEZA Logo"
            className="h-16 md:h-20 w-auto"
          />
        </Link>
      </div>

      {/* Login Card */}
      <Card className={cn("w-full max-w-md border", cardBg, borderColor)}>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className={cn("text-2xl font-bold", textColor)}>
            {t('auth.login.title') || 'Đăng nhập'}
          </CardTitle>
          <CardDescription className={secondaryTextColor}>
            {t('auth.login.description') || 'Nhập tài khoản hoặc email và mật khẩu để tiếp tục'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* General error */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Username/Email field */}
            <div className="space-y-2">
              <Label htmlFor="usernameOrEmail" className={textColor}>
                {t('auth.login.usernameOrEmail') || 'Tên đăng nhập hoặc Email'}
              </Label>
              <Input
                id="usernameOrEmail"
                type="text"
                placeholder={t('auth.login.usernameOrEmailPlaceholder') || 'kuro1422000@gmail.com'}
                value={usernameOrEmail}
                onChange={(e) => {
                  setUsernameOrEmail(e.target.value)
                  // Clear error when user starts typing
                  if (error) setError('')
                }}
                disabled={isLoading}
                className={cn(
                  "transition-all duration-300",
                  inputBg,
                  textColor,
                  error ? errorBorderColor : borderColor,
                  error ? "focus:ring-red-500" : focusBorderColor,
                  "focus:ring-2 focus:ring-opacity-20",
                  !error && (theme === "dark" ? "focus:ring-dseza-dark-primary-accent" : "focus:ring-dseza-light-primary-accent"),
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              />
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className={textColor}>
                  {t('auth.login.password') || 'Mật khẩu'}
                </Label>
                <Link
                  to="/quen-mat-khau"
                  className={cn("text-sm hover:underline transition-colors", linkColor)}
                >
                  {t('auth.login.forgotPassword') || 'Quên mật khẩu?'}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder={t('auth.login.passwordPlaceholder') || '••••••••'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  // Clear error when user starts typing
                  if (error) setError('')
                }}
                disabled={isLoading}
                className={cn(
                  "transition-all duration-300",
                  inputBg,
                  textColor,
                  error ? errorBorderColor : borderColor,
                  error ? "focus:ring-red-500" : focusBorderColor,
                  "focus:ring-2 focus:ring-opacity-20",
                  !error && (theme === "dark" ? "focus:ring-dseza-dark-primary-accent" : "focus:ring-dseza-light-primary-accent"),
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              />
            </div>

            {/* Submit button */}
            <Button 
              type="submit" 
              disabled={isLoading || !usernameOrEmail.trim() || !password.trim()}
              className={cn(
                "w-full transition-all duration-300 font-medium",
                buttonBg,
                "text-white disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                t('auth.login.submitButton') || 'Đăng nhập'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className={cn("text-sm", secondaryTextColor)}>
            {t('auth.login.noAccount') || 'Chưa có tài khoản?'}{' '}
            <Link
              to="/dang-ky"
              className={cn("hover:underline font-medium transition-colors", linkColor)}
            >
              {t('auth.login.registerLink') || 'Đăng ký ngay'}
            </Link>
          </p>
        </CardFooter>
      </Card>

      {/* Helper text */}
      <div className={cn("mt-4 text-xs text-center max-w-md", secondaryTextColor)}>
        <p>
          🔐 <strong>OAuth Integration:</strong> Kết nối với Drupal OAuth API endpoint
        </p>
        <p className="mt-1">
          Nhập email và mật khẩu hợp lệ để đăng nhập
        </p>
      </div>
    </div>
  )
}

export default LoginPage
