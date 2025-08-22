import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  User,
  Building,
  Users,
  ChevronDown,
  Loader2
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContactForm } from "@/api/hooks";
import { useDepartmentsWithStaff } from "@/hooks/use-departments-with-staff";

/**
 * Mobile-optimized Contact Page
 * 
 * This page provides a streamlined contact experience for mobile users
 * with vertical layout, larger touch targets, and simplified navigation.
 */
const ContactMobilePage: React.FC = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [contactForm, setContactForm] = useState({
    hoTen: "",
    email: "",
    tieuDe: "",
    noiDung: "",
  });
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);

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

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* MobileHeader is automatically included by MobileLayout */}
      
      {/* Main Content - Mobile optimized with padding and spacing */}
      <main className="flex-1 px-4 py-6 space-y-6">
        
        {/* Page Title */}
        <div className="text-center py-4">
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
            Liên hệ với chúng tôi
          </h1>
          <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
            Ban quản lý Khu Kinh tế Đà Nẵng
          </p>
        </div>

        {/* Quick Contact Info - Priority for mobile */}
        <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
          <CardHeader className="pb-4">
            <CardTitle className={`flex items-center gap-2 text-lg ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              <Phone className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
              Liên hệ nhanh
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Phone - Most important for mobile */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-opacity-50 bg-gray-100 dark:bg-gray-800">
              <Phone className={`h-5 w-5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
              <div className="flex-1">
                <p className={`font-medium text-sm ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Điện thoại</p>
                <a 
                  href="tel:02363666117" 
                  className={`text-lg font-semibold ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}
                >
                  0236 3666117
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-opacity-50 bg-gray-100 dark:bg-gray-800">
              <Mail className={`h-5 w-5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
              <div className="flex-1">
                <p className={`font-medium text-sm ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Email</p>
                <a 
                  href="mailto:dseza@danang.gov.vn" 
                  className={`text-base font-semibold break-all ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}
                >
                  dseza@danang.gov.vn
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-opacity-50 bg-gray-100 dark:bg-gray-800">
              <Clock className={`h-5 w-5 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
              <div className="flex-1">
                <p className={`font-medium text-sm ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Giờ làm việc</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  T2-T6: 7:30-11:30, 13:30-17:00<br />
                  T7: 7:30-11:30
                </p>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Contact Form - Mobile optimized */}
        <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
          <CardHeader className="pb-4">
            <CardTitle className={`flex items-center gap-2 text-lg ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              <Send className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
              Gửi tin nhắn
            </CardTitle>
            <CardDescription className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              Để lại thông tin, chúng tôi sẽ phản hồi sớm nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div className="space-y-3">
                <Label htmlFor="hoTen" className={`text-base ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Họ và tên *
                </Label>
                <Input
                  id="hoTen"
                  placeholder="Nhập họ và tên của bạn"
                  value={contactForm.hoTen}
                  onChange={(e) => handleInputChange("hoTen", e.target.value)}
                  className={`h-12 text-base ${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                  disabled={isPending}
                  required
                />
              </div>
              
              {/* Email */}
              <div className="space-y-3">
                <Label htmlFor="email" className={`text-base ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={contactForm.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`h-12 text-base ${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                  disabled={isPending}
                  required
                />
              </div>

              {/* Subject */}
              <div className="space-y-3">
                <Label htmlFor="tieuDe" className={`text-base ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Tiêu đề *
                </Label>
                <Input
                  id="tieuDe"
                  placeholder="Nhập tiêu đề email"
                  value={contactForm.tieuDe}
                  onChange={(e) => handleInputChange("tieuDe", e.target.value)}
                  className={`h-12 text-base ${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                  disabled={isPending}
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-3">
                <Label htmlFor="noiDung" className={`text-base ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Nội dung *
                </Label>
                <Textarea
                  id="noiDung"
                  placeholder="Nhập nội dung chi tiết..."
                  rows={6}
                  value={contactForm.noiDung}
                  onChange={(e) => handleInputChange("noiDung", e.target.value)}
                  className={`text-base resize-none ${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                  disabled={isPending}
                  required
                />
              </div>

              {/* Submit Button - Large for mobile */}
              <Button 
                type="submit" 
                className={`w-full h-12 text-base font-semibold ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'}`}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Gửi tin nhắn
                  </>
                )}
              </Button>

            </form>
          </CardContent>
        </Card>

        {/* Address & Map */}
        <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
          <CardHeader className="pb-4">
            <CardTitle className={`flex items-center gap-2 text-lg ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              <MapPin className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
              Địa chỉ & Bản đồ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Address */}
            <div className="p-3 rounded-lg bg-opacity-50 bg-gray-100 dark:bg-gray-800">
              <p className={`font-medium text-sm mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Địa chỉ
              </p>
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                Lô A17, đường Trung tâm, Khu công nghệ cao,
                xã Hòa Liên, huyện Hòa Vang, 
                Thành phố Đà Nẵng, Việt Nam
              </p>
            </div>

            {/* Google Map - Mobile optimized height */}
            <div className="rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3833.4418592568395!2d108.0822033!3d16.0944277!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421f89a43bfb03%3A0x40f66e6ba7346b99!2zQmFuIHF14bqjbiBsw70gS2h1IGPDtG5nIG5naOG7hyBjYW8gdsOgIGPDoWMgS2h1IGPDtG5nIG5naGnhu4dwIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1736085791335!5m2!1svi!2s" 
                width="100%" 
                height="200" 
                style={{border: 0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ban quản lý Khu công nghệ cao và các Khu công nghiệp Đà Nẵng"
              />
            </div>

          </CardContent>
        </Card>

        {/* Departments - Collapsible for mobile */}
        <Collapsible open={isDepartmentsOpen} onOpenChange={setIsDepartmentsOpen}>
          <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-4 cursor-pointer hover:bg-opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <CardTitle className={`flex items-center justify-between text-lg ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  <div className="flex items-center gap-2">
                    <Users className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    Thông tin phòng ban
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 transform transition-transform ${isDepartmentsOpen ? 'rotate-180' : ''} ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} 
                  />
                </CardTitle>
                <CardDescription className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  Nhấn để xem chi tiết các phòng ban
                </CardDescription>
              </CardHeader>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <CardContent>
                {isDepartmentsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="space-y-3">
                        <Skeleton className={`h-16 w-full ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`} />
                      </div>
                    ))}
                  </div>
                ) : isDepartmentsError ? (
                  <div className={`text-center py-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                    <p>Không thể tải thông tin phòng ban</p>
                  </div>
                ) : departments && departments.length > 0 ? (
                  <div className="space-y-4">
                    {departments.map((department) => (
                      <div
                        key={department.id}
                        className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-dseza-dark-border bg-dseza-dark-main-bg/30' : 'border-dseza-light-border bg-dseza-light-main-bg/30'}`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          {department.icon ? (
                            <img
                              src={department.icon.url}
                              alt={department.icon.alt}
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <Building className={`w-6 h-6 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} />
                          )}
                          <h4 className={`font-semibold text-base ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                            {department.title}
                          </h4>
                        </div>
                        
                        {department.description && (
                          <div 
                            className={`text-sm mb-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(department.description) }} 
                          />
                        )}
                        
                        {department.staff && department.staff.length > 0 && (
                          <div className="space-y-2">
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                              Nhân sự ({department.staff.length})
                            </p>
                            <div className="space-y-2">
                              {department.staff.slice(0, 3).map((staff) => (
                                <div key={staff.id} className="flex items-center justify-between text-sm">
                                  <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                                    {staff.name}
                                  </span>
                                  {staff.email && (
                                    <a 
                                      href={`mailto:${staff.email}`} 
                                      className={`${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}
                                    >
                                      <Mail className="h-4 w-4" />
                                    </a>
                                  )}
                                </div>
                              ))}
                              {department.staff.length > 3 && (
                                <p className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                  +{department.staff.length - 3} nhân viên khác
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                    <p>Chưa có thông tin phòng ban</p>
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactMobilePage; 