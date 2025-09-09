/**
 * API utilities for Dseza project
 */
import { API_TARGET } from '@/config';

/**
 * Get the API base URL based on environment
 */
export const getApiBaseUrl = (): string => API_TARGET;



/**
 * Interface cho dữ liệu gửi câu hỏi
 */
export interface QuestionSubmissionData {
  hoTen: string;
  email: string;
  tieuDe: string;
  noiDung: string;
  dienThoai?: string;
  congTy?: string;
  category?: string;
}

/**
 * Submit question to API
 */
export const submitQuestion = async (data: QuestionSubmissionData): Promise<any> => {
  const apiBaseUrl = getApiBaseUrl();
  const apiUrl = `${apiBaseUrl}/api/v1/submit-question`;
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Submit question failed:', error);
    throw error;
  }
};

 