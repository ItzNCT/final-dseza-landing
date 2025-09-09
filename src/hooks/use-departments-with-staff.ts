import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { DRUPAL_BASE_URL } from '@/config';

// Interface cho nhân sự
export interface Staff {
  id: string;
  name: string;
  position: string;
  email?: string;
  phone?: string;
  avatar?: string;
  order_weight: number;
}

// Interface cho biểu tượng/icon
export interface DepartmentIcon {
  id: string;
  url: string;
  alt: string;
  filename: string;
}

// Interface cho phòng ban
export interface Department {
  id: string;
  title: string;
  description?: string;
  order_weight: number;
  icon?: DepartmentIcon;
  staff: Staff[];
}

// Interface cho dữ liệu API trả về
interface DepartmentApiData {
  id: string;
  type: string;
  attributes: {
    title: string;
    body?: {
      value: string;
      processed: string;
    };
    field_order_weight: number;
  };
  relationships: {
    field_bieu_tuong?: {
      data?: {
        type: string;
        id: string;
      };
    };
    field_thuoc_phong_ban?: {
      data: Array<{
        type: string;
        id: string;
      }>;
    };
  };
}

interface StaffApiData {
  id: string;
  type: string;
  attributes: {
    title: string;
    field_chuc_vu?: string;
    field_email_nhan_su?: string;
    field_sdt_nhan_su?: string;
    field_order_weight?: number;
  };
  relationships?: {
    field_thuoc_phong_ban?: {
      data: {
        type: string;
        id: string;
        meta: {
          drupal_internal__target_id: number;
        };
      };
    };
  };
}

interface MediaApiData {
  id: string;
  type: string;
  attributes: {
    drupal_internal__mid: number;
  };
  relationships: {
    field_media_image: {
      data: {
        type: string;
        id: string;
      };
    };
  };
}

interface FileApiData {
  id: string;
  type: string;
  attributes: {
    drupal_internal__fid: number;
    filename: string;
    uri: {
      value: string;
      url: string;
    };
    filemime: string;
  };
}

/**
 * Xử lý dữ liệu JSON:API để tạo danh sách phòng ban với nhân sự
 */
function processDepartmentsWithStaffData(
  departmentsData: DepartmentApiData[],
  staffData: StaffApiData[],
  included: any[] = []
): Department[] {
  return departmentsData.map((department) => {
    // Xử lý icon/biểu tượng
    let icon: DepartmentIcon | undefined;
    if (department.relationships.field_bieu_tuong?.data) {
      const iconRelation = department.relationships.field_bieu_tuong.data;
      const mediaItem = included.find(
        (item) => item.type === iconRelation.type && item.id === iconRelation.id
      ) as MediaApiData;
      
      if (mediaItem?.relationships?.field_media_image?.data) {
        const fileRelation = mediaItem.relationships.field_media_image.data;
        const fileItem = included.find(
          (item) => item.type === fileRelation.type && item.id === fileRelation.id
        ) as FileApiData;
        
        if (fileItem) {
          let iconUrl = fileItem.attributes.uri?.url || fileItem.attributes.uri?.value;
          
          // Đảm bảo URL đầy đủ (thêm base URL nếu cần)
          if (iconUrl && !iconUrl.startsWith('http')) {
            iconUrl = `${DRUPAL_BASE_URL}${iconUrl}`;
          }
          
          icon = {
            id: fileItem.id,
            url: iconUrl,
            alt: fileItem.attributes.filename,
            filename: fileItem.attributes.filename,
          };
        }
      }
    }

    // Tìm tất cả nhân sự thuộc phòng ban này
    const departmentStaff: Staff[] = staffData
      .filter((staffItem) => {
        const staffDepartment = staffItem.relationships?.field_thuoc_phong_ban?.data;
        return staffDepartment && staffDepartment.id === department.id;
      })
      .map((staffItem) => {
        const orderWeight = staffItem.attributes.field_order_weight || 999;
        console.log(`👤 ${staffItem.attributes.title} - Order Weight: ${orderWeight}`);
        
        return {
          id: staffItem.id,
          name: staffItem.attributes.title,
          position: staffItem.attributes.field_chuc_vu || '',
          email: staffItem.attributes.field_email_nhan_su,
          phone: staffItem.attributes.field_sdt_nhan_su,
          avatar: undefined, // Avatar sẽ được thêm sau khi xác định field chính xác
          order_weight: orderWeight,
        };
      })
      .sort((a, b) => {
        console.log(`🔄 Sorting: ${a.name} (${a.order_weight}) vs ${b.name} (${b.order_weight})`);
        return a.order_weight - b.order_weight;
      }); // Sắp xếp theo order_weight

    const result = {
      id: department.id,
      title: department.attributes.title,
      description: department.attributes.body?.processed,
      order_weight: department.attributes.field_order_weight || 0,
      icon,
      staff: departmentStaff,
    };
    
    console.log(`🏢 Department: ${department.attributes.title}`);
    console.log(`📋 Staff order:`, departmentStaff.map(s => `${s.name} (${s.order_weight})`));
    
    return result;
  });
}

/**
 * Hook để lấy danh sách phòng ban và nhân sự
 */
export const useDepartmentsWithStaff = () => {
  return useQuery({
    queryKey: ['departments', 'with-staff'],
    queryFn: async () => {
      // Lấy danh sách phòng ban
      const departmentsResponse = await api.get('/jsonapi/node/department', {
        sort: 'field_order_weight',
        include: 'field_bieu_tuong,field_bieu_tuong.field_media_image',
        filter: {
          status: { value: 1 } // Chỉ lấy các phòng ban đã publish
        }
      });

      // Lấy danh sách nhân sự
      const staffResponse = await api.get('/jsonapi/node/staff_member', {
        include: 'field_thuoc_phong_ban',
        filter: {
          status: { value: 1 } // Chỉ lấy nhân sự đã publish
        },
        sort: 'field_order_weight' // Sắp xếp theo order weight từ API
      });

      // Kết hợp tất cả included items từ cả hai responses
      const allIncluded = [
        ...(departmentsResponse.included || []),
        ...(staffResponse.included || [])
      ];

      return processDepartmentsWithStaffData(
        departmentsResponse.data,
        staffResponse.data,
        allIncluded
      );
    },
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
    retry: 3,
  });
}; 