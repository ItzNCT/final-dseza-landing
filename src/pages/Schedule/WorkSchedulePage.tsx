import React, { useState, useMemo } from "react";
import { Search, Calendar, Clock, MapPin, Users, ChevronRight, FileText } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useWorkSchedule } from "@/api/hooks";
import TopBar from "@/components/hero/TopBar";
import LogoSearchBar from "@/components/hero/LogoSearchBar";
import NavigationBar from "@/components/hero/NavigationBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
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

// Define types for schedule data from API
interface ApiScheduleItem {
  type: string;
  id: string;
  attributes: {
    field_ngay: string;
    field_buoi: string;
    field_thoi_gian: string;
    field_noi_dung: {
      value: string;
      format: string;
      processed: string;
    } | null;
    field_chu_tri: string | null;
    field_thanh_phan: string | null;
    field_dia_diem: string | null;
    field_don_vi_chuan_bi: string | null;
  };
}

interface GroupedScheduleItem {
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
  items: GroupedScheduleItem[];
}

/**
 * Get the week number of a given date (ISO 8601 week numbering)
 */
const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

/**
 * Get the Monday of a given week number and year
 */
const getDateOfWeek = (weekNum: number, year: number): Date => {
  const jan4 = new Date(year, 0, 4);
  const jan4WeekDay = jan4.getDay() || 7;
  const firstMonday = new Date(jan4);
  firstMonday.setDate(jan4.getDate() - jan4WeekDay + 1);
  
  const targetDate = new Date(firstMonday);
  targetDate.setDate(firstMonday.getDate() + (weekNum - 1) * 7);
  return targetDate;
};

/**
 * Generate week options from week 1 to current week
 */
const generateWeekOptions = () => {
  const currentDate = new Date();
  const currentWeek = getWeekNumber(currentDate);
  const currentYear = currentDate.getFullYear();
  const options = [];

  for (let week = 1; week <= currentWeek; week++) {
    const mondayDate = getDateOfWeek(week, currentYear);
    const sundayDate = new Date(mondayDate);
    sundayDate.setDate(mondayDate.getDate() + 6);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };

    const mondayStr = mondayDate.toISOString().split('T')[0];
    const sundayStr = sundayDate.toISOString().split('T')[0];

    options.push({
      value: `${mondayStr}_${sundayStr}`,
      label: `Tuần ${week} (${formatDate(mondayDate)} - ${formatDate(sundayDate)})`
    });
  }

  return options.reverse(); // Show newest weeks first
};

/**
 * WorkSchedulePage component for displaying weekly work schedule from API
 */
const WorkSchedulePage: React.FC = () => {
  const { theme } = useTheme();
  
  // Generate week options dynamically
  const weekOptions = generateWeekOptions();
  
  // Set default to current week
  const getCurrentWeekValue = () => {
    const currentDate = new Date();
    const currentWeek = getWeekNumber(currentDate);
    const mondayDate = getDateOfWeek(currentWeek, currentDate.getFullYear());
    const sundayDate = new Date(mondayDate);
    sundayDate.setDate(mondayDate.getDate() + 6);
    
    const mondayStr = mondayDate.toISOString().split('T')[0];
    const sundayStr = sundayDate.toISOString().split('T')[0];
    
    return `${mondayStr}_${sundayStr}`;
  };

  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeekValue());

  // Fetch schedule data using the new hook
  const { data, isLoading, isError, error, refetch } = useWorkSchedule(selectedWeek);

  // Process and group schedule data by date
  const groupedScheduleData: DaySchedule[] = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) {
      return [];
    }

    // Group items by date
    const groupedByDate: { [date: string]: GroupedScheduleItem[] } = {};
    
    data.data.forEach((item: ApiScheduleItem) => {
      const date = item.attributes.field_ngay;
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      
      // Map session values from Vietnamese to proper display format
      const sessionMap: { [key: string]: string } = {
        'sang': 'Sáng',
        'chieu': 'Chiều', 
        'toi': 'Tối'
      };
      
      // Extract time from datetime string (format: "2025-07-14T14:00:00+07:00")
      const formatTime = (datetimeStr: string) => {
        try {
          const date = new Date(datetimeStr);
          return date.toLocaleTimeString('vi-VN', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
          });
        } catch {
          return "";
        }
      };
      
      groupedByDate[date].push({
        session: sessionMap[item.attributes.field_buoi] || item.attributes.field_buoi || "",
        time: item.attributes.field_thoi_gian ? formatTime(item.attributes.field_thoi_gian) : "",
        content: item.attributes.field_noi_dung?.processed || item.attributes.field_noi_dung?.value || "",
        host: item.attributes.field_chu_tri || "",
        participants: item.attributes.field_thanh_phan || "",
        location: item.attributes.field_dia_diem || "",
        preparation: item.attributes.field_don_vi_chuan_bi || "",
      });
    });

    // Convert to array and format
    return Object.entries(groupedByDate)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, items]) => {
        // Format date to Vietnamese day name
        const dateObj = new Date(date);
        const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const dayName = dayNames[dateObj.getDay()];
        
        // Format date to DD/MM/YYYY
        const formattedDate = dateObj.toLocaleDateString('vi-VN');

        return {
          day: dayName,
          date: formattedDate,
          items: items.sort((a, b) => {
            // Sort by session order: Sáng, Chiều, Tối
            const sessionOrder = { 'Sáng': 1, 'Chiều': 2, 'Tối': 3 };
            return (sessionOrder[a.session as keyof typeof sessionOrder] || 999) - 
                   (sessionOrder[b.session as keyof typeof sessionOrder] || 999);
          }),
        };
      });
  }, [data]);

  const handleSearch = () => {
    console.log("Searching for week:", selectedWeek);
    refetch();
  };

  // Helper function to get current week display text
  const getCurrentWeekText = () => {
    const selected = weekOptions.find(w => w.value === selectedWeek);
    if (selected) {
      return selected.label.replace("Tuần ", "");
    }
    
    // Fallback: parse from selectedWeek value format "YYYY-MM-DD_YYYY-MM-DD"
    const [startDateStr, endDateStr] = selectedWeek.split('_');
    if (startDateStr && endDateStr) {
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);
      const weekNum = getWeekNumber(startDate);
      
      const formatDate = (date: Date) => {
        return date.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      };
      
      return `${weekNum} (${formatDate(startDate)} - ${formatDate(endDate)})`;
    }
    
    return "Không xác định";
  };

  // Get session badge color
  const getSessionBadgeColor = (session: string) => {
    if (!session) return '';
    
    switch (session) {
      case 'Sáng':
        return theme === 'dark' 
          ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border border-dseza-dark-primary/30' 
          : 'bg-dseza-light-primary/10 text-dseza-light-primary border border-dseza-light-primary/20';
      case 'Chiều':
        return theme === 'dark' 
          ? 'bg-dseza-dark-accent/20 text-dseza-dark-accent border border-dseza-dark-accent/30' 
          : 'bg-dseza-light-accent/10 text-dseza-light-accent border border-dseza-light-accent/20';
      case 'Tối':
        return theme === 'dark' 
          ? 'bg-dseza-dark-secondary-accent/20 text-dseza-dark-secondary-accent border border-dseza-dark-secondary-accent/30' 
          : 'bg-dseza-light-secondary-accent/10 text-dseza-light-secondary-accent border border-dseza-light-secondary-accent/20';
      default:
        return theme === 'dark' 
          ? 'bg-dseza-dark-secondary/50 text-dseza-dark-secondary-text border border-dseza-dark-border' 
          : 'bg-dseza-light-secondary/50 text-dseza-light-secondary-text border border-dseza-light-border';
    }
  };

  // Loading skeleton component
  const TableSkeleton = () => (
    <TableBody>
      {[...Array(5)].map((_, dayIndex) => (
        [...Array(2)].map((_, itemIndex) => (
          <TableRow key={`skeleton-${dayIndex}-${itemIndex}`} className={`${theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'}`}>
            {itemIndex === 0 && (
              <TableCell rowSpan={2} className="text-center p-4">
                <Skeleton className={`h-20 w-24 mx-auto ${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`} />
              </TableCell>
            )}
            <TableCell className="text-center p-4">
              <Skeleton className={`h-6 w-16 mx-auto ${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`} />
            </TableCell>
            <TableCell className="text-center p-4">
              <Skeleton className={`h-6 w-20 mx-auto ${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`} />
            </TableCell>
            <TableCell className="p-4">
              <Skeleton className={`h-6 w-full ${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`} />
            </TableCell>
            <TableCell className="p-4">
              <Skeleton className={`h-6 w-28 ${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`} />
            </TableCell>
            <TableCell className="p-4">
              <Skeleton className={`h-6 w-full ${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`} />
            </TableCell>
            <TableCell className="p-4">
              <Skeleton className={`h-6 w-32 ${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`} />
            </TableCell>
            <TableCell className="p-4">
              <Skeleton className={`h-6 w-24 ${theme === 'dark' ? 'bg-dseza-dark-secondary' : 'bg-dseza-light-secondary'}`} />
            </TableCell>
          </TableRow>
        ))
      )).flat()}
    </TableBody>
  );

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-dseza-dark-main-bg' : 'bg-dseza-light-main-bg'}`}>
      {/* Header - Complete header structure */}
      <TopBar />
      <LogoSearchBar />
      <NavigationBar />
      
      {/* Main Content */}
      <main className="flex-1 pt-52">
        {/* Breadcrumb */}
        <div className={`py-3 border-b ${theme === 'dark' ? 'bg-dseza-dark-secondary/30 border-dseza-dark-border' : 'bg-dseza-light-secondary/30 border-dseza-light-border'}`}>
          <div className="container mx-auto px-4">
            <nav className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
              <a 
                href="/" 
                className={`transition-colors font-medium ${theme === 'dark' ? 'hover:text-dseza-dark-primary' : 'hover:text-dseza-light-primary'}`}
              >
                Trang chủ
              </a>
              <ChevronRight className="h-4 w-4" />
              <span className={`font-semibold ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`}>
                Lịch công tác
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className={`py-12 ${theme === 'dark' ? 'bg-gradient-to-r from-dseza-dark-secondary/50 to-dseza-dark-main-bg' : 'bg-gradient-to-r from-dseza-light-secondary/50 to-dseza-light-main-bg'}`}>
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <Calendar className={`h-8 w-8 mr-3 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
              <h1 className={`text-4xl md:text-5xl font-bold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                Lịch Công tác Tuần
              </h1>
            </div>
            <p className={`text-lg md:text-xl ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'} max-w-2xl mx-auto`}>
              Theo dõi và quản lý lịch công tác hàng tuần của Ban Quản lý Khu Kinh tế Đà Nẵng
            </p>
          </div>
        </div>

        {/* Controls Section */}
        <div className="container mx-auto px-4 py-8">
          <div className={`rounded-xl shadow-lg p-6 mb-8 ${theme === 'dark' ? 'bg-dseza-dark-secondary border border-dseza-dark-border' : 'bg-dseza-light-main-bg border border-dseza-light-border shadow-md'}`}>
            <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
              <div className="flex items-center gap-3">
                <Label htmlFor="weekSelect" className={`text-lg font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                  Chọn tuần:
                </Label>
                <Select 
                  value={selectedWeek} 
                  onValueChange={setSelectedWeek}
                >
                  <SelectTrigger className={`w-80 h-12 ${theme === 'dark' ? 'bg-dseza-dark-main-bg border-dseza-dark-border text-dseza-dark-main-text hover:border-dseza-dark-primary focus:border-dseza-dark-primary' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text hover:border-dseza-light-primary focus:border-dseza-light-primary'}`}>
                    <SelectValue placeholder="Chọn tuần" />
                  </SelectTrigger>
                  <SelectContent className={`${theme === 'dark' ? 'bg-dseza-dark-secondary border-dseza-dark-border text-dseza-dark-main-text' : 'bg-dseza-light-main-bg border-dseza-light-border text-dseza-light-main-text'}`}>
                    {weekOptions.map((week) => (
                      <SelectItem key={week.value} value={week.value} className={`${theme === 'dark' ? 'hover:bg-dseza-dark-hover focus:bg-dseza-dark-hover' : 'hover:bg-dseza-light-hover focus:bg-dseza-light-hover'}`}>
                        {week.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={isLoading}
                size="lg"
                className={`px-8 h-12 font-semibold shadow-md transition-all duration-200 ${theme === 'dark' ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary-hover text-dseza-dark-main-bg' : 'bg-dseza-light-primary hover:bg-dseza-light-primary-hover text-white'} ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'}`}
              >
                <Search className="h-5 w-5 mr-2" />
                {isLoading ? 'Đang tải...' : 'Tìm kiếm'}
              </Button>
            </div>
          </div>

          {/* Error State */}
          {isError && (
            <div className={`p-6 rounded-xl mb-8 border-l-4 ${theme === 'dark' ? 'bg-red-900/20 border-red-500 border border-red-800/50' : 'bg-red-50 border-red-500 border border-red-200'}`}>
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-4 ${theme === 'dark' ? 'bg-red-900/50' : 'bg-red-100'}`}>
                  <FileText className={`h-5 w-5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-red-300' : 'text-red-800'}`}>
                    Có lỗi khi tải dữ liệu
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    {error?.message || 'Lỗi không xác định'}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  onClick={() => refetch()} 
                  variant="outline"
                  className={`${theme === 'dark' ? 'border-red-600 text-red-300 hover:bg-red-900/30' : 'border-red-400 text-red-700 hover:bg-red-50'}`}
                >
                  Thử lại
                </Button>
              </div>
            </div>
          )}

          {/* Schedule Title */}
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
              LỊCH CƠ QUAN TUẦN {getCurrentWeekText()}
            </h2>
            <div className={`w-24 h-1 mx-auto rounded-full ${theme === 'dark' ? 'bg-dseza-dark-primary' : 'bg-dseza-light-primary'}`}></div>
          </div>

          {/* Schedule Table */}
          <div className={`rounded-xl overflow-hidden shadow-lg border ${theme === 'dark' ? 'border-dseza-dark-border bg-dseza-dark-secondary' : 'border-dseza-light-border bg-dseza-light-main-bg'}`}>
            <Table>
              <TableHeader>
                <TableRow className={`${theme === 'dark' ? 'bg-dseza-dark-primary/10 border-dseza-dark-border' : 'bg-dseza-light-primary/5 border-dseza-light-border'}`}>
                  <TableHead className={`font-bold text-center py-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Ngày</TableHead>
                  <TableHead className={`font-bold text-center py-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Buổi</TableHead>
                  <TableHead className={`font-bold text-center py-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Thời gian</TableHead>
                  <TableHead className={`font-bold py-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Nội dung</TableHead>
                  <TableHead className={`font-bold py-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Chủ trì</TableHead>
                  <TableHead className={`font-bold py-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Thành phần</TableHead>
                  <TableHead className={`font-bold py-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Địa điểm</TableHead>
                  <TableHead className={`font-bold py-4 ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>Đơn vị chuẩn bị</TableHead>
                </TableRow>
              </TableHeader>
              
              {/* Loading State */}
              {isLoading && <TableSkeleton />}
              
              {/* Data State */}
              {!isLoading && !isError && (
                <TableBody>
                  {groupedScheduleData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <div className="flex flex-col items-center">
                          <Calendar className={`h-16 w-16 mb-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`} />
                          <p className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                            Không có lịch công tác trong tuần này
                          </p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                            Vui lòng chọn tuần khác để xem lịch công tác
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    groupedScheduleData.map((dayData, dayIndex) => (
                      dayData.items.map((item, itemIndex) => (
                        <TableRow 
                          key={`${dayIndex}-${itemIndex}`} 
                          className={`transition-colors ${theme === 'dark' ? 'hover:bg-dseza-dark-hover/30 border-dseza-dark-border' : 'hover:bg-dseza-light-hover/30 border-dseza-light-border'}`}
                        >
                          {/* Day cell with rowspan */}
                          {itemIndex === 0 && (
                            <TableCell 
                              rowSpan={dayData.items.length}
                              className={`text-center font-bold p-4 border-r-2 ${theme === 'dark' ? 'bg-dseza-dark-primary/10 border-dseza-dark-primary/30 text-dseza-dark-primary' : 'bg-dseza-light-primary/10 border-dseza-light-primary/30 text-dseza-light-primary'}`}
                            >
                              <div className="flex flex-col items-center space-y-2">
                                <Calendar className={`h-5 w-5 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                                <div>
                                  <div className={`font-bold text-lg ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>
                                    {dayData.day}
                                  </div>
                                  <div className={`text-sm font-medium ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                    {dayData.date}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          )}
                          
                          {/* Session */}
                          <TableCell className="text-center p-4">
                            {item.session ? (
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getSessionBadgeColor(item.session)}`}>
                                {item.session}
                              </span>
                            ) : (
                              <span></span>
                            )}
                          </TableCell>
                          
                          {/* Time */}
                          <TableCell className="text-center p-4">
                            {item.time ? (
                              <div className="flex items-center justify-center gap-2">
                                <Clock className={`h-4 w-4 ${theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'}`} />
                                <span className={`font-semibold ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{item.time}</span>
                              </div>
                            ) : (
                              <span></span>
                            )}
                          </TableCell>
                          
                          {/* Content */}
                          <TableCell className="p-4 max-w-sm">
                            {item.content ? (
                              <div 
                                className={`font-medium leading-relaxed ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}
                                dangerouslySetInnerHTML={{ __html: item.content }}
                              />
                            ) : (
                              <span></span>
                            )}
                          </TableCell>
                          
                          {/* Host */}
                          <TableCell className="p-4">
                            {item.host ? (
                              <div className="flex items-center gap-2">
                                <Users className={`h-4 w-4 ${theme === 'dark' ? 'text-dseza-dark-accent' : 'text-dseza-light-accent'}`} />
                                <span className={`font-medium ${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{item.host}</span>
                              </div>
                            ) : (
                              <span></span>
                            )}
                          </TableCell>
                          
                          {/* Participants */}
                          <TableCell className="p-4">
                            {item.participants ? (
                              <p className={`leading-relaxed ${theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'}`}>
                                {item.participants}
                              </p>
                            ) : (
                              <span></span>
                            )}
                          </TableCell>
                          
                          {/* Location */}
                          <TableCell className="p-4">
                            {item.location ? (
                              <div className="flex items-center gap-2">
                                <MapPin className={`h-4 w-4 ${theme === 'dark' ? 'text-dseza-dark-secondary-accent' : 'text-dseza-light-secondary-accent'}`} />
                                <span className={`${theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'}`}>{item.location}</span>
                              </div>
                            ) : (
                              <span></span>
                            )}
                          </TableCell>
                          
                          {/* Preparation Unit */}
                          <TableCell className="p-4">
                            {item.preparation ? (
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${theme === 'dark' ? 'bg-dseza-dark-accent/20 text-dseza-dark-accent border border-dseza-dark-accent/30' : 'bg-dseza-light-accent/10 text-dseza-light-accent border border-dseza-light-accent/20'}`}>
                                {item.preparation}
                              </span>
                            ) : (
                              <span></span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ))
                  )}
                </TableBody>
              )}
            </Table>
          </div>


        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WorkSchedulePage; 