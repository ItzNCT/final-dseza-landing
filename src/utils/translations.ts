import { useLanguage } from "@/context/LanguageContext";

// Translation type definition
type TranslationObject = {
  [key: string]: string | TranslationObject | string[];
};

// Translation objects for Vietnamese and English
const viTranslations: TranslationObject = {
  // Common
  sitemap: "Sơ đồ site",

  // Nav Items
  nav: {
    intro: "Giới thiệu",
    news: "Tin tức",
    business: "Doanh nghiệp",
    services: "Dịch vụ",
    investments: "Đầu tư",
    contact: "Liên hệ",
    investmentGuide: "Cẩm nang đầu tư",
    documents: "Văn bản",
    adminReform: "Cải cách hành chính",
    utilities: "Tiện ích",
  },

  // Home Sections
  homepage: {
    featuredEvents: "SỰ KIỆN NỔI BẬT",
    latestNews: "TIN TỨC MỚI NHẤT",
    viewAll: "Xem tất cả",
    functionalZones: "CÁC KHU CHỨC NĂNG",
    functionalZonesMobile: "CÁC KHU CHỨC NĂNG",
    investmentInfo: "THÔNG TIN ĐẦU TƯ",
    location: "VỊ TRÍ",
    resources: "TÀI NGUYÊN",
    businessesAndPartners: "DOANH NGHIỆP & ĐỐI TÁC",
  },

  // Investment Information Section
  investment: {
    forInvestors: "Dành cho nhà đầu tư",
    investmentEnvironment: "Môi trường đầu tư",
    investmentProcedures: "Thủ tục đầu tư",
    incentives: "Ưu đãi đầu tư",
    services: "Dịch vụ tiện ích",
    workforce: "Nguồn nhân lực",
    infrastructure: "Cơ sở hạ tầng",
    environment: "Môi trường",
  },

  // Footer
  footer: {
    management: "Ban Quản lý Khu công nghệ cao và các Khu công nghiệp Đà Nẵng",
    address: "Địa chỉ: Lô A17, đường Trung tâm, Khu công nghệ cao, xã Hòa Liên, huyện Hòa Vang, Đà Nẵng",
    tel: "Điện thoại",
    fax: "Fax",
    email: "Email",
    copyright: "Bản quyền © 2025 DSEZA. Đã đăng ký bản quyền.",
    legalInfo: "Thông tin pháp lý",
    networkCredibility: "Tín nhiệm mạng",
    license: "Giấy phép: Số 05/GP-STTTT do Sở TTTT Đà Nẵng cấp ngày 02/01/2020.",
    editor: "Trưởng Ban biên tập: Trần Văn Tỵ, Phó Trưởng ban BQL KCNC & các KCN Đà Nẵng.",
    citationConnect: "Trích dẫn & Kết nối",
    citationNote: "Ghi rõ nguồn \"www.dseza.danang.gov.vn\" khi trích dẫn lại thông tin.",
    visitorCount: "Số lượt truy cập",
  },

  // Date formatting
  date: {
    dayNames: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
  },

  // Location Section
  location: {
    title: "BẢN ĐỒ VỊ TRÍ",
    vrTour: "VR 360 Tour - Khu CNC Đà Nẵng",
    digitalMap: "Bản đồ số khu CNC + Các KCN Đà Nẵng + Báo cáo trực tuyến",
    digitalMapTitle: "Bản đồ số và Báo cáo Đầu tư",
    digitalMapDescription: "Bản đồ tương tác với dữ liệu chi tiết về các khu công nghiệp, vị trí các doanh nghiệp và thông tin đầu tư.",
    accessDigitalMap: "Truy cập Bản đồ số",
  },

  // News Section
  news: {
    title: "TIN TỨC",
    categories: {
      investment: "Đầu tư – Hợp tác quốc tế",
      training: "Đào tạo, Ươm tạo khởi nghiệp",
      digital: "Chuyển đổi số",
      management: "Hoạt động Ban quản lý",
      other: "Tin khác",
    },
    sampleNews: { // Giữ lại sample news nếu có nơi khác dùng, nếu không có thể xóa
      news1: {
        title: "Dự án Khu Công Nghệ Cao Đà Nẵng Mở Rộng Giai Đoạn 2 Chính Thức Khởi Động",
        excerpt: "Sáng nay, Ban Quản lý KCNC và các KCN Đà Nẵng đã tổ chức lễ khởi công giai đoạn 2 của dự án mở rộng Khu Công Nghệ Cao, hứa hẹn thu hút thêm nhiều tập đoàn công nghệ lớn..."
      },
      news2: {
        title: "Đà Nẵng Đẩy Mạnh Hợp Tác Quốc Tế Trong Lĩnh Vực Vi Mạch",
        excerpt: "Nhiều thỏa thuận hợp tác đã được ký kết nhằm phát triển nguồn nhân lực và công nghệ cho ngành vi mạch bán dẫn..."
      },
      news3: {
        title: "Chính Sách Ưu Đãi Mới Cho Doanh Nghiệp Đầu Tư Vào Khu Thương Mại Tự Do",
        excerpt: "Các chính sách mới tập trung vào việc giảm thiểu thủ tục hành chính và tăng cường các ưu đãi về thuế..."
      }
    }
  },

  // Functional Zones Section
  functionalZones: {
    title: "KHU CÔNG NGHỆ CAO, TRUNG TÂM VI MẠCH BÁN DẪN VÀ TRÍ TUỆ NHÂN TẠO, CÁC KHU CÔNG NGHIỆP, KHU CNTT TẬP TRUNG, KHU THƯƠNG MẠI TỰ DO",
    enterprises: "Doanh nghiệp",
    occupancyRate: "Tỉ lệ lấp đầy",
    area: "Diện tích",
  },

  // Quick Access Buttons
  quickAccess: {
    onlinePublicService: "Dịch vụ công trực tuyến",
    administrativeProcedures: "Thủ tục hành chính",
    publicResults: "Công khai KQ giải quyết TTHC",
    feedbackChannel: "Kênh thông tin tiếp nhận phản ánh, kiến nghị",
    appointmentScheduling: "Đặt lịch hẹn giao dịch trực tuyến",
  },

  // Featured Events
  featuredEvents: {
    title: "SỰ KIỆN TIÊU ĐIỂM",
    eventPrefix: "Sự kiện nổi bật",
  },

  // Hero Background Tabs
  heroBackground: {
    tab1: "Khu công nghệ cao Đà Nẵng",
    tab2: "Khu công nghệ cao Đà Nẵng",
    tab3: "Khu công nghệ cao Đà Nẵng",
    tab4: "Khu công nghệ cao Đà Nẵng",
  },

  // Special content in navigation menu AND Mobile Menu
  menuSpecial: {
    achievementTitle: "Thành tựu đã đạt được",
    achievementDesc: "Khu Công nghệ cao và các Khu Công nghiệp Đà Nẵng đã trở thành động lực quan trọng cho sự phát triển của thành phố.",
    achievementBtn: "Tìm hiểu thêm",
    featuredServiceTitle: "Dịch vụ công nổi bật",
    featuredServiceDesc: "Trải nghiệm dịch vụ công trực tuyến tại Ban quản lý Khu công nghệ cao và các Khu công nghiệp Đà Nẵng",
    featuredServiceBtn: "Truy cập ngay",
    quickDocSearchTitle: "Tra cứu văn bản nhanh",
    quickDocSearchPlaceholder: "Nhập từ khóa tìm kiếm...",
    quickDocSearchBtn: "Tìm kiếm",
    supportServiceTitle: "Dịch vụ hỗ trợ",
    supportServiceDesc: "Chúng tôi cung cấp nhiều dịch vụ hỗ trợ cho doanh nghiệp trong các Khu công nghiệp.",
    supportServiceBtn: "Liên hệ hỗ trợ",
    newsCardTitle: "Tin tức mới nhất về hoạt động của Ban quản lý",
    newsCardDesc: "Cập nhật thông tin mới nhất về các hoạt động và sự kiện quan trọng.",
    newsCardBtn: "Xem thêm →",
    // Keys for mobile menu (ví dụ)
    letterOfGreeting: "Thư ngỏ",
    overviewDanang: "Tổng quan về Đà Nẵng",
    overviewAuthority: "Tổng quan về Ban Quản lý",
    functionsAndDuties: "Chức năng, nhiệm vụ, quyền hạn Ban Quản lý",
    departments: "Các phòng ban",
    affiliatedUnits: "Đơn vị trực thuộc",
    functionalAreas: "Các Khu chức năng",
    // Thêm các key khác cho các mục con của menu mobile tại đây
    // Ví dụ cho "Các Khu công nghiệp Đà Nẵng" và các mục con của nó
    izHoaKhanh: "Khu công nghiệp Hòa Khánh",
    izHoaKhanhExpanded: "Khu công nghiệp Hòa Khánh mở rộng",
    izDanang: "Khu công nghiệp Đà Nẵng",
    izSeafoodService: "Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng",
    izHoaCam: "Khu công nghiệp Hòa Cầm",
    izLienChieu: "Khu công nghiệp Liên Chiểu",
    izHoaNinh: "Khu công nghiệp Hòa Ninh",
    // Ví dụ cho menu Tin tức
    newsEvents: "Tin tức | Sự kiện",
    newsInvestmentCooperation: "Đầu tư - Hợp tác Quốc tế",
    newsDigitalTransformation: "Chuyển đổi số",
    newsTrainingIncubation: "Đào tạo, Ươm tạo Khởi nghiệp",
    newsManagementActivities: "Hoạt động Ban Quản lý",
    newsOther: "Tin khác",
    seeMore: "Xem thêm",
    workSchedule: "Lịch công tác",
    announcements: "Thông báo",
    pressInformation: "Thông tin báo chí",
    // Ví dụ cho menu Doanh nghiệp
    reportsData: "Báo cáo & Dữ liệu",
    dsezaOnlineReports: "Báo cáo trực tuyến về DSEZA",
    investmentMonitoringReports: "Báo cáo giám sát và đánh giá đầu tư",
    reportTemplatesForms: "Mẫu | Bảng biểu báo cáo",
    businessInformation: "Thông tin Doanh nghiệp",
    envProceduresDocsData: "Thủ tục | Hồ sơ | Dữ liệu môi trường",
    businessStatistics: "Thống kê doanh nghiệp",
    recruitment: "Tuyển dụng",
    businessSupport: "Hỗ trợ doanh nghiệp",
    // Ví dụ cho menu Văn bản
    legalDocuments: "Văn bản Pháp luật",
    centralLegalDocs: "Văn bản pháp quy trung ương",
    localLegalDocs: "Văn bản pháp quy địa phương",
    administrativeDocs: "Văn bản chỉ đạo điều hành",
    adminReformDocs: "Văn bản CCHC",
    guidelinesFeedback: "Hướng dẫn & Góp ý",
    guidanceDocs: "Văn bản hướng dẫn",
    draftDocFeedback: "Góp ý dự thảo văn bản",
    docSearch: "Tra cứu văn bản",
    docSearchSystem: "Hệ thống tra cứu văn bản",
    // Ví dụ cho menu Cải cách hành chính
    applicationsServices: "Ứng dụng & Dịch vụ",
    postalServices: "Bưu chính công ích",
    docLookup: "Tra cứu hồ sơ",
    onlineAppointment: "Đặt lịch hẹn giao dịch trực tuyến",
    serviceQualityAssessment: "Đánh giá chất lượng dịch vụ HCC",
    infoProcedures: "Thông tin & Quy trình",
    adminProcedures: "Thủ tục hành chính", // Đã có ở quickAccess, có thể dùng chung hoặc tạo key mới
    adminProcProcess: "Quy trình thực hiện thủ tục hành chính",
    investmentProcProcess: "Quy trình lĩnh vực đầu tư",
  },

  // Resources Section
  resourcesSection: {
    sectionTitle: "TƯ LIỆU",
    tabImages: "Hình ảnh",
    tabVideos: "Video",
    tabDocuments: "Tài liệu",
    dateLabel: "Ngày đăng",
    comingSoonTitle: "Đang phát triển",
    comingSoonVideos: "Sắp ra mắt: Video liên quan đến hoạt động và các khu của DSEZA.",
    comingSoonDocuments: "Sắp ra mắt: Tài liệu, báo cáo và khung pháp lý có thể tải về.",
    viewAll: "Xem tất cả tư liệu",
  },

  // Logo Search Bar
  logoSearchBar: {
    searchPlaceholder: "Tìm kiếm...",
    login: "Đăng nhập",
  },

  // Authentication
  auth: {
    login: {
      title: "Đăng nhập",
      description: "Nhập tài khoản hoặc email và mật khẩu để tiếp tục",
      email: "Email",
      emailPlaceholder: "ten@example.com",
      usernameOrEmail: "Tài khoản hoặc Email",
      usernameOrEmailPlaceholder: "admin hoặc ten@example.com",
      password: "Mật khẩu",
      passwordPlaceholder: "Nhập mật khẩu",
      forgotPassword: "Quên mật khẩu?",
      submitButton: "Đăng nhập",
      noAccount: "Chưa có tài khoản?",
      registerLink: "Đăng ký ngay",
      validation: {
        usernameOrEmailRequired: "Vui lòng nhập tài khoản hoặc email",
        passwordRequired: "Vui lòng nhập mật khẩu",
        invalidFormat: "Tài khoản không hợp lệ hoặc email sai định dạng",
      },
    },
    register: {
      title: "Tạo tài khoản",
      description: "Điền thông tin bên dưới để đăng ký tài khoản mới",
      fullName: "Tên người dùng",
      fullNamePlaceholder: "Nguyễn Văn A",
      email: "Địa chỉ Email",
      emailPlaceholder: "ten@example.com",
      password: "Mật khẩu",
      passwordPlaceholder: "Ít nhất 6 ký tự",
      confirmPassword: "Xác nhận mật khẩu",
      confirmPasswordPlaceholder: "Nhập lại mật khẩu",
      submitButton: "Đăng ký",
      hasAccount: "Đã có tài khoản?",
      loginLink: "Đăng nhập",
    },
  },

  // Language Switcher & Theme Toggle
  languageSwitcher: {
    vietnamese: "Tiếng Việt",
    english: "English",
  },
  themeToggle: {
    lightMode: "Chế độ sáng",
    darkMode: "Chế độ tối",
  },
};

const enTranslations: TranslationObject = {
  // Common
  sitemap: "Site Map",

  // Nav Items
  nav: {
    intro: "Introduction",
    news: "News",
    business: "Business",
    services: "Services",
    investments: "Investments",
    contact: "Contact",
    investmentGuide: "Investment Guide",
    documents: "Documents",
    adminReform: "Administrative Reform",
    utilities: "Utilities",
  },

  // Home Sections
  homepage: {
    featuredEvents: "FEATURED EVENTS",
    latestNews: "LATEST NEWS",
    viewAll: "View all",
    functionalZones: "FUNCTIONAL ZONES",
    functionalZonesMobile: "FUNCTIONAL ZONES",
    investmentInfo: "INVESTMENT INFORMATION",
    location: "LOCATION",
    resources: "RESOURCES",
    businessesAndPartners: "BUSINESSES & PARTNERS",
  },

  // Investment Information Section
  investment: {
    forInvestors: "For Investors",
    investmentEnvironment: "Investment Environment",
    investmentProcedures: "Investment Procedures",
    incentives: "Investment Incentives",
    services: "Utilities & Services",
    workforce: "Human Resources",
    infrastructure: "Infrastructure",
    environment: "Environment",
  },

  // Footer
  footer: {
    management: "Da Nang Specific Economic Zones Authority",
    address: "Address: Lot A17, Center Road, High-Tech Park, Hoa Lien Commune, Hoa Vang District, Da Nang",
    tel: "Tel",
    fax: "Fax",
    email: "Email",
    copyright: "Copyright © 2025 DSEZA. All rights reserved.",
    legalInfo: "Legal Information",
    networkCredibility: "Network Credibility",
    license: "License: No. 05/GP-STTTT issued by Danang Department of Information and Communications on 01/02/2020.",
    editor: "Editor in Chief: Tran Van Ty, Deputy Head of the Management Board of Da Nang Specific Economic Zones Authority.",
    citationConnect: "Citation & Connect",
    citationNote: "Please cite \"www.dseza.danang.gov.vn\" when referencing our information.",
    visitorCount: "Visitor count",
  },

  // Date formatting
  date: {
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },

  // Location Section
  location: {
    title: "LOCATION MAP",
    vrTour: "VR 360 Tour - Danang Hi-Tech Park",
    digitalMap: "Digital Map of High-Tech Park + Industrial Zones + Online Reports",
    digitalMapTitle: "Digital Map and Investment Reports",
    digitalMapDescription: "Interactive map with detailed data about industrial zones, business locations, and investment information.",
    accessDigitalMap: "Access Digital Map",
  },

  // News Section
  news: {
    title: "NEWS",
    categories: {
      investment: "Investment & International Cooperation",
      training: "Training & Business Incubation",
      digital: "Digital Transformation",
      management: "Management Activities",
      other: "Other News",
    },
    sampleNews: { // Giữ lại sample news nếu có nơi khác dùng, nếu không có thể xóa
      news1: {
        title: "Danang Hi-Tech Park Phase 2 Expansion Project Officially Launched",
        excerpt: "This morning, the Danang Hi-Tech Park and Industrial Zones Authority held the groundbreaking ceremony for phase 2 of the High-Tech Park expansion project, promising to attract more major technology corporations..."
      },
      news2: {
        title: "Danang Boosts International Cooperation in Semiconductor Industry",
        excerpt: "Multiple cooperation agreements have been signed to develop human resources and technology for the semiconductor industry..."
      },
      news3: {
        title: "New Investment Incentives for Businesses in Free Trade Zone",
        excerpt: "New policies focus on streamlining administrative procedures and enhancing tax incentives..."
      }
    }
  },

  // Functional Zones Section
  functionalZones: {
    title: "HIGH-TECH PARK, SEMICONDUCTOR & AI CENTER, INDUSTRIAL ZONES, IT ZONES, FREE TRADE ZONE",
    enterprises: "Enterprises",
    occupancyRate: "Occupancy Rate",
    area: "Area",
  },

  // Quick Access Buttons
  quickAccess: {
    onlinePublicService: "Online Public Services",
    administrativeProcedures: "Administrative Procedures",
    publicResults: "Public Administrative Results",
    feedbackChannel: "Feedback & Suggestion Channel",
    appointmentScheduling: "Online Appointment Scheduling",
  },

  // Featured Events
  featuredEvents: {
    title: "FEATURED EVENTS",
    eventPrefix: "Featured event",
  },

  // Hero Background Tabs
  heroBackground: {
    tab1: "Danang Hi-Tech Park",
    tab2: "Danang Hi-Tech Park",
    tab3: "Danang Hi-Tech Park",
    tab4: "Danang Hi-Tech Park",
  },

  // Special content in navigation menu AND Mobile Menu
  menuSpecial: {
    achievementTitle: "Outstanding Achievements",
    achievementDesc: "Danang Hi-Tech Park and Industrial Zones have become a key driving force for the city's development.",
    achievementBtn: "Learn more",
    featuredServiceTitle: "Featured Public Services",
    featuredServiceDesc: "Experience online public services at the Danang Hi-Tech Park and Industrial Zones Authority",
    featuredServiceBtn: "Access now",
    quickDocSearchTitle: "Quick Document Search",
    quickDocSearchPlaceholder: "Enter search keywords...",
    quickDocSearchBtn: "Search",
    supportServiceTitle: "Support Services",
    supportServiceDesc: "We provide a variety of support services for businesses in the industrial zones.",
    supportServiceBtn: "Contact support",
    newsCardTitle: "Latest news on Management Authority activities",
    newsCardDesc: "Get the latest updates on important activities and events.",
    newsCardBtn: "See more →",
    // Keys for mobile menu (example)
    letterOfGreeting: "Welcome Letter",
    overviewDanang: "Overview of Da Nang",
    overviewAuthority: "Overview of the Authority",
    functionsAndDuties: "Functions, Duties, and Powers",
    departments: "Departments",
    affiliatedUnits: "Affiliated Units",
    functionalAreas: "Functional Zones",
    // Add other keys for mobile menu sub-items here
    izHoaKhanh: "Hoa Khanh Industrial Zone",
    izHoaKhanhExpanded: "Hoa Khanh Expanded Industrial Zone",
    izDanang: "Da Nang Industrial Zone",
    izSeafoodService: "Da Nang Seafood Service Industrial Zone",
    izHoaCam: "Hoa Cam Industrial Zone",
    izLienChieu: "Lien Chieu Industrial Zone",
    izHoaNinh: "Hoa Ninh Industrial Zone",
    // Example for News menu
    newsEvents: "News | Events",
    newsInvestmentCooperation: "Investment - International Cooperation",
    newsDigitalTransformation: "Digital Transformation",
    newsTrainingIncubation: "Training, Startup Incubation",
    newsManagementActivities: "Management Activities",
    newsOther: "Other News",
    seeMore: "See More",
    workSchedule: "Work Schedule",
    announcements: "Announcements",
    pressInformation: "Press Information",
    // Example for Business menu
    reportsData: "Reports & Data",
    dsezaOnlineReports: "DSEZA Online Reports",
    investmentMonitoringReports: "Investment Monitoring Reports",
    reportTemplatesForms: "Templates | Report Forms",
    businessInformation: "Business Information",
    envProceduresDocsData: "Procedures | Documents | Environmental Data",
    businessStatistics: "Business Statistics",
    recruitment: "Recruitment",
    businessSupport: "Business Support",
    // Example for Documents menu
    legalDocuments: "Legal Documents",
    centralLegalDocs: "Central Legal Documents",
    localLegalDocs: "Local Legal Documents",
    administrativeDocs: "Administrative Documents",
    adminReformDocs: "Administrative Reform Documents",
    guidelinesFeedback: "Guidelines & Feedback",
    guidanceDocs: "Guidance Documents",
    draftDocFeedback: "Draft Document Feedback",
    docSearch: "Document Search",
    docSearchSystem: "Document Search System",
    // Example for Administrative Reform menu
    applicationsServices: "Applications & Services",
    postalServices: "Postal Services",
    docLookup: "Document Lookup",
    onlineAppointment: "Online Appointment Scheduling",
    serviceQualityAssessment: "Service Quality Assessment",
    infoProcedures: "Information & Procedures",
    adminProcedures: "Administrative Procedures",
    adminProcProcess: "Administrative Procedure Process",
    investmentProcProcess: "Investment Process",
  },

  // Resources Section
  resourcesSection: {
    sectionTitle: "RESOURCES",
    tabImages: "Images",
    tabVideos: "Videos",
    tabDocuments: "Documents",
    dateLabel: "Date posted",
    comingSoonTitle: "Coming soon",
    comingSoonVideos: "Coming soon: Videos related to DSEZA's activities and zones.",
    comingSoonDocuments: "Coming soon: Downloadable documents, reports, and legal frameworks.",
    viewAll: "View all resources",
  },

  // Logo Search Bar
  logoSearchBar: {
    searchPlaceholder: "Search...",
    register: "Register",
    login: "Login",
  },

  // Authentication
  auth: {
    login: {
      title: "Login",
      description: "Enter your username or email and password to continue",
      usernameOrEmail: "Username or Email",
      usernameOrEmailPlaceholder: "admin or name@example.com",
      password: "Password",
      forgotPassword: "Forgot password?",
      submitButton: "Login",
      noAccount: "Don't have an account?",
      registerLink: "Register now",
      validation: {
        usernameOrEmailRequired: "Please enter username or email",
        passwordRequired: "Please enter password",
        invalidFormat: "Invalid username or email format",
      },
    },
    register: {
      title: "Create Account",
      description: "Fill in the details below to register a new account",
      fullName: "Full Name",
      fullNamePlaceholder: "John Doe",
      email: "Email Address",
      emailPlaceholder: "john.doe@example.com",
      password: "Password",
      passwordPlaceholder: "At least 6 characters",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Re-enter password",
      submitButton: "Register",
      hasAccount: "Already have an account?",
      loginLink: "Login",
    },
  },

  // Language Switcher & Theme Toggle
  languageSwitcher: {
    vietnamese: "Vietnamese",
    english: "English",
  },
  themeToggle: {
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
  },
};

// All translations
const translations = {
  vi: viTranslations,
  en: enTranslations,
};

/**
 * Gets the value from a nested object using a dot-notation path
 * @param obj - The object to get the value from
 * @param path - The path to the value (e.g., "nav.intro")
 * @returns The value at the path or undefined if not found
 */
const getNestedValue = (obj: any, path: string): string | undefined => {
  const keys = path.split('.');
  let value = obj;

  for (const key of keys) {
    if (value === undefined || value === null) {
      return undefined;
    }
    value = value[key];
  }

  return typeof value === 'string' ? value : undefined;
};

/**
 * Hook to get translations based on the current language
 * @returns An object with t function to get translations
 */
export const useTranslation = () => {
  const { language } = useLanguage();

  /**
   * Get a translation by key
   * @param key - The translation key (can be a dot notation for nested keys)
   * @returns The translated string or the key itself if not found
   */
  const t = (key: string): string => {
    const translationSet = translations[language];
    const translation = getNestedValue(translationSet, key);
    // Fallback to the key itself if translation is not found
    // or if the key points to an object (meaning it's a parent key, not a string leaf)
    if (translation === undefined || typeof translation !== 'string') {
        // console.warn(`Translation key not found or not a string: ${key}`); // Optional: for debugging
        return key;
    }
    return translation;
  };

  return { t, language };
};

/**
 * Formats a date and time according to the current language
 * @param date - The date to format
 * @param includeTime - Whether to include time (HH:MM:SS) in the output. Defaults to false.
 * @returns A formatted date string, optionally with time
 */
export const formatDate = (date: Date, includeTime: boolean = false): string => {
  const { language } = useLanguage(); // This hook now correctly calls useLanguage from the context
  const translationSet = language === 'vi' ? viTranslations : enTranslations;

  const dateTranslation = translationSet.date as TranslationObject;
  const dayNames = dateTranslation.dayNames as string[];

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  let formattedDateString: string;

  if (language === 'vi') {
    formattedDateString = `${dayNames[date.getDay()]}, ${day}/${month}/${year}`;
  } else {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    formattedDateString = `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${day}, ${year}`;
  }

  if (includeTime) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    formattedDateString += ` | ${hours}:${minutes}:${seconds}`;
  }

  return formattedDateString;
};