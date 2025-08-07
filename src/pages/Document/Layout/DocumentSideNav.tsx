import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { FileText } from "lucide-react";

interface DocumentTab {
  title: string;
  path: string;
  category: string;
}

const DocumentSideNav: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const viBasePath = "/van-ban/van-ban-phap-luat";
  const enBasePath = "/documents/legal-documents";

  const viTabs: DocumentTab[] = [
    {
      title: "Văn bản pháp quy trung ương",
      path: `${viBasePath}/quy-dinh-trung-uong`,
      category: "quy_dinh_trung_uong",
    },
    {
      title: "Văn bản pháp quy địa phương",
      path: `${viBasePath}/quy-dinh-dia-phuong`,
      category: "quy_dinh_dia_phuong",
    },
    {
      title: "Văn bản chỉ đạo điều hành",
      path: `${viBasePath}/chi-dao-dieu-hanh`,
      category: "chi_dao_dieu_hanh",
    },
    {
      title: "Văn bản CCHC",
      path: `${viBasePath}/cai-cach-hanh-chinh`,
      category: "cai_cach_hanh_chinh",
    },
  ];

  const enTabs: DocumentTab[] = [
    {
      title: "Central Legal Regulations",
      path: `${enBasePath}/central-legal-regulations`,
      category: "central_legal_regulations",
    },
    {
      title: "Local Legal Regulations",
      path: `${enBasePath}/local-legal-regulations`,
      category: "local_legal_regulations",
    },
    {
      title: "Directive and Management Documents",
      path: `${enBasePath}/directive-management-documents`,
      category: "directive_management_documents",
    },
    {
      title: "Administrative Reform Documents",
      path: `${enBasePath}/administrative-reform-documents`,
      category: "administrative_reform_documents",
    },
  ];

  const documentTabs: DocumentTab[] = language === "en" ? enTabs : viTabs;
  const navHeaderTitle = language === "en" ? "Document Type" : "Loại văn bản";
  const additionalInfo =
    language === "en"
      ? "Select a document type to view the corresponding documents"
      : "Chọn loại văn bản để xem danh sách tài liệu tương ứng";

  return (
    <div
      className={`rounded-lg border p-4 ${
        theme === "dark"
          ? "bg-dseza-dark-secondary border-dseza-dark-border"
          : "bg-dseza-light-secondary border-dseza-light-border"
      }`}
    >
      {/* Navigation Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-current">
        <FileText
          className={`h-5 w-5 ${
            theme === "dark" ? "text-dseza-dark-primary" : "text-dseza-light-primary"
          }`}
        />
        <h2
          className={`font-semibold text-lg ${
            theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text"
          }`}
        >
          {navHeaderTitle}
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
                  ? theme === "dark"
                    ? "bg-dseza-dark-primary text-dseza-dark-main-text shadow-sm"
                    : "bg-dseza-light-primary text-dseza-light-main-bg shadow-sm"
                  : theme === "dark"
                  ? "text-dseza-dark-secondary-text hover:text-dseza-dark-main-text hover:bg-dseza-dark-hover"
                  : "text-dseza-light-secondary-text hover:text-dseza-light-main-text hover:bg-dseza-light-hover"
              }`
            }
          >
            {tab.title}
          </NavLink>
        ))}
      </nav>

      {/* Additional Info */}
      <div
        className={`mt-6 pt-4 border-t ${
          theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border"
        }`}
      >
        <p
          className={`text-xs ${
            theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text"
          }`}
        >
          {additionalInfo}
        </p>
      </div>
    </div>
  );
};

export default DocumentSideNav;
