import React, { useState } from "react";
import { Download, Search, ChevronRight, Loader2 } from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useDocuments, DocumentFilters } from "@/api/hooks";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";

/**
 * DocumentSearchPage component for searching legal documents
 */
const DocumentSearchPage: React.FC = () => {
  // Base URL for API endpoints
  const JSON_API_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
    (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');
  const { toast } = useToast();
  const { theme } = useTheme();
  const [filters, setFilters] = useState<DocumentFilters>({
    documentNumber: "",
    summary: "",
    startDate: "",
    endDate: "",
    documentType: "",
    page: 1,
    pageSize: 5, // Maximum 5 results per page
  });
  
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set());
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(new Set());
  const [showMobileView, setShowMobileView] = useState(false);

  const { data, isLoading, isError, error, documents, totalResults } = useDocuments(filters);

  const handleInputChange = (field: keyof DocumentFilters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      // Reset to page 1 when changing search filters (but not when changing page)
      ...(field !== 'page' && { page: 1 })
    }));
  };

  const handleSearch = () => {
    // No need to do anything - useQuery will automatically call API when filters state changes
    console.log("Current filters:", filters);
  };

  const handleDownload = async (documentId: string) => {
    console.log("Downloading document:", documentId);
    
    // Set loading state
    setDownloadingIds(prev => new Set(prev).add(documentId));
    
    try {
      // Find the document in the current results
      const documentData = documents.find((doc: any) => doc.id === documentId);
      if (!documentData) {
        console.error("Document not found:", documentId);
        toast({
          title: "Lỗi",
          description: "Không tìm thấy văn bản. Vui lòng thử lại.",
          variant: "destructive",
        });
        return;
      }

      // Get file URL from the document's relationships and included data
      const fileUrl = getDocumentFileUrl(documentData, data?.included);
      
      if (fileUrl) {
        // Create a temporary anchor element to trigger download
        const link = window.document.createElement('a');
        link.href = fileUrl;
        link.download = ''; // This will use the filename from the server
        link.target = '_blank'; // Open in new tab as fallback
        
        // Append to body, click, and remove
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
        
        // Show success toast
        toast({
          title: "Đang tải file...",
          description: "File sẽ được tải xuống trong giây lát.",
        });
      } else {
        console.error("File URL not found for document:", documentId);
        // Show user-friendly error message
        toast({
          title: "Không thể tải file",
          description: "File không tồn tại hoặc đã bị xóa. Vui lòng thử lại sau.",
          variant: "destructive",
        });
      }
    } finally {
      // Remove loading state after a short delay
      setTimeout(() => {
        setDownloadingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(documentId);
          return newSet;
        });
      }, 1000);
    }
  };

  const handleBulkDownload = async () => {
    if (selectedDocuments.size === 0) {
      toast({
        title: "Thông báo",
        description: "Vui lòng chọn ít nhất một văn bản để tải xuống.",
        variant: "destructive",
      });
      return;
    }

    const documentsToDownload = documents.filter(doc => 
      selectedDocuments.has(doc.id) && getDocumentFileUrl(doc, data?.included)
    );

    if (documentsToDownload.length === 0) {
      toast({
        title: "Thông báo",
        description: "Không có văn bản nào được chọn có file đính kèm.",
        variant: "destructive",
      });
      return;
    }

    // Download each document with a small delay to avoid overwhelming the server
    for (const doc of documentsToDownload) {
      await handleDownload(doc.id);
      await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
    }

    // Clear selection after download
    setSelectedDocuments(new Set());
  };

  const handleSelectDocument = (documentId: string, checked: boolean) => {
    setSelectedDocuments(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(documentId);
      } else {
        newSet.delete(documentId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const availableIds = documents
        .filter(doc => getDocumentFileUrl(doc, data?.included))
        .map(doc => doc.id);
      setSelectedDocuments(new Set(availableIds));
    } else {
      setSelectedDocuments(new Set());
    }
  };

  const handlePageChange = (page: number) => {
    handleInputChange('page', page);
  };

  const handleDocumentClick = (document: any) => {
    if (document) {
      setSelectedDocument(document);
      setIsDetailDialogOpen(true);
    }
  };

  // Helper function to extract text content from Drupal text fields
  const getTextContent = (field: any) => {
    if (!field) return "";
    
    // If it's a string, return it directly
    if (typeof field === 'string') return field;
    
    // If it's an object with value property (Drupal text field format)
    if (typeof field === 'object' && field.value !== undefined) {
      let content = field.processed || field.value || "";
      
      // Strip HTML tags if content contains HTML
      if (typeof content === 'string' && content.includes('<')) {
        // Create a temporary div to parse HTML and extract text content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        content = tempDiv.textContent || tempDiv.innerText || "";
      }
      
      return content;
    }
    
    // If it's an array, get the first item
    if (Array.isArray(field) && field.length > 0) {
      return getTextContent(field[0]);
    }
    
    return "";
  };

  // Helper function to extract file URL from document data
  const getDocumentFileUrl = (document: any, included: any[] = []) => {
    try {
      // Get the field_file_dinh_kem relationship
      const fileRelationship = document.relationships?.field_file_dinh_kem?.data;
      if (!fileRelationship) return null;

      // Handle both single file and array of files
      const fileRef = Array.isArray(fileRelationship) ? fileRelationship[0] : fileRelationship;
      if (!fileRef) return null;

      // Find the media document in included data
      const mediaDocument = included.find((item: any) => 
        item.type === fileRef.type && item.id === fileRef.id
      );
      if (!mediaDocument) return null;

      // Get the field_media_document relationship
      const mediaFileRelationship = mediaDocument.relationships?.field_media_document?.data;
      if (!mediaFileRelationship) return null;

      // Find the actual file in included data
      const fileEntity = included.find((item: any) => 
        item.type === mediaFileRelationship.type && item.id === mediaFileRelationship.id
      );
      if (!fileEntity) return null;

      // Get the file URL
      const fileUrl = fileEntity.attributes?.uri?.url;
      if (!fileUrl) return null;

      // Return full URL (add base URL if it's a relative path)
      return fileUrl.startsWith('http') ? fileUrl : `${JSON_API_BASE_URL}${fileUrl}`;
    } catch (error) {
      console.error('Error extracting file URL:', error);
      return null;
    }
  };

  // Calculate pagination info
  const currentPage = filters.page || 1;
  const resultsPerPage = filters.pageSize || 10;
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Document detail modal component
  const DocumentDetailModal = ({ document }: { document: any }) => {
    if (!document) return null;

    const fileUrl = getDocumentFileUrl(document, data?.included);

    // Helper function to get taxonomy term name from relationships
    const getTaxonomyTermName = (relationshipData: any, included: any[] = []) => {
      if (!relationshipData || !included) return "N/A";
      
      const termRef = Array.isArray(relationshipData) ? relationshipData[0] : relationshipData;
      if (!termRef) return "N/A";
      
      const term = included.find((item: any) => 
        item.type === termRef.type && item.id === termRef.id
      );
      
      return term?.attributes?.name || "N/A";
    };

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
            THUỘC TÍNH VĂN BẢN
          </DialogTitle>
          <p className={`text-sm mt-1 ${
            theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
          }`}>
            {document.attributes?.field_so_ky_hieu || "N/A"}
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Document Information Table */}
          <div className={`p-4 rounded-lg border ${
            theme === 'dark' 
              ? 'bg-dseza-dark-hover text-dseza-dark-main-text border-dseza-dark-border' 
              : 'bg-dseza-light-secondary text-dseza-light-main-text border-dseza-light-border'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Số ký hiệu:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{document.attributes?.field_so_ky_hieu || "N/A"}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Người ký:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{document.attributes?.field_nguoi_ky || "N/A"}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Lĩnh vực:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{getTaxonomyTermName(document.relationships?.field_linh_vuc?.data, data?.included)}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Loại văn bản:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{getTaxonomyTermName(document.relationships?.field_loai_van_ban?.data, data?.included)}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Cấp ban hành:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{getTaxonomyTermName(document.relationships?.field_cap_ban_hanh?.data, data?.included)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Ngày ban hành:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{formatDate(document.attributes?.field_ngay_ban_hanh || "")}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Ngày hiệu lực:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{formatDate(document.attributes?.field_ngay_hieu_luc || "")}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Ngày hết hiệu lực:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{formatDate(document.attributes?.field_ngay_het_hieu_luc || "")}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                  }`}>Cơ quan ban hành:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{getTaxonomyTermName(document.relationships?.field_co_quan_ban_hanh?.data, data?.included)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Document Content */}
          <div className="space-y-4">
            <div>
              <h3 className={`font-semibold text-lg mb-2 ${
                theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
              }`}>Nội dung:</h3>
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-hover border-dseza-dark-border' 
                  : 'bg-dseza-light-secondary border-dseza-light-border'
              }`}>
                <p className={`leading-relaxed ${
                  theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                }`}>
                  {getTextContent(document.attributes?.field_noi_dung) || 
                   getTextContent(document.attributes?.field_trich_yeu) || 
                   getTextContent(document.attributes?.title) || "Không có nội dung"}
                </p>
              </div>
            </div>

            {/* File Attachments */}
            <div>
              <h3 className={`font-semibold text-lg mb-2 ${
                theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
              }`}>File đính kèm:</h3>
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-hover border-dseza-dark-border' 
                  : 'bg-dseza-light-secondary border-dseza-light-border'
              }`}>
                <div className="flex gap-2">
                  {fileUrl ? (
                    <Button
                      onClick={() => handleDownload(document.id)}
                      disabled={downloadingIds.has(document.id)}
                      className={`flex items-center gap-2 ${
                        theme === 'dark' 
                          ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary-hover text-dseza-dark-main-text border-dseza-dark-primary' 
                          : 'bg-dseza-light-primary hover:bg-dseza-light-primary-hover text-dseza-light-main-bg border-dseza-light-primary'
                      }`}
                      size="sm"
                    >
                      {downloadingIds.has(document.id) ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      Tải xuống ({document.attributes?.field_so_ky_hieu || "document"})
                    </Button>
                  ) : (
                    <Badge variant="secondary" className={`${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-secondary text-dseza-dark-secondary-text border-dseza-dark-border' 
                        : 'bg-dseza-light-secondary text-dseza-light-secondary-text border-dseza-light-border'
                    }`}>
                      Không có file đính kèm
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Related Documents Section */}
            <div>
              <h3 className={`font-semibold text-lg mb-2 ${
                theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
              }`}>VĂN BẢN LIÊN QUAN THEO LĨNH VỰC</h3>
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-hover border-dseza-dark-border' 
                  : 'bg-dseza-light-secondary border-dseza-light-border'
              }`}>
                <p className={`text-sm italic ${
                  theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                }`}>
                  Chức năng hiển thị văn bản liên quan sẽ được phát triển trong phiên bản tiếp theo.
                </p>
              </div>
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

  // Loading skeleton for table
  const TableSkeleton = () => (
    <div className={`rounded-md border ${
      theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'
    }`}>
      <Table>
        <TableHeader className={`${
          theme === 'dark' 
            ? 'bg-dseza-dark-secondary border-dseza-dark-border' 
            : 'bg-dseza-light-secondary border-dseza-light-border'
        }`}>
          <TableRow>
            <TableHead className="w-[50px]">
              <Skeleton className="h-4 w-4" />
            </TableHead>
            <TableHead className="w-[200px]">Số/Ký hiệu</TableHead>
            <TableHead>Trích yếu</TableHead>
            <TableHead className="w-[150px]">Ngày ban hành</TableHead>
            <TableHead className="w-[100px] text-center">Tải về</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index} className={`${
              theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'
            }`}>
              <TableCell>
                <Skeleton className="h-4 w-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-8 w-8 mx-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

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
              <span className={`font-medium ${
                theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
              }`}>
                Tra cứu Văn bản Pháp quy
              </span>
            </nav>
          </div>
        </div>

        {/* Document Search Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <h1 className={`text-3xl md:text-4xl font-bold mb-8 text-center ${
            theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
          }`}>
            Tra cứu Văn bản Pháp quy
          </h1>

          {/* Search Filters Section */}
          <div className={`p-6 rounded-lg mb-8 ${
            theme === 'dark' 
              ? 'bg-dseza-dark-secondary border border-dseza-dark-border' 
              : 'bg-dseza-light-secondary border border-dseza-light-border'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Document Number/Symbol */}
              <div className="space-y-2">
                <Label 
                  htmlFor="documentNumber"
                  className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}
                >
                  Số/Ký hiệu
                </Label>
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  placeholder="Nhập số/ký hiệu văn bản"
                  value={filters.documentNumber || ""}
                  onChange={(e) => handleInputChange("documentNumber", e.target.value)}
                  className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-hover border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' 
                      : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'
                  }`}
                />
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <Label 
                  htmlFor="summary"
                  className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}
                >
                  Trích yếu
                </Label>
                <Input
                  id="summary"
                  name="summary"
                  placeholder="Nhập từ khóa trích yếu"
                  value={filters.summary || ""}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-hover border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' 
                      : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'
                  }`}
                />
              </div>

              {/* Date From */}
              <div className="space-y-2">
                <Label 
                  htmlFor="startDate"
                  className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}
                >
                  Ngày ban hành từ
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={filters.startDate || ""}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-hover border-dseza-dark-border text-dseza-dark-main-text' 
                      : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'
                  }`}
                />
              </div>

              {/* Date To */}
              <div className="space-y-2">
                <Label 
                  htmlFor="endDate"
                  className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}
                >
                  Ngày ban hành đến
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={filters.endDate || ""}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-hover border-dseza-dark-border text-dseza-dark-main-text' 
                      : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'
                  }`}
                />
              </div>

              {/* Document Type */}
              <div className="space-y-2">
                <Label 
                  htmlFor="documentType"
                  className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}
                >
                  Loại văn bản
                </Label>
                <Select 
                  value={filters.documentType || "all"} 
                  onValueChange={(value) => handleInputChange("documentType", value === "all" ? "" : value)}
                  name="documentType"
                >
                  <SelectTrigger 
                    id="documentType"
                    className={`${
                      theme === 'dark' 
                        ? 'bg-dseza-dark-hover border-dseza-dark-border text-dseza-dark-main-text' 
                        : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'
                    }`}
                  >
                    <SelectValue placeholder="Chọn loại văn bản" />
                  </SelectTrigger>
                  <SelectContent className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-secondary border-dseza-dark-border' 
                      : 'bg-dseza-light-main-bg border-dseza-light-border'
                  }`}>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="quyet-dinh">Quyết định</SelectItem>
                    <SelectItem value="nghi-dinh">Nghị định</SelectItem>
                    <SelectItem value="thong-tu">Thông tư</SelectItem>
                    <SelectItem value="cong-van">Công văn</SelectItem>
                    <SelectItem value="chi-thi">Chỉ thị</SelectItem>
                    <SelectItem value="huong-dan">Hướng dẫn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="space-y-2 lg:col-span-3 flex items-end">
                <Button 
                  onClick={handleSearch}
                  className={`w-full md:w-auto px-8 ${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-primary text-dseza-dark-main-text hover:bg-dseza-dark-primary-hover' 
                      : 'bg-dseza-light-primary text-dseza-light-main-bg hover:bg-dseza-light-primary-hover'
                  }`}
                  size="default"
                  disabled={isLoading}
                >
                  <Search className="h-4 w-4 mr-2" />
                  {isLoading ? "Đang tìm kiếm..." : "Tìm kiếm"}
                </Button>
              </div>
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
                  `Hiển thị ${startResult}-${endResult} của ${totalResults} kết quả`
                )}
              </div>
              
              {/* Quick Stats and Bulk Actions */}
              {!isLoading && documents.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        theme === 'dark' 
                          ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' 
                          : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30'
                      }`}
                    >
                      {(() => {
                        return documents.filter(doc => {
                          const termData = doc.relationships?.field_loai_van_ban?.data;
                          if (!termData || !data?.included) return false;
                          
                          const termRef = Array.isArray(termData) ? termData[0] : termData;
                          if (!termRef) return false;
                          
                          const term = data.included.find((item: any) => 
                            item.type === termRef.type && item.id === termRef.id
                          );
                          
                          return term?.attributes?.name === 'Quyết định';
                        }).length;
                      })()} Quyết định
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        theme === 'dark' 
                          ? 'bg-dseza-dark-secondary-accent/20 text-dseza-dark-secondary-accent border-dseza-dark-secondary-accent/30' 
                          : 'bg-dseza-light-secondary-accent/20 text-dseza-light-secondary-accent border-dseza-light-secondary-accent/30'
                      }`}
                    >
                      {(() => {
                        return documents.filter(doc => {
                          const termData = doc.relationships?.field_loai_van_ban?.data;
                          if (!termData || !data?.included) return false;
                          
                          const termRef = Array.isArray(termData) ? termData[0] : termData;
                          if (!termRef) return false;
                          
                          const term = data.included.find((item: any) => 
                            item.type === termRef.type && item.id === termRef.id
                          );
                          
                          return term?.attributes?.name === 'Thông tư';
                        }).length;
                      })()} Thông tư
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        theme === 'dark' 
                          ? 'bg-dseza-dark-accent/20 text-dseza-dark-accent border-dseza-dark-accent/30' 
                          : 'bg-dseza-light-accent/20 text-dseza-light-accent border-dseza-light-accent/30'
                      }`}
                    >
                      {documents.filter(doc => getDocumentFileUrl(doc, data?.included)).length} Có file đính kèm
                    </Badge>
                  </div>
                  
                  {/* Bulk Actions */}
                  <div className="flex gap-2 items-center">
                    {selectedDocuments.size > 0 && (
                      <>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            theme === 'dark' 
                              ? 'border-dseza-dark-border text-dseza-dark-main-text' 
                              : 'border-dseza-light-border text-dseza-light-main-text'
                          }`}
                        >
                          {selectedDocuments.size} đã chọn
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={handleBulkDownload}
                          disabled={downloadingIds.size > 0}
                          className={`text-xs ${
                            theme === 'dark' 
                              ? 'bg-dseza-dark-secondary text-dseza-dark-main-text border-dseza-dark-border hover:bg-dseza-dark-hover' 
                              : 'bg-dseza-light-secondary text-dseza-light-main-text border-dseza-light-border hover:bg-dseza-light-hover'
                          }`}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Tải xuống đã chọn
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Error State */}
            {isError && (
              <div className="text-center py-8">
                <div className={`mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                  <p className="text-lg font-semibold">Có lỗi xảy ra khi tìm kiếm</p>
                  <p className="text-sm">{error?.message || "Vui lòng thử lại sau"}</p>
                </div>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline"
                  className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-secondary text-dseza-dark-main-text border-dseza-dark-border hover:bg-dseza-dark-hover' 
                      : 'bg-dseza-light-secondary text-dseza-light-main-text border-dseza-light-border hover:bg-dseza-light-hover'
                  }`}
                >
                  Tải lại trang
                </Button>
              </div>
            )}

            {/* Results Table */}
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <div className={`rounded-md border ${
                theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'
              }`}>
                <Table>
                  <TableHeader className={`${
                    theme === 'dark' 
                      ? 'bg-dseza-dark-secondary border-dseza-dark-border' 
                      : 'bg-dseza-light-secondary border-dseza-light-border'
                  }`}>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox 
                          checked={selectedDocuments.size > 0 && selectedDocuments.size === documents.filter(doc => getDocumentFileUrl(doc, data?.included)).length}
                          onCheckedChange={handleSelectAll}
                          aria-label="Chọn tất cả"
                          className={`${
                            theme === 'dark' 
                              ? 'border-dseza-dark-border data-[state=checked]:bg-dseza-dark-primary data-[state=checked]:border-dseza-dark-primary' 
                              : 'border-dseza-light-border data-[state=checked]:bg-dseza-light-primary data-[state=checked]:border-dseza-light-primary'
                          }`}
                        />
                      </TableHead>
                      <TableHead className={`w-[200px] ${
                        theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                      }`}>Số/Ký hiệu</TableHead>
                      <TableHead className={`${
                        theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                      }`}>Trích yếu</TableHead>
                      <TableHead className={`w-[150px] ${
                        theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                      }`}>Ngày ban hành</TableHead>
                      <TableHead className={`w-[100px] text-center ${
                        theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                      }`}>Tải về</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.length > 0 ? (
                      documents.map((doc: any) => (
                        <TableRow key={doc.id} className={`${
                          theme === 'dark' 
                            ? 'border-dseza-dark-border hover:bg-dseza-dark-hover/50' 
                            : 'border-dseza-light-border hover:bg-dseza-light-hover/50'
                        }`}>
                          <TableCell>
                            <Checkbox 
                              checked={selectedDocuments.has(doc.id)}
                              onCheckedChange={(checked) => handleSelectDocument(doc.id, !!checked)}
                              disabled={!getDocumentFileUrl(doc, data?.included)}
                              aria-label={`Chọn văn bản ${doc.attributes?.field_so_ky_hieu || doc.attributes?.field_document_number || doc.id}`}
                              className={`${
                                theme === 'dark' 
                                  ? 'border-dseza-dark-border data-[state=checked]:bg-dseza-dark-primary data-[state=checked]:border-dseza-dark-primary' 
                                  : 'border-dseza-light-border data-[state=checked]:bg-dseza-light-primary data-[state=checked]:border-dseza-light-primary'
                              }`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            <button
                              onClick={() => handleDocumentClick(doc)}
                              className={`font-medium transition-colors cursor-pointer text-left ${
                                theme === 'dark' 
                                  ? 'text-dseza-dark-primary hover:text-dseza-dark-primary-hover hover:underline' 
                                  : 'text-dseza-light-primary hover:text-dseza-light-primary-hover hover:underline'
                              }`}
                              title="Xem chi tiết văn bản"
                            >
                              {doc.attributes?.field_so_ky_hieu || "N/A"}
                            </button>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-md">
                              <p className={`truncate ${
                                theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                              }`} title={getTextContent(doc.attributes?.field_trich_yeu) || getTextContent(doc.attributes?.title) || "N/A"}>
                                {getTextContent(doc.attributes?.field_trich_yeu) || getTextContent(doc.attributes?.title) || "N/A"}
                              </p>
                              <span className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                                theme === 'dark' 
                                  ? 'bg-dseza-dark-secondary text-dseza-dark-secondary-text' 
                                  : 'bg-dseza-light-secondary text-dseza-light-secondary-text'
                              }`}>
                                {/* Get taxonomy term name from relationships */}
                                {(() => {
                                  const termData = doc.relationships?.field_loai_van_ban?.data;
                                  if (!termData || !data?.included) return "Văn bản";
                                  
                                  const termRef = Array.isArray(termData) ? termData[0] : termData;
                                  if (!termRef) return "Văn bản";
                                  
                                  const term = data.included.find((item: any) => 
                                    item.type === termRef.type && item.id === termRef.id
                                  );
                                  
                                  return term?.attributes?.name || "Văn bản";
                                })()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className={`${
                            theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                          }`}>
                            {formatDate(doc.attributes?.field_ngay_ban_hanh || doc.attributes?.created)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(doc.id)}
                              disabled={downloadingIds.has(doc.id)}
                              className={`${
                                theme === 'dark' 
                                  ? 'bg-dseza-dark-secondary text-dseza-dark-main-text border-dseza-dark-border hover:bg-dseza-dark-primary hover:text-dseza-dark-main-text hover:border-dseza-dark-primary' 
                                  : 'bg-dseza-light-secondary text-dseza-light-main-text border-dseza-light-border hover:bg-dseza-light-primary hover:text-dseza-light-main-bg hover:border-dseza-light-primary'
                              }`}
                            >
                              {downloadingIds.has(doc.id) ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Download className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className={`${
                            theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                          }`}>
                            <p className="text-lg font-semibold mb-2">Không tìm thấy kết quả</p>
                            <p className="text-sm">Vui lòng thử lại với từ khóa khác</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && documents.length > 0 && totalPages > 1 && (
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
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Document Detail Dialog */}
      <Dialog 
        open={isDetailDialogOpen} 
        onOpenChange={(open) => {
          setIsDetailDialogOpen(open);
          if (!open) {
            setSelectedDocument(null);
          }
        }}
      >
        <DocumentDetailModal document={selectedDocument} />
      </Dialog>
    </div>
  );
};

export default DocumentSearchPage; 