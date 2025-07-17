import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Printer, 
  Send, 
  User,
  Building,
  Clock,
  Users,
  ChevronRight,
  Loader2
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContactForm } from "@/api/hooks";

/**
 * ContactPage component with comprehensive contact information and forms
 */
const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [contactForm, setContactForm] = useState({
    hoTen: "",
    email: "",
    tieuDe: "",
    noiDung: "",
  });

  // Use the contact form submission hook
  const { mutate, isPending, isSuccess, isError, error, reset } = useSubmitContactForm();

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit the contact form using the hook
    mutate(contactForm);
  };

  // Handle successful submission
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Email đã được gửi thành công!",
        description: "Chúng tôi sẽ phản hồi bạn trong vòng 24 giờ.",
        variant: "default",
      });
      
      // Reset form
      setContactForm({
        hoTen: "",
        email: "",
        tieuDe: "",
        noiDung: "",
      });
      
      // Reset mutation state
      reset();
    }
  }, [isSuccess, toast, reset]);

  // Handle submission error
  useEffect(() => {
    if (isError) {
      toast({
        title: "Có lỗi xảy ra!",
        description: error?.message || "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  const leaders = [
    {
      id: 1,
      name: "Ông Nguyễn Văn A",
      position: "Giám đốc Ban Quản lý",
      phone: "0236.3666.101",
      email: "giamdoc@dseza.danang.gov.vn",
    },
    {
      id: 2,
      name: "Bà Trần Thị B", 
      position: "Phó Giám đốc",
      phone: "0236.3666.102",
      email: "phogiamdoc@dseza.danang.gov.vn",
    },
    {
      id: 3,
      name: "Ông Lê Văn C",
      position: "Phó Giám đốc",
      phone: "0236.3666.103", 
      email: "phogiamdoc2@dseza.danang.gov.vn",
    },
  ];

  const departments = [
    {
      id: 1,
      name: "Phòng Hành chính - Tổng hợp",
      head: "Ông Phạm Văn D",
      phone: "0236.3666.111",
      email: "hanhchinh@dseza.danang.gov.vn",
      functions: ["Quản lý hành chính", "Tổ chức nhân sự", "Tài chính kế toán"],
    },
    {
      id: 2,
      name: "Phòng Xúc tiến Đầu tư",
      head: "Bà Nguyễn Thị E",
      phone: "0236.3666.122",
      email: "xuctien@dseza.danang.gov.vn", 
      functions: ["Xúc tiến đầu tư", "Hỗ trợ nhà đầu tư", "Quan hệ đối tác"],
    },
    {
      id: 3,
      name: "Phòng Quy hoạch - Kiến trúc",
      head: "Ông Hoàng Văn F",
      phone: "0236.3666.133",
      email: "quyhoach@dseza.danang.gov.vn",
      functions: ["Quy hoạch tổng thể", "Thiết kế kiến trúc", "Phê duyệt dự án"],
    },
    {
      id: 4,
      name: "Phòng Hạ tầng Kỹ thuật",
      head: "Ông Vũ Văn G",
      phone: "0236.3666.144",
      email: "hatang@dseza.danang.gov.vn",
      functions: ["Quản lý hạ tầng", "Kỹ thuật công nghệ", "Bảo trì hệ thống"],
    },
  ];

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
              <a 
                href="/" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Trang chủ
              </a>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Liên hệ
              </span>
            </nav>
          </div>
        </div>

        {/* Contact Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Page Title */}
          <h1 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
            Thông tin Liên hệ
          </h1>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Contact Info & Map */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* General Contact Information */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    <Building className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    Thông tin chung
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                    Liên hệ trực tiếp với Ban Quản lý Khu Kinh tế Đà Nẵng
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="flex items-start gap-3">
                    <MapPin className={`h-5 w-5 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Địa chỉ</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                        Số 36 Bach Dang, Quận Hải Châu,<br />
                        Thành phố Đà Nẵng, Việt Nam
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className={`h-5 w-5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Điện thoại</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>0236.3666.117</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className={`h-5 w-5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Email</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>dseza@danang.gov.vn</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Printer className={`h-5 w-5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Fax</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>0236.3666.100</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className={`h-5 w-5 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Giờ làm việc</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                        Thứ 2 - Thứ 6: 7:30 - 11:30, 13:30 - 17:00<br />
                        Thứ 7: 7:30 - 11:30
                      </p>
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Google Map Simulation */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    <MapPin className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    Bản đồ
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                    Vị trí Ban Quản lý Khu Kinh tế Đà Nẵng
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`rounded-lg h-64 flex items-center justify-center border-2 border-dashed ${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border' : 'bg-dseza-light-main-bg border-dseza-light-border'}`}>
                    <div className={`text-center ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      <MapPin className={`h-12 w-12 mx-auto mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                      <p className="font-medium">Google Map</p>
                      <p className="text-sm">Số 36 Bach Dang, Hải Châu, Đà Nẵng</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Right Column - Forms & Information */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Contact Form */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    <Send className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    Gửi Email Liên hệ
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                    Để lại thông tin, chúng tôi sẽ phản hồi bạn sớm nhất
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hoTen" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Họ và tên *</Label>
                        <Input
                          id="hoTen"
                          placeholder="Nhập họ và tên của bạn"
                          value={contactForm.hoTen}
                          onChange={(e) => handleInputChange("hoTen", e.target.value)}
                          className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                          disabled={isPending}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@email.com"
                          value={contactForm.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                          disabled={isPending}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tieuDe" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Tiêu đề *</Label>
                      <Input
                        id="tieuDe"
                        placeholder="Nhập tiêu đề email"
                        value={contactForm.tieuDe}
                        onChange={(e) => handleInputChange("tieuDe", e.target.value)}
                        className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                        disabled={isPending}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="noiDung" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>Nội dung *</Label>
                      <Textarea
                        id="noiDung"
                        placeholder="Nhập nội dung chi tiết..."
                        rows={6}
                        value={contactForm.noiDung}
                        onChange={(e) => handleInputChange("noiDung", e.target.value)}
                        className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                        disabled={isPending}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className={`w-full md:w-auto ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'}`}
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Gửi đi
                        </>
                      )}
                    </Button>

                  </form>
                </CardContent>
              </Card>

              {/* Leadership Information */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    <User className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    Lãnh đạo Ban Quản lý
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                    Thông tin liên hệ trực tiếp với lãnh đạo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {leaders.map((leader) => (
                      <Card key={leader.id} className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg/50 border-dseza-dark-border' : 'bg-dseza-light-main-bg/50 border-dseza-light-border'}`}>
                        <CardContent className="p-4">
                          <h4 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                            {leader.name}
                          </h4>
                          <p className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                            {leader.position}
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className={`h-3 w-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} />
                              <span className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>{leader.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className={`h-3 w-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} />
                              <span className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>{leader.email}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Departments Information */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    <Users className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    Các phòng ban chuyên môn
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                    Thông tin liên hệ với các phòng ban chuyên môn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {departments.map((dept) => (
                      <Card key={dept.id} className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg/50 border-dseza-dark-border' : 'bg-dseza-light-main-bg/50 border-dseza-light-border'}`}>
                        <CardContent className="p-4">
                          <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                            {dept.name}
                          </h4>
                          
                          <div className="space-y-2 mb-3">
                            <p className="text-sm">
                              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Trưởng phòng:</span>{" "}
                              <span className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>{dept.head}</span>
                            </p>
                            
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className={`h-3 w-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} />
                              <span className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>{dept.phone}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className={`h-3 w-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} />
                              <span className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>{dept.email}</span>
                            </div>
                          </div>

                          <div>
                            <p className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Chức năng chính:</p>
                            <ul className={`text-xs space-y-0.5 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                              {dept.functions.map((func, index) => (
                                <li key={index} className="flex items-center gap-1">
                                  <span className={`w-1 h-1 rounded-full flex-shrink-0 ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></span>
                                  {func}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage; 