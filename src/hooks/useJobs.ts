import { useQuery } from "@tanstack/react-query";

// Định nghĩa cấu trúc cho một tin tuyển dụng
export interface Job {
  id: string;
  position: string;       // Vị trí tuyển dụng
  description: string;    // Mô tả công việc
  requirements: string;   // Yêu cầu ứng viên
  salary: string;         // Mức lương
  deadline: string;       // Hạn nộp hồ sơ
}

// Base URL pattern consistent with other hooks in the project
const DRUPAL_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

// Utility function to strip HTML tags and decode HTML entities
const stripHtml = (html: string): string => {
  if (!html) return '';
  
  // Create a temporary div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

// Utility function to extract and format date from HTML time element
const extractDate = (htmlTime: string): string => {
  if (!htmlTime) return '';
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlTime;
  const timeElement = tempDiv.querySelector('time');
  
  if (timeElement) {
    const datetime = timeElement.getAttribute('datetime');
    if (datetime) {
      // Parse the datetime and format it nicely
      const date = new Date(datetime);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    }
    
    // Fallback to text content
    return timeElement.textContent || '';
  }
  
  return stripHtml(htmlTime);
};

export const useJobs = () => {
  const fetchJobs = async (): Promise<Job[]> => {
    const endpoint = `${DRUPAL_BASE_URL}/vi/api/v1/jobs`;

    console.log('🔍 Fetching jobs from:', endpoint);

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('📄 Raw jobs API response:', data);
      
      // Map dữ liệu trả về từ View API
      const mappedJobs = Array.isArray(data) ? data.map((item: any, index: number) => ({
        id: item.uuid || item.nid || `job-${index}`,
        position: stripHtml(item.title || ''),
        description: item.field_mo_ta_cong_viec || '',
        requirements: item.field_yeu_cau_ung_vien || '',
        salary: stripHtml(item.field_muc_luong || '') || 'Thỏa thuận',
        deadline: extractDate(item.field_han_nop_ho_so || ''),
      })) : [];

      console.log('🔄 Mapped jobs:', mappedJobs);
      return mappedJobs;
    } catch (error) {
      console.error("❌ Error fetching jobs:", error);
      throw new Error(`Failed to fetch jobs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return useQuery<Job[], Error>({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}; 