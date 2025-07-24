# Language-Aware API Migration Guide

## Overview

The Drupal API calling logic has been updated to automatically add language prefixes to all JSON:API requests. This ensures that content is fetched in the correct language based on the current `LanguageContext`.

## Changes Made

### 1. New Language-Aware API Functions

**File**: `src/utils/drupal.ts`

- Added `apiGetWithLanguage()` function for standalone API calls
- Added `useDrupalApi()` hook for React components
- Automatic language prefix injection for JSON:API endpoints

### 2. URL Transformation

**Before**: `/jsonapi/node/article`
**After**: `/vi/jsonapi/node/article` or `/en/jsonapi/node/article`

### 3. Updated Hooks

✅ **Completed**:
- `useArticles` - News and articles with language support
- `useFaq` - FAQ questions with language support

🔄 **Need Migration**:
- `useHomepageData`
- `useEnterpriseDocs`
- `useNewsCategories`
- All other hooks using direct `fetch()` calls to JSON:API

## Migration Instructions

### For React Hooks

Replace direct `fetch()` calls with `useDrupalApi()` hook:

**Before**:
```typescript
import { useQuery } from '@tanstack/react-query';

const DRUPAL_BASE_URL = import.meta.env.VITE_DRUPAL_BASE_URL || '...';

export const useMyData = () => {
  const fetchData = async () => {
    const response = await fetch(`${DRUPAL_BASE_URL}/jsonapi/node/my_content`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    return response.json();
  };

  return useQuery({
    queryKey: ['my-data'],
    queryFn: fetchData,
  });
};
```

**After**:
```typescript
import { useQuery } from '@tanstack/react-query';
import { useDrupalApi } from '@/utils/drupal';

export const useMyData = () => {
  const { apiGet } = useDrupalApi(); // Language-aware API client

  const fetchData = async () => {
    // This will automatically add language prefix (/vi/ or /en/)
    return apiGet('/jsonapi/node/my_content', {
      // Optional API options
      sort: '-created',
      include: 'field_image',
      filter: {
        status: { value: '1' }
      },
      page: { limit: 20 }
    });
  };

  return useQuery({
    queryKey: ['my-data'],
    queryFn: fetchData,
  });
};
```

### For Standalone Functions

Use `apiGetWithLanguage()` for functions outside React components:

```typescript
import { apiGetWithLanguage } from '@/utils/drupal';

export async function fetchMyData(language?: 'vi' | 'en') {
  // Language parameter is optional - will use localStorage/browser detection if not provided
  return apiGetWithLanguage('/jsonapi/node/my_content', {
    sort: '-created',
    filter: { status: { value: '1' } }
  }, language);
}
```

## API Options Format

The new API client uses structured options instead of URL parameters:

```typescript
const apiOptions = {
  // Sorting
  sort: '-created', // or 'field_name' for ascending

  // Filtering
  filter: {
    status: { value: '1' },
    field_category: { value: 'news' },
    // Complex filters
    field_date: { 
      condition: {
        path: 'field_date',
        operator: '>=',
        value: '2024-01-01'
      }
    }
  },

  // Including relationships
  include: 'field_image,field_category.field_media_image',

  // Pagination
  page: {
    limit: 20,
    offset: 0
  }
};
```

## Benefits

1. **Automatic Language Support**: All API calls automatically use the correct language
2. **Centralized Logic**: Language prefix logic is in one place
3. **Backward Compatible**: Existing URL structure still works
4. **Type Safety**: Full TypeScript support
5. **Consistent API**: Same interface across all hooks

## Testing

After migration, test that:

1. Content loads in Vietnamese when URL is `/vi/...`
2. Content loads in English when URL is `/en/...`
3. Language switching updates the content correctly
4. All existing functionality still works

## Console Debugging

The language-aware API includes console logging:

```
🌐 API call with language: vi
📡 Original endpoint: /jsonapi/node/article
🔗 Language-aware endpoint: /vi/jsonapi/node/article
```

## Next Steps

1. **Priority Hooks**: Update `useHomepageData` and `useNewsCategories` first
2. **Testing**: Test each hook after migration
3. **Documentation**: Update hook documentation with language support info
4. **Performance**: Monitor API performance with new language prefixes 