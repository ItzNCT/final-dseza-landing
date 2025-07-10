import React from "react";
import { ChevronRight, Calendar, Tag, Share2, Facebook, Twitter, Mail, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import TopBar from "@/components/hero/TopBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

/**
 * ArticleDetailPage component for displaying detailed article content
 */
const ArticleDetailPage: React.FC = () => {
  const { toast } = useToast();

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = "Đà Nẵng công bố kế hoạch phát triển Khu công nghệ cao giai đoạn mới";
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          toast({
            title: "Đã sao chép!",
            description: "Đường dẫn bài viết đã được sao chép vào clipboard.",
          });
        });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <TopBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="pt-32">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">
                Trang chủ
              </a>
              <ChevronRight className="h-4 w-4" />
              <a href="/tin-tuc" className="hover:text-primary transition-colors">
                Tin tức
              </a>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">
                Đà Nẵng công bố kế hoạch phát triển Khu công nghệ cao giai đoạn mới
              </span>
            </nav>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                Đà Nẵng công bố kế hoạch phát triển Khu công nghệ cao giai đoạn mới
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Ngày đăng: 10/07/2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span>Chuyên mục: Đầu tư</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8">
              <img
                src="https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=DSEZA+Technology+Park"
                alt="Khu công nghệ cao Đà Nẵng"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <p className="text-sm text-muted-foreground mt-2 text-center italic">
                Hình ảnh minh họa Khu công nghệ cao Đà Nẵng
              </p>
            </div>

            {/* Article Content */}
            <div className="prose max-w-none mt-8">
              <p className="text-lg leading-relaxed mb-6">
                Thành phố Đà Nẵng vừa công bố kế hoạch phát triển Khu công nghệ cao giai đoạn mới với tổng vốn đầu tư dự kiến lên đến 5 tỷ USD, hướng tới mục tiêu trở thành trung tâm công nghệ hàng đầu khu vực Đông Nam Á.
              </p>

              <p className="mb-6">
                Theo kế hoạch được phê duyệt, Khu công nghệ cao Đà Nẵng sẽ được mở rộng thêm 2.000 ha, nâng tổng diện tích lên 5.000 ha. Dự án sẽ tập trung phát triển các lĩnh vực công nghệ thông tin, điện tử, viễn thông, công nghệ sinh học và năng lượng tái tạo.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Các ưu đãi đặc biệt cho nhà đầu tư</h2>
              
              <p className="mb-6">
                Để thu hút đầu tư, thành phố Đà Nẵng đã đề xuất một loạt các chính sách ưu đãi hấp dẫn:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Miễn thuế thu nhập doanh nghiệp trong 4 năm đầu</li>
                <li>Giảm 50% thuế thu nhập doanh nghiệp trong 9 năm tiếp theo</li>
                <li>Hỗ trợ 100% chi phí đào tạo nhân lực trong 2 năm đầu</li>
                <li>Cung cấp hạ tầng kỹ thuật hoàn thiện với giá ưu đãi</li>
                <li>Hỗ trợ thủ tục hành chính một cửa, rút ngắn thời gian cấp phép</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Tầm nhìn phát triển bền vững</h2>
              
              <p className="mb-6">
                Ông Lê Trung Chinh, Chủ tịch UBND thành phố Đà Nẵng, chia sẻ: "Chúng tôi không chỉ xây dựng một khu công nghệ cao thông thường, mà hướng tới tạo ra một hệ sinh thái công nghệ toàn diện, nơi các doanh nghiệp có thể phát triển bền vững và đóng góp vào sự phát triển kinh tế của địa phương."
              </p>

              <p className="mb-6">
                Dự án cũng chú trọng đến việc bảo vệ môi trường với cam kết 40% diện tích sẽ được dành cho không gian xanh và các công trình công cộng phục vụ cộng đồng.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Lộ trình triển khai</h2>
              
              <p className="mb-6">
                Giai đoạn 1 (2025-2027): Hoàn thiện hạ tầng kỹ thuật và thu hút 50 doanh nghiệp đầu tiên
              </p>
              
              <p className="mb-6">
                Giai đoạn 2 (2028-2030): Mở rộng quy mô và phát triển các dự án nghiên cứu phát triển
              </p>
              
              <p className="mb-6">
                Giai đoạn 3 (2031-2035): Hoàn thiện toàn bộ dự án và trở thành trung tâm công nghệ hàng đầu khu vực
              </p>
            </div>

            {/* Tags Section */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Tags liên quan:</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                  Đầu tư
                </Badge>
                <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                  Công nghệ cao
                </Badge>
                <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                  DSEZA
                </Badge>
                <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                  Đà Nẵng
                </Badge>
                <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                  Khu kinh tế
                </Badge>
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Chia sẻ bài viết:
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('facebook')}
                  className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                  className="flex items-center gap-2 hover:bg-sky-50 hover:border-sky-300"
                >
                  <Twitter className="h-4 w-4 text-sky-500" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('email')}
                  className="flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300"
                >
                  <Mail className="h-4 w-4 text-gray-600" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('copy')}
                  className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300"
                >
                  <Copy className="h-4 w-4 text-green-600" />
                  Sao chép link
                </Button>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ArticleDetailPage;
