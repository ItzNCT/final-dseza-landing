import React, { useState } from "react";
import { Search } from "lucide-react";
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

/**
 * EnterpriseListPage component for displaying and filtering enterprises
 */
const EnterpriseListPage: React.FC = () => {
  const [filters, setFilters] = useState({
    zone: "",
    enterpriseName: "",
    country: "",
    industry: "",
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
    // Implement search logic here
  };

  // Sample enterprise data
  const enterprises = [
    {
      id: 1,
      name: "Samsung Electronics Vietnam",
      zone: "Khu Công nghệ cao",
      industry: "Điện tử viễn thông",
      country: "Hàn Quốc",
    },
    {
      id: 2,
      name: "Intel Products Vietnam",
      zone: "Khu Công nghệ cao", 
      industry: "Công nghệ thông tin",
      country: "Hoa Kỳ",
    },
    {
      id: 3,
      name: "Formosa Plastics Corporation",
      zone: "KCN Hòa Khánh",
      industry: "Hóa chất - Nhựa",
      country: "Đài Loan",
    },
    {
      id: 4,
      name: "Canon Vietnam Co., Ltd",
      zone: "Khu Công nghệ cao",
      industry: "Thiết bị quang học",
      country: "Nhật Bản",
    },
    {
      id: 5,
      name: "Bosch Vietnam",
      zone: "KCN Hòa Khánh",
      industry: "Ô tô - Cơ khí",
      country: "Đức",
    },
    {
      id: 6,
      name: "LG Display Vietnam",
      zone: "Khu Công nghệ cao",
      industry: "Điện tử viễn thông", 
      country: "Hàn Quốc",
    },
    {
      id: 7,
      name: "Nidec Vietnam Corporation",
      zone: "KCN Liên Chiểu",
      industry: "Động cơ điện",
      country: "Nhật Bản",
    },
    {
      id: 8,
      name: "Daikin Air Conditioning Vietnam",
      zone: "KCN Hòa Khánh",
      industry: "Điều hòa không khí",
      country: "Nhật Bản",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Danh sách Doanh nghiệp
        </h1>

        {/* Filter Section */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Administrative Zone Filter */}
            <div className="space-y-2">
              <Label htmlFor="zone">Khu hành chính</Label>
              <Select onValueChange={(value) => handleFilterChange("zone", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khu hành chính" />
                </SelectTrigger>
                <SelectContent>
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
              <Label htmlFor="enterpriseName">Tên doanh nghiệp</Label>
              <Input
                id="enterpriseName"
                placeholder="Nhập tên doanh nghiệp"
                value={filters.enterpriseName}
                onChange={(e) => handleFilterChange("enterpriseName", e.target.value)}
              />
            </div>

            {/* Country Filter */}
            <div className="space-y-2">
              <Label htmlFor="country">Quốc gia</Label>
              <Select onValueChange={(value) => handleFilterChange("country", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn quốc gia" />
                </SelectTrigger>
                <SelectContent>
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
              <Label htmlFor="industry">Lĩnh vực hoạt động</Label>
              <Select onValueChange={(value) => handleFilterChange("industry", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn lĩnh vực" />
                </SelectTrigger>
                <SelectContent>
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
              className="px-8"
              size="default"
            >
              <Search className="h-4 w-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          
          {/* Results Title */}
          <h2 className="text-2xl font-semibold mb-4">
            KẾT QUẢ THỐNG KÊ DOANH NGHIỆP
          </h2>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground mb-4">
            Tìm thấy {enterprises.length} doanh nghiệp
          </div>

          {/* Results Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[80px] text-center font-semibold">#</TableHead>
                  <TableHead className="font-semibold">Doanh nghiệp</TableHead>
                  <TableHead className="font-semibold">Khu hành chính</TableHead>
                  <TableHead className="font-semibold">Lĩnh vực hoạt động</TableHead>
                  <TableHead className="font-semibold">Quốc gia</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enterprises.map((enterprise, index) => (
                  <TableRow key={enterprise.id} className="hover:bg-muted/30">
                    <TableCell className="text-center font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <a 
                        href={`/enterprise/${enterprise.id}`}
                        className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
                      >
                        {enterprise.name}
                      </a>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {enterprise.zone}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {enterprise.industry}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        {enterprise.country}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Statistics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Tổng số doanh nghiệp
              </h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {enterprises.length}
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Doanh nghiệp FDI
              </h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {enterprises.filter(e => e.country !== "Việt Nam").length}
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                Khu Công nghệ cao
              </h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {enterprises.filter(e => e.zone === "Khu Công nghệ cao").length}
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default EnterpriseListPage; 