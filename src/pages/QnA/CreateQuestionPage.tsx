import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Send } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * CreateQuestionPage component for submitting new questions
 */
const CreateQuestionPage: React.FC = () => {
  const { theme } = useTheme();
  
  // Form state management
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
    category: "",
    title: "",
    content: "",
  });

  // Handle form field changes
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Implement form submission logic
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Header - Complete header structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="flex-1 pt-52">
        {/* Breadcrumb */}
        <div className={`py-2 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <Link 
                to="/" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Trang chủ
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to="/tien-ich/hoi-dap" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Hỏi đáp
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Tạo câu hỏi
              </span>
            </nav>
          </div>
        </div>

        {/* Form Content */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
          
          {/* Page Title */}
          <h1 className={`text-3xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
            GỬI CÂU HỎI CHO CHÚNG TÔI
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg' : 'bg-dseza-light-secondary-bg'}`}>
            
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  Họ và tên<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Nhập họ và tên của bạn"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  required
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  Địa chỉ
                </Label>
                <Input
                  id="address"
                  placeholder="Nhập địa chỉ của bạn"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  Số điện thoại
                </Label>
                <Input
                  id="phoneNumber"
                  placeholder="Nhập số điện thoại của bạn"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  Lĩnh vực
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'}`}>
                    <SelectValue placeholder="Chọn lĩnh vực" />
                  </SelectTrigger>
                  <SelectContent className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'}`}>
                    <SelectItem value="thu-tuc-hanh-chinh">Thủ tục hành chính</SelectItem>
                    <SelectItem value="chinh-sach-uu-dai">Chính sách ưu đãi</SelectItem>
                    <SelectItem value="quy-hoach-xay-dung">Quy hoạch xây dựng</SelectItem>
                    <SelectItem value="chinh-sach-lao-dong">Chính sách lao động</SelectItem>
                    <SelectItem value="giay-phep-kinh-doanh">Giấy phép kinh doanh</SelectItem>
                    <SelectItem value="ho-tro-khoi-nghiep">Hỗ trợ khởi nghiệp</SelectItem>
                    <SelectItem value="ha-tang-ky-thuat">Hạ tầng kỹ thuật</SelectItem>
                    <SelectItem value="khac">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Title - Spans 2 columns */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  Tiêu đề
                </Label>
                <Input
                  id="title"
                  placeholder="Nhập tiêu đề câu hỏi"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                />
              </div>

              {/* Content - Spans 2 columns */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="content" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  Nội dung câu hỏi
                </Label>
                <Textarea
                  id="content"
                  placeholder="Nhập nội dung chi tiết câu hỏi của bạn..."
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  rows={6}
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                />
              </div>

            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <Button 
                type="submit"
                className={`flex items-center gap-2 px-8 ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'}`}
              >
                <Send className="h-4 w-4" />
                Gửi câu hỏi
              </Button>
            </div>

          </form>

          {/* Additional Information */}
          <div className={`mt-8 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
              Lưu ý khi gửi câu hỏi:
            </h3>
            <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}`}>
              <li>• Vui lòng điền đầy đủ thông tin họ tên để chúng tôi có thể hỗ trợ bạn tốt nhất</li>
              <li>• Nêu rõ nội dung câu hỏi để nhận được câu trả lời chính xác</li>
              <li>• Chúng tôi sẽ phản hồi trong vòng 24-48 giờ làm việc</li>
              <li>• Các câu hỏi thường gặp sẽ được công khai để hỗ trợ cộng đồng</li>
            </ul>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CreateQuestionPage; 