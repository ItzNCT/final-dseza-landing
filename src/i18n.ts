import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Vietnamese translations
const viTranslation = {
  "sitemap": "Sơ đồ site",
  "nav": {
    "intro": "Giới thiệu",
    "news": "Tin tức",
    "business": "Doanh nghiệp",
    "services": "Dịch vụ",
    "investments": "Đầu tư",
    "contact": "Liên hệ",
    "investmentGuide": "Cẩm nang đầu tư",
    "documents": "Văn bản",
    "adminReform": "Cải cách hành chính",
    "utilities": "Tiện ích"
  },
  "homepage": {
    "featuredEvents": "SỰ KIỆN NỔI BẬT",
    "latestNews": "TIN TỨC MỚI NHẤT",
    "viewAll": "Xem tất cả",
    "functionalZones": "CÁC KHU CHỨC NĂNG",
    "functionalZonesMobile": "CÁC KHU CHỨC NĂNG",
    "investmentInfo": "THÔNG TIN ĐẦU TƯ",
    "location": "VỊ TRÍ",
    "resources": "TÀI NGUYÊN",
    "businessesAndPartners": "DOANH NGHIỆP & ĐỐI TÁC"
  },
  "investment": {
    "forInvestors": "Dành cho nhà đầu tư",
    "investmentEnvironment": "Môi trường đầu tư",
    "investmentProcedures": "Thủ tục đầu tư",
    "incentives": "Ưu đãi đầu tư",
    "services": "Dịch vụ tiện ích",
    "workforce": "Nguồn nhân lực",
    "infrastructure": "Cơ sở hạ tầng",
    "environment": "Môi trường"
  },
  "footer": {
    "management": "Ban Quản lý Khu công nghệ cao và các Khu công nghiệp Đà Nẵng",
    "address": "Địa chỉ: Lô A17, đường Trung tâm, Khu công nghệ cao, xã Hòa Liên, huyện Hòa Vang, Đà Nẵng",
    "tel": "Điện thoại",
    "fax": "Fax",
    "email": "Email",
    "copyright": "Bản quyền © 2025 DSEZA. Đã đăng ký bản quyền.",
    "legalInfo": "Thông tin pháp lý",
    "networkCredibility": "Tín nhiệm mạng",
    "license": "Giấy phép: Số 05/GP-STTTT do Sở TTTT Đà Nẵng cấp ngày 02/01/2020.",
    "editor": "Trưởng Ban biên tập: Trần Văn Tỵ, Phó Trưởng ban BQL KCNC & các KCN Đà Nẵng.",
    "citationConnect": "Trích dẫn & Kết nối",
    "citationNote": "Ghi rõ nguồn \"www.dseza.danang.gov.vn\" khi trích dẫn lại thông tin.",
    "visitorCount": "Số lượt truy cập"
  },
  "location": {
    "title": "BẢN ĐỒ VỊ TRÍ",
    "vrTour": "VR 360 Tour - Khu CNC Đà Nẵng",
    "digitalMap": "Bản đồ số khu CNC + Các KCN Đà Nẵng + Báo cáo trực tuyến",
    "digitalMapTitle": "Bản đồ số và Báo cáo Đầu tư",
    "digitalMapDescription": "Bản đồ tương tác với dữ liệu chi tiết về các khu công nghiệp, vị trí các doanh nghiệp và thông tin đầu tư.",
    "accessDigitalMap": "Truy cập Bản đồ số"
  },
  "news": {
    "title": "TIN TỨC",
    "noNews": "Chưa có tin tức nào được đăng tải.",
    "categories": {
      "investment": "Đầu tư – Hợp tác quốc tế",
      "training": "Đào tạo, Ươm tạo khởi nghiệp",
      "digital": "Chuyển đổi số",
      "management": "Hoạt động Ban quản lý",
      "other": "Tin khác"
    }
  },
  "functionalZones": {
    "title": "KHU CÔNG NGHỆ CAO, TRUNG TÂM VI MẠCH BÁN DẪN VÀ TRÍ TUỆ NHÂN TẠO, CÁC KHU CÔNG NGHIỆP, KHU CNTT TẬP TRUNG, KHU THƯƠNG MẠI TỰ DO",
    "enterprises": "Doanh nghiệp",
    "occupancyRate": "Tỉ lệ lấp đầy",
    "area": "Diện tích",
    "dataSource": "Dữ liệu được cập nhật từ hệ thống",
    "noDataTitle": "Chưa có dữ liệu",
    "noZones": "Chưa có thông tin về các khu chức năng."
  },
  "quickAccess": {
    "onlinePublicService": "Dịch vụ công trực tuyến",
    "administrativeProcedures": "Thủ tục hành chính",
    "publicResults": "Công khai KQ giải quyết TTHC",
    "feedbackChannel": "Kênh thông tin tiếp nhận phản ánh, kiến nghị",
    "appointmentScheduling": "Đặt lịch hẹn giao dịch trực tuyến"
  },
  "featuredEvents": {
    "title": "SỰ KIỆN TIÊU ĐIỂM",
    "eventPrefix": "Sự kiện nổi bật",
    "noEvents": "Chưa có sự kiện nào được đăng tải."
  },
  "heroBackground": {
    "tab1": "Khu công nghệ cao Đà Nẵng",
    "tab2": "Khu công nghệ cao Đà Nẵng",
    "tab3": "Khu công nghệ cao Đà Nẵng",
    "tab4": "Khu công nghệ cao Đà Nẵng"
  },
  "menuSpecial": {
    "achievementTitle": "Thành tựu đã đạt được",
    "achievementDesc": "Khu Công nghệ cao và các Khu Công nghiệp Đà Nẵng đã trở thành động lực quan trọng cho sự phát triển của thành phố.",
    "achievementBtn": "Tìm hiểu thêm",
    "featuredServiceTitle": "Dịch vụ công nổi bật",
    "featuredServiceDesc": "Trải nghiệm dịch vụ công trực tuyến tại Ban quản lý Khu công nghệ cao và các Khu công nghiệp Đà Nẵng",
    "featuredServiceBtn": "Truy cập ngay",
    "quickDocSearchTitle": "Tra cứu văn bản nhanh",
    "quickDocSearchPlaceholder": "Nhập từ khóa tìm kiếm...",
    "quickDocSearchBtn": "Tìm kiếm",
    "supportServiceTitle": "Dịch vụ hỗ trợ",
    "supportServiceDesc": "Chúng tôi cung cấp nhiều dịch vụ hỗ trợ cho doanh nghiệp trong các Khu công nghiệp.",
    "supportServiceBtn": "Liên hệ hỗ trợ",
    "newsCardTitle": "Tin tức mới nhất về hoạt động của Ban quản lý",
    "newsCardDesc": "Cập nhật thông tin mới nhất về các hoạt động và sự kiện quan trọng.",
    "newsCardBtn": "Xem thêm →",
    "letterOfGreeting": "Thư ngỏ",
    "overviewDanang": "Tổng quan về Đà Nẵng",
    "overviewAuthority": "Tổng quan về Ban Quản lý",
    "functionsAndDuties": "Chức năng, nhiệm vụ, quyền hạn Ban Quản lý",
    "departments": "Các phòng ban",
    "affiliatedUnits": "Đơn vị trực thuộc",
    "functionalAreas": "Các Khu chức năng",
    "seeMore": "Xem thêm"
  },
  "resourcesSection": {
    "sectionTitle": "TƯ LIỆU",
    "tabImages": "Hình ảnh",
    "tabVideos": "Video",
    "tabDocuments": "Tài liệu",
    "dateLabel": "Ngày đăng",
    "comingSoonTitle": "Đang phát triển",
    "comingSoonVideos": "Sắp ra mắt: Video liên quan đến hoạt động và các khu của DSEZA.",
    "comingSoonDocuments": "Sắp ra mắt: Tài liệu, báo cáo và khung pháp lý có thể tải về.",
    "viewAll": "Xem tất cả tư liệu",
    "downloadLabel": "Tải xuống",
    "noDocuments": "Chưa có tài liệu nào",
    "noDocumentsDesc": "Chưa có tài liệu nào được đăng tải."
  },
  "logoSearchBar": {
    "searchPlaceholder": "Tìm kiếm...",
    "login": "Đăng nhập"
  },
  "auth": {
    "login": {
      "title": "Đăng nhập",
      "description": "Nhập tài khoản hoặc email và mật khẩu để tiếp tục",
      "email": "Email",
      "emailPlaceholder": "ten@example.com",
      "usernameOrEmail": "Tài khoản hoặc Email",
      "usernameOrEmailPlaceholder": "admin hoặc ten@example.com",
      "password": "Mật khẩu",
      "passwordPlaceholder": "Nhập mật khẩu",
      "forgotPassword": "Quên mật khẩu?",
      "submitButton": "Đăng nhập",
      "noAccount": "Chưa có tài khoản?",
      "registerLink": "Đăng ký ngay",
      "validation": {
        "usernameOrEmailRequired": "Vui lòng nhập tài khoản hoặc email",
        "passwordRequired": "Vui lòng nhập mật khẩu",
        "invalidFormat": "Tài khoản không hợp lệ hoặc email sai định dạng"
      }
    },
    "register": {
      "title": "Tạo tài khoản",
      "description": "Điền thông tin bên dưới để đăng ký tài khoản mới",
      "fullName": "Tên người dùng",
      "fullNamePlaceholder": "Nguyễn Văn A",
      "email": "Địa chỉ Email",
      "emailPlaceholder": "ten@example.com",
      "password": "Mật khẩu",
      "passwordPlaceholder": "Ít nhất 6 ký tự",
      "confirmPassword": "Xác nhận mật khẩu",
      "confirmPasswordPlaceholder": "Nhập lại mật khẩu",
      "submitButton": "Đăng ký",
      "hasAccount": "Đã có tài khoản?",
      "loginLink": "Đăng nhập"
    }
  },
  "languageSwitcher": {
    "vietnamese": "Tiếng Việt",
    "english": "English"
  },
  "themeToggle": {
    "lightMode": "Chế độ sáng",
    "darkMode": "Chế độ tối"
  },
  "common": {
    "loading": "Đang tải dữ liệu khu chức năng...",
    "errorTitle": "Có lỗi xảy ra",
    "errorLoading": "Không thể tải dữ liệu khu chức năng từ server.",
    "tryAgain": "Thử lại",
    "debugInfo": "Thông tin debug"
  },
  "contact": {
    "title": "LIÊN HỆ VỚI CHÚNG TÔI",
    "name": "Họ và tên",
    "namePlaceholder": "Nhập họ và tên của bạn",
    "email": "Email",
    "emailPlaceholder": "example@email.com",
    "subject": "Tiêu đề",
    "subjectPlaceholder": "Nhập tiêu đề email",
    "content": "Nội dung",
    "contentPlaceholder": "Nhập nội dung chi tiết...",
    "sending": "Đang gửi...",
    "send": "Gửi đi",
    "successTitle": "Email đã được gửi thành công!",
    "successDesc": "Chúng tôi sẽ phản hồi bạn trong vòng 24 giờ.",
    "errorTitle": "Có lỗi xảy ra!",
    "errorDesc": "Vui lòng thử lại sau."
  },
  "qna": {
    "createTitle": "GỬI CÂU HỎI CHO CHÚNG TÔI",
    "fullName": "Họ và tên",
    "fullNamePlaceholder": "Nhập họ và tên của bạn",
    "address": "Địa chỉ",
    "addressPlaceholder": "Nhập địa chỉ của bạn",
    "phone": "Số điện thoại",
    "phonePlaceholder": "Nhập số điện thoại của bạn",
    "email": "Email",
    "emailPlaceholder": "example@email.com",
    "category": "Lĩnh vực",
    "categoryPlaceholder": "Chọn lĩnh vực",
    "title": "Tiêu đề",
    "titlePlaceholder": "Nhập tiêu đề câu hỏi",
    "content": "Nội dung câu hỏi",
    "contentPlaceholder": "Nhập nội dung chi tiết câu hỏi của bạn...",
    "submitButton": "Gửi câu hỏi",
    "submitting": "Đang gửi...",
    "successTitle": "Gửi câu hỏi thành công!",
    "successDesc": "Câu hỏi của bạn đã được gửi và đang chờ được duyệt.",
    "errorTitle": "Gửi câu hỏi thất bại!",
    "validationError": "Vui lòng kiểm tra lại thông tin!",
    "validationErrorDesc": "Có một số trường bắt buộc chưa được điền đầy đủ.",
    "categories": {
      "adminProcedures": "Thủ tục hành chính",
      "incentivePolicies": "Chính sách ưu đãi",
      "planning": "Quy hoạch xây dựng",
      "laborPolicies": "Chính sách lao động",
      "businessLicense": "Giấy phép kinh doanh",
      "startupSupport": "Hỗ trợ khởi nghiệp",
      "technicalInfra": "Hạ tầng kỹ thuật",
      "other": "Khác"
    },
    "noteTitle": "Lưu ý khi gửi câu hỏi:",
    "notes": [
      "Vui lòng điền đầy đủ thông tin họ tên để chúng tôi có thể hỗ trợ bạn tốt nhất",
      "Nêu rõ nội dung câu hỏi để nhận được câu trả lời chính xác",
      "Chúng tôi sẽ phản hồi trong vòng 24-48 giờ làm việc",
      "Các câu hỏi thường gặp sẽ được công khai để hỗ trợ cộng đồng"
    ],
    "required": "bắt buộc"
  },
  "document": {
    "categories": {
      "centralLegal": "Văn bản pháp quy trung ương",
      "localLegal": "Văn bản pháp quy địa phương",
      "administrative": "Văn bản chỉ đạo điều hành",
      "reform": "Văn bản CCHC"
    },
    "search": "Tra cứu văn bản",
    "typeDocument": "Loại văn bản"
  },
  "comments": {
    "noComments": "Chưa có bình luận nào. Hãy là người đầu tiên bình luận!",
    "pending": "Bình luận của bạn sẽ được hiển thị sau khi được duyệt.",
    "successTitle": "Cảm ơn bạn đã gửi bình luận!",
    "successDesc": "Do cấu hình hệ thống, bình luận hiện đang được xử lý và sẽ hiển thị sau khi được quản trị viên duyệt."
  },
  "welcome": {
    "greeting": "Chào mừng quý vị đã đến với DSEZA chúng tôi,",
    "introduction": "Lời đầu tiên, Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà nẵng (DSEZA) xin được gửi đến Quý tổ chức, doanh nghiệp, nhà đầu tư, cá nhân lời chào trân trọng, lời chúc sức khỏe, an khang và thịnh vượng."
  },
  "errors": {
    "loadNavFailed": "Failed to load navigation menu",
    "loadDataFailed": "Đã xảy ra lỗi khi tải thông tin đầu tư. Vui lòng thử lại sau.",
    "loadNewsFailed": "Đã xảy ra lỗi khi tải tin tức. Vui lòng thử lại sau.",
    "noArticles": "Không có bài viết nào trong chuyên mục này."
  },
  "validation": {
    "nameRequired": "Họ và tên là bắt buộc",
    "emailRequired": "Email là bắt buộc",
    "emailInvalid": "Email không hợp lệ",
    "titleRequired": "Tiêu đề là bắt buộc",
    "contentRequired": "Nội dung câu hỏi là bắt buộc"
  }
};

// English translations
const enTranslation = {
  "sitemap": "Site Map",
  "nav": {
    "intro": "Introduction",
    "news": "News",
    "business": "Business",
    "services": "Services",
    "investments": "Investments",
    "contact": "Contact",
    "investmentGuide": "Investment Guide",
    "documents": "Documents",
    "adminReform": "Administrative Reform",
    "utilities": "Utilities"
  },
  "homepage": {
    "featuredEvents": "FEATURED EVENTS",
    "latestNews": "LATEST NEWS",
    "viewAll": "View all",
    "functionalZones": "FUNCTIONAL ZONES",
    "functionalZonesMobile": "FUNCTIONAL ZONES",
    "investmentInfo": "INVESTMENT INFORMATION",
    "location": "LOCATION",
    "resources": "RESOURCES",
    "businessesAndPartners": "BUSINESSES & PARTNERS"
  },
  "investment": {
    "forInvestors": "For Investors",
    "investmentEnvironment": "Investment Environment",
    "investmentProcedures": "Investment Procedures",
    "incentives": "Investment Incentives",
    "services": "Utilities & Services",
    "workforce": "Human Resources",
    "infrastructure": "Infrastructure",
    "environment": "Environment"
  },
  "footer": {
    "management": "Da Nang Specific Economic Zones Authority",
    "address": "Address: Lot A17, Center Road, High-Tech Park, Hoa Lien Commune, Hoa Vang District, Da Nang",
    "tel": "Tel",
    "fax": "Fax",
    "email": "Email",
    "copyright": "Copyright © 2025 DSEZA. All rights reserved.",
    "legalInfo": "Legal Information",
    "networkCredibility": "Network Credibility",
    "license": "License: No. 05/GP-STTTT issued by Danang Department of Information and Communications on 01/02/2020.",
    "editor": "Editor in Chief: Tran Van Ty, Deputy Head of the Management Board of Da Nang Specific Economic Zones Authority.",
    "citationConnect": "Citation & Connect",
    "citationNote": "Please cite \"www.dseza.danang.gov.vn\" when referencing our information.",
    "visitorCount": "Visitor count"
  },
  "location": {
    "title": "LOCATION MAP",
    "vrTour": "VR 360 Tour - Danang Hi-Tech Park",
    "digitalMap": "Digital Map of High-Tech Park + Industrial Zones + Online Reports",
    "digitalMapTitle": "Digital Map and Investment Reports",
    "digitalMapDescription": "Interactive map with detailed data about industrial zones, business locations, and investment information.",
    "accessDigitalMap": "Access Digital Map"
  },
  "news": {
    "title": "NEWS",
    "noNews": "No news articles have been published yet.",
    "categories": {
      "investment": "Investment & International Cooperation",
      "training": "Training & Business Incubation",
      "digital": "Digital Transformation",
      "management": "Management Activities",
      "other": "Other News"
    }
  },
  "functionalZones": {
    "title": "HIGH-TECH PARK, SEMICONDUCTOR & AI CENTER, INDUSTRIAL ZONES, IT ZONES, FREE TRADE ZONE",
    "enterprises": "Enterprises",
    "occupancyRate": "Occupancy Rate",
    "area": "Area",
    "dataSource": "Data updated from the system",
    "noDataTitle": "No data available",
    "noZones": "No information about functional zones available."
  },
  "quickAccess": {
    "onlinePublicService": "Online Public Services",
    "administrativeProcedures": "Administrative Procedures",
    "publicResults": "Public Administrative Results",
    "feedbackChannel": "Feedback & Suggestion Channel",
    "appointmentScheduling": "Online Appointment Scheduling"
  },
  "featuredEvents": {
    "title": "FEATURED EVENTS",
    "eventPrefix": "Featured event",
    "noEvents": "No events have been published yet."
  },
  "heroBackground": {
    "tab1": "Danang Hi-Tech Park",
    "tab2": "Danang Hi-Tech Park",
    "tab3": "Danang Hi-Tech Park",
    "tab4": "Danang Hi-Tech Park"
  },
  "menuSpecial": {
    "achievementTitle": "Outstanding Achievements",
    "achievementDesc": "Danang Hi-Tech Park and Industrial Zones have become a key driving force for the city's development.",
    "achievementBtn": "Learn more",
    "featuredServiceTitle": "Featured Public Services",
    "featuredServiceDesc": "Experience online public services at the Danang Hi-Tech Park and Industrial Zones Authority",
    "featuredServiceBtn": "Access now",
    "quickDocSearchTitle": "Quick Document Search",
    "quickDocSearchPlaceholder": "Enter search keywords...",
    "quickDocSearchBtn": "Search",
    "supportServiceTitle": "Support Services",
    "supportServiceDesc": "We provide a variety of support services for businesses in the industrial zones.",
    "supportServiceBtn": "Contact support",
    "newsCardTitle": "Latest news on Management Authority activities",
    "newsCardDesc": "Get the latest updates on important activities and events.",
    "newsCardBtn": "See more →",
    "letterOfGreeting": "Welcome Letter",
    "overviewDanang": "Overview of Da Nang",
    "overviewAuthority": "Overview of the Authority",
    "functionsAndDuties": "Functions, Duties, and Powers",
    "departments": "Departments",
    "affiliatedUnits": "Affiliated Units",
    "functionalAreas": "Functional Zones",
    "seeMore": "See More"
  },
  "resourcesSection": {
    "sectionTitle": "RESOURCES",
    "tabImages": "Images",
    "tabVideos": "Videos",
    "tabDocuments": "Documents",
    "dateLabel": "Date posted",
    "comingSoonTitle": "Coming soon",
    "comingSoonVideos": "Coming soon: Videos related to DSEZA's activities and zones.",
    "comingSoonDocuments": "Coming soon: Downloadable documents, reports, and legal frameworks.",
    "viewAll": "View all resources",
    "downloadLabel": "Download",
    "noDocuments": "No documents available",
    "noDocumentsDesc": "No documents have been uploaded yet."
  },
  "logoSearchBar": {
    "searchPlaceholder": "Search...",
    "login": "Login"
  },
  "auth": {
    "login": {
      "title": "Login",
      "description": "Enter your username or email and password to continue",
      "email": "Email",
      "emailPlaceholder": "name@example.com",
      "usernameOrEmail": "Username or Email",
      "usernameOrEmailPlaceholder": "admin or name@example.com",
      "password": "Password",
      "passwordPlaceholder": "Enter password",
      "forgotPassword": "Forgot password?",
      "submitButton": "Login",
      "noAccount": "Don't have an account?",
      "registerLink": "Register now",
      "validation": {
        "usernameOrEmailRequired": "Please enter username or email",
        "passwordRequired": "Please enter password",
        "invalidFormat": "Invalid username or email format"
      }
    },
    "register": {
      "title": "Create Account",
      "description": "Fill in the details below to register a new account",
      "fullName": "Full Name",
      "fullNamePlaceholder": "John Doe",
      "email": "Email Address",
      "emailPlaceholder": "name@example.com",
      "password": "Password",
      "passwordPlaceholder": "At least 6 characters",
      "confirmPassword": "Confirm Password",
      "confirmPasswordPlaceholder": "Re-enter password",
      "submitButton": "Register",
      "hasAccount": "Already have an account?",
      "loginLink": "Login"
    }
  },
  "languageSwitcher": {
    "vietnamese": "Vietnamese",
    "english": "English"
  },
  "themeToggle": {
    "lightMode": "Light Mode",
    "darkMode": "Dark Mode"
  },
  "common": {
    "loading": "Loading functional zones data...",
    "errorTitle": "An error occurred",
    "errorLoading": "Unable to load functional zones data from server.",
    "tryAgain": "Try again",
    "debugInfo": "Debug information"
  },
  "contact": {
    "title": "CONTACT US",
    "name": "Full Name",
    "namePlaceholder": "Enter your full name",
    "email": "Email",
    "emailPlaceholder": "example@email.com",
    "subject": "Subject",
    "subjectPlaceholder": "Enter email subject",
    "content": "Content",
    "contentPlaceholder": "Enter detailed content...",
    "sending": "Sending...",
    "send": "Send",
    "successTitle": "Email sent successfully!",
    "successDesc": "We will respond to you within 24 hours.",
    "errorTitle": "An error occurred!",
    "errorDesc": "Please try again later."
  },
  "qna": {
    "createTitle": "ASK US A QUESTION",
    "fullName": "Full Name",
    "fullNamePlaceholder": "Enter your full name",
    "address": "Address",
    "addressPlaceholder": "Enter your address",
    "phone": "Phone Number",
    "phonePlaceholder": "Enter your phone number",
    "email": "Email",
    "emailPlaceholder": "example@email.com",
    "category": "Category",
    "categoryPlaceholder": "Select category",
    "title": "Title",
    "titlePlaceholder": "Enter question title",
    "content": "Question Content",
    "contentPlaceholder": "Enter detailed question content...",
    "submitButton": "Submit Question",
    "submitting": "Submitting...",
    "successTitle": "Question submitted successfully!",
    "successDesc": "Your question has been sent and is awaiting approval.",
    "errorTitle": "Failed to submit question!",
    "validationError": "Please check your information!",
    "validationErrorDesc": "Some required fields have not been filled completely.",
    "categories": {
      "adminProcedures": "Administrative Procedures",
      "incentivePolicies": "Incentive Policies",
      "planning": "Planning & Construction",
      "laborPolicies": "Labor Policies",
      "businessLicense": "Business License",
      "startupSupport": "Startup Support",
      "technicalInfra": "Technical Infrastructure",
      "other": "Other"
    },
    "noteTitle": "Notes when submitting questions:",
    "notes": [
      "Please fill in complete name information so we can assist you best",
      "Clearly state your question content to receive accurate answers",
      "We will respond within 24-48 working hours",
      "Frequently asked questions will be published to support the community"
    ],
    "required": "required"
  },
  "document": {
    "categories": {
      "centralLegal": "Central Legal Documents",
      "localLegal": "Local Legal Documents",
      "administrative": "Administrative Guidance Documents",
      "reform": "Administrative Reform Documents"
    },
    "search": "Document Search",
    "typeDocument": "Document Type"
  },
  "comments": {
    "noComments": "No comments yet. Be the first to comment!",
    "pending": "Your comment will be displayed after approval.",
    "successTitle": "Thank you for your comment!",
    "successDesc": "Due to system configuration, comments are currently being processed and will be displayed after administrator approval."
  },
  "welcome": {
    "greeting": "Welcome to DSEZA,",
    "introduction": "First of all, the Da Nang Specific Economic Zones Authority (DSEZA) would like to send respectful greetings and wishes for health, peace and prosperity to all organizations, enterprises, investors, and individuals."
  },
  "errors": {
    "loadNavFailed": "Failed to load navigation menu",
    "loadDataFailed": "An error occurred while loading investment information. Please try again later.",
    "loadNewsFailed": "An error occurred while loading news. Please try again later.",
    "noArticles": "No articles in this category."
  },
  "validation": {
    "nameRequired": "Full name is required",
    "emailRequired": "Email is required",
    "emailInvalid": "Invalid email",
    "titleRequired": "Title is required",
    "contentRequired": "Question content is required"
  }
};

const resources = {
  vi: {
    translation: viTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n; 