import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'
import { useTranslation } from '@/utils/translations'
import { useRegisterUser } from '@/api/hooks'
import { useToast } from '@/hooks/use-toast'
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
import { AlertCircle, Loader2, UserPlus } from 'lucide-react'

const RegisterPage: React.FC = () => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  // Form state management
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  // Registration mutation hook
  const {
    mutate: registerUser,
    isPending: isLoading,
    isSuccess,
    isError,
    error: mutationError,
    data: registrationData,
    reset
  } = useRegisterUser()

  // Handle registration success/error
  useEffect(() => {
    if (isSuccess && registrationData) {
      // Show success toast
      toast({
        title: "Đăng ký thành công!",
        description: registrationData.message || "Tài khoản của bạn đã được tạo thành công.",
        variant: "default",
      })

      // Auto-login if access token is provided
      if (registrationData.access_token) {
        const userInfo = {
          id: registrationData.user_id || '1',
          name: fullName,
          email: email,
          role: registrationData.user_role || 'user'
        }

        login(registrationData.access_token, userInfo)
        navigate('/')
      } else {
        // Redirect to login page if no auto-login
        navigate('/dang-nhap', { 
          state: { 
            message: 'Đăng ký thành công! Vui lòng đăng nhập.',
            email: email 
          } 
        })
      }
    }

    if (isError && mutationError) {
      setError(mutationError.message || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.')
      toast({
        title: "Lỗi đăng ký",
        description: mutationError.message || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.',
        variant: "destructive",
      })
    }
  }, [isSuccess, isError, registrationData, mutationError, fullName, email, login, navigate, toast])

  // Utility function to validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validation function
  const validateForm = (): boolean => {
    if (!fullName.trim()) {
      setError('Vui lòng nhập tên người dùng')
      return false
    }

    if (fullName.trim().length < 2) {
      setError('Tên người dùng phải có ít nhất 2 ký tự')
      return false
    }

    if (!email.trim()) {
      setError('Vui lòng nhập địa chỉ email')
      return false
    }

    if (!isValidEmail(email)) {
      setError('Email không hợp lệ')
      return false
    }

    if (!password) {
      setError('Vui lòng nhập mật khẩu')
      return false
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return false
    }

    if (!confirmPassword) {
      setError('Vui lòng xác nhận mật khẩu')
      return false
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return false
    }

    return true
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Clear previous errors
    setError('')
    reset() // Reset mutation state

    // Prepare registration data
    const registrationData = {
      name: fullName,
      email: email,
      password: password,
      password_confirm: confirmPassword
    }

    console.log('Registration attempt:', registrationData)

    // Trigger registration mutation
    registerUser(registrationData)
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

      {/* Register Card */}
      <Card className={cn("w-full max-w-md border", cardBg, borderColor)}>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className={cn("text-2xl font-bold flex items-center justify-center gap-2", textColor)}>
            <UserPlus className="h-6 w-6" />
            {t('auth.register.title') || 'Tạo tài khoản'}
          </CardTitle>
          <CardDescription className={secondaryTextColor}>
            {t('auth.register.description') || 'Điền thông tin bên dưới để đăng ký tài khoản mới'}
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

            {/* Full Name field */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className={textColor}>
                {t('auth.register.fullName') || 'Tên người dùng'}
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder={t('auth.register.fullNamePlaceholder') || 'Nguyễn Văn A'}
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value)
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

            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className={textColor}>
                {t('auth.register.email') || 'Địa chỉ Email'}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t('auth.register.emailPlaceholder') || 'ten@example.com'}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
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
              <Label htmlFor="password" className={textColor}>
                {t('auth.register.password') || 'Mật khẩu'}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={t('auth.register.passwordPlaceholder') || 'Ít nhất 6 ký tự'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
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

            {/* Confirm Password field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className={textColor}>
                {t('auth.register.confirmPassword') || 'Xác nhận mật khẩu'}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={t('auth.register.confirmPasswordPlaceholder') || 'Nhập lại mật khẩu'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
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
              disabled={isLoading || !fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()}
              className={cn(
                "w-full transition-all duration-300 font-medium",
                buttonBg,
                "text-white disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng ký...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  {t('auth.register.submitButton') || 'Đăng ký'}
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className={cn("text-sm", secondaryTextColor)}>
            {t('auth.register.hasAccount') || 'Đã có tài khoản?'}{' '}
            <Link
              to="/dang-nhap"
              className={cn("hover:underline font-medium transition-colors", linkColor)}
            >
              {t('auth.register.loginLink') || 'Đăng nhập'}
            </Link>
          </p>
        </CardFooter>
      </Card>

      {/* Helper text */}
      <div className={cn("mt-4 text-xs text-center max-w-md", secondaryTextColor)}>
        <p>
          📝 <strong>Đăng ký tài khoản:</strong> Tạo tài khoản mới để truy cập đầy đủ tính năng
        </p>
        <p className="mt-1">
          Thông tin của bạn sẽ được bảo mật an toàn
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
