import { useQuery } from '@tanstack/react-query';
import { DRUPAL_BASE_URL as JSON_API_BASE_URL } from '@/config';

// Base URL from centralized config

// JSON:API headers
const jsonApiHeaders = {
  'Content-Type': 'application/vnd.api+json',
  'Accept': 'application/vnd.api+json',
};

export interface ImageResource {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
}

/**
 * Fetch all resources with proper includes for complete data
 */
async function fetchAllResources(): Promise<any> {
  try {
    // Include all necessary relationships to get complete data in one request
    const includes = [
      'field_resource_type',
      'field_resource_file',
      'field_resource_file.field_media_image'
    ].join(',');
    
    const url = `${JSON_API_BASE_URL}/jsonapi/node/resource?include=${includes}`;
    
    console.log('🔍 Fetching all resources from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: jsonApiHeaders,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log('🔍 All resources response:', data);
    console.log('📊 Total resources found:', data?.data?.length || 0);
    console.log('📦 Included items found:', data?.included?.length || 0);
    
    return data;
  } catch (error) {
    console.error('❌ Error fetching all resources:', error);
    throw new Error(`Failed to fetch resources: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Extract image URL from media data
 */
function extractImageUrl(mediaData: any, included: any[]): string | null {
  if (!mediaData || !included) {
    console.log('🔍 No media data or included data provided');
    return null;
  }
  
  try {
    // Find the media entity
    const mediaEntity = included.find((item: any) => 
      item.id === mediaData.id && item.type === 'media--image'
    );
    
    if (!mediaEntity) {
      console.log('🔍 Media entity not found for:', mediaData);
      return null;
    }

    console.log('🖼️ Found media entity:', mediaEntity);
    
    // Get the file reference
    const fileRef = mediaEntity.relationships?.field_media_image?.data;
    if (!fileRef) {
      console.log('🔍 No file reference in media entity attributes:', Object.keys(mediaEntity.attributes || {}));
      return null;
    }
    
    // Find the file entity
    const fileEntity = included.find((item: any) => 
      item.id === fileRef.id && item.type === 'file--file'
    );
    
    if (!fileEntity) {
      console.log('🔍 File entity not found for:', fileRef);
      return null;
    }
    
    // Get the file URL
    const fileUrl = fileEntity.attributes?.uri?.url;
    if (fileUrl) {
      // Handle relative URLs
      const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${JSON_API_BASE_URL}${fileUrl}`;
      console.log(`🖼️ Extracted image URL: ${fullUrl}`);
      return fullUrl;
    }
    
    console.log('🔍 No file URL found in file entity:', fileEntity);
    return null;
  } catch (error) {
    console.error('❌ Error extracting image URL:', error);
    return null;
  }
}

/**
 * Process images from fetched resources
 */
async function processImages(): Promise<ImageResource[]> {
  try {
    console.log('🔄 Starting to process images...');
    
    // Fetch all resources with includes
    const allResourcesData = await fetchAllResources();
    
    if (!allResourcesData?.data || !Array.isArray(allResourcesData.data)) {
      console.log('❌ No resources data found');
      return [];
    }

    console.log('📋 Processing', allResourcesData.data.length, 'total resources');
    
    // Step 1: Filter resources that are images
    const imageResourceNodes = allResourcesData.data.filter((resource: any) => {
      const resourceTypeId = resource.relationships?.field_resource_type?.data?.id;
      
      if (resourceTypeId && allResourcesData.included) {
        const resourceType = allResourcesData.included.find((item: any) => 
          item.id === resourceTypeId && item.type === 'taxonomy_term--loai_tai_nguyen'
        );
        const typeName = resourceType?.attributes?.name;
        console.log(`📊 Resource "${resource.attributes.title}" type:`, typeName);
        
        // Check for Image, image, or similar variations
        return typeName && (
          typeName.toLowerCase() === 'image' || 
          typeName.toLowerCase() === 'images' ||
          typeName === 'Image' ||
          typeName === 'Images' ||
          typeName.toLowerCase() === 'hình ảnh' ||
          typeName === 'Hình ảnh'
        );
      }
      
      // Also check if it has image media type
      const hasImageMedia = resource.relationships?.field_resource_file?.data?.some((mediaRef: any) => 
        mediaRef.type === 'media--image'
      );
      
      if (hasImageMedia) {
        console.log(`📊 Resource "${resource.attributes.title}" has image media type`);
        return true;
      }
      
      return false;
    });
    
    console.log(`🎯 Found ${imageResourceNodes.length} image resources`);
    
    if (imageResourceNodes.length === 0) {
      console.log('📝 Available resource types:');
      allResourcesData.data.forEach((resource: any) => {
        const resourceTypeId = resource.relationships?.field_resource_type?.data?.id;
        if (resourceTypeId && allResourcesData.included) {
          const resourceType = allResourcesData.included.find((item: any) => 
            item.id === resourceTypeId && item.type === 'taxonomy_term--loai_tai_nguyen'
          );
          console.log(`   - "${resource.attributes.title}": ${resourceType?.attributes?.name || 'Unknown'}`);
        }
      });
      return [];
    }
    
    // Step 2: Process each image resource
    const processedImages = imageResourceNodes.map((resource: any) => {
      try {
        let imageUrl = '/placeholder.svg';
        
        // Extract image URL from media files
        if (resource.relationships?.field_resource_file?.data && allResourcesData.included) {
          const mediaFiles = Array.isArray(resource.relationships.field_resource_file.data) 
            ? resource.relationships.field_resource_file.data 
            : [resource.relationships.field_resource_file.data];
          
          for (const mediaRef of mediaFiles) {
            if (mediaRef.type === 'media--image') {
              const extractedUrl = extractImageUrl(mediaRef, allResourcesData.included);
              if (extractedUrl) {
                imageUrl = extractedUrl;
                break;
              }
            }
          }
        }
        
        // Fallback if no image found
        if (imageUrl === '/placeholder.svg') {
          console.log(`⚠️ No image URL found for resource: ${resource.attributes.title}`);
        }
        
        const result = {
          id: resource.id,
          title: resource.attributes.title || 'Untitled Image',
          date: resource.attributes.field_publication_date || resource.attributes.created || new Date().toISOString(),
          imageUrl,
        };
        
        console.log('✅ Processed image:', result);
        return result;
        
      } catch (error) {
        console.error(`❌ Error processing image resource ${resource.id}:`, error);
        return {
          id: resource.id,
          title: resource.attributes.title || 'Untitled Image',
          date: resource.attributes.field_publication_date || resource.attributes.created || new Date().toISOString(),
          imageUrl: '/placeholder.svg',
        };
      }
    });
    
    console.log(`✅ Successfully processed ${processedImages.length} images`);
    return processedImages;
    
  } catch (error) {
    console.error('❌ Error in processImages:', error);
    throw error;
  }
}

/**
 * Custom hook to fetch and manage image resources using TanStack Query
 */
export const useImages = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['images'],
    queryFn: processImages,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes cache time
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  return {
    images: data || [],
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
