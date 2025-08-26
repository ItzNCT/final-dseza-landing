import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Vietnamese translations
const viTranslation = {
  "sitemap": "Sơ đồ site",
  "nav": {
    "intro": "Giới thiệu",
    "introGeneral": "Giới thiệu chung",
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
    "dataSource": "Dữ liệu được cập nhật từ hệ thống DSEZA",
    "noDataTitle": "Chưa có dữ liệu",
    "noZones": "Chưa có thông tin về các khu chức năng.",
    "listTitle": "Các Khu chức năng",
    "listSubtitle": "Khám phá các khu công nghệ cao, khu công nghiệp và khu chức năng đặc biệt tại Đà Nẵng",
    "badges": {
      "nearFull": "Gần đầy",
      "highRate": "Tỉ lệ cao",
      "medium": "Trung bình",
      "available": "Còn trống",
      "largeScale": "Quy mô lớn"
    }
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
    },
    "logout": "Đăng xuất",
    "hello": "Chào"
  },
  "profile": {
    "title": "Thông tin Tài khoản",
    "description": "Quản lý thông tin cá nhân và bảo mật tài khoản",
    "name": "Tên người dùng",
    "email": "Địa chỉ Email",
    "role": "Vai trò",
    "currentPassword": "Mật khẩu hiện tại",
    "currentPasswordPlaceholder": "Nhập mật khẩu hiện tại",
    "newPassword": "Mật khẩu mới",
    "newPasswordPlaceholder": "Nhập mật khẩu mới (ít nhất 6 ký tự)",
    "confirmNewPassword": "Xác nhận mật khẩu mới",
    "confirmNewPasswordPlaceholder": "Nhập lại mật khẩu mới",
    "saveChanges": "Lưu thay đổi"
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
    "debugInfo": "Thông tin debug",
    "home": "Trang chủ"
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
  "draft": {
    "breadcrumb": {
      "home": "Trang chủ",
      "documents": "Văn bản",
      "guide": "Hướng dẫn góp ý",
      "list": "Góp ý dự thảo văn bản"
    },
    "pageTitle": "Góp ý dự thảo văn bản",
    "description": "Danh sách các dự thảo văn bản đang được lấy ý kiến và đã hết thời gian lấy ý kiến từ Ban Quản lý Khu công nghệ cao Đà Nẵng.",
    "loading": "Đang tải dữ liệu...",
    "errorTitle": "Có lỗi xảy ra",
    "errorLoading": "Không thể tải dữ liệu dự thảo văn bản",
    "tabs": {
      "open": "Dự thảo lấy ý kiến",
      "closed": "Dự thảo hết thời gian lấy ý kiến"
    },
    "emptyOpen": {
      "title": "Hiện tại không có dự thảo văn bản nào đang lấy ý kiến",
      "desc": "Vui lòng kiểm tra lại sau hoặc xem các dự thảo đã hết thời gian lấy ý kiến."
    },
    "emptyClosed": {
      "title": "Chưa có dự thảo văn bản nào hết thời gian lấy ý kiến",
      "desc": "Danh sách này sẽ hiển thị các dự thảo đã hết thời gian lấy ý kiến."
    },
    "card": {
      "statusOpen": "Đang lấy ý kiến",
      "statusClosed": "Hết thời gian",
      "published": "Ngày công bố:",
      "deadline": "Hết hạn góp ý:",
      "viewDetail": "Xem chi tiết",
      "download": "Tải tài liệu"
    },
    "detail": {
      "statusOpen": "Đang lấy ý kiến",
      "statusClosed": "Hết thời gian lấy ý kiến",
      "published": "Ngày công bố:",
      "deadline": "Hết hạn góp ý:",
      "field": "Lĩnh vực:",
      "attachments": "Tài liệu đính kèm",
      "download": "Tải xuống",
      "commentsTitle": "Góp ý và bình luận",
      "openNotice": "Dự thảo này đang trong thời gian lấy ý kiến. Bạn có thể gửi góp ý, bình luận bên dưới.",
      "closedNotice": "Thời gian lấy ý kiến cho dự thảo này đã kết thúc. Bạn vẫn có thể xem các bình luận đã được gửi.",
      "backList": "Quay lại danh sách"
    }
  },
  "welcome": {
    "title": "Thư ngỏ",
    "pageTitle": "Thư ngỏ",
    "greeting": "Chào mừng quý vị đã đến với DSEZA chúng tôi,",
    "introduction": "Lời đầu tiên, Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà nẵng (DSEZA) xin được gửi đến Quý tổ chức, doanh nghiệp, nhà đầu tư, cá nhân lời chào trân trọng, lời chúc sức khỏe, an khang và thịnh vượng.",
    "paragraph1": "Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng được thành lập dựa trên cơ sở hợp nhất Ban Quản lý các Khu công nghiệp và chế xuất Đà Nẵng và Ban Quản lý Khu công nghệ cao Đà Nẵng, từ tháng 10/2018 nhằm đáp ứng với chủ trương của Chính phủ, Nhà nước và phù hợp với yêu cầu phát triển kinh tế - xã hội của cả nước và của thành phố Đà Nẵng.",
    "paragraph2": "Ngày 29/4/2025, UBND TP.Đà Nẵng ban hành quyết định số 34/2025/QĐ-UBND quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của ban quản lý, trong đó đáng chú ý là chức năng mới quản lý Khu thương mại tự do. Quyết định này thay thế các quyết định trước đó về quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Ban quản lý Khu Công nghệ cao và các KCN Đà Nẵng - đơn vị trực thuộc UBND thành phố.",
    "paragraph3": "Ban Quản lý là cơ quan trực thuộc Ủy ban nhân dân thành phố Đà Nẵng, thực hiện chức năng quản lý nhà nước trực tiếp đối với khu công nghệ cao, khu công nghệ thông tin tập trung Đà Nẵng và các khu công nghiệp trên địa bàn thành phố Đà Nẵng; quản lý và tổ chức thực hiện chức năng cung ứng dịch vụ hành chính công và dịch vụ hỗ trợ khác có liên quan đến hoạt động đầu tư và sản xuất, kinh doanh cho nhà đầu tư trong khu công nghệ cao, khu công nghệ thông tin tập trung Đà Nẵng và các khu công nghiệp trên địa bàn thành phố Đà Nẵng theo quy định của pháp luật.",
    "paragraph4": "Với tinh thần thiện chí của mình tại khu công nghệ cao, khu công nghệ thông tin tập trung Đà Nẵng và các khu công nghiệp trên địa bàn thành phố Đà Nẵng.  DSEZA cam kết luôn đồng hành cùng các tổ chức, doanh nghiệp, nhà đầu tư, cá nhân khi đặt niềm tin, lựa chọn khu công nghệ cao, khu công nghệ thông tin tập trung Đà Nẵng và các khu công nghiệp  trên địa bàn thành phố Đà Nẵng làm điểm đến trong thời gian qua, cũng như hiện tại và trong tương lai",
    "paragraph5": "Hy vọng quý tổ chức, doanh nghiệp, nhà đầu tư, cá nhân thật sự hài lòngvới DSEZA và thành phố Đà Nẵng. Một lần nữa, kính chúc quý vị luôn gặp nhiều may mắn, thành công và phát đạt.",
    "closing": "Trân trọng cảm ơn.",
    "signature": "DSEZA",
    "download": "Tải xuống",
    "share": "Chia sẻ",
    "print": "In",
    "shareTitle": "Chia sẻ trang:",
    "downloadingTitle": "Đang tải xuống tài liệu...",
    "shareSuccess": "Đã sao chép link vào clipboard!"
  },
  "affiliatedUnits": {
    "title": "Đơn vị trực thuộc",
    "pageTitle": "Đơn vị trực thuộc",
    "section1Title": "I. CÁC ĐƠN VỊ TRỰC THUỘC",
    "section2Title": "II. CÁC ĐƠN VỊ CHỦ ĐẦU TƯ KINH DOANH HẠ TẦNG TẠI CÁC KHU CÔNG NGHIỆP",
    "unit1Name": "Trung tâm Dịch vụ Tổng hợp Khu công nghệ cao Đà Nẵng",
    "unit2Name": "Công ty Phát triển và Khai thác hạ tầng Khu Công nghiệp Đà Nẵng",
    "unit3Name": "Công ty cổ phần Đầu tư Sài gòn-Đà Nẵng",
    "unit4Name": "Công ty TNHH Massda Land",
    "unit5Name": "Công ty Cổ phần Đầu tư khu công nghiệp Hòa Cầm",
    "updateInfo": "Thông tin chi tiết đang được cập nhật...",
    "director": "Giám đốc",
    "deputyDirector": "Phó Giám đốc",
    "officePhone": "Điện thoại văn phòng",
    "mobilePhone": "Điện thoại di động",
    "address": "Địa chỉ",
    "phone": "Điện thoại",
    "fax": "Fax",
    "email": "Email",
    "website": "Website",
    "download": "Tải xuống",
    "share": "Chia sẻ",
    "print": "In",
    "shareTitle": "Chia sẻ trang:",
    "downloadingTitle": "Đang tải xuống tài liệu...",
    "shareSuccess": "Đã sao chép link vào clipboard!"
  },
  "danangOverview": {
    "title": "Tổng quan về Đà Nẵng",
    "pageTitle": "Tổng quan về Đà Nẵng",
    "section1Title": "1. DIỆN TÍCH, DÂN SỐ, ĐƠN VỊ HÀNH CHÍNH",
    "section1Content": "Đà Nẵng nằm ở vị trí trung độ của Việt Nam, là trung tâm kinh tế, văn hoá, giáo dục, khoa học và công nghệ lớn của khu vực miền Trung - Tây Nguyên. Đà Nẵng hiện là 01 trong 5 thành phố trực thuộc Trung ương (Hà Nội, thành phố Hồ Chí Minh, Hải Phòng, Đà Nẵng và Cần Thơ).",
    "area": "Diện tích",
    "areaValue": "1.285,4km²",
    "population": "Dân số",
    "populationValue": "1.046.876 người (tính đến tháng 01/2015)",
    "density": "Mật độ dân số",
    "densityValue": "892 người/km²",
    "administrative": "Đơn vị hành chính",
    "administrativeValue": "6 quận (Hải Châu, Thanh Khê, Liên Chiểu, Ngũ Hành Sơn, Sơn Trà, Cẩm Lệ), 1 huyện ngoại thành (huyện Hòa Vang) và 1 huyện đảo (Hoàng Sa).",
    "section2Title": "2. KHÍ HẬU",
    "section2Content": "Đà Nẵng nằm trong vùng khí hậu nhiệt đới gió mùa điển hình, nhiệt độ cao và ít biến động.",
    "seasons": "Mỗi năm có 2 mùa rõ rệt: mùa mưa (từ tháng 8 đến tháng 12) và mùa khô (từ tháng 1 đến tháng 7). Mỗi năm, Đà Nẵng chịu ảnh hưởng trực tiếp từ một đến hai cơn bão hoặc áp thấp nhiệt đới.",
    "temperature": "Nhiệt độ trung bình hàng năm",
    "temperatureValue": "khoảng 25,9°C. Riêng vùng rừng núi Bà Nà ở độ cao gần 1.500 m, nhiệt độ trung bình khoảng 20°C.",
    "humidity": "Độ ẩm không khí trung bình",
    "humidityValue": "83,4%",
    "rainfall": "Lượng mưa trung bình hàng năm",
    "rainfallValue": "2.504,57 mm",
    "sunshine": "Số giờ nắng bình quân trong năm",
    "sunshineValue": "2.156,2 giờ",
    "section3Title": "3. MỘT SỐ CHỈ SỐ KINH TẾ CỦA THÀNH PHỐ",
    "gdpGrowth": "Tốc độ tăng trưởng GDP (ước 2013)",
    "gdpGrowthValue": "8,1%",
    "income": "Thu nhập bình quân đầu người (ước 2013)",
    "incomeValue": "56,3 triệu đồng/người/năm (tương đương 2.686USD/người/năm)",
    "investment": "Đầu tư",
    "investmentValue": "Tính đến tháng 3/2015, Đà Nẵng đã thu hút được 322 dự án FDI còn hiệu lực đến từ 37 quốc gia, vùng lãnh thổ với tổng vốn đầu tư hơn 3,389 tỷ USD.",
    "tourism": "Du lịch",
    "tourismRevenue": "Doanh thu du lịch (ước 2013): 7.784,1 tỷ đồng",
    "touristCount": "Lượt khách du lịch (ước 2013): 3,117 triệu lượt khách, trong đó: 743,2 nghìn lượt khách quốc tế và 2,374 triệu lượt khách trong nước.",
    "section4Title": "4. ĐÀ NẴNG - ĐIỂM ĐẾN HẤP DẪN DÀNH CHO CÁC NHÀ ĐẦU TƯ",
    "locationTitle": "a. Vị trí địa lý chiến lược",
    "locationContent1": "Đà Nẵng cách thủ đô Hà Nội 764 km về phía bắc, cách thành phố Hồ Chí Minh 964 km về phía nam, nằm trên trục giao thông Bắc - Nam về đường bộ, đường sắt, đường biển và đường hàng không, là một trong những cửa ngõ quan trọng ra biển của Tây Nguyên và các nước Lào, đông bắc Campuchia, Thái Lan và Myanma.",
    "locationContent2": "Khoảng cách từ Đà Nẵng đến các trung tâm kinh tế chính của khu vực Đông Nam Á như Bangkok (Thái Lan), Kuala Lumpur (Malaysia), Singapore, Manila (Philipines) đều nằm trong khoảng 1.000 - 2.000 km.",
    "locationContent3": "Đà Nẵng còn là cửa ngõ phía Đông của Hành lang Kinh tế Đông - Tây ra Thái Bình Dương, là cửa vào của các di sản văn hóa và di sản thiên nhiên thế giới (Đô thị cổ Hội An, Thánh địa Mỹ Sơn, Cố đô Huế, Phong Nha - Kẻ Bàng).",
    "locationContent4": "Đà Nẵng là Thành phố động lực của Vùng Kinh tế trọng điểm miền Trung, gồm 5 tỉnh, thành: Thừa Thiên - Huế, Đà Nẵng, Quảng Nam, Quảng Ngãi và Bình Định.",
    "infraTitle": "b. Cơ sở hạ tầng phát triển",
    "portTitle": "Cảng Tiên Sa:",
    "portContent1": "Là cảng thương mại lớn thứ ba của Việt Nam sau Cảng Sài Gòn và Cảng Hải Phòng.",
    "portContent2": "Năng lực bốc dỡ hàng hoá 4 triệu tấn/năm, có thể tiếp nhận các loại tàu hàng có trọng tải 45.000DWT và các tàu chuyên dùng khác như tàu container, tàu khách, tàu hàng siêu trường siêu trọng.",
    "portContent3": "Từ Cảng Tiên Sa (Đà Nẵng) hiện có các tuyến tàu biển quốc tế đi Hồng Kông, Singapore, Nhật Bản, Đài Loan và Hàn Quốc.",
    "airportTitle": "Sân bay quốc tế Đà Nẵng:",
    "airportContent": "Công suất phục vụ 6,5 triệu lượt khách/năm, dự kiến đạt mức 10 triệu hành khách mỗi năm vào năm 2020.",
    "roadTitle": "Hệ thống đường giao thông:",
    "roadContent": "Không ngừng được mở rộng, với nhiều công trình lớn trên địa bàn thành phố như đường Võ Nguyên Giáp, cầu Trần Thị Lý, cầu Rồng, cầu Nguyễn Tri Phương, cầu Sông Hàn, cầu Tiên Sơn, cầu Thuận Phước, nút giao thông khác mức Ngã ba Huế… Hệ thống giao thông kết nối với các tỉnh, thành bên ngoài có hầm đường bộ Hải Vân, Quốc lộ 14B, Quốc lộ 1A và sắp tới là đường cao tốc Đà Nẵng - Quảng Ngãi (đang triển khai thi công) tạo điều kiện thuận lợi về giao thông và phát triển du lịch.",
    "utilityTitle": "Hệ thống cấp điện, cấp nước:",
    "utilityContent": "Hệ thống cấp điện, cấp nước trong thành phố luôn đảm bảo cho nhu cầu sản xuất và sinh hoạt hàng ngày. Nhà máy nước Đà Nẵng hiện có công suất 120.000m³/ngày đêm và dự kiến nâng tổng công suất cấp nước lên 325.000m³/ngày đêm vào năm 2020.",
    "commTitle": "Bưu chính - viễn thông:",
    "commContent": "Là một trong ba trung tâm bưu chính, viễn thông lớn của Việt Nam và là một trong ba điểm kết nối cuối cùng quan trọng nhất của mạng trung kế đường trục quốc gia và điểm kết nối trực tiếp với Trạm cáp quang biển quốc tế SEAMEWE 3 với tổng dung lượng 10Gbps kết nối Việt Nam với gần 40 nước ở Châu Á và Châu Âu. Hệ thống wifi phủ sóng trung tâm thành phố.",
    "envTitle": "c. Môi trường đầu tư thông thoáng",
    "envContent1": "Dẫn đầu cả nước nhiều năm liên tục về chỉ số năng lực cạnh tranh cấp tỉnh (2008, 2009, 2010, 2013).",
    "envContent2": "Dẫn đầu cả nước 5 năm liên tiếp về chỉ số sẵn sàng phát triển và ứng dụng công nghệ thông tin (2009, 2010, 2011, 2012 và 2013).",
    "envContent3": "Dẫn đầu cả nước về chỉ số cải cách hành chính năm 2013.",
    "envContent4": "Chính sách ưu đãi hấp dẫn và chi phí đầu tư thấp: Giá thuê đất, tiền sử dụng hạ tầng, tiền xử lý nước thải, chi phí thuê nhân công, dịch vụ đều được đánh giá là thấp.",
    "hrTitle": "d. Nguồn nhân lực dồi dào",
    "hrContent1": "Tính đến năm 2012, lực lượng lao động toàn thành phố là 515.018 người, chiếm 53% tổng dân số của thành phố, trong đó:",
    "hrTech": "Công nhân kỹ thuật: 36.961 người",
    "hrMid": "Trung cấp: 35.126 người",
    "hrHigh": "Đại học, cao đẳng: 106.681 người",
    "hrOther": "Khác: 336.250 người",
    "hrContent2": "Theo Quy hoạch phát triển nhân lực của thành phố đến năm 2020, Đà Nẵng có 70% lao động qua đào tạo, trong đó có 21% có trình độ đại học, cao đẳng; 16% có trình độ trung cấp chuyên nghiệp và 33% có trình độ công nhân kỹ thuật.",
    "livingTitle": "e. Môi trường sống thân thiện",
    "livingContent1": "Giải thưởng Phong cảnh thành phố châu Á năm 2013 (Chủ đề \"Thành phố, niềm tự hào của người dân\" do Tổ chức Định cư con người Liên Hiệp Quốc tại Châu Á (UN Habitat Châu Á) bình chọn.",
    "livingContent2": "Giải thưởng Thành phố bền vững về môi trường ASEAN năm 2011 do các nước thành viên ASEAN bình chọn.",
    "livingContent3": "Đà Nẵng được xem là điểm hẹn đầu tư hấp dẫn và đang hướng đến là thành phố sống tốt tại Việt Nam đối với các nhà đầu tư nước ngoài.",
    "section5Title": "5. TÌNH HÌNH THU HÚT ĐẦU TƯ TRỰC TIẾP NƯỚC NGOÀI (FDI)",
    "section5Content": "Tính đến 15/4/2015, thành phố Đà Nẵng đã thu hút được 324 dự án FDI còn hiệu lực với tổng vốn đăng ký đạt hơn 3,39 tỷ USD.",
    "fdiCapitalTitle": "a. Các quốc gia đầu tư dẫn đầu về vốn đầu tư tại Đà Nẵng",
    "fdiProjectTitle": "b. Các quốc gia đầu tư dẫn đầu về số dự án đầu tư tại Đà Nẵng",
    "fdiSectorTitle": "c. Đầu tư FDI phân theo lĩnh vực (theo cơ cấu số dự án đầu tư)",
    "source": "Nguồn",
    "sourceWikipedia": "(Nguồn: Wikipedia)",
    "sourceDanangStats": "(Nguồn: Wikipedia, Cục Thống kê Đà Nẵng)",
    "sourceDseza": "(Nguồn: Trung tâm Xúc tiến đầu tư Đà Nẵng)",
    "download": "Tải xuống",
    "share": "Chia sẻ",
    "print": "In",
    "shareTitle": "Chia sẻ trang:",
    "downloadingTitle": "Đang tải xuống tài liệu...",
    "shareSuccess": "Đã sao chép link vào clipboard!"
  },
  "managementOverview": {
    "title": "Tổng quan về Ban Quản lý",
    "pageTitle": "Tổng quan về Ban Quản lý",
    "breadcrumbGeneral": "Giới thiệu chung",
    "introduction": "Ban Quản lý Khu Công nghệ cao Đà Nẵng là cơ quan chuyên môn thuộc UBND thành phố Đà Nẵng, có chức năng tham mưu, giúp UBND thành phố quản lý nhà nước về hoạt động đầu tư xây dựng, kinh doanh và các dịch vụ trong Khu Công nghệ cao Đà Nẵng.",
    "organizationalStructure": {
      "title": "Cơ cấu tổ chức",
      "description": "Sơ đồ tổ chức và cơ cấu quản lý của Ban Quản lý Khu Công nghệ cao Đà Nẵng"
    },
    "functionsResponsibilities": {
      "title": "Chức năng nhiệm vụ",
      "description": "Các chức năng, nhiệm vụ và quyền hạn của Ban Quản lý theo quy định"
    },
    "affiliatedUnits": {
      "title": "Đơn vị trực thuộc",
      "description": "Thông tin về các đơn vị trực thuộc và đơn vị chủ đầu tư kinh doanh hạ tầng"
    },
    "download": "Tải xuống",
    "share": "Chia sẻ",
    "print": "In",
    "shareTitle": "Chia sẻ trang:",
    "downloadingTitle": "Đang tải xuống tài liệu...",
    "shareSuccess": "Đã sao chép link vào clipboard!"
  },
  "functions": {
    "title": "Chức năng, nhiệm vụ",
    "pageTitle": "Chức năng, nhiệm vụ, quyền hạn Ban Quản lý",
    "breadcrumbGeneral": "Tổng quan về Ban Quản lý",
    "generalIntroduction": "Giới thiệu chung",
    "section1Title": "1. Chức năng",
    "section2Title": "2. Nhiệm vụ và Quyền hạn",
    "section3Title": "3. Sơ đồ tổ chức",
    "introduction1": "Ban Quản lý Khu công nghệ cao và các khu công nghiệp Đà Nẵng được thành lập theo Quyết định số 1296/QĐ-TTg ngày 03/10/2018 của Thủ tướng Chính phủ.",
    "introduction2": "Đây là đầu mối thống nhất quản lý các KCN trên địa bàn thành phố và xúc tiến đầu tư.",
    "functionMain": "Chức năng chính: Cơ quan trực thuộc UBND thành phố, thực hiện chức năng quản lý nhà nước trực tiếp đối với Khu công nghệ cao và các khu công nghiệp.",
    "functionPoint1": "Quản lý và cung ứng dịch vụ hành chính công",
    "functionPoint2": "Hỗ trợ hoạt động đầu tư và sản xuất kinh doanh",
    "functionPoint3": "Có tư cách pháp nhân và tài khoản riêng",
    "legalBasis": "Căn cứ pháp lý:",
    "legalPoint1": "Điều 35 Nghị định số 99/2003/NĐ-CP (Quy chế Khu công nghệ cao)",
    "legalPoint2": "Điều 63 Nghị định số 82/2018/NĐ-CP (Quản lý KCN và khu kinh tế)",
    "legalPoint3": "Các văn bản pháp luật khác có liên quan",
    "organizationChart": "SƠ ĐỒ TỔ CHỨC BAN QUẢN LÝ",
    "organizationSubtitle": "KHU CÔNG NGHỆ CAO VÀ CÁC KHU CÔNG NGHIỆP ĐÀ NẴNG",
    "organizationUpdating": "Sơ đồ tổ chức chi tiết đang được cập nhật...",
    "detailedIntro1": "Ban quản lý Khu công nghệ cao và các Khu công nghiệp Đà Nẵng (sau đây viết tắt là Ban Quản lý) là cơ quan trực thuộc UBND thành phố, thực hiện chức năng quản lý nhà nước trực tiếp đối với Khu công nghệ cao và các khu công nghiệp trên địa bàn Đà Nẵng; quản lý và tổ chức thực hiện chức năng cung ứng dịch vụ hành chính công và dịch vụ hỗ trợ khác có liên quan đến hoạt động đầu tư và sản xuất, kinh doanh cho nhà đầu tư trong khu công nghệ cao và các khu công nghiệp.",
    "detailedIntro2": "Ban Quản lý chịu sự chỉ đạo và quản lý về tổ chức, biên chế, chương trình kế hoạch công tác và kinh phí hoạt động của Ủy ban nhân dân thành phố; chịu sự chỉ đạo, hướng dẫn và kiểm tra về chuyên môn nghiệp vụ của các Bộ, ngành quản lý về lĩnh vực có liên quan.",
    "detailedIntro3": "Ban Quản lý có tư cách pháp nhân; có con dấu mang hình quốc huy và tài khoản riêng; kinh phí quản lý hành chính nhà nước, kinh phí hoạt động sự nghiệp và vốn đầu tư phát triển do ngân sách nhà nước cấp theo kế hoạch hàng năm.",
    "dutiesIntro": "Ban Quản lý thực hiện nhiệm vụ, quyền hạn theo quy định tại:",
    "dutiesPoint1": "Điều 35 Nghị định số 99/2003/NĐ-CP ngày 28 tháng 8 năm 2003 của Chính phủ về việc ban hành Quy chế Khu công nghệ cao.",
    "dutiesPoint2": "Điều 63 Nghị định số 82/2018/NĐ-CP ngày 22 tháng 5 năm 2018 của Chính phủ quy định về quản lý khu công nghiệp và khu kinh tế.",
    "dutiesPoint3": "Các văn bản pháp luật khác có liên quan.",
    "organizationFullTitle": "SƠ ĐỒ TỔ CHỨC BAN QUẢN LÝ KHU CÔNG NGHỆ CAO VÀ CÁC KHU CÔNG NGHIỆP ĐÀ NẴNG",
    "organizationNote": "Sơ đồ tổ chức chi tiết đang được cập nhật...",
    "download": "Tải xuống",
    "share": "Chia sẻ",
    "print": "In",
    "shareTitle": "Chia sẻ trang:",
    "downloadingTitle": "Đang tải xuống tài liệu...",
    "shareSuccess": "Đã sao chép link vào clipboard!"
  },
  "departments": {
    "title": "Cơ cấu tổ chức",
    "pageTitle": "Cơ cấu tổ chức - Các phòng ban",
    "breadcrumbGeneral": "Tổng quan về Ban Quản lý",
    "office": {
      "title": "I. VĂN PHÒNG",
      "mainFunction": "Chức năng chính: Tham mưu quản lý công tác tổ chức, cán bộ; quản lý tài chính; thực hiện công tác văn thư, lưu trữ; điều hành các hoạt động của Ban Quản lý.",
      "documentReceiving": "Tiếp nhận hồ sơ",
      "detailedDuties": [
        "Tham mưu, quản lý về công tác tổ chức, cán bộ.",
        "Tham mưu xây dựng các quy chế, quy định nội bộ của Ban Quản lý.",
        "Tham mưu công tác bảo vệ bí mật nhà nước.",
        "Tham mưu, dự toán ngân sách, kinh phí hoạt động hàng năm của Ban Quản lý; hướng dẫn, giám sát kế toán tài chính các đơn vị trực thuộc Ban Quản lý.",
        "Tham mưu, tổ chức, theo dõi phong trào thi đua – khen thưởng Ban Quản lý, doanh nghiệp KCN.",
        "Tham mưu, tổ chức thực hiện nhiệm vụ công tác cải cách hành chính nhà nước về lĩnh vực thuộc thẩm quyền của Ban Quản lý.",
        "Điều hành Bộ phận tiếp nhận và trả kết quả.",
        "Tổ chức thực hiện công tác văn thư, lưu trữ; quản lý và sử dụng con dấu của cơ quan.",
        "Rà soát văn bản đi trước khi trình Lãnh đạo Ban ký.",
        "Tham mưu quản lý, điều hành hệ thống mạng LAN, hệ thống quản lý văn bản và điều hành, trang thông tin điện tử của Ban Quản lý, các công tác liên quan đến ứng dụng công nghệ thông tin.",
        "Theo dõi công tác xây dựng, áp dụng và cải tiến hệ thống quản lý chất lượng theo tiêu chuẩn TCVN ISO 9001: 2008 Ban Quản lý.",
        "Triển khai, theo dõi công tác dân chủ cơ sở, cơ quan văn hóa và các công tác về nề nếp làm việc, tinh thần trách nhiệm của cán bộ công chức.",
        "Chủ trì tham mưu tổ chức các cuộc họp giao ban với các doanh nghiệp trong KCN; giao ban định kỳ của Ban Quản lý.",
        "Tổng hợp báo cáo tuần, báo cáo giao ban và thông báo kết luận giao ban hàng tháng của Lãnh đạo Ban.",
        "Thực hiện công tác công tác lễ tân, tổ chức hội nghị, hội thảo và các hoạt động lễ hội của Ban Quản lý, các cấp phát động.",
        "Quản lý điều hành các phương tiện, đầu mối quản lý tài sản trang thiết bị của cơ quan.",
        "Thực hiện các công việc khác do Lãnh đạo Ban giao."
      ]
    },
    "investmentDept": {
      "title": "II. PHÒNG QUẢN LÝ, XÚC TIẾN VÀ HỖ TRỢ ĐẦU TƯ",
      "function": "Chức năng:",
      "functionDesc": "Tham mưu về xúc tiến đầu tư, quản lý dự án, hỗ trợ nhà đầu tư, đối ngoại và hợp tác quốc tế.",
      "duties": "Nhiệm vụ chính:",
      "dutiesDesc": "Xúc tiến đầu tư và quảng bá, Cấp Giấy chứng nhận đầu tư, Quản lý các dự án đầu tư, Hỗ trợ nhà đầu tư, Hợp tác quốc tế",
      "fullFunctionDesc": "Tham mưu cho Lãnh đạo Ban Quản lý Khu CNC và các KCN về các lĩnh vực: Xúc tiến đầu tư; quản lý dự án đầu tư; hỗ trợ nhà đầu tư; đối ngoại, hợp tác quốc tế.",
      "detailedSections": {
        "investmentPromotion": {
          "title": "a) Công tác xúc tiến đầu tư",
          "duties": [
            "- Tham mưu xây dựng và tổ chức thực hiện kế hoạch, chương trình xúc tiến đầu tư hàng năm, 05 năm và dài hạn của Khu CNC và các KCN.",
            "- Tổ chức đón tiếp các nhà đầu tư và các đoàn khách trong và ngoài nước đến thăm và tìm hiểu cơ hội đầu tư tại Khu CNC và các KCN.",
            "- Chủ trì tổ chức hoặc tham gia các hội nghị, hội thảo, sự kiện về xúc tiến đầu tư; đề xuất tổ chức các đoàn công tác xúc tiến đầu tư trong nước và nước ngoài; tổ chức tuyên truyền, quảng bá thông tin, hình ảnh Khu CNC và các KCN.",
            "- Thiết kế các công cụ, biên soạn và quản lý các tài liệu xúc tiến đầu tư phục vụ công tác xúc tiến đầu tư.",
            "- Chủ trì, phối hợp với Văn phòng nghiên cứu triển khai các công cụ, phần mềm trên máy tính và môi trường Internet để nâng cao hiệu quả hoạt động hỗ trợ và xúc tiến đầu tư.",
            "- Quản trị và thực hiện các báo cáo tình hình hoạt động đối với Website Khu CNC phiên bản tiếng Anh, tiếng Nhật và tiếng Hàn; thực hiện nhiệm vụ Thư ký Ban biên tập Website."
          ]
        },
        "investmentCertificate": {
          "title": "b) Cấp Giấy chứng nhận đăng ký đầu tư",
          "description": "- Chủ trì tham mưu giải quyết các thủ tục hành chính; cấp Giấy chứng nhận đăng ký đầu tư hoặc quyết định chủ trương đầu tư."
        },
        "projectManagement": {
          "title": "c) Công tác quản lý các dự án đầu tư",
          "duties": [
            "- Tham mưu xây dựng, giải quyết các thủ tục thuộc thẩm quyền của Ban Quản lý Khu CNC và các KCN trong lĩnh vực đầu tư.",
            "- Chủ trì tham mưu giải quyết các vấn đề phát sinh đối với dự án đầu tư sau cấp phép đầu tư.",
            "- Tham mưu, đề xuất trong việc xây dựng các văn bản quy phạm pháp luật, chính sách có liên quan đến hoạt động đầu tư.",
            "- Định kỳ kiểm tra, đôn đốc, nhắc nhở việc thực hiện dự án đầu tư."
          ]
        },
        "investorSupport": {
          "title": "d) Công tác hỗ trợ nhà đầu tư",
          "duties": [
            "- Hỗ trợ nhà đầu tư tìm hiểu thông tin, khảo sát môi trường đầu tư của thành phố Đà Nẵng và Khu CNC và các KCN.",
            "- Hỗ trợ cung cấp thông tin, hướng dẫn, tư vấn cho nhà đầu tư các quy định về pháp luật liên quan đến hoạt động đầu tư vào Khu CNC và các KCN.",
            "- Đầu mối liên lạc với các sở, ban, ngành liên quan trong việc hỗ trợ nhà đầu tư thực hiện các thủ tục đầu tư vào Khu CNC và các KCN."
          ]
        },
        "internationalCooperation": {
          "title": "e) Đối ngoại, hợp tác quốc tế",
          "duties": [
            "- Tham mưu thiết lập, duy trì triển khai các hoạt động hợp tác với các cá nhân, tổ chức trong và ngoài nước trong lĩnh vực đầu tư.",
            "- Tham mưu cho Lãnh đạo Ban ký kết các thỏa thuận hợp tác, biên bản ghi nhớ giữa Ban Quản lý Khu CNC và các KCN với các đối tác, nhà đầu tư trong và ngoài nước về các lĩnh vực đầu tư.",
            "- Tham mưu thực hiện công tác đối ngoại nhân dân theo Chương trình, Kế hoạch của thành phố.",
            "- Định kỳ kiểm tra, đánh giá, báo cáo việc thực hiện."
          ]
        }
      }
    },
    "businessDept": {
      "title": "III. PHÒNG QUẢN LÝ DOANH NGHIỆP VÀ LAO ĐỘNG",
      "duties": "Nhiệm vụ chính:",
      "dutiesDesc": "Cấp giấy chứng nhận xuất xứ hàng hóa, Tiếp nhận báo cáo thống kê của doanh nghiệp, Theo dõi hoạt động sản xuất kinh doanh, Quản lý các hoạt động dịch vụ trong KCN, Báo cáo tình hình an ninh trật tự",
      "detailedDuties": [
        "Tham mưu và trình cấp các loại giấy chứng nhận xuất xứ hàng hóa sản xuất trong KCN.",
        "Tiếp nhận báo cáo thống kê, tài chính của doanh nghiệp hoạt động trong KCN, theo dõi hoạt động sản xuất kinh doanh của các dự án trong KCN.",
        "Hướng dẫn, giải quyết các vấn đề phát sinh, khó khăn, vướng mắc của nhà đầu tư trong hoạt động sản xuất kinh doanh, hoạt động chuyển nhượng dự án, tài sản; tạm ngừng hoạt động, phá sản, giải thể doanh nghiệp trong KCN; các thủ tục thanh lý tài sản, máy móc thiết bị.",
        "Hướng dẫn, theo dõi và tiếp nhận đăng ký khung giá đất, cho thuê lại đất và phí hạ tầng KCN của nhà đầu tư xây dựng kinh doanh kết cấu hạ tầng KCN.",
        "Theo dõi, đôn đốc Công ty Phát triển và Khai thác hạ tầng KCN Đà Nẵng và xử lý các kiến nghị liên quan đến thu nộp tiền sử dụng đất và phí sử dụng hạ tầng tại KCN do thành phố đầu tư.",
        "Quản lý các hoạt động dịch vụ trong các KCN.",
        "Tham mưu và trình cấp, cấp lại, sửa đổi, bổ sung các loại giấy chứng nhận đủ điều kiện kinh doanh, giấy phép kinh doanh một số mặt hàng thuộc phạm vi quản lý chuyên ngành cho thương nhân đặt trụ sở và có cơ sở kinh doanh tại KCN.",
        "Chủ trì, phối hợp với các phòng, đơn vị có liên quan xây dựng báo cáo tổng hợp định kỳ, báo cáo đột xuất về tình hình sản xuất kinh doanh của các doanh nghiệp trong Khu công nghệ cao và các Khu công nghiệp.",
        "Báo cáo tổng hợp định kỳ, đột xuất tình hình hoạt động, công tác an ninh trật tự, an toàn giao thông, an toàn vệ sinh thực phẩm, an sinh xã hội tại khu công nghệ cao và các KCN.",
        "Báo cáo định kỳ và đột xuất theo yêu cầu của Ban Chỉ huy thống nhất thành phố.",
        "Thực hiện các công việc khác do Lãnh đạo Ban giao."
      ]
    },
    "planningDept": {
      "title": "IV. PHÒNG QUẢN LÝ QUY HOẠCH VÀ XÂY DỰNG",
      "function": "Chức năng:",
      "functionDesc": "Tham mưu về quy hoạch, kiến trúc, xây dựng công trình, đấu nối hạ tầng và đất đai.",
      "duties": "Nhiệm vụ chính:",
      "dutiesDesc": "Quản lý quy hoạch và kiến trúc, Quản lý xây dựng công trình, Quản lý đất đai, Phòng cháy chữa cháy",
      "fullFunctionDesc": "Tham mưu cho Lãnh đạo Ban Quản lý Khu CNC và các KCN về các lĩnh vực: Quy hoạch, Kiến trúc, Xây dựng công trình, Đấu nối hạ tầng kỹ thuật và Đất đai, phòng cháy chữa cháy, cứu nạn cứu hộ.",
      "detailedSections": {
        "planningArchitecture": {
          "title": "a) Công tác quản lý Quy hoạch, Kiến trúc, Đấu nối hạ tầng kỹ thuật",
          "description": "Tham mưu, đề xuất về việc tổ chức lập, thẩm định các loại quy hoạch; có ý kiến chấp thuận quy hoạch tổng mặt bằng, phương án kiến trúc và đấu nối hạ tầng kỹ thuật..."
        },
        "constructionManagement": {
          "title": "b) Công tác quản lý Xây dựng công trình",
          "description": "Có ý kiến chấp thuận đối với thiết kế cơ sở; cấp Thỏa thuận thiết kế tổng mặt bằng; tổ chức kiểm tra xác nhận hoàn thành công trình..."
        },
        "landManagement": {
          "title": "c) Công tác quản lý Đất đai",
          "description": "Tham mưu lập Quy hoạch, kế hoạch sử dụng đất chi tiết; thẩm định nhu cầu sử dụng đất; tham mưu quyết định giao đất, cho thuê đất..."
        },
        "decentralizedTasks": {
          "title": "d) Thực hiện các nhiệm vụ theo phân cấp, ủy quyền",
          "description": "Điều chỉnh quy hoạch chi tiết xây dựng; phê duyệt nhiệm vụ và đồ án quy hoạch; cấp, điều chỉnh, gia hạn Giấy phép quy hoạch xây dựng..."
        },
        "firePreventionRescue": {
          "title": "f) Theo dõi công tác phòng cháy chữa cháy, cứu nạn cứu hộ trong Khu CNC và các KCN."
        },
        "otherTasks": {
          "title": "g) Thực hiện các công việc khác do Lãnh đạo Ban giao."
        }
      }
    },
    "environmentDept": {
      "title": "V. PHÒNG QUẢN LÝ MÔI TRƯỜNG, KHOA HỌC - CÔNG NGHỆ",
      "duties": "Nhiệm vụ chính:",
      "dutiesDesc": "Hướng dẫn thực hiện bảo vệ môi trường, Thẩm định báo cáo đánh giá tác động môi trường, Kiểm tra và xử lý vi phạm môi trường, Báo cáo công tác bảo vệ môi trường",
      "fullTitle": "V. PHÒNG QUẢN LÝ MÔI TRƯỜNG, KHOA HỌC - CÔNG NGHỆ VÀ ƯƠM TẠO",
      "detailedDuties": [
        "Hướng dẫn, kiểm tra chủ đầu tư xây dựng và kinh doanh hạ tầng KCN, các cơ sở sản xuất, kinh doanh, dịch vụ trong KCN thực hiện các quy định bảo vệ môi trường; Phát hiện và kịp thời báo cáo với cơ quan quản lý nhà nước có thẩm quyền để giải quyết, xử lý các hành vi vi phạm pháp luật về bảo vệ môi trường.",
        "Định kỳ báo cáo công tác bảo vệ môi trường của khu kinh tế, KCN gửi Ủy ban nhân dân thành phố và Bộ Tài nguyên và Môi trường.",
        "Công khai thông tin về bảo vệ môi trường KCN; tuyên truyền, phổ biến các văn bản quy phạm pháp luật về bảo vệ môi trường cho chủ đầu tư xây dựng và kinh doanh hạ tầng KCN.",
        "Phối hợp với cơ quan chức năng giải quyết các tranh chấp về môi trường giữa các cơ sở sản xuất, kinh doanh dịch vụ trong KCN hoặc với các tổ chức, cá nhân ngoài phạm vi KCN.",
        "Phối hợp kiểm tra, thanh tra và xử lý vi phạm về bảo vệ môi trường đối với các hoạt động của chủ đầu tư xây dựng và kinh doanh hạ tầng KCN và các cơ sở sản xuất, kinh doanh, dịch vụ trong KCN.",
        "Tổ chức thẩm định và trình phê duyệt Báo cáo đánh giá tác động môi trường đối với dự án trong KCN theo ủy quyền của UBND thành phố.",
        "Tổ chức đăng ký và xác nhận kế hoạch bảo vệ môi trường cho các đối tượng thuộc diện đăng ký trong KCN theo ủy quyền của Sở Tài nguyên và Môi trường hoặc của UBND nhân dân cấp quận.",
        "Tổ chức thẩm định và trình phê duyệt đề án bảo vệ môi trường chi tiết, đề án bảo vệ môi trường đơn giản của các dự án trong KCN theo ủy quyền của cơ quan có thẩm quyền.",
        "Tổ chức kiểm tra và trình Lãnh đạo Ban xác nhận hoàn thành công trình bảo vệ môi trường phục vụ giai đoạn vận hành dự án đối với dự án đầu tư trong KCN theo pháp luật về bảo vệ môi trường.",
        "Thực hiện các công việc khác do Lãnh đạo Ban giao."
      ]
    },
    "download": "Tải xuống",
    "share": "Chia sẻ",
    "print": "In",
    "shareTitle": "Chia sẻ trang:",
    "downloadingTitle": "Đang tải xuống tài liệu...",
    "shareSuccess": "Đã sao chép link vào clipboard!"
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
    "introGeneral": "General Introduction",
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
    "dataSource": "Data updated from the DSEZA system",
    "noDataTitle": "No data available",
    "noZones": "No information about functional zones available.",
    "listTitle": "Functional Zones",
    "listSubtitle": "Explore high-tech parks, industrial zones, and special functional areas in Da Nang",
    "badges": {
      "nearFull": "Nearly full",
      "highRate": "High rate",
      "medium": "Medium",
      "available": "Available",
      "largeScale": "Large scale"
    }
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
    },
    "logout": "Logout",
    "hello": "Hello"
  },
  "profile": {
    "title": "Account Information",
    "description": "Manage personal information and account security",
    "name": "Username",
    "email": "Email Address",
    "role": "Role",
    "currentPassword": "Current password",
    "currentPasswordPlaceholder": "Enter current password",
    "newPassword": "New password",
    "newPasswordPlaceholder": "Enter new password (min 6 characters)",
    "confirmNewPassword": "Confirm new password",
    "confirmNewPasswordPlaceholder": "Re-enter new password",
    "saveChanges": "Save changes"
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
    "debugInfo": "Debug information",
    "home": "Home"
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
  "draft": {
    "breadcrumb": {
      "home": "Home",
      "documents": "Documents",
      "guide": "Feedback guide",
      "list": "Draft document feedback"
    },
    "pageTitle": "Draft document feedback",
    "description": "List of draft documents currently open for feedback and those that have closed from the Da Nang High-Tech Park Authority.",
    "loading": "Loading data...",
    "errorTitle": "An error occurred",
    "errorLoading": "Unable to load draft documents",
    "tabs": {
      "open": "Open for feedback",
      "closed": "Feedback closed"
    },
    "emptyOpen": {
      "title": "There are currently no draft documents open for feedback",
      "desc": "Please check back later or view drafts whose feedback period has ended."
    },
    "emptyClosed": {
      "title": "No draft documents have closed feedback yet",
      "desc": "This list will display drafts whose feedback period has ended."
    },
    "card": {
      "statusOpen": "Open for feedback",
      "statusClosed": "Closed",
      "published": "Published:",
      "deadline": "Feedback deadline:",
      "viewDetail": "View details",
      "download": "Download document"
    },
    "detail": {
      "statusOpen": "Open for feedback",
      "statusClosed": "Feedback closed",
      "published": "Published:",
      "deadline": "Feedback deadline:",
      "field": "Field:",
      "attachments": "Attachments",
      "download": "Download",
      "commentsTitle": "Feedback and comments",
      "openNotice": "This draft is open for feedback. You can submit comments below.",
      "closedNotice": "The feedback period for this draft has ended. You can still view submitted comments.",
      "backList": "Back to list"
    }
  },
  "welcome": {
    "title": "Welcome Letter",
    "pageTitle": "Welcome Letter",
    "greeting": "Welcome to DSEZA,",
    "introduction": "First of all, the Da Nang Specific Economic Zones Authority (DSEZA) would like to send respectful greetings and wishes for health, peace and prosperity to all organizations, enterprises, investors, and individuals.",
    "paragraph1": "The Da Nang Specific Economic Zones Authority was established based on the merger of the Da Nang Industrial Zones and Export Processing Zones Management Board and the Da Nang High-Tech Park Management Board in October 2018, responding to the Government and State's policies and meeting the socio-economic development requirements of the country and Da Nang city.",
    "paragraph2": "On April 29, 2025, Da Nang City People's Committee issued Decision No. 34/2025/QD-UBND stipulating the functions, duties, powers and organizational structure of the management board, notably the new function of managing the Free Trade Zone. This decision replaces previous decisions on functions, duties, powers and organizational structure of the Da Nang High-Tech Park and Industrial Zones Management Board - a unit under the City People's Committee.",
    "paragraph3": "The Management Board is an agency under the Da Nang City People's Committee, performing direct state management functions for the high-tech park, Da Nang concentrated information technology park and industrial zones within Da Nang city; managing and implementing functions of providing public administrative services and other support services related to investment and production activities for investors in the high-tech park, Da Nang concentrated information technology park and industrial zones within Da Nang city in accordance with legal provisions.",
    "paragraph4": "With our goodwill spirit at the high-tech park, Da Nang concentrated information technology park and industrial zones within Da Nang city, DSEZA is committed to always accompanying organizations, enterprises, investors, and individuals who place their trust and choose the high-tech park, Da Nang concentrated information technology park and industrial zones within Da Nang city as their destination in the past, present and future.",
    "paragraph5": "We hope that organizations, enterprises, investors, and individuals will be truly satisfied with DSEZA and Da Nang city. Once again, we wish you all the best luck, success and prosperity.",
    "closing": "Thank you sincerely.",
    "signature": "DSEZA",
    "download": "Download",
    "share": "Share",
    "print": "Print",
    "shareTitle": "Share page:",
    "downloadingTitle": "Downloading document...",
    "shareSuccess": "Link copied to clipboard!"
  },
  "affiliatedUnits": {
    "title": "Affiliated Units",
    "pageTitle": "Affiliated Units",
    "section1Title": "I. AFFILIATED UNITS",
    "section2Title": "II. INFRASTRUCTURE INVESTMENT BUSINESS UNITS IN INDUSTRIAL ZONES",
    "unit1Name": "Da Nang High-Tech Park Integrated Services Center",
    "unit2Name": "Da Nang Industrial Zone Infrastructure Development and Exploitation Company",
    "unit3Name": "Saigon-Da Nang Investment Joint Stock Company",
    "unit4Name": "Massda Land Limited Liability Company",
    "unit5Name": "Hoa Cam Industrial Zone Investment Joint Stock Company",
    "updateInfo": "Detailed information is being updated...",
    "director": "Director",
    "deputyDirector": "Deputy Director",
    "officePhone": "Office Phone",
    "mobilePhone": "Mobile Phone",
    "address": "Address",
    "phone": "Phone",
    "fax": "Fax",
    "email": "Email",
    "website": "Website",
    "download": "Download",
    "share": "Share",
    "print": "Print",
    "shareTitle": "Share page:",
    "downloadingTitle": "Downloading document...",
    "shareSuccess": "Link copied to clipboard!"
  },
  "danangOverview": {
    "title": "Overview of Da Nang",
    "pageTitle": "Overview of Da Nang",
    "section1Title": "1. AREA, POPULATION, ADMINISTRATIVE UNITS",
    "section1Content": "Da Nang is located in the central region of Vietnam and serves as a major economic, cultural, educational, scientific, and technological center of the Central - Central Highlands region. Da Nang is currently one of 5 centrally-governed cities (Hanoi, Ho Chi Minh City, Hai Phong, Da Nang, and Can Tho).",
    "area": "Area",
    "areaValue": "1,285.4 km²",
    "population": "Population",
    "populationValue": "1,046,876 people (as of January 2015)",
    "density": "Population density",
    "densityValue": "892 people/km²",
    "administrative": "Administrative units",
    "administrativeValue": "6 districts (Hai Chau, Thanh Khe, Lien Chieu, Ngu Hanh Son, Son Tra, Cam Le), 1 suburban district (Hoa Vang district) and 1 island district (Hoang Sa).",
    "section2Title": "2. CLIMATE",
    "section2Content": "Da Nang is located in a typical tropical monsoon climate zone with high temperature and little variation.",
    "seasons": "There are 2 distinct seasons each year: rainy season (from August to December) and dry season (from January to July). Each year, Da Nang is directly affected by one to two storms or tropical depressions.",
    "temperature": "Average annual temperature",
    "temperatureValue": "approximately 25.9°C. Specifically, the Ba Na mountain forest area at an altitude of nearly 1,500 m has an average temperature of about 20°C.",
    "humidity": "Average air humidity",
    "humidityValue": "83.4%",
    "rainfall": "Average annual rainfall",
    "rainfallValue": "2,504.57 mm",
    "sunshine": "Average sunshine hours per year",
    "sunshineValue": "2,156.2 hours",
    "section3Title": "3. SOME ECONOMIC INDICATORS OF THE CITY",
    "gdpGrowth": "GDP growth rate (estimated 2013)",
    "gdpGrowthValue": "8.1%",
    "income": "Average per capita income (estimated 2013)",
    "incomeValue": "56.3 million VND/person/year (equivalent to 2,686 USD/person/year)",
    "investment": "Investment",
    "investmentValue": "As of March 2015, Da Nang has attracted 322 valid FDI projects from 37 countries and territories with total investment capital of over 3.389 billion USD.",
    "tourism": "Tourism",
    "tourismRevenue": "Tourism revenue (estimated 2013): 7,784.1 billion VND",
    "touristCount": "Tourist arrivals (estimated 2013): 3.117 million tourists, including: 743.2 thousand international tourists and 2.374 million domestic tourists.",
    "section4Title": "4. DA NANG - AN ATTRACTIVE DESTINATION FOR INVESTORS",
    "locationTitle": "a. Strategic geographic location",
    "locationContent1": "Da Nang is 764 km north of Hanoi capital, 964 km south of Ho Chi Minh City, located on the North-South transportation axis by road, rail, sea and air, and is one of the important gateways to the sea of the Central Highlands and Laos, northeastern Cambodia, Thailand and Myanmar.",
    "locationContent2": "The distance from Da Nang to major economic centers in Southeast Asia such as Bangkok (Thailand), Kuala Lumpur (Malaysia), Singapore, Manila (Philippines) are all within 1,000 - 2,000 km.",
    "locationContent3": "Da Nang is also the eastern gateway of the East-West Economic Corridor to the Pacific Ocean, and the entrance to world cultural and natural heritage sites (Hoi An Ancient Town, My Son Sanctuary, Hue Ancient Capital, Phong Nha - Ke Bang).",
    "locationContent4": "Da Nang is the driving city of the Central Key Economic Region, including 5 provinces and cities: Thua Thien - Hue, Da Nang, Quang Nam, Quang Ngai and Binh Dinh.",
    "infraTitle": "b. Developed infrastructure",
    "portTitle": "Tien Sa Port:",
    "portContent1": "It is the third largest commercial port in Vietnam after Saigon Port and Hai Phong Port.",
    "portContent2": "Cargo handling capacity of 4 million tons/year, capable of receiving cargo ships with deadweight of 45,000DWT and other specialized ships such as container ships, passenger ships, super-long super-heavy cargo ships.",
    "portContent3": "From Tien Sa Port (Da Nang), there are currently international shipping routes to Hong Kong, Singapore, Japan, Taiwan and South Korea.",
    "airportTitle": "Da Nang International Airport:",
    "airportContent": "Capacity to serve 6.5 million passengers/year, expected to reach 10 million passengers per year by 2020.",
    "roadTitle": "Transportation system:",
    "roadContent": "Continuously expanded with many major projects in the city such as Vo Nguyen Giap Road, Tran Thi Ly Bridge, Dragon Bridge, Nguyen Tri Phuong Bridge, Song Han Bridge, Tien Son Bridge, Thuan Phuoc Bridge, Nga ba Hue multi-level intersection... The transportation system connecting with external provinces and cities includes Hai Van Road Tunnel, National Highway 14B, National Highway 1A and the upcoming Da Nang - Quang Ngai Expressway (under construction) creating favorable conditions for transportation and tourism development.",
    "utilityTitle": "Power and water supply systems:",
    "utilityContent": "The power and water supply systems in the city always ensure the needs of daily production and living. Da Nang Water Plant currently has a capacity of 120,000m³/day and night and is expected to increase the total water supply capacity to 325,000m³/day and night by 2020.",
    "commTitle": "Postal and telecommunications:",
    "commContent": "It is one of the three major postal and telecommunications centers in Vietnam and one of the three most important final connection points of the national trunk intermediate network and a direct connection point with the SEAMEWE 3 international submarine fiber optic cable station with a total capacity of 10Gbps connecting Vietnam with nearly 40 countries in Asia and Europe. WiFi system covers the city center.",
    "envTitle": "c. Open investment environment",
    "envContent1": "Leading the country for many consecutive years in provincial competitiveness index (2008, 2009, 2010, 2013).",
    "envContent2": "Leading the country for 5 consecutive years in information technology development and application readiness index (2009, 2010, 2011, 2012 and 2013).",
    "envContent3": "Leading the country in administrative reform index in 2013.",
    "envContent4": "Attractive incentive policies and low investment costs: Land rental prices, infrastructure usage fees, wastewater treatment fees, labor rental costs, and services are all rated as low.",
    "hrTitle": "d. Abundant human resources",
    "hrContent1": "As of 2012, the city's total workforce was 515,018 people, accounting for 53% of the city's total population, including:",
    "hrTech": "Technical workers: 36,961 people",
    "hrMid": "Intermediate level: 35,126 people",
    "hrHigh": "University, college: 106,681 people",
    "hrOther": "Others: 336,250 people",
    "hrContent2": "According to the city's human resource development plan until 2020, Da Nang has 70% of trained workers, including 21% with university and college qualifications; 16% with professional intermediate qualifications and 33% with technical worker qualifications.",
    "livingTitle": "e. Friendly living environment",
    "livingContent1": "Asian City Landscape Award 2013 (Theme \"City, the pride of the people\" voted by the United Nations Human Settlements Organization in Asia (UN Habitat Asia).",
    "livingContent2": "ASEAN Environmentally Sustainable City Award 2011 voted by ASEAN member countries.",
    "livingContent3": "Da Nang is considered an attractive investment destination and is aiming to be a livable city in Vietnam for foreign investors.",
    "section5Title": "5. FOREIGN DIRECT INVESTMENT (FDI) ATTRACTION",
    "section5Content": "As of April 15, 2015, Da Nang city has attracted 324 valid FDI projects with total registered capital of over 3.39 billion USD.",
    "fdiCapitalTitle": "a. Leading investment countries by investment capital in Da Nang",
    "fdiProjectTitle": "b. Leading investment countries by number of investment projects in Da Nang",
    "fdiSectorTitle": "c. FDI investment by sector (by structure of number of investment projects)",
    "source": "Source",
    "sourceWikipedia": "(Source: Wikipedia)",
    "sourceDanangStats": "(Source: Wikipedia, Da Nang Statistics Department)",
    "sourceDseza": "(Source: Da Nang Investment Promotion Center)",
    "download": "Download",
    "share": "Share",
    "print": "Print",
    "shareTitle": "Share page:",
    "downloadingTitle": "Downloading document...",
    "shareSuccess": "Link copied to clipboard!"
  },
  "managementOverview": {
    "title": "Overview of the Management Board",
    "pageTitle": "Overview of the Management Board",
    "breadcrumbGeneral": "General Introduction",
    "introduction": "The Da Nang High-Tech Park Management Board is a specialized agency under the Da Nang City People's Committee, with the function of advising and assisting the Da Nang City People's Committee in managing state affairs related to investment construction, business, and services within the Da Nang High-Tech Park.",
    "organizationalStructure": {
      "title": "Organizational Structure",
      "description": "Organizational chart and management structure of the Da Nang High-Tech Park Management Board"
    },
    "functionsResponsibilities": {
      "title": "Functions and Responsibilities",
      "description": "Functions, duties, and powers of the Management Board as stipulated"
    },
    "affiliatedUnits": {
      "title": "Affiliated Units",
      "description": "Information about affiliated units and infrastructure investment business units"
    },
    "download": "Download",
    "share": "Share",
    "print": "Print",
    "shareTitle": "Share page:",
    "downloadingTitle": "Downloading document...",
    "shareSuccess": "Link copied to clipboard!"
  },
  "functions": {
    "title": "Functions and Duties",
    "pageTitle": "Functions, Duties, and Powers of the Management Board",
    "breadcrumbGeneral": "Overview of the Management Board",
    "generalIntroduction": "General Introduction",
    "section1Title": "1. Functions",
    "section2Title": "2. Duties and Powers",
    "section3Title": "3. Organizational Chart",
    "introduction1": "The Da Nang High-Tech Park and Industrial Zones Management Board was established according to Decision No. 1296/QD-TTg dated October 3, 2018 by the Prime Minister.",
    "introduction2": "This is the unified focal point for managing industrial zones in the city and promoting investment.",
    "functionMain": "Main function: An agency under the City People's Committee, performing direct state management functions for the High-Tech Park and industrial zones.",
    "functionPoint1": "Management and provision of public administrative services",
    "functionPoint2": "Support investment and production business activities",
    "functionPoint3": "Has legal personality and separate accounts",
    "legalBasis": "Legal basis:",
    "legalPoint1": "Article 35 of Decree No. 99/2003/ND-CP (High-Tech Park Regulations)",
    "legalPoint2": "Article 63 of Decree No. 82/2018/ND-CP (Industrial Zone and Economic Zone Management)",
    "legalPoint3": "Other relevant legal documents",
    "organizationChart": "ORGANIZATIONAL CHART OF THE MANAGEMENT BOARD",
    "organizationSubtitle": "HIGH-TECH PARK AND INDUSTRIAL ZONES DA NANG",
    "organizationUpdating": "Detailed organizational chart is being updated...",
    "detailedIntro1": "The Da Nang High-Tech Park and Industrial Zones Management Board (hereinafter referred to as the Management Board) is an agency under the City People's Committee, performing direct state management functions for the High-Tech Park and industrial zones in Da Nang; managing and organizing the implementation of public administrative services and other support services related to investment and production activities for investors in the high-tech park and industrial zones.",
    "detailedIntro2": "The Management Board is subject to direction and management regarding organization, staffing, work programs and operating budgets by the City People's Committee; subject to direction, guidance and inspection on professional activities by ministries and sectors managing related fields.",
    "detailedIntro3": "The Management Board has legal personality; has a seal bearing the national emblem and separate accounts; state administrative management funds, operational funds and development investment capital are provided by the state budget according to annual plans.",
    "dutiesIntro": "The Management Board performs duties and powers as prescribed in:",
    "dutiesPoint1": "Article 35 of Decree No. 99/2003/ND-CP dated August 28, 2003 of the Government on promulgating the High-Tech Park Regulations.",
    "dutiesPoint2": "Article 63 of Decree No. 82/2018/ND-CP dated May 22, 2018 of the Government regulating the management of industrial zones and economic zones.",
    "dutiesPoint3": "Other relevant legal documents.",
    "organizationFullTitle": "ORGANIZATIONAL CHART OF DA NANG HIGH-TECH PARK AND INDUSTRIAL ZONES MANAGEMENT BOARD",
    "organizationNote": "Detailed organizational chart is being updated...",
    "download": "Download",
    "share": "Share",
    "print": "Print",
    "shareTitle": "Share page:",
    "downloadingTitle": "Downloading document...",
    "shareSuccess": "Link copied to clipboard!"
  },
  "departments": {
    "title": "Organizational Structure",
    "pageTitle": "Organizational Structure - Departments",
    "breadcrumbGeneral": "Overview of the Management Board",
    "office": {
      "title": "I. OFFICE",
      "mainFunction": "Main function: Advising on organizational and personnel management; financial management; document and archival work; coordinating the Management Board's activities.",
      "documentReceiving": "Document Reception",
      "detailedDuties": [
        "Advising and managing organizational and personnel work.",
        "Advising on developing internal regulations and rules of the Management Board.",
        "Advising on state secret protection work.",
        "Advising and estimating budget and annual operating funds of the Management Board; guiding and supervising financial accounting of units under the Management Board.",
        "Advising, organizing, and monitoring emulation movements - rewarding the Management Board and enterprises in industrial zones.",
        "Advising and organizing implementation of state administrative reform tasks in areas under the Management Board's jurisdiction.",
        "Operating the receiving and returning results department.",
        "Organizing document and archival work; managing and using the agency's seal.",
        "Reviewing outgoing documents before submitting to Management Board leaders for signature.",
        "Advising on managing and operating LAN systems, document management and administration systems, the Management Board's electronic information portal, and work related to information technology applications.",
        "Monitoring the construction, application and improvement of quality management systems according to TCVN ISO 9001: 2008 standards of the Management Board.",
        "Implementing and monitoring grassroots democracy work, cultural agencies and work on working order, responsibility spirit of officials and civil servants.",
        "Leading and advising on organizing regular meetings with enterprises in industrial zones; regular meetings of the Management Board.",
        "Compiling weekly reports, meeting reports and monthly meeting conclusion announcements from Management Board leaders.",
        "Implementing reception work, organizing conferences, seminars and festival activities of the Management Board at all levels.",
        "Managing and operating vehicles, focal point for managing assets and equipment of the agency.",
        "Performing other tasks assigned by Management Board leaders."
      ]
    },
    "investmentDept": {
      "title": "II. INVESTMENT MANAGEMENT, PROMOTION AND SUPPORT DEPARTMENT",
      "function": "Functions:",
      "functionDesc": "Advising on investment promotion, project management, investor support, foreign affairs and international cooperation.",
      "duties": "Main duties:",
      "dutiesDesc": "Investment promotion and marketing, Investment license issuance, Investment project management, Investor support, International cooperation",
      "fullFunctionDesc": "Advising the Management Board leadership on: Investment promotion; investment project management; investor support; foreign affairs and international cooperation.",
      "detailedSections": {
        "investmentPromotion": {
          "title": "a) Investment promotion work",
          "duties": [
            "- Advising on developing and organizing implementation of annual, 5-year and long-term investment promotion plans and programs for high-tech parks and industrial zones.",
            "- Organizing reception of investors and domestic and foreign delegations visiting and learning about investment opportunities in high-tech parks and industrial zones.",
            "- Leading organization or participating in conferences, seminars, investment promotion events; proposing organization of domestic and foreign investment promotion working groups; organizing promotion and advertising of information and images of high-tech parks and industrial zones.",
            "- Designing tools, compiling and managing investment promotion materials for investment promotion work.",
            "- Leading and coordinating with the Office to research and deploy computer tools and software and Internet environment to improve the effectiveness of support and investment promotion activities.",
            "- Managing and implementing activity reports for the high-tech park website in English, Japanese and Korean versions; performing the duties of Secretary of the Website Editorial Board."
          ]
        },
        "investmentCertificate": {
          "title": "b) Investment registration certificate issuance",
          "description": "- Leading advisory work to resolve administrative procedures; issuing investment registration certificates or investment policy decisions."
        },
        "projectManagement": {
          "title": "c) Investment project management work",
          "duties": [
            "- Advising on developing and resolving procedures under the jurisdiction of the High-Tech Park and Industrial Zones Management Board in the investment field.",
            "- Leading advisory work to resolve issues arising with investment projects after investment licensing.",
            "- Advising and proposing the development of legal documents and policies related to investment activities.",
            "- Periodically inspecting, urging and reminding the implementation of investment projects."
          ]
        },
        "investorSupport": {
          "title": "d) Investor support work",
          "duties": [
            "- Supporting investors to learn information and survey the investment environment of Da Nang city and high-tech parks and industrial zones.",
            "- Supporting provision of information, guidance and consultation to investors on legal regulations related to investment activities in high-tech parks and industrial zones.",
            "- Liaison with relevant departments, branches and sectors in supporting investors to carry out investment procedures in high-tech parks and industrial zones."
          ]
        },
        "internationalCooperation": {
          "title": "e) Foreign affairs and international cooperation",
          "duties": [
            "- Advising on establishing, maintaining and deploying cooperation activities with individuals and organizations domestically and internationally in the investment field.",
            "- Advising Management Board leaders on signing cooperation agreements and memorandums of understanding between the High-Tech Park and Industrial Zones Management Board and domestic and foreign partners and investors in investment fields.",
            "- Advising on implementing people-to-people diplomacy work according to the city's programs and plans.",
            "- Periodically inspecting, evaluating and reporting on implementation."
          ]
        }
      }
    },
    "businessDept": {
      "title": "III. ENTERPRISE AND LABOR MANAGEMENT DEPARTMENT",
      "duties": "Main duties:",
      "dutiesDesc": "Certificate of origin issuance, Enterprise statistical reports reception, Production and business monitoring, Industrial zone service management, Security and order reporting",
      "detailedDuties": [
        "Advising and submitting applications for various types of certificates of origin for goods produced in industrial zones.",
        "Receiving statistical and financial reports from enterprises operating in industrial zones, monitoring production and business activities of projects in industrial zones.",
        "Guiding and resolving arising issues, difficulties and obstacles of investors in production and business activities, project and asset transfer activities; temporary suspension of operations, bankruptcy, dissolution of enterprises in industrial zones; procedures for liquidation of assets, machinery and equipment.",
        "Guiding, monitoring and receiving registration of land price frameworks, sub-leasing land and industrial zone infrastructure fees from investors building and operating industrial zone infrastructure.",
        "Monitoring and urging Da Nang Industrial Zone Infrastructure Development and Exploitation Company and handling proposals related to collection of land use fees and infrastructure usage fees at industrial zones invested by the city.",
        "Managing service activities in industrial zones.",
        "Advising and submitting applications for, re-issuing, modifying and supplementing various types of business eligibility certificates and business licenses for certain goods under specialized management for merchants headquartered and having business establishments in industrial zones.",
        "Leading and coordinating with relevant departments and units to build periodic comprehensive reports and emergency reports on production and business situation of enterprises in high-tech parks and industrial zones.",
        "Comprehensive periodic and emergency reporting on activities, security and order work, traffic safety, food hygiene and safety, social security at high-tech parks and industrial zones.",
        "Periodic and emergency reporting as required by the City's Unified Command Board.",
        "Performing other tasks assigned by Management Board leaders."
      ]
    },
    "planningDept": {
      "title": "IV. PLANNING AND CONSTRUCTION MANAGEMENT DEPARTMENT",
      "function": "Functions:",
      "functionDesc": "Advising on planning, architecture, construction, infrastructure connection and land management.",
      "duties": "Main duties:",
      "dutiesDesc": "Planning and architecture management, Construction management, Land management, Fire prevention and fighting",
      "fullFunctionDesc": "Advising the Management Board leadership on: Planning, Architecture, Construction, Technical infrastructure connection and Land, fire prevention and rescue.",
      "detailedSections": {
        "planningArchitecture": {
          "title": "a) Planning, Architecture, and Technical Infrastructure Connection Management",
          "description": "Advising and proposing on organizing development and appraisal of various types of planning; providing approval opinions on master plans, architectural schemes and technical infrastructure connections..."
        },
        "constructionManagement": {
          "title": "b) Construction Management",
          "description": "Providing approval opinions on basic designs; issuing master plan design agreements; organizing inspection and confirmation of construction completion..."
        },
        "landManagement": {
          "title": "c) Land Management",
          "description": "Advising on developing detailed land use planning and plans; appraising land use needs; advising on decisions for land allocation and leasing..."
        },
        "decentralizedTasks": {
          "title": "d) Implementing tasks according to decentralization and authorization",
          "description": "Adjusting detailed construction planning; approving planning tasks and schemes; issuing, adjusting, extending construction planning permits..."
        },
        "firePreventionRescue": {
          "title": "f) Monitoring fire prevention and fighting, rescue work in high-tech parks and industrial zones."
        },
        "otherTasks": {
          "title": "g) Performing other tasks assigned by Management Board leaders."
        }
      }
    },
    "environmentDept": {
      "title": "V. ENVIRONMENT AND SCIENCE-TECHNOLOGY MANAGEMENT DEPARTMENT",
      "duties": "Main duties:",
      "dutiesDesc": "Environmental protection guidance, Environmental impact assessment review, Environmental violation inspection and handling, Environmental protection reporting",
      "fullTitle": "V. ENVIRONMENT, SCIENCE-TECHNOLOGY AND INCUBATION MANAGEMENT DEPARTMENT",
      "detailedDuties": [
        "Guiding and inspecting investors in infrastructure construction and business, production, business and service establishments in industrial zones to implement environmental protection regulations; detecting and promptly reporting to competent state management agencies to resolve and handle violations of environmental protection laws.",
        "Periodically reporting on environmental protection work of economic zones and industrial zones to the City People's Committee and the Ministry of Natural Resources and Environment.",
        "Publishing information on industrial zone environmental protection; promoting and disseminating legal documents on environmental protection to investors in infrastructure construction and business in industrial zones.",
        "Coordinating with functional agencies to resolve environmental disputes between production and service business establishments in industrial zones or with organizations and individuals outside the scope of industrial zones.",
        "Coordinating in inspection, supervision and handling of environmental protection violations regarding activities of investors in infrastructure construction and business and production, business and service establishments in industrial zones.",
        "Organizing appraisal and submitting for approval environmental impact assessment reports for projects in industrial zones under authorization of the City People's Committee.",
        "Organizing registration and confirmation of environmental protection plans for subjects subject to registration in industrial zones under authorization of the Department of Natural Resources and Environment or district-level People's Committees.",
        "Organizing appraisal and submitting for approval detailed environmental protection schemes and simple environmental protection schemes for projects in industrial zones under authorization of competent agencies.",
        "Organizing inspection and submitting to Management Board leaders for confirmation of completion of environmental protection works serving the project operation phase for investment projects in industrial zones according to environmental protection laws.",
        "Performing other tasks assigned by Management Board leaders."
      ]
    },
    "download": "Download",
    "share": "Share",
    "print": "Print",
    "shareTitle": "Share page:",
    "downloadingTitle": "Downloading document...",
    "shareSuccess": "Link copied to clipboard!"
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