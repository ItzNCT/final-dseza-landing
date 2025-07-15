import React, { useState } from "react";
import { Search, ChevronRight, Loader2, Building, MapPin, Users, Calendar, Globe, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useEnterprises } from "@/api/hooks";
import { useTheme } from "@/context/ThemeContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";

/**
 * EnterpriseListPage component for displaying and filtering enterprises
 */
const EnterpriseListPage: React.FC = () => {
  const { theme } = useTheme();
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    country: "",
    industry: "",
    page: 1,
    pageSize: 10, // Maximum 10 results per page
  });

  const [selectedEnterprise, setSelectedEnterprise] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Fetch enterprises data using the custom hook
  const { 
    data,
    enterprises, 
    isLoading, 
    isError, 
    error, 
    totalResults, 
    hasEnterprises 
  } = useEnterprises(filters);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value === "all" ? "" : value, // Convert "all" to empty string for API
      page: 1, // Reset to first page when filters change
    }));
  };

  const handleSearch = () => {
    // Trigger refetch by updating filters
    setFilters(prev => ({ ...prev }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleEnterpriseClick = (enterprise: any) => {
    if (enterprise) {
      setSelectedEnterprise(enterprise);
      setIsDetailDialogOpen(true);
    }
  };

  // Helper function to get taxonomy term name from relationships and included data
  const getTaxonomyTermName = (relationshipData: any, included: any[] = []) => {
    if (!relationshipData || !included) return "N/A";
    
    const termRef = Array.isArray(relationshipData) ? relationshipData[0] : relationshipData;
    if (!termRef) return "N/A";
    
    const term = included.find((item: any) => 
      item.type === termRef.type && item.id === termRef.id
    );
    
    return term?.attributes?.name || "N/A";
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex space-x-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );

  // Error component
  const ErrorDisplay = () => (
    <div className="text-center py-8">
      <p className={`mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
        Có lỗi xảy ra khi tải dữ liệu: {error?.message || 'Lỗi không xác định'}
      </p>
      <Button 
        onClick={handleSearch} 
        variant="outline"
        className={`${
          theme === 'dark' 
            ? 'bg-dseza-dark-secondary text-dseza-dark-main-text border-dseza-dark-border hover:bg-dseza-dark-hover' 
            : 'bg-dseza-light-secondary text-dseza-light-main-text border-dseza-light-border hover:bg-dseza-light-hover'
        }`}
      >
        Thử lại
      </Button>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-8">
      <p className={`${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
        Không tìm thấy doanh nghiệp nào phù hợp với bộ lọc hiện tại.
      </p>
    </div>
  );

  // Enterprise detail modal component
  const EnterpriseDetailModal = ({ enterprise, data }: { enterprise: any; data: any }) => {
    if (!enterprise) return null;

    return (
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${
        theme === 'dark' 
          ? 'bg-dseza-dark-secondary text-dseza-dark-main-text border-dseza-dark-border' 
          : 'bg-dseza-light-main-bg text-dseza-light-main-text border-dseza-light-border'
      }`}>
        <DialogHeader>
          <DialogTitle className={`text-xl font-bold ${
            theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
          }`}>
            THÔNG TIN CHI TIẾT DOANH NGHIỆP
          </DialogTitle>
          <p className={`text-sm mt-1 ${
            theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
          }`}>
            {enterprise.name || enterprise.title || "N/A"}
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className={`p-6 rounded-lg border ${
            theme === 'dark' 
              ? 'bg-dseza-dark-hover text-dseza-dark-main-text border-dseza-dark-border' 
              : 'bg-dseza-light-secondary text-dseza-light-main-text border-dseza-light-border'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <Building className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
              <h3 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
              }`}>Thông tin cơ bản</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Tên doanh nghiệp:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{enterprise.attributes?.title || "N/A"}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Khu vực:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{getTaxonomyTermName(enterprise.relationships?.field_khu_hanh_chinh?.data, data?.included)}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Lĩnh vực:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{getTaxonomyTermName(enterprise.relationships?.field_linh_vuc_hoat_dong?.data, data?.included)}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Quốc gia:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{enterprise.attributes?.field_quoc_gia || "N/A"}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Tên viết tắt:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{enterprise.attributes?.field_ten_viet_tat || "N/A"}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Trạng thái:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{enterprise.attributes?.status ? "Hoạt động" : "Không hoạt động"}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Ngày tạo:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{enterprise.attributes?.created ? new Date(enterprise.attributes.created).toLocaleDateString('vi-VN') : "N/A"}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Cập nhật:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{enterprise.attributes?.changed ? new Date(enterprise.attributes.changed).toLocaleDateString('vi-VN') : "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`p-6 rounded-lg border ${
            theme === 'dark' 
              ? 'bg-dseza-dark-hover text-dseza-dark-main-text border-dseza-dark-border' 
              : 'bg-dseza-light-secondary text-dseza-light-main-text border-dseza-light-border'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <Phone className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-secondary-accent' : 'text-dseza-light-secondary-accent'}`} />
              <h3 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
              }`}>Thông tin liên hệ</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Địa chỉ:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{enterprise.attributes?.field_address || "N/A"}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Điện thoại:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{enterprise.attributes?.field_dien_thoai || "N/A"}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Email:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{enterprise.attributes?.field_email1 || "N/A"}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Website:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>
                    {enterprise.attributes?.field_website ? (
                      <a 
                        href={enterprise.attributes.field_website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`underline ${
                          theme === 'dark' 
                            ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover' 
                            : 'text-dseza-light-primary hover:text-dseza-light-primary-hover'
                        }`}
                      >
                        {enterprise.attributes.field_website}
                      </a>
                    ) : "N/A"}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Người đại diện:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{enterprise.attributes?.field_nguoi_dai_dien || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-accent' : 'text-dseza-light-accent'}`} />
              <h3 className={`font-semibold text-lg ${
                theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
              }`}>Mô tả doanh nghiệp</h3>
            </div>
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-dseza-dark-hover border-dseza-dark-border' 
                : 'bg-dseza-light-secondary border-dseza-light-border'
            }`}>
              <p className={`leading-relaxed ${
                theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
              }`}>
                {enterprise.description || 
                 enterprise.summary || 
                 "Chưa có thông tin mô tả về doanh nghiệp này."}
              </p>
            </div>
          </div>
        </div>
        
        {/* Close Button */}
        <div className={`flex justify-end pt-4 border-t ${
          theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'
        }`}>
          <Button 
            variant="outline" 
            onClick={() => setIsDetailDialogOpen(false)}
            className={`min-w-[100px] ${
              theme === 'dark' 
                ? 'bg-dseza-dark-secondary text-dseza-dark-main-text border-dseza-dark-border hover:bg-dseza-dark-hover hover:text-dseza-dark-main-text' 
                : 'bg-dseza-light-main-bg text-dseza-light-main-text border-dseza-light-border hover:bg-dseza-light-hover hover:text-dseza-light-main-text'
            }`}
          >
            Đóng
          </Button>
        </div>
      </DialogContent>
    );
  };

  // Calculate statistics
  const totalEnterprises = totalResults || 0;
  const fdiEnterprises = enterprises?.filter(
    (enterprise: any) => enterprise.country && enterprise.country !== "Việt Nam"
  ).length || 0;
  const highTechZoneEnterprises = enterprises?.filter(
    (enterprise: any) => enterprise.location && enterprise.location.includes("Công nghệ cao")
  ).length || 0;

  // Calculate pagination info
  const currentPage = filters.page || 1;
  const resultsPerPage = filters.pageSize || 10;
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Header - Complete header structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="flex-1 pt-52"> {/* Added flex-1 and increased padding to accommodate full header */}
        {/* Breadcrumb */}
        <div className={`py-2 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${
              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
            }`}>
              <a 
                href="/" 
                className={`transition-colors ${
                  theme === 'dark' 
                    ? 'hover:text-dseza-dark-primary' 
                    : 'hover:text-dseza-light-primary'
                }`}
              >
                Trang chủ
              </a>
              <ChevronRight className="h-4 w-4" />
              <a 
                href="/doanh-nghiep" 
                className={`transition-colors ${
                  theme === 'dark' 
                    ? 'hover:text-dseza-dark-primary' 
                    : 'hover:text-dseza-light-primary'
                }`}
              >
                Doanh nghiệp
              </a>
              <ChevronRight className="h-4 w-4" />
              <a 
                href="/doanh-nghiep/thong-tin-doanh-nghiep" 
                className={`transition-colors ${
                  theme === 'dark' 
                    ? 'hover:text-dseza-dark-primary' 
                    : 'hover:text-dseza-light-primary'
                }`}
              >
                Thông tin doanh nghiệp
              </a>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${
                theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
              }`}>
                Thống kê doanh nghiệp
              </span>
            </nav>
          </div>
        </div>

        {/* Enterprise List Content */}
        <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
          <h1 className={`text-3xl md:text-4xl font-bold mb-8 text-center ${
            theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
          }`}>
          Danh sách Doanh nghiệp
        </h1>

        {/* Filter Section */}
          <div className={`p-6 rounded-lg mb-8 ${
            theme === 'dark' 
              ? 'bg-dseza-dark-secondary border border-dseza-dark-border' 
              : 'bg-dseza-light-secondary border border-dseza-light-border'
          }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Administrative Zone Filter */}
            <div className="space-y-2">
                <Label 
                  htmlFor="location"
                  className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}
                >
                  Khu hành chính
                </Label>
                <Select onValueChange={(value) => handleFilterChange("location", value)}>
                  <SelectTrigger className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-hover border-dseza-dark-border text-dseza-dark-main-text' 
                      : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'
                  }`}>
                  <SelectValue placeholder="Chọn khu hành chính" />
                </SelectTrigger>
                  <SelectContent className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-secondary border-dseza-dark-border' 
                      : 'bg-dseza-light-main-bg border-dseza-light-border'
                  }`}>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="khu-cong-nghe-cao">Khu Công nghệ cao</SelectItem>
                  <SelectItem value="kcn-hoa-khanh">KCN Hòa Khánh</SelectItem>
                  <SelectItem value="kcn-lien-chieu">KCN Liên Chiểu</SelectItem>
                  <SelectItem value="kcn-da-nang">KCN Đà Nẵng</SelectItem>
                  <SelectItem value="kdt-an-don">KĐT An Đồn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Enterprise Name Filter */}
            <div className="space-y-2">
                <Label 
                  htmlFor="keyword"
                  className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}
                >
                  Tên doanh nghiệp
                </Label>
              <Input
                  id="keyword"
                placeholder="Nhập tên doanh nghiệp"
                  value={filters.keyword}
                  onChange={(e) => handleFilterChange("keyword", e.target.value)}
                  className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-hover border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' 
                      : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'
                  }`}
              />
            </div>

            {/* Country Filter */}
            <div className="space-y-2">
                <Label 
                  htmlFor="country"
                  className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}
                >
                  Quốc gia
                </Label>
              <Select onValueChange={(value) => handleFilterChange("country", value)}>
                  <SelectTrigger className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-hover border-dseza-dark-border text-dseza-dark-main-text' 
                      : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'
                  }`}>
                  <SelectValue placeholder="Chọn quốc gia" />
                </SelectTrigger>
                  <SelectContent className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-secondary border-dseza-dark-border' 
                      : 'bg-dseza-light-main-bg border-dseza-light-border'
                  }`}>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="viet-nam">Việt Nam</SelectItem>
                  <SelectItem value="han-quoc">Hàn Quốc</SelectItem>
                  <SelectItem value="nhat-ban">Nhật Bản</SelectItem>
                  <SelectItem value="hoa-ky">Hoa Kỳ</SelectItem>
                  <SelectItem value="dai-loan">Đài Loan</SelectItem>
                  <SelectItem value="duc">Đức</SelectItem>
                  <SelectItem value="singapore">Singapore</SelectItem>
                  <SelectItem value="trung-quoc">Trung Quốc</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Industry Filter */}
            <div className="space-y-2">
                <Label 
                  htmlFor="industry"
                  className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}
                >
                  Lĩnh vực hoạt động
                </Label>
              <Select onValueChange={(value) => handleFilterChange("industry", value)}>
                  <SelectTrigger className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-hover border-dseza-dark-border text-dseza-dark-main-text' 
                      : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'
                  }`}>
                  <SelectValue placeholder="Chọn lĩnh vực" />
                </SelectTrigger>
                  <SelectContent className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-secondary border-dseza-dark-border' 
                      : 'bg-dseza-light-main-bg border-dseza-light-border'
                  }`}>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="dien-tu-vien-thong">Điện tử viễn thông</SelectItem>
                  <SelectItem value="cong-nghe-thong-tin">Công nghệ thông tin</SelectItem>
                  <SelectItem value="hoa-chat-nhua">Hóa chất - Nhựa</SelectItem>
                  <SelectItem value="oto-co-khi">Ô tô - Cơ khí</SelectItem>
                  <SelectItem value="det-may">Dệt may</SelectItem>
                  <SelectItem value="thuc-pham">Thực phẩm</SelectItem>
                  <SelectItem value="xay-dung">Xây dựng</SelectItem>
                  <SelectItem value="logistics">Logistics</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>

          {/* Search Button */}
          <div className="mt-6 flex justify-center lg:justify-start">
            <Button 
              onClick={handleSearch}
                className={`px-8 ${
                  theme === 'dark' 
                    ? 'bg-dseza-dark-primary text-dseza-dark-main-text hover:bg-dseza-dark-primary-hover' 
                    : 'bg-dseza-light-primary text-dseza-light-main-bg hover:bg-dseza-light-primary-hover'
                }`}
              size="default"
                disabled={isLoading}
            >
              <Search className="h-4 w-4 mr-2" />
                {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
              
              {/* Results Count and Statistics */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                }`}>
                  {isLoading ? (
                    <Skeleton className="h-4 w-48" />
                  ) : (
                    `Hiển thị ${startResult}-${endResult} của ${totalEnterprises} doanh nghiệp`
                  )}
                </div>
                
                {/* Quick Stats */}
                {!isLoading && enterprises.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        theme === 'dark' 
                          ? 'bg-dseza-dark-secondary-accent/20 text-dseza-dark-secondary-accent border-dseza-dark-secondary-accent/30' 
                          : 'bg-dseza-light-secondary-accent/20 text-dseza-light-secondary-accent border-dseza-light-secondary-accent/30'
                      }`}
                    >
                      {enterprises.filter((e: any) => e.country !== "Việt Nam").length} FDI
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        theme === 'dark' 
                          ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' 
                          : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30'
                      }`}
                    >
                      {enterprises.filter((e: any) => e.location && e.location.includes("Công nghệ cao")).length} Khu Công nghệ cao
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        theme === 'dark' 
                          ? 'bg-dseza-dark-accent/20 text-dseza-dark-accent border-dseza-dark-accent/30' 
                          : 'bg-dseza-light-accent/20 text-dseza-light-accent border-dseza-light-accent/30'
                      }`}
                    >
                      {enterprises.filter((e: any) => e.industry && e.industry.includes("Công nghệ")).length} Công nghệ
                    </Badge>
                  </div>
                )}
              </div>
          
          {/* Results Title */}
            <h2 className={`text-2xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
            }`}>
            KẾT QUẢ THỐNG KÊ DOANH NGHIỆP
          </h2>

          {/* Results Table */}
            <div className={`rounded-md border overflow-hidden ${
              theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'
            }`}>
            <Table>
              <TableHeader>
                  <TableRow className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-secondary border-dseza-dark-border' 
                      : 'bg-dseza-light-secondary border-dseza-light-border'
                  }`}>
                    <TableHead className={`w-[80px] text-center font-semibold ${
                      theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                    }`}>#</TableHead>
                    <TableHead className={`font-semibold ${
                      theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                    }`}>Doanh nghiệp</TableHead>
                    <TableHead className={`font-semibold ${
                      theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                    }`}>Khu hành chính</TableHead>
                    <TableHead className={`font-semibold ${
                      theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                    }`}>Lĩnh vực hoạt động</TableHead>
                    <TableHead className={`font-semibold ${
                      theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                    }`}>Quốc gia</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <LoadingSkeleton />
                        </TableCell>
                      </TableRow>
                    ) : isError ? (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <ErrorDisplay />
                        </TableCell>
                      </TableRow>
                    ) : !hasEnterprises ? (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <EmptyState />
                        </TableCell>
                      </TableRow>
                    ) : (
                      enterprises.map((enterprise: any, index: number) => (
                        <TableRow key={enterprise.id || index} className={`${
                          theme === 'dark' 
                            ? 'border-dseza-dark-border hover:bg-dseza-dark-hover/50' 
                            : 'border-dseza-light-border hover:bg-dseza-light-hover/50'
                        }`}>
                          <TableCell className={`text-center font-medium ${
                            theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                          }`}>
                            {(filters.page - 1) * filters.pageSize + index + 1}
                    </TableCell>
                    <TableCell>
                            <button
                              onClick={() => handleEnterpriseClick(enterprise)}
                              className={`font-medium transition-colors cursor-pointer text-left ${
                                theme === 'dark' 
                                  ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover hover:underline' 
                                  : 'text-dseza-light-primary hover:text-dseza-light-primary-hover hover:underline'
                              }`}
                              title="Xem chi tiết doanh nghiệp"
                            >
                              {enterprise.attributes?.title || 'N/A'}
                            </button>
                    </TableCell>
                    <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              theme === 'dark' 
                                ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary' 
                                : 'bg-dseza-light-primary/20 text-dseza-light-primary'
                            }`}>
                              {getTaxonomyTermName(enterprise.relationships?.field_khu_hanh_chinh?.data, data?.included)}
                      </span>
                    </TableCell>
                    <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              theme === 'dark' 
                                ? 'bg-dseza-dark-secondary-accent/20 text-dseza-dark-secondary-accent' 
                                : 'bg-dseza-light-secondary-accent/20 text-dseza-light-secondary-accent'
                            }`}>
                              {getTaxonomyTermName(enterprise.relationships?.field_linh_vuc_hoat_dong?.data, data?.included)}
                      </span>
                    </TableCell>
                    <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              theme === 'dark' 
                                ? 'bg-dseza-dark-accent/20 text-dseza-dark-accent' 
                                : 'bg-dseza-light-accent/20 text-dseza-light-accent'
                            }`}>
                              {enterprise.attributes?.field_quoc_gia || 'N/A'}
                      </span>
                    </TableCell>
                  </TableRow>
                      ))
                    )}
              </TableBody>
            </Table>
          </div>

              {/* Pagination */}
              {!isLoading && enterprises.length > 0 && totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) handlePageChange(currentPage - 1);
                          }}
                          className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""} ${
                            theme === 'dark' 
                              ? 'text-dseza-dark-main-text hover:bg-dseza-dark-hover' 
                              : 'text-dseza-light-main-text hover:bg-dseza-light-hover'
                          }`}
                        />
                      </PaginationItem>
                      
                      {/* Dynamic pagination based on totalPages */}
                      {(() => {
                        const pages = [];
                        const maxVisiblePages = 5;
                        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                        
                        if (endPage - startPage + 1 < maxVisiblePages) {
                          startPage = Math.max(1, endPage - maxVisiblePages + 1);
                        }
                        
                        if (startPage > 1) {
                          pages.push(
                            <PaginationItem key={1}>
                              <PaginationLink 
                                href="#" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(1);
                                }}
                                isActive={currentPage === 1}
                                className={`${
                                  theme === 'dark' 
                                    ? 'text-dseza-dark-main-text hover:bg-dseza-dark-hover' 
                                    : 'text-dseza-light-main-text hover:bg-dseza-light-hover'
                                } ${currentPage === 1 ? (theme === 'dark' ? 'bg-dseza-dark-primary text-dseza-dark-main-text' : 'bg-dseza-light-primary text-dseza-light-main-bg') : ''}`}
                              >
                                1
                              </PaginationLink>
                            </PaginationItem>
                          );
                          
                          if (startPage > 2) {
                            pages.push(
                              <PaginationItem key="ellipsis1">
                                <PaginationEllipsis className={`${
                                  theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                                }`} />
                              </PaginationItem>
                            );
                          }
                        }
                        
                        for (let i = startPage; i <= endPage; i++) {
                          if (i !== 1 && i !== totalPages) {
                            pages.push(
                              <PaginationItem key={i}>
                                <PaginationLink 
                                  href="#" 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(i);
                                  }}
                                  isActive={currentPage === i}
                                  className={`${
                                    theme === 'dark' 
                                      ? 'text-dseza-dark-main-text hover:bg-dseza-dark-hover' 
                                      : 'text-dseza-light-main-text hover:bg-dseza-light-hover'
                                  } ${currentPage === i ? (theme === 'dark' ? 'bg-dseza-dark-primary text-dseza-dark-main-text' : 'bg-dseza-light-primary text-dseza-light-main-bg') : ''}`}
                                >
                                  {i}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          }
                        }
                        
                        if (endPage < totalPages) {
                          if (endPage < totalPages - 1) {
                            pages.push(
                              <PaginationItem key="ellipsis2">
                                <PaginationEllipsis className={`${
                                  theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                                }`} />
                              </PaginationItem>
                            );
                          }
                          
                          pages.push(
                            <PaginationItem key={totalPages}>
                              <PaginationLink 
                                href="#" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(totalPages);
                                }}
                                isActive={currentPage === totalPages}
                                className={`${
                                  theme === 'dark' 
                                    ? 'text-dseza-dark-main-text hover:bg-dseza-dark-hover' 
                                    : 'text-dseza-light-main-text hover:bg-dseza-light-hover'
                                } ${currentPage === totalPages ? (theme === 'dark' ? 'bg-dseza-dark-primary text-dseza-dark-main-text' : 'bg-dseza-light-primary text-dseza-light-main-bg') : ''}`}
                              >
                                {totalPages}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        
                        return pages;
                      })()}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) handlePageChange(currentPage + 1);
                          }}
                          className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""} ${
                            theme === 'dark' 
                              ? 'text-dseza-dark-main-text hover:bg-dseza-dark-hover' 
                              : 'text-dseza-light-main-text hover:bg-dseza-light-hover'
                          }`}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}

          {/* Statistics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className={`p-4 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-primary/20 border border-dseza-dark-primary/30' 
                  : 'bg-dseza-light-primary/20 border border-dseza-light-primary/30'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
                }`}>
                Tổng số doanh nghiệp
              </h3>
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
                }`}>
                  {isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    totalEnterprises
                  )}
                </div>
            </div>
            
              <div className={`p-4 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-secondary-accent/20 border border-dseza-dark-secondary-accent/30' 
                  : 'bg-dseza-light-secondary-accent/20 border border-dseza-light-secondary-accent/30'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-dseza-dark-secondary-accent' : 'text-dseza-light-secondary-accent'
                }`}>
                Doanh nghiệp FDI
              </h3>
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-dseza-dark-secondary-accent' : 'text-dseza-light-secondary-accent'
                }`}>
                  {isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    fdiEnterprises
                  )}
                </div>
            </div>
            
              <div className={`p-4 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-accent/20 border border-dseza-dark-accent/30' 
                  : 'bg-dseza-light-accent/20 border border-dseza-light-accent/30'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-dseza-dark-accent' : 'text-dseza-light-accent'
                }`}>
                Khu Công nghệ cao
              </h3>
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-dseza-dark-accent' : 'text-dseza-light-accent'
                }`}>
                  {isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    highTechZoneEnterprises
                  )}
                </div>
              </div>
          </div>

        </div>
      </div>
    </main>

        {/* Footer */}
        <Footer />

        {/* Enterprise Detail Dialog */}
        <Dialog 
          open={isDetailDialogOpen} 
          onOpenChange={(open) => {
            setIsDetailDialogOpen(open);
            if (!open) {
              setSelectedEnterprise(null);
            }
          }}
        >
          <EnterpriseDetailModal enterprise={selectedEnterprise} data={data} />
        </Dialog>
      </div>
  );
};

export default EnterpriseListPage; 