import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Send, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
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
import { submitQuestion, QuestionSubmissionData } from "@/utils/api";

// Interface cho dữ liệu form
interface QuestionFormData {
  fullName: string;
  address: string;
  phoneNumber: string;
  email: string;
  category: string;
  title: string;
  content: string;
}

/**
 * CreateQuestionPage component for submitting new questions
 */
const CreateQuestionPage: React.FC = () => {
  const { theme } = useTheme();
  
  // Form state management
  const [formData, setFormData] = useState<QuestionFormData>({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
    category: "",
    title: "",
    content: "",
  });

  // Validation errors state
  const [errors, setErrors] = useState<Partial<QuestionFormData>>({});

  // Mutation để gửi câu hỏi
  const submitQuestionMutation = useMutation({
    mutationFn: submitQuestion,
    onSuccess: (data) => {
      toast.success("Gửi câu hỏi thành công!", {
        description: "Câu hỏi của bạn đã được gửi và đang chờ được duyệt.",
      });
      // Reset form
      setFormData({
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
        category: "",
        title: "",
        content: "",
      });
      setErrors({});
    },
    onError: (error: Error) => {
      toast.error("Gửi câu hỏi thất bại!", {
        description: error.message,
      });
    },
  });

  // Handle form field changes
  const handleInputChange = (field: keyof QuestionFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<QuestionFormData> = {};

    // Required fields
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ và tên là bắt buộc";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Tiêu đề là bắt buộc";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Nội dung câu hỏi là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin!", {
        description: "Có một số trường bắt buộc chưa được điền đầy đủ.",
      });
      return;
    }

    // Transform form data to API format
    const apiData: QuestionSubmissionData = {
      hoTen: formData.fullName.trim(),
      email: formData.email.trim(),
      tieuDe: formData.title.trim(),
      noiDung: formData.content.trim(),
    };

    // Add optional fields
    if (formData.phoneNumber.trim()) {
      apiData.dienThoai = formData.phoneNumber.trim();
    }

    if (formData.address.trim()) {
      apiData.congTy = formData.address.trim(); // Using address as company field
    }

    submitQuestionMutation.mutate(apiData);
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
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'} ${errors.fullName ? 'border-red-500' : ''}`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
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
                  Email<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'} ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
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
                  Tiêu đề<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Nhập tiêu đề câu hỏi"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'} ${errors.title ? 'border-red-500' : ''}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}
              </div>

              {/* Content - Spans 2 columns */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="content" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>
                  Nội dung câu hỏi<span className="text-red-500 ml-1">*</span>
                </Label>
                <Textarea
                  id="content"
                  placeholder="Nhập nội dung chi tiết câu hỏi của bạn..."
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  required
                  rows={6}
                  className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'} ${errors.content ? 'border-red-500' : ''}`}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm">{errors.content}</p>
                )}
              </div>

            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <Button 
                type="submit"
                disabled={submitQuestionMutation.isPending}
                className={`flex items-center gap-2 px-8 ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'} ${submitQuestionMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {submitQuestionMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {submitQuestionMutation.isPending ? 'Đang gửi...' : 'Gửi câu hỏi'}
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