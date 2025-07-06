// src/components/hero/navigation/menuData.tsx
import React from 'react';
import { MenuItem } from '../types/megaMenu'; // Đảm bảo import đúng MenuItem cho thanh điều hướng
import { useTranslation } from '@/utils/translations';

export const getNavigationMenuItems = (): MenuItem[] => {
  const { t } = useTranslation();
  return [
    {
      title: "nav.intro",
      translatable: true,
      url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/gioi-thieu/",
      megaMenuConfig: {
        columns: [
          {
            title: "Giới thiệu chung",
            titleEn: "General Introduction",
            contents: [
              {
                title: "Thư ngỏ",
                titleEn: "Welcome Letter",
                url: "/gioi-thieu/thu-ngo",
                iconName: "general-partner"
              },
              {
                title: "Tổng quan về Đà Nẵng",
                titleEn: "Overview of Da Nang",
                url: "/gioi-thieu/tong-quan-ve-da-nang",
                iconName: "real-estate"
              },
              {
                title: "Tổng quan về Ban Quản lý",
                titleEn: "Overview of the Authority",
                iconName: "business-development",
                // url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/gioi-thieu/tong-quan-ve-ban-quan-ly/", // URL có thể bỏ nếu mục này chỉ để mở dropdown
                items: [
                  {
                    title: "Chức năng, nhiệm vụ",
                    titleEn: "Functions and Duties",
                    url: "/tong-quan-ban-quan-ly/chuc-nang-nhiem-vu"
                  },
                  {
                    title: "Các phòng ban",
                    titleEn: "Departments",
                    url: "/tong-quan-ban-quan-ly/cac-phong-ban"
                  },
                  {
                    title: "Đơn vị trực thuộc",
                    titleEn: "Affiliated Units",
                    url: "/tong-quan-ban-quan-ly/don-vi-truc-thuoc"
                  },
                ]
              },
            ]
          },
          {
            title: "Các Khu chức năng",
            titleEn: "Functional Zones",
            contents: [
              {
                title: "Khu công nghệ cao Đà Nẵng",
                titleEn: "Da Nang High-Tech Park",
                url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghe-cao-da-nang/",
                iconName: "venture-capital"
              },
              {
                title: "Khu thương mại tự do Đà Nẵng",
                titleEn: "Da Nang Free Trade Zone",
                url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-thuong-mai-tu-do-da-nang/",
                iconName: "private-equity"
              },
              {
                title: "Khu CNTT tập trung",
                titleEn: "Centralized IT Zone",
                url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghe-thong-tin-tap-trung/",
                iconName: "corporate-venture-capital"
              },
              {
                title: "Các Khu công nghiệp Đà Nẵng",
                titleEn: "Da Nang Industrial Zones",
                iconName: "private-debt",
                // url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/gioi-thieu/khu-hanh-chinh/cac-khu-cong-nghiep-da-nang/", // URL có thể bỏ nếu mục này chỉ để mở dropdown
                items: [
                  {
                    title: "Khu công nghiệp Hòa Khánh",
                    titleEn: "Hoa Khanh Industrial Zone",
                    url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghiep-hoa-khanh/"
                  },
                  {
                    title: "Khu công nghiệp Hòa Khánh mở rộng",
                    titleEn: "Hoa Khanh Expanded Industrial Zone",
                    url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghiep-hoa-khanh-mo-rong/"
                  },
                  {
                    title: "Khu công nghiệp Đà Nẵng",
                    titleEn: "Da Nang Industrial Zone",
                    url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghiep-da-nang/"
                  },
                  {
                    title: "Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng",
                    titleEn: "Da Nang Seafood Service Industrial Zone",
                    url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghiep-dich-vu-thuy-san-da-nang/"
                  },
                  {
                    title: "Khu công nghiệp Hòa Cầm",
                    titleEn: "Hoa Cam Industrial Zone",
                    url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghiep-hoa-cam/"
                  },
                  {
                    title: "Khu công nghiệp Liên Chiểu",
                    titleEn: "Lien Chieu Industrial Zone",
                    url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghiep-lien-chieu/"
                  },
                  {
                    title: "Khu công nghiệp Hòa Ninh",
                    titleEn: "Hoa Ninh Industrial Zone",
                    url: "https://dseza.danang.gov.vn/chi-tiet-tin-tuc/khu-cong-nghiep-hoa-ninh/"
                  }
                ]
              }
            ]
          },
          {
            title: "Thành tựu nổi bật",
            titleEn: "Outstanding Achievements",
            contents: [
              {
                title: "Thành tựu nổi bật của Đà Nẵng",
                titleEn: "Da Nang's Outstanding Achievements",
                url: "#",
                iconName: "hedge-fund"
              }
            ],
            specialContent: (
              <div className="p-4 rounded-lg bg-dseza-light-primary dark:bg-dseza-dark-primary text-white mt-4">
                <h5 className="font-semibold mb-2">{t('menuSpecial.achievementTitle')}</h5>
                <p className="text-sm">{t('menuSpecial.achievementDesc')}</p>
                <button className="mt-3 bg-white text-dseza-light-primary dark:text-dseza-dark-primary py-2 px-3 rounded text-sm font-medium">{t('menuSpecial.achievementBtn')}</button>
              </div>
            )
          }
        ]
      }
    },
    // ... (Các mục menu khác giữ nguyên như bạn đã cung cấp)
    {
      title: "nav.news",
      translatable: true,
      url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/tin-tuc/",
      megaMenuConfig: {
        columns: [
          {
            title: "Tin tức | Sự kiện",
            titleEn: "News | Events",
            contents: [
              {
                title: "Đầu tư - Hợp tác Quốc tế",
                titleEn: "Investment - International Cooperation",
                url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/tin-tuc/dau-tu-hop-tac-quoc-te/",
                iconName: "business-development"
              },
              {
                title: "Doanh nghiệp",
                titleEn: "Business",
                url: "#",
                iconName: "wealth-management"
              },
              {
                title: "Chuyển đổi số",
                titleEn: "Digital Transformation",
                url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/tin-tuc/chuyen-doi-so/",
                iconName: "ria"
              },
              {
                title: "Đào tạo, Ươm tạo Khởi nghiệp",
                titleEn: "Training, Startup Incubation",
                url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/tin-tuc/dao-tao-uom-tao-khoi-nghiep/",
                iconName: "investor-relations"
              },
              {
                title: "Hoạt động Ban Quản lý",
                titleEn: "Management Activities",
                url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/tin-tuc/hoat-dong-ban-quan-ly/",
                iconName: "chief-financial-officer"
              },
              {
                title: "Tin khác",
                titleEn: "Other News",
                url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/tin-tuc/tin-khac/",
                iconName: "real-estate"
              }
            ]
          },
          {
            title: "Xem thêm",
            titleEn: "See More",
            contents: [
              {
                title: "Lịch công tác",
                titleEn: "Work Schedule",
                url: "https://dseza.danang.gov.vn/lich-cong-tac/",
                iconName: "family-offices"
              },
              {
                title: "Thông báo",
                titleEn: "Announcements",
                url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/thong-bao/",
                iconName: "venture-capital"
              },
              {
                title: "Thông tin báo chí",
                titleEn: "Press Information",
                url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/tin-tuc/thong-tin-bao-chi/",
                iconName: "corporate-venture-capital"
              }
            ]
          },
          {
            title: "Tin nổi bật",
            titleEn: "Featured News",
            contents: [],
            specialContent: (
              <div className="bg-dseza-light-secondary dark:bg-dseza-dark-secondary rounded-lg overflow-hidden">
                <img
                  src="https://picsum.photos/400/200"
                  alt="Featured news"
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h5 className="font-semibold text-sm mb-2 line-clamp-2">{t('menuSpecial.newsCardTitle')}</h5>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{t('menuSpecial.newsCardDesc')}</p>
                  <a href="#" className="text-dseza-light-primary dark:text-dseza-dark-primary text-xs font-medium">{t('menuSpecial.newsCardBtn')}</a>
                </div>
              </div>
            )
          }
        ]
      }
    },
    {
      title: "nav.business",
      translatable: true,
      url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/doanh-nghiep/",
      megaMenuConfig: {
        columns: [
          {
            title: "Báo cáo & Dữ liệu",
            titleEn: "Reports & Data",
            contents: [
              {
                title: "Báo cáo trực tuyến về DSEZA",
                titleEn: "DSEZA Online Reports",
                url: "https://maps.dhpiza.vn/login?ReturnUrl=%2Fadmin%2Fbaocaonhadautu%2Fyeucaubaocao",
                iconName: "ria"
              },
              {
                title: "Báo cáo giám sát và đánh giá đầu tư",
                titleEn: "Investment Monitoring Reports",
                url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/doanh-nghiep/bao-cao-giam-sat-va-danh-gia-dau-tu/",
                iconName: "business-development"
              },
              {
                title: "Mẫu | Bảng biểu báo cáo",
                titleEn: "Templates | Report Forms",
                url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/doanh-nghiep/mau-bang-bieu-bao-cao/",
                iconName: "wealth-management"
              }
            ]
          },
          {
            title: "Thông tin Doanh nghiệp",
            titleEn: "Business Information",
            contents: [
              {
                title: "Thủ tục | Hồ sơ | Dữ liệu môi trường",
                titleEn: "Procedures | Documents | Environmental Data",
                url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/doanh-nghiep/thu-tuc-ho-so-du-lieu-moi-truong/",
                iconName: "venture-capital"
              },
              {
                title: "Thống kê doanh nghiệp",
                titleEn: "Business Statistics",
                url: "https://dseza.danang.gov.vn/thong-ke-doanh-nghiep/",
                iconName: "private-debt"
              },
              {
                title: "Tuyển dụng",
                titleEn: "Recruitment",
                url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/doanh-nghiep/tuyen-dung/",
                iconName: "private-equity"
              }
            ]
          },
          {
            title: "Hỗ trợ doanh nghiệp",
            titleEn: "Business Support",
            contents: [],
            specialContent: (
              <div className="p-4 rounded-lg bg-dseza-light-primary/10 dark:bg-dseza-dark-primary/20 mt-4">
                <h5 className="font-semibold mb-2 text-dseza-light-primary dark:text-dseza-dark-primary">{t('menuSpecial.supportServiceTitle')}</h5>
                <p className="text-sm">{t('menuSpecial.supportServiceDesc')}</p>
                <button className="mt-3 bg-dseza-light-primary dark:bg-dseza-dark-primary text-white py-2 px-3 rounded text-sm font-medium">{t('menuSpecial.supportServiceBtn')}</button>
              </div>
            )
          }
        ]
      }
    },
    {
      title: "nav.investmentGuide",
      translatable: true,
      url: "/cam-nang-dau-tu",
    },
    {
      title: "nav.documents",
      translatable: true,
      url: "https://dseza.danang.gov.vn/van-ban/",
      megaMenuConfig: {
        columns: [
          {
            title: "Văn bản Pháp luật",
            titleEn: "Legal Documents",
            contents: [
              {
                title: "Văn bản pháp quy trung ương",
                titleEn: "Central Legal Documents",
                url: "https://dseza.danang.gov.vn/van-ban/van-ban-phap-quy-tw/",
                iconName: "general-partner"
              },
              {
                title: "Văn bản pháp quy địa phương",
                titleEn: "Local Legal Documents",
                url: "https://dseza.danang.gov.vn/van-ban/van-ban-phap-quy-dia-phuong/",
                iconName: "real-estate"
              },
              {
                title: "Văn bản chỉ đạo điều hành",
                titleEn: "Administrative Documents",
                url: "https://dseza.danang.gov.vn/van-ban/van-ban-chi-dao-dieu-hanh/",
                iconName: "chief-financial-officer"
              },
              {
                title: "Văn bản CCHC",
                titleEn: "Administrative Reform Documents",
                url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/van-ban/van-ban-cai-cach-hanh-chinh/",
                iconName: "business-development"
              }
            ]
          },
          {
            title: "Hướng dẫn & Góp ý",
            titleEn: "Guidelines & Feedback",
            contents: [
              {
                title: "Văn bản hướng dẫn",
                titleEn: "Guidance Documents",
                url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/van-ban/van-ban-huong-dan/",
                iconName: "investor-relations"
              },
              {
                title: "Góp ý dự thảo văn bản",
                titleEn: "Draft Document Feedback",
                url: "https://dseza.danang.gov.vn/gop-y-du-thao-van-ban/",
                iconName: "family-offices"
              }
            ]
          },
          {
            title: "Tra cứu văn bản",
            titleEn: "Document Search",
            contents: [
              {
                title: "Hệ thống tra cứu văn bản",
                titleEn: "Document Search System",
                url: "#",
                iconName: "venture-capital"
              }
            ],
            specialContent: (
              <div className="mt-4 p-4 border rounded-lg">
                <h5 className="font-semibold mb-2">{t('menuSpecial.quickDocSearchTitle')}</h5>
                <input
                  id="quick-doc-search"
                  name="quickDocSearch"
                  type="text"
                  placeholder={t('menuSpecial.quickDocSearchPlaceholder')}
                  autoComplete="off"
                  className="w-full px-3 py-2 border rounded mt-2 mb-2 dark:bg-dseza-dark-secondary dark:border-dseza-dark-hover"
                />
                <button className="w-full bg-dseza-light-primary dark:bg-dseza-dark-primary text-white py-2 rounded text-sm font-medium">
                  {t('menuSpecial.quickDocSearchBtn')}
                </button>
              </div>
            )
          }
        ]
      }
    },
    {
      title: "nav.adminReform",
      translatable: true,
      url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/moi-truong-dau-tu/cai-cach-hanh-chinh/",
      megaMenuConfig: {
        columns: [
          {
            title: "Ứng dụng & Dịch vụ",
            titleEn: "Applications & Services",
            contents: [
              {
                title: "Dịch vụ công trực tuyến",
                titleEn: "Online Public Services",
                url: "https://dichvucong.danang.gov.vn/",
                iconName: "ria"
              },
              {
                title: "Bưu chính công ích",
                titleEn: "Postal Services",
                url: "https://egov.danang.gov.vn/dailyDVc",
                iconName: "wealth-management"
              },
              {
                title: "Tra cứu hồ sơ",
                titleEn: "Document Lookup",
                url: "https://dichvucong.danang.gov.vn/web/guest/tra-cuu-ho-so",
                iconName: "venture-capital"
              },
              {
                title: "Đặt lịch hẹn giao dịch trực tuyến",
                titleEn: "Online Appointment Scheduling",
                url: "http://49.156.54.87/index.php?option=com_hengio&view=hengioonline&task=formdangkyonline&tmpl=widget",
                iconName: "private-equity"
              },
              {
                title: "Đánh giá chất lượng dịch vụ HCC",
                titleEn: "Service Quality Assessment",
                url: "https://dichvucong.danang.gov.vn/web/guest/-anh-gia",
                iconName: "private-debt"
              }
            ]
          },
          {
            title: "Thông tin & Quy trình",
            titleEn: "Information & Procedures",
            contents: [
              {
                title: "Thủ tục hành chính",
                titleEn: "Administrative Procedures",
                url: "https://dichvucong.danang.gov.vn/", // Giữ URL này nếu đây là trang chính cho TTHC
                iconName: "corporate-venture-capital"
              },
              {
                title: "Quy trình thực hiện thủ tục hành chính",
                titleEn: "Administrative Procedure Process",
                // url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/danh-cho-nha-dau-tu/quy-trinh-thuc-hien-thu-tuc-hanh-chinh/", // Bỏ URL ở đây nếu nó chỉ để mở dropdown
                iconName: "hedge-fund",
                items: [ // Thêm mục con vào đây
                  {
                    title: "Quy trình lĩnh vực đầu tư",
                    titleEn: "Investment Process",
                    url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/danh-cho-nha-dau-tu/quy-trinh-linh-vuc-dau-tu/"
                  }
                ]
              },
              // Mục "Quy trình lĩnh vực đầu tư" đã được chuyển lên làm con, nên xóa ở đây
              // {
              //   title: "Quy trình lĩnh vực đầu tư",
              //   titleEn: "Investment Process",
              //   url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/danh-cho-nha-dau-tu/quy-trinh-linh-vuc-dau-tu/",
              //   iconName: "family-offices"
              // },
              {
                title: "Văn bản cải cách hành chính",
                titleEn: "Administrative Reform Documents",
                url: "https://dseza.danang.gov.vn/danh-sach-tin-tuc/van-ban/van-ban-cai-cach-hanh-chinh/",
                iconName: "general-partner"
              }
            ]
          },
          {
            title: "Dịch vụ công nổi bật",
            titleEn: "Featured Public Services",
            contents: [],
            specialContent: (
              <div className="mt-4 p-4 bg-dseza-light-primary dark:bg-dseza-dark-primary text-white rounded-lg">
                <h5 className="font-semibold mb-2">{t('menuSpecial.featuredServiceTitle')}</h5>
                <p className="text-sm mb-3">{t('menuSpecial.featuredServiceDesc')}</p>
                <a
                  href="https://dichvucong.danang.gov.vn/"
                  className="inline-block bg-white text-dseza-light-primary dark:text-dseza-dark-primary py-2 px-4 rounded text-sm font-medium"
                >
                  {t('menuSpecial.featuredServiceBtn')}
                </a>
              </div>
            )
          }
        ]
      }
    },
    {
      title: 'nav.utilities',
      translatable: true,
      url: '#',
      megaMenuConfig: {
        columns: [
          {
            title: "Hỏi đáp | Góp ý",
            titleEn: "Q&A | Feedback",
            contents: [
              {
                title: "Hỏi | Đáp",
                titleEn: "Q&A",
                url: "https://dseza.danang.gov.vn/hoi-dap/",
                iconName: "general-partner"
              },
              {
                title: "Câu hỏi thường gặp",
                titleEn: "FAQ",
                url: "https://dseza.danang.gov.vn/cau-hoi-thuong-gap/",
                iconName: "real-estate"
              },
              {
                title: "Cổng góp ý TP. Đà Nẵng",
                titleEn: "Da Nang City Feedback Portal",
                url: "https://gopy.danang.gov.vn/",
                iconName: "business-development"
              }
            ]
          },
          {
            title: "Kết nối doanh nghiệp",
            titleEn: "Business Connection",
            contents: [
              {
                title: "Cà phê cùng DSEZA",
                titleEn: "Coffee with DSEZA",
                url: "https://docs.google.com/forms/d/e/1FAIpQLSc7gyKy8ESi7k9Hxja0Mi9YAnWLf_yU3fQPnyzYp9hWGLLREg/viewform",
                iconName: "venture-capital"
              }
            ]
          },
          {
            title: "Xem thêm",
            titleEn: "See More",
            contents: [
              {
                title: "Lịch công tác",
                titleEn: "Work Schedule",
                url: "https://dseza.danang.gov.vn/lich-cong-tac/",
                iconName: "investor-relations"
              },
              {
                title: "Dữ liệu chuyên ngành",
                titleEn: "Specialized Data",
                url: "https://dseza.danang.gov.vn/",
                iconName: "wealth-management"
              },
              {
                title: "Mua sắm công",
                titleEn: "Public Procurement",
                url: "https://dseza.danang.gov.vn/",
                iconName: "private-equity"
              },
              {
                title: "Làm theo năng lực | Hưởng theo lao động",
                titleEn: "Merit-based Work | Performance-based Benefits",
                url: "https://dseza.danang.gov.vn/media/i1kpng1s/t%C3%A0i-li%E1%BB%87u-s%E1%BB%AD-d%E1%BB%A5ng.pdf",
                iconName: "family-offices"
              }
            ]
          }
        ]
      }
    },
    {
      title: "nav.contact",
      translatable: true,
      url: "https://dseza.danang.gov.vn/lien-he/",
    }
  ];
};