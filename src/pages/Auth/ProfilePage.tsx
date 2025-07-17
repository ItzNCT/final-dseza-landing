import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'
import { useTranslation } from '@/utils/translations'
import { useChangePassword } from '@/api/hooks'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, Loader2, User, Key, Save, ArrowLeft } from 'lucide-react'

const ProfilePage: React.FC = () => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  // Password change form state
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  // Change password mutation hook
  const {
    mutate: changePassword,
    isPending: isLoading,
    isSuccess,
    isError,
    error: mutationError,
    data: changePasswordData,
    reset
  } = useChangePassword()

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/dang-nhap')
    }
  }, [user, navigate])

  // Handle change password success/error
  useEffect(() => {
    if (isSuccess && changePasswordData) {
      // Show success toast
      toast({
        title: "Đổi mật khẩu thành công!",
        description: changePasswordData.message || "Mật khẩu của bạn đã được cập nhật.",
        variant: "default",
      })

      // Clear form
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
      setError('')
    }

    if (isError && mutationError) {
      setError(mutationError.message || 'Có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại.')
      toast({
        title: "Lỗi đổi mật khẩu",
        description: mutationError.message || 'Có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại.',
        variant: "destructive",
      })
    }
  }, [isSuccess, isError, changePasswordData, mutationError, toast])

  // Validation function for password change
  const validatePasswordForm = (): boolean => {
    if (!currentPassword.trim()) {
      setError('Vui lòng nhập mật khẩu hiện tại')
      return false
    }

    if (!newPassword.trim()) {
      setError('Vui lòng nhập mật khẩu mới')
      return false
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự')
      return false
    }

    if (!confirmNewPassword.trim()) {
      setError('Vui lòng xác nhận mật khẩu mới')
      return false
    }

    if (newPassword !== confirmNewPassword) {
      setError('Mật khẩu mới và xác nhận không khớp')
      return false
    }

    if (currentPassword === newPassword) {
      setError('Mật khẩu mới phải khác mật khẩu hiện tại')
      return false
    }

    return true
  }

  // Handle password change submission
  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validatePasswordForm()) {
      return
    }

    // Clear previous errors
    setError('')
    reset() // Reset mutation state

    // Prepare change password data
    const changePasswordFormData = {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmNewPassword
    }

    console.log('Password change attempt:', { 
      user_id: user?.id,
      email: user?.email 
    })

    // Trigger change password mutation
    changePassword(changePasswordFormData)
  }

  // Show loading if user data is not available
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
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

      {/* Back Button */}
      <div className="w-full max-w-2xl mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className={cn("flex items-center gap-2", linkColor)}
        >
          <ArrowLeft className="h-4 w-4" />
          Về trang chủ
        </Button>
      </div>

      {/* Profile Card */}
      <Card className={cn("w-full max-w-2xl border", cardBg, borderColor)}>
        <CardHeader className="text-center">
          <CardTitle className={cn("text-2xl font-bold flex items-center justify-center gap-2", textColor)}>
            <User className="h-6 w-6" />
            {t('profile.title') || 'Thông tin Tài khoản'}
          </CardTitle>
          <CardDescription className={secondaryTextColor}>
            {t('profile.description') || 'Quản lý thông tin cá nhân và bảo mật tài khoản'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* User Information Section */}
          <div className="space-y-4">
            <h3 className={cn("text-lg font-semibold", textColor)}>
              Thông tin cá nhân
            </h3>
            
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className={textColor}>
                {t('profile.name') || 'Tên người dùng'}
              </Label>
              <Input
                id="name"
                type="text"
                value={user.name || ''}
                disabled
                className={cn(
                  "transition-all duration-300",
                  inputBg,
                  textColor,
                  borderColor,
                  "disabled:opacity-70 disabled:cursor-not-allowed"
                )}
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className={textColor}>
                {t('profile.email') || 'Địa chỉ Email'}
              </Label>
              <Input
                id="email"
                type="email"
                value={user.email || ''}
                disabled
                className={cn(
                  "transition-all duration-300",
                  inputBg,
                  textColor,
                  borderColor,
                  "disabled:opacity-70 disabled:cursor-not-allowed"
                )}
              />
            </div>

            {/* Role Field */}
            <div className="space-y-2">
              <Label htmlFor="role" className={textColor}>
                {t('profile.role') || 'Vai trò'}
              </Label>
              <Input
                id="role"
                type="text"
                value={user.role || 'authenticated'}
                disabled
                className={cn(
                  "transition-all duration-300",
                  inputBg,
                  textColor,
                  borderColor,
                  "disabled:opacity-70 disabled:cursor-not-allowed"
                )}
              />
            </div>
          </div>

          <Separator className={borderColor} />

          {/* Change Password Section */}
          <div className="space-y-4">
            <h3 className={cn("text-lg font-semibold flex items-center gap-2", textColor)}>
              <Key className="h-5 w-5" />
              Đổi mật khẩu
            </h3>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className={textColor}>
                  {t('profile.currentPassword') || 'Mật khẩu hiện tại'}
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value)
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

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className={textColor}>
                  {t('profile.newPassword') || 'Mật khẩu mới'}
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value)
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

              {/* Confirm New Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmNewPassword" className={textColor}>
                  {t('profile.confirmNewPassword') || 'Xác nhận mật khẩu mới'}
                </Label>
                <Input
                  id="confirmNewPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value)
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

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isLoading || !currentPassword.trim() || !newPassword.trim() || !confirmNewPassword.trim()}
                className={cn(
                  "w-full transition-all duration-300 font-medium",
                  buttonBg,
                  "text-white disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang cập nhật...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {t('profile.saveChanges') || 'Lưu thay đổi'}
                  </>
                )}
              </Button>
            </form>
          </div>

          <Separator className={borderColor} />

          {/* Logout Section */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={logout}
              className={cn(
                "transition-all duration-300",
                "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              )}
            >
              Đăng xuất
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Helper text */}
      <div className={cn("mt-4 text-xs text-center max-w-md", secondaryTextColor)}>
        <p>
          🔒 <strong>Bảo mật:</strong> Thông tin tài khoản được bảo vệ an toàn
        </p>
        <p className="mt-1">
          Đổi mật khẩu thường xuyên để đảm bảo an toàn tài khoản
        </p>
      </div>
    </div>
  )
}

export default ProfilePage
