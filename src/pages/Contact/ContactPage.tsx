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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContactForm } from "@/api/hooks";
import { useDepartmentsWithStaff } from "@/hooks/use-departments-with-staff";

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
  
  // Use the departments with staff hook
  const { data: departments, isLoading: isDepartmentsLoading, isError: isDepartmentsError } = useDepartmentsWithStaff();

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
                    Ban quản lý khu công nghệ cao và các khu công nghiệp Đà Nẵng
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="flex items-start gap-3">
                    <MapPin className={`h-5 w-5 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Địa chỉ</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      Lô A17, đường Trung tâm, Khu công nghệ cao,<br />
                        xã Hòa Liên, huyện Hòa Vang, Thành phố Đà Nẵng, Việt Nam
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className={`h-5 w-5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Điện thoại</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>0236 3666117</p>
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
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>0236 383011</p>
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
                  <div className="rounded-lg overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3833.4418592568395!2d108.0822033!3d16.0944277!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421f89a43bfb03%3A0x40f66e6ba7346b99!2zQmFuIHF14bqjbiBsw70gS2h1IGPDtG5nIG5naOG7hyBjYW8gdsOgIGPDoWMgS2h1IGPDtG5nIG5naGnhu4dwIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1736085791335!5m2!1svi!2s" 
                      width="100%" 
                      height="256" 
                      style={{border: 0}} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ban quản lý Khu công nghệ cao và các Khu công nghiệp Đà Nẵng"
                    />
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

              {/* Departments Information */}
              <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    <Users className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    Thông tin liên hệ
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                    Thông tin liên hệ với các phòng ban chuyên môn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isDepartmentsLoading ? (
                    <div className="space-y-4">
                      {[...Array(4)].map((_, index) => (
                        <div key={index} className="space-y-3">
                          <Skeleton className={`h-12 w-full ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`} />
                          <Skeleton className={`h-8 w-3/4 ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`} />
                        </div>
                      ))}
                    </div>
                  ) : isDepartmentsError ? (
                    <div className={`text-center py-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      <p>Không thể tải thông tin phòng ban. Vui lòng thử lại sau.</p>
                    </div>
                  ) : departments && departments.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {departments.map((department) => (
                        <AccordionItem
                          key={department.id}
                          value={department.id}
                          className={theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}
                        >
                          <AccordionTrigger className={`hover:no-underline ${theme === 'dark' ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary' : 'text-dseza-light-main-text hover:text-dseza-light-primary'}`}>
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-dseza-dark-main-bg/50' : 'bg-dseza-light-main-bg/50'}`}>
                                {department.icon ? (
                                  <img
                                    src={department.icon.url}
                                    alt={department.icon.alt}
                                    className="w-8 h-8 object-contain"
                                    onError={(e) => {
                                      console.error('🚫 Icon failed to load:', department.icon?.url);
                                      console.log('📊 Department:', department.title);
                                    }}
                                  />
                                ) : (
                                  <Users className={`w-6 h-6 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} />
                                )}
                              </div>
                              <span className="font-semibold text-left">{department.title}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            {department.description && (
                              <div className={`mb-4 pb-4 border-b ${theme === 'dark' ? 'text-dseza-dark-secondary-text border-dseza-dark-border' : 'text-dseza-light-secondary-text border-dseza-light-border'}`}>
                                <div dangerouslySetInnerHTML={{ __html: department.description }} />
                              </div>
                            )}
                            
                            {department.staff && department.staff.length > 0 ? (
                              <div className="space-y-4">
                                <h4 className={`font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                                  Danh sách nhân sự
                                </h4>
                                <div className="overflow-x-auto">
                                  <table className={`w-full text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                    <thead>
                                      <tr className={`border-b ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                        <th className={`text-left py-2 px-3 font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                                          Họ tên
                                        </th>
                                        <th className={`text-left py-2 px-3 font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                                          Chức vụ
                                        </th>
                                        <th className={`text-left py-2 px-3 font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                                          Email
                                        </th>
                                        <th className={`text-left py-2 px-3 font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                                          Số điện thoại
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {department.staff.map((staff) => (
                                        <tr
                                          key={staff.id}
                                          className={`border-b ${theme === 'dark' ? 'border-dseza-dark-border/50' : 'border-dseza-light-border/50'}`}
                                        >
                                          <td className="py-3 px-3">
                                            <div className="flex items-center gap-3">
                                              {staff.avatar && (
                                                <img
                                                  src={staff.avatar}
                                                  alt={staff.name}
                                                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                                />
                                              )}
                                              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                                                {staff.name}
                                              </span>
                                            </div>
                                          </td>
                                          <td className="py-3 px-3">
                                            {staff.position || '-'}
                                          </td>
                                          <td className="py-3 px-3">
                                            {staff.email ? (
                                              <a
                                                href={`mailto:${staff.email}`}
                                                className={`hover:underline ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}
                                              >
                                                {staff.email}
                                              </a>
                                            ) : (
                                              '-'
                                            )}
                                          </td>
                                          <td className="py-3 px-3">
                                            {staff.phone ? (
                                              <a
                                                href={`tel:${staff.phone}`}
                                                className={`hover:underline ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}
                                              >
                                                {staff.phone}
                                              </a>
                                            ) : (
                                              '-'
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ) : (
                              <p className={`text-center py-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                Chưa có thông tin nhân sự
                              </p>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className={`text-center py-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      <p>Chưa có thông tin phòng ban</p>
                    </div>
                  )}
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