import { useQuery } from '@tanstack/react-query';

// Base URL for JSON:API endpoints
const JSON_API_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || 
  (import.meta.env.DEV ? '' : 'https://dseza-backend.lndo.site');

// JSON:API headers
const jsonApiHeaders = {
  'Content-Type': 'application/vnd.api+json',
  'Accept': 'application/vnd.api+json',
};

export interface VideoResource {
  id: string;
  title: string;
  date: string;
  videoUrl: string;
  thumbnailUrl: string;
}

/**
 * Fetch all resources with proper includes for complete data
 */
async function fetchAllResources(): Promise<any> {
  try {
    // Try multiple include strategies - start with the basic one that should work
    const includes = [
      'field_resource_type',
      'field_resource_file'
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
 * Extract video URL from media data
 */
function extractVideoUrl(mediaData: any, included: any[]): { videoUrl: string; thumbnailUrl: string } | null {
  if (!mediaData || !included) {
    console.log('🔍 No media data or included data provided');
    return null;
  }
  
  try {
    // Find the media entity
    const mediaEntity = included.find((item: any) => 
      item.id === mediaData.id && (item.type === 'media--remote_video' || item.type === 'media--video')
    );
    
    if (!mediaEntity) {
      console.log('🔍 Media entity not found for:', mediaData);
      return null;
    }

    console.log('📹 Found media entity:', mediaEntity);
    console.log('📹 Media entity attributes:', Object.keys(mediaEntity.attributes || {}));
    console.log('📹 Media entity relationships:', Object.keys(mediaEntity.relationships || {}));
    
    // Try multiple methods to extract video URL
    let videoUrl = '';
    
    // Method 1: Check for oembed video URL in attributes (common for YouTube/Vimeo)
    if (mediaEntity.attributes?.field_media_oembed_video?.value) {
      videoUrl = mediaEntity.attributes.field_media_oembed_video.value;
      console.log('🎥 Method 1: Found video URL in field_media_oembed_video.value:', videoUrl);
    } else if (mediaEntity.attributes?.field_media_oembed_video) {
      const oembedField = mediaEntity.attributes.field_media_oembed_video;
      if (typeof oembedField === 'string') {
        videoUrl = oembedField;
        console.log('🎥 Method 1b: Found video URL in field_media_oembed_video (string):', videoUrl);
      } else if (oembedField && typeof oembedField === 'object' && 'uri' in oembedField && typeof (oembedField as any).uri === 'string') {
        videoUrl = (oembedField as any).uri;
        console.log('🎥 Method 1c: Found video URL in field_media_oembed_video.uri:', videoUrl);
      }
    }
    
    // Method 2: Check for video file relationship
    if (!videoUrl && mediaEntity.relationships?.field_media_video_file?.data) {
      const videoFileRef = mediaEntity.relationships.field_media_video_file.data;
      const videoFileEntity = included.find((item: any) => 
        item.id === videoFileRef.id && item.type === 'file--file'
      );
      
      if (videoFileEntity?.attributes?.uri?.url) {
        videoUrl = videoFileEntity.attributes.uri.url.startsWith('http') 
          ? videoFileEntity.attributes.uri.url 
          : `${JSON_API_BASE_URL}${videoFileEntity.attributes.uri.url}`;
        console.log('🎥 Method 2: Found video URL in file entity:', videoUrl);
      }
    }
    
    // Method 3: Look for any URL-like attributes
    if (!videoUrl) {
      const attrs = mediaEntity.attributes || {};
      console.log('🔍 Available media attributes:', Object.keys(attrs));
      
      // Look for any field that might contain a URL
      for (const [key, value] of Object.entries(attrs)) {
        if (key.includes('video') || key.includes('url') || key.includes('oembed') || key.includes('remote')) {
          console.log(`🔍 Checking field ${key}:`, value);
          if (typeof value === 'string' && (value.includes('youtube') || value.includes('youtu.be') || value.includes('vimeo') || value.includes('http'))) {
            videoUrl = value;
            console.log('🎥 Method 3a: Found video URL in field:', key, videoUrl);
            break;
          } else if (value && typeof value === 'object' && 'value' in value && typeof (value as any).value === 'string') {
            const urlValue = (value as any).value;
            if (urlValue.includes('youtube') || urlValue.includes('youtu.be') || urlValue.includes('vimeo') || urlValue.includes('http')) {
              videoUrl = urlValue;
              console.log('🎥 Method 3b: Found video URL in nested field:', key, videoUrl);
              break;
            }
          }
        }
      }
    }
    
    // Method 4: Check if the media entity itself has the URL directly
    if (!videoUrl && mediaEntity.attributes?.url) {
      videoUrl = mediaEntity.attributes.url;
      console.log('🎥 Method 4: Found video URL in media entity url:', videoUrl);
    }
    
    // Method 5: Check for 'name' field which might contain the URL (some CMS setups store it this way)
    if (!videoUrl && mediaEntity.attributes?.name) {
      const nameValue = mediaEntity.attributes.name;
      if (typeof nameValue === 'string' && (nameValue.includes('youtube') || nameValue.includes('youtu.be') || nameValue.includes('vimeo') || nameValue.includes('http'))) {
        videoUrl = nameValue;
        console.log('🎥 Method 5: Found video URL in name field:', videoUrl);
      }
    }
    
    if (!videoUrl) {
      console.log('🔍 No video URL found in any method');
      console.log('🔍 Full media entity:', JSON.stringify(mediaEntity, null, 2));
      return null;
    }
    
    // Generate thumbnail URL for YouTube videos
    let thumbnailUrl = '';
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const videoId = extractYouTubeId(videoUrl);
      if (videoId) {
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } else if (videoUrl.includes('vimeo.com')) {
      // For Vimeo, we'll use a placeholder or try to extract the thumbnail differently
      thumbnailUrl = '/placeholder.svg';
    }
    
    console.log(`🎥 Final extracted video URL: ${videoUrl}, thumbnail: ${thumbnailUrl}`);
    
    return {
      videoUrl,
      thumbnailUrl: thumbnailUrl || '/placeholder.svg',
    };
  } catch (error) {
    console.error('❌ Error extracting video URL:', error);
    return null;
  }
}

/**
 * Extract YouTube video ID from URL
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Process videos from fetched resources
 */
async function processVideos(): Promise<VideoResource[]> {
  try {
    console.log('🔄 Starting to process videos...');
    
    // Fetch all resources with includes
    const allResourcesData = await fetchAllResources();
    
    if (!allResourcesData?.data || !Array.isArray(allResourcesData.data)) {
      console.log('❌ No resources data found');
      return [];
    }

    console.log('📋 Processing', allResourcesData.data.length, 'total resources');
    
    // Step 1: Filter resources that are videos
    const videoResourceNodes = allResourcesData.data.filter((resource: any) => {
      const resourceTypeId = resource.relationships?.field_resource_type?.data?.id;
      
      if (resourceTypeId && allResourcesData.included) {
        const resourceType = allResourcesData.included.find((item: any) => 
          item.id === resourceTypeId && item.type === 'taxonomy_term--loai_tai_nguyen'
        );
        const typeName = resourceType?.attributes?.name;
        console.log(`📊 Resource "${resource.attributes.title}" type:`, typeName);
        
        // Check for Video, video, or similar variations
        return typeName && (
          typeName.toLowerCase() === 'video' || 
          typeName.toLowerCase() === 'videos' ||
          typeName === 'Video' ||
          typeName === 'Videos'
        );
      }
      
      // Also check if it has remote_video media type
      const hasVideoMedia = resource.relationships?.field_resource_file?.data?.some((mediaRef: any) => 
        mediaRef.type === 'media--remote_video' || mediaRef.type === 'media--video'
      );
      
      if (hasVideoMedia) {
        console.log(`📊 Resource "${resource.attributes.title}" has video media type`);
        return true;
      }
      
      return false;
    });
    
    console.log(`🎯 Found ${videoResourceNodes.length} video resources`);
    
    if (videoResourceNodes.length === 0) {
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
    
    // Step 2: Process each video resource
    const processedVideos = videoResourceNodes.map((resource: any) => {
      try {
        let videoUrl = '';
        let thumbnailUrl = '/placeholder.svg';
        
        // Extract video URL from media files
        if (resource.relationships?.field_resource_file?.data && allResourcesData.included) {
          const mediaFiles = Array.isArray(resource.relationships.field_resource_file.data) 
            ? resource.relationships.field_resource_file.data 
            : [resource.relationships.field_resource_file.data];
          
          for (const mediaRef of mediaFiles) {
            if (mediaRef.type === 'media--remote_video' || mediaRef.type === 'media--video') {
              const videoData = extractVideoUrl(mediaRef, allResourcesData.included);
              if (videoData) {
                videoUrl = videoData.videoUrl;
                thumbnailUrl = videoData.thumbnailUrl;
                break;
              }
            }
          }
        }
        
        // Fallback if no video found
        if (!videoUrl) {
          console.log(`⚠️ No video URL found for resource: ${resource.attributes.title}`);
        }
        
        const result = {
          id: resource.id,
          title: resource.attributes.title || 'Untitled Video',
          date: resource.attributes.field_publication_date || resource.attributes.created || new Date().toISOString(),
          videoUrl,
          thumbnailUrl,
        };
        
        console.log('✅ Processed video:', result);
        return result;
        
      } catch (error) {
        console.error(`❌ Error processing video resource ${resource.id}:`, error);
        return {
          id: resource.id,
          title: resource.attributes.title || 'Untitled Video',
          date: resource.attributes.field_publication_date || resource.attributes.created || new Date().toISOString(),
          videoUrl: '',
          thumbnailUrl: '/placeholder.svg',
        };
      }
    });
    
    console.log(`✅ Successfully processed ${processedVideos.length} videos`);
    return processedVideos;
    
  } catch (error) {
    console.error('❌ Error in processVideos:', error);
    throw error;
  }
}

/**
 * Custom hook to fetch and manage video resources using TanStack Query
 */
export const useVideos = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['videos'],
    queryFn: processVideos,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes cache time
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  return {
    videos: data || [],
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
