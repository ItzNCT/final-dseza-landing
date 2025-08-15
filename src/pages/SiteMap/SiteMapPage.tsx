import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink, Share2, Printer, Download } from 'lucide-react';
import TopBar from '@/components/hero/TopBar';
import LogoSearchBar from '@/components/hero/LogoSearchBar';
import NavigationBar from '@/components/hero/NavigationBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { createLanguageUrl } from '@/utils/routes';

type Lang = 'vi' | 'en';

type LinkItem = {
  labelVi: string;
  labelEn: string;
  pathVi?: string; // internal path without language prefix
  pathEn?: string; // internal path without language prefix
  externalUrl?: string; // default external URL
  externalUrlEn?: string; // external URL for English
  externalUrlVi?: string; // external URL for Vietnamese
  children?: LinkItem[];
};

type Group = {
  groupVi: string;
  groupEn: string;
  items: LinkItem[];
};

type Section = {
  titleVi: string;
  titleEn: string;
  items: Array<LinkItem | Group>;
};

const resolveHref = (item: LinkItem, language: Lang): string => {
  if (language === 'en' && item.externalUrlEn) return item.externalUrlEn;
  if (language === 'vi' && item.externalUrlVi) return item.externalUrlVi;
  if (item.externalUrl) return item.externalUrl;
  const path = language === 'vi' ? item.pathVi : item.pathEn;
  if (!path) return '#';
  // ensure no leading language prefix in provided path
  const clean = path.replace(/^\/(vi|en)\//, '/');
  return createLanguageUrl(clean, language);
};

const sections: Section[] = [
  {
    titleVi: 'Giới thiệu',
    titleEn: 'Introduction',
    items: [
      {
        groupVi: 'Giới thiệu chung',
        groupEn: 'General Introduction',
        items: [
          { labelVi: 'Thư ngỏ', labelEn: 'Welcome Letter', pathVi: '/gioi-thieu/gioi-thieu-chung/thu-ngo', pathEn: '/introduction/general-introduction/welcome-letter' },
          { labelVi: 'Tổng quan về Đà Nẵng', labelEn: 'Overview of Da Nang', pathVi: '/gioi-thieu/gioi-thieu-chung/tong-quan-ve-da-nang', pathEn: '/introduction/general-introduction/overview-of-da-nang' },
          {
            labelVi: 'Tổng quan về Ban Quản lý',
            labelEn: 'Overview of Management Board',
            pathVi: '/gioi-thieu/gioi-thieu-chung/tong-quan-ve-ban-quan-ly',
            pathEn: '/introduction/general-introduction/overview-of-management-board',
            children: [
              { labelVi: 'Chức năng, nhiệm vụ', labelEn: 'Functions and Tasks', pathVi: '/gioi-thieu/gioi-thieu-chung/chuc-nang-nhiem-vu', pathEn: '/introduction/general-introduction/functions-and-tasks' },
              { labelVi: 'Các phòng ban', labelEn: 'Departments', pathVi: '/gioi-thieu/gioi-thieu-chung/co-cau-to-chuc', pathEn: '/introduction/general-introduction/organizational-structure' },
              { labelVi: 'Đơn vị trực thuộc', labelEn: 'Subordinate Units', pathVi: '/gioi-thieu/gioi-thieu-chung/don-vi-truc-thuoc', pathEn: '/introduction/general-introduction/subordinate-units' },
            ]
          },
        ]
      },
      {
        groupVi: 'Các Khu chức năng',
        groupEn: 'Functional Zones',
        items: [
          { labelVi: 'Khu công nghệ cao Đà Nẵng', labelEn: 'Da Nang Hi-Tech Park', pathVi: '/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghe-cao-da-nang', pathEn: '/introduction/functional-zones/da-nang-hi-tech-park' },
          { labelVi: 'Khu thương mại tự do Đà Nẵng', labelEn: 'Da Nang Free Trade Zone', pathVi: '/gioi-thieu/cac-khu-chuc-nang/khu-thuong-mai-tu-do-da-nang', pathEn: '/introduction/functional-zones/da-nang-free-trade-zone' },
          { labelVi: 'Khu CNTT tập trung', labelEn: 'IT Concentration Zone', pathVi: '/gioi-thieu/cac-khu-chuc-nang/khu-tap-trung-cong-nghe-thong-tin', pathEn: '/introduction/functional-zones/it-concentration-zone' },
          { labelVi: 'Khu công nghiệp Hòa Khánh', labelEn: 'Hoa Khanh Industrial Park', pathVi: '/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-hoa-khanh', pathEn: '/introduction/functional-zones/hoa-khanh-industrial-park' },
          { labelVi: 'Khu công nghiệp Hòa Khánh mở rộng', labelEn: 'Hoa Khanh Expanded Industrial Park', pathVi: '/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-hoa-khanh-mo-rong', pathEn: '/introduction/functional-zones/hoa-khanh-expanded-industrial-park' },
          { labelVi: 'Khu công nghiệp Đà Nẵng', labelEn: 'Da Nang Industrial Park', pathVi: '/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-da-nang', pathEn: '/introduction/functional-zones/da-nang-industrial-park' },
          { labelVi: 'Khu công nghiệp Dịch vụ Thủy sản Đà Nẵng', labelEn: 'Seafood Service Industrial Park', pathVi: '/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-dich-vu-thuy-san-da-nang', pathEn: '/introduction/functional-zones/da-nang-seafood-service-industrial-park' },
          { labelVi: 'Khu công nghiệp Hòa Cầm', labelEn: 'Hoa Cam Industrial Park', pathVi: '/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-hoa-cam', pathEn: '/introduction/functional-zones/hoa-cam-industrial-park' },
          { labelVi: 'Khu công nghiệp Liên Chiểu', labelEn: 'Lien Chieu Industrial Park', pathVi: '/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-lien-chieu', pathEn: '/introduction/functional-zones/lien-chieu-industrial-park' },
          { labelVi: 'Khu công nghiệp Hòa Ninh', labelEn: 'Hoa Ninh Industrial Park', pathVi: '/gioi-thieu/cac-khu-chuc-nang/khu-cong-nghiep-hoa-ninh', pathEn: '/introduction/functional-zones/hoa-ninh-industrial-park' },
        ]
      },
    ],
  },
  {
    titleVi: 'Thành tựu nổi bật',
    titleEn: 'Highlights',
    items: [
      { labelVi: 'Thành tựu nổi bật của Đà Nẵng', labelEn: 'Da Nang Highlights (Wikipedia)', externalUrlVi: 'https://vi.wikipedia.org/wiki/%C4%90%C3%A0_N%E1%BA%B5ng', externalUrlEn: 'https://en.wikipedia.org/wiki/Da_Nang' },
    ],
  },
  {
    titleVi: 'Tin tức',
    titleEn: 'News',
    items: [
      {
        groupVi: 'Tin tức | Sự kiện',
        groupEn: 'News | Events',
        items: [
          { labelVi: 'Đầu tư - Hợp tác Quốc tế', labelEn: 'Investment - International Cooperation', pathVi: '/tin-tuc/su-kien/dau-tu-hop-tac-quoc-te', pathEn: '/news/events/investment-international-cooperation' },
          { labelVi: 'Doanh nghiệp', labelEn: 'Enterprises', pathVi: '/tin-tuc/su-kien/doanh-nghiep', pathEn: '/news/events/enterprises' },
          { labelVi: 'Chuyển đổi số', labelEn: 'Digital Transformation', pathVi: '/tin-tuc/su-kien/chuyen-doi-so', pathEn: '/news/events/digital-transformation' },
          { labelVi: 'Đào tạo, Ươm tạo Khởi nghiệp', labelEn: 'Training - Startup Incubation', pathVi: '/tin-tuc/su-kien/dao-tao-uom-tao-khoi-nghiep', pathEn: '/news/events/training-startup-incubation' },
          { labelVi: 'Hoạt động Ban Quản lý', labelEn: 'Management Board Activities', pathVi: '/tin-tuc/su-kien/hoat-dong-ban-quan-ly', pathEn: '/news/events/management-board-activities' },
          { labelVi: 'Tin khác', labelEn: 'Other News', pathVi: '/tin-tuc/su-kien/tin-tuc-khac', pathEn: '/news/events/other-news' },
        ]
      },
      {
        groupVi: 'Xem thêm',
        groupEn: 'See more',
        items: [
          { labelVi: 'Lịch công tác', labelEn: 'Work Schedule', pathVi: '/tin-tuc/lich-cong-tac', pathEn: '/news/work-schedule' },
          { labelVi: 'Thông báo', labelEn: 'Announcements', pathVi: '/tin-tuc/thong-bao', pathEn: '/news/announcements' },
          { labelVi: 'Thông tin báo chí', labelEn: 'Press Information', pathVi: '/tin-tuc/thong-tin-bao-chi', pathEn: '/news/press-information' },
        ]
      },
    ],
  },
  {
    titleVi: 'Doanh nghiệp',
    titleEn: 'Enterprise',
    items: [
      { groupVi: 'Báo cáo & Dữ liệu', groupEn: 'Reports & Data', items: [
        { labelVi: 'Báo cáo trực tuyến về DSEZA', labelEn: 'Online Reports about DSEZA', externalUrl: 'https://maps.dseza.vn/login?ReturnUrl=/admin/baocaonhadautu/yeucaubaocao' },
        { labelVi: 'Báo cáo giám sát và đánh giá đầu tư', labelEn: 'Investment Monitoring & Evaluation Reports', pathVi: '/doanh-nghiep/bao-cao-du-lieu/bao-cao-giam-sat-va-danh-gia-dau-tu', pathEn: '/enterprise/reports-data/investment-monitoring-evaluation-reports' },
        { labelVi: 'Mẫu | Bảng biểu báo cáo', labelEn: 'Report Forms | Templates', pathVi: '/doanh-nghiep/bao-cao-du-lieu/mau-bang-bieu-bao-cao', pathEn: '/enterprise/reports-data/report-forms-templates' },
      ]},
      { groupVi: 'Thông tin Doanh nghiệp', groupEn: 'Enterprise Information', items: [
        { labelVi: 'Thông tin Doanh nghiệp', labelEn: 'Enterprise Information', pathVi: '/doanh-nghiep/thong-tin-doanh-nghiep', pathEn: '/enterprise/enterprise-information' },
        { labelVi: 'Thủ tục | Hồ sơ | Dữ liệu môi trường', labelEn: 'Procedures | Records | Environmental Data', pathVi: '/doanh-nghiep/thong-tin-doanh-nghiep/thu-tuc-ho-so-du-lieu-moi-truong', pathEn: '/enterprise/enterprise-information/procedures-records-environmental-data' },
        { labelVi: 'Thống kê doanh nghiệp', labelEn: 'Enterprise Statistics', pathVi: '/doanh-nghiep/thong-tin-doanh-nghiep/thong-ke-doanh-nghiep', pathEn: '/enterprise/enterprise-information/enterprise-statistics' },
        { labelVi: 'Tuyển dụng', labelEn: 'Recruitment', pathVi: '/doanh-nghiep/tuyen-dung', pathEn: '/enterprise/recruitment' },
      ]},
      { labelVi: 'Cẩm Nang Đầu Tư', labelEn: 'Investment Handbook', pathVi: '/cam-nang-dau-tu', pathEn: '/investment-handbook' },
    ],
  },
  {
    titleVi: 'Văn bản',
    titleEn: 'Documents',
    items: [
      { groupVi: 'Văn bản Pháp luật', groupEn: 'Legal Documents', items: [
        { labelVi: 'Văn bản pháp quy trung ương', labelEn: 'Central Legal Regulations', pathVi: '/van-ban/van-ban-phap-luat/van-ban-phap-quy-trung-uong', pathEn: '/documents/legal-documents/central-legal-regulations' },
        { labelVi: 'Văn bản pháp quy địa phương', labelEn: 'Local Legal Regulations', pathVi: '/van-ban/van-ban-phap-luat/van-ban-phap-quy-dia-phuong', pathEn: '/documents/legal-documents/local-legal-regulations' },
        { labelVi: 'Văn bản chỉ đạo điều hành', labelEn: 'Directive Management Documents', pathVi: '/van-ban/van-ban-phap-luat/an-ban-chi-dao-dieu-hanh', pathEn: '/documents/legal-documents/directive-management-documents' },
        { labelVi: 'Văn bản CCHC', labelEn: 'Administrative Reform Documents', pathVi: '/van-ban/van-ban-phap-luat/van-ban-cai-cach-hanh-chinh', pathEn: '/documents/legal-documents/administrative-reform-documents' },
      ]},
      { groupVi: 'Hướng dẫn & Góp ý', groupEn: 'Guidelines & Feedback', items: [
        { labelVi: 'Văn bản hướng dẫn', labelEn: 'Guideline Documents', pathVi: '/van-ban/huong-dan-gop-y/van-ban-huong-dan', pathEn: '/documents/guidelines-feedback/guideline-documents' },
        { labelVi: 'Góp ý dự thảo văn bản', labelEn: 'Draft Document Feedback', pathVi: '/van-ban/huong-dan-gop-y/gop-y-du-thao-van-ban', pathEn: '/documents/guidelines-feedback/draft-document-feedback' },
      ]},
      { groupVi: 'Tra cứu văn bản', groupEn: 'Document Search', items: [
        { labelVi: 'Hệ thống tra cứu văn bản', labelEn: 'Document Search System', pathVi: '/van-ban', pathEn: '/documents' },
      ]},
    ],
  },
  {
    titleVi: 'Cải cách hành chính',
    titleEn: 'Administrative Reform',
    items: [
      { groupVi: 'Ứng dụng & dịch vụ', groupEn: 'Applications & Services', items: [
        { labelVi: 'Dịch vụ công trực tuyến', labelEn: 'Online Public Services', externalUrl: 'https://egov.danang.gov.vn/dailyDVc' },
        { labelVi: 'Bưu chính công ích', labelEn: 'Public Postal Service', externalUrl: 'https://egov.danang.gov.vn/dailyDVc' },
        { labelVi: 'Dịch vụ công trực tuyến (nội bộ)', labelEn: 'Online Public Services (Internal)', pathVi: '/node/38', pathEn: '/node/38' },
        { labelVi: 'Tra cứu hồ sơ', labelEn: 'Case Lookup', externalUrl: 'https://dichvucong.danang.gov.vn/vi/' },
        { labelVi: 'Đặt lịch hẹn trực tuyến', labelEn: 'Online Appointment Booking', externalUrl: 'http://49.156.54.87/index.php?option=com_hengio&view=hengioonline&task=formdangkyonline&tmpl=widget' },
        { labelVi: 'Đánh giá chất lượng dịch vụ HCC', labelEn: 'HCC Service Quality Evaluation', externalUrl: 'https://dichvucong.danang.gov.vn/vi/' },
      ]},
      { groupVi: 'Dành cho nhà đầu tư', groupEn: 'For Investors', items: [
        { labelVi: 'Quy trình lĩnh vực đầu tư', labelEn: 'Investment Sector Procedures', pathVi: '/tin-tuc/danh-cho-nha-dau-tu/quy-trinh-linh-vuc-dau-tu', pathEn: '/news/for-investors/investment-sector-procedures' },
        { labelVi: 'Lĩnh vực thu hút đầu tư', labelEn: 'Investment Incentive Sectors', pathVi: '/tin-tuc/danh-cho-nha-dau-tu/linh-vuc-thu-hut-dau-tu', pathEn: '/news/for-investors/investment-incentive-sectors' },
        { labelVi: 'Quy hoạch khu chức năng', labelEn: 'Functional Zone Planning', pathVi: '/gioi-thieu/cac-khu-chuc-nang', pathEn: '/introduction/functional-zones' },
        { labelVi: 'Đăng ký nộp hồ sơ qua bưu điện', labelEn: 'Submit Documents via Post', externalUrl: 'https://egov.danang.gov.vn/dailyDVc' },
        { labelVi: 'Tra cứu thủ tục hành chính', labelEn: 'Administrative Procedures Lookup', externalUrl: 'https://dichvucong.danang.gov.vn/vi/' },
        { labelVi: 'Dịch vụ công trực tuyến', labelEn: 'Online Public Services', externalUrl: 'https://dichvucong.danang.gov.vn/vi/' },
      ]},
      { groupVi: 'Môi trường đầu tư', groupEn: 'Investment Environment', items: [
        { labelVi: 'Hạ tầng khu công nghiệp', labelEn: 'Industrial Park Infrastructure', pathVi: '/gioi-thieu/cac-khu-chuc-nang', pathEn: '/introduction/functional-zones' },
        { labelVi: 'Hạ tầng giao thông', labelEn: 'Transportation Infrastructure', pathVi: '/tin-tuc/moi-truong-dau-tu/ha-tang-giao-thong', pathEn: '/news/investment-environment/transportation-infrastructure' },
        { labelVi: 'Khoa học công nghệ - Môi trường', labelEn: 'Science-Technology-Environment', pathVi: '/tin-tuc/moi-truong-dau-tu/khoa-hoc-cong-nghe-moi-truong', pathEn: '/news/investment-environment/science-technology-environment' },
        { labelVi: 'Logistics', labelEn: 'Logistics', pathVi: '/tin-tuc/moi-truong-dau-tu/logistics', pathEn: '/news/investment-environment/logistics' },
        { labelVi: 'Hạ tầng xã hội', labelEn: 'Social Infrastructure', pathVi: '/tin-tuc/moi-truong-dau-tu/ha-tang-xa-hoi', pathEn: '/news/investment-environment/social-infrastructure' },
        { labelVi: 'Nguồn nhân lực', labelEn: 'Human Resources', pathVi: '/tin-tuc/moi-truong-dau-tu/nguon-nhan-luc', pathEn: '/news/investment-environment/human-resources' },
        { labelVi: 'Cải cách hành chính', labelEn: 'Administrative Reform', pathVi: '/tin-tuc/moi-truong-dau-tu/cai-cach-hanh-chinh', pathEn: '/news/investment-environment/administrative-reform' },
        { labelVi: 'Chuyển đổi số', labelEn: 'Digital Transformation', pathVi: '/tin-tuc/su-kien/chuyen-doi-so', pathEn: '/news/digital-transformation' },
      ]},
      { groupVi: 'Thông tin & quy trình', groupEn: 'Information & Processes', items: [
        { labelVi: 'Thủ tục hành chính', labelEn: 'Administrative Procedures', externalUrl: 'https://dichvucong.danang.gov.vn/vi/' },
        { labelVi: 'Văn bản cải cách hành chính', labelEn: 'Administrative Reform Documents', pathVi: '/documents/legal-documents/administrative-reform', pathEn: '/documents/legal-documents/administrative-reform' },
      ]},
    ],
  },
  {
    titleVi: 'Tiện ích',
    titleEn: 'Utilities',
    items: [
      { groupVi: 'FAQ | Comment', groupEn: 'FAQ | Comment', items: [
        { labelVi: 'Hỏi | Đáp', labelEn: 'Q&A', pathVi: '/tien-ich/hoi-dap', pathEn: '/utilities/qna' },
        { labelVi: 'Câu hỏi thường gặp', labelEn: 'Frequently Asked Questions', pathVi: '/tien-ich/cau-hoi-thuong-gap', pathEn: '/utilities/frequently-asked-questions' },
        { labelVi: 'Cổng góp ý TP. Đà Nẵng', labelEn: 'Da Nang Feedback Portal', externalUrl: 'https://gopy.danang.gov.vn/' },
      ]},
      { groupVi: 'Kết nối doanh nghiệp', groupEn: 'Business Connection', items: [
        { labelVi: 'Cà phê cùng DSEZA', labelEn: 'Coffee with DSEZA', externalUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc7gyKy8ESi7k9Hxja0Mi9YAnWLf_yU3fQPnyzYp9hWGLLREg/viewform' },
      ]},
      { groupVi: 'Xem thêm', groupEn: 'More', items: [
        { labelVi: 'Lịch công tác', labelEn: 'Work Schedule', pathVi: '/tin-tuc/lich-cong-tac', pathEn: '/news/work-schedule' },
      ]},
      { groupVi: 'Dữ liệu chuyên ngành', groupEn: 'Sectoral Data', items: [] },
      { groupVi: 'Mua sắm công', groupEn: 'Public Procurement', items: [] },
      { groupVi: 'Tài liệu hướng dẫn sử dụng', groupEn: 'User Guide', items: [
        { labelVi: 'Làm theo năng lực | Hướng theo lao động', labelEn: 'Capability-based | Labor-oriented', externalUrl: 'https://dseza-backend.lndo.site/sites/default/files/2025-07/t%C3%A0i-li%E1%BB%87u-s%E1%BB%AD-d%E1%BB%A5ng.pdf' },
      ]},
      { labelVi: 'Liên hệ', labelEn: 'Contact', pathVi: '/lien-he', pathEn: '/contact' },
    ],
  },
];

const SectionCard: React.FC<{ section: Section; language: Lang; theme: 'light' | 'dark' }> = ({ section, language, theme }) => {
  const title = language === 'vi' ? section.titleVi : section.titleEn;
  const linkBaseClass = theme === 'dark'
    ? 'text-dseza-dark-main-text hover:text-dseza-dark-primary'
    : 'text-dseza-light-main-text hover:text-dseza-light-primary';
  const groupTitleClass = theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text';

  const renderItem = (item: LinkItem, idx: number) => {
    const href = resolveHref(item, language);
    const isExternal = /^https?:\/\//.test(href);
    const label = language === 'vi' ? item.labelVi : item.labelEn;
    const children = item.children || [];
    return (
      <li key={idx} className="py-1.5">
        {isExternal ? (
          <div className="flex items-center justify-between">
            <a href={href} target="_blank" rel="noopener noreferrer" className={`text-sm ${linkBaseClass}`}>
              {label}
            </a>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </div>
        ) : (
          <Link to={href} className={`text-sm ${linkBaseClass}`}>{label}</Link>
        )}
        {children.length > 0 && (
          <ul className="ml-4 mt-1 border-l pl-3 space-y-1.5" style={{ borderColor: theme === 'dark' ? '#455A64' : '#DCDCDC' }}>
            {children.map((c, cIdx) => (
              <li key={cIdx}>
                <Link to={resolveHref(c, language)} className={`text-sm ${linkBaseClass}`}>{language === 'vi' ? c.labelVi : c.labelEn}</Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <Card className={theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}>
      <CardContent className="p-5">
        <h3 className={theme === 'dark' ? 'text-dseza-dark-main-text font-semibold text-lg mb-3' : 'text-dseza-light-main-text font-semibold text-lg mb-3'}>
          {title}
        </h3>
        {/* Render mixed content: groups and single links allowed */}
        {Array.isArray(section.items) && section.items.length > 0 && (
          <div className="space-y-4">
            {section.items.map((entry, idx) => {
              const maybeGroup = entry as Group;
              if (Array.isArray(maybeGroup.items)) {
                return (
                  <div key={idx}>
                    <div className={`text-sm mb-1 ${groupTitleClass}`}>{language === 'vi' ? maybeGroup.groupVi : maybeGroup.groupEn}</div>
                    <ul className="divide-y divide-transparent">
                      {maybeGroup.items.map((li, liIdx) => renderItem(li, liIdx))}
                    </ul>
                  </div>
                );
              }
              const single = entry as LinkItem;
              return (
                <ul key={idx} className="divide-y divide-transparent">
                  {renderItem(single, 0)}
                </ul>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const SiteMapPage: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleDownload = () => {
    toast({ title: language === 'vi' ? 'Đang chuẩn bị tải xuống' : 'Preparing download', description: language === 'vi' ? 'Sơ đồ site sẽ sẵn sàng ngay.' : 'Site map will be ready shortly.' });
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: language === 'vi' ? 'Sơ đồ site - DSEZA' : 'Site Map - DSEZA', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: language === 'vi' ? 'Đã sao chép liên kết' : 'Link copied', description: language === 'vi' ? 'Liên kết đã được sao chép vào bộ nhớ tạm.' : 'URL copied to clipboard.' });
    }
  };
  const handlePrint = () => window.print();

  const pageTitle = language === 'vi' ? 'Sơ đồ site' : 'Site Map';
  const breadcrumbIntro = language === 'vi' ? 'Giới thiệu' : 'Introduction';

  if (isMobile) {
    return (
      <MobileLayout>
        <div className={theme === 'dark' ? 'min-h-screen flex flex-col bg-dseza-dark-main-bg' : 'min-h-screen flex flex-col bg-dseza-light-main-bg'}>
          <main className="flex-1 px-4 py-4 space-y-4">
            <div className={theme === 'dark' ? 'py-1 px-2 rounded-lg bg-dseza-dark-secondary-bg/50' : 'py-1 px-2 rounded-lg bg-dseza-light-secondary-bg/50'}>
              <nav className={theme === 'dark' ? 'flex items-center space-x-1 text-xs text-dseza-dark-secondary-text' : 'flex items-center space-x-1 text-xs text-dseza-light-secondary-text'}>
                <Link to={`/${language}`} className={theme === 'dark' ? 'transition-colors hover:text-dseza-dark-primary' : 'transition-colors hover:text-dseza-light-primary'}>
                  {language === 'vi' ? 'Trang chủ' : 'Home'}
                </Link>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>{breadcrumbIntro}</span>
                <ChevronRight className="h-2.5 w-2.5" />
                <span className={theme === 'dark' ? 'font-medium text-dseza-dark-main-text' : 'font-medium text-dseza-light-main-text'}>{pageTitle}</span>
              </nav>
            </div>

            <div className="text-center py-3">
              <h1 className={theme === 'dark' ? 'text-xl font-bold mb-2 text-dseza-dark-main-text' : 'text-xl font-bold mb-2 text-dseza-light-main-text'}>
                {pageTitle}
              </h1>
              <div className={theme === 'dark' ? 'w-12 h-0.5 mx-auto mb-2 rounded-full bg-dseza-dark-primary' : 'w-12 h-0.5 mx-auto mb-2 rounded-full bg-dseza-light-primary'}></div>
            </div>

            {sections.map((section, idx) => (
              <SectionCard key={idx} section={section} language={language} theme={theme as any} />
            ))}

            <Card className={theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' : 'bg-dseza-light-secondary-bg border-dseza-light-border'}>
              <CardContent className="p-4">
                <h3 className={theme === 'dark' ? 'text-base font-semibold mb-3 flex items-center gap-2 text-dseza-dark-main-text' : 'text-base font-semibold mb-3 flex items-center gap-2 text-dseza-light-main-text'}>
                  <Share2 className="h-4 w-4" />
                  {language === 'vi' ? 'Chia sẻ' : 'Share'}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" onClick={handleDownload} className={theme === 'dark' ? 'text-xs h-9 border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'text-xs h-9 border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}>
                    <Download className="w-3 h-3 mr-1" />
                    {language === 'vi' ? 'Tải xuống' : 'Download'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare} className={theme === 'dark' ? 'text-xs h-9 border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'text-xs h-9 border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}>
                    <Share2 className="w-3 h-3 mr-1" />
                    {language === 'vi' ? 'Chia sẻ' : 'Share'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handlePrint} className={theme === 'dark' ? 'text-xs h-9 border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'text-xs h-9 border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}>
                    <Printer className="w-3 h-3 mr-1" />
                    {language === 'vi' ? 'In' : 'Print'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
          <Footer />
        </div>
      </MobileLayout>
    );
  }

  return (
    <div className={theme === 'dark' ? 'min-h-screen flex flex-col bg-dseza-dark-main-bg' : 'min-h-screen flex flex-col bg-dseza-light-main-bg'}>
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      <main className="flex-1 pt-52">
        <div className={theme === 'dark' ? 'py-2 bg-dseza-dark-secondary/50' : 'py-2 bg-dseza-light-secondary/50'}>
          <div className="container mx-auto px-4">
            <nav className={theme === 'dark' ? 'flex items-center space-x-2 text-sm text-dseza-dark-secondary-text' : 'flex items-center space-x-2 text-sm text-dseza-light-secondary-text'}>
              <Link to={`/${language}`} className={theme === 'dark' ? 'transition-colors hover:text-dseza-dark-primary' : 'transition-colors hover:text-dseza-light-primary'}>
                {language === 'vi' ? 'Trang chủ' : 'Home'}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className={theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}>{breadcrumbIntro}</span>
              <ChevronRight className="h-4 w-4" />
              <span className={theme === 'dark' ? 'font-medium text-dseza-dark-main-text' : 'font-medium text-dseza-light-main-text'}>{pageTitle}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <article className="max-w-6xl mx-auto">
            <header className="mb-8">
              <h1 className={theme === 'dark' ? 'text-3xl md:text-4xl font-bold mb-4 leading-tight text-dseza-dark-main-text' : 'text-3xl md:text-4xl font-bold mb-4 leading-tight text-dseza-light-main-text'}>
                {pageTitle}
              </h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.map((section, idx) => (
                <SectionCard key={idx} section={section} language={language} theme={theme as any} />
              ))}
            </div>

            <div className={theme === 'dark' ? 'mt-12 pt-8 border-t border-dseza-dark-border' : 'mt-12 pt-8 border-t border-dseza-light-border'}>
              <h3 className={theme === 'dark' ? 'text-lg font-semibold mb-4 flex items-center gap-2 text-dseza-dark-main-text' : 'text-lg font-semibold mb-4 flex items-center gap-2 text-dseza-light-main-text'}>
                <Share2 className="h-5 w-5" />
                {language === 'vi' ? 'Chia sẻ' : 'Share'}
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" onClick={handleDownload} className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}>
                  <Download className="w-4 h-4 mr-2" />
                  {language === 'vi' ? 'Tải xuống' : 'Download'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}>
                  <Share2 className="w-4 h-4 mr-2" />
                  {language === 'vi' ? 'Chia sẻ' : 'Share'}
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint} className={theme === 'dark' ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-main-bg' : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-main-bg'}>
                  <Printer className="w-4 h-4 mr-2" />
                  {language === 'vi' ? 'In' : 'Print'}
                </Button>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SiteMapPage;


