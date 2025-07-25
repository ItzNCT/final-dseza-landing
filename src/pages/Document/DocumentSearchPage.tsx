import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Download, Search, Loader2 } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useDocuments, DocumentFilters } from "@/api/hooks";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";

/**
 * DocumentSearchPage component for searching legal documents
 */
const DocumentSearchPage: React.FC = () => {
  // Get category from URL params
  const { category, subcategory } = useParams<{ category: string; subcategory: string }>();
  
  // DEBUG: Log URL params
  console.log('🔍 URL Params - category:', category, 'subcategory:', subcategory);
  
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
    category: subcategory || "", // Use subcategory as the filter category
    page: 1,
    pageSize: 5, // Maximum 5 results per page
  });
  
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set());
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(new Set());

  const { data, isLoading, isError, error, documents, totalResults } = useDocuments(filters);
  
  // DEBUG: Log filters being passed to useDocuments  
  console.log('🎯 Filters passed to useDocuments:', filters);

  // Update filters when category changes from URL
  React.useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: subcategory || "",
      page: 1 // Reset to first page when category changes
    }));
  }, [subcategory]);

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
            {document.attributes?.field_so_ky_hieu || document.attributes?.title || "N/A"}
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
                  }`}>Các loại văn bản:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{getTaxonomyTermName(document.relationships?.field_cac_loai_van_ban?.data, data?.included)}</span>
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
                  }`}>Cấp ban hành:</span>
                  <span className={`sm:text-right ${
                    theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                  }`}>{getTaxonomyTermName(document.relationships?.field_cap_ban_hanh?.data, data?.included)}</span>
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

  // Get category display name
  const getCategoryDisplayName = () => {
    switch (subcategory) {
      case 'phap-quy-trung-uong':
        return 'Văn bản pháp quy trung ương';
      case 'phap-quy-dia-phuong':
        return 'Văn bản pháp quy địa phương';
      case 'chi-dao-dieu-hanh':
        return 'Văn bản chỉ đạo điều hành';
      case 'cchc':
        return 'Văn bản CCHC';
      default:
        return 'Tra cứu văn bản';
    }
  };

  return (
    <div className="p-6">
        {/* Category Header */}
        <div className="mb-6">
          <h2 className={`text-xl font-semibold ${
            theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
          }`}>
            {getCategoryDisplayName()}
          </h2>
        </div>

        {/* Search Filters Section */}
        <div className={`p-6 rounded-lg mb-8 ${
          theme === 'dark' 
            ? 'bg-dseza-dark-hover border border-dseza-dark-border' 
            : 'bg-dseza-light-hover border border-dseza-light-border'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                placeholder="Nhập số/ký hiệu văn bản"
                value={filters.documentNumber || ""}
                onChange={(e) => handleInputChange("documentNumber", e.target.value)}
                className={`${
                  theme === 'dark' 
                    ? 'bg-dseza-dark-secondary border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' 
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
                placeholder="Nhập từ khóa trích yếu"
                value={filters.summary || ""}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                className={`${
                  theme === 'dark' 
                    ? 'bg-dseza-dark-secondary border-dseza-dark-border text-dseza-dark-main-text placeholder:text-dseza-dark-secondary-text' 
                    : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text placeholder:text-dseza-light-secondary-text'
                }`}
              />
            </div>

            {/* Search Button */}
            <div className="space-y-2 flex items-end">
              <Button 
                onClick={handleSearch}
                className={`w-full ${
                  theme === 'dark' 
                    ? 'bg-dseza-dark-primary text-dseza-dark-main-text hover:bg-dseza-dark-primary-hover' 
                    : 'bg-dseza-light-primary text-dseza-light-main-bg hover:bg-dseza-light-primary-hover'
                }`}
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
          {/* Results Count */}
          <div className="flex justify-between items-center">
            <div className={`text-sm ${
              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
            }`}>
              {isLoading ? (
                <Skeleton className="h-4 w-48" />
              ) : (
                `Hiển thị ${startResult}-${endResult} của ${totalResults} kết quả`
              )}
            </div>
          </div>

          {/* Error State */}
          {isError && (
            <div className="text-center py-8">
              <div className={`mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                <p className="text-lg font-semibold">Có lỗi xảy ra khi tìm kiếm</p>
                <p className="text-sm">{error?.message || "Vui lòng thử lại sau"}</p>
              </div>
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
                          >
                            {doc.attributes?.field_so_ky_hieu || "N/A"}
                          </button>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-md">
                            <p className={`truncate ${
                              theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
                            }`}>
                              {getTextContent(doc.attributes?.field_trich_yeu) || getTextContent(doc.attributes?.title) || "N/A"}
                            </p>
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
                  
                  {/* Show page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNum);
                          }}
                          isActive={currentPage === pageNum}
                          className={`${
                            theme === 'dark' 
                              ? 'text-dseza-dark-main-text hover:bg-dseza-dark-hover' 
                              : 'text-dseza-light-main-text hover:bg-dseza-light-hover'
                          } ${currentPage === pageNum ? (theme === 'dark' ? 'bg-dseza-dark-primary text-dseza-dark-main-text' : 'bg-dseza-light-primary text-dseza-light-main-bg') : ''}`}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
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