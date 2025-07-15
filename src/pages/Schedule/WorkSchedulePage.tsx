import React, { useState } from "react";
import { Search, Calendar, Clock, MapPin, Users, ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
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

// Define types for schedule data
interface ScheduleItem {
  session: string;
  time: string;
  content: string;
  host: string;
  participants: string;
  location: string;
  preparation: string;
}

interface DaySchedule {
  day: string;
  date: string;
  items: ScheduleItem[];
}

/**
 * WorkSchedulePage component for displaying weekly work schedule
 */
const WorkSchedulePage: React.FC = () => {
  const { theme } = useTheme();
  const [selectedWeek, setSelectedWeek] = useState("week28");

  const weekOptions = [
    { value: "week27", label: "Tuần 27 (30/06/2025 - 06/07/2025)" },
    { value: "week28", label: "Tuần 28 (07/07/2025 - 13/07/2025)" },
    { value: "week29", label: "Tuần 29 (14/07/2025 - 20/07/2025)" },
    { value: "week30", label: "Tuần 30 (21/07/2025 - 27/07/2025)" },
  ];

  const handleSearch = () => {
    console.log("Searching for week:", selectedWeek);
    // Implement search logic here
  };

  // Sample schedule data with multiple items per day
  const scheduleData: DaySchedule[] = [
    {
      day: "Thứ Hai",
      date: "07/07/2025",
      items: [
        {
          session: "Sáng",
          time: "8:00 - 11:30",
          content: "Họp Ban Chỉ đạo phát triển Khu Kinh tế Đà Nẵng",
          host: "Ông Lê Trung Chinh",
          participants: "Các thành viên Ban Chỉ đạo, Trưởng các phòng ban",
          location: "Phòng họp A - Tầng 3",
          preparation: "Phòng Hành chính - Tổng hợp",
        },
        {
          session: "Chiều",
          time: "14:00 - 17:00",
          content: "Tiếp đoàn đầu tư Samsung Electronics về dự án mở rộng nhà máy",
          host: "Ban lãnh đạo DSEZA",
          participants: "Đại diện Samsung Electronics, Phòng Xúc tiến Đầu tư",
          location: "Phòng tiếp khách VIP",
          preparation: "Phòng Xúc tiến Đầu tư",
        },
        {
          session: "Tối",
          time: "19:00 - 21:00",
          content: "Tiệc chiêu đãi đoàn đầu tư Samsung Electronics",
          host: "Ông Nguyễn Văn A",
          participants: "Đoàn Samsung Electronics, Ban lãnh đạo DSEZA",
          location: "Nhà hàng Millennium",
          preparation: "Phòng Hành chính - Tổng hợp",
        },
      ],
    },
    {
      day: "Thứ Ba",
      date: "08/07/2025",
      items: [
        {
          session: "Sáng",
          time: "8:30 - 11:00",
          content: "Khảo sát thực địa khu vực quy hoạch mở rộng Khu Công nghệ cao",
          host: "Ông Hoàng Văn F",
          participants: "Phòng Quy hoạch - Kiến trúc, Đại diện Samsung",
          location: "Khu vực quy hoạch Block C",
          preparation: "Phòng Quy hoạch - Kiến trúc",
        },
        {
          session: "Chiều",
          time: "13:30 - 16:30",
          content: "Họp triển khai kế hoạch hạ tầng kỹ thuật Q3/2025",
          host: "Ông Vũ Văn G",
          participants: "Phòng Hạ tầng Kỹ thuật, Các nhà thầu chính",
          location: "Phòng họp B - Tầng 2",
          preparation: "Phòng Hạ tầng Kỹ thuật",
        },
      ],
    },
    {
      day: "Thứ Tư",
      date: "09/07/2025",
      items: [
        {
          session: "Sáng",
          time: "9:00 - 11:30",
          content: "Họp giao ban tuần với các phòng ban",
          host: "Ban lãnh đạo",
          participants: "Trưởng các phòng ban, Phó trưởng phòng",
          location: "Phòng họp chính - Tầng 4",
          preparation: "Phòng Hành chính - Tổng hợp",
        },
      ],
    },
    {
      day: "Thứ Năm", 
      date: "10/07/2025",
      items: [
        {
          session: "Sáng",
          time: "8:00 - 12:00",
          content: "Hội thảo 'Chuyển đổi số trong quản lý Khu Kinh tế'",
          host: "Bà Nguyễn Thị E",
          participants: "Các doanh nghiệp trong khu, Chuyên gia CNTT",
          location: "Trung tâm Hội nghị DSEZA",
          preparation: "Phòng Xúc tiến Đầu tư",
        },
        {
          session: "Chiều",
          time: "14:30 - 17:00",
          content: "Làm việc với Sở Kế hoạch & Đầu tư về chính sách ưu đãi mới",
          host: "Ông Lê Trung Chinh",
          participants: "Đại diện Sở KH&ĐT, Phòng Xúc tiến Đầu tư",
          location: "Phòng làm việc Giám đốc",
          preparation: "Phòng Xúc tiến Đầu tư",
        },
      ],
    },
  ];

  // Helper function to get current week display text
  const getCurrentWeekText = () => {
    const selected = weekOptions.find(w => w.value === selectedWeek);
    return selected ? selected.label.replace("Tuần ", "") : "28 (07/07/2025 - 13/07/2025)";
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Header - Complete header structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="flex-1 pt-52">
        {/* Breadcrumb */}
        <div className={`py-2 ${theme === 'dark' ? 'bg-dseza-dark-secondary/50' : 'bg-dseza-light-secondary/50'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <a 
                href="/" 
                className={`transition-colors ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Trang chủ
              </a>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Lịch công tác
              </span>
            </nav>
          </div>
        </div>

        {/* Schedule Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          
          {/* Page Title */}
          <h1 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
            Lịch Công tác Tuần
          </h1>

          {/* Week Filter */}
          <div className="flex items-center gap-4 mb-8 justify-center">
            <Label htmlFor="weekSelect" className={`text-lg font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              Chọn tuần:
            </Label>
            <Select 
              value={selectedWeek} 
              onValueChange={setSelectedWeek}
            >
              <SelectTrigger className={`w-80 ${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-secondary-bg border-dseza-light-border text-dseza-light-main-text'}`}>
                <SelectValue placeholder="Chọn tuần" />
              </SelectTrigger>
              <SelectContent className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-secondary-bg border-dseza-light-border text-dseza-light-main-text'}`}>
                {weekOptions.map((week) => (
                  <SelectItem key={week.value} value={week.value}>
                    {week.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={handleSearch} 
              className={`px-6 ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 text-white'}`}
            >
              <Search className="h-4 w-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>

          {/* Schedule Title */}
          <h2 className={`text-2xl font-semibold text-center mb-6 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
            LỊCH CƠ QUAN TUẦN {getCurrentWeekText()}
          </h2>

          {/* Schedule Table */}
          <div className={`rounded-md border overflow-hidden ${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
            <Table>
              <TableHeader>
                <TableRow className={`${theme === 'dark' ? 'bg-dseza-dark-secondary-bg/50' : 'bg-dseza-light-secondary-bg/50'}`}>
                  <TableHead className={`font-semibold text-center w-24 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Ngày</TableHead>
                  <TableHead className={`font-semibold text-center w-20 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Buổi</TableHead>
                  <TableHead className={`font-semibold text-center w-32 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Thời gian</TableHead>
                  <TableHead className={`font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Nội dung</TableHead>
                  <TableHead className={`font-semibold w-40 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Chủ trì</TableHead>
                  <TableHead className={`font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Thành phần</TableHead>
                  <TableHead className={`font-semibold w-40 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Địa điểm</TableHead>
                  <TableHead className={`font-semibold w-40 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Đơn vị chuẩn bị</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduleData.map((dayData, dayIndex) => (
                  dayData.items.map((item, itemIndex) => (
                    <TableRow key={`${dayIndex}-${itemIndex}`} className={`${theme === 'dark' ? 'hover:bg-dseza-dark-secondary-bg/30' : 'hover:bg-dseza-light-secondary-bg/30'}`}>
                      {/* Day cell with rowspan */}
                      {itemIndex === 0 && (
                        <TableCell 
                          rowSpan={dayData.items.length}
                          className={`text-center font-semibold border-r-2 ${theme === 'dark' ? 'bg-blue-900/20 border-blue-800 text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-800'}`}
                        >
                          <div className="flex flex-col items-center">
                            <Calendar className={`h-4 w-4 mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                            <span className={`font-bold ${theme === 'dark' ? 'text-blue-200' : 'text-blue-800'}`}>
                              {dayData.day}
                            </span>
                            <span className={`text-xs ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                              {dayData.date}
                            </span>
                          </div>
                        </TableCell>
                      )}
                      
                      {/* Session */}
                      <TableCell className="text-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'}`}>
                          {item.session}
                        </span>
                      </TableCell>
                      
                      {/* Time */}
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Clock className={`h-3 w-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} />
                          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{item.time}</span>
                        </div>
                      </TableCell>
                      
                      {/* Content */}
                      <TableCell className="max-w-sm">
                        <p className={`font-medium leading-tight ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                          {item.content}
                        </p>
                      </TableCell>
                      
                      {/* Host */}
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className={`h-3 w-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} />
                          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{item.host}</span>
                        </div>
                      </TableCell>
                      
                      {/* Participants */}
                      <TableCell>
                        <p className={`text-sm leading-tight ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                          {item.participants}
                        </p>
                      </TableCell>
                      
                      {/* Location */}
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className={`h-3 w-3 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} />
                          <span className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{item.location}</span>
                        </div>
                      </TableCell>
                      
                      {/* Preparation Unit */}
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
                          {item.preparation}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
                Tổng số ngày
              </h3>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                {scheduleData.length}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-green-300' : 'text-green-800'}`}>
                Tổng hoạt động
              </h3>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                {scheduleData.reduce((total, day) => total + day.items.length, 0)}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-800'}`}>
                Cuộc họp
              </h3>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                {scheduleData.reduce((total, day) => 
                  total + day.items.filter(item => item.content.toLowerCase().includes('họp')).length, 0
                )}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-800'}`}>
                Sự kiện đặc biệt
              </h3>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                {scheduleData.reduce((total, day) => 
                  total + day.items.filter(item => 
                    item.content.toLowerCase().includes('tiếp') || 
                    item.content.toLowerCase().includes('hội thảo')
                  ).length, 0
                )}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WorkSchedulePage; 