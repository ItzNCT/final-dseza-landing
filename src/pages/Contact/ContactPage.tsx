import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Fax, 
  Send, 
  User,
  Building,
  Clock,
  Users
} from "lucide-react";
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

/**
 * ContactPage component with comprehensive contact information and forms
 */
const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    toast({
      title: "Email đã được gửi!",
      description: "Chúng tôi sẽ phản hồi bạn trong vòng 24h.",
    });
    
    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

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
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Thông tin Liên hệ
        </h1>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Contact Info & Map */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* General Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Thông tin chung
                </CardTitle>
                <CardDescription>
                  Liên hệ trực tiếp với Ban Quản lý Khu Kinh tế Đà Nẵng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Địa chỉ</p>
                    <p className="text-muted-foreground text-sm">
                      Số 36 Bach Dang, Quận Hải Châu,<br />
                      Thành phố Đà Nẵng, Việt Nam
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Điện thoại</p>
                    <p className="text-muted-foreground text-sm">0236.3666.117</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground text-sm">dseza@danang.gov.vn</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Fax className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Fax</p>
                    <p className="text-muted-foreground text-sm">0236.3666.100</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Giờ làm việc</p>
                    <p className="text-muted-foreground text-sm">
                      Thứ 2 - Thứ 6: 7:30 - 11:30, 13:30 - 17:00<br />
                      Thứ 7: 7:30 - 11:30
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Google Map Simulation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Bản đồ
                </CardTitle>
                <CardDescription>
                  Vị trí Ban Quản lý Khu Kinh tế Đà Nẵng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-3 text-primary" />
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Gửi Email Liên hệ
                </CardTitle>
                <CardDescription>
                  Để lại thông tin, chúng tôi sẽ phản hồi bạn sớm nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên *</Label>
                      <Input
                        id="name"
                        placeholder="Nhập họ và tên của bạn"
                        value={contactForm.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        value={contactForm.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Tiêu đề *</Label>
                    <Input
                      id="subject"
                      placeholder="Nhập tiêu đề email"
                      value={contactForm.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Nội dung *</Label>
                    <Textarea
                      id="message"
                      placeholder="Nhập nội dung chi tiết..."
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    <Send className="h-4 w-4 mr-2" />
                    Gửi đi
                  </Button>

                </form>
              </CardContent>
            </Card>

            {/* Leadership Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Lãnh đạo Ban Quản lý
                </CardTitle>
                <CardDescription>
                  Thông tin liên hệ trực tiếp với lãnh đạo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leaders.map((leader) => (
                    <Card key={leader.id} className="bg-muted/30">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-foreground mb-1">
                          {leader.name}
                        </h4>
                        <p className="text-sm text-primary font-medium mb-3">
                          {leader.position}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{leader.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{leader.email}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Departments Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Các phòng ban chuyên môn
                </CardTitle>
                <CardDescription>
                  Thông tin liên hệ với các phòng ban chuyên môn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {departments.map((dept) => (
                    <Card key={dept.id} className="bg-muted/30">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-foreground mb-2">
                          {dept.name}
                        </h4>
                        
                        <div className="space-y-2 mb-3">
                          <p className="text-sm">
                            <span className="font-medium">Trưởng phòng:</span>{" "}
                            <span className="text-muted-foreground">{dept.head}</span>
                          </p>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{dept.phone}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{dept.email}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-1">Chức năng chính:</p>
                          <ul className="text-xs text-muted-foreground space-y-0.5">
                            {dept.functions.map((func, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></span>
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
  );
};

export default ContactPage; 