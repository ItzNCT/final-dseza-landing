import React, { useState } from "react";
import { Download, Search } from "lucide-react";
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

/**
 * DocumentSearchPage component for searching legal documents
 */
const DocumentSearchPage: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState({
    documentNumber: "",
    summary: "",
    dateFrom: "",
    dateTo: "",
    documentType: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalResults = 123;
  const resultsPerPage = 10;
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  const handleInputChange = (field: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    console.log("Searching with filters:", searchFilters);
    // Implement search logic here
  };

  const handleDownload = (documentId: string) => {
    console.log("Downloading document:", documentId);
    // Implement download logic here
  };

  // Sample data for demonstration
  const sampleDocuments = [
    {
      id: "1",
      number: "123/2024/QĐ-UBND",
      summary: "Quyết định về việc phê duyệt quy hoạch chi tiết Khu công nghệ cao Đà Nẵng",
      issueDate: "15/03/2024",
      type: "Quyết định"
    },
    {
      id: "2", 
      number: "456/2024/NĐ-CP",
      summary: "Nghị định về chính sách ưu đãi đầu tư tại các khu kinh tế",
      issueDate: "22/02/2024",
      type: "Nghị định"
    },
    {
      id: "3",
      number: "789/2024/TT-BTC",
      summary: "Thông tư hướng dẫn thực hiện chế độ báo cáo tài chính",
      issueDate: "10/01/2024",
      type: "Thông tư"
    },
    {
      id: "4",
      number: "321/2023/QĐ-TTg",
      summary: "Quyết định phê duyệt Chiến lược phát triển kinh tế số đến năm 2030",
      issueDate: "28/12/2023",
      type: "Quyết định"
    },
    {
      id: "5",
      number: "654/2023/CV-UBND",
      summary: "Công văn về việc triển khai thực hiện cải cách thủ tục hành chính",
      issueDate: "15/11/2023",
      type: "Công văn"
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Tra cứu Văn bản Pháp quy
        </h1>

        {/* Search Filters Section */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Document Number/Symbol */}
            <div className="space-y-2">
              <Label htmlFor="documentNumber">Số/Ký hiệu</Label>
              <Input
                id="documentNumber"
                placeholder="Nhập số/ký hiệu văn bản"
                value={searchFilters.documentNumber}
                onChange={(e) => handleInputChange("documentNumber", e.target.value)}
              />
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <Label htmlFor="summary">Trích yếu</Label>
              <Input
                id="summary"
                placeholder="Nhập từ khóa trích yếu"
                value={searchFilters.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
              />
            </div>

            {/* Date From */}
            <div className="space-y-2">
              <Label htmlFor="dateFrom">Ngày ban hành từ</Label>
              <Input
                id="dateFrom"
                type="date"
                value={searchFilters.dateFrom}
                onChange={(e) => handleInputChange("dateFrom", e.target.value)}
              />
            </div>

            {/* Date To */}
            <div className="space-y-2">
              <Label htmlFor="dateTo">Ngày ban hành đến</Label>
              <Input
                id="dateTo"
                type="date"
                value={searchFilters.dateTo}
                onChange={(e) => handleInputChange("dateTo", e.target.value)}
              />
            </div>

            {/* Document Type */}
            <div className="space-y-2">
              <Label htmlFor="documentType">Loại văn bản</Label>
              <Select onValueChange={(value) => handleInputChange("documentType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại văn bản" />
                </SelectTrigger>
                <SelectContent>
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
                className="w-full md:w-auto px-8"
                size="default"
              >
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm
              </Button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Hiển thị {startResult}-{endResult} của {totalResults} kết quả
          </div>

          {/* Results Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Số/Ký hiệu</TableHead>
                  <TableHead>Trích yếu</TableHead>
                  <TableHead className="w-[150px]">Ngày ban hành</TableHead>
                  <TableHead className="w-[100px] text-center">Tải về</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.number}</TableCell>
                    <TableCell>
                      <div className="max-w-md">
                        <p className="truncate">{doc.summary}</p>
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded mt-1 inline-block">
                          {doc.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{doc.issueDate}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(doc.id)}
                        className="hover:bg-primary hover:text-primary-foreground"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(1);
                    }}
                    isActive={currentPage === 1}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(2);
                    }}
                    isActive={currentPage === 2}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(3);
                    }}
                    isActive={currentPage === 3}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(13);
                    }}
                    isActive={currentPage === 13}
                  >
                    13
                  </PaginationLink>
                </PaginationItem>
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < 13) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === 13 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DocumentSearchPage; 