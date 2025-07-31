import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  ChevronDown,
  Loader2
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/utils/translations";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContactForm } from "@/api/hooks";
import { useDepartmentsWithStaff } from "@/hooks/use-departments-with-staff";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLayout from "@/components/mobile/MobileLayout";

/**
 * ContactPage component with comprehensive contact information and forms
 * Responsive design that adapts to mobile (<768px) automatically
 */
const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
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
        title: t("contact.successTitle"),
        description: t("contact.successDesc"),
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
  }, [isSuccess, toast, reset, t]);

  // Handle submission error
  useEffect(() => {
    if (isError) {
      toast({
        title: t("contact.errorTitle"),
        description: error?.message || t("contact.errorDesc"),
        variant: "destructive",
      });
    }
  }, [isError, error, toast, t]);

  // Mobile Layout
  if (isMobile) {
    return (
      <MobileLayout>
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
          {/* Main Content - Mobile optimized with padding and spacing */}
        <main className="flex-1 px-4 py-4 space-y-4">
          
          {/* Mobile Breadcrumb */}
          <div className={`py-1 px-2 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg/50'}`}>
            <nav className={`flex items-center space-x-1 text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <Link 
                to={`/${language}`} 
                className={`transition-colors hover:underline ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {t("common.home")}
              </Link>
              <ChevronRight className="h-2.5 w-2.5" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {t("nav.contact")}
              </span>
            </nav>
          </div>
          
          {/* Page Header - Mobile optimized */}
          <div className="text-center py-3">
            <h1 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              {t("contact.contactWithUs")}
            </h1>
            <div className={`w-12 h-0.5 mx-auto mb-2 rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
            <p className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              {t("contact.managementBoard")}
            </p>
          </div>

          {/* Quick Contact Info - Priority for mobile */}
          <Card className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}`}>
            <CardHeader className="pb-4">
              <CardTitle className={`flex items-center gap-2 text-lg ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                <Phone className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                {t("contact.quickContact")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Phone - Most important for mobile */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-opacity-50 bg-gray-100 dark:bg-gray-800">
                <Phone className={`h-5 w-5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                <div className="flex-1">
                  <p className={`font-medium text-sm ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{t("contact.phone")}</p>
                  <a 
                    href="tel:02363666117" 
                    className={`text-lg font-semibold ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}
                  >
                    {t("contact.phoneNumber")}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-opacity-50 bg-gray-100 dark:bg-gray-800">
                <Mail className={`h-5 w-5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                <div className="flex-1">
                  <p className={`font-medium text-sm ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{t("contact.email")}</p>
                  <a 
                    href="mailto:dseza@danang.gov.vn" 
                    className={`text-base font-semibold break-all ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}
                  >
                    {t("contact.emailAddress")}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-opacity-50 bg-gray-100 dark:bg-gray-800">
                <Clock className={`h-5 w-5 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                <div className="flex-1">
                  <p className={`font-medium text-sm ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{t("contact.workingHours")}</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                    {t("contact.workingTimeMobile")}<br />
                    {t("contact.workingTimeMobileSat")}
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
                {t("contact.sendMessage")}
              </CardTitle>
              <CardDescription className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                {t("contact.contactDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="hoTen" className={`text-sm font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    {t("contact.name")} {t("contact.required")}
                  </Label>
                  <Input
                    id="hoTen"
                    placeholder={t("contact.namePlaceholder")}
                    value={contactForm.hoTen}
                    onChange={(e) => handleInputChange("hoTen", e.target.value)}
                    className={`h-11 text-sm ${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                    disabled={isPending}
                    required
                  />
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className={`text-sm font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    {t("contact.email")} {t("contact.required")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("contact.emailPlaceholder")}
                    value={contactForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`h-11 text-sm ${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                    disabled={isPending}
                    required
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="tieuDe" className={`text-sm font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    {t("contact.subject")} {t("contact.required")}
                  </Label>
                  <Input
                    id="tieuDe"
                    placeholder={t("contact.subjectPlaceholder")}
                    value={contactForm.tieuDe}
                    onChange={(e) => handleInputChange("tieuDe", e.target.value)}
                    className={`h-11 text-sm ${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                    disabled={isPending}
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="noiDung" className={`text-sm font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                    {t("contact.content")} {t("contact.required")}
                  </Label>
                  <Textarea
                    id="noiDung"
                    placeholder={t("contact.contentPlaceholder")}
                    rows={5}
                    value={contactForm.noiDung}
                    onChange={(e) => handleInputChange("noiDung", e.target.value)}
                    className={`text-sm resize-none ${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                    disabled={isPending}
                    required
                  />
                </div>

                {/* Submit Button - Mobile optimized */}
                <Button 
                  type="submit" 
                  className={`w-full h-11 text-sm font-medium ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'}`}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t("contact.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t("contact.sendMessage")}
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
                {t("contact.mapAndAddress")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Address */}
              <div className="p-3 rounded-lg bg-opacity-50 bg-gray-100 dark:bg-gray-800">
                <p className={`font-medium text-sm mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  {t("contact.address")}
                </p>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                  {t("contact.addressFull")}
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
                      {t("contact.departmentInfo")}
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 transform transition-transform ${isDepartmentsOpen ? 'rotate-180' : ''} ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} 
                    />
                  </CardTitle>
                  <CardDescription className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                    {t("contact.clickToViewDepartments")}
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
                      <p>{t("contact.loadDepartmentsError")}</p>
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
                              dangerouslySetInnerHTML={{ __html: department.description }} 
                            />
                          )}
                          
                          {department.staff && department.staff.length > 0 && (
                            <div className="space-y-3">
                              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                                {t("contact.staffList")} ({department.staff.length})
                              </p>
                              <div className="space-y-3">
                                {department.staff.map((staff) => (
                                  <div key={staff.id} className={`p-3 rounded-lg border ${theme === 'dark' ? 'border-dseza-dark-border/30 bg-dseza-dark-main-bg/20' : 'border-dseza-light-border/30 bg-dseza-light-main-bg/20'}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                      {staff.avatar && (
                                        <img
                                          src={staff.avatar}
                                          alt={staff.name}
                                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                        />
                                      )}
                                      <div className="flex-1">
                                        <h5 className={`font-medium text-base ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                                          {staff.name}
                                        </h5>
                                        {staff.position && (
                                          <p className={`text-xs ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                            {staff.position}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    
                                    {/* Contact Information */}
                                    <div className="space-y-2">
                                      {staff.email && (
                                        <div className="flex items-center gap-2">
                                          <Mail className={`h-4 w-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                                          <a 
                                            href={`mailto:${staff.email}`} 
                                            className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}
                                          >
                                            {staff.email}
                                          </a>
                                        </div>
                                      )}
                                      {staff.phone && (
                                        <div className="flex items-center gap-2">
                                          <Phone className={`h-4 w-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                                          <a 
                                            href={`tel:${staff.phone}`} 
                                            className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-primary hover:text-dseza-dark-primary/80' : 'text-dseza-light-primary hover:text-dseza-light-primary/80'}`}
                                          >
                                            {staff.phone}
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`text-center py-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      <p>{t("contact.noDepartments")}</p>
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
      </MobileLayout>
    );
  }

  // Desktop Layout (original)
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
                to={`/${language}`} 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                {t("common.home")}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                {t("nav.contact")}
              </span>
            </nav>
          </div>
        </div>

        {/* Contact Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Page Title */}
          <h1 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
            {t("contact.pageTitle")}  
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
                    {t("contact.generalInfo")}
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                    {t("contact.managementBoard")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="flex items-start gap-3">
                    <MapPin className={`h-5 w-5 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{t("contact.address")}</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                        {t("contact.addressFull")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className={`h-5 w-5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{t("contact.phone")}</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>{t("contact.phoneNumber")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className={`h-5 w-5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{t("contact.email")}</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>{t("contact.emailAddress")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Printer className={`h-5 w-5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{t("contact.fax")}</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>{t("contact.faxNumber")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className={`h-5 w-5 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{t("contact.workingHours")}</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                        {t("contact.workingTime")}<br />
                        {t("contact.workingTimeSat")}
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
                    {t("contact.mapTitle")}
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                    {t("contact.mapDesc")}
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
                    {t("contact.sendEmail")}
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                    {t("contact.contactDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hoTen" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("contact.name")} {t("contact.required")}</Label>
                        <Input
                          id="hoTen"
                            placeholder={t("contact.namePlaceholder")}
                          value={contactForm.hoTen}
                          onChange={(e) => handleInputChange("hoTen", e.target.value)}
                          className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                          disabled={isPending}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("contact.email")} {t("contact.required")}</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t("contact.emailPlaceholder")}
                          value={contactForm.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                          disabled={isPending}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tieuDe" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("contact.subject")} {t("contact.required")}</Label>
                      <Input
                        id="tieuDe"
                        placeholder={t("contact.subjectPlaceholder")}
                        value={contactForm.tieuDe}
                        onChange={(e) => handleInputChange("tieuDe", e.target.value)}
                        className={`${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'}`}
                        disabled={isPending}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="noiDung" className={theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}>{t("contact.content")} {t("contact.required")}</Label>
                      <Textarea
                        id="noiDung"
                        placeholder={t("contact.contentPlaceholder")}
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
                          {t("contact.sending")}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                            {t("contact.send")}
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
                    {t("contact.contactInfo")}
                  </CardTitle>
                  <CardDescription className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>
                    {t("contact.contactInfoWithDepts")}
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
                      <p>{t("contact.loadDepartmentsError")}</p>
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
                                  {t("contact.staffList")}
                                </h4>
                                <div className="overflow-x-auto">
                                  <table className={`w-full text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                    <thead>
                                      <tr className={`border-b ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
                                        <th className={`text-left py-2 px-3 font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                                          {t("contact.nameColumn")}
                                        </th>
                                        <th className={`text-left py-2 px-3 font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                                          {t("contact.positionColumn")}
                                        </th>
                                        <th className={`text-left py-2 px-3 font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                                          {t("contact.emailColumn")}
                                        </th>
                                        <th className={`text-left py-2 px-3 font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                                          {t("contact.phoneColumn")}
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
                                {t("contact.noStaff")}
                              </p>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className={`text-center py-8 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                      <p>{t("contact.noDepartments")}</p>
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