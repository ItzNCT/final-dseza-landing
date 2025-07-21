import React from 'react';
import { Link } from "react-router-dom";
import { 
  Download, 
  Share2, 
  Printer,
  ChevronRight 
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const DanangOverviewPage = () => {
  const { theme } = useTheme();

  const handleDownload = () => {
    // Logic tải xuống - có thể tải PDF hoặc Word
    console.log('Downloading document...');
  };

  const handleShare = () => {
    // Logic chia sẻ
    if (navigator.share) {
      navigator.share({
        title: 'Tổng quan về Đà Nẵng - DSEZA',
        text: 'Tổng quan về thành phố Đà Nẵng từ Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link vào clipboard!');
    }
  };

  const handlePrint = () => {
    // Logic in trang
    window.print();
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
                to="/gioi-thieu" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Giới thiệu
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Tổng quan về Đà Nẵng
              </span>
            </nav>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Tổng quan về Đà Nẵng
              </h1>
              

            </header>

            {/* Article Content */}
            <div className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
              <div className="space-y-8 text-justify">
                {/* 1. DIỆN TÍCH, DÂN SỐ, ĐƠN VỊ HÀNH CHÍNH */}
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>1. DIỆN TÍCH, DÂN SỐ, ĐƠN VỊ HÀNH CHÍNH</h2>
                  <div className="space-y-4">
                    <p>
                      Đà Nẵng nằm ở vị trí trung độ của Việt Nam, là trung tâm kinh tế, văn hoá, giáo dục, khoa học và công nghệ lớn của khu vực miền Trung - Tây Nguyên. Đà Nẵng hiện là 01 trong 5 thành phố trực thuộc Trung ương (Hà Nội, thành phố Hồ Chí Minh, Hải Phòng, Đà Nẵng và Cần Thơ).
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li><strong>Diện tích:</strong> 1.285,4km²</li>
                      <li><strong>Dân số:</strong> 1.046.876 người (tính đến tháng 01/2015)</li>
                      <li><strong>Mật độ dân số:</strong> 892 người/km²</li>
                      <li><strong>Đơn vị hành chính:</strong> 6 quận (Hải Châu, Thanh Khê, Liên Chiểu, Ngũ Hành Sơn, Sơn Trà, Cẩm Lệ), 1 huyện ngoại thành (huyện Hòa Vang) và 1 huyện đảo (Hoàng Sa).</li>
                    </ul>
                    <p className={`text-sm italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>(Nguồn: Wikipedia)</p>
                  </div>
                </section>

                {/* 2. KHÍ HẬU */}
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>2. KHÍ HẬU</h2>
                  <div className="space-y-4">
                    <p>
                      Đà Nẵng nằm trong vùng khí hậu nhiệt đới gió mùa điển hình, nhiệt độ cao và ít biến động.
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li>Mỗi năm có 2 mùa rõ rệt: mùa mưa (từ tháng 8 đến tháng 12) và mùa khô (từ tháng 1 đến tháng 7). Mỗi năm, Đà Nẵng chịu ảnh hưởng trực tiếp từ một đến hai cơn bão hoặc áp thấp nhiệt đới.</li>
                      <li><strong>Nhiệt độ trung bình hàng năm:</strong> khoảng 25,9°C. Riêng vùng rừng núi Bà Nà ở độ cao gần 1.500 m, nhiệt độ trung bình khoảng 20°C.</li>
                      <li><strong>Độ ẩm không khí trung bình:</strong> 83,4%.</li>
                      <li><strong>Lượng mưa trung bình hàng năm:</strong> 2.504,57 mm</li>
                      <li><strong>Số giờ nắng bình quân trong năm:</strong> 2.156,2 giờ</li>
                    </ul>
                    <p className={`text-sm italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>(Nguồn: Wikipedia)</p>
                  </div>
                </section>

                {/* 3. MỘT SỐ CHỈ SỐ KINH TẾ CỦA THÀNH PHỐ */}
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>3. MỘT SỐ CHỈ SỐ KINH TẾ CỦA THÀNH PHỐ</h2>
                  <div className="space-y-4">
                    <ul className="space-y-3 ml-6">
                      <li><strong>Tốc độ tăng trưởng GDP (ước 2013):</strong> 8,1%</li>
                      <li><strong>Thu nhập bình quân đầu người (ước 2013):</strong> 56,3 triệu đồng/người/năm (tương đương 2.686USD/người/năm)</li>
                      <li><strong>Đầu tư:</strong> Tính đến tháng 3/2015, Đà Nẵng đã thu hút được 322 dự án FDI còn hiệu lực đến từ 37 quốc gia, vùng lãnh thổ với tổng vốn đầu tư hơn 3,389 tỷ USD.</li>
                      <li>
                        <strong>Du lịch:</strong>
                        <ul className="mt-2 ml-4 space-y-1">
                          <li>+ Doanh thu du lịch (ước 2013): 7.784,1 tỷ đồng</li>
                          <li>+ Lượt khách du lịch (ước 2013): 3,117 triệu lượt khách, trong đó: 743,2 nghìn lượt khách quốc tế và 2,374 triệu lượt khách trong nước.</li>
                        </ul>
                      </li>
                    </ul>
                    <p className={`text-sm italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>(Nguồn: Wikipedia, Cục Thống kê Đà Nẵng)</p>
                  </div>
                </section>

                {/* 4. ĐÀ NẴNG - ĐIỂM ĐẾN HẤP DẪN DÀNH CHO CÁC NHÀ ĐẦU TƯ */}
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>4. ĐÀ NẴNG - ĐIỂM ĐẾN HẤP DẪN DÀNH CHO CÁC NHÀ ĐẦU TƯ</h2>
                  <div className="space-y-6">
                    {/* a. Vị trí địa lý chiến lược */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>a. Vị trí địa lý chiến lược</h3>
                      <ul className="space-y-2 ml-6">
                        <li>Đà Nẵng cách thủ đô Hà Nội 764 km về phía bắc, cách thành phố Hồ Chí Minh 964 km về phía nam, nằm trên trục giao thông Bắc - Nam về đường bộ, đường sắt, đường biển và đường hàng không, là một trong những cửa ngõ quan trọng ra biển của Tây Nguyên và các nước Lào, đông bắc Campuchia, Thái Lan và Myanma.</li>
                        <li>Khoảng cách từ Đà Nẵng đến các trung tâm kinh tế chính của khu vực Đông Nam Á như Bangkok (Thái Lan), Kuala Lumpur (Malaysia), Singapore, Manila (Philipines) đều nằm trong khoảng 1.000 - 2.000 km.</li>
                        <li>Đà Nẵng còn là cửa ngõ phía Đông của Hành lang Kinh tế Đông - Tây ra Thái Bình Dương, là cửa vào của các di sản văn hóa và di sản thiên nhiên thế giới (Đô thị cổ Hội An, Thánh địa Mỹ Sơn, Cố đô Huế, Phong Nha - Kẻ Bàng).</li>
                        <li>Đà Nẵng là Thành phố động lực của Vùng Kinh tế trọng điểm miền Trung, gồm 5 tỉnh, thành: Thừa Thiên - Huế, Đà Nẵng, Quảng Nam, Quảng Ngãi và Bình Định.</li>
                      </ul>
                    </div>

                    {/* b. Cơ sở hạ tầng phát triển */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>b. Cơ sở hạ tầng phát triển</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Cảng Tiên Sa:</h4>
                          <ul className="ml-6 space-y-1">
                            <li>+ Là cảng thương mại lớn thứ ba của Việt Nam sau Cảng Sài Gòn và Cảng Hải Phòng.</li>
                            <li>+ Năng lực bốc dỡ hàng hoá 4 triệu tấn/năm, có thể tiếp nhận các loại tàu hàng có trọng tải 45.000DWT và các tàu chuyên dùng khác như tàu container, tàu khách, tàu hàng siêu trường siêu trọng.</li>
                            <li>+ Từ Cảng Tiên Sa (Đà Nẵng) hiện có các tuyến tàu biển quốc tế đi Hồng Kông, Singapore, Nhật Bản, Đài Loan và Hàn Quốc.</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Sân bay quốc tế Đà Nẵng:</h4>
                          <p className="ml-6">Công suất phục vụ 6,5 triệu lượt khách/năm, dự kiến đạt mức 10 triệu hành khách mỗi năm vào năm 2020.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Hệ thống đường giao thông:</h4>
                          <p className="ml-6">Không ngừng được mở rộng, với nhiều công trình lớn trên địa bàn thành phố như đường Võ Nguyên Giáp, cầu Trần Thị Lý, cầu Rồng, cầu Nguyễn Tri Phương, cầu Sông Hàn, cầu Tiên Sơn, cầu Thuận Phước, nút giao thông khác mức Ngã ba Huế… Hệ thống giao thông kết nối với các tỉnh, thành bên ngoài có hầm đường bộ Hải Vân, Quốc lộ 14B, Quốc lộ 1A và sắp tới là đường cao tốc Đà Nẵng - Quảng Ngãi (đang triển khai thi công) tạo điều kiện thuận lợi về giao thông và phát triển du lịch.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Hệ thống cấp điện, cấp nước:</h4>
                          <p className="ml-6">Hệ thống cấp điện, cấp nước trong thành phố luôn đảm bảo cho nhu cầu sản xuất và sinh hoạt hàng ngày. Nhà máy nước Đà Nẵng hiện có công suất 120.000m³/ngày đêm và dự kiến nâng tổng công suất cấp nước lên 325.000m³/ngày đêm vào năm 2020.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Bưu chính - viễn thông:</h4>
                          <p className="ml-6">Là một trong ba trung tâm bưu chính, viễn thông lớn của Việt Nam và là một trong ba điểm kết nối cuối cùng quan trọng nhất của mạng trung kế đường trục quốc gia và điểm kết nối trực tiếp với Trạm cáp quang biển quốc tế SEAMEWE 3 với tổng dung lượng 10Gbps kết nối Việt Nam với gần 40 nước ở Châu Á và Châu Âu. Hệ thống wifi phủ sóng trung tâm thành phố.</p>
                        </div>
                      </div>
                    </div>

                    {/* c. Môi trường đầu tư thông thoáng */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>c. Môi trường đầu tư thông thoáng</h3>
                      <ul className="space-y-2 ml-6">
                        <li>Dẫn đầu cả nước nhiều năm liên tục về chỉ số năng lực cạnh tranh cấp tỉnh (2008, 2009, 2010, 2013).</li>
                        <li>Dẫn đầu cả nước 5 năm liên tiếp về chỉ số sẵn sàng phát triển và ứng dụng công nghệ thông tin (2009, 2010, 2011, 2012 và 2013).</li>
                        <li>Dẫn đầu cả nước về chỉ số cải cách hành chính năm 2013.</li>
                        <li>Chính sách ưu đãi hấp dẫn và chi phí đầu tư thấp: Giá thuê đất, tiền sử dụng hạ tầng, tiền xử lý nước thải, chi phí thuê nhân công, dịch vụ đều được đánh giá là thấp.</li>
                      </ul>
                    </div>

                    {/* d. Nguồn nhân lực dồi dào */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>d. Nguồn nhân lực dồi dào</h3>
                      <div className="space-y-3">
                        <p>Tính đến năm 2012, lực lượng lao động toàn thành phố là 515.018 người, chiếm 53% tổng dân số của thành phố, trong đó:</p>
                        <ul className="ml-6 space-y-1">
                          <li>Công nhân kỹ thuật: 36.961 người</li>
                          <li>Trung cấp: 35.126 người</li>
                          <li>Đại học, cao đẳng: 106.681 người</li>
                          <li>Khác: 336.250 người</li>
                        </ul>
                        <p>Theo Quy hoạch phát triển nhân lực của thành phố đến năm 2020, Đà Nẵng có 70% lao động qua đào tạo, trong đó có 21% có trình độ đại học, cao đẳng; 16% có trình độ trung cấp chuyên nghiệp và 33% có trình độ công nhân kỹ thuật.</p>
                      </div>
                    </div>

                    {/* e. Môi trường sống thân thiện */}
                    <div>
                      <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>e. Môi trường sống thân thiện</h3>
                      <ul className="space-y-2 ml-6">
                        <li>Giải thưởng Phong cảnh thành phố châu Á năm 2013 (Chủ đề "Thành phố, niềm tự hào của người dân" do Tổ chức Định cư con người Liên Hiệp Quốc tại Châu Á (UN Habitat Châu Á) bình chọn.</li>
                        <li>Giải thưởng Thành phố bền vững về môi trường ASEAN năm 2011 do các nước thành viên ASEAN bình chọn.</li>
                        <li>Đà Nẵng được xem là điểm hẹn đầu tư hấp dẫn và đang hướng đến là thành phố sống tốt tại Việt Nam đối với các nhà đầu tư nước ngoài.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 5. TÌNH HÌNH THU HÚT ĐẦU TƯ TRỰC TIẾP NƯỚC NGOÀI (FDI) */}
                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>5. TÌNH HÌNH THU HÚT ĐẦU TƯ TRỰC TIẾP NƯỚC NGOÀI (FDI)</h2>
                  <div className="space-y-4">
                    <p>
                      Tính đến 15/4/2015, thành phố Đà Nẵng đã thu hút được 324 dự án FDI còn hiệu lực với tổng vốn đăng ký đạt hơn 3,39 tỷ USD.
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary/20' : 'bg-dseza-light-secondary/20'}`}>
                        <h4 className="font-semibold mb-2">a. Các quốc gia đầu tư dẫn đầu về vốn đầu tư tại Đà Nẵng</h4>
                      </div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary/20' : 'bg-dseza-light-secondary/20'}`}>
                        <h4 className="font-semibold mb-2">b. Các quốc gia đầu tư dẫn đầu về số dự án đầu tư tại Đà Nẵng</h4>
                      </div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-dseza-dark-secondary/20' : 'bg-dseza-light-secondary/20'}`}>
                        <h4 className="font-semibold mb-2">c. Đầu tư FDI phân theo lĩnh vực (theo cơ cấu số dự án đầu tư)</h4>
                      </div>
                    </div>
                    <p className={`text-sm italic ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>(Nguồn: Trung tâm Xúc tiến đầu tư Đà Nẵng)</p>
                  </div>
                </section>
              </div>
            </div>

            {/* Share Section */}
            <div className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                <Share2 className="h-5 w-5" />
                Chia sẻ trang:
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Chia sẻ
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-2" />
                  In
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

export default DanangOverviewPage; 