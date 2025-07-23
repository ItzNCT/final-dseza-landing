import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { FileText } from "lucide-react";

interface DocumentTab {
  title: string;
  path: string;
  category: string;
}

const documentTabs: DocumentTab[] = [
  {
    title: 'Văn bản pháp quy trung ương',
    path: '/van-ban/van-ban-phap-luat/phap-quy-trung-uong',
    category: 'phap_quy_trung_uong'
  },
  {
    title: 'Văn bản pháp quy địa phương',
    path: '/van-ban/van-ban-phap-luat/phap-quy-dia-phuong',
    category: 'phap_quy_dia_phuong'
  },
  {
    title: 'Văn bản chỉ đạo điều hành',
    path: '/van-ban/van-ban-phap-luat/chi-dao-dieu-hanh',
    category: 'chi_dao_dieu_hanh'
  },
  {
    title: 'Văn bản CCHC',
    path: '/van-ban/van-ban-phap-luat/cchc',
    category: 'cchc'
  }
];

const DocumentSideNav: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`rounded-lg border p-4 ${
      theme === 'dark' 
        ? 'bg-dseza-dark-secondary border-dseza-dark-border' 
        : 'bg-dseza-light-secondary border-dseza-light-border'
    }`}>
      {/* Navigation Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-current">
        <FileText className={`h-5 w-5 ${
          theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
        }`} />
        <h2 className={`font-semibold text-lg ${
          theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
        }`}>
          Loại văn bản
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2">
        {documentTabs.map((tab) => (
          <NavLink
            key={tab.category}
            to={tab.path}
            className={({ isActive }) =>
              `block w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive
                  ? theme === 'dark'
                    ? 'bg-dseza-dark-primary text-dseza-dark-main-text shadow-sm'
                    : 'bg-dseza-light-primary text-dseza-light-main-bg shadow-sm'
                  : theme === 'dark'
                    ? 'text-dseza-dark-secondary-text hover:text-dseza-dark-main-text hover:bg-dseza-dark-hover'
                    : 'text-dseza-light-secondary-text hover:text-dseza-light-main-text hover:bg-dseza-light-hover'
              }`
            }
          >
            {tab.title}
          </NavLink>
        ))}
      </nav>

      {/* Additional Info */}
      <div className={`mt-6 pt-4 border-t ${
        theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'
      }`}>
        <p className={`text-xs ${
          theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
        }`}>
          Chọn loại văn bản để xem danh sách tài liệu tương ứng
        </p>
      </div>
    </div>
  );
};

export default DocumentSideNav; 